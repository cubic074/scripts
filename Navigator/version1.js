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
  var j = Object.defineProperty;
  var Ot = Object.getOwnPropertyDescriptor;
  var _t = Object.getOwnPropertyNames;
  var Pt = Object.prototype.hasOwnProperty;
  var Ft = (n, t) => {
      for (var e in t) j(n, e, { get: t[e], enumerable: !0 });
    },
    Nt = (n, t, e, r) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let a of _t(t))
          !Pt.call(n, a) &&
            a !== e &&
            j(n, a, {
              get: () => t[a],
              enumerable: !(r = Ot(t, a)) || r.enumerable,
            });
      return n;
    };
  var Ht = (n) => Nt(j({}, "__esModule", { value: !0 }), n);
  var Ae = {};
  Ft(Ae, {
    AccountAvatarStorage: () => R,
    AnonymousAvatarStorage: () => M,
    CleanupStack: () => T,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_NAME: () => It,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_PATH_SEGMENT: () => nt,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_URL: () => I,
    DRAWARIA_SHELL_AFTER_NAVIGATE_EVENT: () => D,
    DRAWARIA_SHELL_BEFORE_NAVIGATE_EVENT: () => tt,
    DRAWARIA_SHELL_FRAME_LOAD_EVENT: () => et,
    DRAWARIA_SHELL_NAVIGATION_FALLBACK_EVENT: () => rt,
    DRAWARIA_SHELL_TARGET_PARAMETER: () => S,
    DrawariaAccountTracker: () => v,
    DrawariaShellController: () => U,
    ModuleLoader: () => C,
    ShellModuleLoader: () => b,
    SocketManager: () => p,
    createAccountAvatarStorageModule: () => H,
    createAccountStorageFacade: () => G,
    createAnonymousAvatarStorageModule: () => B,
    createAvatarImagePatcherModule: () => W,
    embedAvatarMetadataBytes: () => wt,
    embedJsonInImageMetadata: () => k,
    extractAvatarMetadataBytes: () => yt,
    extractJsonFromImageMetadata: () => mt,
    getActiveDrawariaDocument: () => pe,
    initializeDrawariaExtension: () => at,
    initializeDrawariaShell: () => me,
    matchDrawariaShellRoute: () => ge,
    matchShellRoute: () => d,
    normalizeShellPathname: () => L,
  });
  var ot = "drawaria-extension:logged-in",
    K = "drawaria-extension:account-uid",
    it = /^[a-z0-9~-]{36}$/u;
  function m(n) {
    let t = n.LOGGEDIN;
    return typeof t == "boolean" ? t : null;
  }
  function P(n) {
    let t = dt(n, ot);
    return t === "true" ? !0 : t === "false" ? !1 : null;
  }
  function st(n, t) {
    ht(n, ot, String(t));
  }
  function lt(n) {
    let t = dt(n, K);
    return t && it.test(t) ? t : null;
  }
  function ct(n, t) {
    it.test(t) && ht(n, K, t);
  }
  function ut(n) {
    Wt(n, K);
  }
  function dt(n, t) {
    try {
      return n.localStorage.getItem(t);
    } catch {
      return null;
    }
  }
  function ht(n, t, e) {
    try {
      n.localStorage.setItem(t, e);
    } catch {}
  }
  function Wt(n, t) {
    try {
      n.localStorage.removeItem(t);
    } catch {}
  }
  var ft = /^[a-z0-9~-]{36}$/u,
    v = class {
      #t;
      #e;
      #r;
      #n = null;
      constructor(t, e) {
        ((this.#t = t), (this.#r = e), (this.#e = this.#o()));
      }
      get uid() {
        return this.#n;
      }
      refresh() {
        return this.scan(this.#t);
      }
      scan(t) {
        if (!t) return this.#n;
        let e = m(t);
        if (
          new URL(t.location.href).pathname === "/" &&
          e !== null &&
          (st(t, e), !e)
        )
          return ((this.#n = null), ut(t), null);
        let r = this.#i(t);
        if (r) return this.#a(r);
        let a = this.#s(t.document);
        if (a) return this.#a(a);
        let o = lt(t);
        return o ? this.#a(o) : this.#n;
      }
      createFacade() {
        return this.#e;
      }
      #o() {
        let t = this;
        return Object.freeze({
          get uid() {
            return t.uid;
          },
          storage: t.#r,
          refresh: () => t.refresh(),
        });
      }
      #a(t) {
        return ((this.#n = t), ct(this.#t, t), t);
      }
      #i(t) {
        let e = t.ACCOUNTUID;
        return typeof e == "string" && ft.test(e) ? e : null;
      }
      #s(t) {
        let e = t.querySelectorAll('a[href^="/gallery/?uid"]');
        for (let r of e) {
          let a = this.#c(r.getAttribute("href"));
          if (a) return a;
        }
        return null;
      }
      #c(t) {
        if (!t) return null;
        try {
          let e = new URL(t, this.#t.location.href).searchParams.get("uid");
          return e && ft.test(e) ? e : null;
        } catch {
          return null;
        }
      }
    };
  var f = new Uint8Array([68, 82, 65, 87, 77, 69, 84, 65]),
    gt = 1,
    w = f.length + 1 + 4,
    pt = 4,
    J = 60 * 1024,
    q = 239,
    Gt = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
    Y = new Uint8Array([100, 114, 65, 119]),
    Bt = new Uint8Array([73, 69, 78, 68]),
    $t = new Uint8Array([68, 82, 65, 87, 65, 82, 73, 65]),
    zt = new Uint8Array([74, 83, 49]);
  async function k(n, t) {
    let e = await xt(n),
      r = Z(e);
    return ae(kt(e, r, St(t)), Kt(r));
  }
  async function mt(n) {
    let t = x(await xt(n));
    if (t === null)
      throw new Error(
        "The image does not contain Drawaria avatar JSON metadata.",
      );
    return t;
  }
  function wt(n, t) {
    let e = Z(n);
    return kt(n, e, St(t));
  }
  function yt(n) {
    let t = x(n);
    if (t === null)
      throw new Error(
        "The image does not contain Drawaria avatar JSON metadata.",
      );
    return t;
  }
  function x(n) {
    let t = ee(n, Z(n));
    return t.length === 0 ? null : jt(t[t.length - 1]);
  }
  function X(n) {
    let t = 4294967295;
    for (let e of n) {
      t ^= e;
      for (let r = 0; r < 8; r++) t = (t >>> 1) ^ (3988292384 & -(t & 1));
    }
    return (t ^ 4294967295) >>> 0;
  }
  function N(n, t, e) {
    ((n[t] = e >>> 24),
      (n[t + 1] = e >>> 16),
      (n[t + 2] = e >>> 8),
      (n[t + 3] = e));
  }
  function V(n, t) {
    return ((n[t] << 24) | (n[t + 1] << 16) | (n[t + 2] << 8) | n[t + 3]) >>> 0;
  }
  function E(n) {
    let t = n.reduce((a, o) => a + o.length, 0),
      e = new Uint8Array(t),
      r = 0;
    for (let a of n) (e.set(a, r), (r += a.length));
    return e;
  }
  function g(n, t, e) {
    if (t < 0 || t + e.length > n.length) return !1;
    for (let r = 0; r < e.length; r++) if (n[t + r] !== e[r]) return !1;
    return !0;
  }
  function St(n) {
    let t = JSON.stringify(n);
    if (t === void 0)
      throw new TypeError("The supplied value cannot be represented as JSON.");
    let e = new TextEncoder().encode(t);
    if (e.length > J)
      throw new RangeError(
        `The serialized metadata JSON exceeds the ${J}-byte UTF-8 limit.`,
      );
    let r = new Uint8Array(w + e.length + pt);
    return (
      r.set(f),
      (r[f.length] = gt),
      N(r, f.length + 1, e.length),
      r.set(e, w),
      N(r, w + e.length, X(e)),
      r
    );
  }
  function jt(n) {
    if (!g(n, 0, f))
      throw new Error(
        "The image metadata does not contain a supported avatar JSON payload.",
      );
    if (n[f.length] !== gt)
      throw new Error(`Unsupported avatar metadata version ${n[f.length]}.`);
    let t = V(n, f.length + 1),
      e = w + t + pt;
    if (t > J || n.length !== e)
      throw new Error(
        "The embedded avatar metadata payload length is invalid.",
      );
    let r = n.slice(w, w + t);
    if (X(r) !== V(n, w + t))
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
  function Z(n) {
    if (n.length >= 3 && n[0] === 255 && n[1] === 216 && n[2] === 255)
      return "jpeg";
    if (g(n, 0, Gt)) return "png";
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
  function Kt(n) {
    return n === "jpeg"
      ? "image/jpeg"
      : n === "png"
        ? "image/png"
        : "image/gif";
  }
  function Jt(n) {
    let t = new Uint8Array(n.length + 4);
    ((t[0] = 255), (t[1] = q));
    let e = n.length + 2;
    return ((t[2] = e >>> 8), (t[3] = e), t.set(n, 4), t);
  }
  function Vt(n) {
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
      (r === q && g(n, o, f) && t.push(n.slice(o, i)), (e = i));
    }
    return t;
  }
  function qt(n, t) {
    let e = [n.slice(0, 2), Jt(t)],
      r = 2;
    for (; r < n.length; ) {
      if (r + 1 >= n.length || n[r] !== 255)
        throw new Error("The JPEG marker structure is invalid.");
      let a = r;
      for (; r < n.length && n[r] === 255; ) r++;
      if (r >= n.length)
        throw new Error("The JPEG marker structure is truncated.");
      let o = n[r++];
      if (o === 217 || o === 218) return (e.push(n.slice(a)), E(e));
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
      ((o === q && g(n, r + 2, f)) || e.push(n.slice(a, s)), (r = s));
    }
    throw new Error("The JPEG does not contain an image scan or end marker.");
  }
  function At(n) {
    let t = [],
      e = 8;
    for (; e < n.length; ) {
      if (e + 12 > n.length)
        throw new Error("The PNG chunk structure is truncated.");
      let r = V(n, e),
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
  function Yt(n) {
    let t = new Uint8Array(n.length + 12);
    return (
      N(t, 0, n.length),
      t.set(Y, 4),
      t.set(n, 8),
      N(t, 8 + n.length, X(t.slice(4, 8 + n.length))),
      t
    );
  }
  function Xt(n) {
    return At(n)
      .filter((t) => g(n, t.typeOffset, Y))
      .map((t) => n.slice(t.dataOffset, t.dataEnd));
  }
  function Zt(n, t) {
    let e = [n.slice(0, 8)],
      r = !1;
    for (let a of At(n)) {
      let o = g(n, a.typeOffset, Y);
      (g(n, a.typeOffset, Bt) && (e.push(Yt(t)), (r = !0)),
        o || e.push(n.slice(a.start, a.end)));
    }
    if (!r) throw new Error("The PNG does not contain an IEND chunk.");
    return E(e);
  }
  var F = E([new Uint8Array([33, 255, 11]), $t, zt]);
  function vt(n) {
    let t = [];
    for (let e = 0; e <= n.length - F.length; e++) {
      if (!g(n, e, F)) continue;
      let r = [],
        a = e + F.length;
      for (; a < n.length; ) {
        let o = n[a++];
        if (o === 0) {
          (t.push({ start: e, end: a, frame: E(r) }), (e = a - 1));
          break;
        }
        if (a + o > n.length)
          throw new Error("The GIF metadata extension is truncated.");
        (r.push(n.slice(a, a + o)), (a += o));
      }
    }
    return t;
  }
  function Qt(n) {
    let t = [F];
    for (let e = 0; e < n.length; e += 255) {
      let r = n.slice(e, e + 255);
      t.push(new Uint8Array([r.length]), r);
    }
    return (t.push(new Uint8Array([0])), E(t));
  }
  function te(n, t) {
    let e = n.lastIndexOf(59);
    if (e < 0) throw new Error("The GIF does not contain a trailer.");
    let r = [],
      a = 0;
    for (let o of vt(n)) (r.push(n.slice(a, o.start)), (a = o.end));
    return (r.push(n.slice(a, e), Qt(t), n.slice(e)), E(r));
  }
  function ee(n, t) {
    return t === "jpeg"
      ? Vt(n)
      : t === "png"
        ? Xt(n)
        : vt(n).map((e) => e.frame);
  }
  function kt(n, t, e) {
    return t === "jpeg" ? qt(n, e) : t === "png" ? Zt(n, e) : te(n, e);
  }
  async function re(n) {
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
  async function xt(n) {
    return new Uint8Array(await (await re(n)).arrayBuffer());
  }
  function ne(n) {
    let t = "";
    for (let r = 0; r < n.length; r += 32768)
      t += String.fromCharCode(...n.subarray(r, r + 32768));
    return btoa(t);
  }
  function ae(n, t) {
    return `data:${t};base64,${ne(n)}`;
  }
  var Et = /^[a-z0-9~-]{36}$/u,
    oe = /^[A-Za-z0-9_~-]+$/u;
  function Rt(n) {
    let t = n.trim();
    if (!Et.test(t))
      throw new TypeError(
        "Avatar metadata lookup requires a valid Drawaria account uid.",
      );
    return t;
  }
  function y(n, t) {
    if (!oe.test(n)) throw new TypeError(t);
    return n;
  }
  function Mt(n) {
    let t = n.trim();
    if (Et.test(t)) return Object.freeze({ kind: "account", uid: t });
    let e = t.split(".");
    if (e.length !== 2 || !e[0] || !e[1])
      throw new TypeError(
        "Avatar metadata lookup requires a valid account uid or anonymous uid.wt avatar id.",
      );
    return Object.freeze({
      kind: "anonymous",
      uid: y(e[0], "Avatar metadata lookup requires a safe anonymous uid."),
      wt: y(e[1], "Avatar metadata lookup requires a safe anonymous wt value."),
    });
  }
  var Tt = "drawaria-extension:avatar-metadata:";
  function H(n) {
    let t = (e) => {
      n.observeContext(e);
    };
    return {
      id: "account-avatar-storage",
      mount(e) {
        return (t(e), () => {});
      },
      refresh: t,
    };
  }
  var R = class {
    #t;
    #e = null;
    #r = !1;
    #n = null;
    #o = "idle";
    #a = null;
    #i = null;
    #s = null;
    #c = null;
    constructor(t) {
      this.#t = t;
    }
    get data() {
      return this.#n;
    }
    get status() {
      return this.#o;
    }
    get error() {
      return this.#a;
    }
    observeContext(t) {
      ((this.#r = this.#S(t)),
        (this.#e = t.accountUid ?? this.#e),
        this.#e &&
          (this.#l(this.#e),
          !(this.#i === this.#e || this.#c === this.#e) && this.load(this.#e)));
    }
    load(t = this.#e) {
      return t
        ? ((this.#e = t),
          this.#l(t),
          this.#s && this.#c === t
            ? this.#s
            : ((this.#o = "loading"),
              (this.#a = null),
              (this.#c = t),
              (this.#s = this.#w(t).finally(() => {
                ((this.#s = null), (this.#c = null));
              })),
              this.#s))
        : ((this.#o = "idle"), Promise.resolve(this.#n));
    }
    async loadForUid(t) {
      let e = Rt(t);
      return this.#d(e);
    }
    async save(t, e) {
      if (!this.#r || !this.#e)
        throw new Error(
          "Avatar metadata can only be saved after a logged-in account uid is observed.",
        );
      ((this.#o = "saving"), (this.#a = null));
      try {
        let r = e ?? (await this.#g(this.#e)),
          a = await k(r, t),
          o = await this.#u(a);
        return (
          (this.#n = t),
          (this.#i = this.#e),
          (this.#o = "loaded"),
          this.#h(this.#e, t),
          Object.freeze({ imageData: a, response: o })
        );
      } catch (r) {
        throw ((this.#o = "error"), (this.#a = this.#A(r)), r);
      }
    }
    clearLocal() {
      ((this.#n = null),
        (this.#a = null),
        (this.#o = "idle"),
        (this.#i = null));
    }
    async #w(t) {
      try {
        let e = await this.#g(t),
          r = this.#p(e);
        return r === null
          ? ((this.#n = null), (this.#o = "loaded"), (this.#i = t), null)
          : ((this.#n = r),
            (this.#o = "loaded"),
            (this.#i = t),
            this.#h(t, r),
            r);
      } catch (e) {
        return ((this.#o = "error"), (this.#a = this.#A(e)), this.#n);
      }
    }
    async #u(t) {
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
    #f(t) {
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
    async #g(t) {
      let e = await this.#t.fetch(this.#f(t));
      if (!e.ok)
        throw new Error(`Unable to load avatar image: HTTP ${e.status}.`);
      return new Uint8Array(await e.arrayBuffer());
    }
    async #d(t) {
      return this.#p(await this.#g(t));
    }
    #p(t) {
      return x(t);
    }
    #l(t) {
      if (this.#n !== null) return;
      let e = this.#y(`${Tt}${t}`);
      if (e)
        try {
          this.#n = JSON.parse(e);
        } catch {}
    }
    #h(t, e) {
      let r = JSON.stringify(e);
      r !== void 0 && this.#m(`${Tt}${t}`, r);
    }
    #y(t) {
      try {
        return this.#t.localStorage.getItem(t);
      } catch {
        return null;
      }
    }
    #m(t, e) {
      try {
        this.#t.localStorage.setItem(t, e);
      } catch {}
    }
    #S(t) {
      let e = m(t.activeWindow);
      if (e !== null) return e;
      let r = m(t.parentWindow);
      return r !== null ? r : (P(this.#t) ?? this.#r);
    }
    #A(t) {
      return t instanceof Error ? t.message : String(t);
    }
  };
  var ie = /^[a-z0-9-]{36}$/iu;
  function W(n) {
    return {
      id: "avatar-image-patcher",
      route: (t) => t?.kind === "home" || t?.kind === "palettes",
      mount(t) {
        return new Q(t, n).mount();
      },
    };
  }
  var Q = class {
    #t;
    #e;
    #r;
    #n;
    constructor(t, e) {
      ((this.#t = t),
        (this.#e = t.activeWindow),
        (this.#r = t.activeDocument),
        (this.#n = e));
    }
    mount() {
      if ((this.#g(), this.#t.route?.kind === "palettes")) {
        let r = this.#c("uid");
        return (this.#v(r) && this.#i("uid", r), () => {});
      }
      let t = this.#f();
      this.#S(t);
      let e = () => this.#p(t);
      return (
        this.#e.addEventListener("beforeunload", e),
        () => {
          this.#e.removeEventListener("beforeunload", e);
        }
      );
    }
    #o(t) {
      try {
        return decodeURIComponent(t);
      } catch {
        return t;
      }
    }
    #a(t) {
      try {
        return this.#e.localStorage.getItem(t);
      } catch {
        return null;
      }
    }
    #i(t, e) {
      try {
        this.#e.localStorage.setItem(t, e);
      } catch {}
    }
    #s() {
      return this.#r.cookie.split(";").reduce((t, e) => {
        let r = e.indexOf("="),
          a = r === -1 ? e : e.slice(0, r),
          o = r === -1 ? "" : e.slice(r + 1),
          i = this.#o(a.trim());
        return (i && (t[i] = this.#o(o.trim())), t);
      }, {});
    }
    #c(t) {
      return this.#s()[t] ?? null;
    }
    #w(t, e, r = {}) {
      let a = r.maxAge ?? 31536e4,
        o = [
          `${encodeURIComponent(t)}=${encodeURIComponent(e)}`,
          `Max-Age=${a}`,
          "Path=/",
        ];
      (this.#e.location.protocol === "https:"
        ? o.push("Secure", "Partitioned", "SameSite=None")
        : o.push("SameSite=Lax"),
        (this.#r.cookie = o.join("; ")));
    }
    #u() {
      let t = this.#e.crypto;
      return t && typeof t.randomUUID == "function"
        ? t.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
            let r = Math.floor(Math.random() * 16);
            return (e === "x" ? r : (r & 3) | 8).toString(16);
          });
    }
    #f() {
      let t = this.#c("uid"),
        e = this.#a("uid"),
        r = this.#v(t) ? t : this.#v(e) ? e : this.#u();
      return (this.#i("uid", r), this.#w("uid", r), r);
    }
    #g() {
      this.#e.DEBUG !== !0 &&
        this.#r.querySelectorAll("#rmv").forEach((t) => {
          t.closest(".rowitem")?.remove();
        });
    }
    #d() {
      let t = this.#r.body.querySelectorAll("script:not([src])"),
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
    #p(t) {
      let r = `${this.#d()}AVATARIMAGENOTFOUND=0;(s=document.createElement('script')).src='${this.#n}',document.body.append(s)`,
        a = `${t}<\/script><script>${r}<\/script><script>`;
      this.#w("uid", a);
    }
    #l() {
      let t = this.#r.createElement("div");
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
    #h() {
      let t = this.#r.createElement("a");
      t.href = "/avatar/builder/";
      let e = this.#r.createElement("i");
      return (
        (e.className = "far fa-edit"),
        e.setAttribute("aria-hidden", "true"),
        Object.assign(e.style, { color: "gray", fontSize: "2em" }),
        t.append(e),
        t
      );
    }
    #y(t) {
      let e = this.#r.createElement("div"),
        r = this.#r.createElement("img");
      return ((r.id = "selfavatarimage"), t && (r.src = t), e.append(r), e);
    }
    #m(t, e) {
      t.replaceChildren(this.#l(), this.#h(), this.#y(e));
    }
    #S(t) {
      let e = this.#r.getElementById("avatarcontainer");
      if (!e || this.#c("sid1")) return;
      let r = this.#c("wt"),
        a = this.#v(t) && !!r,
        o = this.#r.referrer.includes("/avatar/builder");
      if (a && !o) {
        this.#m(
          e,
          `/avatar/cache/${encodeURIComponent(t)}.${encodeURIComponent(r || "")}.jpg`,
        );
        return;
      }
      let i = this.#a("avatarimagedata");
      (this.#m(e, i),
        i &&
          this.#A(i).catch((s) => {
            console.warn("Unable to update avatar image.", s);
          }));
    }
    async #A(t) {
      let e = await this.#e.fetch("https://drawaria.online/uploadavatarimage", {
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
      a && this.#w("wt", a);
    }
    #v(t) {
      return ie.test(t || "");
    }
  };
  function G(n, t) {
    return Object.freeze({
      get data() {
        return n.data;
      },
      get status() {
        return n.status;
      },
      get error() {
        return n.error;
      },
      get anonymousStatus() {
        return t.status;
      },
      get anonymousError() {
        return t.error;
      },
      load: () => n.load(),
      loadForUid: (e) => n.loadForUid(e),
      loadForAvatar: async (e) => {
        let r = Mt(e);
        return r.kind === "account"
          ? n.loadForUid(r.uid)
          : t.loadForIdentity(r.uid, r.wt);
      },
      save: (e, r) => n.save(e, r),
      clearLocal: () => n.clearLocal(),
      anonymousLoad: (e, r) => t.load(e, r),
      anonymousSave: (e, r, a) => t.save(e, r, a),
      anonymousClearLocal: () => t.clearLocal(),
    });
  }
  var se = 31536e4,
    le = new Uint8Array([
      137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0, 73, 69, 78, 68, 0, 0, 0, 0,
    ]);
  function B(n) {
    let t = (e) => {
      n.observeContext(e);
    };
    return {
      id: "anonymous-avatar-storage",
      mount(e) {
        return (t(e), () => {});
      },
      refresh: t,
    };
  }
  var M = class {
    #t;
    #e = "idle";
    #r = null;
    constructor(t) {
      this.#t = t;
    }
    get status() {
      return this.#e;
    }
    get error() {
      return this.#r;
    }
    observeContext(t) {}
    async load(t, e) {
      ((this.#e = "loading"), (this.#r = null));
      try {
        let r = await this.#n(t, e);
        return ((this.#e = "loaded"), r);
      } catch (r) {
        throw ((this.#e = "error"), (this.#r = this.#d(r)), r);
      }
    }
    async loadForIdentity(t, e) {
      return this.#n(t, e);
    }
    async save(t, e, r = le) {
      ((this.#e = "saving"), (this.#r = null));
      let a = this.#c("uid");
      try {
        let o = await k(r, e);
        this.#f("uid", t);
        let i = await this.#o(o),
          s = this.#i(i);
        return (
          (this.#e = "loaded"),
          Object.freeze({ imageData: o, uid: s.uid, wt: s.wt, response: i })
        );
      } catch (o) {
        throw ((this.#e = "error"), (this.#r = this.#d(o)), o);
      } finally {
        this.#s(a);
      }
    }
    clearLocal() {
      ((this.#r = null), (this.#e = "idle"));
    }
    async #n(t, e) {
      let r = await this.#t.fetch(this.#a(t, e));
      if (r.status === 404) return null;
      if (!r.ok)
        throw new Error(
          `Unable to load anonymous storage image: HTTP ${r.status}.`,
        );
      return x(new Uint8Array(await r.arrayBuffer()));
    }
    async #o(t) {
      let e = await this.#t.fetch(
        new URL("/uploadavatarimage", this.#t.location.href).href,
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
        throw new Error(
          `Anonymous storage upload failed with HTTP ${e.status}`,
        );
      return e.text();
    }
    #a(t, e) {
      let r = y(t, "Anonymous storage load requires a safe cache uid."),
        a = y(e, "Anonymous storage load requires a safe wt value."),
        o = `${encodeURIComponent(r)}.${encodeURIComponent(a)}.jpg`,
        i = new URL(`/avatar/cache/${o}`, this.#t.location.href);
      return (
        i.searchParams.set(
          "drawariaExtensionAnonymousStorage",
          String(Date.now()),
        ),
        i.href
      );
    }
    #i(t) {
      let r = t.trim().split(/[/?#]/u).filter(Boolean).pop() ?? "",
        a = r.endsWith(".jpg") ? r.slice(0, -4) : r,
        o = a.lastIndexOf("."),
        i = o > 0 ? a.slice(0, o) : a,
        s = o > 0 ? a.slice(o + 1) : null;
      return Object.freeze({
        uid: y(i, "Anonymous storage upload returned an unsafe cache uid."),
        wt: s
          ? y(s, "Anonymous storage upload returned an unsafe wt value.")
          : null,
      });
    }
    #s(t) {
      t === null ? this.#g("uid") : this.#f("uid", t);
    }
    #c(t) {
      return this.#w()[t] ?? null;
    }
    #w() {
      return this.#t.document.cookie.split(";").reduce((t, e) => {
        let r = e.indexOf("="),
          a = r === -1 ? e : e.slice(0, r),
          o = r === -1 ? "" : e.slice(r + 1),
          i = this.#u(a.trim());
        return (i && (t[i] = this.#u(o.trim())), t);
      }, {});
    }
    #u(t) {
      try {
        return decodeURIComponent(t);
      } catch {
        return t;
      }
    }
    #f(t, e, r = {}) {
      let a = r.maxAge ?? se,
        o = [
          `${encodeURIComponent(t)}=${encodeURIComponent(e)}`,
          `Max-Age=${a}`,
          "Path=/",
        ];
      (this.#t.location.protocol === "https:"
        ? o.push("Secure", "Partitioned", "SameSite=None")
        : o.push("SameSite=Lax"),
        (this.#t.document.cookie = o.join("; ")));
    }
    #g(t) {
      this.#f(t, "", { maxAge: 0 });
    }
    #d(t) {
      return t instanceof Error ? t.message : String(t);
    }
  };
  var T = class {
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
  var C = class {
    #t;
    #e;
    #r = new Map();
    #n = null;
    constructor(t, e) {
      ((this.#t = t), (this.#e = e));
    }
    register(t) {
      (this.#s(t), this.unregister(t.id));
      let e = { module: t, mounted: null, error: null };
      return (
        this.#r.set(t.id, e),
        this.#n && this.#o(e, this.#n),
        () => this.unregister(t.id)
      );
    }
    unregister(t) {
      let e = this.#r.get(t);
      return e ? (this.#a(e), this.#r.delete(t)) : !1;
    }
    apply(t) {
      this.#n = t;
      for (let e of this.#r.values()) this.#o(e, t);
    }
    dispose() {
      for (let t of this.#r.values()) this.#a(t);
      this.#n = null;
    }
    statuses() {
      return Object.freeze(
        [...this.#r.values()].map((t) =>
          Object.freeze({
            id: t.module.id,
            mounted: t.mounted !== null,
            applicationKey: t.mounted?.applicationKey ?? null,
            error: t.error,
          }),
        ),
      );
    }
    #o(t, e) {
      if (!this.#i(t.module, e)) {
        this.#a(t);
        return;
      }
      let r = this.#e(e);
      try {
        if (t.mounted?.applicationKey === r && t.module.refresh) {
          (t.module.refresh(this.#t(e, t.mounted.stack)), (t.error = null));
          return;
        }
        this.#a(t);
        let a = new T();
        t.mounted = { stack: a, applicationKey: r };
        let o = t.module.mount(this.#t(e, a));
        (typeof o == "function" && a.add(o), (t.error = null));
      } catch (a) {
        ((t.error = a instanceof Error ? a.message : String(a)), this.#a(t));
      }
    }
    #a(t) {
      let e = t.mounted;
      ((t.mounted = null), e?.stack.dispose());
    }
    #i(t, e) {
      return t.matches ? t.matches(e) : !0;
    }
    #s(t) {
      if (!t.id.trim())
        throw new TypeError("Module id must be a non-empty string.");
      if (typeof t.mount != "function")
        throw new TypeError(`Module "${t.id}" must provide mount().`);
      if (t.matches && typeof t.matches != "function")
        throw new TypeError(`Module "${t.id}" matches must be a function.`);
      if (t.refresh && typeof t.refresh != "function")
        throw new TypeError(`Module "${t.id}" refresh must be a function.`);
    }
  };
  var b = class {
    #t;
    constructor(t) {
      let e = (r, a) => {
        let o = r.parentWindow.document;
        return Object.freeze({
          parentWindow: r.parentWindow,
          parentDocument: o,
          activeWindow: r.activeWindow,
          activeDocument: r.activeWindow.document,
          route: r.route,
          url: new URL(r.url.href),
          frame: r.frame,
          shellRoot: r.shellRoot,
          socket: r.socket,
          accountUid: r.accountUid,
          onCleanup: (i) => a.add(i),
        });
      };
      this.#t = new C(e, (r) => r.route?.pathname ?? null);
    }
    register(t) {
      return this.#t.register({
        id: t.id,
        matches: (e) => (t.route ? t.route(e.route) : !0),
        mount: t.mount,
        ...(t.refresh ? { refresh: t.refresh } : {}),
      });
    }
    unregister(t) {
      return this.#t.unregister(t);
    }
    apply(t) {
      this.#t.apply(t);
    }
    dispose() {
      this.#t.dispose();
    }
    statuses() {
      return Object.freeze(
        this.#t
          .statuses()
          .map((t) =>
            Object.freeze({
              id: t.id,
              mounted: t.mounted,
              routePathname: t.applicationKey,
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
  };
  var Ct = Symbol.for("drawaria.extension.socketManager"),
    bt = Symbol.for("drawaria.extension.patchedIo"),
    Ut = Symbol.for("drawaria.extension.patchedSocket"),
    ce = new Set(["connect", "disconnect", "error"]),
    p = class {
      #t;
      #e = new Set();
      #r = new Map();
      #n = new Map();
      #o = new Map();
      #a = new Map();
      #i = !1;
      #s = null;
      constructor(t) {
        this.#t = t;
      }
      get sockets() {
        return Object.freeze([...this.#e]);
      }
      get primarySocket() {
        return this.#s;
      }
      initialize() {
        return (
          this.#i || ((this.#i = !0), (this.#t[Ct] = this)),
          this.attachWindow(this.#t),
          this
        );
      }
      attachWindow(t) {
        return ((t[Ct] = this), this.#c(t), this.#w(t), this);
      }
      refresh() {
        return (this.attachWindow(this.#t), this);
      }
      interceptEmit(t, e) {
        return this.#h(this.#r, t, e);
      }
      interceptIncoming(t, e) {
        return this.#h(this.#n, t, e);
      }
      replaceIncoming(t, e) {
        return this.#y(this.#o, t, e);
      }
      on(t, e) {
        return this.#y(this.#a, t, e);
      }
      trigger(t, ...e) {
        let r = this.#s;
        return r ? (this.#g(r, t, e, (a) => this.#d(r, t, a)), !0) : !1;
      }
      createDebugFacade() {
        let t = this;
        return Object.freeze({
          get sockets() {
            return Object.freeze([...t.#e]);
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
          incoming: this.#m(this.#n),
          outgoing: this.#m(this.#r),
          replacements: this.#m(this.#o),
          listeners: this.#m(this.#a),
        });
      }
      #c(t) {
        let e = t.io;
        if (typeof e != "function") return;
        let r = e;
        if (!r[bt]) {
          let i = r.__drawariaOriginalIo ?? r,
            s = this,
            l = function (...h) {
              let u = Reflect.apply(i, this, h);
              return (s.#u(u), u);
            };
          if (
            (Object.assign(l, r),
            (l.__drawariaOriginalIo = i),
            (l[bt] = !0),
            typeof r.connect == "function")
          ) {
            let c = r.connect;
            ((l.__drawariaOriginalConnect = c),
              (l.connect = (...h) => {
                let u = c(...h);
                return (s.#u(u), u);
              }));
          } else l.connect = l;
          t.io = l;
        }
        let o = t.io.Socket?.prototype;
        this.#S(o) && this.#f(o);
      }
      #w(t) {
        let e = t.io;
        if (typeof e != "function") return;
        let r = e.managers;
        if (r)
          for (let a of Object.values(r))
            for (let o of Object.values(a.nsps ?? {})) this.#S(o) && this.#u(o);
      }
      #u(t) {
        (this.#f(t), this.#e.has(t) || this.#e.add(t), (this.#s = t));
      }
      #f(t) {
        let e = t;
        if (e[Ut] || typeof e.emit != "function") return;
        let r = this;
        ((e.__drawariaOriginalEmit = e.emit),
          (e.emit = function (o, ...i) {
            if ((r.#u(this), ce.has(o)))
              return e.__drawariaOriginalEmit?.call(this, o, ...i) ?? this;
            let s = r.#p(r.#r, this, o, i, !0);
            return s
              ? (e.__drawariaOriginalEmit?.call(this, o, ...s.args) ?? this)
              : this;
          }),
          typeof e.onevent == "function" &&
            ((e.__drawariaOriginalOnevent = e.onevent),
            (e.onevent = function (o) {
              r.#u(this);
              let i = Array.isArray(o.data) ? o.data : [],
                [s, ...l] = i;
              if (typeof s != "string") {
                e.__drawariaOriginalOnevent?.call(this, o);
                return;
              }
              r.#g(this, s, l, (c) => {
                ((o.data = [s, ...c]),
                  e.__drawariaOriginalOnevent?.call(this, o));
              });
            })),
          (e[Ut] = !0));
      }
      #g(t, e, r, a) {
        let o = this.#p(this.#n, t, e, r);
        if (!o) return;
        let i = this.#o.get(e) ?? [];
        if (i.length > 0) for (let s of [...i]) s.call(t, ...o.args);
        else a(o.args);
        for (let s of [...(this.#a.get(e) ?? [])]) s.call(t, ...o.args);
      }
      #d(t, e, r) {
        let a = t;
        if (typeof a.__drawariaOriginalOnevent == "function") {
          a.__drawariaOriginalOnevent.call(t, { type: 2, data: [e, ...r] });
          return;
        }
        for (let o of [...(t._callbacks?.[`$${e}`] ?? [])]) o.call(t, ...r);
      }
      #p(t, e, r, a, o = !1) {
        let i = a;
        for (let s of t.get(r) ?? []) {
          let l = s(
            Object.freeze({ socket: e, event: r, args: Object.freeze([...i]) }),
          );
          if (this.#A(l)) return null;
          this.#v(l) && l.args && (i = this.#l(i, l.args, o));
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
      #h(t, e, r) {
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
      #y(t, e, r) {
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
      #m(t) {
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
      #A(t) {
        return t?.action === "cancel";
      }
      #v(t) {
        return t?.action === "continue";
      }
    };
  var ue = new Set(["/rules", "/privacy", "/terms", "/links"]),
    de = /^\/gallery\/img\/[^/]+$/u,
    he = new Map([
      ["/profile", "profile"],
      ["/gallery", "gallery"],
      ["/scoreboards", "scoreboards"],
      ["/palettes", "palettes"],
      ["/friends", "friends"],
      ["/avatar", "avatar"],
    ]);
  function L(n) {
    return (n.startsWith("/") ? n : `/${n}`).replace(/\/+$/u, "") || "/";
  }
  function d(n, t) {
    let e;
    try {
      e = new URL(n, t);
    } catch {
      return null;
    }
    if (e.protocol !== "http:" && e.protocol !== "https:") return null;
    let r = L(e.pathname);
    if (r.startsWith("/auth")) return null;
    let a =
      r === "/"
        ? "home"
        : (he.get(r) ??
          (de.test(r) ? "gallery" : void 0) ??
          (ue.has(r) ? "static" : void 0));
    return a
      ? Object.freeze({
          kind: a,
          pathname: r,
          url: `${e.pathname}${e.search}${e.hash}`,
        })
      : null;
  }
  var tt = "drawaria:shell:before-navigate",
    D = "drawaria:shell:after-navigate",
    et = "drawaria:shell:frame-load",
    rt = "drawaria:shell:navigation-fallback",
    Lt = "data-drawaria-extension-shell",
    Dt = "data-drawaria-extension-shell-frame",
    S = "drawariaShellTarget",
    It = "Navigator/version1.js",
    I = "//userscript.cubic074.workers.dev/v1.js",
    nt = encodeURIComponent(
      `<script>d=document,d.head.appendChild(d.createElement\`script\`).src="${I}"<\/script>`,
    ),
    U = class {
      #t;
      #e;
      #r;
      #n;
      #o;
      #a;
      #i;
      #s;
      #c;
      #w;
      #u;
      #f;
      #g;
      #d = !1;
      #p = null;
      #l = null;
      #h = null;
      #y = null;
      #m = null;
      #S = null;
      #A = null;
      #v = null;
      #E = null;
      #R = null;
      #M = null;
      constructor(t, e, r = null) {
        ((this.#t = t.targetWindow ?? window),
          (this.#e = t.assign ?? ((a) => this.#t.location.assign(a))),
          (this.#r = t.open ?? ((a, o, i) => this.#t.open(a, o, i))),
          (this.#n = r),
          (this.#o = e),
          (this.#a =
            t.enableSocket === !1
              ? null
              : (t.socketManager ?? new p(this.#t).initialize())),
          (this.#w = t.beforeNavigate),
          (this.#u = t.afterNavigate),
          (this.#f = t.afterFrameLoad),
          (this.#g = t.onFallback),
          (this.#i = (a) => this.#H(a)),
          (this.#s = () => {
            this.navigate(this.#t.location.href, { historyMode: "none" });
          }),
          (this.#c = this.#P()));
      }
      get active() {
        return this.#d;
      }
      get currentUrl() {
        return this.#E ?? this.#t.location.href;
      }
      get currentRoute() {
        return this.#R ?? d(this.#t.location.href, this.#t.location.href);
      }
      get lastNavigation() {
        return this.#M;
      }
      get shellRoot() {
        return this.#p;
      }
      get frame() {
        return this.#l;
      }
      get socket() {
        return this.#a;
      }
      initialize() {
        if (this.#d) return;
        ((this.#d = !0),
          this.#t.document.addEventListener("click", this.#i, !0),
          this.#t.addEventListener("popstate", this.#s),
          this.#z(),
          this.#n?.scan(this.#t));
        let t = d(this.#t.location.href, this.#t.location.href);
        ((this.#R = t),
          (this.#E = this.#t.location.href),
          this.#b(this.#t, t, new URL(this.#t.location.href), null));
      }
      cleanup() {
        this.#d &&
          ((this.#d = !1),
          this.#T("before"),
          this.#T("frame"),
          this.#t.document.removeEventListener("click", this.#i, !0),
          this.#t.removeEventListener("popstate", this.#s),
          this.#U(),
          this.#O(),
          this.#l && this.#h && this.#l.removeEventListener("load", this.#h),
          (this.#h = null),
          this.#p?.remove(),
          (this.#p = null),
          (this.#l = null),
          this.#o.dispose(),
          this.#x(D, {
            result: this.#k(
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
        if (!this.#d)
          return this.#k({
            status: "ignored",
            url: String(t),
            route: null,
            reason: "Shell inactive",
          });
        let r = new URL(t, this.#t.location.href),
          a = d(r, this.#t.location.href);
        if (!a || r.origin !== this.#t.location.origin)
          return this.#D(r, a, "Unsupported route");
        try {
          this.#n?.scan(this.#t);
          let o = this.#F();
          (this.#T("before"),
            this.#U(),
            (this.#E = r.href),
            (this.#R = a),
            this.#x(tt, { route: a, url: r }));
          let i = this.#w?.(a, new URL(r.href));
          return (
            (this.#m = typeof i == "function" ? i : null),
            this.#b(this.#t, a, r, o),
            (o.src = r.href),
            e.historyMode === "push" &&
              this.#t.history.pushState(
                { drawariaShell: !0 },
                this.#t.document.title,
                r.href,
              ),
            this.#k({ status: "completed", url: r.href, route: a })
          );
        } catch (o) {
          let i = o instanceof Error ? o.message : "Navigation failed";
          return this.#D(r, a, i);
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
          e = t.querySelector(`[${Lt}]`),
          r = e ?? t.createElement("main");
        (r.setAttribute(Lt, ""),
          (r.style.display = "block"),
          (r.style.width = "100%"),
          (r.style.height = "100vh"),
          e || t.body.replaceChildren(r));
        let a = r.querySelector(`iframe[${Dt}]`),
          o = a ?? t.createElement("iframe");
        return (
          o.setAttribute(Dt, ""),
          (o.title = "Drawaria shell content"),
          (o.style.border = "0"),
          (o.style.display = "block"),
          (o.style.width = "100%"),
          (o.style.height = "100%"),
          a || r.append(o),
          this.#l !== o &&
            (this.#l && this.#h && this.#l.removeEventListener("load", this.#h),
            (this.#h = () => this.#N()),
            o.addEventListener("load", this.#h)),
          (this.#p = r),
          (this.#l = o),
          o
        );
      }
      #N() {
        let t = this.#l,
          e = this.#R;
        if (!t || !e) return;
        let r = this.#q(t),
          a = this.#_(t);
        if (!r || !a) return;
        (this.#V(r),
          this.#a?.attachWindow(a),
          this.#T("frame"),
          this.#j(r, a),
          this.#L(r, a, "replace"),
          this.#n?.scan(a),
          this.#x(et, {
            route: e,
            frameDocument: r,
            frameWindow: a,
            frame: t,
          }));
        let o = this.#f?.(e, r, a, t);
        ((this.#S = typeof o == "function" ? o : null),
          this.#b(a, e, new URL(this.#E ?? t.src), t));
      }
      #H(t) {
        if (t.type !== "click" || !this.#X(t)) return;
        let e = this.#Z(t),
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
          this.#Y(o, a) ||
          L(a.pathname).startsWith("/auth")
        )
          return null;
        let i = d(a, o);
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
        this.#r(a.href, "_blank", "noopener") ||
          this.#k({
            status: "ignored",
            url: t.href,
            route: e,
            reason: "New tab was blocked",
          });
      }
      #B(t, e) {
        let r = this.#$(e) ? `/rcon/${nt}` : "/",
          a = new URL(r, this.#t.location.href);
        return (a.searchParams.set(S, `${t.pathname}${t.search}${t.hash}`), a);
      }
      #$(t) {
        if (this.#C(t) || this.#C(this.#t)) return !0;
        let e = this.#l ? this.#_(this.#l) : null;
        return this.#C(e) ? !0 : P(this.#t) === !0;
      }
      #C(t) {
        return t ? m(t) === !0 : !1;
      }
      #b(t, e, r, a) {
        let o = {
          parentWindow: this.#t,
          activeWindow: t,
          route: e,
          url: r ?? new URL(this.#t.location.href),
          frame: a,
          shellRoot: this.#p,
          socket: this.#a,
          accountUid: this.#n?.uid ?? null,
        };
        this.#o.apply(o);
      }
      #D(t, e, r) {
        let a = this.#k(
          { status: "fallback", url: t.href, route: e, reason: r },
          !1,
        );
        return (
          this.#x(rt, { result: a }),
          this.#g?.(a),
          this.#e(t.href),
          this.#u?.(a),
          this.#x(D, { result: a }),
          a
        );
      }
      #k(t, e = !0) {
        return (
          (this.#M = Object.freeze(t)),
          e && (this.#u?.(this.#M), this.#x(D, { result: this.#M })),
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
        this.#U();
        let r = [],
          a = () => this.#L(t, e, "replace"),
          o = () => this.#L(t, e, "push");
        (e.addEventListener("popstate", a),
          e.addEventListener("hashchange", a),
          r.push(() => {
            (e.removeEventListener("popstate", a),
              e.removeEventListener("hashchange", a));
          }));
        let i = t.querySelector("title"),
          s = this.#J(),
          l = i && s ? new s(() => this.#I(t)) : null;
        i &&
          l &&
          (l.observe(i, { childList: !0, characterData: !0, subtree: !0 }),
          r.push(() => l.disconnect()));
        let c = e.history,
          h = c.pushState,
          u = c.replaceState;
        ((c.pushState = function (A, $, z) {
          (h.call(this, A, $, z), o());
        }),
          (c.replaceState = function (A, $, z) {
            (u.call(this, A, $, z), a());
          }),
          r.push(() => {
            ((c.pushState = h), (c.replaceState = u));
          }),
          (this.#A = () => {
            for (let _ of r.splice(0)) _();
          }));
      }
      #U() {
        (this.#A?.(), (this.#A = null));
      }
      #L(t, e, r) {
        (this.#I(t), this.#K(e.location.href, r));
      }
      #I(t) {
        let e = t.title.trim();
        !e || this.#t.document.title === e || (this.#t.document.title = e);
      }
      #K(t, e) {
        let r = new URL(t, this.#t.location.href),
          a = d(r, this.#t.location.href),
          o = this.#t.location.href;
        if (o === r.href && this.#v === r.href) return;
        let i = { drawariaShell: !0 };
        (e === "replace" || o === r.href || this.#v === r.href
          ? this.#t.history.replaceState(i, this.#t.document.title, r.href)
          : this.#t.history.pushState(i, this.#t.document.title, r.href),
          (this.#v = r.href),
          !(!a || r.origin !== this.#t.location.origin) &&
            ((this.#E = r.href),
            (this.#R = a),
            this.#k({ status: "completed", url: r.href, route: a })));
      }
      #J() {
        let t = this.#t.MutationObserver;
        return typeof t == "function" ? t : null;
      }
      #x(t, e) {
        let r = this.#t.document.createEvent("CustomEvent");
        (r.initCustomEvent(t, !1, !1, Object.freeze(e)),
          this.#t.document.dispatchEvent(r));
      }
      #T(t) {
        let e = t === "before" ? this.#m : this.#S;
        (t === "before" ? (this.#m = null) : (this.#S = null), e?.());
      }
      #V(t) {
        this.#y !== t &&
          (this.#O(), t.addEventListener("click", this.#i, !0), (this.#y = t));
      }
      #O() {
        (this.#y?.removeEventListener("click", this.#i, !0), (this.#y = null));
      }
      #q(t) {
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
      #Y(t, e) {
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
      #Z(t) {
        let e = t.target;
        if (!e || typeof e != "object" || !("closest" in e)) return null;
        let r = e.closest;
        return typeof r == "function" ? r.call(e, "a[href]") : null;
      }
    };
  var O = Symbol.for("drawaria.extension.runtime"),
    fe = () => {};
  function ge(n, t = window) {
    return d(n, t.location.href);
  }
  function pe(n = window) {
    return n[O]?.controller.frame?.contentDocument ?? n.document;
  }
  function at(n = {}) {
    let t = n.targetWindow ?? window;
    if (Se(t)) return fe;
    let e = t[O];
    if ((t.document.body.style.setProperty("margin", "0"), e?.active))
      return e.cleanup;
    let r = new R(t),
      a = new M(t),
      o = G(r, a),
      i = new v(t, o),
      s = new b(t);
    (s.register(W(I)), s.register(H(r)), s.register(B(a)));
    let l =
        n.enableSocket === !1
          ? null
          : (n.socketManager ?? new p(t).initialize()),
      c = new U({ ...n, targetWindow: t, socketManager: l }, s, i),
      h = Object.freeze({
        account: i.createFacade(),
        shell: c.createDebugFacade(),
        modules: s.createFacade(),
        ...(l ? { socket: l.createDebugFacade() } : {}),
      }),
      u = {
        active: !0,
        controller: c,
        modules: s,
        facade: h,
        cleanup: () => {
          u.active &&
            ((u.active = !1),
            c.cleanup(),
            t.DrawariaExtension === h && delete t.DrawariaExtension,
            delete t[O]);
        },
      };
    ((t[O] = u), (t.DrawariaExtension = h), c.initialize());
    let A = we(t, c) ? null : ye(t);
    return (A && c.navigate(A), u.cleanup);
  }
  function me(n = {}) {
    return at(n);
  }
  function we(n, t) {
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
    return !d(o, n.location.href) || o.origin !== n.location.origin
      ? (n.history.replaceState({ drawariaShell: !0 }, n.document.title, a), !1)
      : (n.history.replaceState(
          { drawariaShell: !0 },
          n.document.title,
          o.href,
        ),
        t.navigate(o, { historyMode: "none" }),
        !0);
  }
  function ye(n) {
    let t = new URL(n.location.href);
    return t.searchParams.has(S)
      ? null
      : /^\/rcon(?:\/.*)?$/u.test(t.pathname)
        ? new URL("/", t)
        : d(t, t)
          ? t
          : new URL("/", t);
  }
  function Se(n) {
    try {
      if (n.parent === n) return !1;
      let t = n.parent[O];
      return t?.active === !0 && t.controller.frame?.contentWindow === n;
    } catch {
      return !1;
    }
  }
  typeof window < "u" &&
    (at(),
    window?.DrawariaExtension?.modules.register({
      id: "avatar-image-patcher",
      route: () => !1,
      mount: () => {},
    }));
  return Ht(Ae);
})();
