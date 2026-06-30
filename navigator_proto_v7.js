'use strict';
var DrawariaExtensionBundle = (() => {
  var A = Object.defineProperty;
  var P = Object.getOwnPropertyDescriptor;
  var z = Object.getOwnPropertyNames;
  var B = Object.prototype.hasOwnProperty;
  var j = (o, e) => {
      for (var t in e) A(o, t, { get: e[t], enumerable: !0 });
    },
    $ = (o, e, t, n) => {
      if ((e && typeof e == 'object') || typeof e == 'function')
        for (let r of z(e))
          !B.call(o, r) && r !== t && A(o, r, { get: () => e[r], enumerable: !(n = P(e, r)) || n.enumerable });
      return o;
    };
  var G = (o) => $(A({}, '__esModule', { value: !0 }), o);
  var te = {};
  j(te, {
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_NAME: () => C,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_PATH_SEGMENT: () => T,
    DRAWARIA_RCON_BOOTSTRAP_SCRIPT_URL: () => O,
    DRAWARIA_SHELL_AFTER_NAVIGATE_EVENT: () => k,
    DRAWARIA_SHELL_BEFORE_NAVIGATE_EVENT: () => D,
    DRAWARIA_SHELL_FRAME_LOAD_EVENT: () => M,
    DRAWARIA_SHELL_NAVIGATION_FALLBACK_EVENT: () => _,
    DRAWARIA_SHELL_TARGET_PARAMETER: () => f,
    DrawariaAccountTracker: () => m,
    DrawariaShellController: () => g,
    ShellModuleLoader: () => S,
    SocketManager: () => d,
    getActiveDrawariaDocument: () => Q,
    initializeDrawariaExtension: () => I,
    initializeDrawariaShell: () => X,
    matchDrawariaShellRoute: () => J,
    matchShellRoute: () => u,
    normalizeShellPathname: () => w,
  });
  var F = /^[a-z0-9~-]{36}$/u,
    m = class {
      #e;
      #t;
      #n = null;
      constructor(e) {
        ((this.#e = e), (this.#t = this.#o()));
      }
      get uid() {
        return this.#n;
      }
      refresh() {
        return this.scan(this.#e);
      }
      scan(e) {
        if (!e) return this.#n;
        let t = this.#r(e);
        if (t) return this.#i(t);
        let n = this.#l(e.document);
        return n ? this.#i(n) : this.#n;
      }
      createFacade() {
        return this.#t;
      }
      #o() {
        let e = this;
        return Object.freeze({
          get uid() {
            return e.uid;
          },
          refresh: () => e.refresh(),
        });
      }
      #i(e) {
        return ((this.#n = e), e);
      }
      #r(e) {
        let t = e.ACCOUNTUID;
        return typeof t == 'string' && F.test(t) ? t : null;
      }
      #l(e) {
        let t = e.querySelectorAll('a[href^="/gallery/?uid"]');
        for (let n of t) {
          let r = this.#s(n.getAttribute('href'));
          if (r) return r;
        }
        return null;
      }
      #s(e) {
        if (!e) return null;
        try {
          let t = new URL(e, this.#e.location.href).searchParams.get('uid');
          return t && F.test(t) ? t : null;
        } catch {
          return null;
        }
      }
    };
  var y = class {
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
    #t = new Map();
    #n = null;
    constructor(e) {
      this.#e = e;
    }
    register(e) {
      (this.#s(e), this.unregister(e.id));
      let t = { module: e, mounted: null, error: null };
      return (this.#t.set(e.id, t), this.#n && this.#o(t, this.#n), () => this.unregister(e.id));
    }
    unregister(e) {
      let t = this.#t.get(e);
      return t ? (this.#r(t), this.#t.delete(e)) : !1;
    }
    apply(e) {
      this.#n = e;
      for (let t of this.#t.values()) this.#o(t, e);
    }
    dispose() {
      for (let e of this.#t.values()) this.#r(e);
      this.#n = null;
    }
    statuses() {
      return Object.freeze(
        [...this.#t.values()].map((e) =>
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
    #o(e, t) {
      if (!this.#l(e.module, t.route)) {
        this.#r(e);
        return;
      }
      let n = this.#i(t, e);
      try {
        if (e.mounted?.routePathname === t.route?.pathname && e.module.refresh) {
          (e.module.refresh(n), (e.error = null));
          return;
        }
        this.#r(e);
        let r = new y();
        e.mounted = { stack: r, routePathname: t.route?.pathname ?? null };
        let a = e.module.mount(this.#i(t, e));
        (typeof a == 'function' && r.add(a), (e.error = null));
      } catch (r) {
        ((e.error = r instanceof Error ? r.message : String(r)), this.#r(e));
      }
    }
    #i(e, t) {
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
        accountUid: e.accountUid,
        onCleanup(a) {
          if (!r) throw new Error('Cleanup can only be registered while a module is mounted.');
          return r.add(a);
        },
      });
    }
    #r(e) {
      let t = e.mounted;
      ((e.mounted = null), t?.stack.dispose());
    }
    #l(e, t) {
      return e.route ? e.route(t) : !0;
    }
    #s(e) {
      if (!e.id.trim()) throw new TypeError('Shell module id must be a non-empty string.');
      if (typeof e.mount != 'function') throw new TypeError(`Shell module "${e.id}" must provide mount().`);
      if (e.route && typeof e.route != 'function')
        throw new TypeError(`Shell module "${e.id}" route must be a function.`);
      if (e.refresh && typeof e.refresh != 'function')
        throw new TypeError(`Shell module "${e.id}" refresh must be a function.`);
    }
  };
  var x = Symbol.for('drawaria.extension.socketManager'),
    U = Symbol.for('drawaria.extension.patchedIo'),
    H = Symbol.for('drawaria.extension.patchedSocket'),
    K = new Set(['connect', 'disconnect', 'error']),
    d = class {
      #e;
      #t = new Set();
      #n = new Map();
      #o = new Map();
      #i = new Map();
      #r = new Map();
      #l = !1;
      #s = null;
      constructor(e) {
        this.#e = e;
      }
      get sockets() {
        return Object.freeze([...this.#t]);
      }
      get primarySocket() {
        return this.#s;
      }
      initialize() {
        return (this.#l || ((this.#l = !0), (this.#e[x] = this)), this.attachWindow(this.#e), this);
      }
      attachWindow(e) {
        return ((e[x] = this), this.#v(e), this.#E(e), this);
      }
      refresh() {
        return (this.attachWindow(this.#e), this);
      }
      interceptEmit(e, t) {
        return this.#c(this.#n, e, t);
      }
      interceptIncoming(e, t) {
        return this.#c(this.#o, e, t);
      }
      replaceIncoming(e, t) {
        return this.#p(this.#i, e, t);
      }
      on(e, t) {
        return this.#p(this.#r, e, t);
      }
      trigger(e, ...t) {
        let n = this.#s;
        return n ? (this.#k(n, e, t, (r) => this.#h(n, e, r)), !0) : !1;
      }
      createDebugFacade() {
        let e = this;
        return Object.freeze({
          get sockets() {
            return Object.freeze([...e.#t]);
          },
          get primarySocket() {
            return e.#s;
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
          incoming: this.#f(this.#o),
          outgoing: this.#f(this.#n),
          replacements: this.#f(this.#i),
          listeners: this.#f(this.#r),
        });
      }
      #v(e) {
        let t = e.io;
        if (typeof t != 'function') return;
        let n = t;
        if (!n[U]) {
          let i = n.__drawariaOriginalIo ?? n,
            s = this,
            l = function (...p) {
              let h = Reflect.apply(i, this, p);
              return (s.#u(h), h);
            };
          if ((Object.assign(l, n), (l.__drawariaOriginalIo = i), (l[U] = !0), typeof n.connect == 'function')) {
            let c = n.connect;
            ((l.__drawariaOriginalConnect = c),
              (l.connect = (...p) => {
                let h = c(...p);
                return (s.#u(h), h);
              }));
          } else l.connect = l;
          e.io = l;
        }
        let a = e.io.Socket?.prototype;
        this.#m(a) && this.#w(a);
      }
      #E(e) {
        let t = e.io;
        if (typeof t != 'function') return;
        let n = t.managers;
        if (n) for (let r of Object.values(n)) for (let a of Object.values(r.nsps ?? {})) this.#m(a) && this.#u(a);
      }
      #u(e) {
        (this.#w(e), this.#t.has(e) || this.#t.add(e), (this.#s = e));
      }
      #w(e) {
        let t = e;
        if (t[H] || typeof t.emit != 'function') return;
        let n = this;
        ((t.__drawariaOriginalEmit = t.emit),
          (t.emit = function (a, ...i) {
            if ((n.#u(this), K.has(a))) return t.__drawariaOriginalEmit?.call(this, a, ...i) ?? this;
            let s = n.#d(n.#n, this, a, i, !0);
            return s ? (t.__drawariaOriginalEmit?.call(this, a, ...s.args) ?? this) : this;
          }),
          typeof t.onevent == 'function' &&
            ((t.__drawariaOriginalOnevent = t.onevent),
            (t.onevent = function (a) {
              n.#u(this);
              let i = Array.isArray(a.data) ? a.data : [],
                [s, ...l] = i;
              if (typeof s != 'string') {
                t.__drawariaOriginalOnevent?.call(this, a);
                return;
              }
              n.#k(this, s, l, (c) => {
                ((a.data = [s, ...c]), t.__drawariaOriginalOnevent?.call(this, a));
              });
            })),
          (t[H] = !0));
      }
      #k(e, t, n, r) {
        let a = this.#d(this.#o, e, t, n);
        if (!a) return;
        let i = this.#i.get(t) ?? [];
        if (i.length > 0) for (let s of [...i]) s.call(e, ...a.args);
        else r(a.args);
        for (let s of [...(this.#r.get(t) ?? [])]) s.call(e, ...a.args);
      }
      #h(e, t, n) {
        let r = e;
        if (typeof r.__drawariaOriginalOnevent == 'function') {
          r.__drawariaOriginalOnevent.call(e, { type: 2, data: [t, ...n] });
          return;
        }
        for (let a of [...(e._callbacks?.[`$${t}`] ?? [])]) a.call(e, ...n);
      }
      #d(e, t, n, r, a = !1) {
        let i = r;
        for (let s of e.get(n) ?? []) {
          let l = s(Object.freeze({ socket: t, event: n, args: Object.freeze([...i]) }));
          if (this.#y(l)) return null;
          this.#R(l) && l.args && (i = this.#a(i, l.args, a));
        }
        return { args: i };
      }
      #a(e, t, n) {
        if (!n) return t;
        let r = e[e.length - 1];
        return typeof r != 'function' || t.includes(r) ? t : Object.freeze([...t, r]);
      }
      #c(e, t, n) {
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
      #f(e) {
        let t = {};
        for (let [n, r] of e) t[n] = r.length;
        return Object.freeze(t);
      }
      #m(e) {
        return !!(e && typeof e == 'object' && 'emit' in e && typeof e.emit == 'function');
      }
      #y(e) {
        return e?.action === 'cancel';
      }
      #R(e) {
        return e?.action === 'continue';
      }
    };
  var V = new Set(['/rules', '/privacy', '/terms', '/links']),
    Y = /^\/gallery\/img\/[^/]+$/u,
    q = new Map([
      ['/profile', 'profile'],
      ['/gallery', 'gallery'],
      ['/scoreboards', 'scoreboards'],
      ['/palettes', 'palettes'],
      ['/friends', 'friends'],
      ['/avatar', 'avatar'],
    ]);
  function w(o) {
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
    let n = w(t.pathname);
    if (n.startsWith('/auth')) return null;
    let r = n === '/' ? 'home' : (q.get(n) ?? (Y.test(n) ? 'gallery' : void 0) ?? (V.has(n) ? 'static' : void 0));
    return r ? Object.freeze({ kind: r, pathname: n, url: `${t.pathname}${t.search}${t.hash}` }) : null;
  }
  var D = 'drawaria:shell:before-navigate',
    k = 'drawaria:shell:after-navigate',
    M = 'drawaria:shell:frame-load',
    _ = 'drawaria:shell:navigation-fallback',
    N = 'data-drawaria-extension-shell',
    W = 'data-drawaria-extension-shell-frame',
    f = 'drawariaShellTarget',
    C = 'navigator_proto_v7.js',
    O = `//cdn.jsdelivr.net/gh/cubic074/scripts/${C}`,
    T = encodeURIComponent(`<script>d=document,d.head.appendChild(d.createElement\`script\`).src="${O}"<\/script>`),
    g = class {
      #e;
      #t;
      #n;
      #o;
      #i;
      #r;
      #l;
      #s;
      #v;
      #E;
      #u;
      #w;
      #k;
      #h = !1;
      #d = null;
      #a = null;
      #c = null;
      #p = null;
      #f = null;
      #m = null;
      #y = null;
      #R = null;
      #L = null;
      #A = null;
      #b = null;
      constructor(e, t, n = null) {
        ((this.#e = e.targetWindow ?? window),
          (this.#t = e.assign ?? ((r) => this.#e.location.assign(r))),
          (this.#n = e.open ?? ((r, a, i) => this.#e.open(r, a, i))),
          (this.#o = n),
          (this.#i = t),
          (this.#r = e.enableSocket === !1 ? null : (e.socketManager ?? new d(this.#e).initialize())),
          (this.#E = e.beforeNavigate),
          (this.#u = e.afterNavigate),
          (this.#w = e.afterFrameLoad),
          (this.#k = e.onFallback),
          (this.#l = (r) => this.#W(r)),
          (this.#s = () => {
            this.navigate(this.#e.location.href, { historyMode: 'none' });
          }),
          (this.#v = this.#U()));
      }
      get active() {
        return this.#h;
      }
      get currentUrl() {
        return this.#L ?? this.#e.location.href;
      }
      get currentRoute() {
        return this.#A ?? u(this.#e.location.href, this.#e.location.href);
      }
      get lastNavigation() {
        return this.#b;
      }
      get shellRoot() {
        return this.#d;
      }
      get frame() {
        return this.#a;
      }
      get socket() {
        return this.#r;
      }
      initialize() {
        this.#h ||
          ((this.#h = !0),
          this.#e.document.addEventListener('click', this.#l, !0),
          this.#e.addEventListener('popstate', this.#s),
          this.#$(),
          this.#o?.scan(this.#e),
          this.#_(this.#e, null, null, null));
      }
      cleanup() {
        this.#h &&
          ((this.#h = !1),
          this.#D('before'),
          this.#D('frame'),
          this.#e.document.removeEventListener('click', this.#l, !0),
          this.#e.removeEventListener('popstate', this.#s),
          this.#C(),
          this.#F(),
          this.#a && this.#c && this.#a.removeEventListener('load', this.#c),
          (this.#c = null),
          this.#d?.remove(),
          (this.#d = null),
          (this.#a = null),
          this.#i.dispose(),
          this.#g(k, {
            result: this.#S(
              { status: 'ignored', url: this.#e.location.href, route: null, reason: 'Shell cleanup' },
              !1
            ),
          }));
      }
      async navigate(e, t = { historyMode: 'push' }) {
        if (!this.#h) return this.#S({ status: 'ignored', url: String(e), route: null, reason: 'Shell inactive' });
        let n = new URL(e, this.#e.location.href),
          r = u(n, this.#e.location.href);
        if (!r || n.origin !== this.#e.location.origin) return this.#T(n, r, 'Unsupported route');
        try {
          this.#o?.scan(this.#e);
          let a = this.#H();
          (this.#D('before'), this.#C(), (this.#L = n.href), (this.#A = r), this.#g(D, { route: r, url: n }));
          let i = this.#E?.(r, new URL(n.href));
          return (
            (this.#f = typeof i == 'function' ? i : null),
            this.#_(this.#e, r, n, a),
            (a.src = n.href),
            t.historyMode === 'push' &&
              this.#e.history.pushState({ drawariaShell: !0 }, this.#e.document.title, n.href),
            this.#S({ status: 'completed', url: n.href, route: r })
          );
        } catch (a) {
          let i = a instanceof Error ? a.message : 'Navigation failed';
          return this.#T(n, r, i);
        }
      }
      createDebugFacade() {
        return this.#v;
      }
      #U() {
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
        if (this.#a?.isConnected) return this.#a;
        let e = this.#e.document,
          t = e.querySelector(`[${N}]`),
          n = t ?? e.createElement('main');
        (n.setAttribute(N, ''),
          (n.style.display = 'block'),
          (n.style.width = '100%'),
          (n.style.height = '100vh'),
          t || e.body.replaceChildren(n));
        let r = n.querySelector(`iframe[${W}]`),
          a = r ?? e.createElement('iframe');
        return (
          a.setAttribute(W, ''),
          (a.title = 'Drawaria shell content'),
          (a.style.border = '0'),
          (a.style.display = 'block'),
          (a.style.width = '100%'),
          (a.style.height = '100%'),
          r || n.append(a),
          this.#a !== a &&
            (this.#a && this.#c && this.#a.removeEventListener('load', this.#c),
            (this.#c = () => this.#N()),
            a.addEventListener('load', this.#c)),
          (this.#d = n),
          (this.#a = a),
          a
        );
      }
      #N() {
        let e = this.#a,
          t = this.#A;
        if (!e || !t) return;
        let n = this.#q(e),
          r = this.#x(e);
        if (!n || !r) return;
        (this.#Y(n),
          this.#r?.attachWindow(r),
          this.#D('frame'),
          this.#G(n, r),
          this.#O(n, r, 'replace'),
          this.#o?.scan(r),
          this.#g(M, { route: t, frameDocument: n, frameWindow: r, frame: e }));
        let a = this.#w?.(t, n, r, e);
        ((this.#m = typeof a == 'function' ? a : null), this.#_(r, t, new URL(this.#L ?? e.src), e));
      }
      #W(e) {
        if (e.type !== 'click' || !this.#Q(e)) return;
        let t = this.#X(e),
          n = t ? this.#P(t) : null;
        if (!(!t || !n)) {
          if ((e.preventDefault(), n.mode === 'new-tab')) {
            this.#z(n.url, n.route, n.sourceWindow);
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
        if (r.origin !== a.origin || this.#J(a, r) || w(r.pathname).startsWith('/auth')) return null;
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
      #z(e, t, n) {
        let r = this.#B(e, n);
        this.#n(r.href, '_blank', 'noopener') ||
          this.#S({ status: 'ignored', url: e.href, route: t, reason: 'New tab was blocked' });
      }
      #B(e, t) {
        let n = this.#j(t) ? `/rcon/${T}` : '/',
          r = new URL(n, this.#e.location.href);
        return (r.searchParams.set(f, `${e.pathname}${e.search}${e.hash}`), r);
      }
      #j(e) {
        if (this.#M(e) || this.#M(this.#e)) return !0;
        let t = this.#a ? this.#x(this.#a) : null;
        return this.#M(t);
      }
      #M(e) {
        return e?.LOGGEDIN === !0;
      }
      #_(e, t, n, r) {
        let a = {
          parentWindow: this.#e,
          activeWindow: e,
          route: t,
          url: n ?? new URL(this.#e.location.href),
          frame: r,
          shellRoot: this.#d,
          socket: this.#r,
          accountUid: this.#o?.uid ?? null,
        };
        this.#i.apply(a);
      }
      #T(e, t, n) {
        let r = this.#S({ status: 'fallback', url: e.href, route: t, reason: n }, !1);
        return (this.#g(_, { result: r }), this.#k?.(r), this.#t(e.href), this.#u?.(r), this.#g(k, { result: r }), r);
      }
      #S(e, t = !0) {
        return ((this.#b = Object.freeze(e)), t && (this.#u?.(this.#b), this.#g(k, { result: this.#b })), this.#b);
      }
      #$() {
        let e = this.#e.history.state;
        (e && typeof e == 'object' && 'drawariaShell' in e) ||
          this.#e.history.replaceState({ drawariaShell: !0 }, this.#e.document.title, this.#e.location.href);
      }
      #G(e, t) {
        this.#C();
        let n = [],
          r = () => this.#O(e, t, 'replace'),
          a = () => this.#O(e, t, 'push');
        (t.addEventListener('popstate', r),
          t.addEventListener('hashchange', r),
          n.push(() => {
            (t.removeEventListener('popstate', r), t.removeEventListener('hashchange', r));
          }));
        let i = e.querySelector('title'),
          s = this.#V(),
          l = i && s ? new s(() => this.#I(e)) : null;
        i && l && (l.observe(i, { childList: !0, characterData: !0, subtree: !0 }), n.push(() => l.disconnect()));
        let c = t.history,
          p = c.pushState,
          h = c.replaceState;
        ((c.pushState = function (v, E, L) {
          (p.call(this, v, E, L), a());
        }),
          (c.replaceState = function (v, E, L) {
            (h.call(this, v, E, L), r());
          }),
          n.push(() => {
            ((c.pushState = p), (c.replaceState = h));
          }),
          (this.#y = () => {
            for (let b of n.splice(0)) b();
          }));
      }
      #C() {
        (this.#y?.(), (this.#y = null));
      }
      #O(e, t, n) {
        (this.#I(e), this.#K(t.location.href, n));
      }
      #I(e) {
        let t = e.title.trim();
        !t || this.#e.document.title === t || (this.#e.document.title = t);
      }
      #K(e, t) {
        let n = new URL(e, this.#e.location.href),
          r = u(n, this.#e.location.href),
          a = this.#e.location.href;
        if (a === n.href && this.#R === n.href) return;
        let i = { drawariaShell: !0 };
        (t === 'replace' || a === n.href || this.#R === n.href
          ? this.#e.history.replaceState(i, this.#e.document.title, n.href)
          : this.#e.history.pushState(i, this.#e.document.title, n.href),
          (this.#R = n.href),
          !(!r || n.origin !== this.#e.location.origin) &&
            ((this.#L = n.href), (this.#A = r), this.#S({ status: 'completed', url: n.href, route: r })));
      }
      #V() {
        let e = this.#e.MutationObserver;
        return typeof e == 'function' ? e : null;
      }
      #g(e, t) {
        let n = this.#e.document.createEvent('CustomEvent');
        (n.initCustomEvent(e, !1, !1, Object.freeze(t)), this.#e.document.dispatchEvent(n));
      }
      #D(e) {
        let t = e === 'before' ? this.#f : this.#m;
        (e === 'before' ? (this.#f = null) : (this.#m = null), t?.());
      }
      #Y(e) {
        this.#p !== e && (this.#F(), e.addEventListener('click', this.#l, !0), (this.#p = e));
      }
      #F() {
        (this.#p?.removeEventListener('click', this.#l, !0), (this.#p = null));
      }
      #q(e) {
        try {
          return e.contentDocument;
        } catch {
          return null;
        }
      }
      #x(e) {
        try {
          return e.contentWindow;
        } catch {
          return null;
        }
      }
      #J(e, t) {
        return e.origin === t.origin && e.pathname === t.pathname && e.search === t.search && e.hash !== t.hash;
      }
      #Q(e) {
        let t = e;
        return (t.button ?? 0) === 0 && !t.altKey && !t.ctrlKey && !t.metaKey && !t.shiftKey;
      }
      #X(e) {
        let t = e.target;
        if (!t || typeof t != 'object' || !('closest' in t)) return null;
        let n = t.closest;
        return typeof n == 'function' ? n.call(t, 'a[href]') : null;
      }
    };
  var R = Symbol.for('drawaria.extension.runtime');
  function J(o, e = window) {
    return u(o, e.location.href);
  }
  function Q(o = window) {
    return o[R]?.controller.frame?.contentDocument ?? o.document;
  }
  function I(o = {}) {
    let e = o.targetWindow ?? window,
      t = e[R];
    if ((e.document.body.style.setProperty('margin', '0'), t?.active)) return t.cleanup;
    let n = new m(e),
      r = new S(e),
      a = o.enableSocket === !1 ? null : (o.socketManager ?? new d(e).initialize()),
      i = new g({ ...o, targetWindow: e, socketManager: a }, r, n),
      s = Object.freeze({
        account: n.createFacade(),
        shell: i.createDebugFacade(),
        modules: r.createFacade(),
        ...(a ? { socket: a.createDebugFacade() } : {}),
      }),
      l = {
        active: !0,
        controller: i,
        modules: r,
        facade: s,
        cleanup: () => {
          l.active &&
            ((l.active = !1), i.cleanup(), e.DrawariaExtension === s && delete e.DrawariaExtension, delete e[R]);
        },
      };
    return ((e[R] = l), (e.DrawariaExtension = s), i.initialize(), !Z(e, i) && ee(e) && i.navigate('/'), l.cleanup);
  }
  function X(o = {}) {
    return I(o);
  }
  function Z(o, e) {
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
  function ee(o) {
    return !new URL(o.location.href).searchParams.has(f) && /^\/rcon(?:\/.*)?$/u.test(o.location.pathname);
  }
  typeof window < 'u' && I();
  return G(te);
})();
