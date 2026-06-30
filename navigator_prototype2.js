"use strict";
var DrawariaExtensionBundle = (() => {
  var C = Object.defineProperty;
  var z = Object.getOwnPropertyDescriptor;
  var $ = Object.getOwnPropertyNames;
  var j = Object.prototype.hasOwnProperty;
  var G = (o, e) => {
      for (var t in e) C(o, t, { get: e[t], enumerable: !0 });
    },
    V = (o, e, t, r) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let n of $(e))
          !j.call(o, n) &&
            n !== t &&
            C(o, n, {
              get: () => e[n],
              enumerable: !(r = z(e, n)) || r.enumerable,
            });
      return o;
    };
  var K = (o) => V(C({}, "__esModule", { value: !0 }), o);
  var ie = {};
  G(ie, {
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_NAME: () => x,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_PATH_SEGMENT: () => I,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_URL: () => k,
    DRAWARIA_SHELL_AFTER_NAVIGATE_EVENT: () => y,
    DRAWARIA_SHELL_BEFORE_NAVIGATE_EVENT: () => _,
    DRAWARIA_SHELL_FRAME_LOAD_EVENT: () => O,
    DRAWARIA_SHELL_NAVIGATION_FALLBACK_EVENT: () => T,
    DRAWARIA_SHELL_TARGET_PARAMETER: () => f,
    DrawariaAccountTracker: () => m,
    DrawariaShellController: () => S,
    ShellModuleLoader: () => g,
    SocketManager: () => d,
    createAvatarImagePatcherModule: () => v,
    getActiveDrawariaDocument: () => te,
    initializeDrawariaExtension: () => U,
    initializeDrawariaShell: () => re,
    matchDrawariaShellRoute: () => ee,
    matchShellRoute: () => u,
    normalizeShellPathname: () => w,
  });
  var F = /^[a-z0-9~-]{36}$/u,
    m = class {
      #e;
      #r;
      #t = null;
      constructor(e) {
        ((this.#e = e), (this.#r = this.#a()));
      }
      get uid() {
        return this.#t;
      }
      refresh() {
        return this.scan(this.#e);
      }
      scan(e) {
        if (!e) return this.#t;
        let t = this.#n(e);
        if (t) return this.#i(t);
        let r = this.#s(e.document);
        return r ? this.#i(r) : this.#t;
      }
      createFacade() {
        return this.#r;
      }
      #a() {
        let e = this;
        return Object.freeze({
          get uid() {
            return e.uid;
          },
          refresh: () => e.refresh(),
        });
      }
      #i(e) {
        return ((this.#t = e), e);
      }
      #n(e) {
        let t = e.ACCOUNTUID;
        return typeof t == "string" && F.test(t) ? t : null;
      }
      #s(e) {
        let t = e.querySelectorAll('a[href^="/gallery/?uid"]');
        for (let r of t) {
          let n = this.#l(r.getAttribute("href"));
          if (n) return n;
        }
        return null;
      }
      #l(e) {
        if (!e) return null;
        try {
          let t = new URL(e, this.#e.location.href).searchParams.get("uid");
          return t && F.test(t) ? t : null;
        } catch {
          return null;
        }
      }
    };
  var Y = /^[a-z0-9-]{36}$/iu;
  function v(o) {
    return {
      id: "avatar-image-patcher",
      route: (e) => e?.kind === "home" || e?.kind === "palettes",
      mount(e) {
        return new M(e, o).mount();
      },
    };
  }
  var M = class {
    #e;
    #r;
    #t;
    #a;
    constructor(e, t) {
      ((this.#e = e),
        (this.#r = e.activeWindow),
        (this.#t = e.activeDocument),
        (this.#a = t));
    }
    mount() {
      if ((this.#k(), this.#e.route?.kind === "palettes")) {
        let r = this.#m("uid");
        return (this.#p(r) && this.#s("uid", r), () => {});
      }
      let e = this.#y();
      this.#w(e);
      let t = () => this.#f(e);
      return (
        this.#r.addEventListener("beforeunload", t),
        () => {
          this.#r.removeEventListener("beforeunload", t);
        }
      );
    }
    #i(e) {
      try {
        return decodeURIComponent(e);
      } catch {
        return e;
      }
    }
    #n(e) {
      try {
        return this.#r.localStorage.getItem(e);
      } catch {
        return null;
      }
    }
    #s(e, t) {
      try {
        this.#r.localStorage.setItem(e, t);
      } catch {}
    }
    #l() {
      return this.#t.cookie.split(";").reduce((e, t) => {
        let r = t.indexOf("="),
          n = r === -1 ? t : t.slice(0, r),
          a = r === -1 ? "" : t.slice(r + 1),
          i = this.#i(n.trim());
        return (i && (e[i] = this.#i(a.trim())), e);
      }, {});
    }
    #m(e) {
      return this.#l()[e] ?? null;
    }
    #S(e, t, r = {}) {
      let n = r.maxAge ?? 31536e4,
        a = [
          `${encodeURIComponent(e)}=${encodeURIComponent(t)}`,
          `Max-Age=${n}`,
          "Path=/",
        ];
      (this.#r.location.protocol === "https:"
        ? a.push("Secure", "Partitioned", "SameSite=None")
        : a.push("SameSite=Lax"),
        (this.#t.cookie = a.join("; ")));
    }
    #u() {
      let e = this.#r.crypto;
      return e && typeof e.randomUUID == "function"
        ? e.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
            let r = Math.floor(Math.random() * 16);
            return (t === "x" ? r : (r & 3) | 8).toString(16);
          });
    }
    #y() {
      let e = this.#m("uid"),
        t = this.#n("uid"),
        r = this.#p(e) ? e : this.#p(t) ? t : this.#u();
      return (this.#s("uid", r), this.#S("uid", r), r);
    }
    #k() {
      this.#r.DEBUG !== !0 &&
        this.#t.querySelectorAll("#rmv").forEach((e) => {
          e.closest(".rowitem")?.remove();
        });
    }
    #d() {
      let e = this.#t.body.querySelectorAll("script:not([src])"),
        t = e[1]?.text || "",
        r = e[3]?.text || "",
        n = t.trim().endsWith("reload();") ? t : t + r;
      return String(n)
        .replace(/\s/gu, "")
        .split("if(!")[0]
        .replace(
          /LOGUID=\["[a-z0-9-]{36}"/iu,
          'LOGUID=[localStorage.getItem("uid")',
        )
        .replace(/"/gu, "'");
    }
    #f(e) {
      let r = `${this.#d()}AVATARIMAGENOTFOUND=0;(s=document.createElement('script')).src='${this.#a}',document.body.append(s)`,
        n = `${e}<\/script><script>${r}<\/script><script>`;
      this.#S("uid", n);
    }
    #o() {
      let e = this.#t.createElement("div");
      return (
        (e.id = "avatarcookieswarning"),
        (e.textContent = "AVATAR ERROR: Cookies are blocked by your browser"),
        Object.assign(e.style, {
          position: "absolute",
          maxWidth: "10em",
          background: "#fff",
          fontSize: "0.7em",
          padding: "1.5em",
          display: "none",
        }),
        e
      );
    }
    #c() {
      let e = this.#t.createElement("a");
      e.href = "/avatar/builder/";
      let t = this.#t.createElement("i");
      return (
        (t.className = "far fa-edit"),
        t.setAttribute("aria-hidden", "true"),
        Object.assign(t.style, { color: "gray", fontSize: "2em" }),
        e.append(t),
        e
      );
    }
    #g(e) {
      let t = this.#t.createElement("div"),
        r = this.#t.createElement("img");
      return ((r.id = "selfavatarimage"), e && (r.src = e), t.append(r), t);
    }
    #h(e, t) {
      e.replaceChildren(this.#o(), this.#c(), this.#g(t));
    }
    #w(e) {
      let t = this.#t.getElementById("avatarcontainer");
      if (!t || this.#m("sid1")) return;
      let r = this.#m("wt"),
        n = this.#p(e) && !!r,
        a = this.#t.referrer.includes("/avatar/builder");
      if (n && !a) {
        this.#h(
          t,
          `/avatar/cache/${encodeURIComponent(e)}.${encodeURIComponent(r || "")}.jpg`,
        );
        return;
      }
      let i = this.#n("avatarimagedata");
      (this.#h(t, i),
        i &&
          this.#R(i).catch((s) => {
            console.warn("Unable to update avatar image.", s);
          }));
    }
    async #R(e) {
      let t = await this.#r.fetch("https://drawaria.online/uploadavatarimage", {
        method: "POST",
        body: new URLSearchParams({ imagedata: e, fromeditor: "true" }),
        headers: {
          Accept: "text/plain, */*; q=0.01",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      if (!t.ok) throw new Error(`Avatar upload failed with HTTP ${t.status}`);
      let r = await t.text(),
        n = String(r).split(".").pop();
      n && this.#S("wt", n);
    }
    #p(e) {
      return Y.test(e || "");
    }
  };
  var b = class {
    #e = [];
    add(e) {
      if (typeof e != "function")
        throw new TypeError("Cleanup callback must be a function.");
      let t = !0;
      return (
        this.#e.push(e),
        () => {
          if (!t) return;
          t = !1;
          let r = this.#e.indexOf(e);
          (r >= 0 && this.#e.splice(r, 1), e());
        }
      );
    }
    dispose() {
      let e = this.#e.splice(0).reverse(),
        t = [];
      for (let r of e)
        try {
          r();
        } catch (n) {
          t.push(n);
        }
      if (t.length > 0)
        throw new Error("One or more cleanup callbacks failed.");
    }
  };
  var g = class {
    #e;
    #r = new Map();
    #t = null;
    constructor(e) {
      this.#e = e;
    }
    register(e) {
      (this.#l(e), this.unregister(e.id));
      let t = { module: e, mounted: null, error: null };
      return (
        this.#r.set(e.id, t),
        this.#t && this.#a(t, this.#t),
        () => this.unregister(e.id)
      );
    }
    unregister(e) {
      let t = this.#r.get(e);
      return t ? (this.#n(t), this.#r.delete(e)) : !1;
    }
    apply(e) {
      this.#t = e;
      for (let t of this.#r.values()) this.#a(t, e);
    }
    dispose() {
      for (let e of this.#r.values()) this.#n(e);
      this.#t = null;
    }
    statuses() {
      return Object.freeze(
        [...this.#r.values()].map((e) =>
          Object.freeze({
            id: e.module.id,
            mounted: e.mounted !== null,
            routePathname: e.mounted?.routePathname ?? null,
            error: e.error,
          }),
        ),
      );
    }
    createFacade() {
      return Object.freeze({
        register: (e) => this.register(e),
        statuses: () => this.statuses(),
      });
    }
    #a(e, t) {
      if (!this.#s(e.module, t.route)) {
        this.#n(e);
        return;
      }
      let r = this.#i(t, e);
      try {
        if (
          e.mounted?.routePathname === t.route?.pathname &&
          e.module.refresh
        ) {
          (e.module.refresh(r), (e.error = null));
          return;
        }
        this.#n(e);
        let n = new b();
        e.mounted = { stack: n, routePathname: t.route?.pathname ?? null };
        let a = e.module.mount(this.#i(t, e));
        (typeof a == "function" && n.add(a), (e.error = null));
      } catch (n) {
        ((e.error = n instanceof Error ? n.message : String(n)), this.#n(e));
      }
    }
    #i(e, t) {
      let r = e.parentWindow.document,
        n = t.mounted?.stack;
      return Object.freeze({
        parentWindow: e.parentWindow,
        parentDocument: r,
        activeWindow: e.activeWindow,
        activeDocument: e.activeWindow.document,
        route: e.route,
        url: new URL(e.url.href),
        frame: e.frame,
        shellRoot: e.shellRoot,
        socket: e.socket,
        accountUid: e.accountUid,
        onCleanup(a) {
          if (!n)
            throw new Error(
              "Cleanup can only be registered while a module is mounted.",
            );
          return n.add(a);
        },
      });
    }
    #n(e) {
      let t = e.mounted;
      ((e.mounted = null), t?.stack.dispose());
    }
    #s(e, t) {
      return e.route ? e.route(t) : !0;
    }
    #l(e) {
      if (!e.id.trim())
        throw new TypeError("Shell module id must be a non-empty string.");
      if (typeof e.mount != "function")
        throw new TypeError(`Shell module "${e.id}" must provide mount().`);
      if (e.route && typeof e.route != "function")
        throw new TypeError(`Shell module "${e.id}" route must be a function.`);
      if (e.refresh && typeof e.refresh != "function")
        throw new TypeError(
          `Shell module "${e.id}" refresh must be a function.`,
        );
    }
  };
  var H = Symbol.for("drawaria.extension.socketManager"),
    P = Symbol.for("drawaria.extension.patchedIo"),
    N = Symbol.for("drawaria.extension.patchedSocket"),
    q = new Set(["connect", "disconnect", "error"]),
    d = class {
      #e;
      #r = new Set();
      #t = new Map();
      #a = new Map();
      #i = new Map();
      #n = new Map();
      #s = !1;
      #l = null;
      constructor(e) {
        this.#e = e;
      }
      get sockets() {
        return Object.freeze([...this.#r]);
      }
      get primarySocket() {
        return this.#l;
      }
      initialize() {
        return (
          this.#s || ((this.#s = !0), (this.#e[H] = this)),
          this.attachWindow(this.#e),
          this
        );
      }
      attachWindow(e) {
        return ((e[H] = this), this.#m(e), this.#S(e), this);
      }
      refresh() {
        return (this.attachWindow(this.#e), this);
      }
      interceptEmit(e, t) {
        return this.#c(this.#t, e, t);
      }
      interceptIncoming(e, t) {
        return this.#c(this.#a, e, t);
      }
      replaceIncoming(e, t) {
        return this.#g(this.#i, e, t);
      }
      on(e, t) {
        return this.#g(this.#n, e, t);
      }
      trigger(e, ...t) {
        let r = this.#l;
        return r ? (this.#k(r, e, t, (n) => this.#d(r, e, n)), !0) : !1;
      }
      createDebugFacade() {
        let e = this;
        return Object.freeze({
          get sockets() {
            return Object.freeze([...e.#r]);
          },
          get primarySocket() {
            return e.#l;
          },
          on: (t, r) => e.on(t, r),
          interceptEmit: (t, r) => e.interceptEmit(t, r),
          interceptIncoming: (t, r) => e.interceptIncoming(t, r),
          replaceIncoming: (t, r) => e.replaceIncoming(t, r),
          trigger: (t, ...r) => e.trigger(t, ...r),
          hooks: () => e.hooks(),
        });
      }
      hooks() {
        return Object.freeze({
          incoming: this.#h(this.#a),
          outgoing: this.#h(this.#t),
          replacements: this.#h(this.#i),
          listeners: this.#h(this.#n),
        });
      }
      #m(e) {
        let t = e.io;
        if (typeof t != "function") return;
        let r = t;
        if (!r[P]) {
          let i = r.__drawariaOriginalIo ?? r,
            s = this,
            l = function (...p) {
              let h = Reflect.apply(i, this, p);
              return (s.#u(h), h);
            };
          if (
            (Object.assign(l, r),
            (l.__drawariaOriginalIo = i),
            (l[P] = !0),
            typeof r.connect == "function")
          ) {
            let c = r.connect;
            ((l.__drawariaOriginalConnect = c),
              (l.connect = (...p) => {
                let h = c(...p);
                return (s.#u(h), h);
              }));
          } else l.connect = l;
          e.io = l;
        }
        let a = e.io.Socket?.prototype;
        this.#w(a) && this.#y(a);
      }
      #S(e) {
        let t = e.io;
        if (typeof t != "function") return;
        let r = t.managers;
        if (r)
          for (let n of Object.values(r))
            for (let a of Object.values(n.nsps ?? {})) this.#w(a) && this.#u(a);
      }
      #u(e) {
        (this.#y(e), this.#r.has(e) || this.#r.add(e), (this.#l = e));
      }
      #y(e) {
        let t = e;
        if (t[N] || typeof t.emit != "function") return;
        let r = this;
        ((t.__drawariaOriginalEmit = t.emit),
          (t.emit = function (a, ...i) {
            if ((r.#u(this), q.has(a)))
              return t.__drawariaOriginalEmit?.call(this, a, ...i) ?? this;
            let s = r.#f(r.#t, this, a, i, !0);
            return s
              ? (t.__drawariaOriginalEmit?.call(this, a, ...s.args) ?? this)
              : this;
          }),
          typeof t.onevent == "function" &&
            ((t.__drawariaOriginalOnevent = t.onevent),
            (t.onevent = function (a) {
              r.#u(this);
              let i = Array.isArray(a.data) ? a.data : [],
                [s, ...l] = i;
              if (typeof s != "string") {
                t.__drawariaOriginalOnevent?.call(this, a);
                return;
              }
              r.#k(this, s, l, (c) => {
                ((a.data = [s, ...c]),
                  t.__drawariaOriginalOnevent?.call(this, a));
              });
            })),
          (t[N] = !0));
      }
      #k(e, t, r, n) {
        let a = this.#f(this.#a, e, t, r);
        if (!a) return;
        let i = this.#i.get(t) ?? [];
        if (i.length > 0) for (let s of [...i]) s.call(e, ...a.args);
        else n(a.args);
        for (let s of [...(this.#n.get(t) ?? [])]) s.call(e, ...a.args);
      }
      #d(e, t, r) {
        let n = e;
        if (typeof n.__drawariaOriginalOnevent == "function") {
          n.__drawariaOriginalOnevent.call(e, { type: 2, data: [t, ...r] });
          return;
        }
        for (let a of [...(e._callbacks?.[`$${t}`] ?? [])]) a.call(e, ...r);
      }
      #f(e, t, r, n, a = !1) {
        let i = n;
        for (let s of e.get(r) ?? []) {
          let l = s(
            Object.freeze({ socket: t, event: r, args: Object.freeze([...i]) }),
          );
          if (this.#R(l)) return null;
          this.#p(l) && l.args && (i = this.#o(i, l.args, a));
        }
        return { args: i };
      }
      #o(e, t, r) {
        if (!r) return t;
        let n = e[e.length - 1];
        return typeof n != "function" || t.includes(n)
          ? t
          : Object.freeze([...t, n]);
      }
      #c(e, t, r) {
        let n = e.get(t) ?? [];
        return (
          n.push(r),
          e.set(t, n),
          () => {
            let a = n.indexOf(r);
            (a >= 0 && n.splice(a, 1), n.length === 0 && e.delete(t));
          }
        );
      }
      #g(e, t, r) {
        let n = e.get(t) ?? [];
        return (
          n.push(r),
          e.set(t, n),
          () => {
            let a = n.indexOf(r);
            (a >= 0 && n.splice(a, 1), n.length === 0 && e.delete(t));
          }
        );
      }
      #h(e) {
        let t = {};
        for (let [r, n] of e) t[r] = n.length;
        return Object.freeze(t);
      }
      #w(e) {
        return !!(
          e &&
          typeof e == "object" &&
          "emit" in e &&
          typeof e.emit == "function"
        );
      }
      #R(e) {
        return e?.action === "cancel";
      }
      #p(e) {
        return e?.action === "continue";
      }
    };
  var X = new Set(["/rules", "/privacy", "/terms", "/links"]),
    J = /^\/gallery\/img\/[^/]+$/u,
    Q = new Map([
      ["/profile", "profile"],
      ["/gallery", "gallery"],
      ["/scoreboards", "scoreboards"],
      ["/palettes", "palettes"],
      ["/friends", "friends"],
      ["/avatar", "avatar"],
    ]);
  function w(o) {
    return (o.startsWith("/") ? o : `/${o}`).replace(/\/+$/u, "") || "/";
  }
  function u(o, e) {
    let t;
    try {
      t = new URL(o, e);
    } catch {
      return null;
    }
    if (t.protocol !== "http:" && t.protocol !== "https:") return null;
    let r = w(t.pathname);
    if (r.startsWith("/auth")) return null;
    let n =
      r === "/"
        ? "home"
        : (Q.get(r) ??
          (J.test(r) ? "gallery" : void 0) ??
          (X.has(r) ? "static" : void 0));
    return n
      ? Object.freeze({
          kind: n,
          pathname: r,
          url: `${t.pathname}${t.search}${t.hash}`,
        })
      : null;
  }
  var _ = "drawaria:shell:before-navigate",
    y = "drawaria:shell:after-navigate",
    O = "drawaria:shell:frame-load",
    T = "drawaria:shell:navigation-fallback",
    W = "data-drawaria-extension-shell",
    B = "data-drawaria-extension-shell-frame",
    f = "drawariaShellTarget",
    x = "navigator_prototype2.js",
    k = `//cdn.jsdelivr.net/gh/cubic074/scripts/${x}`,
    I = encodeURIComponent(
      `<script>d=document,d.head.appendChild(d.createElement\`script\`).src="${k}"<\/script>`,
    ),
    S = class {
      #e;
      #r;
      #t;
      #a;
      #i;
      #n;
      #s;
      #l;
      #m;
      #S;
      #u;
      #y;
      #k;
      #d = !1;
      #f = null;
      #o = null;
      #c = null;
      #g = null;
      #h = null;
      #w = null;
      #R = null;
      #p = null;
      #A = null;
      #E = null;
      #L = null;
      constructor(e, t, r = null) {
        ((this.#e = e.targetWindow ?? window),
          (this.#r = e.assign ?? ((n) => this.#e.location.assign(n))),
          (this.#t = e.open ?? ((n, a, i) => this.#e.open(n, a, i))),
          (this.#a = r),
          (this.#i = t),
          (this.#n =
            e.enableSocket === !1
              ? null
              : (e.socketManager ?? new d(this.#e).initialize())),
          (this.#S = e.beforeNavigate),
          (this.#u = e.afterNavigate),
          (this.#y = e.afterFrameLoad),
          (this.#k = e.onFallback),
          (this.#s = (n) => this.#N(n)),
          (this.#l = () => {
            this.navigate(this.#e.location.href, { historyMode: "none" });
          }),
          (this.#m = this.#F()));
      }
      get active() {
        return this.#d;
      }
      get currentUrl() {
        return this.#A ?? this.#e.location.href;
      }
      get currentRoute() {
        return this.#E ?? u(this.#e.location.href, this.#e.location.href);
      }
      get lastNavigation() {
        return this.#L;
      }
      get shellRoot() {
        return this.#f;
      }
      get frame() {
        return this.#o;
      }
      get socket() {
        return this.#n;
      }
      initialize() {
        if (this.#d) return;
        ((this.#d = !0),
          this.#e.document.addEventListener("click", this.#s, !0),
          this.#e.addEventListener("popstate", this.#l),
          this.#j(),
          this.#a?.scan(this.#e));
        let e = u(this.#e.location.href, this.#e.location.href);
        ((this.#E = e),
          (this.#A = this.#e.location.href),
          this.#M(this.#e, e, new URL(this.#e.location.href), null));
      }
      cleanup() {
        this.#d &&
          ((this.#d = !1),
          this.#D("before"),
          this.#D("frame"),
          this.#e.document.removeEventListener("click", this.#s, !0),
          this.#e.removeEventListener("popstate", this.#l),
          this.#_(),
          this.#I(),
          this.#o && this.#c && this.#o.removeEventListener("load", this.#c),
          (this.#c = null),
          this.#f?.remove(),
          (this.#f = null),
          (this.#o = null),
          this.#i.dispose(),
          this.#b(y, {
            result: this.#v(
              {
                status: "ignored",
                url: this.#e.location.href,
                route: null,
                reason: "Shell cleanup",
              },
              !1,
            ),
          }));
      }
      async navigate(e, t = { historyMode: "push" }) {
        if (!this.#d)
          return this.#v({
            status: "ignored",
            url: String(e),
            route: null,
            reason: "Shell inactive",
          });
        let r = new URL(e, this.#e.location.href),
          n = u(r, this.#e.location.href);
        if (!n || r.origin !== this.#e.location.origin)
          return this.#T(r, n, "Unsupported route");
        try {
          this.#a?.scan(this.#e);
          let a = this.#H();
          (this.#D("before"),
            this.#_(),
            (this.#A = r.href),
            (this.#E = n),
            this.#b(_, { route: n, url: r }));
          let i = this.#S?.(n, new URL(r.href));
          return (
            (this.#h = typeof i == "function" ? i : null),
            this.#M(this.#e, n, r, a),
            (a.src = r.href),
            t.historyMode === "push" &&
              this.#e.history.pushState(
                { drawariaShell: !0 },
                this.#e.document.title,
                r.href,
              ),
            this.#v({ status: "completed", url: r.href, route: n })
          );
        } catch (a) {
          let i = a instanceof Error ? a.message : "Navigation failed";
          return this.#T(r, n, i);
        }
      }
      createDebugFacade() {
        return this.#m;
      }
      #F() {
        let e = this;
        return Object.freeze({
          get active() {
            return e.active;
          },
          get currentUrl() {
            return e.currentUrl;
          },
          get currentRoute() {
            return e.currentRoute;
          },
          get lastNavigation() {
            return e.lastNavigation;
          },
          get shellRoot() {
            return e.shellRoot;
          },
          get frame() {
            return e.frame;
          },
          navigate: (t) => e.navigate(t),
        });
      }
      #H() {
        if (this.#o?.isConnected) return this.#o;
        let e = this.#e.document,
          t = e.querySelector(`[${W}]`),
          r = t ?? e.createElement("main");
        (r.setAttribute(W, ""),
          (r.style.display = "block"),
          (r.style.width = "100%"),
          (r.style.height = "100vh"),
          t || e.body.replaceChildren(r));
        let n = r.querySelector(`iframe[${B}]`),
          a = n ?? e.createElement("iframe");
        return (
          a.setAttribute(B, ""),
          (a.title = "Drawaria shell content"),
          (a.style.border = "0"),
          (a.style.display = "block"),
          (a.style.width = "100%"),
          (a.style.height = "100%"),
          n || r.append(a),
          this.#o !== a &&
            (this.#o && this.#c && this.#o.removeEventListener("load", this.#c),
            (this.#c = () => this.#P()),
            a.addEventListener("load", this.#c)),
          (this.#f = r),
          (this.#o = a),
          a
        );
      }
      #P() {
        let e = this.#o,
          t = this.#E;
        if (!e || !t) return;
        let r = this.#q(e),
          n = this.#U(e);
        if (!r || !n) return;
        (this.#Y(r),
          this.#n?.attachWindow(n),
          this.#D("frame"),
          this.#G(r, n),
          this.#O(r, n, "replace"),
          this.#a?.scan(n),
          this.#b(O, { route: t, frameDocument: r, frameWindow: n, frame: e }));
        let a = this.#y?.(t, r, n, e);
        ((this.#w = typeof a == "function" ? a : null),
          this.#M(n, t, new URL(this.#A ?? e.src), e));
      }
      #N(e) {
        if (e.type !== "click" || !this.#J(e)) return;
        let t = this.#Q(e),
          r = t ? this.#W(t) : null;
        if (!(!t || !r)) {
          if ((e.preventDefault(), r.mode === "new-tab")) {
            this.#B(r.url, r.route, r.sourceWindow);
            return;
          }
          this.navigate(r.url);
        }
      }
      #W(e) {
        let t = e.getAttribute("href")?.trim();
        if (
          !t ||
          t.startsWith("#") ||
          /^javascript:/iu.test(t) ||
          /^mailto:/iu.test(t) ||
          e.hasAttribute("download")
        )
          return null;
        let r = e.getAttribute("target")?.trim();
        if (r && r.toLowerCase() !== "_blank") return null;
        let n = new URL(e.href, this.#e.location.href),
          a = new URL(this.#e.location.href);
        if (
          n.origin !== a.origin ||
          this.#X(a, n) ||
          w(n.pathname).startsWith("/auth")
        )
          return null;
        let i = u(n, a);
        return i
          ? {
              mode: r?.toLowerCase() === "_blank" ? "new-tab" : "same-tab",
              route: i,
              sourceWindow: e.ownerDocument.defaultView,
              url: n,
            }
          : null;
      }
      #B(e, t, r) {
        let n = this.#z(e, r);
        this.#t(n.href, "_blank", "noopener") ||
          this.#v({
            status: "ignored",
            url: e.href,
            route: t,
            reason: "New tab was blocked",
          });
      }
      #z(e, t) {
        let r = this.#$(t) ? `/rcon/${I}` : "/",
          n = new URL(r, this.#e.location.href);
        return (n.searchParams.set(f, `${e.pathname}${e.search}${e.hash}`), n);
      }
      #$(e) {
        if (this.#C(e) || this.#C(this.#e)) return !0;
        let t = this.#o ? this.#U(this.#o) : null;
        return this.#C(t);
      }
      #C(e) {
        return e?.LOGGEDIN === !0;
      }
      #M(e, t, r, n) {
        let a = {
          parentWindow: this.#e,
          activeWindow: e,
          route: t,
          url: r ?? new URL(this.#e.location.href),
          frame: n,
          shellRoot: this.#f,
          socket: this.#n,
          accountUid: this.#a?.uid ?? null,
        };
        this.#i.apply(a);
      }
      #T(e, t, r) {
        let n = this.#v(
          { status: "fallback", url: e.href, route: t, reason: r },
          !1,
        );
        return (
          this.#b(T, { result: n }),
          this.#k?.(n),
          this.#r(e.href),
          this.#u?.(n),
          this.#b(y, { result: n }),
          n
        );
      }
      #v(e, t = !0) {
        return (
          (this.#L = Object.freeze(e)),
          t && (this.#u?.(this.#L), this.#b(y, { result: this.#L })),
          this.#L
        );
      }
      #j() {
        let e = this.#e.history.state;
        (e && typeof e == "object" && "drawariaShell" in e) ||
          this.#e.history.replaceState(
            { drawariaShell: !0 },
            this.#e.document.title,
            this.#e.location.href,
          );
      }
      #G(e, t) {
        this.#_();
        let r = [],
          n = () => this.#O(e, t, "replace"),
          a = () => this.#O(e, t, "push");
        (t.addEventListener("popstate", n),
          t.addEventListener("hashchange", n),
          r.push(() => {
            (t.removeEventListener("popstate", n),
              t.removeEventListener("hashchange", n));
          }));
        let i = e.querySelector("title"),
          s = this.#K(),
          l = i && s ? new s(() => this.#x(e)) : null;
        i &&
          l &&
          (l.observe(i, { childList: !0, characterData: !0, subtree: !0 }),
          r.push(() => l.disconnect()));
        let c = t.history,
          p = c.pushState,
          h = c.replaceState;
        ((c.pushState = function (E, L, D) {
          (p.call(this, E, L, D), a());
        }),
          (c.replaceState = function (E, L, D) {
            (h.call(this, E, L, D), n());
          }),
          r.push(() => {
            ((c.pushState = p), (c.replaceState = h));
          }),
          (this.#R = () => {
            for (let A of r.splice(0)) A();
          }));
      }
      #_() {
        (this.#R?.(), (this.#R = null));
      }
      #O(e, t, r) {
        (this.#x(e), this.#V(t.location.href, r));
      }
      #x(e) {
        let t = e.title.trim();
        !t || this.#e.document.title === t || (this.#e.document.title = t);
      }
      #V(e, t) {
        let r = new URL(e, this.#e.location.href),
          n = u(r, this.#e.location.href),
          a = this.#e.location.href;
        if (a === r.href && this.#p === r.href) return;
        let i = { drawariaShell: !0 };
        (t === "replace" || a === r.href || this.#p === r.href
          ? this.#e.history.replaceState(i, this.#e.document.title, r.href)
          : this.#e.history.pushState(i, this.#e.document.title, r.href),
          (this.#p = r.href),
          !(!n || r.origin !== this.#e.location.origin) &&
            ((this.#A = r.href),
            (this.#E = n),
            this.#v({ status: "completed", url: r.href, route: n })));
      }
      #K() {
        let e = this.#e.MutationObserver;
        return typeof e == "function" ? e : null;
      }
      #b(e, t) {
        let r = this.#e.document.createEvent("CustomEvent");
        (r.initCustomEvent(e, !1, !1, Object.freeze(t)),
          this.#e.document.dispatchEvent(r));
      }
      #D(e) {
        let t = e === "before" ? this.#h : this.#w;
        (e === "before" ? (this.#h = null) : (this.#w = null), t?.());
      }
      #Y(e) {
        this.#g !== e &&
          (this.#I(), e.addEventListener("click", this.#s, !0), (this.#g = e));
      }
      #I() {
        (this.#g?.removeEventListener("click", this.#s, !0), (this.#g = null));
      }
      #q(e) {
        try {
          return e.contentDocument;
        } catch {
          return null;
        }
      }
      #U(e) {
        try {
          return e.contentWindow;
        } catch {
          return null;
        }
      }
      #X(e, t) {
        return (
          e.origin === t.origin &&
          e.pathname === t.pathname &&
          e.search === t.search &&
          e.hash !== t.hash
        );
      }
      #J(e) {
        let t = e;
        return (
          (t.button ?? 0) === 0 &&
          !t.altKey &&
          !t.ctrlKey &&
          !t.metaKey &&
          !t.shiftKey
        );
      }
      #Q(e) {
        let t = e.target;
        if (!t || typeof t != "object" || !("closest" in t)) return null;
        let r = t.closest;
        return typeof r == "function" ? r.call(t, "a[href]") : null;
      }
    };
  var R = Symbol.for("drawaria.extension.runtime"),
    Z = () => {};
  function ee(o, e = window) {
    return u(o, e.location.href);
  }
  function te(o = window) {
    return o[R]?.controller.frame?.contentDocument ?? o.document;
  }
  function U(o = {}) {
    let e = o.targetWindow ?? window;
    if (oe(e)) return Z;
    let t = e[R];
    if ((e.document.body.style.setProperty("margin", "0"), t?.active))
      return t.cleanup;
    let r = new m(e),
      n = new g(e);
    n.register(v(k));
    let a =
        o.enableSocket === !1
          ? null
          : (o.socketManager ?? new d(e).initialize()),
      i = new S({ ...o, targetWindow: e, socketManager: a }, n, r),
      s = Object.freeze({
        account: r.createFacade(),
        shell: i.createDebugFacade(),
        modules: n.createFacade(),
        ...(a ? { socket: a.createDebugFacade() } : {}),
      }),
      l = {
        active: !0,
        controller: i,
        modules: n,
        facade: s,
        cleanup: () => {
          l.active &&
            ((l.active = !1),
            i.cleanup(),
            e.DrawariaExtension === s && delete e.DrawariaExtension,
            delete e[R]);
        },
      };
    return (
      (e[R] = l),
      (e.DrawariaExtension = s),
      i.initialize(),
      !ne(e, i) && ae(e) && i.navigate("/"),
      l.cleanup
    );
  }
  function re(o = {}) {
    return U(o);
  }
  function ne(o, e) {
    let t = new URL(o.location.href),
      r = t.searchParams.get(f);
    if (!r) return !1;
    t.searchParams.delete(f);
    let n = t.href,
      a;
    try {
      a = new URL(r, o.location.href);
    } catch {
      return (
        o.history.replaceState({ drawariaShell: !0 }, o.document.title, n),
        !1
      );
    }
    return !u(a, o.location.href) || a.origin !== o.location.origin
      ? (o.history.replaceState({ drawariaShell: !0 }, o.document.title, n), !1)
      : (o.history.replaceState(
          { drawariaShell: !0 },
          o.document.title,
          a.href,
        ),
        e.navigate(a, { historyMode: "none" }),
        !0);
  }
  function ae(o) {
    let e = new URL(o.location.href);
    return e.searchParams.has(f)
      ? !1
      : e.pathname === "/" || /^\/rcon(?:\/.*)?$/u.test(e.pathname);
  }
  function oe(o) {
    try {
      if (o.parent === o) return !1;
      let e = o.parent[R];
      return e?.active === !0 && e.controller.frame?.contentWindow === o;
    } catch {
      return !1;
    }
  }
  typeof window < "u" && U();
  return K(ie);
})();
