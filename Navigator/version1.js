// ==UserScript==
// @name         Drawaria Shell
// @version      2026-07-01
// @description  A modular extension framework for Drawaria Online
// @namespace    drawaria.modded
// @homepage     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://drawaria.online/
// @icon         https://drawaria.online/avatar/cache/e53693c0-18b1-11ec-b633-b7649fa52d3f.jpg
// @grant        none
// @license      GNU GPLv3
// @run-at       document-end
// ==/UserScript==

"use strict";
var DrawariaExtensionBundle = (() => {
  var H = Object.defineProperty;
  var bt = Object.getOwnPropertyDescriptor;
  var Lt = Object.getOwnPropertyNames;
  var Ut = Object.prototype.hasOwnProperty;
  var Tt = (n, t) => {
      for (var e in t) H(n, e, { get: t[e], enumerable: !0 });
    },
    Dt = (n, t, e, r) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let a of Lt(t))
          !Ut.call(n, a) &&
            a !== e &&
            H(n, a, {
              get: () => t[a],
              enumerable: !(r = bt(t, a)) || r.enumerable,
            });
      return n;
    };
  var Ct = (n) => Dt(H({}, "__esModule", { value: !0 }), n);
  var ce = {};
  Tt(ce, {
    AvatarMetadataStorage: () => A,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_NAME: () => Z,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_PATH_SEGMENT: () => tt,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_URL: () => b,
    DRAWARIA_SHELL_AFTER_NAVIGATE_EVENT: () => M,
    DRAWARIA_SHELL_BEFORE_NAVIGATE_EVENT: () => q,
    DRAWARIA_SHELL_FRAME_LOAD_EVENT: () => X,
    DRAWARIA_SHELL_NAVIGATION_FALLBACK_EVENT: () => Q,
    DRAWARIA_SHELL_TARGET_PARAMETER: () => S,
    DrawariaAccountTracker: () => y,
    DrawariaShellController: () => E,
    ShellModuleLoader: () => v,
    SocketManager: () => g,
    createAvatarImagePatcherModule: () => I,
    createAvatarMetadataStorageModule: () => C,
    embedAvatarMetadataBytes: () => mt,
    embedJsonInImageMetadata: () => j,
    extractAvatarMetadataBytes: () => pt,
    extractJsonFromImageMetadata: () => gt,
    getActiveDrawariaDocument: () => ae,
    initializeDrawariaExtension: () => et,
    initializeDrawariaShell: () => oe,
    matchDrawariaShellRoute: () => ne,
    matchShellRoute: () => u,
    normalizeShellPathname: () => x,
  });
  var rt = "drawaria-extension:logged-in",
    W = "drawaria-extension:account-uid",
    nt = /^[a-z0-9~-]{36}$/u;
  function p(n) {
    let t = n.LOGGEDIN;
    return typeof t == "boolean" ? t : null;
  }
  function U(n) {
    let t = lt(n, rt);
    return t === "true" ? !0 : t === "false" ? !1 : null;
  }
  function at(n, t) {
    ct(n, rt, String(t));
  }
  function ot(n) {
    let t = lt(n, W);
    return t && nt.test(t) ? t : null;
  }
  function it(n, t) {
    nt.test(t) && ct(n, W, t);
  }
  function st(n) {
    It(n, W);
  }
  function lt(n, t) {
    try {
      return n.localStorage.getItem(t);
    } catch {
      return null;
    }
  }
  function ct(n, t, e) {
    try {
      n.localStorage.setItem(t, e);
    } catch {}
  }
  function It(n, t) {
    try {
      n.localStorage.removeItem(t);
    } catch {}
  }
  var ut = /^[a-z0-9~-]{36}$/u,
    y = class {
      #t;
      #r;
      #e = null;
      constructor(t) {
        ((this.#t = t), (this.#r = this.#i()));
      }
      get uid() {
        return this.#e;
      }
      refresh() {
        return this.scan(this.#t);
      }
      scan(t) {
        if (!t) return this.#e;
        let e = p(t);
        if (
          new URL(t.location.href).pathname === "/" &&
          e !== null &&
          (at(t, e), !e)
        )
          return ((this.#e = null), st(t), null);
        let r = this.#n(t);
        if (r) return this.#a(r);
        let a = this.#o(t.document);
        if (a) return this.#a(a);
        let o = ot(t);
        return o ? this.#a(o) : this.#e;
      }
      createFacade() {
        return this.#r;
      }
      #i() {
        let t = this;
        return Object.freeze({
          get uid() {
            return t.uid;
          },
          refresh: () => t.refresh(),
        });
      }
      #a(t) {
        return ((this.#e = t), it(this.#t, t), t);
      }
      #n(t) {
        let e = t.ACCOUNTUID;
        return typeof e == "string" && ut.test(e) ? e : null;
      }
      #o(t) {
        let e = t.querySelectorAll('a[href^="/gallery/?uid"]');
        for (let r of e) {
          let a = this.#s(r.getAttribute("href"));
          if (a) return a;
        }
        return null;
      }
      #s(t) {
        if (!t) return null;
        try {
          let e = new URL(t, this.#t.location.href).searchParams.get("uid");
          return e && ut.test(e) ? e : null;
        } catch {
          return null;
        }
      }
    };
  var d = new Uint8Array([68, 82, 65, 87, 77, 69, 84, 65]),
    dt = 1,
    w = d.length + 1 + 4,
    ft = 4,
    G = 60 * 1024,
    $ = 239,
    Ot = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
    z = new Uint8Array([100, 114, 65, 119]),
    _t = new Uint8Array([73, 69, 78, 68]),
    Pt = new Uint8Array([68, 82, 65, 87, 65, 82, 73, 65]),
    Ft = new Uint8Array([74, 83, 49]),
    ht = "drawaria-extension:avatar-metadata:",
    Nt = /^[a-z0-9~-]{36}$/u;
  function C(n) {
    let t = (e) => {
      n.observeContext(e);
    };
    return {
      id: "avatar-metadata-storage",
      mount(e) {
        return (t(e), () => {});
      },
      refresh: t,
    };
  }
  var A = class {
    #t;
    #r;
    #e = null;
    #i = !1;
    #a = null;
    #n = "idle";
    #o = null;
    #s = null;
    #c = null;
    #f = null;
    constructor(t) {
      ((this.#t = t), (this.#r = this.#m()));
    }
    get data() {
      return this.#a;
    }
    get status() {
      return this.#n;
    }
    get error() {
      return this.#o;
    }
    observeContext(t) {
      ((this.#i = this.#E(t)),
        (this.#e = t.accountUid ?? this.#e),
        this.#e &&
          (this.#d(this.#e),
          !(this.#s === this.#e || this.#f === this.#e) && this.load(this.#e)));
    }
    load(t = this.#e) {
      return t
        ? ((this.#e = t),
          this.#d(t),
          this.#c && this.#f === t
            ? this.#c
            : ((this.#n = "loading"),
              (this.#o = null),
              (this.#f = t),
              (this.#c = this.#g(t).finally(() => {
                ((this.#c = null), (this.#f = null));
              })),
              this.#c))
        : ((this.#n = "idle"), Promise.resolve(this.#a));
    }
    async loadForUid(t) {
      let e = this.#w(t);
      return this.#l(e);
    }
    async save(t, e) {
      if (!this.#i || !this.#e)
        throw new Error(
          "Avatar metadata can only be saved after a logged-in account uid is observed.",
        );
      ((this.#n = "saving"), (this.#o = null));
      try {
        let r = e ?? (await this.#h(this.#e)),
          a = await j(r, t),
          o = await this.#y(a);
        return (
          (this.#a = t),
          (this.#s = this.#e),
          (this.#n = "loaded"),
          this.#S(this.#e, t),
          Object.freeze({ imageData: a, response: o })
        );
      } catch (r) {
        throw ((this.#n = "error"), (this.#o = this.#v(r)), r);
      }
    }
    clearLocal() {
      ((this.#a = null),
        (this.#o = null),
        (this.#n = "idle"),
        (this.#s = null));
    }
    createFacade() {
      return this.#r;
    }
    async #g(t) {
      try {
        let e = await this.#h(t),
          r = this.#u(e);
        return r === null
          ? ((this.#a = null), (this.#n = "loaded"), (this.#s = t), null)
          : ((this.#a = r),
            (this.#n = "loaded"),
            (this.#s = t),
            this.#S(t, r),
            r);
      } catch (e) {
        return ((this.#n = "error"), (this.#o = this.#v(e)), this.#a);
      }
    }
    async #y(t) {
      let e = await this.#t.fetch(
        new URL("/saveavatar", this.#t.location.href).href,
        {
          method: "POST",
          body: new URLSearchParams({ imagedata: t, fromeditor: "true" }),
          headers: {
            Accept: "text/plain, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest",
          },
        },
      );
      if (!e.ok)
        throw new Error(`Avatar metadata upload failed with HTTP ${e.status}`);
      return e.text();
    }
    #A(t) {
      let e = new URL(
        `/avatar/cache/${encodeURIComponent(t)}.jpg`,
        this.#t.location.href,
      );
      return (
        e.searchParams.set(
          "drawariaExtensionAvatarMetadata",
          String(Date.now()),
        ),
        e.href
      );
    }
    async #h(t) {
      let e = await this.#t.fetch(this.#A(t));
      if (!e.ok)
        throw new Error(`Unable to load avatar image: HTTP ${e.status}.`);
      return new Uint8Array(await e.arrayBuffer());
    }
    #m() {
      let t = this;
      return Object.freeze({
        get data() {
          return t.data;
        },
        get status() {
          return t.status;
        },
        get error() {
          return t.error;
        },
        load: () => t.load(),
        loadForUid: (e) => t.loadForUid(e),
        save: (e, r) => t.save(e, r),
        clearLocal: () => t.clearLocal(),
      });
    }
    async #l(t) {
      return this.#u(await this.#h(t));
    }
    #u(t) {
      let e = V(t, R(t));
      return e.length === 0 ? null : K(e[e.length - 1]);
    }
    #w(t) {
      let e = t.trim();
      if (!Nt.test(e))
        throw new TypeError(
          "Avatar metadata lookup requires a valid Drawaria account uid.",
        );
      return e;
    }
    #d(t) {
      if (this.#a !== null) return;
      let e = this.#k(`${ht}${t}`);
      if (e)
        try {
          this.#a = JSON.parse(e);
        } catch {}
    }
    #S(t, e) {
      let r = JSON.stringify(e);
      r !== void 0 && this.#p(`${ht}${t}`, r);
    }
    #k(t) {
      try {
        return this.#t.localStorage.getItem(t);
      } catch {
        return null;
      }
    }
    #p(t, e) {
      try {
        this.#t.localStorage.setItem(t, e);
      } catch {}
    }
    #E(t) {
      let e = p(t.activeWindow);
      if (e !== null) return e;
      let r = p(t.parentWindow);
      return r !== null ? r : (U(this.#t) ?? this.#i);
    }
    #v(t) {
      return t instanceof Error ? t.message : String(t);
    }
  };
  async function j(n, t) {
    let e = await kt(n),
      r = R(e);
    return qt(At(e, r, wt(t)), Ht(r));
  }
  async function gt(n) {
    let t = await kt(n),
      e = V(t, R(t));
    if (e.length === 0)
      throw new Error(
        "The image does not contain Drawaria avatar JSON metadata.",
      );
    return K(e[e.length - 1]);
  }
  function mt(n, t) {
    let e = R(n);
    return At(n, e, wt(t));
  }
  function pt(n) {
    let t = V(n, R(n));
    if (t.length === 0)
      throw new Error(
        "The image does not contain Drawaria avatar JSON metadata.",
      );
    return K(t[t.length - 1]);
  }
  function J(n) {
    let t = 4294967295;
    for (let e of n) {
      t ^= e;
      for (let r = 0; r < 8; r++) t = (t >>> 1) ^ (3988292384 & -(t & 1));
    }
    return (t ^ 4294967295) >>> 0;
  }
  function D(n, t, e) {
    ((n[t] = e >>> 24),
      (n[t + 1] = e >>> 16),
      (n[t + 2] = e >>> 8),
      (n[t + 3] = e));
  }
  function B(n, t) {
    return ((n[t] << 24) | (n[t + 1] << 16) | (n[t + 2] << 8) | n[t + 3]) >>> 0;
  }
  function k(n) {
    let t = n.reduce((a, o) => a + o.length, 0),
      e = new Uint8Array(t),
      r = 0;
    for (let a of n) (e.set(a, r), (r += a.length));
    return e;
  }
  function f(n, t, e) {
    if (t < 0 || t + e.length > n.length) return !1;
    for (let r = 0; r < e.length; r++) if (n[t + r] !== e[r]) return !1;
    return !0;
  }
  function wt(n) {
    let t = JSON.stringify(n);
    if (t === void 0)
      throw new TypeError("The supplied value cannot be represented as JSON.");
    let e = new TextEncoder().encode(t);
    if (e.length > G)
      throw new RangeError(
        `The serialized metadata JSON exceeds the ${G}-byte UTF-8 limit.`,
      );
    let r = new Uint8Array(w + e.length + ft);
    return (
      r.set(d),
      (r[d.length] = dt),
      D(r, d.length + 1, e.length),
      r.set(e, w),
      D(r, w + e.length, J(e)),
      r
    );
  }
  function K(n) {
    if (!f(n, 0, d))
      throw new Error(
        "The image metadata does not contain a supported avatar JSON payload.",
      );
    if (n[d.length] !== dt)
      throw new Error(`Unsupported avatar metadata version ${n[d.length]}.`);
    let t = B(n, d.length + 1),
      e = w + t + ft;
    if (t > G || n.length !== e)
      throw new Error(
        "The embedded avatar metadata payload length is invalid.",
      );
    let r = n.slice(w, w + t);
    if (J(r) !== B(n, w + t))
      throw new Error(
        "The embedded avatar metadata payload failed checksum validation.",
      );
    try {
      return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(r));
    } catch (a) {
      let o = a instanceof Error ? ` ${a.message}` : "";
      throw new Error(
        `The embedded avatar metadata is not valid UTF-8 JSON.${o}`,
      );
    }
  }
  function R(n) {
    if (n.length >= 3 && n[0] === 255 && n[1] === 216 && n[2] === 255)
      return "jpeg";
    if (f(n, 0, Ot)) return "png";
    if (
      n.length >= 6 &&
      n[0] === 71 &&
      n[1] === 73 &&
      n[2] === 70 &&
      n[3] === 56 &&
      (n[4] === 55 || n[4] === 57) &&
      n[5] === 97
    )
      return "gif";
    throw new TypeError(
      "Metadata embedding supports JPEG, PNG, and GIF image containers only.",
    );
  }
  function Ht(n) {
    return n === "jpeg"
      ? "image/jpeg"
      : n === "png"
        ? "image/png"
        : "image/gif";
  }
  function Wt(n) {
    let t = new Uint8Array(n.length + 4);
    ((t[0] = 255), (t[1] = $));
    let e = n.length + 2;
    return ((t[2] = e >>> 8), (t[3] = e), t.set(n, 4), t);
  }
  function Gt(n) {
    let t = [],
      e = 2;
    for (; e + 1 < n.length; ) {
      if (n[e] !== 255)
        throw new Error("The JPEG marker structure is invalid.");
      for (; e < n.length && n[e] === 255; ) e++;
      if (e >= n.length) break;
      let r = n[e++];
      if (r === 217 || r === 218) break;
      if (r === 1 || (r >= 208 && r <= 215)) continue;
      if (e + 2 > n.length)
        throw new Error("The JPEG segment length is truncated.");
      let a = (n[e] << 8) | n[e + 1];
      if (a < 2 || e + a > n.length)
        throw new Error("The JPEG segment length is invalid.");
      let o = e + 2,
        i = e + a;
      (r === $ && f(n, o, d) && t.push(n.slice(o, i)), (e = i));
    }
    return t;
  }
  function Bt(n, t) {
    let e = [n.slice(0, 2), Wt(t)],
      r = 2;
    for (; r < n.length; ) {
      if (r + 1 >= n.length || n[r] !== 255)
        throw new Error("The JPEG marker structure is invalid.");
      let a = r;
      for (; r < n.length && n[r] === 255; ) r++;
      if (r >= n.length)
        throw new Error("The JPEG marker structure is truncated.");
      let o = n[r++];
      if (o === 217 || o === 218) return (e.push(n.slice(a)), k(e));
      if (o === 1 || (o >= 208 && o <= 215)) {
        e.push(n.slice(a, r));
        continue;
      }
      if (r + 2 > n.length)
        throw new Error("The JPEG segment length is truncated.");
      let i = (n[r] << 8) | n[r + 1],
        s = r + i;
      if (i < 2 || s > n.length)
        throw new Error("The JPEG segment length is invalid.");
      ((o === $ && f(n, r + 2, d)) || e.push(n.slice(a, s)), (r = s));
    }
    throw new Error("The JPEG does not contain an image scan or end marker.");
  }
  function St(n) {
    let t = [],
      e = 8;
    for (; e < n.length; ) {
      if (e + 12 > n.length)
        throw new Error("The PNG chunk structure is truncated.");
      let r = B(n, e),
        a = e + 12 + r;
      if (a > n.length) throw new Error("The PNG chunk length is invalid.");
      (t.push({
        start: e,
        end: a,
        typeOffset: e + 4,
        dataOffset: e + 8,
        dataEnd: e + 8 + r,
      }),
        (e = a));
    }
    return t;
  }
  function $t(n) {
    let t = new Uint8Array(n.length + 12);
    return (
      D(t, 0, n.length),
      t.set(z, 4),
      t.set(n, 8),
      D(t, 8 + n.length, J(t.slice(4, 8 + n.length))),
      t
    );
  }
  function zt(n) {
    return St(n)
      .filter((t) => f(n, t.typeOffset, z))
      .map((t) => n.slice(t.dataOffset, t.dataEnd));
  }
  function jt(n, t) {
    let e = [n.slice(0, 8)],
      r = !1;
    for (let a of St(n)) {
      let o = f(n, a.typeOffset, z);
      (f(n, a.typeOffset, _t) && (e.push($t(t)), (r = !0)),
        o || e.push(n.slice(a.start, a.end)));
    }
    if (!r) throw new Error("The PNG does not contain an IEND chunk.");
    return k(e);
  }
  var T = k([new Uint8Array([33, 255, 11]), Pt, Ft]);
  function yt(n) {
    let t = [];
    for (let e = 0; e <= n.length - T.length; e++) {
      if (!f(n, e, T)) continue;
      let r = [],
        a = e + T.length;
      for (; a < n.length; ) {
        let o = n[a++];
        if (o === 0) {
          (t.push({ start: e, end: a, frame: k(r) }), (e = a - 1));
          break;
        }
        if (a + o > n.length)
          throw new Error("The GIF metadata extension is truncated.");
        (r.push(n.slice(a, a + o)), (a += o));
      }
    }
    return t;
  }
  function Jt(n) {
    let t = [T];
    for (let e = 0; e < n.length; e += 255) {
      let r = n.slice(e, e + 255);
      t.push(new Uint8Array([r.length]), r);
    }
    return (t.push(new Uint8Array([0])), k(t));
  }
  function Kt(n, t) {
    let e = n.lastIndexOf(59);
    if (e < 0) throw new Error("The GIF does not contain a trailer.");
    let r = [],
      a = 0;
    for (let o of yt(n)) (r.push(n.slice(a, o.start)), (a = o.end));
    return (r.push(n.slice(a, e), Jt(t), n.slice(e)), k(r));
  }
  function V(n, t) {
    return t === "jpeg"
      ? Gt(n)
      : t === "png"
        ? zt(n)
        : yt(n).map((e) => e.frame);
  }
  function At(n, t, e) {
    return t === "jpeg" ? Bt(n, e) : t === "png" ? jt(n, e) : Kt(n, e);
  }
  async function Vt(n) {
    if (n instanceof Blob) return n;
    if (n instanceof ArrayBuffer) return new Blob([n]);
    if (n instanceof Uint8Array) {
      let e = n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength);
      return new Blob([e]);
    }
    let t = await fetch(n);
    if (!t.ok)
      throw new Error(`Unable to load avatar image: HTTP ${t.status}.`);
    return t.blob();
  }
  async function kt(n) {
    return new Uint8Array(await (await Vt(n)).arrayBuffer());
  }
  function Yt(n) {
    let t = "";
    for (let r = 0; r < n.length; r += 32768)
      t += String.fromCharCode(...n.subarray(r, r + 32768));
    return btoa(t);
  }
  function qt(n, t) {
    return `data:${t};base64,${Yt(n)}`;
  }
  var Xt = /^[a-z0-9-]{36}$/iu;
  function I(n) {
    return {
      id: "avatar-image-patcher",
      route: (t) => t?.kind === "home" || t?.kind === "palettes",
      mount(t) {
        return new Y(t, n).mount();
      },
    };
  }
  var Y = class {
    #t;
    #r;
    #e;
    #i;
    constructor(t, e) {
      ((this.#t = t),
        (this.#r = t.activeWindow),
        (this.#e = t.activeDocument),
        (this.#i = e));
    }
    mount() {
      if ((this.#A(), this.#t.route?.kind === "palettes")) {
        let r = this.#c("uid");
        return (this.#p(r) && this.#o("uid", r), () => {});
      }
      let t = this.#y();
      this.#S(t);
      let e = () => this.#m(t);
      return (
        this.#r.addEventListener("beforeunload", e),
        () => {
          this.#r.removeEventListener("beforeunload", e);
        }
      );
    }
    #a(t) {
      try {
        return decodeURIComponent(t);
      } catch {
        return t;
      }
    }
    #n(t) {
      try {
        return this.#r.localStorage.getItem(t);
      } catch {
        return null;
      }
    }
    #o(t, e) {
      try {
        this.#r.localStorage.setItem(t, e);
      } catch {}
    }
    #s() {
      return this.#e.cookie.split(";").reduce((t, e) => {
        let r = e.indexOf("="),
          a = r === -1 ? e : e.slice(0, r),
          o = r === -1 ? "" : e.slice(r + 1),
          i = this.#a(a.trim());
        return (i && (t[i] = this.#a(o.trim())), t);
      }, {});
    }
    #c(t) {
      return this.#s()[t] ?? null;
    }
    #f(t, e, r = {}) {
      let a = r.maxAge ?? 31536e4,
        o = [
          `${encodeURIComponent(t)}=${encodeURIComponent(e)}`,
          `Max-Age=${a}`,
          "Path=/",
        ];
      (this.#r.location.protocol === "https:"
        ? o.push("Secure", "Partitioned", "SameSite=None")
        : o.push("SameSite=Lax"),
        (this.#e.cookie = o.join("; ")));
    }
    #g() {
      let t = this.#r.crypto;
      return t && typeof t.randomUUID == "function"
        ? t.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
            let r = Math.floor(Math.random() * 16);
            return (e === "x" ? r : (r & 3) | 8).toString(16);
          });
    }
    #y() {
      let t = this.#c("uid"),
        e = this.#n("uid"),
        r = this.#p(t) ? t : this.#p(e) ? e : this.#g();
      return (this.#o("uid", r), this.#f("uid", r), r);
    }
    #A() {
      this.#r.DEBUG !== !0 &&
        this.#e.querySelectorAll("#rmv").forEach((t) => {
          t.closest(".rowitem")?.remove();
        });
    }
    #h() {
      let t = this.#e.body.querySelectorAll("script:not([src])"),
        e = t[1]?.text || "",
        r = t[3]?.text || "",
        a = e.trim().endsWith("reload();") ? e : e + r;
      return String(a)
        .replace(/\s/gu, "")
        .split("if(!")[0]
        .replace(
          /LOGUID=\["[a-z0-9-]{36}"/iu,
          'LOGUID=[localStorage.getItem("uid")',
        )
        .replace(/"/gu, "'");
    }
    #m(t) {
      let r = `${this.#h()}AVATARIMAGENOTFOUND=0;(s=document.createElement('script')).src='${this.#i}',document.body.append(s)`,
        a = `${t}<\/script><script>${r}<\/script><script>`;
      this.#f("uid", a);
    }
    #l() {
      let t = this.#e.createElement("div");
      return (
        (t.id = "avatarcookieswarning"),
        (t.textContent = "AVATAR ERROR: Cookies are blocked by your browser"),
        Object.assign(t.style, {
          position: "absolute",
          maxWidth: "10em",
          background: "#fff",
          fontSize: "0.7em",
          padding: "1.5em",
          display: "none",
        }),
        t
      );
    }
    #u() {
      let t = this.#e.createElement("a");
      t.href = "/avatar/builder/";
      let e = this.#e.createElement("i");
      return (
        (e.className = "far fa-edit"),
        e.setAttribute("aria-hidden", "true"),
        Object.assign(e.style, { color: "gray", fontSize: "2em" }),
        t.append(e),
        t
      );
    }
    #w(t) {
      let e = this.#e.createElement("div"),
        r = this.#e.createElement("img");
      return ((r.id = "selfavatarimage"), t && (r.src = t), e.append(r), e);
    }
    #d(t, e) {
      t.replaceChildren(this.#l(), this.#u(), this.#w(e));
    }
    #S(t) {
      let e = this.#e.getElementById("avatarcontainer");
      if (!e || this.#c("sid1")) return;
      let r = this.#c("wt"),
        a = this.#p(t) && !!r,
        o = this.#e.referrer.includes("/avatar/builder");
      if (a && !o) {
        this.#d(
          e,
          `/avatar/cache/${encodeURIComponent(t)}.${encodeURIComponent(r || "")}.jpg`,
        );
        return;
      }
      let i = this.#n("avatarimagedata");
      (this.#d(e, i),
        i &&
          this.#k(i).catch((s) => {
            console.warn("Unable to update avatar image.", s);
          }));
    }
    async #k(t) {
      let e = await this.#r.fetch("https://drawaria.online/uploadavatarimage", {
        method: "POST",
        body: new URLSearchParams({ imagedata: t, fromeditor: "true" }),
        headers: {
          Accept: "text/plain, */*; q=0.01",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      if (!e.ok) throw new Error(`Avatar upload failed with HTTP ${e.status}`);
      let r = await e.text(),
        a = String(r).split(".").pop();
      a && this.#f("wt", a);
    }
    #p(t) {
      return Xt.test(t || "");
    }
  };
  var O = class {
    #t = [];
    add(t) {
      if (typeof t != "function")
        throw new TypeError("Cleanup callback must be a function.");
      let e = !0;
      return (
        this.#t.push(t),
        () => {
          if (!e) return;
          e = !1;
          let r = this.#t.indexOf(t);
          (r >= 0 && this.#t.splice(r, 1), t());
        }
      );
    }
    dispose() {
      let t = this.#t.splice(0).reverse(),
        e = [];
      for (let r of t)
        try {
          r();
        } catch (a) {
          e.push(a);
        }
      if (e.length > 0)
        throw new Error("One or more cleanup callbacks failed.");
    }
  };
  var v = class {
    #t;
    #r = new Map();
    #e = null;
    constructor(t) {
      this.#t = t;
    }
    register(t) {
      (this.#s(t), this.unregister(t.id));
      let e = { module: t, mounted: null, error: null };
      return (
        this.#r.set(t.id, e),
        this.#e && this.#i(e, this.#e),
        () => this.unregister(t.id)
      );
    }
    unregister(t) {
      let e = this.#r.get(t);
      return e ? (this.#n(e), this.#r.delete(t)) : !1;
    }
    apply(t) {
      this.#e = t;
      for (let e of this.#r.values()) this.#i(e, t);
    }
    dispose() {
      for (let t of this.#r.values()) this.#n(t);
      this.#e = null;
    }
    statuses() {
      return Object.freeze(
        [...this.#r.values()].map((t) =>
          Object.freeze({
            id: t.module.id,
            mounted: t.mounted !== null,
            routePathname: t.mounted?.routePathname ?? null,
            error: t.error,
          }),
        ),
      );
    }
    createFacade() {
      return Object.freeze({
        register: (t) => this.register(t),
        statuses: () => this.statuses(),
      });
    }
    #i(t, e) {
      if (!this.#o(t.module, e.route)) {
        this.#n(t);
        return;
      }
      let r = this.#a(e, t);
      try {
        if (
          t.mounted?.routePathname === e.route?.pathname &&
          t.module.refresh
        ) {
          (t.module.refresh(r), (t.error = null));
          return;
        }
        this.#n(t);
        let a = new O();
        t.mounted = { stack: a, routePathname: e.route?.pathname ?? null };
        let o = t.module.mount(this.#a(e, t));
        (typeof o == "function" && a.add(o), (t.error = null));
      } catch (a) {
        ((t.error = a instanceof Error ? a.message : String(a)), this.#n(t));
      }
    }
    #a(t, e) {
      let r = t.parentWindow.document,
        a = e.mounted?.stack;
      return Object.freeze({
        parentWindow: t.parentWindow,
        parentDocument: r,
        activeWindow: t.activeWindow,
        activeDocument: t.activeWindow.document,
        route: t.route,
        url: new URL(t.url.href),
        frame: t.frame,
        shellRoot: t.shellRoot,
        socket: t.socket,
        accountUid: t.accountUid,
        onCleanup(o) {
          if (!a)
            throw new Error(
              "Cleanup can only be registered while a module is mounted.",
            );
          return a.add(o);
        },
      });
    }
    #n(t) {
      let e = t.mounted;
      ((t.mounted = null), e?.stack.dispose());
    }
    #o(t, e) {
      return t.route ? t.route(e) : !0;
    }
    #s(t) {
      if (!t.id.trim())
        throw new TypeError("Shell module id must be a non-empty string.");
      if (typeof t.mount != "function")
        throw new TypeError(`Shell module "${t.id}" must provide mount().`);
      if (t.route && typeof t.route != "function")
        throw new TypeError(`Shell module "${t.id}" route must be a function.`);
      if (t.refresh && typeof t.refresh != "function")
        throw new TypeError(
          `Shell module "${t.id}" refresh must be a function.`,
        );
    }
  };
  var vt = Symbol.for("drawaria.extension.socketManager"),
    Et = Symbol.for("drawaria.extension.patchedIo"),
    Rt = Symbol.for("drawaria.extension.patchedSocket"),
    Qt = new Set(["connect", "disconnect", "error"]),
    g = class {
      #t;
      #r = new Set();
      #e = new Map();
      #i = new Map();
      #a = new Map();
      #n = new Map();
      #o = !1;
      #s = null;
      constructor(t) {
        this.#t = t;
      }
      get sockets() {
        return Object.freeze([...this.#r]);
      }
      get primarySocket() {
        return this.#s;
      }
      initialize() {
        return (
          this.#o || ((this.#o = !0), (this.#t[vt] = this)),
          this.attachWindow(this.#t),
          this
        );
      }
      attachWindow(t) {
        return ((t[vt] = this), this.#c(t), this.#f(t), this);
      }
      refresh() {
        return (this.attachWindow(this.#t), this);
      }
      interceptEmit(t, e) {
        return this.#u(this.#e, t, e);
      }
      interceptIncoming(t, e) {
        return this.#u(this.#i, t, e);
      }
      replaceIncoming(t, e) {
        return this.#w(this.#a, t, e);
      }
      on(t, e) {
        return this.#w(this.#n, t, e);
      }
      trigger(t, ...e) {
        let r = this.#s;
        return r ? (this.#A(r, t, e, (a) => this.#h(r, t, a)), !0) : !1;
      }
      createDebugFacade() {
        let t = this;
        return Object.freeze({
          get sockets() {
            return Object.freeze([...t.#r]);
          },
          get primarySocket() {
            return t.#s;
          },
          on: (e, r) => t.on(e, r),
          interceptEmit: (e, r) => t.interceptEmit(e, r),
          interceptIncoming: (e, r) => t.interceptIncoming(e, r),
          replaceIncoming: (e, r) => t.replaceIncoming(e, r),
          trigger: (e, ...r) => t.trigger(e, ...r),
          hooks: () => t.hooks(),
        });
      }
      hooks() {
        return Object.freeze({
          incoming: this.#d(this.#i),
          outgoing: this.#d(this.#e),
          replacements: this.#d(this.#a),
          listeners: this.#d(this.#n),
        });
      }
      #c(t) {
        let e = t.io;
        if (typeof e != "function") return;
        let r = e;
        if (!r[Et]) {
          let i = r.__drawariaOriginalIo ?? r,
            s = this,
            l = function (...m) {
              let h = Reflect.apply(i, this, m);
              return (s.#g(h), h);
            };
          if (
            (Object.assign(l, r),
            (l.__drawariaOriginalIo = i),
            (l[Et] = !0),
            typeof r.connect == "function")
          ) {
            let c = r.connect;
            ((l.__drawariaOriginalConnect = c),
              (l.connect = (...m) => {
                let h = c(...m);
                return (s.#g(h), h);
              }));
          } else l.connect = l;
          t.io = l;
        }
        let o = t.io.Socket?.prototype;
        this.#S(o) && this.#y(o);
      }
      #f(t) {
        let e = t.io;
        if (typeof e != "function") return;
        let r = e.managers;
        if (r)
          for (let a of Object.values(r))
            for (let o of Object.values(a.nsps ?? {})) this.#S(o) && this.#g(o);
      }
      #g(t) {
        (this.#y(t), this.#r.has(t) || this.#r.add(t), (this.#s = t));
      }
      #y(t) {
        let e = t;
        if (e[Rt] || typeof e.emit != "function") return;
        let r = this;
        ((e.__drawariaOriginalEmit = e.emit),
          (e.emit = function (o, ...i) {
            if ((r.#g(this), Qt.has(o)))
              return e.__drawariaOriginalEmit?.call(this, o, ...i) ?? this;
            let s = r.#m(r.#e, this, o, i, !0);
            return s
              ? (e.__drawariaOriginalEmit?.call(this, o, ...s.args) ?? this)
              : this;
          }),
          typeof e.onevent == "function" &&
            ((e.__drawariaOriginalOnevent = e.onevent),
            (e.onevent = function (o) {
              r.#g(this);
              let i = Array.isArray(o.data) ? o.data : [],
                [s, ...l] = i;
              if (typeof s != "string") {
                e.__drawariaOriginalOnevent?.call(this, o);
                return;
              }
              r.#A(this, s, l, (c) => {
                ((o.data = [s, ...c]),
                  e.__drawariaOriginalOnevent?.call(this, o));
              });
            })),
          (e[Rt] = !0));
      }
      #A(t, e, r, a) {
        let o = this.#m(this.#i, t, e, r);
        if (!o) return;
        let i = this.#a.get(e) ?? [];
        if (i.length > 0) for (let s of [...i]) s.call(t, ...o.args);
        else a(o.args);
        for (let s of [...(this.#n.get(e) ?? [])]) s.call(t, ...o.args);
      }
      #h(t, e, r) {
        let a = t;
        if (typeof a.__drawariaOriginalOnevent == "function") {
          a.__drawariaOriginalOnevent.call(t, { type: 2, data: [e, ...r] });
          return;
        }
        for (let o of [...(t._callbacks?.[`$${e}`] ?? [])]) o.call(t, ...r);
      }
      #m(t, e, r, a, o = !1) {
        let i = a;
        for (let s of t.get(r) ?? []) {
          let l = s(
            Object.freeze({ socket: e, event: r, args: Object.freeze([...i]) }),
          );
          if (this.#k(l)) return null;
          this.#p(l) && l.args && (i = this.#l(i, l.args, o));
        }
        return { args: i };
      }
      #l(t, e, r) {
        if (!r) return e;
        let a = t[t.length - 1];
        return typeof a != "function" || e.includes(a)
          ? e
          : Object.freeze([...e, a]);
      }
      #u(t, e, r) {
        let a = t.get(e) ?? [];
        return (
          a.push(r),
          t.set(e, a),
          () => {
            let o = a.indexOf(r);
            (o >= 0 && a.splice(o, 1), a.length === 0 && t.delete(e));
          }
        );
      }
      #w(t, e, r) {
        let a = t.get(e) ?? [];
        return (
          a.push(r),
          t.set(e, a),
          () => {
            let o = a.indexOf(r);
            (o >= 0 && a.splice(o, 1), a.length === 0 && t.delete(e));
          }
        );
      }
      #d(t) {
        let e = {};
        for (let [r, a] of t) e[r] = a.length;
        return Object.freeze(e);
      }
      #S(t) {
        return !!(
          t &&
          typeof t == "object" &&
          "emit" in t &&
          typeof t.emit == "function"
        );
      }
      #k(t) {
        return t?.action === "cancel";
      }
      #p(t) {
        return t?.action === "continue";
      }
    };
  var Zt = new Set(["/rules", "/privacy", "/terms", "/links"]),
    te = /^\/gallery\/img\/[^/]+$/u,
    ee = new Map([
      ["/profile", "profile"],
      ["/gallery", "gallery"],
      ["/scoreboards", "scoreboards"],
      ["/palettes", "palettes"],
      ["/friends", "friends"],
      ["/avatar", "avatar"],
    ]);
  function x(n) {
    return (n.startsWith("/") ? n : `/${n}`).replace(/\/+$/u, "") || "/";
  }
  function u(n, t) {
    let e;
    try {
      e = new URL(n, t);
    } catch {
      return null;
    }
    if (e.protocol !== "http:" && e.protocol !== "https:") return null;
    let r = x(e.pathname);
    if (r.startsWith("/auth")) return null;
    let a =
      r === "/"
        ? "home"
        : (ee.get(r) ??
          (te.test(r) ? "gallery" : void 0) ??
          (Zt.has(r) ? "static" : void 0));
    return a
      ? Object.freeze({
          kind: a,
          pathname: r,
          url: `${e.pathname}${e.search}${e.hash}`,
        })
      : null;
  }
  var q = "drawaria:shell:before-navigate",
    M = "drawaria:shell:after-navigate",
    X = "drawaria:shell:frame-load",
    Q = "drawaria:shell:navigation-fallback",
    xt = "data-drawaria-extension-shell",
    Mt = "data-drawaria-extension-shell-frame",
    S = "drawariaShellTarget",
    Z = "Navigator/version1.js",
    b = `//cdn.jsdelivr.net/gh/cubic074/scripts/${Z}`,
    tt = encodeURIComponent(
      `<script>d=document,d.head.appendChild(d.createElement\`script\`).src="${b}"<\/script>`,
    ),
    E = class {
      #t;
      #r;
      #e;
      #i;
      #a;
      #n;
      #o;
      #s;
      #c;
      #f;
      #g;
      #y;
      #A;
      #h = !1;
      #m = null;
      #l = null;
      #u = null;
      #w = null;
      #d = null;
      #S = null;
      #k = null;
      #p = null;
      #E = null;
      #v = null;
      #M = null;
      constructor(t, e, r = null) {
        ((this.#t = t.targetWindow ?? window),
          (this.#r = t.assign ?? ((a) => this.#t.location.assign(a))),
          (this.#e = t.open ?? ((a, o, i) => this.#t.open(a, o, i))),
          (this.#i = r),
          (this.#a = e),
          (this.#n =
            t.enableSocket === !1
              ? null
              : (t.socketManager ?? new g(this.#t).initialize())),
          (this.#f = t.beforeNavigate),
          (this.#g = t.afterNavigate),
          (this.#y = t.afterFrameLoad),
          (this.#A = t.onFallback),
          (this.#o = (a) => this.#H(a)),
          (this.#s = () => {
            this.navigate(this.#t.location.href, { historyMode: "none" });
          }),
          (this.#c = this.#P()));
      }
      get active() {
        return this.#h;
      }
      get currentUrl() {
        return this.#E ?? this.#t.location.href;
      }
      get currentRoute() {
        return this.#v ?? u(this.#t.location.href, this.#t.location.href);
      }
      get lastNavigation() {
        return this.#M;
      }
      get shellRoot() {
        return this.#m;
      }
      get frame() {
        return this.#l;
      }
      get socket() {
        return this.#n;
      }
      initialize() {
        if (this.#h) return;
        ((this.#h = !0),
          this.#t.document.addEventListener("click", this.#o, !0),
          this.#t.addEventListener("popstate", this.#s),
          this.#z(),
          this.#i?.scan(this.#t));
        let t = u(this.#t.location.href, this.#t.location.href);
        ((this.#v = t),
          (this.#E = this.#t.location.href),
          this.#U(this.#t, t, new URL(this.#t.location.href), null));
      }
      cleanup() {
        this.#h &&
          ((this.#h = !1),
          this.#b("before"),
          this.#b("frame"),
          this.#t.document.removeEventListener("click", this.#o, !0),
          this.#t.removeEventListener("popstate", this.#s),
          this.#T(),
          this.#O(),
          this.#l && this.#u && this.#l.removeEventListener("load", this.#u),
          (this.#u = null),
          this.#m?.remove(),
          (this.#m = null),
          (this.#l = null),
          this.#a.dispose(),
          this.#x(M, {
            result: this.#R(
              {
                status: "ignored",
                url: this.#t.location.href,
                route: null,
                reason: "Shell cleanup",
              },
              !1,
            ),
          }));
      }
      async navigate(t, e = { historyMode: "push" }) {
        if (!this.#h)
          return this.#R({
            status: "ignored",
            url: String(t),
            route: null,
            reason: "Shell inactive",
          });
        let r = new URL(t, this.#t.location.href),
          a = u(r, this.#t.location.href);
        if (!a || r.origin !== this.#t.location.origin)
          return this.#C(r, a, "Unsupported route");
        try {
          this.#i?.scan(this.#t);
          let o = this.#F();
          (this.#b("before"),
            this.#T(),
            (this.#E = r.href),
            (this.#v = a),
            this.#x(q, { route: a, url: r }));
          let i = this.#f?.(a, new URL(r.href));
          return (
            (this.#d = typeof i == "function" ? i : null),
            this.#U(this.#t, a, r, o),
            (o.src = r.href),
            e.historyMode === "push" &&
              this.#t.history.pushState(
                { drawariaShell: !0 },
                this.#t.document.title,
                r.href,
              ),
            this.#R({ status: "completed", url: r.href, route: a })
          );
        } catch (o) {
          let i = o instanceof Error ? o.message : "Navigation failed";
          return this.#C(r, a, i);
        }
      }
      createDebugFacade() {
        return this.#c;
      }
      #P() {
        let t = this;
        return Object.freeze({
          get active() {
            return t.active;
          },
          get currentUrl() {
            return t.currentUrl;
          },
          get currentRoute() {
            return t.currentRoute;
          },
          get lastNavigation() {
            return t.lastNavigation;
          },
          get shellRoot() {
            return t.shellRoot;
          },
          get frame() {
            return t.frame;
          },
          navigate: (e) => t.navigate(e),
        });
      }
      #F() {
        if (this.#l?.isConnected) return this.#l;
        let t = this.#t.document,
          e = t.querySelector(`[${xt}]`),
          r = e ?? t.createElement("main");
        (r.setAttribute(xt, ""),
          (r.style.display = "block"),
          (r.style.width = "100%"),
          (r.style.height = "100vh"),
          e || t.body.replaceChildren(r));
        let a = r.querySelector(`iframe[${Mt}]`),
          o = a ?? t.createElement("iframe");
        return (
          o.setAttribute(Mt, ""),
          (o.title = "Drawaria shell content"),
          (o.style.border = "0"),
          (o.style.display = "block"),
          (o.style.width = "100%"),
          (o.style.height = "100%"),
          a || r.append(o),
          this.#l !== o &&
            (this.#l && this.#u && this.#l.removeEventListener("load", this.#u),
            (this.#u = () => this.#N()),
            o.addEventListener("load", this.#u)),
          (this.#m = r),
          (this.#l = o),
          o
        );
      }
      #N() {
        let t = this.#l,
          e = this.#v;
        if (!t || !e) return;
        let r = this.#Y(t),
          a = this.#_(t);
        if (!r || !a) return;
        (this.#V(r),
          this.#n?.attachWindow(a),
          this.#b("frame"),
          this.#j(r, a),
          this.#D(r, a, "replace"),
          this.#i?.scan(a),
          this.#x(X, { route: e, frameDocument: r, frameWindow: a, frame: t }));
        let o = this.#y?.(e, r, a, t);
        ((this.#S = typeof o == "function" ? o : null),
          this.#U(a, e, new URL(this.#E ?? t.src), t));
      }
      #H(t) {
        if (t.type !== "click" || !this.#X(t)) return;
        let e = this.#Q(t),
          r = e ? this.#W(e) : null;
        if (!(!e || !r)) {
          if ((t.preventDefault(), r.mode === "new-tab")) {
            this.#G(r.url, r.route, r.sourceWindow);
            return;
          }
          this.navigate(r.url);
        }
      }
      #W(t) {
        let e = t.getAttribute("href")?.trim();
        if (
          !e ||
          e.startsWith("#") ||
          /^javascript:/iu.test(e) ||
          /^mailto:/iu.test(e) ||
          t.hasAttribute("download")
        )
          return null;
        let r = t.getAttribute("target")?.trim();
        if (r && r.toLowerCase() !== "_blank") return null;
        let a = new URL(t.href, this.#t.location.href),
          o = new URL(this.#t.location.href);
        if (
          a.origin !== o.origin ||
          this.#q(o, a) ||
          x(a.pathname).startsWith("/auth")
        )
          return null;
        let i = u(a, o);
        return i
          ? {
              mode: r?.toLowerCase() === "_blank" ? "new-tab" : "same-tab",
              route: i,
              sourceWindow: t.ownerDocument.defaultView,
              url: a,
            }
          : null;
      }
      #G(t, e, r) {
        let a = this.#B(t, r);
        this.#e(a.href, "_blank", "noopener") ||
          this.#R({
            status: "ignored",
            url: t.href,
            route: e,
            reason: "New tab was blocked",
          });
      }
      #B(t, e) {
        let r = this.#$(e) ? `/rcon/${tt}` : "/",
          a = new URL(r, this.#t.location.href);
        return (a.searchParams.set(S, `${t.pathname}${t.search}${t.hash}`), a);
      }
      #$(t) {
        if (this.#L(t) || this.#L(this.#t)) return !0;
        let e = this.#l ? this.#_(this.#l) : null;
        return this.#L(e) ? !0 : U(this.#t) === !0;
      }
      #L(t) {
        return t ? p(t) === !0 : !1;
      }
      #U(t, e, r, a) {
        let o = {
          parentWindow: this.#t,
          activeWindow: t,
          route: e,
          url: r ?? new URL(this.#t.location.href),
          frame: a,
          shellRoot: this.#m,
          socket: this.#n,
          accountUid: this.#i?.uid ?? null,
        };
        this.#a.apply(o);
      }
      #C(t, e, r) {
        let a = this.#R(
          { status: "fallback", url: t.href, route: e, reason: r },
          !1,
        );
        return (
          this.#x(Q, { result: a }),
          this.#A?.(a),
          this.#r(t.href),
          this.#g?.(a),
          this.#x(M, { result: a }),
          a
        );
      }
      #R(t, e = !0) {
        return (
          (this.#M = Object.freeze(t)),
          e && (this.#g?.(this.#M), this.#x(M, { result: this.#M })),
          this.#M
        );
      }
      #z() {
        let t = this.#t.history.state;
        (t && typeof t == "object" && "drawariaShell" in t) ||
          this.#t.history.replaceState(
            { drawariaShell: !0 },
            this.#t.document.title,
            this.#t.location.href,
          );
      }
      #j(t, e) {
        this.#T();
        let r = [],
          a = () => this.#D(t, e, "replace"),
          o = () => this.#D(t, e, "push");
        (e.addEventListener("popstate", a),
          e.addEventListener("hashchange", a),
          r.push(() => {
            (e.removeEventListener("popstate", a),
              e.removeEventListener("hashchange", a));
          }));
        let i = t.querySelector("title"),
          s = this.#K(),
          l = i && s ? new s(() => this.#I(t)) : null;
        i &&
          l &&
          (l.observe(i, { childList: !0, characterData: !0, subtree: !0 }),
          r.push(() => l.disconnect()));
        let c = e.history,
          m = c.pushState,
          h = c.replaceState;
        ((c.pushState = function (P, F, N) {
          (m.call(this, P, F, N), o());
        }),
          (c.replaceState = function (P, F, N) {
            (h.call(this, P, F, N), a());
          }),
          r.push(() => {
            ((c.pushState = m), (c.replaceState = h));
          }),
          (this.#k = () => {
            for (let _ of r.splice(0)) _();
          }));
      }
      #T() {
        (this.#k?.(), (this.#k = null));
      }
      #D(t, e, r) {
        (this.#I(t), this.#J(e.location.href, r));
      }
      #I(t) {
        let e = t.title.trim();
        !e || this.#t.document.title === e || (this.#t.document.title = e);
      }
      #J(t, e) {
        let r = new URL(t, this.#t.location.href),
          a = u(r, this.#t.location.href),
          o = this.#t.location.href;
        if (o === r.href && this.#p === r.href) return;
        let i = { drawariaShell: !0 };
        (e === "replace" || o === r.href || this.#p === r.href
          ? this.#t.history.replaceState(i, this.#t.document.title, r.href)
          : this.#t.history.pushState(i, this.#t.document.title, r.href),
          (this.#p = r.href),
          !(!a || r.origin !== this.#t.location.origin) &&
            ((this.#E = r.href),
            (this.#v = a),
            this.#R({ status: "completed", url: r.href, route: a })));
      }
      #K() {
        let t = this.#t.MutationObserver;
        return typeof t == "function" ? t : null;
      }
      #x(t, e) {
        let r = this.#t.document.createEvent("CustomEvent");
        (r.initCustomEvent(t, !1, !1, Object.freeze(e)),
          this.#t.document.dispatchEvent(r));
      }
      #b(t) {
        let e = t === "before" ? this.#d : this.#S;
        (t === "before" ? (this.#d = null) : (this.#S = null), e?.());
      }
      #V(t) {
        this.#w !== t &&
          (this.#O(), t.addEventListener("click", this.#o, !0), (this.#w = t));
      }
      #O() {
        (this.#w?.removeEventListener("click", this.#o, !0), (this.#w = null));
      }
      #Y(t) {
        try {
          return t.contentDocument;
        } catch {
          return null;
        }
      }
      #_(t) {
        try {
          return t.contentWindow;
        } catch {
          return null;
        }
      }
      #q(t, e) {
        return (
          t.origin === e.origin &&
          t.pathname === e.pathname &&
          t.search === e.search &&
          t.hash !== e.hash
        );
      }
      #X(t) {
        let e = t;
        return (
          (e.button ?? 0) === 0 &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey
        );
      }
      #Q(t) {
        let e = t.target;
        if (!e || typeof e != "object" || !("closest" in e)) return null;
        let r = e.closest;
        return typeof r == "function" ? r.call(e, "a[href]") : null;
      }
    };
  var L = Symbol.for("drawaria.extension.runtime"),
    re = () => {};
  function ne(n, t = window) {
    return u(n, t.location.href);
  }
  function ae(n = window) {
    return n[L]?.controller.frame?.contentDocument ?? n.document;
  }
  function et(n = {}) {
    let t = n.targetWindow ?? window;
    if (le(t)) return re;
    let e = t[L];
    if ((t.document.body.style.setProperty("margin", "0"), e?.active))
      return e.cleanup;
    let r = new y(t),
      a = new A(t),
      o = new v(t);
    (o.register(I(b)), o.register(C(a)));
    let i =
        n.enableSocket === !1
          ? null
          : (n.socketManager ?? new g(t).initialize()),
      s = new E({ ...n, targetWindow: t, socketManager: i }, o, r),
      l = Object.freeze({
        account: r.createFacade(),
        avatar: a.createFacade(),
        shell: s.createDebugFacade(),
        modules: o.createFacade(),
        ...(i ? { socket: i.createDebugFacade() } : {}),
      }),
      c = {
        active: !0,
        controller: s,
        modules: o,
        facade: l,
        cleanup: () => {
          c.active &&
            ((c.active = !1),
            s.cleanup(),
            t.DrawariaExtension === l && delete t.DrawariaExtension,
            delete t[L]);
        },
      };
    ((t[L] = c), (t.DrawariaExtension = l), s.initialize());
    let h = ie(t, s) ? null : se(t);
    return (h && s.navigate(h), c.cleanup);
  }
  function oe(n = {}) {
    return et(n);
  }
  function ie(n, t) {
    let e = new URL(n.location.href),
      r = e.searchParams.get(S);
    if (!r) return !1;
    e.searchParams.delete(S);
    let a = e.href,
      o;
    try {
      o = new URL(r, n.location.href);
    } catch {
      return (
        n.history.replaceState({ drawariaShell: !0 }, n.document.title, a),
        !1
      );
    }
    return !u(o, n.location.href) || o.origin !== n.location.origin
      ? (n.history.replaceState({ drawariaShell: !0 }, n.document.title, a), !1)
      : (n.history.replaceState(
          { drawariaShell: !0 },
          n.document.title,
          o.href,
        ),
        t.navigate(o, { historyMode: "none" }),
        !0);
  }
  function se(n) {
    let t = new URL(n.location.href);
    return t.searchParams.has(S)
      ? null
      : /^\/rcon(?:\/.*)?$/u.test(t.pathname)
        ? new URL("/", t)
        : u(t, t)
          ? t
          : new URL("/", t);
  }
  function le(n) {
    try {
      if (n.parent === n) return !1;
      let t = n.parent[L];
      return t?.active === !0 && t.controller.frame?.contentWindow === n;
    } catch {
      return !1;
    }
  }
  typeof window < "u" &&
    (et(),
    window?.DrawariaExtension?.modules.register({
      id: "avatar-image-patcher",
      route: () => !1,
      mount: () => {},
    }));
  return Ct(ce);
})();
