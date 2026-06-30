'use strict';
var DrawariaExtensionBundle = (() => {
  var L = Object.defineProperty;
  var W = Object.getOwnPropertyDescriptor;
  var P = Object.getOwnPropertyNames;
  var U = Object.prototype.hasOwnProperty;
  var z = (o, e) => {
      for (var t in e) L(o, t, { get: e[t], enumerable: !0 });
    },
    B = (o, e, t, n) => {
      if ((e && typeof e == 'object') || typeof e == 'function')
        for (let r of P(e))
          !U.call(o, r) && r !== t && L(o, r, { get: () => e[r], enumerable: !(n = W(e, r)) || n.enumerable });
      return o;
    };
  var j = (o) => B(L({}, '__esModule', { value: !0 }), o);
  var Z = {};
  z(Z, {
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_NAME: () => _,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_PATH_SEGMENT: () => O,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_URL: () => C,
    DRAWARIA_SHELL_AFTER_NAVIGATE_EVENT: () => w,
    DRAWARIA_SHELL_BEFORE_NAVIGATE_EVENT: () => M,
    DRAWARIA_SHELL_FRAME_LOAD_EVENT: () => A,
    DRAWARIA_SHELL_NAVIGATION_FALLBACK_EVENT: () => D,
    DRAWARIA_SHELL_TARGET_PARAMETER: () => f,
    DrawariaShellController: () => m,
    ShellModuleLoader: () => S,
    SocketManager: () => d,
    getActiveDrawariaDocument: () => q,
    initializeDrawariaExtension: () => T,
    initializeDrawariaShell: () => J,
    matchDrawariaShellRoute: () => Y,
    matchShellRoute: () => u,
    normalizeShellPathname: () => g,
  });
  var k = class {
    #e = [];
    add(e) {
      if (typeof e != 'function') throw new TypeError('Cleanup callback must be a function.');
      let t = !0;
      return (
        this.#e.push(e),
        () => {
          if (!t) return;
          t = !1;
          let n = this.#e.indexOf(e);
          (n >= 0 && this.#e.splice(n, 1), e());
        }
      );
    }
    dispose() {
      let e = this.#e.splice(0).reverse(),
        t = [];
      for (let n of e)
        try {
          n();
        } catch (r) {
          t.push(r);
        }
      if (t.length > 0) throw new Error('One or more cleanup callbacks failed.');
    }
  };
  var S = class {
    #e;
    #r = new Map();
    #a = null;
    constructor(e) {
      this.#e = e;
    }
    register(e) {
      (this.#l(e), this.unregister(e.id));
      let t = { module: e, mounted: null, error: null };
      return (this.#r.set(e.id, t), this.#a && this.#i(t, this.#a), () => this.unregister(e.id));
    }
    unregister(e) {
      let t = this.#r.get(e);
      return t ? (this.#n(t), this.#r.delete(e)) : !1;
    }
    apply(e) {
      this.#a = e;
      for (let t of this.#r.values()) this.#i(t, e);
    }
    dispose() {
      for (let e of this.#r.values()) this.#n(e);
      this.#a = null;
    }
    statuses() {
      return Object.freeze(
        [...this.#r.values()].map((e) =>
          Object.freeze({
            id: e.module.id,
            mounted: e.mounted !== null,
            routePathname: e.mounted?.routePathname ?? null,
            error: e.error,
          })
        )
      );
    }
    createFacade() {
      return Object.freeze({ register: (e) => this.register(e), statuses: () => this.statuses() });
    }
    #i(e, t) {
      if (!this.#u(e.module, t.route)) {
        this.#n(e);
        return;
      }
      let n = this.#o(t, e);
      try {
        if (e.mounted?.routePathname === t.route?.pathname && e.module.refresh) {
          (e.module.refresh(n), (e.error = null));
          return;
        }
        this.#n(e);
        let r = new k();
        e.mounted = { stack: r, routePathname: t.route?.pathname ?? null };
        let a = e.module.mount(this.#o(t, e));
        (typeof a == 'function' && r.add(a), (e.error = null));
      } catch (r) {
        ((e.error = r instanceof Error ? r.message : String(r)), this.#n(e));
      }
    }
    #o(e, t) {
      let n = e.parentWindow.document,
        r = t.mounted?.stack;
      return Object.freeze({
        parentWindow: e.parentWindow,
        parentDocument: n,
        activeWindow: e.activeWindow,
        activeDocument: e.activeWindow.document,
        route: e.route,
        url: new URL(e.url.href),
        frame: e.frame,
        shellRoot: e.shellRoot,
        socket: e.socket,
        onCleanup(a) {
          if (!r) throw new Error('Cleanup can only be registered while a module is mounted.');
          return r.add(a);
        },
      });
    }
    #n(e) {
      let t = e.mounted;
      ((e.mounted = null), t?.stack.dispose());
    }
    #u(e, t) {
      return e.route ? e.route(t) : !0;
    }
    #l(e) {
      if (!e.id.trim()) throw new TypeError('Shell module id must be a non-empty string.');
      if (typeof e.mount != 'function') throw new TypeError(`Shell module "${e.id}" must provide mount().`);
      if (e.route && typeof e.route != 'function')
        throw new TypeError(`Shell module "${e.id}" route must be a function.`);
      if (e.refresh && typeof e.refresh != 'function')
        throw new TypeError(`Shell module "${e.id}" refresh must be a function.`);
    }
  };
  var I = Symbol.for('drawaria.extension.socketManager'),
    F = Symbol.for('drawaria.extension.patchedIo'),
    x = Symbol.for('drawaria.extension.patchedSocket'),
    $ = new Set(['connect', 'disconnect', 'error']),
    d = class {
      #e;
      #r = new Set();
      #a = new Map();
      #i = new Map();
      #o = new Map();
      #n = new Map();
      #u = !1;
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
        return (this.#u || ((this.#u = !0), (this.#e[I] = this)), this.attachWindow(this.#e), this);
      }
      attachWindow(e) {
        return ((e[I] = this), this.#E(e), this.#y(e), this);
      }
      refresh() {
        return (this.attachWindow(this.#e), this);
      }
      interceptEmit(e, t) {
        return this.#p(this.#a, e, t);
      }
      interceptIncoming(e, t) {
        return this.#p(this.#i, e, t);
      }
      replaceIncoming(e, t) {
        return this.#S(this.#o, e, t);
      }
      on(e, t) {
        return this.#S(this.#n, e, t);
      }
      trigger(e, ...t) {
        let n = this.#l;
        return n ? (this.#s(n, e, t, (r) => this.#f(n, e, r)), !0) : !1;
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
          on: (t, n) => e.on(t, n),
          interceptEmit: (t, n) => e.interceptEmit(t, n),
          interceptIncoming: (t, n) => e.interceptIncoming(t, n),
          replaceIncoming: (t, n) => e.replaceIncoming(t, n),
          trigger: (t, ...n) => e.trigger(t, ...n),
          hooks: () => e.hooks(),
        });
      }
      hooks() {
        return Object.freeze({
          incoming: this.#d(this.#i),
          outgoing: this.#d(this.#a),
          replacements: this.#d(this.#o),
          listeners: this.#d(this.#n),
        });
      }
      #E(e) {
        let t = e.io;
        if (typeof t != 'function') return;
        let n = t;
        if (!n[F]) {
          let i = n.__drawariaOriginalIo ?? n,
            l = this,
            s = function (...p) {
              let h = Reflect.apply(i, this, p);
              return (l.#h(h), h);
            };
          if ((Object.assign(s, n), (s.__drawariaOriginalIo = i), (s[F] = !0), typeof n.connect == 'function')) {
            let c = n.connect;
            ((s.__drawariaOriginalConnect = c),
              (s.connect = (...p) => {
                let h = c(...p);
                return (l.#h(h), h);
              }));
          } else s.connect = s;
          e.io = s;
        }
        let a = e.io.Socket?.prototype;
        this.#m(a) && this.#R(a);
      }
      #y(e) {
        let t = e.io;
        if (typeof t != 'function') return;
        let n = t.managers;
        if (n) for (let r of Object.values(n)) for (let a of Object.values(r.nsps ?? {})) this.#m(a) && this.#h(a);
      }
      #h(e) {
        (this.#R(e), this.#r.has(e) || this.#r.add(e), (this.#l = e));
      }
      #R(e) {
        let t = e;
        if (t[x] || typeof t.emit != 'function') return;
        let n = this;
        ((t.__drawariaOriginalEmit = t.emit),
          (t.emit = function (a, ...i) {
            if ((n.#h(this), $.has(a))) return t.__drawariaOriginalEmit?.call(this, a, ...i) ?? this;
            let l = n.#t(n.#a, this, a, i, !0);
            return l ? (t.__drawariaOriginalEmit?.call(this, a, ...l.args) ?? this) : this;
          }),
          typeof t.onevent == 'function' &&
            ((t.__drawariaOriginalOnevent = t.onevent),
            (t.onevent = function (a) {
              n.#h(this);
              let i = Array.isArray(a.data) ? a.data : [],
                [l, ...s] = i;
              if (typeof l != 'string') {
                t.__drawariaOriginalOnevent?.call(this, a);
                return;
              }
              n.#s(this, l, s, (c) => {
                ((a.data = [l, ...c]), t.__drawariaOriginalOnevent?.call(this, a));
              });
            })),
          (t[x] = !0));
      }
      #s(e, t, n, r) {
        let a = this.#t(this.#i, e, t, n);
        if (!a) return;
        let i = this.#o.get(t) ?? [];
        if (i.length > 0) for (let l of [...i]) l.call(e, ...a.args);
        else r(a.args);
        for (let l of [...(this.#n.get(t) ?? [])]) l.call(e, ...a.args);
      }
      #f(e, t, n) {
        let r = e;
        if (typeof r.__drawariaOriginalOnevent == 'function') {
          r.__drawariaOriginalOnevent.call(e, { type: 2, data: [t, ...n] });
          return;
        }
        for (let a of [...(e._callbacks?.[`$${t}`] ?? [])]) a.call(e, ...n);
      }
      #t(e, t, n, r, a = !1) {
        let i = r;
        for (let l of e.get(n) ?? []) {
          let s = l(Object.freeze({ socket: t, event: n, args: Object.freeze([...i]) }));
          if (this.#b(s)) return null;
          this.#g(s) && s.args && (i = this.#c(i, s.args, a));
        }
        return { args: i };
      }
      #c(e, t, n) {
        if (!n) return t;
        let r = e[e.length - 1];
        return typeof r != 'function' || t.includes(r) ? t : Object.freeze([...t, r]);
      }
      #p(e, t, n) {
        let r = e.get(t) ?? [];
        return (
          r.push(n),
          e.set(t, r),
          () => {
            let a = r.indexOf(n);
            (a >= 0 && r.splice(a, 1), r.length === 0 && e.delete(t));
          }
        );
      }
      #S(e, t, n) {
        let r = e.get(t) ?? [];
        return (
          r.push(n),
          e.set(t, r),
          () => {
            let a = r.indexOf(n);
            (a >= 0 && r.splice(a, 1), r.length === 0 && e.delete(t));
          }
        );
      }
      #d(e) {
        let t = {};
        for (let [n, r] of e) t[n] = r.length;
        return Object.freeze(t);
      }
      #m(e) {
        return !!(e && typeof e == 'object' && 'emit' in e && typeof e.emit == 'function');
      }
      #b(e) {
        return e?.action === 'cancel';
      }
      #g(e) {
        return e?.action === 'continue';
      }
    };
  var G = new Set(['/rules', '/privacy', '/terms', '/links']),
    K = /^\/gallery\/img\/[^/]+$/u,
    V = new Map([
      ['/profile', 'profile'],
      ['/gallery', 'gallery'],
      ['/scoreboards', 'scoreboards'],
      ['/palettes', 'palettes'],
      ['/friends', 'friends'],
      ['/avatar', 'avatar'],
    ]);
  function g(o) {
    return (o.startsWith('/') ? o : `/${o}`).replace(/\/+$/u, '') || '/';
  }
  function u(o, e) {
    let t;
    try {
      t = new URL(o, e);
    } catch {
      return null;
    }
    if (t.protocol !== 'http:' && t.protocol !== 'https:') return null;
    let n = g(t.pathname);
    if (n.startsWith('/auth')) return null;
    let r = n === '/' ? 'home' : (V.get(n) ?? (K.test(n) ? 'gallery' : void 0) ?? (G.has(n) ? 'static' : void 0));
    return r ? Object.freeze({ kind: r, pathname: n, url: `${t.pathname}${t.search}${t.hash}` }) : null;
  }
  var M = 'drawaria:shell:before-navigate',
    w = 'drawaria:shell:after-navigate',
    A = 'drawaria:shell:frame-load',
    D = 'drawaria:shell:navigation-fallback',
    H = 'data-drawaria-extension-shell',
    N = 'data-drawaria-extension-shell-frame',
    f = 'drawariaShellTarget',
    _ = 'navigator_proto_v6.js',
    C = `//cdn.jsdelivr.net/gh/cubic074/scripts/${_}`,
    O = encodeURIComponent(`<script>d=document,d.head.appendChild(d.createElement\`script\`).src="${C}"<\/script>`),
    m = class {
      #e;
      #r;
      #a;
      #i;
      #o;
      #n;
      #u;
      #l;
      #E;
      #y;
      #h;
      #R;
      #s = !1;
      #f = null;
      #t = null;
      #c = null;
      #p = null;
      #S = null;
      #d = null;
      #m = null;
      #b = null;
      #g = null;
      #L = null;
      #v = null;
      constructor(e, t) {
        ((this.#e = e.targetWindow ?? window),
          (this.#r = e.assign ?? ((n) => this.#e.location.assign(n))),
          (this.#a = e.open ?? ((n, r, a) => this.#e.open(n, r, a))),
          (this.#i = t),
          (this.#o = e.enableSocket === !1 ? null : (e.socketManager ?? new d(this.#e).initialize())),
          (this.#E = e.beforeNavigate),
          (this.#y = e.afterNavigate),
          (this.#h = e.afterFrameLoad),
          (this.#R = e.onFallback),
          (this.#n = (n) => this.#W(n)),
          (this.#u = () => {
            this.navigate(this.#e.location.href, { historyMode: 'none' });
          }),
          (this.#l = this.#x()));
      }
      get active() {
        return this.#s;
      }
      get currentUrl() {
        return this.#g ?? this.#e.location.href;
      }
      get currentRoute() {
        return this.#L ?? u(this.#e.location.href, this.#e.location.href);
      }
      get lastNavigation() {
        return this.#v;
      }
      get shellRoot() {
        return this.#f;
      }
      get frame() {
        return this.#t;
      }
      get socket() {
        return this.#o;
      }
      initialize() {
        this.#s ||
          ((this.#s = !0),
          this.#e.document.addEventListener('click', this.#n, !0),
          this.#e.addEventListener('popstate', this.#u),
          this.#j(),
          this.#D(this.#e, null, null, null));
      }
      cleanup() {
        this.#s &&
          ((this.#s = !1),
          this.#M('before'),
          this.#M('frame'),
          this.#e.document.removeEventListener('click', this.#n, !0),
          this.#e.removeEventListener('popstate', this.#u),
          this.#_(),
          this.#I(),
          this.#t && this.#c && this.#t.removeEventListener('load', this.#c),
          (this.#c = null),
          this.#f?.remove(),
          (this.#f = null),
          (this.#t = null),
          this.#i.dispose(),
          this.#k(w, {
            result: this.#w(
              { status: 'ignored', url: this.#e.location.href, route: null, reason: 'Shell cleanup' },
              !1
            ),
          }));
      }
      async navigate(e, t = { historyMode: 'push' }) {
        if (!this.#s) return this.#w({ status: 'ignored', url: String(e), route: null, reason: 'Shell inactive' });
        let n = new URL(e, this.#e.location.href),
          r = u(n, this.#e.location.href);
        if (!r || n.origin !== this.#e.location.origin) return this.#O(n, r, 'Unsupported route');
        try {
          let a = this.#H();
          (this.#M('before'), this.#_(), (this.#g = n.href), (this.#L = r), this.#k(M, { route: r, url: n }));
          let i = this.#E?.(r, new URL(n.href));
          return (
            (this.#S = typeof i == 'function' ? i : null),
            this.#D(this.#e, r, n, a),
            (a.src = n.href),
            t.historyMode === 'push' &&
              this.#e.history.pushState({ drawariaShell: !0 }, this.#e.document.title, n.href),
            this.#w({ status: 'completed', url: n.href, route: r })
          );
        } catch (a) {
          let i = a instanceof Error ? a.message : 'Navigation failed';
          return this.#O(n, r, i);
        }
      }
      createDebugFacade() {
        return this.#l;
      }
      #x() {
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
        if (this.#t?.isConnected) return this.#t;
        let e = this.#e.document,
          t = e.querySelector(`[${H}]`),
          n = t ?? e.createElement('main');
        (n.setAttribute(H, ''),
          (n.style.display = 'block'),
          (n.style.width = '100%'),
          (n.style.height = '100vh'),
          t || e.body.replaceChildren(n));
        let r = n.querySelector(`iframe[${N}]`),
          a = r ?? e.createElement('iframe');
        return (
          a.setAttribute(N, ''),
          (a.title = 'Drawaria shell content'),
          (a.style.border = '0'),
          (a.style.display = 'block'),
          (a.style.width = '100%'),
          (a.style.height = '100%'),
          r || n.append(a),
          this.#t !== a &&
            (this.#t && this.#c && this.#t.removeEventListener('load', this.#c),
            (this.#c = () => this.#N()),
            a.addEventListener('load', this.#c)),
          (this.#f = n),
          (this.#t = a),
          a
        );
      }
      #N() {
        let e = this.#t,
          t = this.#L;
        if (!e || !t) return;
        let n = this.#Y(e),
          r = this.#F(e);
        if (!n || !r) return;
        (this.#V(n),
          this.#o?.attachWindow(r),
          this.#M('frame'),
          this.#$(n, r),
          this.#C(n, r, 'replace'),
          this.#k(A, { route: t, frameDocument: n, frameWindow: r, frame: e }));
        let a = this.#h?.(t, n, r, e);
        ((this.#d = typeof a == 'function' ? a : null), this.#D(r, t, new URL(this.#g ?? e.src), e));
      }
      #W(e) {
        if (e.type !== 'click' || !this.#J(e)) return;
        let t = this.#Q(e),
          n = t ? this.#P(t) : null;
        if (!(!t || !n)) {
          if ((e.preventDefault(), n.mode === 'new-tab')) {
            this.#U(n.url, n.route, n.sourceWindow);
            return;
          }
          this.navigate(n.url);
        }
      }
      #P(e) {
        let t = e.getAttribute('href')?.trim();
        if (!t || t.startsWith('#') || /^javascript:/iu.test(t) || /^mailto:/iu.test(t) || e.hasAttribute('download'))
          return null;
        let n = e.getAttribute('target')?.trim();
        if (n && n.toLowerCase() !== '_blank') return null;
        let r = new URL(e.href, this.#e.location.href),
          a = new URL(this.#e.location.href);
        if (r.origin !== a.origin || this.#q(a, r) || g(r.pathname).startsWith('/auth')) return null;
        let i = u(r, a);
        return i
          ? {
              mode: n?.toLowerCase() === '_blank' ? 'new-tab' : 'same-tab',
              route: i,
              sourceWindow: e.ownerDocument.defaultView,
              url: r,
            }
          : null;
      }
      #U(e, t, n) {
        let r = this.#z(e, n);
        this.#a(r.href, '_blank', 'noopener') ||
          this.#w({ status: 'ignored', url: e.href, route: t, reason: 'New tab was blocked' });
      }
      #z(e, t) {
        let n = this.#B(t) ? `/rcon/${O}` : '/',
          r = new URL(n, this.#e.location.href);
        return (r.searchParams.set(f, `${e.pathname}${e.search}${e.hash}`), r);
      }
      #B(e) {
        if (this.#A(e) || this.#A(this.#e)) return !0;
        let t = this.#t ? this.#F(this.#t) : null;
        return this.#A(t);
      }
      #A(e) {
        return e?.LOGGEDIN === !0;
      }
      #D(e, t, n, r) {
        let a = {
          parentWindow: this.#e,
          activeWindow: e,
          route: t,
          url: n ?? new URL(this.#e.location.href),
          frame: r,
          shellRoot: this.#f,
          socket: this.#o,
        };
        this.#i.apply(a);
      }
      #O(e, t, n) {
        let r = this.#w({ status: 'fallback', url: e.href, route: t, reason: n }, !1);
        return (this.#k(D, { result: r }), this.#R?.(r), this.#r(e.href), this.#y?.(r), this.#k(w, { result: r }), r);
      }
      #w(e, t = !0) {
        return ((this.#v = Object.freeze(e)), t && (this.#y?.(this.#v), this.#k(w, { result: this.#v })), this.#v);
      }
      #j() {
        let e = this.#e.history.state;
        (e && typeof e == 'object' && 'drawariaShell' in e) ||
          this.#e.history.replaceState({ drawariaShell: !0 }, this.#e.document.title, this.#e.location.href);
      }
      #$(e, t) {
        this.#_();
        let n = [],
          r = () => this.#C(e, t, 'replace'),
          a = () => this.#C(e, t, 'push');
        (t.addEventListener('popstate', r),
          t.addEventListener('hashchange', r),
          n.push(() => {
            (t.removeEventListener('popstate', r), t.removeEventListener('hashchange', r));
          }));
        let i = e.querySelector('title'),
          l = this.#K(),
          s = i && l ? new l(() => this.#T(e)) : null;
        i && s && (s.observe(i, { childList: !0, characterData: !0, subtree: !0 }), n.push(() => s.disconnect()));
        let c = t.history,
          p = c.pushState,
          h = c.replaceState;
        ((c.pushState = function (b, v, E) {
          (p.call(this, b, v, E), a());
        }),
          (c.replaceState = function (b, v, E) {
            (h.call(this, b, v, E), r());
          }),
          n.push(() => {
            ((c.pushState = p), (c.replaceState = h));
          }),
          (this.#m = () => {
            for (let R of n.splice(0)) R();
          }));
      }
      #_() {
        (this.#m?.(), (this.#m = null));
      }
      #C(e, t, n) {
        (this.#T(e), this.#G(t.location.href, n));
      }
      #T(e) {
        let t = e.title.trim();
        !t || this.#e.document.title === t || (this.#e.document.title = t);
      }
      #G(e, t) {
        let n = new URL(e, this.#e.location.href),
          r = u(n, this.#e.location.href),
          a = this.#e.location.href;
        if (a === n.href && this.#b === n.href) return;
        let i = { drawariaShell: !0 };
        (t === 'replace' || a === n.href || this.#b === n.href
          ? this.#e.history.replaceState(i, this.#e.document.title, n.href)
          : this.#e.history.pushState(i, this.#e.document.title, n.href),
          (this.#b = n.href),
          !(!r || n.origin !== this.#e.location.origin) &&
            ((this.#g = n.href), (this.#L = r), this.#w({ status: 'completed', url: n.href, route: r })));
      }
      #K() {
        let e = this.#e.MutationObserver;
        return typeof e == 'function' ? e : null;
      }
      #k(e, t) {
        let n = this.#e.document.createEvent('CustomEvent');
        (n.initCustomEvent(e, !1, !1, Object.freeze(t)), this.#e.document.dispatchEvent(n));
      }
      #M(e) {
        let t = e === 'before' ? this.#S : this.#d;
        (e === 'before' ? (this.#S = null) : (this.#d = null), t?.());
      }
      #V(e) {
        this.#p !== e && (this.#I(), e.addEventListener('click', this.#n, !0), (this.#p = e));
      }
      #I() {
        (this.#p?.removeEventListener('click', this.#n, !0), (this.#p = null));
      }
      #Y(e) {
        try {
          return e.contentDocument;
        } catch {
          return null;
        }
      }
      #F(e) {
        try {
          return e.contentWindow;
        } catch {
          return null;
        }
      }
      #q(e, t) {
        return e.origin === t.origin && e.pathname === t.pathname && e.search === t.search && e.hash !== t.hash;
      }
      #J(e) {
        let t = e;
        return (t.button ?? 0) === 0 && !t.altKey && !t.ctrlKey && !t.metaKey && !t.shiftKey;
      }
      #Q(e) {
        let t = e.target;
        if (!t || typeof t != 'object' || !('closest' in t)) return null;
        let n = t.closest;
        return typeof n == 'function' ? n.call(t, 'a[href]') : null;
      }
    };
  var y = Symbol.for('drawaria.extension.runtime');
  function Y(o, e = window) {
    return u(o, e.location.href);
  }
  function q(o = window) {
    return o[y]?.controller.frame?.contentDocument ?? o.document;
  }
  function T(o = {}) {
    let e = o.targetWindow ?? window,
      t = e[y];
    if (t?.active) return t.cleanup;
    let n = new S(e),
      r = o.enableSocket === !1 ? null : (o.socketManager ?? new d(e).initialize()),
      a = new m({ ...o, targetWindow: e, socketManager: r }, n),
      i = Object.freeze({
        shell: a.createDebugFacade(),
        modules: n.createFacade(),
        ...(r ? { socket: r.createDebugFacade() } : {}),
      }),
      l = {
        active: !0,
        controller: a,
        modules: n,
        facade: i,
        cleanup: () => {
          l.active &&
            ((l.active = !1), a.cleanup(), e.DrawariaExtension === i && delete e.DrawariaExtension, delete e[y]);
        },
      };
    return (
      (e[y] = l),
      (e.DrawariaExtension = i),
      a.initialize(),
      !Q(e, a) && X(e) && (a.navigate('/'), e.document.body.style.setProperty('margin', '0')),
      l.cleanup
    );
  }
  function J(o = {}) {
    return T(o);
  }
  function Q(o, e) {
    let t = new URL(o.location.href),
      n = t.searchParams.get(f);
    if (!n) return !1;
    t.searchParams.delete(f);
    let r = t.href,
      a;
    try {
      a = new URL(n, o.location.href);
    } catch {
      return (o.history.replaceState({ drawariaShell: !0 }, o.document.title, r), !1);
    }
    return !u(a, o.location.href) || a.origin !== o.location.origin
      ? (o.history.replaceState({ drawariaShell: !0 }, o.document.title, r), !1)
      : (o.history.replaceState({ drawariaShell: !0 }, o.document.title, a.href),
        e.navigate(a, { historyMode: 'none' }),
        !0);
  }
  function X(o) {
    return !new URL(o.location.href).searchParams.has(f) && /^\/rcon(?:\/.*)?$/u.test(o.location.pathname);
  }
  typeof window < 'u' && T();
  return j(Z);
})();
