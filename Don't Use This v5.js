//Don't remember what I changed, forgot I made another iteration. Still very useless.

javascript: var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return % 20 a;
    a[b] = c.value;
    return % 20 a
};
$jscomp.getGlobal = function(a) {
    a = [ % 22 object % 22 == typeof % 20 globalThis && globalThis, a, % 22 object % 22 == typeof % 20 window && window, % 22 object % 22 == typeof % 20 self && self, % 22 object % 22 == typeof % 20 global && global];
    for (var % 20 b = 0; b % 3 Ca.length; ++b) {
        var % 20 c = a[b];
        if (c && c.Math == Math) return % 20 c
    }
    throw % 20 Error( % 22 Cannot % 20 find % 20 global % 20 object % 22);
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = % 22
function % 22 === typeof % 20 Symbol && % 22 symbol % 22 === typeof % 20 Symbol( % 22 x % 22);
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = % 22 $jscp$ % 22;
var % 20 $jscomp$lookupPolyfilledValue = function(a, b) {
    var % 20 c = $jscomp.propertyToPolyfillSymbol[b];
    if (null == c) return % 20 a[b];
    c = a[c];
    return % 20 void % 200 !== c ? c : a[b]
};
$jscomp.polyfill = function(a, b, c, d) {
    b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d))
};
$jscomp.polyfillUnisolated = function(a, b, c, d) {
    c = $jscomp.global;
    a = a.split( % 22. % 22);
    for (d = 0; d % 3 Ca.length - 1; d++) {
        var % 20 e = a[d];
        if (!(e % 20 in % 20 c)) return;
        c = c[e]
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: b
    })
};
$jscomp.polyfillIsolated = function(a, b, c, d) {
    var % 20 e = a.split( % 22. % 22);
    a = 1 === e.length;
    d = e[0];
    d = !a && d % 20 in % 20 $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var % 20 f = 0; f % 3 Ce.length - 1; f++) {
        var % 20 g = e[f];
        if (!(g % 20 in % 20 d)) return;
        d = d[g]
    }
    e = e[e.length - 1];
    c = $jscomp.IS_SYMBOL_NATIVE && % 22 es6 % 22 === c ? d[e] : null;
    b = b(c);
    null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {
        configurable: !0,
        writable: !0,
        value: b
    }) : b !== c && (void % 200 === $jscomp.propertyToPolyfillSymbol[e] && (c = 1E9 * Math.random() % 3 E % 3 E % 3E0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + c + % 22 $ % 22 + e), $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[e], {
        configurable: !0,
        writable: !0,
        value: b
    })))
};
$jscomp.underscoreProtoCanBeSet = function() {
    var % 20 a = {
        a: !0
    }, b = {};
    try {
        return % 20 b.__proto__ = a, b.a
    } catch (c) {}
    return !1
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && % 22
function % 22 == typeof % 20 Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw % 20n ew % 20 TypeError(a + % 22 % 20 is % 20n ot % 20 extensible % 22);
    return % 20 a
} : null;
$jscomp.arrayIteratorImpl = function(a) {
    var % 20 b = 0;
    return % 20
    function() {
        return % 20 b % 3 Ca.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
};
$jscomp.makeIterator = function(a) {
    var % 20 b = % 22 undefined % 22 != typeof % 20 Symbol && Symbol.iterator && a[Symbol.iterator];
    return % 20 b ? b.call(a) : $jscomp.arrayIterator(a)
};
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(a) {
    if (!(a % 20 instanceof % 20 Object)) throw % 20n ew % 20 TypeError( % 22 Iterator % 20 result % 20 % 22 + a + % 22 % 20 is % 20n ot % 20 an % 20 object % 22);
};
$jscomp.generator.Context = function() {
    this.isRunning_ = !1;
    this.yieldAllIterator_ = null;
    this.yieldResult = void % 200;
    this.nextAddress = 1;
    this.finallyAddress_ = this.catchAddress_ = 0;
    this.finallyContexts_ = this.abruptCompletion_ = null
};
$jscomp.generator.Context.prototype.start_ = function() {
    if (this.isRunning_) throw % 20n ew % 20 TypeError( % 22 Generator % 20 is % 20 already % 20 running % 22);
    this.isRunning_ = !0
};
$jscomp.generator.Context.prototype.stop_ = function() {
    this.isRunning_ = !1
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() {
    this.nextAddress = this.catchAddress_ || this.finallyAddress_
};
$jscomp.generator.Context.prototype.next_ = function(a) {
    this.yieldResult = a
};
$jscomp.generator.Context.prototype.throw_ = function(a) {
    this.abruptCompletion_ = {
        exception: a,
        isException: !0
    };
    this.jumpToErrorHandler_()
};
$jscomp.generator.Context.prototype[ % 22
    return % 22] = function(a) {
    this.abruptCompletion_ = {
        % 22
        return % 22: a
    };
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function(a) {
    this.abruptCompletion_ = {
        jumpTo: a
    };
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.yield = function(a, b) {
    this.nextAddress = b;
    return {
        value: a
    }
};
$jscomp.generator.Context.prototype.yieldAll = function(a, b) {
    var % 20 c = $jscomp.makeIterator(a), d = c.next();
    $jscomp.generator.ensureIteratorResultIsObject_(d);
    if (d.done) this.yieldResult = d.value, this.nextAddress = b;
    else % 20
    return % 20 this.yieldAllIterator_ = c, this.yield(d.value, b)
};
$jscomp.generator.Context.prototype.jumpTo = function(a) {
    this.nextAddress = a
};
$jscomp.generator.Context.prototype.jumpToEnd = function() {
    this.nextAddress = 0
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function(a, b) {
    this.catchAddress_ = a;
    void % 200 != b && (this.finallyAddress_ = b)
};
$jscomp.generator.Context.prototype.setFinallyBlock = function(a) {
    this.catchAddress_ = 0;
    this.finallyAddress_ = a || 0
};
$jscomp.generator.Context.prototype.leaveTryBlock = function(a, b) {
    this.nextAddress = a;
    this.catchAddress_ = b || 0
};
$jscomp.generator.Context.prototype.enterCatchBlock = function(a) {
    this.catchAddress_ = a || 0;
    a = this.abruptCompletion_.exception;
    this.abruptCompletion_ = null;
    return % 20 a
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function(a, b, c) {
    c ? this.finallyContexts_[c] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
    this.catchAddress_ = a || 0;
    this.finallyAddress_ = b || 0
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(a, b) {
    var % 20 c = this.finallyContexts_.splice(b || 0)[0];
    if (c = this.abruptCompletion_ = this.abruptCompletion_ || c) {
        if (c.isException) return % 20 this.jumpToErrorHandler_();
        void % 200 != c.jumpTo && this.finallyAddress_ % 3 Cc.jumpTo ? (this.nextAddress = c.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_
    } else % 20 this.nextAddress = a
};
$jscomp.generator.Context.prototype.forIn = function(a) {
    return % 20n ew % 20 $jscomp.generator.Context.PropertyIterator(a)
};
$jscomp.generator.Context.PropertyIterator = function(a) {
    this.object_ = a;
    this.properties_ = [];
    for (var % 20 b % 20 in % 20 a) this.properties_.push(b);
    this.properties_.reverse()
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function() {
    for (; 0 % 3 Cthis.properties_.length;) {
        var % 20 a = this.properties_.pop();
        if (a % 20 in % 20 this.object_) return % 20 a
    }
    return % 20n ull
};
$jscomp.generator.Engine_ = function(a) {
    this.context_ = new % 20 $jscomp.generator.Context;
    this.program_ = a
};
$jscomp.generator.Engine_.prototype.next_ = function(a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return % 20 this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
    this.context_.next_(a);
    return % 20 this.nextStep_()
};
$jscomp.generator.Engine_.prototype.return_ = function(a) {
    this.context_.start_();
    var % 20 b = this.context_.yieldAllIterator_;
    if (b) return % 20 this.yieldAllStep_( % 22
        return % 22 in % 20 b ? b[ % 22
            return % 22] : function(c) {
            return {
                value: c,
                done: !0
            }
        }, a, this.context_[ % 22
            return % 22]);
    this.context_[ % 22
        return % 22](a);
    return % 20 this.nextStep_()
};
$jscomp.generator.Engine_.prototype.throw_ = function(a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return % 20 this.yieldAllStep_(this.context_.yieldAllIterator_[ % 22
        throw % 22], a, this.context_.next_);
    this.context_.throw_(a);
    return % 20 this.nextStep_()
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(a, b, c) {
    try {
        var % 20 d = a.call(this.context_.yieldAllIterator_, b);
        $jscomp.generator.ensureIteratorResultIsObject_(d);
        if (!d.done) return % 20 this.context_.stop_(), d;
        var % 20 e = d.value
    } catch (f) {
        return % 20 this.context_.yieldAllIterator_ = null, this.context_.throw_(f), this.nextStep_()
    }
    this.context_.yieldAllIterator_ = null;
    c.call(this.context_, e);
    return % 20 this.nextStep_()
};
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
    for (; this.context_.nextAddress;) try {
        var % 20 a = this.program_(this.context_);
        if (a) return % 20 this.context_.stop_(), {
            value: a.value,
            done: !1
        }
    } catch (b) {
        this.context_.yieldResult = void % 200, this.context_.throw_(b)
    }
    this.context_.stop_();
    if (this.context_.abruptCompletion_) {
        a = this.context_.abruptCompletion_;
        this.context_.abruptCompletion_ = null;
        if (a.isException) throw % 20 a.exception;
        return {
            value: a[ % 22
                return % 22],
            done: !0
        }
    }
    return {
        value: void % 200,
        done: !0
    }
};
$jscomp.generator.Generator_ = function(a) {
    this.next = function(b) {
        return % 20 a.next_(b)
    };
    this[ % 22
        throw % 22] = function(b) {
        return % 20 a.throw_(b)
    };
    this[ % 22
        return % 22] = function(b) {
        return % 20 a.return_(b)
    };
    this[Symbol.iterator] = function() {
        return % 20 this
    }
};
$jscomp.generator.createGenerator = function(a, b) {
    var % 20 c = new % 20 $jscomp.generator.Generator_(new % 20 $jscomp.generator.Engine_(b));
    $jscomp.setPrototypeOf && a.prototype && $jscomp.setPrototypeOf(c, a.prototype);
    return % 20 c
};
$jscomp.asyncExecutePromiseGenerator = function(a) {
    function % 20 b(d) {
        return % 20 a.next(d)
    }

    function % 20 c(d) {
        return % 20 a[ % 22
            throw % 22](d)
    }
    return % 20n ew % 20 Promise(function(d, e) {
        function % 20 f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(a) {
    return % 20 $jscomp.asyncExecutePromiseGenerator(a())
};
$jscomp.asyncExecutePromiseGeneratorProgram = function(a) {
    return % 20 $jscomp.asyncExecutePromiseGenerator(new % 20 $jscomp.generator.Generator_(new % 20 $jscomp.generator.Engine_(a)))
};
var % 20 bgmusic = document.createElement( % 22 audio % 22);
bgmusic.id = % 22n yanmusic % 22;
bgmusic.loop = % 22 loop % 22;
bgmusic.src = prompt( % 22 Looped % 20 Song, \n % 20 example: % 20 https: site.com / song.mp3\ n % 20 If % 20 the % 20 song % 20 isn % 27 t % 20 looped % 20 it % 20 will % 20 just % 20 replay % 22, % 22 https: //web.archive.org/web/20150821045612/http://nyan.alternative.ly/nyanlooped.mp3%22);bgmusic.volume=prompt(%22Volume%20for%20the%20music,\n%20.009%20is%20default.%20Im%20not%20sure%20what%20the%20max%20is,%20if%20there%20is%20one%22,%22.009%22);bgmusic.play();document.documentElement.innerHTML=%22%3Ca%20href=%27https://www.google.com%27%3E%3Cimg%20src=%27data:image/jpeg;base64,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%27%20border=%270%27%20width=%27120%27%20style=%27position:fixed;%20left:20;%20top:20;%20z-index:421;%27%3E%3C/a%3E%22+document.documentElement.innerHTML+%22%3Cdiv%20style=%27position:fixed;%20left:0;%20top:0;%20right:0;%20bottom:0;%20width:100%;%20height:100%;%20z-index:420;%27%3E%3Cembed%20src=%27http://www.planetdan.net/pics/misc/barry.swf%27%20width=%27100%%27%20height=%27100%%27%20quality=%27High%27%20wmode=%27transparent%27%3E%3C/embed%3E%3C/div%3E%22;(function(){var%20a=document.body.appendChild(document.createElement(%22script%22));a.onerror=function(){alert(%22Sorry,%20the%20script%20could%20not%20be%20loaded.%22)};a.src=%22https://rawgit.com/Krazete/bookmarklets/master/tri.js%22;var%20b=function(c){return%20new%20Promise(function(d){return%20setTimeout(d,c)})};(function(){var%20c,d,e;return%20$jscomp.asyncExecutePromiseGeneratorProgram(function(f){1==f.nextAddress&&(c=1);if(3!=f.nextAddress){if(!(0%3C=c))return%20f.jumpTo(0);[%22%22,%22-ms-%22,%22-webkit-%22,%22-o-%22,%22-moz-%22].map(function(g){Array.prototype.slice.call(document.querySelectorAll(%22div,p,span,img,a,body%22)).map(function(m){m=m.style;var%20l=Math,h=l.floor,n=Math.random();if(window.sessionStorage){var%20k=window.sessionStorage.getItem(%22name%22);k||(k=window.prompt(%22Intensity,\n%206789%20is%20default.%20The%20number%20entered%20is%20saved%20in%20session%20storage\n%20to%20reset%20the%20saved%20number,%20open%20a%20new%20page.\n%20There%20is%20no%20max%20as%20far%20as%20I%20know%22),window.sessionStorage.setItem(%22name%22,k))}else%20k=window.prompt(%22Intensity,\n%206789%20is%20default.%20The%20number%20entered%20is%20saved%20in%20session%20storage\n%20to%20reset%20the%20saved%20number,%20open%20a%20new%20page.\n%20There%20is%20no%20max%20as%20far%20as%20I%20know%22);l=h.call(l,n*k^9);window.sessionStorage?(h=window.sessionStorage.getItem(%22name%22),h||(h=window.prompt(%22-Intensity\n\n%20Number,%203496675430%20^%209%20is%20default%22),window.sessionStorage.setItem(%22name%22,h))):h=window.prompt(%22-Intensity\n\n%20Number,%203496675430%20^%209%20is%20default%22);m[g+%22transform%22]=%22rotate(%22+(l-h)+%22deg)%22})});d=document.createElement(%22button%22);d.innerText=%22?II%3E,IIq3098jr03jr98j009a83jrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijjrjpwoiejpjrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23jrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwepokmweiji%22;d.addEventListener(%22click%22,function(){alert(%22You%20Made%20A%20Mistake%22)});document.body.appendChild(d);e=document.createElement(%22button%22);e.innerText=%22jeeji2jrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejrjpwoiejpofijpoiajpflkemfkmpeip3131013823g23g023y09uh13rk[p3lk02ijp3mpr1k09uy123irbnp1lk3m-oi213y0ru1o23ijmrr[1o2krpo1i3h09y0um2130ij13yh3koeg23gpo2ijg-i2u3giu2nelkmfo2i3jh8yg3orjnq3-ogij09eughokwmdgplk2j30u2i3jnplegmo2i3eu09uh23pokmwejfiejf%22;e.addEventListener(%22click%22,function(){alert(%22You%20Made%20A%20Mistake%22)});document.body.appendChild(e);return%20f.yield(b(5),3)}c++;return%20f.jumpTo(2)})})()})();
