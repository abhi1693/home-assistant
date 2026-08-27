const cameraEventsEscape = (value) => String(value ?? "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

const CAMERA_EVENT_META = {
  animal: ["mdi:paw", "Animal"], baby_cry: ["mdi:baby-face-outline", "Baby cry"],
  barking: ["mdi:dog", "Dog barking"], car_horn: ["mdi:car-emergency", "Car horn"],
  co: ["mdi:molecule-co", "CO alarm"], glass_break: ["mdi:glass-fragile", "Glass break"],
  motion: ["mdi:motion-sensor", "Motion"], package: ["mdi:package-variant-closed", "Package"],
  person: ["mdi:account", "Person"], security_alarm: ["mdi:shield-alert-outline", "Security alarm"],
  siren: ["mdi:alarm-light-outline", "Siren"], smoke: ["mdi:smoke-detector-alert", "Smoke alarm"],
  speaking: ["mdi:account-voice", "Speaking"], vehicle: ["mdi:car", "Vehicle"],
};
const CAMERA_HISTORY_MAX_DAYS = 31;
const CAMERA_HISTORY_PAGE_SIZE = 12;

class FamilyCameraEventsCard extends HTMLElement {
  setConfig(config) {
    if (!Array.isArray(config.cameras) || !config.cameras.length) throw new Error("Family camera events requires cameras");
    this.config = config;
    this._selectedCamera = "all";
    const today = this._dateValue(new Date());
    this._fromDate = today; this._toDate = today;
    this._draftFromDate = today; this._draftToDate = today;
    this._history = []; this._historyLoaded = false; this._historyLoading = false; this._historyError = "";
    this._visibleLimit = CAMERA_HISTORY_PAGE_SIZE;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    if (!this._timer) this._timer = setInterval(() => this._render(true), 60000);
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
    if (!this._historyLoaded && !this._historyLoading) void this._loadHistory();
  }

  disconnectedCallback() { clearInterval(this._timer); this._timer = null; }

  _visible() {
    return this.config.cameras.filter((camera) => !camera.users || camera.users.includes(this._hass.user?.id));
  }

  _dateValue(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  _localDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
    if (!match) return null;
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  _historyBounds(from = this._fromDate, to = this._toDate) {
    const start = this._localDate(from);
    const selectedEnd = this._localDate(to);
    if (!start || !selectedEnd || selectedEnd < start) throw new Error("Choose an end date on or after the start date.");
    const calendarDays = Math.round((Date.UTC(selectedEnd.getFullYear(), selectedEnd.getMonth(), selectedEnd.getDate())
      - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000) + 1;
    if (calendarDays > CAMERA_HISTORY_MAX_DAYS) throw new Error("Choose a date range of one month or less.");
    const end = new Date(selectedEnd);
    end.setDate(end.getDate() + 1);
    return { start, end, calendarDays };
  }

  async _loadHistory() {
    if (!this._hass) return;
    let bounds;
    try { bounds = this._historyBounds(); }
    catch (error) { this._historyError = error.message; this._historyLoaded = false; this._render(true); return; }
    const visibleKeys = new Set(this._visible().map((camera) => camera.key));
    const key = `${this._fromDate}:${this._toDate}:${[...visibleKeys].sort().join(",")}`;
    if (this._historyLoaded && this._historyKey === key) return;
    const request = (this._historyRequest || 0) + 1;
    this._historyRequest = request;
    this._historyLoading = true; this._historyError = ""; this._render(true);
    try {
      const query = new URLSearchParams({ start: bounds.start.toISOString(), end: bounds.end.toISOString() });
      const response = await this._hass.callApi("GET", `family_camera_events/history?${query.toString()}`);
      if (request !== this._historyRequest) return;
      this._history = Array.isArray(response?.events)
        ? response.events.filter((event) => visibleKeys.has(event.camera_key) && !event.active) : [];
      this._historyKey = key;
      this._historyLoaded = true;
    } catch (_error) {
      if (request !== this._historyRequest) return;
      this._history = []; this._historyLoaded = false;
      this._historyError = "Clip history could not be loaded. Try again.";
    } finally {
      if (request === this._historyRequest) {
        this._historyLoading = false;
        this._render(true);
      }
    }
  }

  _relative(value) {
    const time = new Date(value).getTime();
    if (!Number.isFinite(time)) return "Recently";
    const minutes = Math.max(1, Math.round((Date.now() - time) / 60000));
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
    return `${Math.round(minutes / 1440)}d ago`;
  }

  _absolute(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  }

  async _signedPath(path, expires = 90) {
    if (!path?.startsWith("/api/family_camera_events/")) return path;
    const signed = await this._hass.callWS({ type: "auth/sign_path", path, expires });
    return signed.path;
  }

  async _hydrateThumbnails(generation) {
    const images = [...this.shadowRoot.querySelectorAll("img[data-source]")];
    await Promise.all(images.map(async (image) => {
      try {
        const signed = await this._signedPath(image.dataset.source);
        if (generation === this._mediaGeneration && image.isConnected) image.src = signed;
      } catch (_error) { if (image.isConnected) image.classList.add("failed"); }
    }));
  }

  _closeClip() {
    const dialog = this.shadowRoot.querySelector("dialog.clip-dialog");
    const video = dialog?.querySelector("video");
    this._clipRequest = (this._clipRequest || 0) + 1; this._clipActive = false;
    if (video) { video.pause(); video.removeAttribute("src"); video.load(); }
    if (dialog?.open) { dialog.close(); return; }
    if (this._pendingRender) { this._pendingRender = false; this._render(true); }
  }

  async _openClip(button) {
    const dialog = this.shadowRoot.querySelector("dialog.clip-dialog");
    const video = dialog?.querySelector("video");
    const message = dialog?.querySelector(".clip-message");
    if (!dialog || !video || !message) return;
    const request = (this._clipRequest || 0) + 1;
    this._clipRequest = request; this._clipActive = true; button.disabled = true;
    message.textContent = "Preparing clip…"; dialog.showModal();
    try {
      const [videoPath, thumbnailPath] = await Promise.all([
        this._signedPath(button.dataset.video, 120), this._signedPath(button.dataset.thumbnail, 120),
      ]);
      if (request !== this._clipRequest || !dialog.open || !dialog.isConnected) return;
      video.src = videoPath; video.poster = thumbnailPath; video.muted = true;
      message.textContent = `${button.dataset.title} · High resolution · Muted`;
      try { await video.play(); }
      catch (_error) { message.textContent = `${button.dataset.title} · High resolution · Press play to start`; }
    } catch (_error) { message.textContent = "Clip could not be opened. Try again."; }
    finally { if (button.isConnected) button.disabled = false; }
  }

  _events(cameras) {
    const byCamera = new Map(cameras.map((camera) => [camera.key, []]));
    let bounds;
    try { bounds = this._historyBounds(); } catch (_error) { return byCamera; }
    const merged = new Map();
    const add = (event, camera) => {
      const started = new Date(event.start).getTime();
      if (!Number.isFinite(started) || started < bounds.start.getTime() || started >= bounds.end.getTime()) return;
      merged.set(`${camera.key}:${event.id}`, { ...event, camera });
    };
    this._history.forEach((event) => {
      const camera = cameras.find((candidate) => candidate.key === event.camera_key);
      if (camera) add(event, camera);
    });
    cameras.forEach((camera) => {
      const state = this._hass.states[camera.activity_entity];
      (state?.attributes?.events || []).filter((event) => !event.active).forEach((event) => add(event, camera));
    });
    [...merged.values()].forEach((event) => byCamera.get(event.camera.key).push(event));
    byCamera.forEach((events) => events.sort((a, b) => String(b.start).localeCompare(String(a.start))));
    return byCamera;
  }

  _render(force = false) {
    if (!this.shadowRoot || !this._hass) return;
    const cameras = this._visible();
    if (this._selectedCamera !== "all" && !cameras.some((camera) => camera.key === this._selectedCamera)) this._selectedCamera = "all";
    const signature = JSON.stringify({
      user: this._hass.user?.id, selectedCamera: this._selectedCamera, from: this._fromDate, to: this._toDate,
      historyKey: this._historyKey, historyLoading: this._historyLoading, historyError: this._historyError,
      visibleLimit: this._visibleLimit,
      cameras: cameras.map((camera) => {
        const activity = this._hass.states[camera.activity_entity];
        return { key: camera.key, last_event: activity?.attributes?.last_event, events: activity?.attributes?.events };
      }),
    });
    if (!force && signature === this._signature) return;
    if (this._clipActive || this.shadowRoot.querySelector("dialog.clip-dialog")?.open) { this._pendingRender = true; return; }
    this._pendingRender = false; this._signature = signature;
    const cameraEvents = this._events(cameras);
    const selectedCameras = this._selectedCamera === "all" ? cameras : cameras.filter((camera) => camera.key === this._selectedCamera);
    const allEvents = selectedCameras.flatMap((camera) => cameraEvents.get(camera.key) || [])
      .sort((a, b) => String(b.start).localeCompare(String(a.start)));
    const events = allEvents.slice(0, this._visibleLimit);
    const filterButton = (key, label, count) => {
      const selected = this._selectedCamera === key;
      return `<button type="button" class="camera-filter ${selected ? "selected" : ""}" data-camera-filter="${cameraEventsEscape(key)}" aria-pressed="${selected}" aria-label="Show ${cameraEventsEscape(label)} clips">${cameraEventsEscape(label)}<span>${count}</span></button>`;
    };
    const totalEvents = [...cameraEvents.values()].reduce((total, items) => total + items.length, 0);
    const filters = [filterButton("all", "All cameras", totalEvents), ...cameras.map((camera) =>
      filterButton(camera.key, camera.name, cameraEvents.get(camera.key)?.length || 0))].join("");
    const selectedCamera = cameras.find((camera) => camera.key === this._selectedCamera);
    let timeline;
    if (events.length) {
      timeline = events.map((event) => {
        const primary = event.types?.find((type) => type !== "motion") || event.types?.[0] || "motion";
        const [icon, label] = CAMERA_EVENT_META[primary] || ["mdi:cctv", primary.replaceAll("_", " ")];
        const action = event.active ? "Live" : "Play clip";
        const title = `${label} · ${event.camera.name}`;
        return `<article class="event ${event.active ? "active" : ""}" data-camera="${cameraEventsEscape(event.camera.high_entity)}">
          <button type="button" class="event-open" aria-label="${cameraEventsEscape(`${action}: ${title}`)}" ${event.active ? 'data-live="true"' : `data-video="${cameraEventsEscape(event.video)}" data-thumbnail="${cameraEventsEscape(event.thumbnail)}" data-title="${cameraEventsEscape(title)}"`}>
            <div class="thumb"><img loading="lazy" data-source="${cameraEventsEscape(event.thumbnail)}" alt="${cameraEventsEscape(event.camera.name)} event"><ha-icon icon="${icon}"></ha-icon></div>
            <div class="event-copy"><div class="event-title">${cameraEventsEscape(title)}</div><div class="event-footer"><span class="event-meta">${cameraEventsEscape(this._absolute(event.start))} · ${this._relative(event.start)}${event.active ? " · happening now" : ""}</span><span class="event-action">${action}<ha-icon icon="mdi:chevron-right"></ha-icon></span></div></div>
          </button></article>`;
      }).join("");
    } else {
      const emptyTitle = this._historyLoading ? "Loading clips…" : selectedCamera ? `No ${selectedCamera.name} clips found` : "No clips found";
      const emptyCopy = this._historyError || "Try another camera or date range.";
      timeline = `<div class="empty"><ha-icon icon="${this._historyError ? "mdi:alert-circle-outline" : "mdi:shield-check-outline"}"></ha-icon><strong>${cameraEventsEscape(emptyTitle)}</strong><span>${cameraEventsEscape(emptyCopy)}</span></div>`;
    }
    const resultStatus = this._historyLoading ? "Loading every clip in this date range…"
      : this._historyError || `Showing ${events.length} of ${allEvents.length} clip${allEvents.length === 1 ? "" : "s"}`;
    const loadMore = allEvents.length > events.length
      ? `<button type="button" class="load-more">Show more <span>${allEvents.length - events.length} remaining</span></button>` : "";
    const today = this._dateValue(new Date());

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; width:100%; min-width:0; max-width:100%; overflow:hidden; contain:inline-size; }
        ha-card { min-width:0; padding:18px; overflow:hidden; border-radius:28px; background:var(--contrast2); }
        .history-controls { display:grid; grid-template-columns:minmax(145px,1fr) minmax(145px,1fr) auto; gap:10px; align-items:end; margin-bottom:14px; }
        .date-field { display:grid; gap:5px; color:var(--contrast11); font-size:12px; font-weight:700; }
        .date-field input { min-width:0; height:44px; box-sizing:border-box; padding:0 12px; border:1px solid var(--contrast5); border-radius:13px; color:var(--contrast18); background:var(--contrast1); font:inherit; color-scheme:dark; }
        .date-field input:focus-visible,.history-action:focus-visible,.load-more:focus-visible { outline:2px solid var(--pink); outline-offset:2px; }
        .history-action { min-height:44px; padding:0 16px; border:1px solid var(--contrast5); border-radius:13px; color:var(--contrast18); background:var(--contrast4); font:inherit; font-weight:800; cursor:pointer; }
        .history-action.primary { border-color:color-mix(in srgb,var(--pink) 65%,transparent); background:color-mix(in srgb,var(--pink) 18%,var(--contrast2)); }
        .history-action:disabled { opacity:.55; cursor:wait; }
        .history-status { grid-column:1 / -1; min-height:18px; color:var(--contrast9); font-size:12px; }
        .history-status.error { color:var(--red); }
        .filters { min-width:0; max-width:100%; display:flex; gap:8px; margin:0 0 14px; padding:1px; overflow-x:auto; scrollbar-width:thin; }
        .camera-filter { min-width:max-content; min-height:44px; display:flex; align-items:center; gap:7px; padding:0 14px; border:1px solid var(--contrast5); border-radius:999px; color:var(--contrast12); background:var(--contrast1); font:inherit; font-size:13px; font-weight:700; cursor:pointer; }
        .camera-filter:hover { border-color:color-mix(in srgb,var(--pink) 45%,var(--contrast5)); color:var(--contrast18); }
        .camera-filter:focus-visible { outline:2px solid var(--pink); outline-offset:2px; }
        .camera-filter.selected { border-color:color-mix(in srgb,var(--pink) 65%,transparent); color:var(--contrast18); background:color-mix(in srgb,var(--pink) 15%,var(--contrast1)); }
        .camera-filter span { min-width:20px; height:20px; display:grid; place-items:center; padding:0 5px; border-radius:999px; color:var(--contrast11); background:var(--contrast4); font-size:11px; }
        .camera-filter.selected span { color:var(--contrast18); background:color-mix(in srgb,var(--pink) 24%,var(--contrast3)); }
        .timeline { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); align-items:stretch; gap:12px; }
        .event { min-width:0; }
        .event-open { display:grid; grid-template-rows:auto 1fr; width:100%; height:100%; min-height:44px; padding:0; overflow:hidden; text-align:left; color:inherit; font:inherit; border:1px solid transparent; border-radius:18px; background:var(--contrast1); cursor:pointer; }
        .event.active .event-open { border-color:color-mix(in srgb,var(--pink) 55%,transparent); }
        .event-open:hover { border-color:color-mix(in srgb,var(--pink) 40%,transparent); }
        .event-open:focus-visible { outline:2px solid var(--pink); outline-offset:2px; }
        .event-open:disabled { opacity:.55; cursor:wait; }
        .thumb { position:relative; width:100%; aspect-ratio:16 / 9; overflow:hidden; background:var(--contrast4); }
        .thumb img { width:100%; height:100%; object-fit:cover; display:block; }
        .thumb img.failed { display:none; }
        .thumb ha-icon { position:absolute; left:10px; bottom:10px; width:22px; height:22px; color:white; filter:drop-shadow(0 1px 3px #000); }
        .event-copy { display:grid; align-content:space-between; gap:12px; min-height:92px; padding:13px 14px 12px; }
        .event-title { font-size:14px; font-weight:700; color:var(--contrast18); }
        .event-footer { display:flex; align-items:center; justify-content:space-between; gap:8px; }
        .event-meta { color:var(--contrast9); font-size:11px; }
        .event-action { display:flex; align-items:center; flex:0 0 auto; gap:2px; color:var(--pink); font-size:12px; font-weight:700; }
        .event-action ha-icon { width:18px; height:18px; }
        .load-more { width:100%; min-height:48px; margin-top:14px; border:1px solid var(--contrast5); border-radius:15px; color:var(--contrast18); background:var(--contrast3); font:inherit; font-weight:800; cursor:pointer; }
        .load-more span { margin-left:5px; color:var(--contrast10); font-size:12px; font-weight:600; }
        .clip-dialog { width:min(920px,calc(100vw - 32px)); padding:0; border:1px solid var(--contrast5); border-radius:24px; color:var(--contrast18); background:var(--contrast2); }
        .clip-dialog::backdrop { background:rgba(0,0,0,.78); backdrop-filter:blur(6px); }
        .clip-head { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px; }
        .clip-message { font-size:14px; font-weight:700; }
        .clip-close { width:44px; height:44px; display:grid; place-items:center; border:0; border-radius:50%; color:var(--contrast18); background:var(--contrast4); cursor:pointer; }
        .clip-dialog video { display:block; width:100%; max-height:72vh; background:#000; }
        .empty { grid-column:1 / -1; min-height:120px; display:grid; place-items:center; align-content:center; gap:6px; color:var(--contrast9); text-align:center; }
        .empty ha-icon { color:var(--green); width:30px; height:30px; }
        .empty strong { color:var(--contrast16); }
        .empty span { font-size:12px; }
        @media (max-width:1100px) { .timeline { grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (max-width:720px) { .history-controls { grid-template-columns:1fr 1fr; } .history-action { width:100%; } }
        @media (max-width:620px) { ha-card { padding:12px; border-radius:22px; } .history-controls { gap:8px; } .filters { margin-bottom:12px; } .timeline { grid-template-columns:1fr; } .event-copy { min-height:84px; } .event-footer { align-items:flex-end; } }
      </style>
      <ha-card><section class="history-controls" aria-label="Filter clip history by date">
        <label class="date-field">From<input type="date" class="date-from" value="${cameraEventsEscape(this._draftFromDate)}" max="${today}"></label>
        <label class="date-field">To<input type="date" class="date-to" value="${cameraEventsEscape(this._draftToDate)}" max="${today}"></label>
        <button type="button" class="history-action today" ${this._historyLoading ? "disabled" : ""}>Today</button>
        <div class="history-status ${this._historyError ? "error" : ""}" role="status">${cameraEventsEscape(resultStatus)} · Maximum 1 month</div>
      </section><nav class="filters" aria-label="Filter clip history by camera">${filters}</nav><div class="timeline" aria-live="polite">${timeline}</div>${loadMore}</ha-card>
      <dialog class="clip-dialog"><div class="clip-head"><div class="clip-message">Recorded activity</div><button type="button" class="clip-close" aria-label="Close clip"><ha-icon icon="mdi:close"></ha-icon></button></div><video controls autoplay muted playsinline preload="metadata"></video></dialog>`;

    const fromInput = this.shadowRoot.querySelector(".date-from");
    const toInput = this.shadowRoot.querySelector(".date-to");
    const datesChanged = () => {
      this._draftFromDate = fromInput.value;
      this._draftToDate = toInput.value;
      try { this._historyBounds(this._draftFromDate, this._draftToDate); }
      catch (error) {
        const status = this.shadowRoot.querySelector(".history-status");
        status.textContent = `${error.message} · Maximum 1 month`;
        status.classList.add("error");
        return;
      }
      this._fromDate = this._draftFromDate; this._toDate = this._draftToDate;
      this._historyLoaded = false; this._historyError = ""; this._visibleLimit = CAMERA_HISTORY_PAGE_SIZE;
      void this._loadHistory();
    };
    fromInput.addEventListener("change", datesChanged);
    toInput.addEventListener("change", datesChanged);
    this.shadowRoot.querySelector(".today").addEventListener("click", () => {
      const value = this._dateValue(new Date());
      this._fromDate = value; this._toDate = value; this._draftFromDate = value; this._draftToDate = value;
      this._historyLoaded = false; this._historyError = ""; this._visibleLimit = CAMERA_HISTORY_PAGE_SIZE;
      void this._loadHistory();
    });
    this.shadowRoot.querySelectorAll("button[data-camera-filter]").forEach((button) => button.addEventListener("click", () => {
      if (this._selectedCamera === button.dataset.cameraFilter) return;
      this._selectedCamera = button.dataset.cameraFilter; this._visibleLimit = CAMERA_HISTORY_PAGE_SIZE; this._render(true);
    }));
    this.shadowRoot.querySelector(".load-more")?.addEventListener("click", () => { this._visibleLimit += CAMERA_HISTORY_PAGE_SIZE; this._render(true); });
    this.shadowRoot.querySelectorAll('button[data-live="true"]').forEach((button) => button.addEventListener("click", (event) => {
      event.preventDefault();
      const entityId = button.closest("article")?.dataset.camera;
      if (entityId) this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));
    }));
    this.shadowRoot.querySelectorAll("button[data-video]").forEach((button) => button.addEventListener("click", () => this._openClip(button)));
    const dialog = this.shadowRoot.querySelector("dialog.clip-dialog");
    dialog.querySelector(".clip-close").addEventListener("click", () => this._closeClip());
    dialog.addEventListener("close", () => this._closeClip());
    this._mediaGeneration = (this._mediaGeneration || 0) + 1;
    void this._hydrateThumbnails(this._mediaGeneration);
  }

  getCardSize() { return 8; }
  getGridOptions() { return { columns: "full", rows: "auto" }; }
}

customElements.define("family-camera-events-card", FamilyCameraEventsCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: "family-camera-events-card", name: "Family Camera Events", description: "Private Protect clip history with camera and date filters." });
