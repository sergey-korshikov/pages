(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a8, b3) => {
    for (var prop in b3 || (b3 = {}))
      if (__hasOwnProp.call(b3, prop))
        __defNormalProp(a8, prop, b3[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b3)) {
        if (__propIsEnum.call(b3, prop))
          __defNormalProp(a8, prop, b3[prop]);
      }
    return a8;
  };
  var __spreadProps = (a8, b3) => __defProps(a8, __getOwnPropDescs(b3));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/focus-visible/dist/focus-visible.js
  var require_focus_visible = __commonJS({
    "node_modules/focus-visible/dist/focus-visible.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory() : typeof define === "function" && define.amd ? define(factory) : factory();
      })(exports, function() {
        "use strict";
        function applyFocusVisiblePolyfill(scope) {
          var hadKeyboardEvent = true;
          var hadFocusVisibleRecently = false;
          var hadFocusVisibleRecentlyTimeout = null;
          var inputTypesAllowlist = {
            text: true,
            search: true,
            url: true,
            tel: true,
            email: true,
            password: true,
            number: true,
            date: true,
            month: true,
            week: true,
            time: true,
            datetime: true,
            "datetime-local": true
          };
          function isValidFocusTarget(el) {
            if (el && el !== document && el.nodeName !== "HTML" && el.nodeName !== "BODY" && "classList" in el && "contains" in el.classList) {
              return true;
            }
            return false;
          }
          function focusTriggersKeyboardModality(el) {
            var type = el.type;
            var tagName = el.tagName;
            if (tagName === "INPUT" && inputTypesAllowlist[type] && !el.readOnly) {
              return true;
            }
            if (tagName === "TEXTAREA" && !el.readOnly) {
              return true;
            }
            if (el.isContentEditable) {
              return true;
            }
            return false;
          }
          function addFocusVisibleClass(el) {
            if (el.classList.contains("focus-visible")) {
              return;
            }
            el.classList.add("focus-visible");
            el.setAttribute("data-focus-visible-added", "");
          }
          function removeFocusVisibleClass(el) {
            if (!el.hasAttribute("data-focus-visible-added")) {
              return;
            }
            el.classList.remove("focus-visible");
            el.removeAttribute("data-focus-visible-added");
          }
          function onKeyDown(e11) {
            if (e11.metaKey || e11.altKey || e11.ctrlKey) {
              return;
            }
            if (isValidFocusTarget(scope.activeElement)) {
              addFocusVisibleClass(scope.activeElement);
            }
            hadKeyboardEvent = true;
          }
          function onPointerDown(e11) {
            hadKeyboardEvent = false;
          }
          function onFocus(e11) {
            if (!isValidFocusTarget(e11.target)) {
              return;
            }
            if (hadKeyboardEvent || focusTriggersKeyboardModality(e11.target)) {
              addFocusVisibleClass(e11.target);
            }
          }
          function onBlur(e11) {
            if (!isValidFocusTarget(e11.target)) {
              return;
            }
            if (e11.target.classList.contains("focus-visible") || e11.target.hasAttribute("data-focus-visible-added")) {
              hadFocusVisibleRecently = true;
              window.clearTimeout(hadFocusVisibleRecentlyTimeout);
              hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
                hadFocusVisibleRecently = false;
              }, 100);
              removeFocusVisibleClass(e11.target);
            }
          }
          function onVisibilityChange(e11) {
            if (document.visibilityState === "hidden") {
              if (hadFocusVisibleRecently) {
                hadKeyboardEvent = true;
              }
              addInitialPointerMoveListeners();
            }
          }
          function addInitialPointerMoveListeners() {
            document.addEventListener("mousemove", onInitialPointerMove);
            document.addEventListener("mousedown", onInitialPointerMove);
            document.addEventListener("mouseup", onInitialPointerMove);
            document.addEventListener("pointermove", onInitialPointerMove);
            document.addEventListener("pointerdown", onInitialPointerMove);
            document.addEventListener("pointerup", onInitialPointerMove);
            document.addEventListener("touchmove", onInitialPointerMove);
            document.addEventListener("touchstart", onInitialPointerMove);
            document.addEventListener("touchend", onInitialPointerMove);
          }
          function removeInitialPointerMoveListeners() {
            document.removeEventListener("mousemove", onInitialPointerMove);
            document.removeEventListener("mousedown", onInitialPointerMove);
            document.removeEventListener("mouseup", onInitialPointerMove);
            document.removeEventListener("pointermove", onInitialPointerMove);
            document.removeEventListener("pointerdown", onInitialPointerMove);
            document.removeEventListener("pointerup", onInitialPointerMove);
            document.removeEventListener("touchmove", onInitialPointerMove);
            document.removeEventListener("touchstart", onInitialPointerMove);
            document.removeEventListener("touchend", onInitialPointerMove);
          }
          function onInitialPointerMove(e11) {
            if (e11.target.nodeName && e11.target.nodeName.toLowerCase() === "html") {
              return;
            }
            hadKeyboardEvent = false;
            removeInitialPointerMoveListeners();
          }
          document.addEventListener("keydown", onKeyDown, true);
          document.addEventListener("mousedown", onPointerDown, true);
          document.addEventListener("pointerdown", onPointerDown, true);
          document.addEventListener("touchstart", onPointerDown, true);
          document.addEventListener("visibilitychange", onVisibilityChange, true);
          addInitialPointerMoveListeners();
          scope.addEventListener("focus", onFocus, true);
          scope.addEventListener("blur", onBlur, true);
          if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
            scope.host.setAttribute("data-js-focus-visible", "");
          } else if (scope.nodeType === Node.DOCUMENT_NODE) {
            document.documentElement.classList.add("js-focus-visible");
            document.documentElement.setAttribute("data-js-focus-visible", "");
          }
        }
        if (typeof window !== "undefined" && typeof document !== "undefined") {
          window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;
          var event2;
          try {
            event2 = new CustomEvent("focus-visible-polyfill-ready");
          } catch (error) {
            event2 = document.createEvent("CustomEvent");
            event2.initCustomEvent("focus-visible-polyfill-ready", false, false, {});
          }
          window.dispatchEvent(event2);
        }
        if (typeof document !== "undefined") {
          applyFocusVisiblePolyfill(document);
        }
      });
    }
  });

  // node_modules/lozad/dist/lozad.js
  var require_lozad = __commonJS({
    "node_modules/lozad/dist/lozad.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.lozad = factory();
      })(exports, function() {
        "use strict";
        var _extends = Object.assign || function(target) {
          for (var i9 = 1; i9 < arguments.length; i9++) {
            var source = arguments[i9];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        var defaultConfig = {
          rootMargin: "0px",
          threshold: 0,
          load: function load(element) {
            element.src = element.dataset.src;
          }
        };
        function markAsLoaded(element) {
          element.dataset.loaded = true;
        }
        var isLoaded = function isLoaded2(element) {
          return element.dataset.loaded === "true";
        };
        var onIntersection = function onIntersection2(load) {
          return function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                load(entry.target);
                markAsLoaded(entry.target);
              }
            });
          };
        };
        var lozad5 = function() {
          var selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ".lozad";
          var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var _defaultConfig$option = _extends({}, defaultConfig, options), rootMargin = _defaultConfig$option.rootMargin, threshold = _defaultConfig$option.threshold, load = _defaultConfig$option.load;
          var observer = void 0;
          if (window.IntersectionObserver) {
            observer = new IntersectionObserver(onIntersection(load), {
              rootMargin,
              threshold
            });
          }
          return {
            observe: function observe() {
              var elements = [].filter.call(document.querySelectorAll(selector), function(element) {
                return !isLoaded(element);
              });
              if (!observer) {
                elements.forEach(function(element) {
                  load(element);
                  markAsLoaded(element);
                });
                return;
              }
              elements.forEach(function(element) {
                observer.observe(element);
              });
            }
          };
        };
        return lozad5;
      });
    }
  });

  // node_modules/wnumb/wNumb.js
  var require_wNumb = __commonJS({
    "node_modules/wnumb/wNumb.js"(exports, module) {
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define([], factory);
        } else if (typeof exports === "object") {
          module.exports = factory();
        } else {
          window.wNumb = factory();
        }
      })(function() {
        "use strict";
        var FormatOptions = [
          "decimals",
          "thousand",
          "mark",
          "prefix",
          "suffix",
          "encoder",
          "decoder",
          "negativeBefore",
          "negative",
          "edit",
          "undo"
        ];
        function strReverse(a8) {
          return a8.split("").reverse().join("");
        }
        function strStartsWith(input, match) {
          return input.substring(0, match.length) === match;
        }
        function strEndsWith(input, match) {
          return input.slice(-1 * match.length) === match;
        }
        function throwEqualError(F, a8, b3) {
          if ((F[a8] || F[b3]) && F[a8] === F[b3]) {
            throw new Error(a8);
          }
        }
        function isValidNumber(input) {
          return typeof input === "number" && isFinite(input);
        }
        function toFixed(value, exp) {
          value = value.toString().split("e");
          value = Math.round(+(value[0] + "e" + (value[1] ? +value[1] + exp : exp)));
          value = value.toString().split("e");
          return (+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp))).toFixed(exp);
        }
        function formatTo(decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input) {
          var originalInput = input, inputIsNegative, inputPieces, inputBase, inputDecimals = "", output = "";
          if (encoder) {
            input = encoder(input);
          }
          if (!isValidNumber(input)) {
            return false;
          }
          if (decimals !== false && parseFloat(input.toFixed(decimals)) === 0) {
            input = 0;
          }
          if (input < 0) {
            inputIsNegative = true;
            input = Math.abs(input);
          }
          if (decimals !== false) {
            input = toFixed(input, decimals);
          }
          input = input.toString();
          if (input.indexOf(".") !== -1) {
            inputPieces = input.split(".");
            inputBase = inputPieces[0];
            if (mark) {
              inputDecimals = mark + inputPieces[1];
            }
          } else {
            inputBase = input;
          }
          if (thousand) {
            inputBase = strReverse(inputBase).match(/.{1,3}/g);
            inputBase = strReverse(inputBase.join(strReverse(thousand)));
          }
          if (inputIsNegative && negativeBefore) {
            output += negativeBefore;
          }
          if (prefix) {
            output += prefix;
          }
          if (inputIsNegative && negative) {
            output += negative;
          }
          output += inputBase;
          output += inputDecimals;
          if (suffix) {
            output += suffix;
          }
          if (edit) {
            output = edit(output, originalInput);
          }
          return output;
        }
        function formatFrom(decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input) {
          var originalInput = input, inputIsNegative, output = "";
          if (undo) {
            input = undo(input);
          }
          if (!input || typeof input !== "string") {
            return false;
          }
          if (negativeBefore && strStartsWith(input, negativeBefore)) {
            input = input.replace(negativeBefore, "");
            inputIsNegative = true;
          }
          if (prefix && strStartsWith(input, prefix)) {
            input = input.replace(prefix, "");
          }
          if (negative && strStartsWith(input, negative)) {
            input = input.replace(negative, "");
            inputIsNegative = true;
          }
          if (suffix && strEndsWith(input, suffix)) {
            input = input.slice(0, -1 * suffix.length);
          }
          if (thousand) {
            input = input.split(thousand).join("");
          }
          if (mark) {
            input = input.replace(mark, ".");
          }
          if (inputIsNegative) {
            output += "-";
          }
          output += input;
          output = output.replace(/[^0-9\.\-.]/g, "");
          if (output === "") {
            return false;
          }
          output = Number(output);
          if (decoder) {
            output = decoder(output);
          }
          if (!isValidNumber(output)) {
            return false;
          }
          return output;
        }
        function validate(inputOptions) {
          var i9, optionName, optionValue, filteredOptions = {};
          if (inputOptions["suffix"] === void 0) {
            inputOptions["suffix"] = inputOptions["postfix"];
          }
          for (i9 = 0; i9 < FormatOptions.length; i9 += 1) {
            optionName = FormatOptions[i9];
            optionValue = inputOptions[optionName];
            if (optionValue === void 0) {
              if (optionName === "negative" && !filteredOptions.negativeBefore) {
                filteredOptions[optionName] = "-";
              } else if (optionName === "mark" && filteredOptions.thousand !== ".") {
                filteredOptions[optionName] = ".";
              } else {
                filteredOptions[optionName] = false;
              }
            } else if (optionName === "decimals") {
              if (optionValue >= 0 && optionValue < 8) {
                filteredOptions[optionName] = optionValue;
              } else {
                throw new Error(optionName);
              }
            } else if (optionName === "encoder" || optionName === "decoder" || optionName === "edit" || optionName === "undo") {
              if (typeof optionValue === "function") {
                filteredOptions[optionName] = optionValue;
              } else {
                throw new Error(optionName);
              }
            } else {
              if (typeof optionValue === "string") {
                filteredOptions[optionName] = optionValue;
              } else {
                throw new Error(optionName);
              }
            }
          }
          throwEqualError(filteredOptions, "mark", "thousand");
          throwEqualError(filteredOptions, "prefix", "negative");
          throwEqualError(filteredOptions, "prefix", "negativeBefore");
          return filteredOptions;
        }
        function passAll(options, method, input) {
          var i9, args = [];
          for (i9 = 0; i9 < FormatOptions.length; i9 += 1) {
            args.push(options[FormatOptions[i9]]);
          }
          args.push(input);
          return method.apply("", args);
        }
        function wNumb2(options) {
          if (!(this instanceof wNumb2)) {
            return new wNumb2(options);
          }
          if (typeof options !== "object") {
            return;
          }
          options = validate(options);
          this.to = function(input) {
            return passAll(options, formatTo, input);
          };
          this.from = function(input) {
            return passAll(options, formatFrom, input);
          };
        }
        return wNumb2;
      });
    }
  });

  // scripts/components/common/index.js
  var import_focus_visible = __toESM(require_focus_visible(), 1);

  // node_modules/@fancyapps/ui/dist/utils/isPlainObject.js
  var t = (t10) => "object" == typeof t10 && null !== t10 && t10.constructor === Object && "[object Object]" === Object.prototype.toString.call(t10);

  // node_modules/@fancyapps/ui/dist/utils/isString.js
  var t2 = (t10) => "string" == typeof t10;

  // node_modules/@fancyapps/ui/dist/utils/isNode.js
  var n = (n10) => n10 && null !== n10 && n10 instanceof Element && "nodeType" in n10;

  // node_modules/@fancyapps/ui/dist/utils/strToHtml.js
  var e = function(e11) {
    var t10 = new DOMParser().parseFromString(e11, "text/html").body;
    if (t10.childElementCount > 1) {
      for (var n10 = document.createElement("div"); t10.firstChild; )
        n10.appendChild(t10.firstChild);
      return n10;
    }
    let r7 = t10.firstChild;
    return !r7 || r7 instanceof HTMLElement ? r7 : ((n10 = document.createElement("div")).appendChild(r7), n10);
  };

  // node_modules/@fancyapps/ui/dist/utils/getScrollableParent.js
  var e2 = function(e11) {
    if (!(e11 && e11 instanceof Element && e11.offsetParent))
      return false;
    const t10 = e11.scrollHeight > e11.clientHeight || e11.scrollWidth > e11.clientWidth, n10 = window.getComputedStyle(e11).overflowY, i9 = -1 !== n10.indexOf("hidden"), o9 = -1 !== n10.indexOf("visible");
    return t10 && !i9 && !o9;
  };
  var t3 = function(n10, i9 = void 0) {
    return !n10 || n10 === document.body || i9 && n10 === i9 ? null : e2(n10) ? n10 : t3(n10.parentElement, i9);
  };

  // node_modules/@fancyapps/ui/dist/utils/scrollLock.js
  var t4 = (t10 = true, e11 = "--f-scrollbar-compensate", s11 = "--f-body-margin", o9 = "hide-scrollbar") => {
    const n10 = document, r7 = n10.body, l8 = n10.documentElement;
    if (t10) {
      if (r7.classList.contains(o9))
        return;
      let t11 = window.innerWidth - l8.getBoundingClientRect().width;
      t11 < 0 && (t11 = 0), l8.style.setProperty(e11, "".concat(t11, "px"));
      const n11 = parseFloat(window.getComputedStyle(r7).marginRight);
      n11 && r7.style.setProperty(s11, "".concat(n11, "px")), r7.classList.add(o9);
    } else
      r7.classList.remove(o9), r7.style.setProperty(s11, ""), n10.documentElement.style.setProperty(e11, "");
  };

  // node_modules/@fancyapps/ui/dist/utils/extend.js
  var r = (t10, ...e11) => {
    const n10 = e11.length;
    for (let c5 = 0; c5 < n10; c5++) {
      const n11 = e11[c5] || {};
      Object.entries(n11).forEach(([e12, n12]) => {
        const c6 = Array.isArray(n12) ? [] : {};
        t10[e12] || Object.assign(t10, { [e12]: c6 }), t(n12) ? Object.assign(t10[e12], r(t10[e12], n12)) : Array.isArray(n12) ? Object.assign(t10, { [e12]: [...n12] }) : Object.assign(t10, { [e12]: n12 });
      });
    }
    return t10;
  };

  // node_modules/@fancyapps/ui/dist/utils/canUseDOM.js
  function e3() {
    return !("undefined" == typeof window || !window.document || !window.document.createElement);
  }

  // node_modules/@fancyapps/ui/dist/utils/clamp.js
  var t5 = function(t10 = 0, n10 = 0, a8 = 0) {
    return Math.max(Math.min(n10, a8), t10);
  };

  // node_modules/@fancyapps/ui/dist/utils/map.js
  var t6 = function(t10 = 0, n10 = 0, r7 = 0, c5 = 0, m3 = 0, p2 = false) {
    const s11 = (t10 - n10) / (r7 - n10) * (m3 - c5) + c5;
    return p2 ? c5 < m3 ? t5(c5, s11, m3) : t5(m3, s11, c5) : s11;
  };

  // node_modules/@fancyapps/ui/dist/utils/addClass.js
  var s = (s11, t10 = "") => {
    s11 && s11.classList && t10.split(" ").forEach((t11) => {
      t11 && s11.classList.add(t11);
    });
  };

  // node_modules/@fancyapps/ui/dist/utils/removeClass.js
  var s2 = (s11, t10 = "") => {
    s11 && s11.classList && t10.split(" ").forEach((t11) => {
      t11 && s11.classList.remove(t11);
    });
  };

  // node_modules/@fancyapps/ui/dist/utils/toggleClass.js
  var s3 = (s11, t10 = "", c5) => {
    s11 && s11.classList && t10.split(" ").forEach((t11) => {
      t11 && s11.classList.toggle(t11, c5 || false);
    });
  };

  // node_modules/@fancyapps/ui/dist/utils/isEqual.js
  function e4(e11) {
    return t(e11) || Array.isArray(e11);
  }
  function n2(t10, r7) {
    const o9 = Object.keys(t10), c5 = Object.keys(r7);
    return o9.length === c5.length && o9.every((o10) => {
      const c6 = t10[o10], i9 = r7[o10];
      return "function" == typeof c6 ? "".concat(c6) == "".concat(i9) : e4(c6) && e4(i9) ? n2(c6, i9) : c6 === i9;
    });
  }

  // node_modules/@fancyapps/ui/dist/libs/tween.js
  var e5 = function(n10) {
    for (const t10 of s4)
      t10.getState() === i.Running && t10.tick(a ? n10 - a : 0);
    a = n10, u = window.requestAnimationFrame(e5);
  };
  var i;
  var o;
  var r2;
  !function(n10) {
    n10[n10.Initializing = 0] = "Initializing", n10[n10.Running = 1] = "Running", n10[n10.Paused = 2] = "Paused", n10[n10.Completed = 3] = "Completed", n10[n10.Destroyed = 4] = "Destroyed";
  }(i || (i = {})), function(n10) {
    n10[n10.Spring = 0] = "Spring", n10[n10.Ease = 1] = "Ease";
  }(o || (o = {})), function(n10) {
    n10[n10.Loop = 0] = "Loop", n10[n10.Reverse = 1] = "Reverse";
  }(r2 || (r2 = {}));
  var s4 = /* @__PURE__ */ new Set();
  var u = null;
  var a = 0;
  function c() {
    let a8 = i.Initializing, f3 = o.Ease, l8 = 0, g = 0, p2 = c.Easings.Linear, m3 = 500, d3 = 0, b3 = 0, S = 0, h3 = 0, y3 = 1 / 0, E3 = 0.01, R2 = 0.01, M3 = false, j2 = {}, w2 = null, v3 = {}, O2 = {}, C = {}, L = 0, I2 = 0, D2 = r2.Loop, z2 = c.Easings.Linear;
    const N2 = /* @__PURE__ */ new Map();
    function V(n10, ...t10) {
      for (const e11 of N2.get(n10) || [])
        e11(...t10);
    }
    function q2(n10) {
      return g = 0, n10 ? w2 = setTimeout(() => {
        x2();
      }, n10) : x2(), F;
    }
    function x2() {
      a8 = i.Running, V("start", v3, O2);
    }
    function A2() {
      if (a8 = i.Completed, C = {}, V("end", v3), a8 === i.Completed)
        if (l8 < L) {
          if (l8++, D2 === r2.Reverse) {
            const n10 = Object.assign({}, j2);
            j2 = Object.assign({}, O2), O2 = n10;
          }
          q2(I2);
        } else
          l8 = 0;
      return F;
    }
    const F = { getState: function() {
      return a8;
    }, easing: function(n10) {
      return p2 = n10, f3 = o.Ease, C = {}, F;
    }, duration: function(n10) {
      return m3 = n10, F;
    }, spring: function(n10 = {}) {
      f3 = o.Spring;
      const t10 = { velocity: 0, mass: 1, tension: 170, friction: 26, restDelta: 0.1, restSpeed: 0.1, maxSpeed: 1 / 0, clamp: true }, { velocity: e11, mass: i9, tension: r7, friction: s11, restDelta: u5, restSpeed: a9, maxSpeed: c5, clamp: l9 } = Object.assign(Object.assign({}, t10), n10);
      return d3 = e11, b3 = i9, S = r7, h3 = s11, R2 = u5, E3 = a9, y3 = c5, M3 = l9, C = {}, F;
    }, isRunning: function() {
      return a8 === i.Running;
    }, isSpring: function() {
      return f3 === o.Spring;
    }, from: function(n10) {
      return v3 = Object.assign({}, n10), F;
    }, to: function(n10) {
      return O2 = n10, F;
    }, repeat: function(n10, t10 = 0, e11 = r2.Loop, i9) {
      return L = n10, I2 = t10, D2 = e11, z2 = i9 || p2, F;
    }, on: function(n10, t10) {
      var e11, i9;
      return e11 = n10, i9 = t10, N2.set(e11, [...N2.get(e11) || [], i9]), F;
    }, off: function(n10, t10) {
      var e11, i9;
      return e11 = n10, i9 = t10, N2.has(e11) && N2.set(e11, N2.get(e11).filter((n11) => n11 !== i9)), F;
    }, start: function(n10) {
      return n2(v3, O2) || (a8 = i.Initializing, j2 = Object.assign({}, v3), s4.add(this), u || (u = window.requestAnimationFrame(e5)), q2(n10)), F;
    }, pause: function() {
      return w2 && (clearTimeout(w2), w2 = null), a8 === i.Running && (a8 = i.Paused, V("pause", v3)), F;
    }, end: A2, tick: function(e11) {
      e11 > 50 && (e11 = 50), g += e11;
      let s11 = 0, u5 = false;
      if (a8 !== i.Running)
        return F;
      if (f3 === o.Ease) {
        s11 = t5(0, g / m3, 1), u5 = 1 === s11;
        const t10 = D2 === r2.Reverse ? z2 : p2;
        for (const n10 in v3)
          v3[n10] = j2[n10] + (O2[n10] - j2[n10]) * t10(s11);
      }
      if (f3 === o.Spring) {
        const t10 = 1e-3 * e11;
        let i9 = 0;
        for (const e12 in v3) {
          const o9 = O2[e12];
          let r7 = v3[e12];
          if ("number" != typeof o9 || isNaN(o9) || "number" != typeof r7 || isNaN(r7))
            continue;
          if (Math.abs(o9 - r7) <= R2) {
            v3[e12] = o9, C[e12] = 0;
            continue;
          }
          C[e12] || ("object" == typeof d3 && "number" == typeof d3[e12] ? C[e12] = d3[e12] : C[e12] = "number" == typeof d3 ? d3 : 0);
          let s12 = C[e12];
          s12 = t5(-1 * Math.abs(y3), s12, Math.abs(y3));
          const u6 = s12 * b3 * h3;
          s12 += ((r7 > o9 ? -1 : 1) * (Math.abs(o9 - r7) * S) - u6) / b3 * t10, r7 += s12 * t10;
          const a9 = v3[e12] > o9 ? r7 < o9 : r7 > o9;
          let c6 = Math.abs(s12) < E3 && Math.abs(o9 - r7) <= R2;
          M3 && a9 && (c6 = true), c6 ? (r7 = o9, s12 = 0) : i9++, v3[e12] = r7, C[e12] = s12;
        }
        u5 = !i9;
      }
      const c5 = Object.assign({}, O2);
      return V("step", v3, j2, O2, s11), u5 && a8 === i.Running && n2(O2, c5) && (a8 = i.Completed, A2()), F;
    }, getStartValues: function() {
      return j2;
    }, getCurrentValues: function() {
      return v3;
    }, getCurrentVelocities: function() {
      return C;
    }, getEndValues: function() {
      return O2;
    }, destroy: function() {
      a8 = i.Destroyed, w2 && (clearTimeout(w2), w2 = null), j2 = v3 = O2 = {}, s4.delete(this);
    } };
    return F;
  }
  c.destroy = () => {
    for (const n10 of s4)
      n10.destroy();
    u && (cancelAnimationFrame(u), u = null);
  }, c.Easings = { Linear: function(n10) {
    return n10;
  }, EaseIn: function(n10) {
    return 0 === n10 ? 0 : Math.pow(2, 10 * n10 - 10);
  }, EaseOut: function(n10) {
    return 1 === n10 ? 1 : 1 - Math.pow(2, -10 * n10);
  }, EaseInOut: function(n10) {
    return 0 === n10 ? 0 : 1 === n10 ? 1 : n10 < 0.5 ? Math.pow(2, 20 * n10 - 10) / 2 : (2 - Math.pow(2, -20 * n10 + 10)) / 2;
  } };

  // node_modules/@fancyapps/ui/dist/libs/gestures.js
  function e6(e11) {
    return "undefined" != typeof TouchEvent && e11 instanceof TouchEvent;
  }
  function t7(t10, n10) {
    const o9 = [], s11 = e6(t10) ? t10[n10] : t10 instanceof MouseEvent && ("changedTouches" === n10 || "mouseup" !== t10.type) ? [t10] : [];
    for (const e11 of s11)
      o9.push({ x: e11.clientX, y: e11.clientY, ts: Date.now() });
    return o9;
  }
  function n3(e11) {
    return t7(e11, "touches");
  }
  function o2(e11) {
    return t7(e11, "targetTouches");
  }
  function s5(e11) {
    return t7(e11, "changedTouches");
  }
  function i2(e11) {
    const t10 = e11[0], n10 = e11[1] || t10;
    return { x: (t10.x + n10.x) / 2, y: (t10.y + n10.y) / 2, ts: n10.ts };
  }
  function r3(e11) {
    const t10 = e11[0], n10 = e11[1] || e11[0];
    return t10 && n10 ? -1 * Math.sqrt((n10.x - t10.x) * (n10.x - t10.x) + (n10.y - t10.y) * (n10.y - t10.y)) : 0;
  }
  var c2 = (e11) => {
    e11.cancelable && e11.preventDefault();
  };
  var a2 = { passive: false };
  var u2 = { panThreshold: 5, swipeThreshold: 3, ignore: ["textarea", "input", "select", "[contenteditable]", "[data-selectable]", "[data-draggable]"] };
  var l = false;
  var d = true;
  var f = (e11, t10) => {
    let f3, h3, v3, g = Object.assign(Object.assign({}, u2), t10), p2 = [], m3 = [], E3 = [], w2 = false, y3 = false, T = false, b3 = false, M3 = 0, x2 = 0, L = 0, P = 0, D2 = 0, X = 0, Y = 0, j2 = 0, k3 = 0, R2 = [], z2 = 0, A2 = 0;
    const O2 = /* @__PURE__ */ new Map();
    function S(e12) {
      const t11 = r3(m3), n10 = r3(E3), o9 = t11 && n10 ? t11 / n10 : 0, s11 = Math.abs(Y) > Math.abs(j2) ? Y : j2, i9 = { srcEvent: f3, isPanRecognized: w2, isSwipeRecognized: y3, firstTouch: p2, previousTouch: E3, currentTouch: m3, deltaX: L, deltaY: P, offsetX: D2, offsetY: X, velocityX: Y, velocityY: j2, velocity: s11, angle: k3, axis: v3, scale: o9, center: h3 };
      for (const t12 of O2.get(e12) || [])
        t12(i9);
    }
    function q2(e12) {
      const t11 = e12.target, n10 = e12.composedPath()[0], o9 = g.ignore.join(","), s11 = (e13) => e13 && (e13.matches(o9) || e13.closest(o9));
      if (s11(t11) || s11(n10))
        return false;
    }
    function C(e12) {
      const t11 = Date.now();
      if (R2 = R2.filter((e13) => !e13.ts || e13.ts > t11 - 100), e12 && R2.push(e12), Y = 0, j2 = 0, R2.length > 3) {
        const e13 = R2[0], t12 = R2[R2.length - 1];
        if (e13 && t12) {
          const n10 = t12.x - e13.x, o9 = t12.y - e13.y, s11 = e13.ts && t12.ts ? t12.ts - e13.ts : 0;
          s11 > 0 && (Y = Math.abs(n10) > 3 ? n10 / (s11 / 30) : 0, j2 = Math.abs(o9) > 3 ? o9 / (s11 / 30) : 0);
        }
      }
    }
    function I2(e12) {
      if (false === q2(e12))
        return;
      if ("undefined" != typeof MouseEvent && e12 instanceof MouseEvent) {
        if (l)
          return;
      } else
        l = true;
      if ("undefined" != typeof MouseEvent && e12 instanceof MouseEvent) {
        if (!e12.buttons || 0 !== e12.button)
          return;
        c2(e12);
      }
      e12 instanceof MouseEvent && (window.addEventListener("mousemove", B2), window.addEventListener("mouseup", F)), window.addEventListener("blur", G), f3 = e12, m3 = o2(e12), p2 = [...m3], E3 = [], x2 = m3.length, h3 = i2(m3), 1 === x2 && (w2 = false, y3 = false, T = false), x2 && C(i2(m3));
      const t11 = Date.now(), n10 = t11 - (M3 || t11);
      b3 = n10 > 0 && n10 <= 250 && 1 === x2, M3 = t11, clearTimeout(z2), S("start");
    }
    function B2(e12) {
      var t11;
      if (!p2.length)
        return;
      if (e12.defaultPrevented)
        return;
      if (false === q2(e12))
        return;
      f3 = e12, E3 = [...m3], m3 = n3(e12);
      const o9 = i2(E3), s11 = i2(n3(e12));
      if (C(s11), x2 = m3.length, h3 = s11, E3.length === m3.length ? (L = s11.x - o9.x, P = s11.y - o9.y) : (L = 0, P = 0), p2.length) {
        const e13 = i2(p2);
        D2 = s11.x - e13.x, X = s11.y - e13.y;
      }
      if (m3.length > 1) {
        const e13 = r3(m3), t12 = r3(E3);
        Math.abs(e13 - t12) >= 0.1 && (T = true, S("pinch"));
      }
      w2 || (w2 = Math.abs(D2) > g.panThreshold || Math.abs(X) > g.panThreshold, w2 && (d = false, clearTimeout(A2), A2 = 0, k3 = Math.abs(180 * Math.atan2(X, D2) / Math.PI), v3 = k3 > 45 && k3 < 135 ? "y" : "x", p2 = [...m3], E3 = [...m3], D2 = 0, X = 0, L = 0, P = 0, null === (t11 = window.getSelection()) || void 0 === t11 || t11.removeAllRanges(), S("panstart"))), w2 && (L || P) && S("pan"), S("move");
    }
    function F(e12) {
      if (f3 = e12, !p2.length)
        return;
      const t11 = o2(e12), n10 = s5(e12);
      if (x2 = t11.length, h3 = i2(n10), n10.length && C(i2(n10)), E3 = [...m3], m3 = [...t11], p2 = [...t11], x2 > 0)
        S("end"), w2 = false, y3 = false, R2 = [];
      else {
        const e13 = g.swipeThreshold;
        (Math.abs(Y) > e13 || Math.abs(j2) > e13) && (y3 = true), w2 && S("panend"), y3 && S("swipe"), w2 || y3 || T || (S("tap"), b3 ? S("doubleTap") : z2 = setTimeout(function() {
          S("singleTap");
        }, 250)), S("end"), H2();
      }
    }
    function G() {
      clearTimeout(z2), H2(), w2 && S("panend"), S("end");
    }
    function H2() {
      l = false, w2 = false, y3 = false, b3 = false, x2 = 0, R2 = [], m3 = [], E3 = [], p2 = [], L = 0, P = 0, D2 = 0, X = 0, Y = 0, j2 = 0, k3 = 0, v3 = void 0, window.removeEventListener("mousemove", B2), window.removeEventListener("mouseup", F), window.removeEventListener("blur", G), d || A2 || (A2 = setTimeout(() => {
        d = true, A2 = 0;
      }, 100));
    }
    function J(e12) {
      const t11 = e12.target;
      l = false, t11 && !e12.defaultPrevented && (d || (c2(e12), e12.stopPropagation()));
    }
    const K = { init: function() {
      return e11 && (e11.addEventListener("click", J, a2), e11.addEventListener("mousedown", I2, a2), e11.addEventListener("touchstart", I2, a2), e11.addEventListener("touchmove", B2, a2), e11.addEventListener("touchend", F), e11.addEventListener("touchcancel", F)), K;
    }, on: function(e12, t11) {
      return function(e13, t12) {
        O2.set(e13, [...O2.get(e13) || [], t12]);
      }(e12, t11), K;
    }, off: function(e12, t11) {
      return O2.has(e12) && O2.set(e12, O2.get(e12).filter((e13) => e13 !== t11)), K;
    }, isPointerDown: () => x2 > 0, destroy: function() {
      clearTimeout(z2), clearTimeout(A2), A2 = 0, e11 && (e11.removeEventListener("click", J, a2), e11.removeEventListener("mousedown", I2, a2), e11.removeEventListener("touchstart", I2, a2), e11.removeEventListener("touchmove", B2, a2), e11.removeEventListener("touchend", F), e11.removeEventListener("touchcancel", F)), e11 = null, H2();
    } };
    return K;
  };
  f.isClickAllowed = () => d;

  // node_modules/@fancyapps/ui/dist/panzoom/l10n/en_EN.js
  var e7 = { IMAGE_ERROR: "This image couldn't be loaded. <br /> Please try again later.", MOVE_UP: "Move up", MOVE_DOWN: "Move down", MOVE_LEFT: "Move left", MOVE_RIGHT: "Move right", ZOOM_IN: "Zoom in", ZOOM_OUT: "Zoom out", TOGGLE_FULL: "Toggle zoom level", TOGGLE_1TO1: "Toggle zoom level", ITERATE_ZOOM: "Toggle zoom level", ROTATE_CCW: "Rotate counterclockwise", ROTATE_CW: "Rotate clockwise", FLIP_X: "Flip horizontally", FLIP_Y: "Flip vertically", RESET: "Reset", TOGGLE_FS: "Toggle fullscreen" };

  // node_modules/@fancyapps/ui/dist/panzoom/panzoom.js
  var h = (e11) => {
    e11.cancelable && e11.preventDefault();
  };
  var m = (e11, t10 = 1e4) => (e11 = parseFloat(e11 + "") || 0, Math.round((e11 + Number.EPSILON) * t10) / t10);
  var p = (e11) => e11 instanceof HTMLImageElement;
  var v;
  var b;
  !function(e11) {
    e11.Reset = "reset", e11.Zoom = "zoom", e11.ZoomIn = "zoomIn", e11.ZoomOut = "zoomOut", e11.ZoomTo = "zoomTo", e11.ToggleCover = "toggleCover", e11.ToggleFull = "toggleFull", e11.ToggleMax = "toggleMax", e11.IterateZoom = "iterateZoom", e11.Pan = "pan", e11.Swipe = "swipe", e11.Move = "move", e11.MoveLeft = "moveLeft", e11.MoveRight = "moveRight", e11.MoveUp = "moveUp", e11.MoveDown = "moveDown", e11.RotateCCW = "rotateCCW", e11.RotateCW = "rotateCW", e11.FlipX = "flipX", e11.FlipY = "flipY", e11.ToggleFS = "toggleFS";
  }(v || (v = {})), function(e11) {
    e11.Cover = "cover", e11.Full = "full", e11.Max = "max";
  }(b || (b = {}));
  var y = { x: 0, y: 0, scale: 1, angle: 0, flipX: 1, flipY: 1 };
  var x = { bounds: true, classes: { container: "f-panzoom", wrapper: "f-panzoom__wrapper", content: "f-panzoom__content", viewport: "f-panzoom__viewport" }, clickAction: v.ToggleFull, dblClickAction: false, gestures: {}, height: "auto", l10n: e7, maxScale: 4, minScale: 1, mouseMoveFactor: 1, panMode: "drag", protected: false, singleClickAction: false, spinnerTpl: '<div class="f-spinner"></div>', wheelAction: v.Zoom, width: "auto" };
  var w;
  var M = 0;
  var k = 0;
  var j = 0;
  var E = (c5, b3 = {}, E3 = {}) => {
    let S, O2, A2, C, T, F, Z, L, P = 0, X = Object.assign(Object.assign({}, x), b3), Y = {}, R2 = Object.assign({}, y), z2 = Object.assign({}, y);
    const D2 = [];
    function I2(e11) {
      let t10 = X[e11];
      return t10 && "function" == typeof t10 ? t10(je) : t10;
    }
    function W() {
      return c5 && c5.parentElement && S && 3 === P;
    }
    const q2 = /* @__PURE__ */ new Map();
    function H2(e11, ...t10) {
      const n10 = [...q2.get(e11) || []];
      X.on && n10.push(X.on[e11]);
      for (const e12 of n10)
        e12 && e12 instanceof Function && e12(je, ...t10);
      "*" !== e11 && H2("*", e11, ...t10);
    }
    function $(e11) {
      if (!W())
        return;
      const t10 = e11.target;
      if (t3(t10))
        return;
      const o9 = Date.now(), a8 = [-e11.deltaX || 0, -e11.deltaY || 0, -e11.detail || 0].reduce(function(e12, t11) {
        return Math.abs(t11) > Math.abs(e12) ? t11 : e12;
      }), s11 = t5(-1, a8, 1);
      H2("wheel", e11, s11);
      const r7 = I2("wheelAction");
      if (!r7)
        return;
      if (e11.defaultPrevented)
        return;
      const l8 = z2.scale;
      let c6 = l8 * (s11 > 0 ? 1.5 : 0.5);
      if (r7 === v.Zoom) {
        const t11 = Math.abs(e11.deltaY) < 100 && Math.abs(e11.deltaX) < 100;
        if (o9 - k < (t11 ? 200 : 45))
          return void h(e11);
        k = o9;
        const n10 = ne(), a9 = se();
        if (m(c6) < m(n10) && m(l8) <= m(n10) ? (j += Math.abs(s11), c6 = n10) : m(c6) > m(a9) && m(l8) >= m(a9) ? (j += Math.abs(s11), c6 = a9) : (j = 0, c6 = t5(n10, c6, a9)), j > 7)
          return;
      }
      switch (h(e11), r7) {
        case v.Pan:
          ue(r7, { srcEvent: e11, deltaX: 2 * -e11.deltaX, deltaY: 2 * -e11.deltaY });
          break;
        case v.Zoom:
          ue(v.ZoomTo, { srcEvent: e11, scale: c6, center: { x: e11.clientX, y: e11.clientY } });
          break;
        default:
          ue(r7, { srcEvent: e11 });
      }
    }
    function _2(e11) {
      var n10, o9;
      const i9 = e11.composedPath()[0];
      if (!f.isClickAllowed())
        return;
      if (!n(i9) || e11.defaultPrevented)
        return;
      if (!(null == c5 ? void 0 : c5.contains(i9)))
        return;
      if (i9.hasAttribute("disabled") || i9.hasAttribute("aria-disabled") || i9.hasAttribute("data-carousel-go-prev") || i9.hasAttribute("data-carousel-go-next"))
        return;
      const a8 = i9.closest("[data-panzoom-action]"), s11 = null === (n10 = null == a8 ? void 0 : a8.dataset) || void 0 === n10 ? void 0 : n10.panzoomAction, r7 = (null === (o9 = null == a8 ? void 0 : a8.dataset) || void 0 === o9 ? void 0 : o9.panzoomValue) || "";
      if (s11) {
        switch (h(e11), s11) {
          case v.ZoomTo:
          case v.ZoomIn:
          case v.ZoomOut:
            ue(s11, { scale: parseFloat(r7 || "") || void 0 });
            break;
          case v.MoveLeft:
          case v.MoveRight:
            ue(s11, { deltaX: parseFloat(r7 || "") || void 0 });
            break;
          case v.MoveUp:
          case v.MoveDown:
            ue(s11, { deltaY: parseFloat(r7 || "") || void 0 });
            break;
          case v.ToggleFS:
            Me();
            break;
          default:
            ue(s11);
        }
        return;
      }
      if (!(null == S ? void 0 : S.contains(i9)))
        return;
      const u5 = { srcEvent: e11 };
      if (ue(I2("clickAction"), u5), I2("dblClickAction")) {
        const e12 = Date.now(), t10 = e12 - (M || e12);
        M = e12, t10 > 0 && t10 <= 250 ? (w && (clearTimeout(w), w = void 0), ue(I2("dblClickAction"), u5)) : w = setTimeout(() => {
          ue(I2("singleClickAction"), u5);
        }, 250);
      }
    }
    function B2(e11) {
      if (L = e11, !W() || !Q())
        return;
      if (R2.scale <= 1 || z2.scale <= 1)
        return;
      if (((null == S ? void 0 : S.dataset.animationName) || "").indexOf("zoom") > -1)
        return;
      const t10 = ee(z2.scale);
      if (!t10)
        return;
      const { x: n10, y: o9 } = t10;
      ue(v.Pan, { deltaX: n10 - z2.x, deltaY: o9 - z2.y });
    }
    function N2() {
      var e11;
      c5 && (s2(c5, "is-loading"), null === (e11 = c5.querySelector(".f-spinner")) || void 0 === e11 || e11.remove());
    }
    function V() {
      if (!c5 || !O2)
        return;
      if (N2(), p(O2) && (!O2.complete || !O2.naturalWidth))
        return P = 2, null == S || S.classList.add("has-error"), void H2("error");
      H2("loaded");
      const { width: e11, height: t10 } = J();
      p(O2) && (O2.setAttribute("width", e11 + ""), O2.setAttribute("height", t10 + "")), S && (s2(S, "has-error"), p(O2) && (S.setAttribute("width", e11 + ""), S.setAttribute("height", t10 + ""), S.style.aspectRatio = "".concat(e11 / t10 || ""))), F = c().on("start", (e12, t11) => {
        void 0 !== t11.angle && (t11.angle = 90 * Math.round(t11.angle / 90)), void 0 !== t11.flipX && (t11.flipX = t11.flipX > 0 ? 1 : -1), void 0 !== t11.flipY && (t11.flipY = t11.flipY > 0 ? 1 : -1), z2 = Object.assign(Object.assign({}, y), t11), ce(), H2("animationStart");
      }).on("pause", (e12) => {
        z2 = Object.assign(Object.assign({}, y), e12);
      }).on("step", (e12) => {
        if (!W())
          return void (null == F || F.end());
        if (R2 = Object.assign(Object.assign({}, y), e12), Q() || !I2("bounds") || ye() || z2.scale > R2.scale || z2.scale < oe())
          return void de();
        const t11 = re(z2.scale);
        let n11 = false, o9 = false, a8 = false, s11 = false;
        R2.x < t11.x[0] && (n11 = true), R2.x > t11.x[1] && (o9 = true), R2.y < t11.y[0] && (s11 = true), R2.y > t11.y[1] && (a8 = true);
        let r7 = false, l8 = false, c6 = false, u5 = false;
        z2.x < t11.x[0] && (r7 = true), z2.x > t11.x[1] && (l8 = true), z2.y < t11.y[0] && (u5 = true), z2.y > t11.y[1] && (c6 = true);
        let d3 = false;
        (o9 && l8 || n11 && r7) && (z2.x = t5(t11.x[0], z2.x, t11.x[1]), d3 = true), (a8 && c6 || s11 && u5) && (z2.y = t5(t11.y[0], z2.y, t11.y[1]), d3 = true), d3 && F && F.spring({ tension: 94, friction: 17, maxSpeed: 555 * z2.scale, restDelta: 0.1, restSpeed: 0.1, velocity: F.getCurrentVelocities() }).from(R2).to(z2).start(), de();
      }).on("end", () => {
        (null == T ? void 0 : T.isPointerDown()) || le(), (null == F ? void 0 : F.isRunning()) || (ce(), H2("animationEnd"));
      }), function() {
        const e12 = I2("gestures");
        if (!e12)
          return;
        if (!C || !O2)
          return;
        let t11 = false;
        T = f(C, e12).on("start", (e13) => {
          if (!I2("gestures"))
            return;
          if (!F)
            return;
          if (!W() || Q())
            return;
          const n11 = e13.srcEvent;
          (R2.scale > 1 || e13.currentTouch.length > 1) && (null == n11 || n11.stopPropagation(), F.pause(), t11 = true), 1 === e13.currentTouch.length && H2("touchStart");
        }).on("move", (e13) => {
          var n11;
          t11 && (1 !== z2.scale || e13.currentTouch.length > 1) && (h(e13.srcEvent), null === (n11 = e13.srcEvent) || void 0 === n11 || n11.stopPropagation());
        }).on("pan", (e13) => {
          if (!t11)
            return;
          const n11 = e13.srcEvent;
          (1 !== z2.scale || e13.currentTouch.length > 1) && (h(n11), ue(v.Pan, e13));
        }).on("swipe", (e13) => {
          t11 && z2.scale > 1 && ue(v.Swipe, e13);
        }).on("tap", (e13) => {
          H2("click", e13);
        }).on("singleTap", (e13) => {
          H2("singleClick", e13);
        }).on("doubleTap", (e13) => {
          H2("dblClick", e13);
        }).on("pinch", (e13) => {
          t11 && (e13.scale > oe() ? ue(v.ZoomIn, e13) : e13.scale < oe() ? ue(v.ZoomOut, e13) : ue(v.Pan, e13));
        }).on("end", (e13) => {
          t11 && (e13.currentTouch.length ? (e13.srcEvent.stopPropagation(), h(e13.srcEvent), null == F || F.end()) : (t11 = false, ce(), le(), H2("touchEnd")));
        }).init();
      }(), C && (C.addEventListener("wheel", $, { passive: false }), D2.push(() => {
        null == C || C.removeEventListener("wheel", $, { passive: false });
      })), null == c5 || c5.addEventListener("click", _2), null === document || void 0 === document || document.addEventListener("mousemove", B2), D2.push(() => {
        null == c5 || c5.removeEventListener("click", _2), null === document || void 0 === document || document.removeEventListener("mousemove", B2);
      });
      const n10 = U();
      R2 = Object.assign({}, n10), z2 = Object.assign({}, n10), P = 3, de(), ce(), H2("ready"), requestAnimationFrame(() => {
        N2(), C && (C.style.visibility = "");
      });
    }
    function U() {
      const e11 = Object.assign({}, I2("startPos") || {});
      let t10 = e11.scale, n10 = 1;
      n10 = "string" == typeof t10 ? te(t10) : "number" == typeof t10 ? t10 : oe();
      const o9 = Object.assign(Object.assign(Object.assign({}, y), e11), { scale: n10 }), i9 = Q() ? ee(n10) : void 0;
      if (i9) {
        const { x: e12, y: t11 } = i9;
        o9.x = e12, o9.y = t11;
      }
      return o9;
    }
    function G() {
      const e11 = { top: 0, left: 0, width: 0, height: 0 };
      if (S) {
        const t10 = S.getBoundingClientRect();
        z2.angle % 180 == 90 ? (e11.top = t10.top + 0.5 * t10.height - 0.5 * t10.width, e11.left = t10.left + 0.5 * t10.width - 0.5 * t10.height, e11.width = t10.height, e11.height = t10.width) : (e11.top = t10.top, e11.left = t10.left, e11.width = t10.width, e11.height = t10.height);
      }
      return e11;
    }
    function J() {
      let t10 = I2("width"), n10 = I2("height");
      if (O2 && "auto" === t10) {
        const e11 = O2.getAttribute("width");
        t10 = e11 ? parseFloat(e11 + "") : void 0 !== O2.dataset.width ? parseFloat(O2.dataset.width + "") : p(C) ? C.naturalWidth : p(O2) ? O2.naturalWidth : (null == S ? void 0 : S.getBoundingClientRect().width) || 0;
      } else
        t10 = t2(t10) ? parseFloat(t10) : t10;
      if (O2 && "auto" === n10) {
        const e11 = O2.getAttribute("height");
        n10 = e11 ? parseFloat(e11 + "") : void 0 !== O2.dataset.height ? parseFloat(O2.dataset.height + "") : p(C) ? C.naturalHeight : p(O2) ? O2.naturalHeight : (null == S ? void 0 : S.getBoundingClientRect().height) || 0;
      } else
        n10 = t2(n10) ? parseFloat(n10) : n10;
      return { width: t10, height: n10 };
    }
    function K() {
      const e11 = G();
      return { width: e11.width, height: e11.height };
    }
    function Q() {
      return "mousemove" === I2("panMode") && matchMedia("(hover: hover)").matches;
    }
    function ee(e11) {
      const t10 = L || I2("event"), n10 = null == S ? void 0 : S.getBoundingClientRect();
      if (!t10 || !n10 || e11 <= 1)
        return { x: 0, y: 0 };
      const o9 = (t10.clientX || 0) - n10.left, a8 = (t10.clientY || 0) - n10.top, { width: s11, height: r7 } = K(), l8 = re(e11);
      if (e11 > 1) {
        const t11 = I2("mouseMoveFactor");
        t11 > 1 && (e11 *= t11);
      }
      let c6 = s11 * e11, u5 = r7 * e11, d3 = 0.5 * (c6 - s11) - o9 / s11 * 100 / 100 * (c6 - s11), f3 = 0.5 * (u5 - r7) - a8 / r7 * 100 / 100 * (u5 - r7);
      return d3 = t5(l8.x[0], d3, l8.x[1]), f3 = t5(l8.y[0], f3, l8.y[1]), { x: d3, y: f3 };
    }
    function te(e11 = "base") {
      if (!c5)
        return 1;
      const t10 = c5.getBoundingClientRect(), n10 = G(), { width: o9, height: a8 } = J(), s11 = (e12) => {
        if ("number" == typeof e12)
          return e12;
        switch (e12) {
          case "min":
          case "base":
            return 1;
          case "cover":
            return Math.max(t10.height / n10.height, t10.width / n10.width) || 1;
          case "full":
          case "max": {
            const e13 = z2.angle % 180 == 90 ? a8 : o9;
            return e13 && n10.width ? e13 / n10.width : 1;
          }
        }
      }, r7 = I2("minScale"), l8 = I2("maxScale"), u5 = Math.min(s11("full"), s11(r7)), d3 = "number" == typeof l8 ? s11("full") * l8 : Math.min(s11("full"), s11(l8));
      switch (e11) {
        case "min":
          return u5;
        case "base":
          return t5(u5, 1, d3);
        case "cover":
          return s11("cover");
        case "full":
          return Math.min(d3, s11("full"));
        case "max":
          return d3;
      }
    }
    function ne() {
      return te("min");
    }
    function oe() {
      return te("base");
    }
    function ie() {
      return te("cover");
    }
    function ae() {
      return te("full");
    }
    function se() {
      return te("max");
    }
    function re(e11) {
      const t10 = { x: [0, 0], y: [0, 0] }, n10 = null == c5 ? void 0 : c5.getBoundingClientRect();
      if (!n10)
        return t10;
      const o9 = G(), i9 = n10.width, a8 = n10.height;
      let s11 = o9.width, r7 = o9.height, l8 = e11 = void 0 === e11 ? z2.scale : e11, u5 = e11;
      if (Q() && e11 > 1) {
        const t11 = I2("mouseMoveFactor");
        t11 > 1 && (s11 * e11 > i9 + 0.01 && (l8 *= t11), r7 * e11 > a8 + 0.01 && (u5 *= t11));
      }
      return s11 *= l8, r7 *= u5, e11 > 1 && (s11 > i9 && (t10.x[0] = 0.5 * (i9 - s11), t10.x[1] = 0.5 * (s11 - i9)), t10.x[0] -= 0.5 * (o9.left - n10.left), t10.x[1] -= 0.5 * (o9.left - n10.left), t10.x[0] -= 0.5 * (o9.left + o9.width - n10.right), t10.x[1] -= 0.5 * (o9.left + o9.width - n10.right), r7 > a8 && (t10.y[0] = 0.5 * (a8 - r7), t10.y[1] = 0.5 * (r7 - a8)), t10.y[0] -= 0.5 * (o9.top - n10.top), t10.y[1] -= 0.5 * (o9.top - n10.top), t10.y[0] -= 0.5 * (o9.top + o9.height - n10.bottom), t10.y[1] -= 0.5 * (o9.top + o9.height - n10.bottom)), t10;
    }
    function le() {
      if (!W())
        return;
      if (!I2("bounds"))
        return;
      if (!F)
        return;
      const e11 = ne(), t10 = se(), n10 = t5(e11, z2.scale, t10);
      if (z2.scale < e11 - 0.01 || z2.scale > t10 + 0.01)
        return void ue(v.ZoomTo, { scale: n10 });
      if (F.isRunning())
        return;
      if (ye())
        return;
      const o9 = re(n10);
      z2.x < o9.x[0] || z2.x > o9.x[1] || z2.y < o9.y[0] || z2.y > o9.y[1] ? (z2.x = t5(o9.x[0], z2.x, o9.x[1]), z2.y = t5(o9.y[0], z2.y, o9.y[1]), F.spring({ tension: 170, friction: 17, restDelta: 1e-3, restSpeed: 1e-3, maxSpeed: 1 / 0, velocity: F.getCurrentVelocities() }), F.from(R2).to(z2).start()) : de();
    }
    function ce(e11) {
      var t10;
      if (!W())
        return;
      const n10 = be(), o9 = ye(), i9 = xe(), a8 = we(), s11 = ge(), r7 = he();
      s3(S, "is-fullsize", a8), s3(S, "is-expanded", i9), s3(S, "is-dragging", o9), s3(S, "can-drag", n10), s3(S, "will-zoom-in", s11), s3(S, "will-zoom-out", r7);
      const l8 = pe(), u5 = ve(), d3 = me(), g = !W();
      for (const n11 of (null === (t10 = e11 || c5) || void 0 === t10 ? void 0 : t10.querySelectorAll("[data-panzoom-action]")) || []) {
        const e12 = n11.dataset.panzoomAction;
        let t11 = false;
        if (g)
          t11 = true;
        else
          switch (e12) {
            case v.ZoomIn:
              l8 || (t11 = true);
              break;
            case v.ZoomOut:
              d3 || (t11 = true);
              break;
            case v.ToggleFull: {
              u5 || d3 || (t11 = true);
              const e13 = n11.querySelector("g");
              e13 && (e13.style.display = a8 && !t11 ? "none" : "");
              break;
            }
            case v.IterateZoom: {
              l8 || d3 || (t11 = true);
              const e13 = n11.querySelector("g");
              e13 && (e13.style.display = l8 || t11 ? "" : "none");
              break;
            }
            case v.ToggleCover:
            case v.ToggleMax:
              l8 || d3 || (t11 = true);
          }
        t11 ? (n11.setAttribute("aria-disabled", ""), n11.setAttribute("tabindex", "-1")) : (n11.removeAttribute("aria-disabled"), n11.removeAttribute("tabindex"));
      }
    }
    function ue(e11, t10) {
      var n10;
      if (!(e11 && c5 && O2 && F && W()))
        return;
      if (e11 === v.Swipe && Math.abs(F.getCurrentVelocities().scale) > 0.01)
        return;
      const o9 = Object.assign({}, z2);
      let a8 = Object.assign({}, z2), l8 = re(Q() ? o9.scale : R2.scale);
      const u5 = F.getCurrentVelocities(), d3 = G(), f3 = ((null === (n10 = (t10 = t10 || {}).currentTouch) || void 0 === n10 ? void 0 : n10.length) || 0) > 1, h3 = t10.velocityX || 0, m3 = t10.velocityY || 0;
      let p2 = t10.center;
      t10.srcEvent && (p2 = i2(s5(t10.srcEvent)));
      let b4 = t10.deltaX || 0, x2 = t10.deltaY || 0;
      switch (e11) {
        case v.MoveRight:
          b4 = t10.deltaX || 100;
          break;
        case v.MoveLeft:
          b4 = t10.deltaX || -100;
          break;
        case v.MoveUp:
          x2 = t10.deltaY || -100;
          break;
        case v.MoveDown:
          x2 = t10.deltaY || 100;
      }
      let w2 = [];
      switch (e11) {
        case v.Reset:
          a8 = Object.assign({}, y), a8.scale = oe();
          break;
        case v.Pan:
        case v.Move:
        case v.MoveLeft:
        case v.MoveRight:
        case v.MoveUp:
        case v.MoveDown:
          if (ye()) {
            let e13 = 1, t11 = 1;
            a8.x <= l8.x[0] && h3 <= 0 && (e13 = Math.max(0.01, 1 - Math.abs(1 / d3.width * Math.abs(a8.x - l8.x[0]))), e13 *= 0.2), a8.x >= l8.x[1] && h3 >= 0 && (e13 = Math.max(0.01, 1 - Math.abs(1 / d3.width * Math.abs(a8.x - l8.x[1]))), e13 *= 0.2), a8.y <= l8.y[0] && m3 <= 0 && (t11 = Math.max(0.01, 1 - Math.abs(1 / d3.height * Math.abs(a8.y - l8.y[0]))), t11 *= 0.2), a8.y >= l8.y[1] && m3 >= 0 && (t11 = Math.max(0.01, 1 - Math.abs(1 / d3.height * Math.abs(a8.y - l8.y[1]))), t11 *= 0.2), a8.x += b4 * e13, a8.y += x2 * t11;
          } else
            a8.x = t5(l8.x[0], a8.x + b4, l8.x[1]), a8.y = t5(l8.y[0], a8.y + x2, l8.y[1]);
          break;
        case v.Swipe:
          const e12 = (e13 = 0) => Math.sign(e13) * Math.pow(Math.abs(e13), 1.5);
          a8.x += t5(-1e3, e12(h3), 1e3), a8.y += t5(-1e3, e12(m3), 1e3), m3 && !h3 && (a8.x = t5(l8.x[0], a8.x, l8.x[1])), !m3 && h3 && (a8.y = t5(l8.y[0], a8.y, l8.y[1])), u5.x = h3, u5.y = m3;
          break;
        case v.ZoomTo:
          a8.scale = t10.scale || 1;
          break;
        case v.ZoomIn:
          a8.scale = a8.scale * (t10.scale || 2), f3 || (a8.scale = Math.min(a8.scale, se()));
          break;
        case v.ZoomOut:
          a8.scale = a8.scale * (t10.scale || 0.5), f3 || (a8.scale = Math.max(a8.scale, ne()));
          break;
        case v.ToggleCover:
          w2 = [oe(), ie()];
          break;
        case v.ToggleFull:
          w2 = [oe(), ae()];
          break;
        case v.ToggleMax:
          w2 = [oe(), se()];
          break;
        case v.IterateZoom:
          w2 = [oe(), ae(), se()];
          break;
        case v.Zoom:
          const n11 = ae();
          a8.scale >= n11 - 0.05 ? a8.scale = oe() : a8.scale = Math.min(n11, a8.scale * (t10.scale || 2));
          break;
        case v.RotateCW:
          a8.angle += 90;
          break;
        case v.RotateCCW:
          a8.angle -= 90;
          break;
        case v.FlipX:
          a8.flipX *= -1;
          break;
        case v.FlipY:
          a8.flipY *= -1;
      }
      if (void 0 !== R2.angle && Math.abs(R2.angle) >= 360 && (a8.angle -= 360 * Math.floor(R2.angle / 360), R2.angle -= 360 * Math.floor(R2.angle / 360)), w2.length) {
        const e12 = w2.findIndex((e13) => e13 > a8.scale + 1e-4);
        a8.scale = w2[e12] || w2[0];
      }
      if (f3 && (a8.scale = t5(ne() * (f3 ? 0.8 : 1), a8.scale, se() * (f3 ? 1.6 : 1))), Q()) {
        const e12 = ee(a8.scale);
        if (e12) {
          const { x: t11, y: n11 } = e12;
          a8.x = t11, a8.y = n11;
        }
      } else if (Math.abs(a8.scale - o9.scale) > 1e-4) {
        let e12 = 0, t11 = 0;
        if (p2)
          e12 = p2.x, t11 = p2.y;
        else {
          const n12 = c5.getBoundingClientRect();
          e12 = n12.x + 0.5 * n12.width, t11 = n12.y + 0.5 * n12.height;
        }
        let n11 = e12 - d3.left, s11 = t11 - d3.top;
        n11 -= 0.5 * d3.width, s11 -= 0.5 * d3.height;
        const r7 = (n11 - o9.x) / o9.scale, u6 = (s11 - o9.y) / o9.scale;
        a8.x = n11 - r7 * a8.scale, a8.y = s11 - u6 * a8.scale, !f3 && I2("bounds") && (l8 = re(a8.scale), a8.x = t5(l8.x[0], a8.x, l8.x[1]), a8.y = t5(l8.y[0], a8.y, l8.y[1]));
      }
      if (e11 === v.Swipe) {
        let e12 = 94, t11 = 17, n11 = 500 * a8.scale, o10 = u5;
        F.spring({ tension: e12, friction: t11, maxSpeed: n11, restDelta: 0.1, restSpeed: 0.1, velocity: o10 });
      } else
        e11 === v.Pan || f3 ? F.spring({ tension: 900, friction: 17, restDelta: 0.01, restSpeed: 0.01, maxSpeed: 1 }) : F.spring({ tension: 170, friction: 17, restDelta: 1e-3, restSpeed: 1e-3, maxSpeed: 1 / 0, velocity: u5 });
      if (0 === t10.velocity || n2(R2, a8))
        R2 = Object.assign({}, a8), z2 = Object.assign({}, a8), F.end(), de(), ce();
      else {
        if (n2(z2, a8))
          return;
        F.from(R2).to(a8).start();
      }
      H2("action", e11);
    }
    function de() {
      if (!O2 || !S || !C)
        return;
      const { width: e11, height: t10 } = J();
      Object.assign(S.style, { maxWidth: "min(".concat(e11, "px, 100%)"), maxHeight: "min(".concat(t10, "px, 100%)") });
      const n10 = function() {
        const { width: e12, height: t11 } = J(), { width: n11, height: o10 } = K();
        if (!c5)
          return { x: 0, y: 0, width: 0, height: 0, scale: 0, flipX: 0, flipY: 0, angle: 0, fitWidth: n11, fitHeight: o10, fullWidth: e12, fullHeight: t11 };
        let { x: i10, y: a9, scale: s12, angle: r8, flipX: l9, flipY: u6 } = R2, d4 = 1 / ae(), f4 = e12, g = t11, h3 = R2.scale * d4, m3 = z2.scale * d4;
        const p2 = Math.max(n11, o10), v3 = Math.min(n11, o10);
        e12 > t11 ? (f4 = p2, g = v3) : (f4 = v3, g = p2);
        h3 = e12 > t11 ? p2 * s12 / e12 || 1 : p2 * s12 / t11 || 1;
        let b4 = f4 ? e12 * m3 : 0, y3 = g ? t11 * m3 : 0, x2 = f4 && g ? e12 * h3 / b4 : 0;
        return i10 = i10 + 0.5 * f4 - 0.5 * b4, a9 = a9 + 0.5 * g - 0.5 * y3, { x: i10, y: a9, width: b4, height: y3, scale: x2, flipX: l9, flipY: u6, angle: r8, fitWidth: n11, fitHeight: o10, fullWidth: e12, fullHeight: t11 };
      }(), { x: o9, y: i9, width: a8, height: s11, scale: r7, angle: l8, flipX: u5, flipY: d3 } = n10;
      let f3 = "translate(".concat(m(o9), "px, ").concat(m(i9), "px)");
      f3 += 1 !== u5 || 1 !== d3 ? " scaleX(".concat(m(r7 * u5), ") scaleY(").concat(m(r7 * d3), ")") : " scale(".concat(m(r7), ")"), 0 !== l8 && (f3 += " rotate(".concat(l8, "deg)")), C.style.width = "".concat(m(a8), "px"), C.style.height = "".concat(m(s11), "px"), C.style.transform = "".concat(f3), H2("render");
    }
    function fe() {
      let e11 = z2.scale;
      const t10 = I2("clickAction");
      let n10 = oe();
      if (t10) {
        let o9 = [];
        switch (t10) {
          case v.ZoomIn:
            n10 = 2 * e11;
            break;
          case v.ZoomOut:
            n10 = 0.5 * e11;
            break;
          case v.ToggleCover:
            o9 = [oe(), ie()];
            break;
          case v.ToggleFull:
            o9 = [oe(), ae()];
            break;
          case v.ToggleMax:
            o9 = [oe(), se()];
            break;
          case v.IterateZoom:
            o9 = [oe(), ae(), se()];
            break;
          case v.Zoom:
            const t11 = ae();
            n10 = e11 >= t11 - 0.05 ? oe() : Math.min(t11, 2 * e11);
        }
        if (o9.length) {
          const t11 = o9.findIndex((t12) => t12 > e11 + 1e-4);
          n10 = o9[t11] || oe();
        }
      }
      return n10 = t5(ne(), n10, se()), n10;
    }
    function ge() {
      return !!(W() && fe() > z2.scale);
    }
    function he() {
      return !!(W() && fe() < z2.scale);
    }
    function me() {
      return !!(W() && z2.scale > ne());
    }
    function pe() {
      return !!(W() && z2.scale < se());
    }
    function ve() {
      return !!(W() && z2.scale < ae());
    }
    function be() {
      return !(!(W() && xe() && T) || Q());
    }
    function ye() {
      return !(!W() || !(null == T ? void 0 : T.isPointerDown()) || Q());
    }
    function xe() {
      return !!(W() && z2.scale > oe());
    }
    function we() {
      return !!(W() && z2.scale >= ae());
    }
    function Me() {
      const e11 = "in-fullscreen", t10 = "with-panzoom-in-fullscreen";
      null == c5 || c5.classList.toggle(e11);
      const n10 = null == c5 ? void 0 : c5.classList.contains(e11);
      n10 ? (document.documentElement.classList.add(t10), document.addEventListener("keydown", ke, true)) : (document.documentElement.classList.remove(t10), document.removeEventListener("keydown", ke, true)), de(), H2(n10 ? "enterFS" : "exitFS");
    }
    function ke(e11) {
      "Escape" !== e11.key || e11.defaultPrevented || Me();
    }
    const je = { canDrag: be, canZoomIn: pe, canZoomOut: me, canZoomToFull: ve, destroy: function() {
      H2("destroy");
      for (const e11 of Object.values(Y))
        null == e11 || e11.destroy(je);
      for (const e11 of D2)
        e11();
      return S && (S.style.aspectRatio = "", S.style.maxWidth = "", S.style.maxHeight = ""), C && (C.style.width = "", C.style.height = "", C.style.transform = ""), S = void 0, O2 = void 0, C = void 0, R2 = Object.assign({}, y), z2 = Object.assign({}, y), null == F || F.destroy(), F = void 0, null == T || T.destroy(), T = void 0, P = 4, je;
    }, emit: H2, execute: ue, getBoundaries: re, getContainer: function() {
      return c5;
    }, getContent: function() {
      return O2;
    }, getFullDim: J, getGestures: function() {
      return T;
    }, getMousemovePos: ee, getOptions: function() {
      return X;
    }, getPlugins: function() {
      return Y;
    }, getScale: te, getStartPosition: U, getState: function() {
      return P;
    }, getTransform: function(e11) {
      return true === e11 ? z2 : R2;
    }, getTween: function() {
      return F;
    }, getViewport: function() {
      return C;
    }, getWrapper: function() {
      return S;
    }, init: function() {
      return P = 0, H2("init"), function() {
        for (const [e11, t10] of Object.entries(Object.assign(Object.assign({}, E3), X.plugins || {})))
          if (e11 && !Y[e11] && t10 instanceof Function) {
            const n10 = t10();
            n10.init(je), Y[e11] = n10;
          }
        H2("initPlugins");
      }(), function() {
        const e11 = Object.assign(Object.assign({}, x.classes), I2("classes"));
        if (!c5)
          return;
        if (s(c5, e11.container), O2 = c5.querySelector("." + e11.content), !O2)
          return;
        O2.setAttribute("draggable", "false"), S = c5.querySelector("." + e11.wrapper), S || (S = document.createElement("div"), s(S, e11.wrapper), O2.insertAdjacentElement("beforebegin", S), S.insertAdjacentElement("afterbegin", O2));
        C = c5.querySelector("." + e11.viewport), C || (C = document.createElement("div"), s(C, e11.viewport), C.insertAdjacentElement("afterbegin", O2), S.insertAdjacentElement("beforeend", C));
        A2 = O2.cloneNode(true), A2.removeAttribute("id"), S.insertAdjacentElement("afterbegin", A2), O2 instanceof HTMLPictureElement && (O2 = O2.querySelector("img"));
        A2 instanceof HTMLPictureElement && (A2 = A2.querySelector("img"));
        C instanceof HTMLPictureElement && (C = C.querySelector("img"));
        if (C && (C.style.visibility = "hidden", I2("protected"))) {
          C.addEventListener("contextmenu", (e13) => {
            h(e13);
          });
          const e12 = document.createElement("div");
          s(e12, "f-panzoom__protected"), C.appendChild(e12);
        }
        H2("initLayout");
      }(), function() {
        if (c5 && S && !Z) {
          let e11 = null;
          Z = new ResizeObserver(() => {
            W() && (e11 = e11 || requestAnimationFrame(() => {
              W() && (ce(), le(), H2("refresh")), e11 = null;
            }));
          }), Z.observe(S), D2.push(() => {
            null == Z || Z.disconnect(), Z = void 0, e11 && (cancelAnimationFrame(e11), e11 = null);
          });
        }
      }(), function() {
        if (!c5 || !O2)
          return;
        if (!p(O2) || !p(A2))
          return void V();
        const e11 = () => {
          O2 && p(O2) && O2.decode().then(() => {
            V();
          }).catch(() => {
            V();
          });
        };
        if (P = 1, c5.classList.add("is-loading"), H2("loading"), A2.src && A2.complete)
          return void e11();
        (function() {
          if (!c5)
            return;
          if (null == c5 ? void 0 : c5.querySelector(".f-spinner"))
            return;
          const e12 = I2("spinnerTpl"), t10 = e(e12);
          t10 && (t10.classList.add("f-spinner"), c5.classList.add("is-loading"), null == S || S.insertAdjacentElement("afterbegin", t10));
        })(), A2.addEventListener("load", e11, false), A2.addEventListener("error", e11, false), D2.push(() => {
          null == A2 || A2.removeEventListener("load", e11, false), null == A2 || A2.removeEventListener("error", e11, false);
        });
      }(), je;
    }, isDragging: ye, isExpanded: xe, isFullsize: we, isMousemoveMode: Q, localize: function(e11, t10 = []) {
      const n10 = I2("l10n") || {};
      e11 = String(e11).replace(/\{\{(\w+)\}\}/g, (e12, t11) => n10[t11] || e12);
      for (let n11 = 0; n11 < t10.length; n11++)
        e11 = e11.split(t10[n11][0]).join(t10[n11][1]);
      return e11 = e11.replace(/\{\{(.*?)\}\}/g, (e12, t11) => t11);
    }, off: function(e11, t10) {
      for (const n10 of e11 instanceof Array ? e11 : [e11])
        q2.has(n10) && q2.set(n10, q2.get(n10).filter((e12) => e12 !== t10));
      return je;
    }, on: function(e11, t10) {
      for (const n10 of e11 instanceof Array ? e11 : [e11])
        q2.set(n10, [...q2.get(n10) || [], t10]);
      return je;
    }, toggleFS: Me, updateControls: ce, version: "6.1.5", willZoomIn: ge, willZoomOut: he };
    return je;
  };
  E.l10n = { en_EN: e7 }, E.getDefaults = () => x;

  // node_modules/@fancyapps/ui/dist/utils/getDirectChildren.js
  var e8 = (e11, o9) => {
    let t10 = [];
    return e11.childNodes.forEach((e12) => {
      e12.nodeType !== Node.ELEMENT_NODE || o9 && !e12.matches(o9) || t10.push(e12);
    }), t10;
  };

  // node_modules/@fancyapps/ui/dist/carousel/l10n/en_EN.js
  var o3 = Object.assign(Object.assign({}, e7), { ERROR: "Something went wrong. <br /> Please try again later.", NEXT: "Next page", PREV: "Previous page", GOTO: "Go to page #%d", DOWNLOAD: "Download", TOGGLE_FULLSCREEN: "Toggle full-screen mode", TOGGLE_EXPAND: "Toggle full-size mode", TOGGLE_THUMBS: "Toggle thumbnails", TOGGLE_AUTOPLAY: "Toggle slideshow" });

  // node_modules/@fancyapps/ui/dist/carousel/carousel.js
  var m2 = (t10) => {
    t10.cancelable && t10.preventDefault();
  };
  var h2 = { adaptiveHeight: false, center: true, classes: { container: "f-carousel", isEnabled: "is-enabled", isLTR: "is-ltr", isRTL: "is-rtl", isHorizontal: "is-horizontal", isVertical: "is-vertical", hasAdaptiveHeight: "has-adaptive-height", viewport: "f-carousel__viewport", slide: "f-carousel__slide", isSelected: "is-selected" }, dragFree: false, enabled: true, errorTpl: '<div class="f-html">{{ERROR}}</div>', fill: false, infinite: true, initialPage: 0, l10n: o3, rtl: false, slides: [], slidesPerPage: "auto", spinnerTpl: '<div class="f-spinner"></div>', transition: "fade", tween: { clamp: true, mass: 1, tension: 160, friction: 25, restDelta: 1, restSpeed: 1, velocity: 0 }, vertical: false };
  var b2;
  var y2 = 0;
  var E2 = (g, x2 = {}, w2 = {}) => {
    y2++;
    let M3, S, j2, A2, L, P = 0, T = Object.assign({}, h2), O2 = Object.assign({}, h2), R2 = {}, H2 = null, C = null, V = false, D2 = false, $ = false, q2 = false, I2 = "height", F = 0, z2 = true, k3 = 0, B2 = 0, N2 = 0, _2 = 0, G = "*", X = [], Y = [];
    const W = /* @__PURE__ */ new Set();
    let J = [], K = [], Q = 0, U = 0, Z = 0;
    function tt(t10, ...e11) {
      let n10 = O2[t10];
      return n10 && n10 instanceof Function ? n10($t, ...e11) : n10;
    }
    function et(t10, e11 = []) {
      const n10 = tt("l10n") || {};
      t10 = String(t10).replace(/\{\{(\w+)\}\}/g, (t11, e12) => n10[e12] || t11);
      for (let n11 = 0; n11 < e11.length; n11++)
        t10 = t10.split(e11[n11][0]).join(e11[n11][1]);
      return t10 = t10.replace(/\{\{(.*?)\}\}/g, (t11, e12) => e12);
    }
    const nt = /* @__PURE__ */ new Map();
    function it(t10, ...e11) {
      const n10 = [...nt.get(t10) || []];
      O2.on && n10.push(O2.on[t10]);
      for (const t11 of n10)
        t11 && t11 instanceof Function && t11($t, ...e11);
      "*" !== t10 && it("*", t10, ...e11);
    }
    function ot() {
      var e11, n10;
      const i9 = r({}, h2, T);
      r(i9, h2, T);
      let r7 = "";
      const l8 = T.breakpoints || {};
      if (l8)
        for (const [t10, e12] of Object.entries(l8))
          window.matchMedia(t10).matches && (r7 += t10, r(i9, e12));
      if (void 0 === L || r7 !== L) {
        if (L = r7, 0 !== P) {
          let t10 = null === (n10 = null === (e11 = K[k3]) || void 0 === e11 ? void 0 : e11.slides[0]) || void 0 === n10 ? void 0 : n10.index;
          void 0 === t10 && (t10 = O2.initialSlide), i9.initialSlide = t10, i9.slides = [];
          for (const t11 of X)
            t11.isVirtual && i9.slides.push(t11);
        }
        Ct(), O2 = i9, false !== tt("enabled") && (P = 0, it("init"), function() {
          for (const [t10, e12] of Object.entries(Object.assign(Object.assign({}, w2), O2.plugins || {})))
            if (t10 && !R2[t10] && e12 instanceof Function) {
              const n11 = e12();
              n11.init($t, E2), R2[t10] = n11;
            }
          it("initPlugins");
        }(), function() {
          if (!H2)
            return;
          const e12 = tt("classes") || {};
          s(H2, e12.container);
          const n11 = tt("style");
          if (n11 && t(n11))
            for (const [t10, e13] of Object.entries(n11))
              H2.style.setProperty(t10, e13);
          C = H2.querySelector(".".concat(e12.viewport)), C || (C = document.createElement("div"), s(C, e12.viewport), C.append(...e8(H2, ".".concat(e12.slide))), H2.insertAdjacentElement("afterbegin", C)), H2.carousel = $t, it("initLayout");
        }(), function() {
          if (!C)
            return;
          const t10 = tt("classes") || {};
          X = [], [...e8(C, ".".concat(t10.slide))].forEach((t11) => {
            if (t11.parentElement) {
              const e12 = ht(Object.assign({ el: t11, isVirtual: false }, t11.dataset || {}));
              it("createSlide", e12), X.push(e12);
            }
          }), xt();
          for (const t11 of X)
            it("addSlide", t11);
          mt(tt("slides"));
          for (const t11 of X) {
            const e12 = t11.el;
            (null == e12 ? void 0 : e12.parentElement) === C && (s(e12, O2.classes.slide), s(e12, t11.class), Tt(t11), it("attachSlideEl", t11));
          }
          it("initSlides");
        }(), wt(), P = 1, s(H2, (tt("classes") || {}).isEnabled || ""), Ht(), ct(), S = c().on("start", () => {
          M3 && M3.isPointerDown() || (at(), Ht());
        }).on("step", (t10) => {
          const e12 = F;
          F = t10.pos, F !== e12 && (z2 = false, Ht());
        }).on("end", (t10) => {
          (null == M3 ? void 0 : M3.isPointerDown()) || (F = t10.pos, S && !D2 && (F < N2 || F > _2) ? S.spring({ clamp: true, mass: 1, tension: 200, friction: 25, velocity: 0, restDelta: 1, restSpeed: 1 }).from({ pos: F }).to({ pos: t5(N2, F, _2) }).start() : z2 || (z2 = true, it("settle")));
        }), rt(), function() {
          if (!H2 || !C)
            return;
          H2.addEventListener("click", At), document.addEventListener("mousemove", st);
          const t10 = C.getBoundingClientRect();
          if (Q = t10.height, U = t10.width, !j2) {
            let t11 = null;
            j2 = new ResizeObserver(() => {
              t11 || (t11 = requestAnimationFrame(() => {
                !function() {
                  if (1 !== P || !C)
                    return;
                  const t12 = K.length, e12 = C.getBoundingClientRect(), n11 = e12.height, i10 = e12.width;
                  t12 > 1 && (q2 && Math.abs(n11 - Q) < 0.5 || !q2 && Math.abs(i10 - U) < 0.5) || (wt(), rt(), Q = n11, U = i10, q2 && !n11 || !q2 && !i10 || H2 && C && (t12 === K.length && (null == M3 ? void 0 : M3.isPointerDown()) || (tt("dragFree") && (D2 || F > N2 && F < _2) ? (at(), Ht()) : Ot(k3, { transition: false }))));
                }(), t11 = null;
              }));
            }), j2.observe(C);
          }
        }(), it("ready"));
      }
    }
    function st(t10) {
      b2 = t10;
    }
    function rt() {
      false === tt("gestures") ? M3 && (M3.destroy(), M3 = void 0) : M3 || function() {
        const t10 = tt("gestures");
        !M3 && false !== t10 && C && (M3 = f(C, t10).on("start", (t11) => {
          var e11, n10;
          if (!S)
            return;
          if (false === tt("gestures", t11))
            return;
          const { srcEvent: o9 } = t11;
          q2 && e6(o9) && !t3(o9.target) && m2(o9), S.pause(), S.getCurrentVelocities().pos = 0;
          const s11 = null === (e11 = K[k3]) || void 0 === e11 ? void 0 : e11.slides[0], r7 = null == s11 ? void 0 : s11.el;
          s11 && W.has(s11.index) && r7 && (F = s11.offset || 0, F += (function(t12) {
            const e12 = window.getComputedStyle(t12), n11 = new DOMMatrixReadOnly(e12.transform);
            return { width: n11.m41 || 0, height: n11.m42 || 0 };
          }(r7)[I2] || 0) * ($ && !q2 ? 1 : -1)), D2 || (F < N2 || F > _2) && S.spring({ clamp: true, mass: 1, tension: 500, friction: 25, velocity: (null === (n10 = S.getCurrentVelocities()) || void 0 === n10 ? void 0 : n10.pos) || 0, restDelta: 1, restSpeed: 1 }).from({ pos: F }).to({ pos: t5(N2, F, _2) }).start(), St();
        }).on("move", (t11) => {
          var e11, n10;
          if (false === tt("gestures", t11))
            return;
          const { srcEvent: o9, axis: s11, deltaX: r7, deltaY: l8 } = t11;
          if (e6(o9) && (null === (e11 = o9.touches) || void 0 === e11 ? void 0 : e11.length) > 1)
            return;
          const a8 = o9.target, c5 = t3(a8), d3 = c5 ? c5.scrollHeight > c5.clientHeight ? "y" : "x" : void 0;
          if (c5 && (!s11 || s11 === d3))
            return;
          if (!s11)
            return m2(o9), o9.stopPropagation(), void o9.stopImmediatePropagation();
          if ("y" === s11 && !q2 || "x" === s11 && q2)
            return;
          if (m2(o9), o9.stopPropagation(), !S)
            return;
          const u5 = $ && !q2 ? 1 : -1, f3 = q2 ? l8 : r7;
          let v3 = (null == S ? void 0 : S.isRunning()) ? S.getEndValues().pos : F, g2 = 1;
          D2 || (v3 <= N2 && f3 * u5 < 0 ? (g2 = Math.max(0.01, 1 - (Math.abs(1 / vt() * Math.abs(v3 - N2)) || 0)), g2 *= 0.2) : v3 >= _2 && f3 * u5 > 0 && (g2 = Math.max(0.01, 1 - (Math.abs(1 / vt() * Math.abs(v3 - _2)) || 0)), g2 *= 0.2)), v3 += f3 * g2 * u5, S.spring({ clamp: true, mass: 1, tension: 700, friction: 25, velocity: (null === (n10 = S.getCurrentVelocities()) || void 0 === n10 ? void 0 : n10.pos) || 0, restDelta: 1, restSpeed: 1 }).from({ pos: F }).to({ pos: v3 }).start();
        }).on("panstart", (t11) => {
          false !== tt("gestures", t11) && (null == t11 ? void 0 : t11.axis) === (q2 ? "y" : "x") && s(C, "is-dragging");
        }).on("panend", (t11) => {
          false !== tt("gestures", t11) && s2(C, "is-dragging");
        }).on("end", (t11) => {
          var e11, n10;
          if (false === tt("gestures", t11))
            return;
          const { srcEvent: o9, axis: s11, velocityX: r7, velocityY: l8, currentTouch: c5 } = t11;
          if (c5.length > 0 || !S)
            return;
          const d3 = o9.target, u5 = t3(d3), f3 = u5 ? u5.scrollHeight > u5.clientHeight ? "y" : "x" : void 0, v3 = u5 && (!s11 || s11 === f3);
          q2 && e6(o9) && !t11.axis && At(o9);
          const g2 = K.length, m3 = tt("dragFree");
          if (!g2)
            return;
          const h3 = v3 ? 0 : tt("vertical") ? l8 : r7;
          let b3 = (null == S ? void 0 : S.isRunning()) ? S.getEndValues().pos : F;
          const y3 = $ && !q2 ? 1 : -1;
          if (v3 || (b3 += h3 * (m3 ? 5 : 1) * y3), !D2 && (h3 * y3 <= 0 && b3 < N2 || h3 * y3 >= 0 && b3 > _2)) {
            let t12 = 0;
            return Math.abs(h3) > 0 && (t12 = 2 * Math.abs(h3), t12 = Math.min(0.3 * vt(), t12)), b3 = t5(N2 + -1 * t12, b3, _2 + t12), void S.spring({ clamp: true, mass: 1, tension: 380, friction: 25, velocity: -1 * h3, restDelta: 1, restSpeed: 1 }).from({ pos: F }).to({ pos: b3 }).start();
          }
          if (m3 || (null === (e11 = R2.Autoscroll) || void 0 === e11 ? void 0 : e11.isEnabled()))
            return void (Math.abs(h3) > 10 ? S.spring({ clamp: true, mass: 1, tension: 150, friction: 25, velocity: -1 * h3, restDelta: 1, restSpeed: 1 }).from({ pos: F }).to({ pos: b3 }).start() : S.isRunning() || z2 || (z2 = true, it("settle")));
          if (!m3 && !(null === (n10 = R2.Autoscroll) || void 0 === n10 ? void 0 : n10.isEnabled()) && (!t11.offsetX && !t11.offsetY || "y" === s11 && !q2 || "x" === s11 && q2))
            return void Ot(k3, { transition: "tween" });
          let E3 = ut(b3);
          Math.abs(h3) > 10 && E3 === k3 && (E3 += h3 > 0 ? $ && !q2 ? 1 : -1 : $ && !q2 ? -1 : 1), Ot(E3, { transition: "tween", tween: { velocity: -1 * h3 } });
        }).init());
      }(), s3(C, "is-draggable", !!M3 && K.length > 0);
    }
    function lt(t10 = "*") {
      var e11;
      const n10 = [];
      for (const i9 of X)
        ("*" === t10 || i9.class && i9.class.includes(t10) || i9.el && (null === (e11 = i9.el) || void 0 === e11 ? void 0 : e11.classList.contains(t10))) && n10.push(i9);
      A2 = void 0, G = t10, Y = [...n10];
    }
    function at() {
      if (!S)
        return;
      const t10 = ut((null == S ? void 0 : S.isRunning()) ? S.getEndValues().pos : F);
      t10 !== k3 && (A2 = k3, k3 = t10, Tt(), ct(), dt(), it("change", k3, A2));
    }
    function ct() {
      var t10, e11;
      if (!H2)
        return;
      for (const t11 of H2.querySelectorAll("[data-carousel-index]"))
        t11.innerHTML = k3 + "";
      for (const t11 of H2.querySelectorAll("[data-carousel-page]"))
        t11.innerHTML = k3 + 1 + "";
      for (const t11 of H2.querySelectorAll("[data-carousel-pages]"))
        t11.innerHTML = K.length + "";
      for (const e12 of H2.querySelectorAll("[data-carousel-go-to]")) {
        parseInt((null === (t10 = e12.dataset) || void 0 === t10 ? void 0 : t10.carouselGoTo) || "-1", 10) === k3 ? e12.setAttribute("aria-current", "true") : e12.removeAttribute("aria-current");
      }
      for (const t11 of H2.querySelectorAll("[data-carousel-go-prev]"))
        t11.toggleAttribute("aria-disabled", !Vt()), Vt() ? t11.removeAttribute("tabindex") : t11.setAttribute("tabindex", "-1");
      for (const t11 of H2.querySelectorAll("[data-carousel-go-next]"))
        t11.toggleAttribute("aria-disabled", !Dt()), Dt() ? t11.removeAttribute("tabindex") : t11.setAttribute("tabindex", "-1");
      let n10 = false;
      const i9 = null === (e11 = K[k3]) || void 0 === e11 ? void 0 : e11.slides[0];
      i9 && (i9.downloadSrc || "image" === i9.type && i9.src) && (n10 = true);
      for (const t11 of H2.querySelectorAll("[data-carousel-download]"))
        t11.toggleAttribute("aria-disabled", !n10);
    }
    function dt(t10) {
      var e11;
      t10 || (t10 = null === (e11 = K[k3]) || void 0 === e11 ? void 0 : e11.slides[0]);
      const n10 = null == t10 ? void 0 : t10.el;
      if (n10)
        for (const e12 of n10.querySelectorAll("[data-slide-index]"))
          e12.innerHTML = t10.index + 1 + "";
    }
    function ut(t10) {
      var e11, n10, i9;
      if (!K.length)
        return 0;
      const o9 = pt();
      let s11 = t10;
      D2 ? s11 -= Math.floor((t10 - (null === (e11 = K[0]) || void 0 === e11 ? void 0 : e11.pos)) / o9) * o9 || 0 : s11 = t5(null === (n10 = K[0]) || void 0 === n10 ? void 0 : n10.pos, t10, null === (i9 = K[K.length - 1]) || void 0 === i9 ? void 0 : i9.pos);
      const r7 = /* @__PURE__ */ new Map();
      let l8 = 0;
      for (const t11 of K) {
        const e12 = Math.abs(t11.pos - s11), n11 = Math.abs(t11.pos - s11 - o9), i10 = Math.abs(t11.pos - s11 + o9), a8 = Math.min(e12, n11, i10);
        r7.set(l8, a8), l8++;
      }
      const c5 = r7.size > 0 ? [...r7.entries()].reduce((t11, e12) => e12[1] < t11[1] ? e12 : t11) : [k3, 0];
      return parseInt(c5[0]);
    }
    function ft() {
      return Z;
    }
    function vt() {
      let t10 = 0;
      return C && (C.childElementCount || (C.style.display = "grid"), t10 = C.getBoundingClientRect()[I2] || 0, C.style.display = ""), t10;
    }
    function pt(t10 = true) {
      return Y.length ? Y.reduce((t11, e11) => t11 + e11.dim, 0) + (Y.length - (D2 && t10 ? 0 : 1)) * Z : 0;
    }
    function gt(t10) {
      const e11 = pt(), n10 = vt();
      if (!e11 || !C || !n10)
        return [];
      const i9 = [];
      t10 = void 0 === t10 ? F : t10, D2 && (t10 -= Math.floor(t10 / e11) * e11 || 0);
      let o9 = 0, s11 = 0;
      if (V) {
        const t11 = C.getBoundingClientRect();
        o9 = Math.abs(t11[q2 ? "top" : "left"]), s11 = Math.abs(window[q2 ? "innerHeight" : "innerWidth"] - t11[q2 ? "bottom" : "right"]);
      }
      let r7 = 0;
      for (let l8 of Y) {
        const a8 = (e12 = 0) => {
          i9.indexOf(l8) > -1 || (l8.pos = r7 - t10 + e12 || 0, l8.offset + e12 > t10 - l8.dim - o9 + 0.51 && l8.offset + e12 < t10 + n10 + s11 - 0.51 && i9.push(l8));
        };
        l8.offset = r7, D2 && (a8(e11), a8(-1 * e11)), a8(), r7 += l8.dim + Z;
      }
      return i9;
    }
    function mt(t10, e11) {
      const n10 = [];
      for (const e12 of Array.isArray(t10) ? t10 : [t10]) {
        const t11 = ht(Object.assign(Object.assign({}, e12), { isVirtual: true }));
        t11.el || (t11.el = document.createElement("div")), it("createSlide", t11), n10.push(t11);
      }
      X.splice(void 0 === e11 ? X.length : e11, 0, ...n10), xt();
      for (const t11 of n10)
        it("addSlide", t11), bt(t11);
      return lt(G), n10;
    }
    function ht(t10) {
      return (t2(t10) || t10 instanceof HTMLElement) && (t10 = { html: t10 }), Object.assign({ index: -1, el: void 0, class: "", isVirtual: true, dim: 0, pos: 0, offset: 0, html: "", src: "" }, t10);
    }
    function bt(t10) {
      let e11 = t10.el;
      if (!t10 || !e11)
        return;
      const n10 = t10.html ? t10.html instanceof HTMLElement ? t10.html : e(t10.html) : void 0;
      n10 && (s(n10, "f-html"), t10.htmlEl = n10, s(e11, "has-html"), e11.append(n10), it("contentReady", t10));
    }
    function yt(t10) {
      if (!C || !t10)
        return;
      let e11 = t10.el;
      if (e11) {
        if (e11.setAttribute("index", t10.index + ""), e11.parentElement !== C) {
          let n10;
          s(e11, O2.classes.slide), s(e11, t10.class), Tt(t10);
          for (const e12 of X)
            if (e12.index > t10.index) {
              n10 = e12.el;
              break;
            }
          C.insertBefore(e11, n10 && C.contains(n10) ? n10 : null), it("attachSlideEl", t10);
        }
        return dt(t10), e11;
      }
    }
    function Et(t10) {
      const e11 = null == t10 ? void 0 : t10.el;
      e11 && (e11.remove(), Mt(e11), it("detachSlideEl", t10));
    }
    function xt() {
      for (let t10 = 0; t10 < X.length; t10++) {
        const e11 = X[t10], n10 = e11.el;
        n10 && (e11.index !== t10 && Mt(n10), n10.setAttribute("index", "".concat(t10))), e11.index = t10;
      }
    }
    function wt() {
      var t10, n10, i9, o9, s11;
      if (!H2 || !C)
        return;
      $ = tt("rtl"), q2 = tt("vertical"), I2 = q2 ? "height" : "width";
      const r7 = tt("classes");
      if (s3(H2, r7.isLTR, !$), s3(H2, r7.isRTL, $), s3(H2, r7.isHorizontal, !q2), s3(H2, r7.isVertical, q2), s3(H2, r7.hasAdaptiveHeight, tt("adaptiveHeight")), !vt())
        return;
      const l8 = window.getComputedStyle(C);
      V = "visible" === l8.getPropertyValue("overflow-" + (q2 ? "y" : "x")), Z = C && parseFloat(l8.getPropertyValue("--f-carousel-gap")) || 0;
      const d3 = function() {
        let t11 = 0;
        if (C) {
          let e11 = document.createElement("div");
          e11.style.display = "block", s(e11, O2.classes.slide), C.appendChild(e11), t11 = e11.getBoundingClientRect()[I2], e11.remove(), e11 = void 0;
        }
        return t11;
      }();
      for (const n11 of Y) {
        const i10 = n11.el;
        let o10 = 0;
        if (!n11.isVirtual && i10 && n(i10)) {
          let e11 = false;
          i10.parentElement && i10.parentElement === C || (C.appendChild(i10), e11 = true), o10 = i10.getBoundingClientRect()[I2], e11 && (null === (t10 = i10.parentElement) || void 0 === t10 || t10.removeChild(i10));
        } else
          o10 = d3;
        n11.dim = o10;
      }
      if (D2 = false, tt("infinite")) {
        D2 = true;
        const t11 = pt();
        let e11 = vt();
        if (V) {
          const t12 = C.getBoundingClientRect();
          e11 += t12.left, e11 += t12.right - t12.width;
        }
        for (let i10 = 0; i10 < Y.length; i10++) {
          const o10 = (null === (n10 = Y[i10]) || void 0 === n10 ? void 0 : n10.dim) + Z;
          if (t11 - o10 < e11 && t11 - o10 - e11 < o10) {
            D2 = false;
            break;
          }
        }
      }
      !function() {
        var t11;
        if (!H2)
          return;
        const e11 = vt(), n11 = pt(false);
        let i10 = tt("slidesPerPage");
        i10 = "auto" === i10 ? 1 / 0 : parseFloat(i10 + ""), K = [];
        let o10 = 0, s12 = 0;
        for (const n12 of Y)
          (!K.length || o10 + n12.dim - e11 > 0.05 || s12 >= i10) && (K.push({ index: K.length, slides: [], dim: 0, offset: 0, pos: 0 }), o10 = 0, s12 = 0), null === (t11 = K[K.length - 1]) || void 0 === t11 || t11.slides.push(n12), o10 += n12.dim + Z, s12++;
        const r8 = tt("center"), l9 = tt("fill");
        let c5 = 0;
        for (const t12 of K) {
          t12.dim = (t12.slides.length - 1) * Z;
          for (const e12 of t12.slides)
            t12.dim += e12.dim;
          t12.offset = c5, t12.pos = c5, false !== r8 && (t12.pos -= 0.5 * (e11 - t12.dim)), l9 && !D2 && n11 > e11 && (t12.pos = t5(0, t12.pos, n11 - e11)), c5 += t12.dim + Z;
        }
        const d4 = [];
        let u5;
        for (const t12 of K) {
          const e12 = Object.assign({}, t12);
          u5 && Math.abs(e12.pos - u5.pos) < 0.1 ? (u5.dim += e12.dim, u5.slides = [...u5.slides, ...e12.slides]) : (u5 = e12, e12.index = d4.length, d4.push(e12));
        }
        K = d4, k3 = t5(0, k3, K.length - 1);
      }(), N2 = (null === (i9 = K[0]) || void 0 === i9 ? void 0 : i9.pos) || 0, _2 = (null === (o9 = K[K.length - 1]) || void 0 === o9 ? void 0 : o9.pos) || 0, 0 === P ? function() {
        var t11;
        A2 = void 0, k3 = tt("initialPage");
        const e11 = tt("initialSlide") || void 0;
        void 0 !== e11 && (k3 = $t.getPageIndex(e11) || 0), k3 = t5(0, k3, K.length - 1), F = (null === (t11 = K[k3]) || void 0 === t11 ? void 0 : t11.pos) || 0, B2 = F;
      }() : B2 = (null === (s11 = K[k3 || 0]) || void 0 === s11 ? void 0 : s11.pos) || 0, it("refresh"), ct();
    }
    function Mt(t10) {
      if (!t10 || !n(t10))
        return;
      const n10 = parseInt(t10.getAttribute("index") || "-1");
      let i9 = "";
      for (const e11 of Array.from(t10.classList)) {
        const t11 = e11.match(/^f-(\w+)(Out|In)$/);
        t11 && t11[1] && (i9 = t11[1] + "");
      }
      if (!t10 || !i9)
        return;
      const o9 = ["f-".concat(i9, "Out"), "f-".concat(i9, "In"), "to-prev", "to-next", "from-prev", "from-next"];
      t10.removeEventListener("animationend", jt), s2(t10, o9.join(" ")), W.delete(n10);
    }
    function St() {
      if (!C)
        return;
      const t10 = W.size > 0;
      for (const t11 of Y)
        Mt(t11.el);
      W.clear(), t10 && Ht();
    }
    function jt(t10) {
      var e11;
      "f-" === (null === (e11 = t10.animationName) || void 0 === e11 ? void 0 : e11.substring(0, 2)) && (Mt(t10.target), W.size || (s2(H2, "in-transition"), !z2 && Math.abs($t.getPosition(true) - B2) < 0.5 && (z2 = true, it("settle"))), Ht());
    }
    function At(t10) {
      var e11;
      if (t10.defaultPrevented)
        return;
      const n10 = t10.composedPath()[0];
      if (n10.closest("[data-carousel-go-prev]"))
        return m2(t10), void $t.prev();
      if (n10.closest("[data-carousel-go-next]"))
        return m2(t10), void $t.next();
      const i9 = n10.closest("[data-carousel-go-to]");
      if (i9)
        return m2(t10), void $t.goTo(parseFloat(i9.dataset.carouselGoTo || "") || 0);
      if (n10.closest("[data-carousel-download]")) {
        m2(t10);
        const n11 = null === (e11 = K[k3]) || void 0 === e11 ? void 0 : e11.slides[0];
        if (n11 && (n11.downloadSrc || "image" === n11.type && n11.src)) {
          const t11 = n11.downloadFilename, e12 = document.createElement("a"), i10 = n11.downloadSrc || n11.src || "";
          e12.href = i10, e12.target = "_blank", e12.download = t11 || i10, e12.click();
        }
      } else
        it("click", t10);
    }
    function Lt(t10) {
      var e11;
      const n10 = t10.el;
      n10 && (null === (e11 = n10.querySelector(".f-spinner")) || void 0 === e11 || e11.remove());
    }
    function Pt(t10) {
      var e11;
      const n10 = t10.el;
      n10 && (null === (e11 = n10.querySelector(".f-html.is-error")) || void 0 === e11 || e11.remove(), s2(n10, "has-error"));
    }
    function Tt(t10) {
      var e11;
      t10 || (t10 = null === (e11 = K[k3]) || void 0 === e11 ? void 0 : e11.slides[0]);
      const i9 = null == t10 ? void 0 : t10.el;
      if (!i9)
        return;
      let o9 = tt("formatCaption", t10);
      void 0 === o9 && (o9 = t10.caption), o9 = o9 || "";
      const s11 = tt("captionEl");
      if (s11 && s11 instanceof HTMLElement) {
        if (t10.index !== k3)
          return;
        if (t2(o9) && (s11.innerHTML = et(o9 + "")), o9 instanceof HTMLElement) {
          if (o9.parentElement === s11)
            return;
          s11.innerHTML = "", o9.parentElement && (o9 = o9.cloneNode(true)), s11.append(o9);
        }
        return;
      }
      if (!o9)
        return;
      let r7 = t10.captionEl || i9.querySelector(".f-caption");
      !r7 && o9 instanceof HTMLElement && o9.classList.contains("f-caption") && (r7 = o9), r7 || (r7 = document.createElement("div"), s(r7, "f-caption"), t2(o9) ? r7.innerHTML = et(o9 + "") : o9 instanceof HTMLElement && (o9.parentElement && (o9 = o9.cloneNode(true)), r7.append(o9)));
      const l8 = "f-caption-".concat(y2, "_").concat(t10.index);
      r7.setAttribute("id", l8), r7.dataset.selectable = "true", s(i9, "has-caption"), i9.setAttribute("aria-labelledby", l8), t10.captionEl = r7, i9.insertAdjacentElement("beforeend", r7);
    }
    function Ot(e11, i9 = {}) {
      var o9, r7;
      let { transition: l8, tween: u5 } = Object.assign({ transition: O2.transition, tween: O2.tween }, i9 || {});
      if (!H2 || !S)
        return;
      const f3 = K.length;
      if (!f3)
        return;
      if (function(t10, e12) {
        var i10, o10, s11, r8;
        if (!(H2 && S && e12 && t2(e12) && "tween" !== e12))
          return false;
        if ((null === (i10 = K[k3]) || void 0 === i10 ? void 0 : i10.slides.length) > 1)
          return false;
        const l9 = K.length;
        let u6 = t10 > k3 ? 1 : -1;
        t10 = D2 ? (t10 % l9 + l9) % l9 : t5(0, t10, l9 - 1), $ && (u6 *= -1);
        const f4 = null === (o10 = K[k3]) || void 0 === o10 ? void 0 : o10.slides[0], v4 = null == f4 ? void 0 : f4.index, p3 = null === (s11 = K[t10]) || void 0 === s11 ? void 0 : s11.slides[0], g2 = null == p3 ? void 0 : p3.index, m3 = null === (r8 = K[t10]) || void 0 === r8 ? void 0 : r8.pos;
        if (void 0 === g2 || void 0 === v4 || v4 === g2 || F === m3 || Math.abs(vt() - ((null == p3 ? void 0 : p3.dim) || 0)) > 1)
          return false;
        z2 = false, S.pause(), St(), s(H2, "in-transition"), F = B2 = m3;
        const h3 = yt(f4), b3 = yt(p3);
        return at(), h3 && (W.add(v4), h3.style.transform = "", h3.addEventListener("animationend", jt), s2(h3, O2.classes.isSelected), h3.inert = false, s(h3, "f-".concat(e12, "Out to-").concat(u6 > 0 ? "next" : "prev"))), b3 && (W.add(g2), b3.style.transform = "", b3.addEventListener("animationend", jt), s(b3, O2.classes.isSelected), b3.inert = false, s(b3, "f-".concat(e12, "In from-").concat(u6 > 0 ? "prev" : "next"))), Ht(), true;
      }(e11, l8))
        return;
      e11 = D2 ? (e11 % f3 + f3) % f3 : t5(0, e11, f3 - 1);
      const v3 = (null === (o9 = K[e11 || 0]) || void 0 === o9 ? void 0 : o9.pos) || 0;
      B2 = v3;
      const p2 = S.isRunning() ? S.getEndValues().pos : F;
      if (Math.abs(B2 - p2) < 1)
        return F = B2, k3 !== e11 && (Tt(), A2 = k3, k3 = e11, ct(), dt(), it("change", k3, A2)), Ht(), void (z2 || (z2 = true, it("settle")));
      if (S.pause(), St(), D2) {
        const t10 = pt(), e12 = Math.floor((p2 - (null === (r7 = K[0]) || void 0 === r7 ? void 0 : r7.pos)) / t10) || 0, n10 = B2 + e12 * t10;
        B2 = [n10 + t10, n10, n10 - t10].reduce(function(t11, e13) {
          return Math.abs(e13 - p2) < Math.abs(t11 - p2) ? e13 : t11;
        });
      }
      false !== l8 && t(u5) ? S.spring(r({}, O2.tween, u5)).from({ pos: F }).to({ pos: B2 }).start() : (F = B2, at(), Ht(), z2 || (z2 = true, it("settle")));
    }
    function Rt(t10) {
      var e11;
      let n10 = F;
      if (D2 && true !== t10) {
        const t11 = pt();
        n10 -= (Math.floor((F - (null === (e11 = K[0]) || void 0 === e11 ? void 0 : e11.pos) || 0) / t11) || 0) * t11;
      }
      return n10;
    }
    function Ht() {
      var t10;
      if (!H2 || !C)
        return;
      J = gt();
      const e11 = /* @__PURE__ */ new Set(), n10 = [], i9 = K[k3], s11 = O2.setTransform;
      let l8;
      for (const o9 of Y) {
        const s12 = W.has(o9.index), r7 = J.indexOf(o9) > -1, a8 = (null === (t10 = null == i9 ? void 0 : i9.slides) || void 0 === t10 ? void 0 : t10.indexOf(o9)) > -1;
        if (o9.isVirtual && !s12 && !r7)
          continue;
        let c5 = yt(o9);
        if (c5 && (n10.push(o9), a8 && e11.add(c5), tt("adaptiveHeight") && a8)) {
          const t11 = (c5.firstElementChild || c5).getBoundingClientRect().height;
          l8 = null == l8 ? t11 : Math.max(l8, t11);
        }
      }
      C && l8 && (C.style.height = "".concat(l8, "px")), [...e8(C, ".".concat(O2.classes.slide))].forEach((t11) => {
        s3(t11, O2.classes.isSelected, e11.has(t11));
        const n11 = X[parseInt(t11.getAttribute("index") || "-1")];
        if (!n11)
          return t11.remove(), void Mt(t11);
        const i10 = W.has(n11.index), o9 = J.indexOf(n11) > -1;
        if (n11.isVirtual && !i10 && !o9)
          return void Et(n11);
        if (t11.inert = !o9, false === s11)
          return;
        let l9 = n11.pos ? Math.round(1e4 * n11.pos) / 1e4 : 0, a8 = 0, c5 = 0, d3 = 0, f3 = 0;
        i10 || (a8 = q2 ? 0 : $ ? -1 * l9 : l9, c5 = q2 ? l9 : 0, d3 = t6(a8, 0, n11.dim, 0, 100), f3 = t6(c5, 0, n11.dim, 0, 100)), s11 instanceof Function && !i10 ? s11($t, n11, { x: a8, y: c5, xPercent: d3, yPercent: f3 }) : t11.style.transform = a8 || c5 ? "translate3d(".concat(d3, "%, ").concat(f3, "%,0)") : "";
      }), it("render", n10);
    }
    function Ct() {
      null == H2 || H2.removeEventListener("click", At), document.removeEventListener("mousemove", st), W.clear(), null == j2 || j2.disconnect(), j2 = void 0;
      for (const t10 of X) {
        let n10 = t10.el;
        n10 && n(n10) && (t10.state = void 0, Lt(t10), Pt(t10), t10.isVirtual ? (Et(t10), t10.el = void 0) : (Mt(n10), n10.style.transform = "", C && !C.contains(n10) && C.appendChild(n10)));
      }
      for (const t10 of Object.values(R2))
        null == t10 || t10.destroy();
      R2 = {}, null == M3 || M3.destroy(), M3 = void 0, null == S || S.destroy(), S = void 0;
      for (const [t10, e11] of Object.entries(O2.classes || {}))
        "container" !== t10 && s2(H2, e11);
      s2(C, "is-draggable");
    }
    function Vt() {
      return D2 || k3 > 0;
    }
    function Dt() {
      return D2 || k3 < K.length - 1;
    }
    const $t = { add: function(t10, e11) {
      var n10;
      let i9 = F;
      const o9 = k3, s11 = pt(), r7 = (null == S ? void 0 : S.isRunning()) ? S.getEndValues().pos : F, l8 = s11 && Math.floor((r7 - ((null === (n10 = K[0]) || void 0 === n10 ? void 0 : n10.pos) || 0)) / s11) || 0;
      return mt(t10, e11), lt(G), wt(), S && s11 && (o9 === k3 && (i9 -= l8 * s11), i9 === B2 ? F = B2 : S.spring({ clamp: true, mass: 1, tension: 300, friction: 25, restDelta: 1, restSpeed: 1 }).from({ pos: i9 }).to({ pos: B2 }).start()), Ht(), $t;
    }, canGoPrev: Vt, canGoNext: Dt, destroy: function() {
      return it("destroy"), window.removeEventListener("resize", ot), Ct(), nt.clear(), H2 = null, K = [], X = [], O2 = Object.assign({}, h2), R2 = {}, Y = [], L = void 0, G = "*", P = 2, $t;
    }, emit: it, filter: function(t10 = "*") {
      return lt(t10), wt(), F = t5(N2, F, _2), Ht(), it("filter", t10), $t;
    }, getContainer: function() {
      return H2;
    }, getGapDim: ft, getGestures: function() {
      return M3;
    }, getLastMouseMove: function() {
      return b2;
    }, getOption: function(t10) {
      return tt(t10);
    }, getOptions: function() {
      return O2;
    }, getPage: function() {
      return K[k3];
    }, getPageIndex: function(t10) {
      if (void 0 !== t10) {
        for (const e11 of K || [])
          for (const n10 of e11.slides)
            if (n10.index === t10)
              return e11.index;
        return -1;
      }
      return k3;
    }, getPageIndexFromPosition: ut, getPageProgress: function(t10, e11) {
      var n10;
      void 0 === t10 && (t10 = k3);
      const i9 = K[t10];
      if (!i9)
        return t10 > k3 ? -1 : 1;
      const o9 = pt(), s11 = ft();
      let r7 = i9.pos, l8 = Rt();
      if (D2 && true !== e11) {
        const t11 = Math.floor((l8 - (null === (n10 = K[0]) || void 0 === n10 ? void 0 : n10.pos)) / o9) || 0;
        l8 -= t11 * o9, r7 = [r7 + o9, r7, r7 - o9].reduce(function(t12, e12) {
          return Math.abs(e12 - l8) < Math.abs(t12 - l8) ? e12 : t12;
        });
      }
      return (l8 - r7) / (i9.dim + s11) || 0;
    }, getPageVisibility: function(t10) {
      var e11;
      void 0 === t10 && (t10 = k3);
      const n10 = K[t10];
      if (!n10)
        return t10 > k3 ? -1 : 1;
      const i9 = Rt(), o9 = vt();
      let s11 = n10.pos;
      if (D2) {
        const t11 = pt(), n11 = s11 + (Math.floor((i9 - (null === (e11 = K[0]) || void 0 === e11 ? void 0 : e11.pos)) / t11) || 0) * t11;
        s11 = [n11 + t11, n11, n11 - t11].reduce(function(t12, e12) {
          return Math.abs(e12 - i9) < Math.abs(t12 - i9) ? e12 : t12;
        });
      }
      return s11 > i9 && s11 + n10.dim < i9 + o9 ? 1 : s11 < i9 ? (s11 + n10.dim - i9) / n10.dim || 0 : s11 + n10.dim > i9 + o9 && (i9 + o9 - s11) / n10.dim || 0;
    }, getPages: function() {
      return K;
    }, getPlugins: function() {
      return R2;
    }, getPosition: Rt, getSlides: function() {
      return X;
    }, getState: function() {
      return P;
    }, getTotalSlideDim: pt, getTween: function() {
      return S;
    }, getViewport: function() {
      return C;
    }, getViewportDim: vt, getVisibleSlides: function(t10) {
      return void 0 === t10 ? J : gt(t10);
    }, goTo: Ot, hasNavigated: function() {
      return void 0 !== A2;
    }, hideError: Pt, hideLoading: Lt, init: function() {
      if (!g || !n(g))
        throw new Error("No Element found");
      return 0 !== P && (Ct(), P = 0), H2 = g, T = x2, window.removeEventListener("resize", ot), T.breakpoints && window.addEventListener("resize", ot), ot(), $t;
    }, isInfinite: function() {
      return D2;
    }, isInTransition: function() {
      return W.size > 0;
    }, isRTL: function() {
      return $;
    }, isSettled: function() {
      return z2;
    }, isVertical: function() {
      return q2;
    }, localize: function(t10, e11 = []) {
      return et(t10, e11);
    }, next: function(t10 = {}) {
      return Ot(k3 + 1, t10), $t;
    }, off: function(t10, e11) {
      for (const n10 of t10 instanceof Array ? t10 : [t10])
        nt.has(n10) && nt.set(n10, nt.get(n10).filter((t11) => t11 !== e11));
      return $t;
    }, on: function(t10, e11) {
      for (const n10 of t10 instanceof Array ? t10 : [t10])
        nt.set(n10, [...nt.get(n10) || [], e11]);
      return $t;
    }, prev: function(t10 = {}) {
      return Ot(k3 - 1, t10), $t;
    }, reInit: function(t10 = {}, e11 = {}) {
      return Ct(), P = 0, L = void 0, G = "*", x2 = t10, T = t10, w2 = e11, ot(), $t;
    }, remove: function(t10) {
      void 0 === t10 && (t10 = X.length - 1);
      const e11 = X[t10];
      return e11 && (it("removeSlide", e11), e11.el && (Mt(e11.el), e11.el.remove(), e11.el = void 0), X.splice(t10, 1), lt(G), wt(), F = t5(N2, F, _2), Ht()), $t;
    }, setPosition: function(t10) {
      F = t10, at(), Ht();
    }, showError: function(t10, e11) {
      Lt(t10), Pt(t10);
      const n10 = t10.el;
      if (n10) {
        const i9 = document.createElement("div");
        s(i9, "f-html"), s(i9, "is-error"), i9.innerHTML = et(e11 || "<p>{{ERROR}}</p>"), t10.htmlEl = i9, s(n10, "has-html"), s(n10, "has-error"), n10.insertAdjacentElement("afterbegin", i9), it("contentReady", t10);
      }
      return $t;
    }, showLoading: function(t10) {
      const e11 = t10.el, n10 = null == e11 ? void 0 : e11.querySelector(".f-spinner");
      if (!e11 || n10)
        return $t;
      const i9 = tt("spinnerTpl"), o9 = e(i9);
      return o9 && (s(o9, "f-spinner"), e11.insertAdjacentElement("beforeend", o9)), $t;
    }, version: "6.1.5" };
    return $t;
  };
  E2.l10n = { en_EN: o3 }, E2.getDefaults = () => h2;

  // node_modules/@fancyapps/ui/dist/utils/replaceAll.js
  var n4 = function(n10 = "", t10 = "", o9 = "") {
    return n10.split(t10).join(o9);
  };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.zoomable.js
  var a3 = { tpl: (t10) => '<img class="f-panzoom__content" \n    '.concat(t10.srcset ? 'data-lazy-srcset="{{srcset}}"' : "", " \n    ").concat(t10.sizes ? 'data-lazy-sizes="{{sizes}}"' : "", ' \n    data-lazy-src="{{src}}" alt="{{alt}}" />') };
  var s6 = () => {
    let s11;
    function l8(e11, o9) {
      const n10 = null == s11 ? void 0 : s11.getOptions().Zoomable;
      let i9 = (t(n10) ? Object.assign(Object.assign({}, a3), n10) : a3)[e11];
      return i9 && "function" == typeof i9 && o9 ? i9(o9) : i9;
    }
    function c5() {
      s11 && false !== s11.getOptions().Zoomable && (s11.on("addSlide", f3), s11.on("removeSlide", u5), s11.on("attachSlideEl", g), s11.on("click", d3), s11.on("change", r7), s11.on("ready", r7));
    }
    function r7() {
      m3();
      const t10 = (null == s11 ? void 0 : s11.getVisibleSlides()) || [];
      if (t10.length > 1 || "slide" === (null == s11 ? void 0 : s11.getOption("transition")))
        for (const e11 of t10) {
          const t11 = e11.panzoomRef;
          t11 && ((null == s11 ? void 0 : s11.getPage().slides) || []).indexOf(e11) < 0 && t11.execute(v.ZoomTo, Object.assign({}, t11.getStartPosition()));
        }
    }
    function d3(t10, e11) {
      const o9 = e11.target;
      o9 && !e11.defaultPrevented && o9.dataset.panzoomAction && p2(o9.dataset.panzoomAction);
    }
    function f3(t10, i9) {
      const a8 = i9.el;
      if (!s11 || !a8 || i9.panzoomRef)
        return;
      const c6 = i9.src || i9.lazySrc || "", r8 = i9.alt || i9.caption || "Image #".concat(i9.index), d4 = i9.srcset || i9.lazySrcset || "", f4 = i9.sizes || i9.lazySizes || "";
      if (c6 && t2(c6) && !i9.html && (!i9.type || "image" === i9.type)) {
        i9.type = "image", i9.thumbSrc = i9.thumbSrc || c6;
        let t11 = l8("tpl", i9);
        t11 = n4(t11, "{{src}}", c6 + ""), t11 = n4(t11, "{{srcset}}", d4 + ""), t11 = n4(t11, "{{sizes}}", f4 + ""), a8.insertAdjacentHTML("afterbegin", t11);
      }
      const u6 = a8.querySelector(".f-panzoom__content");
      if (!u6)
        return;
      u6.setAttribute("alt", r8 + "");
      const g2 = i9.width && "auto" !== i9.width ? parseFloat(i9.width + "") : "auto", p3 = i9.height && "auto" !== i9.height ? parseFloat(i9.height + "") : "auto", z2 = E(a8, Object.assign({ width: g2, height: p3, classes: { container: "f-zoomable" }, event: () => null == s11 ? void 0 : s11.getLastMouseMove(), spinnerTpl: () => (null == s11 ? void 0 : s11.getOption("spinnerTpl")) || "" }, l8("Panzoom")));
      z2.on("*", (t11, e11, ...o9) => {
        s11 && ("loading" === e11 && (i9.state = 0), "loaded" === e11 && (i9.state = 1), "error" === e11 && (i9.state = 2, null == s11 || s11.showError(i9, "{{IMAGE_ERROR}}")), s11.emit("panzoom:".concat(e11), i9, ...o9), "ready" === e11 && s11.emit("contentReady", i9), i9.index === (null == s11 ? void 0 : s11.getPageIndex()) && m3());
      }), i9.panzoomRef = z2;
    }
    function u5(t10, e11) {
      e11.panzoomRef && (e11.panzoomRef.destroy(), e11.panzoomRef = void 0);
    }
    function g(t10, e11) {
      const o9 = e11.panzoomRef;
      if (o9)
        switch (o9.getState()) {
          case 0:
            o9.init();
            break;
          case 3:
            o9.execute(v.ZoomTo, Object.assign(Object.assign({}, o9.getStartPosition()), { velocity: 0 }));
        }
    }
    function m3() {
      var t10, e11;
      const o9 = (null == s11 ? void 0 : s11.getContainer()) || void 0, n10 = null === (e11 = null === (t10 = null == s11 ? void 0 : s11.getPage()) || void 0 === t10 ? void 0 : t10.slides[0]) || void 0 === e11 ? void 0 : e11.panzoomRef;
      if (o9)
        if (n10)
          n10.updateControls(o9);
        else
          for (const t11 of o9.querySelectorAll("[data-panzoom-action]") || [])
            t11.setAttribute("aria-disabled", ""), t11.setAttribute("tabindex", "-1");
    }
    function p2(t10, ...e11) {
      var o9;
      null === (o9 = null == s11 ? void 0 : s11.getPage().slides[0].panzoomRef) || void 0 === o9 || o9.execute(t10, ...e11);
    }
    return { init: function(t10) {
      s11 = t10, s11.on("initPlugins", c5);
    }, destroy: function() {
      if (s11) {
        s11.off("initPlugins", c5), s11.off("addSlide", f3), s11.off("removeSlide", u5), s11.off("attachSlideEl", g), s11.off("click", d3), s11.off("change", r7), s11.off("ready", r7);
        for (const t10 of s11.getSlides())
          u5(0, t10);
      }
      s11 = void 0;
    }, execute: p2 };
  };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.sync.js
  var e9 = { syncOnChange: false, syncOnClick: true, syncOnHover: false };
  var i3 = () => {
    let i9, t10;
    function o9() {
      const t11 = null == i9 ? void 0 : i9.getOptions().Sync;
      return t(t11) ? Object.assign(Object.assign({}, e9), t11) : e9;
    }
    function s11(n10) {
      var e11, s12, l9;
      i9 && n10 && (t10 = n10, i9.getOptions().classes = Object.assign(Object.assign({}, i9.getOptions().classes), { isSelected: "" }), i9.getOptions().initialSlide = (null === (s12 = null === (e11 = t10.getPage()) || void 0 === e11 ? void 0 : e11.slides[0]) || void 0 === s12 ? void 0 : s12.index) || 0, o9().syncOnChange && i9.on("change", c5), o9().syncOnClick && i9.on("click", g), o9().syncOnHover && (null === (l9 = i9.getViewport()) || void 0 === l9 || l9.addEventListener("mouseover", u5)), function() {
        if (!i9 || !t10)
          return;
        i9.on("ready", d3), i9.on("refresh", a8), t10.on("change", r7), t10.on("filter", f3);
      }());
    }
    function l8() {
      const n10 = o9().target;
      i9 && n10 && s11(n10);
    }
    function d3() {
      v3();
    }
    function c5() {
      var n10;
      if (i9 && t10) {
        const e11 = (null === (n10 = i9.getPage()) || void 0 === n10 ? void 0 : n10.slides) || [], o10 = t10.getPageIndex(e11[0].index || 0);
        o10 > -1 && t10.goTo(o10, i9.hasNavigated() ? void 0 : { tween: false, transition: false }), v3();
      }
    }
    function r7() {
      var n10;
      if (i9 && t10) {
        const e11 = i9.getPageIndex((null === (n10 = t10.getPage()) || void 0 === n10 ? void 0 : n10.slides[0].index) || 0);
        e11 > -1 && i9.goTo(e11, t10.hasNavigated() ? void 0 : { tween: false, transition: false }), v3();
      }
    }
    function g(n10, e11) {
      var o10;
      if (!i9 || !t10)
        return;
      if (null === (o10 = i9.getTween()) || void 0 === o10 ? void 0 : o10.isRunning())
        return;
      const s12 = null == i9 ? void 0 : i9.getOptions().classes.slide;
      if (!s12)
        return;
      const l9 = s12 ? e11.target.closest(".".concat(s12)) : null;
      if (l9) {
        const n11 = parseInt(l9.getAttribute("index") || "") || 0, e12 = t10.getPageIndex(n11);
        t10.goTo(e12);
      }
    }
    function u5(n10) {
      i9 && g(0, n10);
    }
    function a8() {
      var n10;
      if (i9 && t10) {
        const e11 = i9.getPageIndex((null === (n10 = t10.getPage()) || void 0 === n10 ? void 0 : n10.slides[0].index) || 0);
        e11 > -1 && i9.goTo(e11, { tween: false, transition: false }), v3();
      }
    }
    function f3(n10, e11) {
      i9 && t10 && (i9.filter(e11), r7());
    }
    function v3() {
      var n10, e11, o10;
      if (!t10)
        return;
      const s12 = (null === (e11 = null === (n10 = t10.getPage()) || void 0 === n10 ? void 0 : n10.slides[0]) || void 0 === e11 ? void 0 : e11.index) || 0;
      for (const n11 of (null == i9 ? void 0 : i9.getSlides()) || [])
        null === (o10 = n11.el) || void 0 === o10 || o10.classList.toggle("is-selected", n11.index === s12);
    }
    return { init: function(n10) {
      i9 = n10, i9.on("initSlides", l8);
    }, destroy: function() {
      var n10;
      null == i9 || i9.off("ready", d3), null == i9 || i9.off("refresh", a8), null == i9 || i9.off("change", c5), null == i9 || i9.off("click", g), null === (n10 = null == i9 ? void 0 : i9.getViewport()) || void 0 === n10 || n10.removeEventListener("mouseover", u5), null == t10 || t10.off("change", r7), null == t10 || t10.off("filter", f3), t10 = void 0, null == i9 || i9.off("initSlides", l8), i9 = void 0;
    }, getTarget: function() {
      return t10;
    } };
  };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.lazyload.js
  var s7 = { showLoading: true, preload: 1 };
  var n5 = "is-lazyloading";
  var o4 = "is-lazyloaded";
  var l2 = "has-lazyerror";
  var i4 = () => {
    let i9;
    function d3() {
      const e11 = null == i9 ? void 0 : i9.getOptions().Lazyload;
      return t(e11) ? Object.assign(Object.assign({}, s7), e11) : s7;
    }
    function r7(t10) {
      var s11;
      const r8 = t10.el;
      if (!r8)
        return;
      const c6 = "[data-lazy-src],[data-lazy-srcset],[data-lazy-bg]", u5 = Array.from(r8.querySelectorAll(c6));
      r8.matches(c6) && u5.push(r8);
      for (const r9 of u5) {
        const c7 = r9.dataset.lazySrc, u6 = r9.dataset.lazySrcset, f3 = r9.dataset.lazySizes, m3 = r9.dataset.lazyBg, y3 = (r9 instanceof HTMLImageElement || r9 instanceof HTMLSourceElement) && (c7 || u6), z2 = r9 instanceof HTMLElement && m3;
        if (!y3 && !z2)
          continue;
        const g = c7 || u6 || m3;
        if (g) {
          if (y3 && g) {
            const m4 = null === (s11 = r9.parentElement) || void 0 === s11 ? void 0 : s11.classList.contains("f-panzoom__wrapper");
            d3().showLoading && (null == i9 || i9.showLoading(t10)), r9.addEventListener("load", () => {
              null == i9 || i9.hideLoading(t10), s2(r9, l2), r9 instanceof HTMLImageElement ? r9.decode().then(() => {
                s2(r9, n5), s(r9, o4);
              }) : (s2(r9, n5), s(r9, o4)), m4 || null == i9 || i9.emit("lazyLoad:loaded", t10, r9, g);
            }), r9.addEventListener("error", () => {
              null == i9 || i9.hideLoading(t10), s2(r9, n5), s(r9, l2), m4 || null == i9 || i9.emit("lazyLoad:error", t10, r9, g);
            }), r9.classList.add("f-lazyload"), r9.classList.add(n5), m4 || null == i9 || i9.emit("lazyLoad:load", t10, r9, g), c7 && (r9.src = c7), u6 && (r9.srcset = u6), f3 && (r9.sizes = f3);
          } else if (z2) {
            if (!document.body.contains(r9)) {
              document.createElement("img").src = m3;
            }
            r9.style.backgroundImage = "url('".concat(m3, "')");
          }
          delete r9.dataset.lazySrc, delete r9.dataset.lazySrcset, delete r9.dataset.lazySizes, delete r9.dataset.lazyBg;
        }
      }
    }
    function c5() {
      if (!i9)
        return;
      const e11 = [...i9.getVisibleSlides()], t10 = d3().preload;
      if (t10 > 0) {
        const a8 = i9.getPosition(), s11 = i9.getViewportDim();
        e11.push(...i9.getVisibleSlides(a8 + s11 * t10), ...i9.getVisibleSlides(a8 - s11 * t10));
      }
      for (const t11 of e11)
        r7(t11);
    }
    return { init: function(e11) {
      i9 = e11, i9.on("render", c5);
    }, destroy: function() {
      null == i9 || i9.off("render", c5), i9 = void 0;
    } };
  };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.arrows.js
  var r4 = '<svg width="24" height="24" viewBox="0 0 24 24" tabindex="-1">';
  var i5 = "</svg>";
  var s8 = { prevTpl: r4 + '<path d="M15 3l-9 9 9 9"></path>' + i5, nextTpl: r4 + '<path d="M9 3l9 9-9 9"></path>' + i5 };
  var l3 = () => {
    let r7, i9, l8;
    function a8() {
      const t10 = null == r7 ? void 0 : r7.getOptions().Arrows;
      return t(t10) ? Object.assign(Object.assign({}, s8), t10) : s8;
    }
    function u5(e11) {
      if (!r7)
        return;
      const o9 = "<button data-carousel-go-".concat(e11, ' tabindex="0" class="f-button is-arrow is-').concat(e11, '" title="{{').concat(e11.toUpperCase(), '}}">') + a8()["".concat(e11, "Tpl")] + "</button", i10 = e(r7.localize(o9)) || void 0;
      return i10 && s(i10, a8()["".concat(e11, "Class")]), i10;
    }
    function c5() {
      var t10;
      null == i9 || i9.remove(), i9 = void 0, null == l8 || l8.remove(), l8 = void 0, null === (t10 = null == r7 ? void 0 : r7.getContainer()) || void 0 === t10 || t10.classList.remove("has-arrows");
    }
    function d3() {
      r7 && false !== r7.getOptions().Arrows && r7.getPages().length > 1 ? (!function() {
        if (!r7)
          return;
        const t10 = r7.getViewport();
        t10 && (i9 || (i9 = u5("prev"), i9 && t10.insertAdjacentElement("beforebegin", i9)), l8 || (l8 = u5("next"), l8 && t10.insertAdjacentElement("afterend", l8)), s3(r7.getContainer(), "has-arrows", !(!i9 && !l8)));
      }(), r7 && (null == i9 || i9.toggleAttribute("aria-disabled", !r7.canGoPrev()), null == l8 || l8.toggleAttribute("aria-disabled", !r7.canGoNext()))) : c5();
    }
    return { init: function(t10) {
      r7 = t10.on(["change", "refresh"], d3);
    }, destroy: function() {
      c5(), null == r7 || r7.off(["change", "refresh"], d3), r7 = void 0;
    } };
  };

  // node_modules/@fancyapps/ui/dist/shared/buttons.js
  var t8 = '<circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/>';
  var M2 = '<g><line x1="11" y1="8" x2="11" y2="14"></line></g>' + t8;
  var o5 = { moveLeft: ["moveLeft", "MOVE_LEFT", '<path d="M5 12h14M5 12l6 6M5 12l6-6"/>'], moveRight: ["moveRight", "MOVE_RIGHT", '<path d="M5 12h14M13 18l6-6M13 6l6 6"/>'], moveUp: ["moveUp", "MOVE_UP", '<path d="M12 5v14M18 11l-6-6M6 11l6-6"/>'], moveDown: ["moveDown", "MOVE_DOWN", '<path d="M12 5v14M18 13l-6 6M6 13l6 6"/>'], zoomOut: ["zoomOut", "ZOOM_OUT", t8], zoomIn: ["zoomIn", "ZOOM_IN", M2], toggleFull: ["toggleFull", "TOGGLE_FULL", M2], iterateZoom: ["iterateZoom", "ITERATE_ZOOM", M2], toggle1to1: ["toggleFull", "TOGGLE_FULL", '<path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/>'], rotateCCW: ["rotateCCW", "ROTATE_CCW", '<path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/>'], rotateCW: ["rotateCW", "ROTATE_CW", '<path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/>'], flipX: ["flipX", "FLIP_X", '<path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/>'], flipY: ["flipY", "FLIP_Y", '<path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/>'], reset: ["reset", "RESET", '<path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/>'], toggleFS: ["toggleFS", "TOGGLE_FS", '<g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g>'] };
  var v2 = {};
  for (const [t10, M3] of Object.entries(o5))
    v2[t10] = { tpl: '<button data-panzoom-action="'.concat(M3[0], '" class="f-button" title="{{').concat(M3[1], '}}"><svg>').concat(M3[2], "</svg></button>") };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.toolbar.js
  var l4;
  !function(t10) {
    t10.Left = "left", t10.middle = "middle", t10.right = "right";
  }(l4 || (l4 = {}));
  var s9 = Object.assign({ counter: { tpl: '<div class="f-counter"><span data-carousel-page></span>/<span data-carousel-pages></span></div>' }, download: { tpl: '<button data-carousel-download class="f-button" title="{{DOWNLOAD}}"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></button>' }, autoplay: { tpl: '<button data-autoplay-action="toggle" class="f-button" title="{{TOGGLE_AUTOPLAY}}"><svg><g><path d="M5 3.5 19 12 5 20.5Z"/></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>' }, thumbs: { tpl: '<button data-thumbs-action="toggle" class="f-button" title="{{TOGGLE_THUMBS}}"><svg><rect width="18" height="14" x="3" y="3" rx="2"/><path d="M4 21h1M9 21h1M14 21h1M19 21h1"/></svg></button>' } }, v2);
  var a4 = { absolute: false, display: { left: [], middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY", "reset"], right: [] }, enabled: "auto", items: {} };
  var r5 = () => {
    let l8, r7;
    function u5(e11) {
      const o9 = null == l8 ? void 0 : l8.getOptions().Toolbar;
      let n10 = (t(o9) ? Object.assign(Object.assign({}, a4), o9) : a4)[e11];
      return n10 && "function" == typeof n10 && l8 ? n10(l8) : n10;
    }
    function c5() {
      var a8, c6;
      if (!(null == l8 ? void 0 : l8.getOptions().Toolbar))
        return;
      if (!l8 || r7)
        return;
      const d3 = l8.getContainer();
      if (!d3)
        return;
      let f3 = u5("enabled");
      if (!f3)
        return;
      const g = u5("absolute"), p2 = l8.getSlides().length > 1;
      let b3 = false, m3 = false;
      for (const t10 of l8.getSlides())
        t10.panzoomRef && (b3 = true), (t10.downloadSrc || "image" === t10.type && t10.src) && (m3 = true);
      const v3 = (null === (a8 = l8.getPlugins().Thumbs) || void 0 === a8 ? void 0 : a8.isEnabled()) || false, h3 = p2 && l8.getPlugins().Autoplay || false, E3 = l8.getPlugins().Fullscreen && (document.fullscreenEnabled || document.webkitFullscreenEnabled);
      if ("auto" === f3 && (f3 = b3), !f3)
        return;
      r7 = d3.querySelector(".f-carousel__toolbar") || void 0, r7 || (r7 = document.createElement("div"), r7.classList.add("f-carousel__toolbar"));
      const y3 = u5("display"), j2 = r({}, s9, u5("items"));
      for (const i9 of ["left", "middle", "right"]) {
        const s11 = y3[i9] || [], a9 = document.createElement("div");
        a9.classList.add("f-carousel__toolbar__column"), a9.classList.add("is-".concat(i9));
        for (const i10 of s11) {
          let s12;
          if (t2(i10)) {
            if ("counter" === i10 && !p2)
              continue;
            if ("autoplay" === i10 && !h3)
              continue;
            if (v2[i10] && !b3)
              continue;
            if ("fullscreen" === i10 && !E3)
              continue;
            if ("thumbs" === i10 && !v3)
              continue;
            if ("download" === i10 && !m3)
              continue;
            s12 = j2[i10];
          }
          if (t(i10) && (s12 = i10), s12 && s12.tpl) {
            let t10 = l8.localize(s12.tpl);
            t10 = t10.split("<svg>").join('<svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24">');
            const e11 = e(t10);
            e11 && ("function" == typeof s12.click && l8 && e11.addEventListener("click", (t11) => {
              t11.preventDefault(), t11.stopPropagation(), "function" == typeof s12.click && l8 && s12.click(l8, t11);
            }), a9.append(e11));
          }
        }
        r7.append(a9);
      }
      if (r7.childElementCount) {
        if (g && r7.classList.add("is-absolute"), !r7.parentElement) {
          const t10 = u5("parentEl");
          t10 ? t10.insertAdjacentElement("afterbegin", r7) : null === (c6 = l8.getViewport()) || void 0 === c6 || c6.insertAdjacentElement("beforebegin", r7);
        }
        d3.contains(r7) && d3.classList.add("has-toolbar");
      }
    }
    return { init: function(t10) {
      l8 = t10, null == l8 || l8.on("initSlides", c5);
    }, destroy: function() {
      var t10;
      null == l8 || l8.off("initSlides", c5), null === (t10 = null == l8 ? void 0 : l8.getContainer()) || void 0 === t10 || t10.classList.remove("has-toolbar"), null == r7 || r7.remove(), r7 = void 0;
    }, add: function(t10, e11) {
      s9[t10] = e11;
    }, isEnabled: function() {
      return !!r7;
    } };
  };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.autoplay.js
  var n6 = { autoStart: true, pauseOnHover: true, showProgressbar: true, timeout: 2e3 };
  var o6 = () => {
    let o9, i9, a8 = false, s11 = false, l8 = false, r7 = null;
    function u5(e11) {
      const i10 = null == o9 ? void 0 : o9.getOptions().Autoplay;
      let a9 = (t(i10) ? Object.assign(Object.assign({}, n6), i10) : n6)[e11];
      return a9 && "function" == typeof a9 && o9 ? a9(o9) : a9;
    }
    function f3() {
      clearTimeout(i9), i9 = void 0;
    }
    function g() {
      if (!o9 || !a8 || l8 || s11 || i9 || !o9.isSettled() || function() {
        var t11;
        const e11 = (null === (t11 = null == o9 ? void 0 : o9.getPage()) || void 0 === t11 ? void 0 : t11.slides) || [];
        for (const t12 of e11)
          if (0 === t12.state)
            return true;
        return false;
      }())
        return;
      !function() {
        var t11, n10, i10, a9;
        if (!o9)
          return;
        if (v3(), !u5("showProgressbar"))
          return;
        let s12 = u5("progressbarParentEl");
        !s12 && (null === (t11 = o9.getPlugins().Toolbar) || void 0 === t11 ? void 0 : t11.isEnabled()) && (s12 = o9.getContainer());
        if (!s12 && true !== (null === (n10 = o9.getPlugins().Toolbar) || void 0 === n10 ? void 0 : n10.isEnabled())) {
          const t12 = (null === (i10 = o9.getPages()[0]) || void 0 === i10 ? void 0 : i10.slides) || [], e11 = (null === (a9 = o9.getPage()) || void 0 === a9 ? void 0 : a9.slides) || [];
          1 === t12.length && 1 === e11.length && (s12 = e11[0].el);
        }
        s12 || (s12 = o9.getViewport());
        if (!s12)
          return;
        r7 = document.createElement("div"), s(r7, "f-progressbar"), s12.prepend(r7);
        const l9 = u5("timeout") || 1e3;
        r7.style.animationDuration = "".concat(l9, "ms");
      }();
      const t10 = u5("timeout");
      i9 = setTimeout(() => {
        o9 && a8 && !s11 && (o9.isInfinite() || o9.getPageIndex() !== o9.getPages().length - 1 ? o9.next() : o9.goTo(0));
      }, t10);
    }
    function c5() {
      var t10;
      if (!o9 || o9.getPages().length < 2 || false === o9.getOptions().Autoplay)
        return;
      if (a8)
        return;
      a8 = true, o9.emit("autoplay:start", u5("timeout")), s(o9.getContainer(), "has-autoplay"), null === (t10 = o9.getTween()) || void 0 === t10 || t10.on("start", b3);
      const n10 = null == o9 ? void 0 : o9.getContainer();
      n10 && u5("pauseOnHover") && matchMedia("(hover: hover)").matches && (n10.addEventListener("mouseenter", E3, false), n10.addEventListener("mouseleave", w2, false)), o9.on("change", P), o9.on("settle", y3), o9.on("contentReady", p2), o9.on("panzoom:touchStart", d3), o9.on("panzoom:wheel", d3), o9.isSettled() && g();
    }
    function d3() {
      var t10;
      if (f3(), v3(), o9) {
        if (a8) {
          o9.emit("autoplay:end"), null === (t10 = o9.getTween()) || void 0 === t10 || t10.off("start", b3);
          const e11 = o9.getContainer();
          e11 && (e11.classList.remove("has-autoplay"), e11.removeEventListener("mouseenter", E3, false), e11.removeEventListener("mouseleave", w2, false));
        }
        o9.off("change", P), o9.off("settle", y3), o9.off("contentReady", p2), o9.off("panzoom:touchStart", d3), o9.off("panzoom:wheel", d3);
      }
      a8 = false, s11 = false;
    }
    function v3() {
      r7 && (r7.remove(), r7 = null);
    }
    function m3() {
      o9 && o9.getPages().length > 1 && u5("autoStart") && c5();
    }
    function p2() {
      g();
    }
    function h3(t10, e11) {
      const n10 = e11.target;
      n10 && !e11.defaultPrevented && "toggle" === n10.dataset.autoplayAction && O2.toggle();
    }
    function P() {
      !o9 || !(null == o9 ? void 0 : o9.isInfinite()) && o9.getPageIndex() === o9.getPages().length - 1 ? d3() : (v3(), f3());
    }
    function y3() {
      g();
    }
    function b3() {
      f3(), v3();
    }
    function E3() {
      l8 = true, a8 && (v3(), f3());
    }
    function w2() {
      l8 = false, a8 && !s11 && (null == o9 ? void 0 : o9.isSettled()) && g();
    }
    const O2 = { init: function(t10) {
      o9 = t10, o9.on("ready", m3), o9.on("click", h3);
    }, destroy: function() {
      d3(), null == o9 || o9.off("ready", m3), null == o9 || o9.off("click", h3), o9 = void 0;
    }, isEnabled: () => a8, pause: function() {
      s11 = true, f3();
    }, resume: function() {
      s11 = false, a8 && !l8 && g();
    }, start() {
      c5();
    }, stop() {
      d3();
    }, toggle() {
      a8 ? d3() : c5();
    } };
    return O2;
  };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.thumbs.js
  var u3 = { Carousel: { Lazyload: { showLoading: false } }, minCount: 2, showOnStart: true, thumbTpl: '<button aria-label="Slide to #{{page}}"><img draggable="false" alt="{{alt}}" data-lazy-src="{{src}}" /></button>', type: "modern" };
  var a5;
  var c3 = () => {
    let c5, d3, f3, m3, g, h3 = 0, v3 = 0, p2 = true;
    function b3(e11) {
      const n10 = null == c5 ? void 0 : c5.getOptions().Thumbs;
      let o9 = (t(n10) ? Object.assign(Object.assign({}, u3), n10) : u3)[e11];
      return o9 && "function" == typeof o9 && c5 ? o9(c5) : o9;
    }
    function y3() {
      if (!c5)
        return false;
      if (false === (null == c5 ? void 0 : c5.getOptions().Thumbs))
        return false;
      let t10 = 0;
      for (const e11 of c5.getSlides())
        e11.thumbSrc && t10++;
      return t10 >= b3("minCount");
    }
    function x2() {
      return "modern" === b3("type");
    }
    function S() {
      return "scrollable" === b3("type");
    }
    function C() {
      const t10 = [], e11 = (null == c5 ? void 0 : c5.getSlides()) || [];
      for (const n10 of e11)
        t10.push({ index: n10.index, class: n10.thumbClass, html: T(n10) });
      return t10;
    }
    function T(t10) {
      const e11 = t10.thumb ? t10.thumb instanceof HTMLImageElement ? t10.thumb.src : t10.thumb : t10.thumbSrc || void 0, o9 = void 0 === t10.thumbAlt ? "Thumbnail #".concat(t10.index) : t10.thumbAlt + "";
      let i9 = b3("thumbTpl");
      return i9 = n4(i9, "{{alt}}", o9), i9 = n4(i9, "{{src}}", e11 + ""), i9 = n4(i9, "{{index}}", "".concat(t10.index)), i9 = n4(i9, "{{page}}", "".concat(t10.index || 1)), i9;
    }
    function L(t10) {
      return '<div index="'.concat(t10.index || 0, '" class="f-thumbs__slide ').concat(t10.class || "", '">').concat(t10.html || "", "</div>");
    }
    function E3(t10 = false) {
      var e11;
      const n10 = null == c5 ? void 0 : c5.getContainer();
      if (!c5 || !n10 || f3)
        return;
      if (!y3())
        return;
      const o9 = (null === (e11 = b3("Carousel")) || void 0 === e11 ? void 0 : e11.classes) || {};
      if (o9.container = o9.container || "f-thumbs", !f3) {
        const t11 = n10.nextElementSibling;
        (null == t11 ? void 0 : t11.classList.contains(o9.container)) && (f3 = t11);
      }
      if (!f3) {
        f3 = document.createElement("div");
        const t11 = b3("parentEl");
        t11 ? t11.insertAdjacentElement("beforeend", f3) : n10.insertAdjacentElement("afterend", f3);
      }
      s(f3, o9.container), s(f3, "f-thumbs"), s(f3, "is-".concat(b3("type"))), t10 && s(f3, "is-hidden");
    }
    function P() {
      if (!f3 || !S())
        return;
      m3 = document.createElement("div"), s(m3, "f-thumbs__viewport");
      let t10 = "";
      for (const e11 of C()) {
        "string" == typeof (e11.html || "") && (t10 += L(e11));
      }
      m3.innerHTML = t10, f3.append(m3), f3.addEventListener("click", (t11) => {
        t11.preventDefault();
        const e11 = t11.target.closest("[index]"), n10 = parseInt((null == e11 ? void 0 : e11.getAttribute("index")) || "-1");
        c5 && n10 > -1 && c5.goTo(n10);
      }), g = new IntersectionObserver((t11) => {
        t11.forEach((t12) => {
          t12.isIntersecting && t12.target instanceof HTMLImageElement && (t12.target.src = t12.target.getAttribute("data-lazy-src") + "", t12.target.removeAttribute("data-lazy-src"), null == g || g.unobserve(t12.target));
        });
      }, { root: m3, rootMargin: "100px" }), f3.querySelectorAll("[data-lazy-src]").forEach((t11) => {
        null == g || g.observe(t11);
      }), null == c5 || c5.emit("thumbs:ready");
    }
    function w2() {
      var t10;
      if (!a5 || !c5 || !f3 || S() || d3)
        return;
      const n10 = C();
      if (!n10.length)
        return;
      const o9 = r({}, { Sync: { target: c5 }, Lazyload: { preload: 1 }, slides: n10, classes: { container: "f-thumbs", viewport: "f-thumbs__viewport", slide: "f-thumbs__slide" }, center: true, fill: !x2(), infinite: false, dragFree: true, rtl: c5.getOptions().rtl || false, slidesPerPage: (t11) => {
        let e11 = 0;
        return x2() && (!function() {
          if (!x2())
            return;
          if (!f3)
            return;
          const t12 = (t13) => f3 && parseFloat(getComputedStyle(f3).getPropertyValue("--f-thumb-" + t13)) || 0;
          h3 = t12("width"), v3 = t12("clip-width");
        }(), e11 = 4 * (h3 - v3)), t11 && t11.getTotalSlideDim() <= t11.getViewportDim() - e11 ? 1 / 0 : 1;
      } }, u3.Carousel || {}, b3("Carousel") || {});
      d3 = a5(f3, o9, { Sync: i3, Lazyload: i4 }), d3.on("ready", () => {
        s(f3, "is-syncing"), null == c5 || c5.emit("thumbs:ready"), x2() && (null == c5 || c5.on("render", $));
      }), d3.on("destroy", () => {
        null == c5 || c5.emit("thumbs:destroy");
      }), d3.init(), null === (t10 = d3.getGestures()) || void 0 === t10 || t10.on("start", () => {
        p2 = false;
      }), d3.on("click", (t11, e11) => {
        const n11 = e11.target;
        if (n11) {
          const t12 = n11.matches("button") ? n11 : n11.firstElementChild;
          t12 && t12.matches("button") && (e11.preventDefault(), t12.focus({ preventScroll: true }));
        }
      }), s(c5.getContainer(), "has-thumbs"), R2();
    }
    function j2() {
      y3() && b3("showOnStart") && (E3(), P());
    }
    function A2() {
      var t10;
      y3() && (w2(), null == c5 || c5.on("addSlide", z2), null == c5 || c5.on("removeSlide", _2), null == c5 || c5.on("click", I2), null == c5 || c5.on("refresh", q2), null === (t10 = null == c5 ? void 0 : c5.getGestures()) || void 0 === t10 || t10.on("start", M3), D2(true));
    }
    function M3() {
      var t10, e11;
      p2 = true;
      (null === (t10 = document.activeElement) || void 0 === t10 ? void 0 : t10.closest(".f-thumbs")) && (null === (e11 = document.activeElement) || void 0 === e11 || e11.blur());
    }
    function $() {
      var t10, e11;
      null == f3 || f3.classList.toggle("is-syncing", false === (null == c5 ? void 0 : c5.hasNavigated()) || (null === (t10 = null == c5 ? void 0 : c5.getTween()) || void 0 === t10 ? void 0 : t10.isRunning())), R2(), (null === (e11 = null == c5 ? void 0 : c5.getGestures()) || void 0 === e11 ? void 0 : e11.isPointerDown()) && function() {
        if (!x2())
          return;
        if (!c5 || !d3)
          return;
        if (!p2)
          return;
        const t11 = d3.getTween(), e12 = d3.getPages(), n10 = c5.getPageIndex() || 0, i9 = c5.getPageProgress() || 0;
        if (!(c5 && e12 && e12[n10] && t11))
          return;
        const l8 = t11.isRunning() ? t11.getCurrentValues().pos : d3.getPosition();
        if (void 0 === l8)
          return;
        let r7 = e12[n10].pos + i9 * (h3 - v3);
        r7 = t5(e12[0].pos, r7, e12[e12.length - 1].pos), t11.from({ pos: l8 }).to({ pos: r7 }).start();
      }();
    }
    function O2() {
      p2 = true, D2();
    }
    function z2(t10, e11) {
      const n10 = { html: T(e11) };
      if (d3)
        d3.add(n10, e11.index);
      else if (m3) {
        const t11 = e(L(n10));
        if (t11) {
          m3.append(t11);
          const e12 = t11.querySelector("img");
          e12 && (null == g || g.observe(e12));
        }
      }
    }
    function _2(t10, e11) {
      var n10;
      d3 ? d3.remove(e11.index) : m3 && (null === (n10 = m3.querySelector('[index="'.concat(e11.index, '"]'))) || void 0 === n10 || n10.remove());
    }
    function I2(t10, e11) {
      var n10;
      const o9 = e11.target;
      e11.defaultPrevented || "toggle" !== (null === (n10 = null == o9 ? void 0 : o9.dataset) || void 0 === n10 ? void 0 : n10.thumbsAction) || (f3 || (E3(true), P(), w2()), f3 && f3.classList.toggle("is-hidden"));
    }
    function q2() {
      D2();
    }
    function D2(t10 = false) {
      if (!c5 || !m3 || !S())
        return;
      const e11 = c5.getPageIndex();
      m3.querySelectorAll(".is-selected").forEach((t11) => {
        t11.classList.remove("is-selected");
      });
      const n10 = m3.querySelector('[index="'.concat(e11, '"]'));
      if (n10) {
        n10.classList.add("is-selected");
        const e12 = m3.getBoundingClientRect(), o9 = n10.getBoundingClientRect(), i9 = n10.offsetTop - m3.offsetTop - 0.5 * e12.height + 0.5 * o9.height, l8 = n10.scrollLeft - m3.scrollLeft - 0.5 * e12.width + 0.5 * o9.width;
        m3.scrollTo({ top: i9, left: l8, behavior: t10 ? "instant" : "smooth" });
      }
    }
    function R2() {
      if (!x2())
        return;
      if (!c5 || !d3)
        return;
      const t10 = (null == d3 ? void 0 : d3.getSlides()) || [];
      let e11 = -0.5 * h3;
      for (const n10 of t10) {
        const t11 = n10.el;
        if (!t11)
          continue;
        let o9 = c5.getPageProgress(n10.index) || 0;
        o9 = Math.max(-1, Math.min(1, o9)), o9 > -1 && o9 < 1 && (e11 += 0.5 * h3 * (1 - Math.abs(o9))), o9 = Math.round(1e4 * o9) / 1e4, e11 = Math.round(1e4 * e11) / 1e4, t11.style.setProperty("--progress", "".concat(Math.abs(o9))), t11.style.setProperty("--shift", "".concat((null == c5 ? void 0 : c5.isRTL()) ? -1 * e11 : e11, "px")), o9 > -1 && o9 < 1 && (e11 += 0.5 * h3 * (1 - Math.abs(o9)));
      }
    }
    return { init: function(t10, e11) {
      a5 = e11, c5 = t10, c5.on("ready", A2), c5.on("initSlides", j2), c5.on("change", O2);
    }, destroy: function() {
      var t10, e11;
      S() && (null == c5 || c5.emit("thumbs:destroy")), null == c5 || c5.off("ready", A2), null == c5 || c5.off("initSlides", j2), null == c5 || c5.off("change", O2), null == c5 || c5.off("render", $), null == c5 || c5.off("addSlide", z2), null == c5 || c5.off("click", I2), null == c5 || c5.off("refresh", q2), null === (t10 = null == c5 ? void 0 : c5.getGestures()) || void 0 === t10 || t10.off("start", M3), null === (e11 = null == c5 ? void 0 : c5.getContainer()) || void 0 === e11 || e11.classList.remove("has-thumbs"), c5 = void 0, null == d3 || d3.destroy(), d3 = void 0, null == f3 || f3.remove(), f3 = void 0;
    }, getCarousel: function() {
      return d3;
    }, getContainer: function() {
      return f3;
    }, getType: function() {
      return b3("type");
    }, isEnabled: y3 };
  };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.html.js
  var a6 = { iframeAttr: { allow: "autoplay; fullscreen", scrolling: "auto" } };
  var i6 = () => {
    let i9;
    function l8(t10, a8) {
      let i10 = a8.src;
      if (!t2(i10))
        return;
      let l9 = a8.type;
      if (!l9) {
        if (l9 || ("#" === i10.charAt(0) ? l9 = "inline" : i10.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.((a)?png|avif|gif|jp(g|eg)|pjp(eg)?|jfif|svg|webp|bmp|ico|tif(f)?)((\?|#).*)?$)/i) ? l9 = "image" : i10.match(/\.(pdf)((\?|#).*)?$/i) ? l9 = "pdf" : i10.match(/\.(html|php)((\?|#).*)?$/i) && (l9 = "iframe")), !l9) {
          const t11 = i10.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i);
          t11 && (i10 = "https://maps.google.".concat(t11[1], "/?ll=").concat((t11[2] ? t11[2] + "&z=" + Math.floor(parseFloat(t11[3])) + (t11[4] ? t11[4].replace(/^\//, "&") : "") : t11[4] + "").replace(/\?/, "&"), "&output=").concat(t11[4] && t11[4].indexOf("layer=c") > 0 ? "svembed" : "embed"), l9 = "gmap");
        }
        if (!l9) {
          const t11 = i10.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i);
          t11 && (i10 = "https://maps.google.".concat(t11[1], "/maps?q=").concat(t11[2].replace("query=", "q=").replace("api=1", ""), "&output=embed"), l9 = "gmap");
        }
        a8.src = i10, a8.type = l9;
      }
    }
    function o9(e11, l9) {
      "iframe" !== l9.type && "pdf" !== l9.type && "gmap" !== l9.type || function(e12) {
        if (!i9 || !e12.el || !e12.src)
          return;
        const l10 = document.createElement("iframe");
        l10.classList.add("f-iframe");
        for (const [e13, o11] of Object.entries(function() {
          const e14 = null == i9 ? void 0 : i9.getOptions().Html;
          return t(e14) ? Object.assign(Object.assign({}, a6), e14) : a6;
        }().iframeAttr || {}))
          l10.setAttribute(e13, o11);
        l10.onerror = () => {
          i9 && 1 === i9.getState() && i9.showError(e12, "{{IFRAME_ERROR}}");
        }, l10.src = e12.src;
        const o10 = document.createElement("div");
        if (o10.classList.add("f-html"), o10.append(l10), e12.width) {
          let t10 = "".concat(e12.width);
          t10.match(/^\d+$/) && (t10 += "px"), o10.style.maxWidth = "".concat(t10);
        }
        if (e12.height) {
          let t10 = "".concat(e12.height);
          t10.match(/^\d+$/) && (t10 += "px"), o10.style.maxHeight = "".concat(t10);
        }
        if (e12.aspectRatio) {
          const t10 = e12.el.getBoundingClientRect();
          o10.style.aspectRatio = "".concat(e12.aspectRatio), o10.style[t10.width > t10.height ? "width" : "height"] = "auto", o10.style[t10.width > t10.height ? "maxWidth" : "maxHeight"] = "none";
        }
        e12.contentEl = l10, e12.htmlEl = o10, e12.el.classList.add("has-html"), e12.el.classList.add("has-iframe"), e12.el.classList.add("has-".concat(e12.type)), e12.el.prepend(o10), i9.emit("contentReady", e12);
      }(l9);
    }
    function n10(t10, e11) {
      var a8, l9;
      "iframe" !== e11.type && "pdf" !== e11.type && "gmap" !== e11.type || (null == i9 || i9.hideError(e11), null === (a8 = e11.contentEl) || void 0 === a8 || a8.remove(), e11.contentEl = void 0, null === (l9 = e11.htmlEl) || void 0 === l9 || l9.remove(), e11.htmlEl = void 0);
    }
    return { init: function(t10) {
      i9 = t10, i9.on("addSlide", l8), i9.on("attachSlideEl", o9), i9.on("detachSlideEl", n10);
    }, destroy: function() {
      null == i9 || i9.off("addSlide", l8), null == i9 || i9.off("attachSlideEl", o9), null == i9 || i9.off("detachSlideEl", n10), i9 = void 0;
    } };
  };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.video.js
  var n7 = (t10, e11 = {}) => {
    const o9 = new URL(t10), n10 = new URLSearchParams(o9.search), i9 = new URLSearchParams();
    for (const [t11, o10] of [...n10, ...Object.entries(e11)]) {
      let e12 = o10 + "";
      if ("t" === t11) {
        let t12 = e12.match(/((\d*)m)?(\d*)s?/);
        t12 && i9.set("start", 60 * parseInt(t12[2] || "0") + parseInt(t12[3] || "0") + "");
      } else
        i9.set(t11, e12);
    }
    let l8 = i9 + "", s11 = t10.match(/#t=((.*)?\d+s)/);
    return s11 && (l8 += "#t=".concat(s11[1])), l8;
  };
  var i7 = { autoplay: false, html5videoTpl: '<video class="f-html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n    <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>', iframeAttr: { allow: "autoplay; fullscreen", scrolling: "auto", credentialless: "" }, vimeo: { byline: 1, color: "00adef", controls: 1, dnt: 1, muted: 0 }, youtube: { controls: 1, enablejsapi: 1, nocookie: 1, rel: 0, fs: 1 } };
  var l5 = () => {
    let l8, s11 = false;
    function a8() {
      const e11 = null == l8 ? void 0 : l8.getOptions().Video;
      return t(e11) ? Object.assign(Object.assign({}, i7), e11) : i7;
    }
    function r7() {
      var t10;
      return null === (t10 = null == l8 ? void 0 : l8.getPage()) || void 0 === t10 ? void 0 : t10.slides[0];
    }
    const c5 = (t10) => {
      var e11;
      try {
        let o9 = JSON.parse(t10.data);
        if ("https://player.vimeo.com" === t10.origin) {
          if ("ready" === o9.event)
            for (let o10 of Array.from((null === (e11 = null == l8 ? void 0 : l8.getContainer()) || void 0 === e11 ? void 0 : e11.getElementsByClassName("f-iframe")) || []))
              o10 instanceof HTMLIFrameElement && o10.contentWindow === t10.source && (o10.dataset.ready = "true");
        } else if (t10.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && "onReady" === o9.event) {
          const t11 = document.getElementById(o9.id);
          t11 && (t11.dataset.ready = "true");
        }
      } catch (t11) {
      }
    };
    function d3(t10, o9) {
      const i9 = o9.src;
      if (!t2(i9))
        return;
      let l9 = o9.type;
      if (!l9 || "html5video" === l9) {
        const t11 = i9.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i);
        t11 && (l9 = "html5video", o9.html5videoFormat = o9.html5videoFormat || "video/" + ("ogv" === t11[1] ? "ogg" : t11[1]));
      }
      if (!l9 || "youtube" === l9) {
        const t11 = i9.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i);
        if (t11) {
          const e11 = Object.assign(Object.assign({}, a8().youtube), o9.youtube || {}), s12 = "www.youtube".concat(e11.nocookie ? "-nocookie" : "", ".com"), r8 = n7(i9, e11), c6 = encodeURIComponent(t11[2]);
          o9.videoId = c6, o9.src = "https://".concat(s12, "/embed/").concat(c6, "?").concat(r8), o9.thumb = o9.thumb || "https://i.ytimg.com/vi/".concat(c6, "/mqdefault.jpg"), l9 = "youtube";
        }
      }
      if (!l9 || "vimeo" === l9) {
        const t11 = i9.match(/^.+vimeo.com\/(?:\/)?(video\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/);
        if (t11) {
          const e11 = Object.assign(Object.assign({}, a8().vimeo), o9.vimeo || {}), s12 = n7(i9, e11), r8 = encodeURIComponent(t11[2]), c6 = t11[5] || "";
          o9.videoId = r8, o9.src = "https://player.vimeo.com/video/".concat(r8, "?").concat(c6 ? "h=".concat(c6).concat(s12 ? "&" : "") : "").concat(s12), l9 = "vimeo";
        }
      }
      o9.type = l9;
    }
    function u5(t10, n10) {
      "html5video" === n10.type && function(t11) {
        if (!l8 || !t11.el || !t11.src)
          return;
        const { el: n11, src: i9 } = t11;
        if (!n11 || !i9)
          return;
        const s12 = t11.html5videoTpl || a8().html5videoTpl, r8 = t11.html5videoFormat || a8().html5videoFormat;
        if (!s12)
          return;
        const c6 = t11.poster || (t11.thumb && t2(t11.thumb) ? t11.thumb : ""), d4 = e(s12.replace(/\{\{src\}\}/gi, i9 + "").replace(/\{\{format\}\}/gi, r8 || "").replace(/\{\{poster\}\}/gi, c6 + ""));
        if (!d4)
          return;
        const u6 = document.createElement("div");
        u6.classList.add("f-html"), u6.append(d4), t11.contentEl = d4, t11.htmlEl = u6, n11.classList.add("has-".concat(t11.type)), n11.prepend(u6), h3(t11), l8.emit("contentReady", t11);
      }(n10), "youtube" !== n10.type && "vimeo" !== n10.type || function(t11) {
        if (!l8 || !t11.el || !t11.src)
          return;
        const e11 = document.createElement("iframe");
        e11.classList.add("f-iframe"), e11.setAttribute("id", "f-iframe_".concat(t11.videoId));
        for (const [t12, o10] of Object.entries(a8().iframeAttr || {}))
          e11.setAttribute(t12, o10);
        e11.onload = () => {
          var o10;
          l8 && 1 === l8.getState() && "youtube" === t11.type && (null === (o10 = e11.contentWindow) || void 0 === o10 || o10.postMessage(JSON.stringify({ event: "listening", id: e11.getAttribute("id") }), "*"));
        }, e11.onerror = () => {
          l8 && 1 === l8.getState() && (null == l8 || l8.showError(t11, "{{IFRAME_ERROR}}"));
        }, e11.src = t11.src;
        const o9 = document.createElement("div");
        o9.classList.add("f-html"), o9.append(e11), t11.contentEl = e11, t11.htmlEl = o9, t11.el.classList.add("has-html"), t11.el.classList.add("has-iframe"), t11.el.classList.add("has-".concat(t11.type)), t11.el.prepend(o9), h3(t11), l8.emit("contentReady", t11);
      }(n10);
    }
    function m3(t10, e11) {
      var o9, n10;
      "html5video" !== e11.type && "youtube" !== e11.type && "vimeo" !== e11.type || (null === (o9 = e11.contentEl) || void 0 === o9 || o9.remove(), e11.contentEl = void 0, null === (n10 = e11.htmlEl) || void 0 === n10 || n10.remove(), e11.htmlEl = void 0), e11.poller && clearTimeout(e11.poller);
    }
    function f3() {
      s11 = false;
    }
    function p2() {
      if (s11)
        return;
      s11 = true;
      const t10 = r7();
      (t10 && void 0 !== t10.autoplay ? t10.autoplay : a8().autoplay) && (function() {
        var t11;
        const e11 = r7(), o9 = null == e11 ? void 0 : e11.el;
        if (o9 && "html5video" === (null == e11 ? void 0 : e11.type))
          try {
            const t12 = o9.querySelector("video");
            if (t12) {
              const e12 = t12.play();
              void 0 !== e12 && e12.then(() => {
              }).catch((e13) => {
                t12.muted = true, t12.play();
              });
            }
          } catch (t12) {
          }
        const n10 = null == e11 ? void 0 : e11.htmlEl;
        n10 instanceof HTMLIFrameElement && (null === (t11 = n10.contentWindow) || void 0 === t11 || t11.postMessage('{"event":"command","func":"stopVideo","args":""}', "*"));
      }(), function() {
        const t11 = r7(), e11 = null == t11 ? void 0 : t11.type;
        if (!(null == t11 ? void 0 : t11.el) || "youtube" !== e11 && "vimeo" !== e11)
          return;
        const o9 = () => {
          if (t11.contentEl && t11.contentEl instanceof HTMLIFrameElement && t11.contentEl.contentWindow) {
            let e12;
            if ("true" === t11.contentEl.dataset.ready)
              return e12 = "youtube" === t11.type ? { event: "command", func: "playVideo" } : { method: "play", value: "true" }, e12 && t11.contentEl.contentWindow.postMessage(JSON.stringify(e12), "*"), void (t11.poller = void 0);
            "youtube" === t11.type && (e12 = { event: "listening", id: t11.contentEl.getAttribute("id") }, t11.contentEl.contentWindow.postMessage(JSON.stringify(e12), "*"));
          }
          t11.poller = setTimeout(o9, 250);
        };
        o9();
      }());
    }
    function h3(t10) {
      const e11 = null == t10 ? void 0 : t10.htmlEl;
      if (t10 && e11 && ("html5video" === t10.type || "youtube" === t10.type || "vimeo" === t10.type)) {
        if (e11.style.aspectRatio = "", e11.style.width = "", e11.style.height = "", e11.style.maxWidth = "", e11.style.maxHeight = "", t10.width) {
          let o9 = "".concat(t10.width);
          o9.match(/^\d+$/) && (o9 += "px"), e11.style.maxWidth = "".concat(o9);
        }
        if (t10.height) {
          let o9 = "".concat(t10.height);
          o9.match(/^\d+$/) && (o9 += "px"), e11.style.maxHeight = "".concat(o9);
        }
        if (t10.aspectRatio) {
          const o9 = t10.aspectRatio.split("/"), n10 = parseFloat(o9[0].trim()), i9 = o9[1] ? parseFloat(o9[1].trim()) : 0, l9 = n10 && i9 ? n10 / i9 : n10;
          e11.offsetHeight;
          const s12 = e11.getBoundingClientRect(), a9 = l9 < (s12.width || 1) / (s12.height || 1);
          e11.style.aspectRatio = "".concat(t10.aspectRatio), e11.style.width = a9 ? "auto" : "", e11.style.height = a9 ? "" : "auto";
        }
      }
    }
    function v3() {
      h3(r7());
    }
    return { init: function(t10) {
      l8 = t10, l8.on("addSlide", d3), l8.on("attachSlideEl", u5), l8.on("detachSlideEl", m3), l8.on("ready", p2), l8.on("change", f3), l8.on("settle", p2), l8.on("refresh", v3), window.addEventListener("message", c5);
    }, destroy: function() {
      null == l8 || l8.off("addSlide", d3), null == l8 || l8.off("attachSlideEl", u5), null == l8 || l8.off("detachSlideEl", m3), null == l8 || l8.off("ready", p2), null == l8 || l8.off("change", f3), null == l8 || l8.off("settle", p2), null == l8 || l8.off("refresh", v3), window.removeEventListener("message", c5), l8 = void 0;
    } };
  };

  // node_modules/@fancyapps/ui/dist/carousel/carousel.fullscreen.js
  var n8 = { autoStart: false, btnTpl: '<button data-fullscreen-action="toggle" class="f-button" title="{{TOGGLE_FULLSCREEN}}"><svg><g><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>' };
  var t9 = "in-fullscreen-mode";
  var l6 = () => {
    let l8;
    function u5(t10) {
      const u6 = null == l8 ? void 0 : l8.getOptions().Fullscreen;
      let o10 = (t(u6) ? Object.assign(Object.assign({}, n8), u6) : n8)[t10];
      return o10 && "function" == typeof o10 && l8 ? o10(l8) : o10;
    }
    function o9() {
      var e11;
      null === (e11 = null == l8 ? void 0 : l8.getPlugins().Toolbar) || void 0 === e11 || e11.add("fullscreen", { tpl: u5("btnTpl") });
    }
    function c5() {
      if (u5("autoStart")) {
        const e11 = s11();
        e11 && a8(e11);
      }
    }
    function i9(e11, n10) {
      const t10 = n10.target;
      t10 && !n10.defaultPrevented && "toggle" === t10.dataset.fullscreenAction && d3();
    }
    function s11() {
      return u5("el") || (null == l8 ? void 0 : l8.getContainer()) || void 0;
    }
    function r7() {
      const e11 = document;
      return e11.fullscreenEnabled ? !!e11.fullscreenElement : !!e11.webkitFullscreenEnabled && !!e11.webkitFullscreenElement;
    }
    function a8(e11) {
      const n10 = document;
      let l9;
      return e11 || (e11 = n10.documentElement), n10.fullscreenEnabled ? l9 = e11.requestFullscreen() : n10.webkitFullscreenEnabled && (l9 = e11.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)), l9 && l9.then(() => {
        e11.classList.add(t9);
      }), l9;
    }
    function f3() {
      const e11 = document;
      let n10;
      return e11.fullscreenEnabled ? n10 = e11.fullscreenElement && e11.exitFullscreen() : e11.webkitFullscreenEnabled && (n10 = e11.webkitFullscreenElement && e11.webkitExitFullscreen()), n10 && n10.then(() => {
        var e12;
        null === (e12 = s11()) || void 0 === e12 || e12.classList.remove(t9);
      }), n10;
    }
    function d3() {
      if (r7())
        f3();
      else {
        const e11 = s11();
        e11 && a8(e11);
      }
    }
    return { init: function(e11) {
      l8 = e11, l8.on("initPlugins", o9), l8.on("ready", c5), l8.on("click", i9);
    }, destroy: function() {
      null == l8 || l8.off("initPlugins", o9), null == l8 || l8.off("ready", c5), null == l8 || l8.off("click", i9);
    }, exit: f3, inFullscreen: r7, request: a8, toggle: d3 };
  };

  // node_modules/@fancyapps/ui/dist/fancybox/fancybox.hash.js
  var e10;
  var n9;
  var o7 = false;
  var r6 = false;
  var i8 = false;
  var l7 = false;
  var s10 = () => {
    const t10 = new URL(document.URL).hash, e11 = t10.slice(1).split("-"), n10 = e11[e11.length - 1], o9 = n10 && /^\+?\d+$/.test(n10) && parseInt(e11.pop() || "1", 10) || 1;
    return { urlHash: t10, urlSlug: e11.join("-"), urlIndex: o9 };
  };
  var a7 = () => {
    const t10 = null == e10 ? void 0 : e10.getInstance();
    return !(!t10 || 1 != t10.getState());
  };
  var u4 = () => {
    if (!e10)
      return;
    if (a7())
      return;
    const { urlSlug: t10, urlIndex: n10 } = s10();
    if (!t10)
      return;
    let o9 = document.querySelector('[data-slug="'.concat(t10, '"]'));
    o9 && e10.fromTriggerEl(o9), a7() || (o9 = document.querySelectorAll('[data-fancybox="'.concat(t10, '"]'))[n10 - 1], o9 && e10.fromTriggerEl(o9, { startIndex: n10 - 1 })), a7() && o9 && !o9.closest("[inert]") && o9.scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
  };
  var c4 = () => {
    if (!e10)
      return;
    if (i8)
      return;
    const t10 = null == e10 ? void 0 : e10.getInstance(), n10 = null == t10 ? void 0 : t10.getCarousel();
    if (false === (null == t10 ? void 0 : t10.getOptions().Hash))
      return;
    const { urlSlug: o9, urlIndex: a8 } = s10();
    if (t10 && n10) {
      const e11 = n10.getSlides();
      for (const t11 of e11 || [])
        if (o9 === t11.slug || o9 === t11.fancybox && t11.index === a8 - 1)
          return r6 = false, void n10.goTo(t11.index);
      l7 = true, t10.close(), l7 = false;
    }
    u4();
  };
  var d2 = () => {
    e10 && (n9 = setTimeout(() => {
      o7 = true, u4(), o7 = false;
    }, 300), window.addEventListener("hashchange", c4, false));
  };
  var f2 = () => {
    let t10, e11 = "auto", a8 = "";
    function u5() {
      var n10, i9, l8;
      if (!t10 || !t10.isTopMost())
        return;
      if (false === t10.getOptions().Hash)
        return;
      if (o7) {
        const e12 = t10.getOptions().sync;
        e12 && e12.goTo((null === (n10 = null == t10 ? void 0 : t10.getCarousel()) || void 0 === n10 ? void 0 : n10.getPageIndex()) || 0, { transition: false, tween: false });
      }
      const u6 = t10.getCarousel();
      if (!u6)
        return;
      const { urlHash: d4, urlSlug: f3 } = s10(), g = t10.getSlide();
      if (!g)
        return;
      let h3 = g.slug || g.fancybox || "", w2 = parseInt(g.index + "", 10) + 1;
      if (!h3)
        return;
      let p2 = g.slug ? "#".concat(g.slug) : "#".concat(h3, "-").concat(w2);
      ((null === (l8 = null === (i9 = t10.getCarousel()) || void 0 === i9 ? void 0 : i9.getPages()) || void 0 === l8 ? void 0 : l8.length) || 0) < 2 && (p2 = "#".concat(h3)), d4 !== p2 && (a8 = d4), history.scrollRestoration && (e11 = history.scrollRestoration, history.scrollRestoration = "manual"), u6.on("change", c5);
      const y3 = h3 !== f3;
      try {
        window.history[y3 ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + p2), y3 && (r6 = true);
      } catch (t11) {
      }
    }
    function c5() {
      if (!t10 || !t10.isTopMost())
        return;
      if (false === t10.getOptions().Hash)
        return;
      const e12 = t10.getSlide();
      if (!e12)
        return;
      let n10 = e12.slug || e12.fancybox || "", o9 = e12.index + 1, r7 = e12.slug ? "#".concat(e12.slug) : "#".concat(n10, "-").concat(o9);
      i8 = true;
      try {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search + r7);
      } catch (t11) {
      }
      i8 = false;
    }
    function d3() {
      if (l7)
        return;
      if (!t10 || !t10.isTopMost())
        return;
      if (false === t10.getOptions().Hash)
        return;
      const e12 = t10.getSlide();
      if (!e12)
        return;
      if (e12.fancybox || "") {
        i8 = true;
        try {
          r6 && !function() {
            if (window.parent === window)
              return false;
            try {
              var t11 = window.frameElement;
            } catch (e13) {
              t11 = null;
            }
            return null === t11 ? "data:" === location.protocol : t11.hasAttribute("sandbox");
          }() ? window.history.back() : window.history.replaceState({}, document.title, window.location.pathname + window.location.search + a8);
        } catch (t11) {
        }
        i8 = false;
      }
    }
    return { init: function(e12) {
      clearTimeout(n9), t10 = e12, t10.on("ready", u5), t10.on("close", d3);
    }, destroy: function() {
      null == t10 || t10.off("ready", u5), null == t10 || t10.off("close", d3);
      const n10 = null == t10 ? void 0 : t10.getCarousel();
      n10 && n10.off("change", c5), t10 = void 0, history.scrollRestoration && e11 && (history.scrollRestoration = e11);
    } };
  };
  f2.startFromUrl = u4, f2.setup = function(n10) {
    e10 || (e10 = n10, e3() && (/complete|interactive|loaded/.test(document.readyState) ? d2() : document.addEventListener("DOMContentLoaded", d2)));
  };

  // node_modules/@fancyapps/ui/dist/fancybox/l10n/en_EN.js
  var o8 = Object.assign(Object.assign({}, o3), { CLOSE: "Close", NEXT: "Next", PREV: "Previous", MODAL: "You can close this modal content with the ESC key", ELEMENT_NOT_FOUND: "HTML Element Not Found", IFRAME_ERROR: "Error Loading Page" });

  // node_modules/@fancyapps/ui/dist/fancybox/fancybox.js
  var A = '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24"><path d="M19.286 4.714 4.714 19.286M4.714 4.714l14.572 14.572" /></svg></button>';
  r5().add("close", { tpl: A });
  var k2 = (e11) => {
    e11.cancelable && e11.preventDefault();
  };
  var O = (e11 = null, t10 = "", n10) => {
    if (!e11 || !e11.parentElement || !t10)
      return void (n10 && n10());
    R(e11);
    const o9 = (i9) => {
      i9.target === e11 && e11.dataset.animationName && (e11.removeEventListener("animationend", o9), delete e11.dataset.animationName, n10 && n10(), e11.classList.remove(t10));
    };
    e11.dataset.animationName = t10, e11.addEventListener("animationend", o9), s(e11, t10);
  };
  var R = (e11) => {
    e11 && e11.dispatchEvent(new CustomEvent("animationend", { bubbles: false, cancelable: true, currentTarget: e11 }));
  };
  var _;
  !function(e11) {
    e11[e11.Init = 0] = "Init", e11[e11.Ready = 1] = "Ready", e11[e11.Closing = 2] = "Closing", e11[e11.Destroyed = 3] = "Destroyed";
  }(_ || (_ = {}));
  var I = { ajax: null, backdropClick: "close", Carousel: {}, closeButton: "auto", closeExisting: false, delegateEl: void 0, dragToClose: true, fadeEffect: true, groupAll: false, groupAttr: "data-fancybox", hideClass: "f-fadeOut", hideScrollbar: true, id: void 0, idle: false, keyboard: { Escape: "close", Delete: "close", Backspace: "close", PageUp: "next", PageDown: "prev", ArrowUp: "prev", ArrowDown: "next", ArrowRight: "next", ArrowLeft: "prev" }, l10n: o8, mainClass: "", mainStyle: {}, mainTpl: '<dialog class="fancybox__dialog">\n    <div class="fancybox__container" tabindex="0" aria-label="{{MODAL}}">\n      <div class="fancybox__backdrop"></div>\n      <div class="fancybox__carousel"></div>\n    </div>\n  </dialog>', modal: true, on: {}, parentEl: void 0, placeFocusBack: true, showClass: "f-zoomInUp", startIndex: 0, sync: void 0, theme: "dark", triggerEl: void 0, triggerEvent: void 0, zoomEffect: true };
  var z = /* @__PURE__ */ new Map();
  var H = 0;
  var D = "with-fancybox";
  var B = () => {
    let r7, T, M3, B2, q2, F, V, W = _.Init, $ = Object.assign({}, I), K = -1, U = {}, X = [], G = false, Y = true, Z = 0;
    function J(e11, ...t10) {
      let n10 = $[e11];
      return n10 && "function" == typeof n10 ? n10(Oe, ...t10) : n10;
    }
    function Q(e11, t10 = []) {
      const n10 = J("l10n") || {};
      e11 = String(e11).replace(/\{\{(\w+)\}\}/g, (e12, t11) => n10[t11] || e12);
      for (let n11 = 0; n11 < t10.length; n11++)
        e11 = e11.split(t10[n11][0]).join(t10[n11][1]);
      return e11 = e11.replace(/\{\{(.*?)\}\}/g, (e12, t11) => t11);
    }
    const ee = /* @__PURE__ */ new Map();
    function te(e11, ...t10) {
      const n10 = [...ee.get(e11) || []];
      for (const [t11, o9] of Object.entries($.on || {}))
        (t11 === e11 || t11.split(" ").indexOf(e11) > -1) && n10.push(o9);
      for (const e12 of n10)
        e12 && "function" == typeof e12 && e12(Oe, ...t10);
      "*" !== e11 && te("*", e11, ...t10);
    }
    function ne() {
      s2(T, "is-revealing");
      try {
        if (document.activeElement === r7) {
          ((null == T ? void 0 : T.querySelector("[autofocus]")) || T).focus();
        }
      } catch (e11) {
      }
    }
    function oe(e11, n10) {
      var o9;
      ve(n10), de(), null === (o9 = n10.el) || void 0 === o9 || o9.addEventListener("click", se), "inline" !== n10.type && "clone" !== n10.type || function(e12) {
        if (!B2 || !e12 || !e12.el)
          return;
        let n11 = null;
        if (t2(e12.src)) {
          const t10 = e12.src.split("#", 2).pop();
          n11 = t10 ? document.getElementById(t10) : null;
        }
        if (n11) {
          if (s(n11, "f-html"), "clone" === e12.type || n11.closest(".fancybox__carousel")) {
            n11 = n11.cloneNode(true);
            const t10 = n11.dataset.animationName;
            t10 && (n11.classList.remove(t10), delete n11.dataset.animationName);
            let o10 = n11.getAttribute("id");
            o10 = o10 ? "".concat(o10, "--clone") : "clone-".concat(K, "-").concat(e12.index), n11.setAttribute("id", o10);
          } else if (n11.parentNode) {
            const t10 = document.createElement("div");
            t10.inert = true, n11.parentNode.insertBefore(t10, n11), e12.placeholderEl = t10;
          }
          e12.htmlEl = n11, s(e12.el, "has-html"), e12.el.prepend(n11), n11.classList.remove("hidden"), "none" === n11.style.display && (n11.style.display = ""), "none" === getComputedStyle(n11).getPropertyValue("display") && (n11.style.display = n11.dataset.display || "flex"), null == B2 || B2.emit("contentReady", e12);
        } else
          null == B2 || B2.showError(e12, "{{ELEMENT_NOT_FOUND}}");
      }(n10), "ajax" === n10.type && function(e12) {
        const t10 = e12.el;
        if (!t10)
          return;
        if (e12.htmlEl || e12.xhr)
          return;
        null == B2 || B2.showLoading(e12), e12.state = 0;
        const n11 = new XMLHttpRequest();
        n11.onreadystatechange = function() {
          if (n11.readyState === XMLHttpRequest.DONE && W === _.Ready)
            if (null == B2 || B2.hideLoading(e12), e12.state = 1, 200 === n11.status) {
              let o11 = n11.responseText + "", i9 = null, s11 = null;
              if (e12.filter) {
                const t11 = document.createElement("div");
                t11.innerHTML = o11, s11 = t11.querySelector(e12.filter + "");
              }
              s11 && s11 instanceof HTMLElement ? i9 = s11 : (i9 = document.createElement("div"), i9.innerHTML = o11), i9.classList.add("f-html"), e12.htmlEl = i9, t10.classList.add("has-html"), t10.classList.add("has-ajax"), t10.prepend(i9), null == B2 || B2.emit("contentReady", e12);
            } else
              null == B2 || B2.showError(e12);
        };
        const o10 = J("ajax") || null;
        n11.open(o10 ? "POST" : "GET", e12.src + ""), n11.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n11.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n11.send(o10), e12.xhr = n11;
      }(n10);
    }
    function ie(e11, t10) {
      var n10;
      ye(t10), null === (n10 = t10.el) || void 0 === n10 || n10.removeEventListener("click", se), "inline" !== t10.type && "clone" !== t10.type || function(e12) {
        const t11 = e12.htmlEl, n11 = e12.placeholderEl;
        t11 && ("none" !== getComputedStyle(t11).getPropertyValue("display") && (t11.style.display = "none"), t11.offsetHeight);
        n11 && (t11 && n11.parentNode && n11.parentNode.insertBefore(t11, n11), n11.remove());
        e12.htmlEl = void 0, e12.placeholderEl = void 0;
      }(t10), t10.xhr && (t10.xhr.abort(), t10.xhr = void 0);
    }
    function se(e11) {
      if (!be())
        return;
      if (W !== _.Ready)
        return k2(e11), void e11.stopPropagation();
      if (e11.defaultPrevented)
        return;
      if (!f.isClickAllowed())
        return;
      const t10 = e11.composedPath()[0];
      t10.closest(".fancybox__carousel") && t10.classList.contains("fancybox__slide") && fe(e11);
    }
    function le() {
      Y = false, T && B2 && T.classList.remove("is-revealing"), de();
      const e11 = J("sync");
      if (B2 && e11) {
        const t10 = e11.getPageIndex(B2.getPageIndex()) || 0;
        e11.goTo(t10, { transition: false, tween: false });
      }
    }
    function re() {
      var e11;
      !function() {
        const e12 = null == B2 ? void 0 : B2.getViewport();
        if (!J("dragToClose") || !B2 || !e12)
          return;
        if (q2 = f(e12).init(), !q2)
          return;
        let t11 = false, n10 = 0, o9 = 0, s11 = {}, l8 = 1;
        function r8() {
          var e13, t12;
          null == F || F.spring({ clamp: true, mass: 1, tension: 0 === o9 ? 140 : 960, friction: 17, restDelta: 0.1, restSpeed: 0.1, maxSpeed: 1 / 0 }).from({ y: n10 }).to({ y: o9 }).start();
          const i9 = (null === (e13 = null == B2 ? void 0 : B2.getViewport()) || void 0 === e13 ? void 0 : e13.getBoundingClientRect().height) || 0, s12 = null === (t12 = Ee()) || void 0 === t12 ? void 0 : t12.panzoomRef;
          if (i9 && s12)
            if (0 === o9)
              s12.execute(v.Reset);
            else {
              const e14 = t6(Math.abs(n10), 0, 0.33 * i9, l8, 0.77 * l8, false);
              s12.execute(v.ZoomTo, { scale: e14 });
            }
        }
        const c5 = (e13) => {
          var t12;
          const n11 = e13.srcEvent, o10 = n11.target;
          return B2 && !(e6(n11) && (null === (t12 = n11.touches) || void 0 === t12 ? void 0 : t12.length) > 1) && o10 && !t3(o10);
        };
        F = c().on("step", (t12) => {
          if (T && e12 && W === _.Ready) {
            const o10 = e12.getBoundingClientRect().height;
            n10 = Math.min(o10, Math.max(-1 * o10, t12.y));
            const i9 = t6(Math.abs(n10), 0, 0.5 * o10, 1, 0, true);
            T.style.setProperty("--f-drag-opacity", i9 + ""), T.style.setProperty("--f-drag-offset", n10 + "px");
          }
        }), q2.on("start", function() {
          t11 || (null == F || F.pause(), o9 = n10);
        }).on("panstart", (e13) => {
          var n11, o10;
          if (!t11 && c5(e13) && "y" === e13.axis) {
            k2(e13.srcEvent), t11 = true, Te(), null === (n11 = null == B2 ? void 0 : B2.getViewport()) || void 0 === n11 || n11.classList.add("is-dragging");
            const i9 = null === (o10 = Ee()) || void 0 === o10 ? void 0 : o10.panzoomRef;
            if (i9) {
              l8 = i9.getTransform().scale || 1;
              const e14 = i9.getOptions();
              s11 = Object.assign({}, e14), e14.bounds = false, e14.gestures = false;
            }
          } else
            t11 = false;
        }).on("pan", function(e13) {
          t11 && c5(e13) && (k2(e13.srcEvent), e13.srcEvent.stopPropagation(), "y" === e13.axis && (o9 += e13.deltaY, r8()));
        }).on("end", (e13) => {
          var i9, l9, a8;
          if (null === (i9 = null == B2 ? void 0 : B2.getViewport()) || void 0 === i9 || i9.classList.remove("is-dragging"), t11) {
            const t12 = null === (l9 = Ee()) || void 0 === l9 ? void 0 : l9.panzoomRef;
            if (t12) {
              null === (a8 = t12.getTween()) || void 0 === a8 || a8.end();
              const e14 = t12.getOptions();
              e14.bounds = s11.bounds || false, e14.gestures = s11.gestures || false;
            }
            c5(e13) && "y" === e13.axis && (Math.abs(e13.velocityY) > 5 || Math.abs(n10) > 50) && Me(e13.srcEvent, "f-throwOut" + (e13.velocityY > 0 ? "Down" : "Up"));
          }
          t11 = false, W === _.Ready && 0 !== n10 && (o9 = 0, r8());
        });
      }(), document.body.addEventListener("click", pe), document.body.addEventListener("keydown", ge, { passive: false, capture: true }), de(), je();
      const t10 = J("sync");
      B2 && t10 && (null === (e11 = t10.getTween()) || void 0 === e11 || e11.start()), he(Ee());
    }
    function ae() {
      (null == B2 ? void 0 : B2.canGoNext()) ? je() : Ce();
    }
    function ce(e11, t10) {
      ve(t10), he(t10);
    }
    function ue() {
      var e11;
      const t10 = null == B2 ? void 0 : B2.getPlugins().Thumbs;
      s3(T, "has-thumbs", (null == t10 ? void 0 : t10.isEnabled()) || false), s3(T, "has-vertical-thumbs", !!t10 && ("scrollable" === t10.getType() || true === (null === (e11 = t10.getCarousel()) || void 0 === e11 ? void 0 : e11.isVertical())));
    }
    function de() {
      if (T) {
        const e11 = (null == B2 ? void 0 : B2.getPages()) || [], t10 = (null == B2 ? void 0 : B2.getPageIndex()) || 0;
        for (const e12 of T.querySelectorAll("[data-fancybox-index]"))
          e12.innerHTML = t10 + "";
        for (const e12 of T.querySelectorAll("[data-fancybox-page]"))
          e12.innerHTML = t10 + 1 + "";
        for (const t11 of T.querySelectorAll("[data-fancybox-pages]"))
          t11.innerHTML = e11.length + "";
      }
    }
    function fe(e11) {
      if (!!e11.composedPath()[0].closest("[data-fancybox-close]"))
        return void Me(e11);
      if (te("backdropClick", e11), e11.defaultPrevented)
        return;
      J("backdropClick") && Me(e11);
    }
    function me() {
      Pe();
    }
    function ge(e11) {
      if (!be())
        return;
      if (W !== _.Ready)
        return;
      const t10 = e11.key, o9 = J("keyboard");
      if (!o9)
        return;
      if (e11.ctrlKey || e11.altKey || e11.shiftKey)
        return;
      const i9 = e11.composedPath()[0];
      if (!n(i9))
        return;
      if ("Escape" !== t10 && ((e12) => {
        const t11 = ["input", "textarea", "select", "option", "video", "iframe", "[contenteditable]", "[data-selectable]", "[data-draggable]"].join(",");
        return e12.matches(t11) || e12.closest(t11);
      })(i9))
        return;
      if (te("keydown", e11), e11.defaultPrevented)
        return;
      const s11 = o9[t10];
      if (s11)
        switch (s11) {
          case "close":
            Me(e11);
            break;
          case "next":
            k2(e11), null == B2 || B2.next();
            break;
          case "prev":
            k2(e11), null == B2 || B2.prev();
        }
    }
    function pe(e11) {
      if (!be())
        return;
      if (W !== _.Ready)
        return;
      if (Pe(), e11.defaultPrevented)
        return;
      const t10 = e11.composedPath()[0], n10 = !!t10.closest("[data-fancybox-close]"), o9 = t10.classList.contains("fancybox__backdrop");
      (n10 || o9) && fe(e11);
    }
    function ve(e11) {
      var t10;
      const { el: n10, htmlEl: i9, panzoomRef: s11, closeButtonEl: l8 } = e11, r8 = s11 ? s11.getWrapper() : i9;
      if (!n10 || !n10.parentElement || !r8)
        return;
      let a8 = J("closeButton");
      if ("auto" === a8 && (a8 = true !== (null === (t10 = null == B2 ? void 0 : B2.getPlugins().Toolbar) || void 0 === t10 ? void 0 : t10.isEnabled())), a8) {
        if (!l8) {
          const t11 = e(Q(A));
          t11 && (s(t11, "is-close-button"), e11.closeButtonEl = r8.insertAdjacentElement("afterbegin", t11), s(n10, "has-close-btn"));
        }
      } else
        ye(e11);
    }
    function ye(e11) {
      e11.closeButtonEl && (e11.closeButtonEl.remove(), e11.closeButtonEl = void 0), s2(e11.el, "has-close-btn");
    }
    function he(e11) {
      if (!(Y && B2 && 1 === B2.getState() && e11 && e11.index === B2.getOptions().initialPage && e11.el && e11.el.parentElement))
        return;
      if (void 0 !== e11.state && 1 !== e11.state)
        return;
      Y = false;
      const t10 = e11.panzoomRef, n10 = null == t10 ? void 0 : t10.getTween(), o9 = J("zoomEffect") && n10 ? we(e11) : void 0;
      if (t10 && n10 && o9) {
        const { x: e12, y: i10, scale: s11 } = t10.getStartPosition();
        return void n10.spring({ tension: 215, friction: 25, restDelta: 1e-3, restSpeed: 1e-3, maxSpeed: 1 / 0 }).from(o9).to({ x: e12, y: i10, scale: s11 }).start();
      }
      const i9 = (null == t10 ? void 0 : t10.getContent()) || e11.htmlEl;
      i9 && O(i9, J("showClass", e11));
    }
    function be() {
      var e11;
      return (null === (e11 = N.getInstance()) || void 0 === e11 ? void 0 : e11.getId()) === K;
    }
    function Ee() {
      var e11;
      return null === (e11 = null == B2 ? void 0 : B2.getPage()) || void 0 === e11 ? void 0 : e11.slides[0];
    }
    function xe() {
      const e11 = Ee();
      return e11 ? e11.triggerEl || J("triggerEl") : void 0;
    }
    function we(e11) {
      var t10, n10;
      const o9 = e11.thumbEl;
      if (!o9 || !((e12) => {
        const t11 = e12.getBoundingClientRect(), n11 = e12.closest("[style]"), o10 = null == n11 ? void 0 : n11.parentElement;
        if (n11 && n11.style.transform && o10) {
          const e13 = o10.getBoundingClientRect();
          if (t11.left < e13.left || t11.left > e13.left + e13.width - t11.width)
            return false;
          if (t11.top < e13.top || t11.top > e13.top + e13.height - t11.height)
            return false;
        }
        const i10 = Math.max(document.documentElement.clientHeight, window.innerHeight), s12 = Math.max(document.documentElement.clientWidth, window.innerWidth);
        return !(t11.bottom < 0 || t11.top - i10 >= 0 || t11.right < 0 || t11.left - s12 >= 0);
      })(o9))
        return;
      const i9 = null === (n10 = null === (t10 = e11.panzoomRef) || void 0 === t10 ? void 0 : t10.getWrapper()) || void 0 === n10 ? void 0 : n10.getBoundingClientRect(), s11 = null == i9 ? void 0 : i9.width, l8 = null == i9 ? void 0 : i9.height;
      if (!s11 || !l8)
        return;
      const r8 = o9.getBoundingClientRect();
      let a8 = r8.width, c5 = r8.height, u5 = r8.left, d3 = r8.top;
      if (!r8 || !a8 || !c5)
        return;
      if (o9 instanceof HTMLImageElement) {
        const e12 = window.getComputedStyle(o9).getPropertyValue("object-fit");
        if ("contain" === e12 || "scale-down" === e12) {
          const { width: t11, height: n11 } = ((e13, t12, n12, o10, i10 = "contain") => {
            if ("contain" === i10 || e13 > n12 || t12 > o10) {
              const i11 = n12 / e13, s12 = o10 / t12, l9 = Math.min(i11, s12);
              e13 *= l9, t12 *= l9;
            }
            return { width: e13, height: t12 };
          })(o9.naturalWidth, o9.naturalHeight, a8, c5, e12);
          u5 += 0.5 * (a8 - t11), d3 += 0.5 * (c5 - n11), a8 = t11, c5 = n11;
        }
      }
      if (Math.abs(s11 / l8 - a8 / c5) > 0.1)
        return;
      return { x: u5 + 0.5 * a8 - (i9.left + 0.5 * s11), y: d3 + 0.5 * c5 - (i9.top + 0.5 * l8), scale: a8 / s11 };
    }
    function Le() {
      V && clearTimeout(V), V = void 0, document.removeEventListener("mousemove", me);
    }
    function je() {
      if (G)
        return;
      if (V)
        return;
      const e11 = J("idle");
      e11 && (V = setTimeout(Se, e11));
    }
    function Se() {
      T && (Le(), s(T, "is-idle"), document.addEventListener("mousemove", me), G = true);
    }
    function Pe() {
      G && (Ce(), je());
    }
    function Ce() {
      Le(), null == T || T.classList.remove("is-idle"), G = false;
    }
    function Te() {
      const e11 = xe();
      var t10;
      !e11 || (t10 = e11.getBoundingClientRect()).bottom > 0 && t10.right > 0 && t10.left < (window.innerWidth || document.documentElement.clientWidth) && t10.top < (window.innerHeight || document.documentElement.clientHeight) || e11.closest("[inert]") || e11.scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
    }
    function Me(e11, t10) {
      var n10, o9, i9, s11, r8;
      if (W === _.Closing || W === _.Destroyed)
        return;
      const a8 = new Event("shouldClose", { bubbles: true, cancelable: true });
      if (te("shouldClose", a8, e11), a8.defaultPrevented)
        return;
      if (Le(), e11) {
        if (e11.defaultPrevented)
          return;
        k2(e11), e11.stopPropagation(), e11.stopImmediatePropagation();
      }
      if (W = _.Closing, null == F || F.pause(), null == q2 || q2.destroy(), B2) {
        null === (n10 = B2.getGestures()) || void 0 === n10 || n10.destroy(), null === (o9 = B2.getTween()) || void 0 === o9 || o9.pause();
        for (const e12 of B2.getSlides()) {
          const t11 = e12.panzoomRef;
          t11 && (r(t11.getOptions(), { clickAction: false, dblClickAction: false, wheelAction: false, bounds: false, minScale: 0, maxScale: 1 / 0 }), null === (i9 = t11.getGestures()) || void 0 === i9 || i9.destroy(), null === (s11 = t11.getTween()) || void 0 === s11 || s11.pause());
        }
      }
      const c5 = null == B2 ? void 0 : B2.getPlugins();
      null === (r8 = null == c5 ? void 0 : c5.Autoplay) || void 0 === r8 || r8.stop();
      const u5 = null == c5 ? void 0 : c5.Fullscreen;
      u5 && u5.inFullscreen() ? Promise.resolve(u5.exit()).then(() => {
        setTimeout(() => {
          Ae(e11, t10);
        }, 150);
      }) : Ae(e11, t10);
    }
    function Ae(e11, t10) {
      var n10, o9;
      if (W !== _.Closing)
        return;
      te("close", e11), Y = false, document.body.removeEventListener("click", pe), document.body.removeEventListener("keydown", ge, { passive: false, capture: true }), J("placeFocusBack") && Te();
      const i9 = document.activeElement;
      i9 && (null == r7 ? void 0 : r7.contains(i9)) && i9.blur(), J("fadeEffect") && (null == T || T.classList.remove("is-ready"), null == T || T.classList.add("is-hiding")), null == T || T.classList.add("is-closing");
      const s11 = Ee(), l8 = null == s11 ? void 0 : s11.el, a8 = null == s11 ? void 0 : s11.panzoomRef, c5 = null === (n10 = null == s11 ? void 0 : s11.panzoomRef) || void 0 === n10 ? void 0 : n10.getTween(), u5 = t10 || J("hideClass");
      let d3 = false, m3 = false;
      if (B2 && s11 && l8 && a8 && c5) {
        let e12;
        if (J("zoomEffect") && 1 === s11.state && (e12 = we(s11)), e12) {
          d3 = true;
          const t11 = () => {
            e12 = we(s11), e12 ? c5.to(Object.assign(Object.assign({}, y), e12)) : ke();
          };
          a8.on("refresh", () => {
            t11();
          }), c5.easing(c.Easings.EaseOut).duration(350).from(Object.assign({}, a8.getTransform())).to(Object.assign(Object.assign({}, y), e12)).start(), (null == l8 ? void 0 : l8.getAnimations()) && (l8.style.animationPlayState = "paused", requestAnimationFrame(() => {
            t11();
          }));
        }
      }
      const g = (null == s11 ? void 0 : s11.htmlEl) || (null === (o9 = null == s11 ? void 0 : s11.panzoomRef) || void 0 === o9 ? void 0 : o9.getWrapper());
      g && R(g), !d3 && u5 && g && (m3 = true, O(g, u5, () => {
        ke();
      })), d3 || m3 ? setTimeout(() => {
        ke();
      }, 350) : ke();
    }
    function ke() {
      var e11, t10, n10, o9, i9;
      if (W === _.Destroyed)
        return;
      W = _.Destroyed;
      const l8 = xe();
      te("destroy"), null === (t10 = null === (e11 = J("sync")) || void 0 === e11 ? void 0 : e11.getPlugins().Autoplay) || void 0 === t10 || t10.resume(), null === (o9 = null === (n10 = J("sync")) || void 0 === n10 ? void 0 : n10.getPlugins().Autoscroll) || void 0 === o9 || o9.resume(), r7 instanceof HTMLDialogElement && r7.close(), null === (i9 = null == B2 ? void 0 : B2.getContainer()) || void 0 === i9 || i9.classList.remove("is-idle"), null == B2 || B2.destroy();
      for (const e12 of Object.values(U))
        null == e12 || e12.destroy();
      if (U = {}, null == r7 || r7.remove(), r7 = void 0, T = void 0, B2 = void 0, z.delete(K), !z.size && (t4(false), document.documentElement.classList.remove(D), J("placeFocusBack") && l8 && !l8.closest("[inert]")))
        try {
          null == l8 || l8.focus({ preventScroll: true });
        } catch (e12) {
        }
    }
    const Oe = { close: Me, destroy: ke, getCarousel: function() {
      return B2;
    }, getContainer: function() {
      return T;
    }, getId: function() {
      return K;
    }, getOptions: function() {
      return $;
    }, getPlugins: function() {
      return U;
    }, getSlide: function() {
      return Ee();
    }, getState: function() {
      return W;
    }, init: function(t10 = [], n10 = {}) {
      W !== _.Init && (Oe.destroy(), W = _.Init), $ = r({}, I, n10), K = J("id") || "fancybox-" + ++H;
      const a8 = z.get(K);
      if (a8 && a8.destroy(), z.set(K, Oe), te("init"), function() {
        for (const [e11, t11] of Object.entries(Object.assign(Object.assign({}, N.Plugins), $.plugins || {})))
          if (e11 && !U[e11] && t11 instanceof Function) {
            const n11 = t11();
            n11.init(Oe), U[e11] = n11;
          }
        te("initPlugins");
      }(), function(e11 = []) {
        te("initSlides", e11), X = [...e11];
      }(t10), function() {
        const t11 = J("parentEl") || document.body;
        if (!(t11 && t11 instanceof HTMLElement))
          return;
        const n11 = Q(J("mainTpl") || "");
        if (r7 = e(n11) || void 0, !r7)
          return;
        if (T = r7.querySelector(".fancybox__container"), !(T && T instanceof HTMLElement))
          return;
        const l8 = J("mainClass");
        l8 && s(T, l8);
        const a9 = J("mainStyle");
        if (a9 && t(a9))
          for (const [e11, t12] of Object.entries(a9))
            T.style.setProperty(e11, t12);
        const u5 = J("theme"), d3 = "auto" === u5 ? window.matchMedia("(prefers-color-scheme:light)").matches : "light" === u5;
        T.setAttribute("theme", d3 ? "light" : "dark"), r7.setAttribute("id", "".concat(K)), r7.addEventListener("keydown", (e11) => {
          "Escape" === e11.key && k2(e11);
        }), r7.addEventListener("wheel", (e11) => {
          const t12 = e11.target;
          let n12 = J("wheel", e11);
          t12.closest(".f-thumbs") && (n12 = "slide");
          const o9 = "slide" === n12, s11 = [-e11.deltaX || 0, -e11.deltaY || 0, -e11.detail || 0].reduce(function(e12, t13) {
            return Math.abs(t13) > Math.abs(e12) ? t13 : e12;
          }), l9 = Math.max(-1, Math.min(1, s11)), r8 = Date.now();
          Z && r8 - Z < 300 ? o9 && k2(e11) : (Z = r8, te("wheel", e11, l9), e11.defaultPrevented || ("close" === n12 ? Me(e11) : "slide" === n12 && B2 && !t3(t12) && (k2(e11), B2[l9 > 0 ? "prev" : "next"]())));
        }, { capture: true, passive: false }), r7.addEventListener("cancel", (e11) => {
          Me(e11);
        }), t11.append(r7), 1 === z.size && (J("hideScrollbar") && t4(true), document.documentElement.classList.add(D));
        r7 instanceof HTMLDialogElement && (J("modal") ? r7.showModal() : r7.show());
        te("initLayout");
      }(), function() {
        if (M3 = (null == r7 ? void 0 : r7.querySelector(".fancybox__carousel")) || void 0, !M3)
          return;
        M3.fancybox = Oe;
        const e11 = r({}, { Autoplay: { autoStart: false, pauseOnHover: false, progressbarParentEl: (e12) => {
          const t11 = e12.getContainer();
          return (null == t11 ? void 0 : t11.querySelector(".f-carousel__toolbar [data-autoplay-action]")) || t11;
        } }, Fullscreen: { el: T }, Toolbar: { absolute: true, items: { counter: { tpl: '<div class="f-counter"><span data-fancybox-page></span>/<span data-fancybox-pages></span></div>' } }, display: { left: ["counter"], right: ["toggleFull", "autoplay", "fullscreen", "thumbs", "close"] } }, Video: { autoplay: true }, Thumbs: { minCount: 2, Carousel: { classes: { container: "fancybox__thumbs" } } }, classes: { container: "fancybox__carousel", viewport: "fancybox__viewport", slide: "fancybox__slide" }, spinnerTpl: '<div class="f-spinner" data-fancybox-close></div>', dragFree: false, slidesPerPage: 1, plugins: { Sync: i3, Arrows: l3, Lazyload: i4, Zoomable: s6, Html: i6, Video: l5, Autoplay: o6, Fullscreen: l6, Thumbs: c3, Toolbar: r5 } }, J("Carousel") || {}, { slides: X, enabled: true, initialPage: J("startIndex") || 0, l10n: J("l10n") });
        B2 = E2(M3, e11), te("initCarousel", B2), B2.on("*", (e12, t11, ...n11) => {
          te("Carousel.".concat(t11), e12, ...n11);
        }), B2.on("attachSlideEl", oe), B2.on("detachSlideEl", ie), B2.on("contentReady", ce), B2.on("ready", re), B2.on("change", le), B2.on("settle", ae), B2.on("thumbs:ready", ue), B2.on("thumbs:destroy", ue), B2.init();
      }(), r7 && T) {
        if (J("closeExisting"))
          for (const [e11, t11] of z.entries())
            e11 !== K && t11.close();
        J("fadeEffect") ? (setTimeout(() => {
          ne();
        }, 500), s(T, "is-revealing")) : ne(), T.classList.add("is-ready"), W = _.Ready, te("ready");
      }
    }, isCurrentSlide: function(e11) {
      const t10 = Ee();
      return !(!e11 || !t10) && t10.index === e11.index;
    }, isTopMost: function() {
      return be();
    }, off: function(e11, t10) {
      return ee.has(e11) && ee.set(e11, ee.get(e11).filter((e12) => e12 !== t10)), Oe;
    }, on: function(e11, t10) {
      return ee.set(e11, [...ee.get(e11) || [], t10]), Oe;
    }, toggleIdle(e11) {
      (G || true === e11) && Se(), G && false !== e11 || Ce();
    } };
    return Oe;
  };
  function q(e11, t10 = {}) {
    var n10, o9, i9;
    if (!(e11 && e11 instanceof Element))
      return;
    let s11, r7, a8, c5, u5 = {};
    for (const [t11, n11] of N.openers)
      if (t11.contains(e11))
        for (const [o10, i10] of n11) {
          let n12;
          if (o10) {
            for (const i11 of t11.querySelectorAll(o10))
              if (i11.contains(e11)) {
                n12 = i11;
                break;
              }
            if (!n12)
              continue;
          }
          for (const [o11, d4] of i10) {
            let i11 = null;
            try {
              i11 = e11.closest(o11);
            } catch (e12) {
            }
            i11 && (r7 = t11, a8 = n12, s11 = i11, c5 = o11, r(u5, d4 || {}));
          }
        }
    if (!r7 || !c5 || !s11)
      return;
    const d3 = r({}, I, t10, u5, { triggerEl: s11 });
    let f3 = [].slice.call((a8 || r7).querySelectorAll(c5));
    const m3 = s11.closest(".f-carousel"), g = null == m3 ? void 0 : m3.carousel;
    if (g && (!a8 || !m3.contains(a8))) {
      const e12 = [];
      for (const t11 of null == g ? void 0 : g.getSlides()) {
        const n11 = t11.el;
        n11 && (n11.matches(c5) ? e12.push(n11) : e12.push(...[].slice.call(n11.querySelectorAll(c5))));
      }
      e12.length && (f3 = [...e12], null === (n10 = g.getPlugins().Autoplay) || void 0 === n10 || n10.pause(), null === (o9 = g.getPlugins().Autoscroll) || void 0 === o9 || o9.pause(), d3.sync = g);
    }
    if (false === d3.groupAll) {
      const e12 = d3.groupAttr, t11 = e12 && s11 ? s11.getAttribute("".concat(e12)) : "";
      f3 = e12 && t11 ? f3.filter((n11) => n11.getAttribute("".concat(e12)) === t11) : [s11];
    }
    if (!f3.length)
      return;
    null === (i9 = d3.triggerEvent) || void 0 === i9 || i9.preventDefault();
    const p2 = N.getInstance();
    if (p2) {
      const e12 = p2.getOptions().triggerEl;
      if (e12 && f3.indexOf(e12) > -1)
        return;
    }
    return Object.assign({}, d3.Carousel || {}).rtl && (f3 = f3.reverse()), s11 && void 0 === t10.startIndex && (d3.startIndex = f3.indexOf(s11)), N.fromNodes(f3, d3);
  }
  var N = { Plugins: { Hash: f2 }, version: "6.1.5", openers: /* @__PURE__ */ new Map(), bind: function(e11, n10, o9, i9) {
    if (!e3())
      return;
    let s11 = document.body, l8 = null, a8 = "[data-fancybox]", c5 = {};
    e11 instanceof Element && (s11 = e11), t2(e11) && t2(n10) ? (l8 = e11, a8 = n10) : t2(n10) && t2(o9) ? (l8 = n10, a8 = o9) : t2(n10) ? a8 = n10 : t2(e11) && (a8 = e11), "object" == typeof n10 && (c5 = n10 || {}), "object" == typeof o9 && (c5 = o9 || {}), "object" == typeof i9 && (c5 = i9 || {}), function(e12, t10, n11, o10 = {}) {
      if (!(e12 && e12 instanceof Element && n11))
        return;
      const i10 = N.openers.get(e12) || /* @__PURE__ */ new Map(), s12 = i10.get(t10) || /* @__PURE__ */ new Map();
      if (s12.set(n11, o10), i10.set(t10, s12), N.openers.set(e12, i10), 1 === i10.size && e12.addEventListener("click", N.fromEvent), 1 === N.openers.size)
        for (const e13 of Object.values(N.Plugins)) {
          const t11 = e13.setup;
          "function" == typeof t11 && t11(N);
        }
    }(s11, l8, a8, c5);
  }, close: function(e11 = true, ...t10) {
    if (e11)
      for (const e12 of z.values())
        e12.close(...t10);
    else {
      const e12 = N.getInstance();
      e12 && e12.close(...t10);
    }
  }, destroy: function() {
    let e11;
    for (; e11 = N.getInstance(); )
      e11.destroy();
    for (const e12 of N.openers.keys())
      e12.removeEventListener("click", N.fromEvent);
    N.openers.clear();
  }, fromEvent: function(e11) {
    if (e11.defaultPrevented)
      return;
    if (e11.button && 0 !== e11.button)
      return;
    if (e11.ctrlKey || e11.metaKey || e11.shiftKey)
      return;
    let t10 = e11.composedPath()[0];
    const n10 = { triggerEvent: e11 };
    if (t10.closest(".fancybox__container.is-hiding"))
      return k2(e11), void e11.stopPropagation();
    const o9 = t10.closest("[data-fancybox-delegate]") || void 0;
    if (o9) {
      const e12 = o9.dataset.fancyboxDelegate || "", i9 = document.querySelectorAll('[data-fancybox="'.concat(e12, '"]')), s11 = parseInt(o9.dataset.fancyboxIndex || "", 10) || 0;
      t10 = i9[s11] || i9[0], r(n10, { delegateEl: o9, startIndex: s11 });
    }
    return q(t10, n10);
  }, fromNodes: function(e11, t10) {
    t10 = r({}, I, t10 || {});
    const n10 = [], o9 = (e12) => e12 instanceof HTMLImageElement ? e12 : e12 instanceof HTMLElement ? e12.querySelector("img:not([aria-hidden])") : void 0;
    for (const i9 of e11) {
      const s11 = i9.dataset || {}, l8 = t10.delegateEl && e11.indexOf(i9) === t10.startIndex ? t10.delegateEl : void 0, r7 = o9(l8) || o9(i9) || void 0, a8 = s11.src || i9.getAttribute("href") || i9.getAttribute("currentSrc") || i9.getAttribute("src") || void 0, c5 = s11.thumb || s11.thumbSrc || (null == r7 ? void 0 : r7.getAttribute("currentSrc")) || (null == r7 ? void 0 : r7.getAttribute("src")) || (null == r7 ? void 0 : r7.dataset.lazySrc) || void 0, u5 = { src: a8, alt: s11.alt || (null == r7 ? void 0 : r7.getAttribute("alt")) || void 0, thumbSrc: c5, thumbEl: r7, triggerEl: i9, delegateEl: l8 };
      for (const e12 in s11) {
        let t11 = s11[e12] + "";
        t11 = "false" !== t11 && ("true" === t11 || t11), u5[e12] = t11;
      }
      n10.push(u5);
    }
    return N.show(n10, t10);
  }, fromSelector: function(e11, n10, o9, i9) {
    if (!e3())
      return;
    let s11 = document.body, l8 = null, a8 = "[data-fancybox]", c5 = {};
    e11 instanceof Element && (s11 = e11), t2(e11) && t2(n10) ? (l8 = e11, a8 = n10) : t2(n10) && t2(o9) ? (l8 = n10, a8 = o9) : t2(n10) ? a8 = n10 : t2(e11) && (a8 = e11), "object" == typeof n10 && (c5 = n10 || {}), "object" == typeof o9 && (c5 = o9 || {}), "object" == typeof i9 && (c5 = i9 || {});
    for (const [e12, t10] of N.openers)
      for (const [n11, o10] of t10)
        for (const [t11, i10] of o10)
          if (e12 === s11 && n11 === l8) {
            const e13 = s11.querySelector((n11 ? "".concat(n11, " ") : "") + a8);
            if (e13 && e13.matches(t11))
              return N.fromTriggerEl(e13, c5);
          }
  }, fromTriggerEl: q, getCarousel: function() {
    var e11;
    return (null === (e11 = N.getInstance()) || void 0 === e11 ? void 0 : e11.getCarousel()) || void 0;
  }, getDefaults: function() {
    return I;
  }, getInstance: function(e11) {
    if (e11) {
      const t10 = z.get(e11);
      return t10 && t10.getState() !== _.Destroyed ? t10 : void 0;
    }
    return Array.from(z.values()).reverse().find((e12) => {
      if (e12.getState() !== _.Destroyed)
        return e12;
    }) || void 0;
  }, getSlide: function() {
    var e11;
    return (null === (e11 = N.getInstance()) || void 0 === e11 ? void 0 : e11.getSlide()) || void 0;
  }, show: function(e11 = [], t10 = {}) {
    return B().init(e11, t10);
  }, unbind: function(e11, n10, o9) {
    if (!e3())
      return;
    let i9 = document.body, s11 = null, l8 = "[data-fancybox]";
    e11 instanceof Element && (i9 = e11), t2(e11) && t2(n10) ? (s11 = e11, l8 = n10) : t2(n10) && t2(o9) ? (s11 = n10, l8 = o9) : t2(n10) ? l8 = n10 : t2(e11) && (l8 = e11), function(e12, t10, n11) {
      if (!(e12 && e12 instanceof Element && n11))
        return;
      const o10 = N.openers.get(e12) || /* @__PURE__ */ new Map(), i10 = o10.get(t10) || /* @__PURE__ */ new Map();
      i10 && n11 && i10.delete(n11), i10.size && n11 || o10.delete(t10), o10.size || (N.openers.delete(e12), e12.removeEventListener("click", N.fromEvent));
    }(i9, s11, l8);
  } };

  // scripts/components/utils/basic/copyString.js
  var import_lozad = __toESM(require_lozad(), 1);

  // scripts/components/helpers/cookie.js
  var cookie = {
    get: (name) => {
      let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
      return matches ? decodeURIComponent(matches[1]) : void 0;
    },
    set: (name, value, options = {}) => {
      options = __spreadValues({
        path: "/"
      }, options);
      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }
      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }
      document.cookie = updatedCookie;
    }
  };

  // scripts/components/helpers/showMessage.js
  var showMessage = (value, time = 5e3) => {
    if (!value || !time)
      return;
    const element = document.createElement("div");
    const button = document.createElement("button");
    const text = document.createElement("div");
    button.type = "button";
    button.className = "customButton customButton_cross";
    element.className = "page__message";
    text.innerHTML = value;
    button.addEventListener("click", close);
    element.append(text);
    element.append(button);
    document.body.append(element);
    window.requestAnimationFrame(() => {
      element.classList.add("active");
    });
    setTimeout(close, time);
    function close() {
      element.classList.remove("active");
      setTimeout(() => {
        element.remove();
      }, 200);
    }
  };

  // scripts/components/utils/basic/copyString.js
  var bindCopyString = () => {
    (0, import_lozad.default)(".js-copy-string", {
      load: init
    }).observe();
    function init(button) {
      button.addEventListener("click", (e11) => {
        e11.preventDefault();
        const value = (button == null ? void 0 : button.value) || button.getAttribute("data-value");
        const textResult = button.getAttribute("data-text") || "\u0421\u0441\u044B\u043B\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430";
        const dataCopiedCookie = button.getAttribute("data-copied-cookie");
        const objCopiedCookie = dataCopiedCookie ? JSON.parse(dataCopiedCookie) : {};
        if (navigator.clipboard && value) {
          navigator.clipboard.writeText(value).then(() => {
            showMessage(textResult);
            if (objCopiedCookie.name && objCopiedCookie.value) {
              cookie.set(objCopiedCookie.name, objCopiedCookie.value, { path: "/", "max-age": 60 * 60 * 24 * 30 });
            }
          }).catch(() => {
            showMessage("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437", 2e3);
          });
        } else {
          showMessage("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437", 2e3);
        }
      });
    }
  };

  // scripts/components/utils/basic/copyUrlPage.js
  var import_lozad2 = __toESM(require_lozad(), 1);
  var bindCopyUrlPage = () => {
    (0, import_lozad2.default)(".js-copy-url-page", {
      load: init
    }).observe();
    function init(button) {
      button.addEventListener("click", (e11) => {
        e11.preventDefault();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showMessage("\u0421\u0441\u044B\u043B\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430");
          }).catch(() => {
            showMessage("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437", 2e3);
          });
        } else {
          showMessage("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437", 2e3);
        }
      });
    }
  };

  // scripts/components/utils/basic/scrollToTarget.js
  var import_lozad3 = __toESM(require_lozad(), 1);
  var bindScrollToTarget = () => {
    (0, import_lozad3.default)(".js-scroll-to-target", {
      load: init
    }).observe();
    function init(button) {
      const href = button.getAttribute("data-href") || button.getAttribute("href");
      const target = href && document.querySelector(href);
      if (!target)
        return;
      button.addEventListener("click", (e11) => {
        e11.preventDefault();
        window.scrollBy({
          top: target.getBoundingClientRect().top - 150,
          behavior: "smooth"
        });
      });
    }
  };

  // scripts/components/utils/toggleBlock.js
  var bindToggleBlock = (button) => {
    const id = button.getAttribute("data-id");
    const closeCondition = button.getAttribute("data-close-condition");
    if (!id || button.classList.contains("init"))
      return;
    button.classList.add("init");
    button.addEventListener("click", () => {
      toggle(id, !button.classList.contains("active"));
    });
    if (!closeCondition || window.matchMedia(closeCondition).matches) {
      window.project.onClick.push((target) => {
        if (!target.closest('.js-toggle-view-button[data-id="' + id + '"]') && !target.closest('.js-toggle-view-block[data-id="' + id + '"]')) {
          toggle(id);
        }
        ;
      });
    }
    function toggle(id2, isActivation = false) {
      const buttons = document.querySelectorAll('.js-toggle-view-button[data-id="' + id2 + '"]');
      const blocks = document.querySelectorAll('.js-toggle-view-block[data-id="' + id2 + '"]');
      buttons.forEach((button2) => {
        if (isActivation) {
          button2.classList.add("active");
        } else {
          button2.classList.remove("active");
        }
      });
      blocks.forEach((block) => {
        if (isActivation) {
          block.classList.add("active");
        } else {
          block.classList.remove("active");
        }
      });
    }
  };
  var bindToggleBlocks = () => {
    document.querySelectorAll(".js-toggle-view-button").forEach(bindToggleBlock);
  };

  // scripts/components/helpers/toggleVisibility.js
  var toggleVisibility = (element, action = "auto", params = {}, callback) => {
    if (!element)
      return false;
    const options = Object.assign({
      display: "block",
      changeHeight: true,
      changeOpacity: true,
      animation: "ease-in-out",
      timeout: 200,
      styles: ""
    }, params);
    const transition2 = "all ".concat(options.timeout, "ms ").concat(options.animation);
    const isVisibleElement = checkVisible(element);
    if (action === "show") {
      options._targetVisible = true;
    } else if (action === "hide") {
      options._targetVisible = false;
    } else {
      options._targetVisible = !isVisibleElement;
    }
    if (options._targetVisible === isVisibleElement)
      return false;
    options.styles && element.setAttribute("style", options.styles);
    if (options._targetVisible) {
      element.style.visibility = "hidden";
      element.style.overflow = "hidden";
      element.style.display = options.display;
      if (options.changeOpacity) {
        element.style.opacity = "0";
      }
      if (options.changeHeight) {
        const styles = getStyles(element);
        options._h = styles.h;
        options._pt = styles.pt;
        options._pb = styles.pb;
        options._mt = styles.mt;
        options._mb = styles.mb;
        options._btw = styles.btw;
        options._bbw = styles.bbw;
        element.style.height = "0";
        element.style.marginTop = "0";
        element.style.paddingTop = "0";
        element.style.marginBottom = "0";
        element.style.paddingBottom = "0";
        element.style.borderTopWidth = "0";
        element.style.borderBottomWidth = "0";
      }
      setTimeout(function() {
        element.style.transition = transition2;
        element.style.visibility = "visible";
      }, 0);
    } else {
      if (options.changeOpacity) {
        element.style.opacity = "1";
      }
      if (options.changeHeight) {
        const styles = getStyles(element);
        element.style.height = styles.h + "px";
        element.style.marginTop = styles.mt + "px";
        element.style.paddingTop = styles.pt + "px";
        element.style.marginBottom = styles.mb + "px";
        element.style.paddingBottom = styles.pb + "px";
        element.style.borderTopWidth = styles.btw + "px";
        element.style.borderBottomWidth = styles.bbw + "px";
      }
      setTimeout(function() {
        element.style.overflow = "hidden";
        element.style.transition = transition2;
      }, 0);
    }
    setTimeout(function() {
      if (options.changeOpacity) {
        element.style.opacity = options._targetVisible ? "1" : "0";
      }
      if (options.changeHeight) {
        element.style.height = options._targetVisible ? options._h + "px" : "0";
        element.style.marginTop = options._targetVisible ? options._mt + "px" : "0";
        element.style.paddingTop = options._targetVisible ? options._pt + "px" : "0";
        element.style.marginBottom = options._targetVisible ? options._mb + "px" : "0";
        element.style.paddingBottom = options._targetVisible ? options._pb + "px" : "0";
        element.style.borderTopWidth = options._targetVisible ? options._btw + "px" : "0";
        element.style.borderBottomWidth = options._targetVisible ? options._bbw + "px" : "0";
      }
    }, 15);
    setTimeout(function() {
      element.setAttribute(
        "style",
        (options._targetVisible ? "display:" + options.display + ";" : "display: none;") + options.styles
      );
      typeof callback === "function" && callback();
    }, options.timeout);
    function checkVisible(e11) {
      const box = e11.getBoundingClientRect();
      const height = box.height || box.bottom - box.top;
      const width = box.width || box.right - box.left;
      return !!height || !!width;
    }
    function getStyle(e11, style) {
      return parseInt(getComputedStyle(e11)[style], 10);
    }
    function getStyles(e11) {
      return {
        h: e11.offsetHeight,
        mt: getStyle(e11, "marginTop"),
        pt: getStyle(e11, "paddingTop"),
        mb: getStyle(e11, "marginBottom"),
        pb: getStyle(e11, "paddingBottom"),
        btw: getStyle(e11, "borderTopWidth"),
        bbw: getStyle(e11, "borderBottomWidth")
      };
    }
    return true;
  };

  // scripts/components/utils/accordion.js
  var bindAccordion = function(accordion, options = {}) {
    const items = accordion.querySelectorAll("[data-accordion-item]");
    if (!items[0] || accordion.classList.contains("init"))
      return false;
    accordion.classList.add("init");
    const defaultOptions = {
      closeOthers: false
    };
    options = Object.assign(defaultOptions, options);
    items.forEach((item) => init(item, items, options));
    function init(current, items2, options2) {
      const control = current.querySelector("[data-accordion-control]");
      const target = current.querySelector("[data-accordion-target]");
      if (!control || !target)
        return false;
      control.addEventListener("click", () => {
        if (!options2.condition || options2.condition()) {
          control.focus();
          items2.forEach((item) => {
            if (item.classList.contains("opened") && (options2.closeOthers || item === current)) {
              const control2 = item.querySelector("[data-accordion-control]");
              const target2 = item.querySelector("[data-accordion-target]");
              item.classList.remove("opened");
              target2.classList.remove("opened");
              control2.classList.remove("opened");
              toggleVisibility(target2, "hide");
            } else if (item === current && (options2.closeOthers || !item.classList.contains("opened"))) {
              item.classList.add("opened");
              target.classList.add("opened");
              control.classList.add("opened");
              toggleVisibility(target, "show");
            }
          });
        }
      });
    }
  };
  var bindAccordions = () => {
    document.querySelectorAll(".js-accordion").forEach(bindAccordion);
  };

  // scripts/components/utils/forms.js
  var viewResult = (form, data = "", isSuccess = false) => {
    var _a;
    if (data && data.trim()) {
      form.insertAdjacentHTML("beforeend", '<div class="formResult ' + (isSuccess ? "_success" : "_error") + '" data-result>' + data.trim() + "</div>");
      if (isSuccess) {
        form.classList.add("success");
      } else {
        form.classList.add("error");
      }
    } else {
      (_a = form.querySelector("[data-result]")) == null ? void 0 : _a.remove();
      form.classList.remove("success", "error");
    }
  };
  var checkSubmit = (form) => {
    const submitButton = form.querySelector('[type="submit"]');
    const hasError = !!form.querySelector("input.error");
    if (hasError) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  };
  var viewErrorInput = (input, errorValue) => {
    input.classList.add("error");
    input.parentElement.insertAdjacentHTML("beforeend", '<div class="formInputError" data-error>' + errorValue + "</div>");
  };
  var validateForm = (form) => {
    var _a;
    const requiredInputs = form == null ? void 0 : form.querySelectorAll("input[data-required]");
    let result = true;
    requiredInputs.forEach((input) => {
      const value = input.value.trim();
      const type = input.getAttribute("data-required");
      const errorValue = input.getAttribute("data-error-message") || "\u042D\u0442\u043E \u043F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043A&nbsp;\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E";
      if (!value) {
        result = false;
        viewErrorInput(input, errorValue);
      }
      if (value && type === "email") {
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!regex.test(value)) {
          result = false;
          viewErrorInput(input, "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043F\u043E\u043B\u0435 \u0432&nbsp;\u0432\u0438\u0434\u0435 _____@____.__");
        }
      }
    });
    if (!result) {
      (_a = form.querySelector("input.error")) == null ? void 0 : _a.focus();
    }
    return result;
  };
  var bindForm = (form) => {
    const submitButton = form.querySelector('[type="submit"]');
    if (form.classList.contains("init"))
      return;
    form.classList.add("init");
    form.addEventListener("input", (e11) => {
      const input = e11.target;
      const errors = input.parentElement.querySelectorAll("[data-error]");
      input.classList.remove("error");
      errors.forEach((error) => error.remove());
      checkSubmit(form);
    });
    form.addEventListener("submit", (e11) => {
      e11.preventDefault();
      if (form.classList.contains("loading"))
        return;
      viewResult(form);
      if (!validateForm(form)) {
        checkSubmit(form);
        return;
      }
      const data = new FormData(form);
      const url = form.getAttribute("action");
      const method = form.getAttribute("method") || "POST";
      form.classList.add("loading");
      submitButton == null ? void 0 : submitButton.classList.add("loading");
      fetch(url, {
        method,
        body: data
      }).then((response) => response.json()).then((data2) => {
        if (data2.status === "ok") {
          form.reset();
          viewResult(form, data2.message || "\u0414\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B.", true);
        } else if (data2.status === "error") {
          viewResult(form, data2.message || "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430! <br> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
        } else {
          viewResult(form, data2.message || "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043D\u0435\u043F\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043D\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430! <br> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
        }
      }).catch((err) => {
        viewResult(form, "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430! <br> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
        console.error(err);
      }).then(() => {
        form.classList.remove("loading");
        submitButton == null ? void 0 : submitButton.classList.remove("loading");
      });
    });
  };
  var bindForms = () => {
    document.querySelectorAll(".js-default-form").forEach(bindForm);
  };

  // scripts/components/common/default/defaultElements.js
  var defaultElements = (e11) => {
    bindCopyString();
    bindCopyUrlPage();
    bindScrollToTarget();
    bindToggleBlocks();
    bindAccordions();
    bindForms();
  };

  // scripts/components/helpers/closeElements.js
  var bindCloseElements = function() {
    const check = function(e11) {
      if (!window.project.onClick[0])
        return;
      const arr = window.project.onClick;
      for (let i9 = 0; i9 < arr.length; i9++) {
        const fn = arr[i9];
        if (typeof fn == "function")
          fn((e11 == null ? void 0 : e11.target) || void 0);
      }
    };
    document.addEventListener("click", check);
    document.addEventListener("keydown", (e11) => {
      if (e11.key.toLocaleLowerCase() === "escape")
        check();
    });
  };

  // scripts/components/utils/setLike.js
  var import_lozad4 = __toESM(require_lozad(), 1);

  // scripts/components/helpers/basic.js
  var import_wnumb = __toESM(require_wNumb(), 1);
  var getNumber = (value, decimals = 0) => {
    const format = (0, import_wnumb.default)({ mark: ",", thousand: " ", decimals });
    value = format.from(String(value).trim());
    if (value === 0 || value)
      return value;
    return "";
  };
  var getNumberFormat = (value, decimals = 0) => {
    const format = (0, import_wnumb.default)({ mark: ",", thousand: " ", decimals });
    return format.to(getNumber(value, decimals)) || "";
  };

  // scripts/components/utils/setLike.js
  var bindSetLike = () => {
    (0, import_lozad4.default)(".js-set-like", {
      load: init
    }).observe();
    function init(button) {
      const url = button.getAttribute("data-url");
      const span = button.querySelector("span");
      button.addEventListener("click", (e11) => {
        e11.preventDefault();
        if (!url || (button == null ? void 0 : button.classList.contains("loading")))
          return;
        button.classList.add("loading");
        const data = new FormData();
        data.append("like", button.classList.contains("active") ? "N" : "Y");
        fetch(url, {
          method: "POST",
          body: data
        }).then((response) => response.json()).then((data2) => {
          if (data2.like === "Y") {
            button.classList.add("active");
          } else {
            button.classList.remove("active");
          }
          if (Number.isFinite(data2.qty) && span) {
            span.innerHTML = getNumberFormat(data2.qty);
          }
        }).catch((err) => {
          console.error(err);
        }).then(() => {
          button.classList.remove("loading");
        });
      });
    }
  };

  // scripts/components/utils/basic/scrollById.js
  var bindScrollById = () => {
    const href = document.location.hash;
    const target = href && document.querySelector(href);
    if (!target)
      return;
    const add = target.getAttribute("data-scroll-add") || 100;
    setTimeout(() => {
      window.scrollBy({
        top: target.getBoundingClientRect().top - +add
        // behavior: "smooth"
      });
    }, 500);
  };

  // scripts/components/utils/content/aside.js
  var bindCreateContentAside = () => {
    const blocks = document.querySelectorAll(".js-content-aside");
    blocks.forEach((block) => {
      const aside = block.querySelector("[data-aside]");
      const content = block.querySelector("[data-content]");
      const titles = content == null ? void 0 : content.querySelectorAll("h2");
      if (!aside || !content || !titles[0])
        return;
      const ul = document.createElement("ul");
      titles.forEach((title, key) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = title.textContent;
        button.addEventListener("click", () => {
          window.scrollBy({
            top: title.getBoundingClientRect().top - 50,
            behavior: "smooth"
          });
        });
        li.append(button);
        ul.append(li);
      });
      aside.append(ul);
      aside.classList.add("init");
    });
  };

  // scripts/components/utils/quiz.js
  var defaultQuiz = (block) => {
    if (!block) {
      console.warn("quiz block not found!");
      return;
    }
    const steps = block.querySelectorAll("[data-step]");
    let currentStep = 0;
    steps.forEach((step) => {
      const btnNext = step.querySelector('[type="submit"]');
      step.addEventListener("input", (e11) => {
        if (!btnNext)
          return;
        if (validation(step)) {
          btnNext.disabled = false;
        } else {
          btnNext.disabled = true;
          if (e11.target.getAttribute("type") === "radio" && e11.target.checked) {
            setTimeout(() => {
              e11.target.checked = false;
            }, 200);
          }
        }
      });
      step.addEventListener("submit", (e11) => {
        e11.preventDefault();
        if (validation(step)) {
          currentStep++;
          steps.forEach((step2) => {
            const number = step2.getAttribute("data-step");
            if (number == currentStep) {
              step2.classList.add("active");
            } else {
              step2.classList.remove("active");
            }
          });
        }
      });
    });
    function validation(step) {
      const trueOption = step.querySelector("[data-true]");
      if (!trueOption || trueOption.checked) {
        return true;
      }
      return false;
    }
  };

  // scripts/components/demo-check.js
  var request = ({ url, options = {}, onSuccess, onError, onEnd }) => {
    fetch(url, options).then((response) => response.json()).then((data) => {
      if (data.status === "ok") {
        onSuccess == null ? void 0 : onSuccess(data);
      } else if (data.status === "error") {
        showMessage(data.message || "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430! <br> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
        onError == null ? void 0 : onError();
      } else {
        showMessage(data.message || "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043D\u0435\u043F\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043D\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430! <br> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
        onError == null ? void 0 : onError();
      }
    }).catch((err) => {
      showMessage("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430! <br> \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
      onError == null ? void 0 : onError();
      console.error(err);
    }).then(() => {
      onEnd == null ? void 0 : onEnd();
    });
  };
  var checkField = (field, lowerLimit, upperLimit, counter, counterValue, submit, action) => {
    let count = field.value.length;
    if (count > upperLimit) {
      field.value = field.value.slice(0, upperLimit);
      count = upperLimit;
    }
    counterValue.innerHTML = getNumberFormat(count);
    if (count >= lowerLimit && count <= upperLimit) {
      submit.disabled = false;
      counter.classList.remove("error", "error_lower");
    } else if (action === "submit") {
      field.focus();
      submit.disabled = true;
      counter.classList.add("error");
      if (count < lowerLimit) {
        counter.classList.add("error_lower");
      }
    }
    if (action === "input") {
      localStorage.setItem(field.name, field.value);
    }
  };
  var bindDemoForm = (form, check, result) => {
    const field = form.querySelector("[data-field]");
    const counter = form.querySelector("[data-counter]");
    const counterValue = form.querySelector("[data-counter-value]");
    const submit = form.querySelector('[type="submit"]');
    const url = form.action;
    if (!field || !url)
      return;
    const lowerLimit = getNumber(field.getAttribute("data-lower-limit")) || 0;
    const upperLimit = getNumber(field.getAttribute("data-upper-limit")) || 2e5;
    field.value = localStorage.getItem(field.name) || "";
    checkField(field, lowerLimit, upperLimit, counter, counterValue, submit, "init");
    field.addEventListener("input", () => {
      checkField(field, lowerLimit, upperLimit, counter, counterValue, submit, "input");
    });
    form.addEventListener("submit", (e11) => {
      e11.preventDefault();
      const value = field.value;
      const count = value.length;
      checkField(field, lowerLimit, upperLimit, counter, counterValue, submit, "submit");
      if (count >= lowerLimit && count <= upperLimit && !form.classList.contains("loading")) {
        let time = 0;
        let checking = true;
        let hasError = false;
        const dataRequest = new FormData(form);
        const requestCheck = (data) => {
          time += data.timeout;
          const queryString = new URLSearchParams({ time }).toString();
          const currentUrl = "".concat(url, "?").concat(queryString);
          setTimeout(() => {
            request({
              url: currentUrl,
              onSuccess,
              onError,
              onEnd
            });
          }, data.timeout * 1e3);
        };
        const onSuccess = (dataResponse) => {
          if (dataResponse.completed) {
            checking = false;
          } else if (dataResponse.timeout) {
            requestCheck(dataResponse);
          } else {
            onError();
          }
        };
        const onError = () => {
          checking = false;
          hasError = true;
        };
        const onEnd = () => {
          if (!checking) {
            form.classList.remove("loading");
            submit.classList.remove("loading");
            if (hasError) {
              check.classList.add("error");
            } else {
              check.classList.remove("active");
              result.classList.add("active");
            }
          }
        };
        form.classList.remove("active");
        check.classList.add("active");
        form.classList.add("loading");
        submit.classList.add("loading");
        request({
          url,
          options: {
            method: "POST",
            body: dataRequest
          },
          onSuccess,
          onError,
          onEnd
        });
      }
    });
  };
  var bindDemoCheck = (block) => {
    const form = block.querySelector("[data-form]");
    const check = block.querySelector("[data-check]");
    const result = block.querySelector("[data-result]");
    const quizBlock = block.querySelector("[data-quiz]");
    const repeat = block.querySelector("[data-repeat]");
    bindDemoForm(form, check, result);
    defaultQuiz(quizBlock);
    repeat.addEventListener("click", () => {
      form.classList.add("active");
      check.classList.remove("active", "error");
    });
  };
  var bindDemoChecks = () => {
    document.querySelectorAll(".js-demo-check").forEach(bindDemoCheck);
  };

  // scripts/components/catalog.js
  var bindCatalogControls = () => {
    document.querySelectorAll(".js-catalog-control").forEach(init);
    function init(catalog) {
      catalog.addEventListener("click", (e11) => {
        var _a;
        const pagination = catalog.querySelector("[data-pagination]");
        const button = (_a = e11.target) == null ? void 0 : _a.closest("[data-pagination-more]");
        const url = button == null ? void 0 : button.getAttribute("data-pagination-more");
        if (!url || (button == null ? void 0 : button.classList.contains("loading")))
          return;
        button.classList.add("loading");
        fetch(url, {
          method: "GET"
        }).then((response) => response.text()).then((html) => {
          if (pagination) {
            pagination.remove();
          }
          if (html.trim()) {
            catalog.insertAdjacentHTML("beforeend", html);
          }
        }).catch((err) => {
          console.error(err);
        }).then(() => {
          button.classList.remove("loading");
        });
      });
    }
  };

  // node_modules/swiper/shared/ssr-window.esm.mjs
  function isObject(obj) {
    return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
  }
  function extend(target = {}, src = {}) {
    const noExtend = ["__proto__", "constructor", "prototype"];
    Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
      if (typeof target[key] === "undefined")
        target[key] = src[key];
      else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend(target[key], src[key]);
      }
    });
  }
  var ssrDocument = {
    body: {},
    addEventListener() {
    },
    removeEventListener() {
    },
    activeElement: {
      blur() {
      },
      nodeName: ""
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return {
        initEvent() {
        }
      };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {
        },
        getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };
  function getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }
  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState() {
      },
      pushState() {
      },
      go() {
      },
      back() {
      }
    },
    CustomEvent: function CustomEvent2() {
      return this;
    },
    addEventListener() {
    },
    removeEventListener() {
    },
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        }
      };
    },
    Image() {
    },
    Date() {
    },
    screen: {},
    setTimeout() {
    },
    clearTimeout() {
    },
    matchMedia() {
      return {};
    },
    requestAnimationFrame(callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
      if (typeof setTimeout === "undefined") {
        return;
      }
      clearTimeout(id);
    }
  };
  function getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend(win, ssrWindow);
    return win;
  }

  // node_modules/swiper/shared/utils.mjs
  function classesToTokens(classes2 = "") {
    return classes2.trim().split(" ").filter((c5) => !!c5.trim());
  }
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e11) {
      }
      try {
        delete object[key];
      } catch (e11) {
      }
    });
  }
  function nextTick(callback, delay = 0) {
    return setTimeout(callback, delay);
  }
  function now() {
    return Date.now();
  }
  function getComputedStyle2(el) {
    const window2 = getWindow();
    let style;
    if (window2.getComputedStyle) {
      style = window2.getComputedStyle(el, null);
    }
    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }
    if (!style) {
      style = el.style;
    }
    return style;
  }
  function getTranslate(el, axis = "x") {
    const window2 = getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = getComputedStyle2(el);
    if (window2.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(",").length > 6) {
        curTransform = curTransform.split(", ").map((a8) => a8.replace(",", ".")).join(", ");
      }
      transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }
    if (axis === "x") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m41;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]);
      else
        curTransform = parseFloat(matrix[4]);
    }
    if (axis === "y") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m42;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]);
      else
        curTransform = parseFloat(matrix[5]);
    }
    return curTransform || 0;
  }
  function isObject2(o9) {
    return typeof o9 === "object" && o9 !== null && o9.constructor && Object.prototype.toString.call(o9).slice(8, -1) === "Object";
  }
  function isNode(node) {
    if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
      return node instanceof HTMLElement;
    }
    return node && (node.nodeType === 1 || node.nodeType === 11);
  }
  function extend2(...args) {
    const to = Object(args[0]);
    for (let i9 = 1; i9 < args.length; i9 += 1) {
      const nextSource = args[i9];
      if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
        const keysArray = Object.keys(Object(nextSource)).filter((key) => key !== "__proto__" && key !== "constructor" && key !== "prototype");
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            if (isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else if (!isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              to[nextKey] = {};
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  }
  function setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function animateCSSModeScroll({
    swiper,
    targetPosition,
    side
  }) {
    const window2 = getWindow();
    const startPosition = -swiper.translate;
    let startTime = null;
    let time;
    const duration = swiper.params.speed;
    swiper.wrapperEl.style.scrollSnapType = "none";
    window2.cancelAnimationFrame(swiper.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";
    const isOutOfBound = (current, target) => {
      return dir === "next" && current >= target || dir === "prev" && current <= target;
    };
    const animate = () => {
      time = (/* @__PURE__ */ new Date()).getTime();
      if (startTime === null) {
        startTime = time;
      }
      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }
      swiper.wrapperEl.scrollTo({
        [side]: currentPosition
      });
      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper.wrapperEl.style.overflow = "";
          swiper.wrapperEl.scrollTo({
            [side]: currentPosition
          });
        });
        window2.cancelAnimationFrame(swiper.cssModeFrameID);
        return;
      }
      swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
    };
    animate();
  }
  function elementChildren(element, selector = "") {
    const window2 = getWindow();
    const children = [...element.children];
    if (window2.HTMLSlotElement && element instanceof HTMLSlotElement) {
      children.push(...element.assignedElements());
    }
    if (!selector) {
      return children;
    }
    return children.filter((el) => el.matches(selector));
  }
  function elementIsChildOfSlot(el, slot) {
    const elementsQueue = [slot];
    while (elementsQueue.length > 0) {
      const elementToCheck = elementsQueue.shift();
      if (el === elementToCheck) {
        return true;
      }
      elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : [], ...elementToCheck.assignedElements ? elementToCheck.assignedElements() : []);
    }
  }
  function elementIsChildOf(el, parent) {
    const window2 = getWindow();
    let isChild = parent.contains(el);
    if (!isChild && window2.HTMLSlotElement && parent instanceof HTMLSlotElement) {
      const children = [...parent.assignedElements()];
      isChild = children.includes(el);
      if (!isChild) {
        isChild = elementIsChildOfSlot(el, parent);
      }
    }
    return isChild;
  }
  function showWarning(text) {
    try {
      console.warn(text);
      return;
    } catch (err) {
    }
  }
  function createElement(tag, classes2 = []) {
    const el = document.createElement(tag);
    el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
    return el;
  }
  function elementPrevAll(el, selector) {
    const prevEls = [];
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling;
      if (selector) {
        if (prev.matches(selector))
          prevEls.push(prev);
      } else
        prevEls.push(prev);
      el = prev;
    }
    return prevEls;
  }
  function elementNextAll(el, selector) {
    const nextEls = [];
    while (el.nextElementSibling) {
      const next = el.nextElementSibling;
      if (selector) {
        if (next.matches(selector))
          nextEls.push(next);
      } else
        nextEls.push(next);
      el = next;
    }
    return nextEls;
  }
  function elementStyle(el, prop) {
    const window2 = getWindow();
    return window2.getComputedStyle(el, null).getPropertyValue(prop);
  }
  function elementIndex(el) {
    let child = el;
    let i9;
    if (child) {
      i9 = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1)
          i9 += 1;
      }
      return i9;
    }
    return void 0;
  }
  function elementParents(el, selector) {
    const parents = [];
    let parent = el.parentElement;
    while (parent) {
      if (selector) {
        if (parent.matches(selector))
          parents.push(parent);
      } else {
        parents.push(parent);
      }
      parent = parent.parentElement;
    }
    return parents;
  }
  function elementOuterSize(el, size, includeMargins) {
    const window2 = getWindow();
    if (includeMargins) {
      return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
    }
    return el.offsetWidth;
  }
  function makeElementsArray(el) {
    return (Array.isArray(el) ? el : [el]).filter((e11) => !!e11);
  }
  function setInnerHTML(el, html = "") {
    if (typeof trustedTypes !== "undefined") {
      el.innerHTML = trustedTypes.createPolicy("html", {
        createHTML: (s11) => s11
      }).createHTML(html);
    } else {
      el.innerHTML = html;
    }
  }

  // node_modules/swiper/shared/swiper-core.mjs
  var support;
  function calcSupport() {
    const window2 = getWindow();
    const document2 = getDocument();
    return {
      smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
      touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
    };
  }
  function getSupport() {
    if (!support) {
      support = calcSupport();
    }
    return support;
  }
  var deviceCached;
  function calcDevice({
    userAgent
  } = {}) {
    const support2 = getSupport();
    const window2 = getWindow();
    const platform = window2.navigator.platform;
    const ua = userAgent || window2.navigator.userAgent;
    const device = {
      ios: false,
      android: false
    };
    const screenWidth = window2.screen.width;
    const screenHeight = window2.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel";
    const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    if (!ipad && macos && support2.touch && iPadScreens.indexOf("".concat(screenWidth, "x").concat(screenHeight)) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad)
        ipad = [0, 1, "13_0_0"];
      macos = false;
    }
    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }
    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    }
    return device;
  }
  function getDevice(overrides = {}) {
    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }
    return deviceCached;
  }
  var browser;
  function calcBrowser() {
    const window2 = getWindow();
    const device = getDevice();
    let needPerspectiveFix = false;
    function isSafari() {
      const ua = window2.navigator.userAgent.toLowerCase();
      return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
    }
    if (isSafari()) {
      const ua = String(window2.navigator.userAgent);
      if (ua.includes("Version/")) {
        const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
        needPerspectiveFix = major < 16 || major === 16 && minor < 2;
      }
    }
    const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent);
    const isSafariBrowser = isSafari();
    const need3dFix = isSafariBrowser || isWebView && device.ios;
    return {
      isSafari: needPerspectiveFix || isSafariBrowser,
      needPerspectiveFix,
      need3dFix,
      isWebView
    };
  }
  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }
    return browser;
  }
  function Resize({
    swiper,
    on,
    emit
  }) {
    const window2 = getWindow();
    let observer = null;
    let animationFrame = null;
    const resizeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("beforeResize");
      emit("resize");
    };
    const createObserver = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      observer = new ResizeObserver((entries) => {
        animationFrame = window2.requestAnimationFrame(() => {
          const {
            width,
            height
          } = swiper;
          let newWidth = width;
          let newHeight = height;
          entries.forEach(({
            contentBoxSize,
            contentRect,
            target
          }) => {
            if (target && target !== swiper.el)
              return;
            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
          });
          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper.el);
    };
    const removeObserver = () => {
      if (animationFrame) {
        window2.cancelAnimationFrame(animationFrame);
      }
      if (observer && observer.unobserve && swiper.el) {
        observer.unobserve(swiper.el);
        observer = null;
      }
    };
    const orientationChangeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("orientationchange");
    };
    on("init", () => {
      if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
        createObserver();
        return;
      }
      window2.addEventListener("resize", resizeHandler);
      window2.addEventListener("orientationchange", orientationChangeHandler);
    });
    on("destroy", () => {
      removeObserver();
      window2.removeEventListener("resize", resizeHandler);
      window2.removeEventListener("orientationchange", orientationChangeHandler);
    });
  }
  function Observer({
    swiper,
    extendParams,
    on,
    emit
  }) {
    const observers = [];
    const window2 = getWindow();
    const attach = (target, options = {}) => {
      const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        if (swiper.__preventObserver__)
          return;
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }
        const observerUpdate = function observerUpdate2() {
          emit("observerUpdate", mutations[0]);
        };
        if (window2.requestAnimationFrame) {
          window2.requestAnimationFrame(observerUpdate);
        } else {
          window2.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === "undefined" ? true : options.attributes,
        childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
        characterData: typeof options.characterData === "undefined" ? true : options.characterData
      });
      observers.push(observer);
    };
    const init = () => {
      if (!swiper.params.observer)
        return;
      if (swiper.params.observeParents) {
        const containerParents = elementParents(swiper.hostEl);
        for (let i9 = 0; i9 < containerParents.length; i9 += 1) {
          attach(containerParents[i9]);
        }
      }
      attach(swiper.hostEl, {
        childList: swiper.params.observeSlideChildren
      });
      attach(swiper.wrapperEl, {
        attributes: false
      });
    };
    const destroy = () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };
    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    });
    on("init", init);
    on("destroy", destroy);
  }
  var eventsEmitter = {
    on(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      events2.split(" ").forEach((event2) => {
        if (!self.eventsListeners[event2])
          self.eventsListeners[event2] = [];
        self.eventsListeners[event2][method](handler);
      });
      return self;
    },
    once(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      function onceHandler(...args) {
        self.off(events2, onceHandler);
        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }
        handler.apply(self, args);
      }
      onceHandler.__emitterProxy = handler;
      return self.on(events2, onceHandler, priority);
    },
    onAny(handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }
      return self;
    },
    offAny(handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsAnyListeners)
        return self;
      const index = self.eventsAnyListeners.indexOf(handler);
      if (index >= 0) {
        self.eventsAnyListeners.splice(index, 1);
      }
      return self;
    },
    off(events2, handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      events2.split(" ").forEach((event2) => {
        if (typeof handler === "undefined") {
          self.eventsListeners[event2] = [];
        } else if (self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler, index) => {
            if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
              self.eventsListeners[event2].splice(index, 1);
            }
          });
        }
      });
      return self;
    },
    emit(...args) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      let events2;
      let data;
      let context;
      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events2 = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events2 = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }
      data.unshift(context);
      const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
      eventsArray.forEach((event2) => {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
          self.eventsAnyListeners.forEach((eventHandler) => {
            eventHandler.apply(context, [event2, ...data]);
          });
        }
        if (self.eventsListeners && self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler) => {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    }
  };
  function updateSize() {
    const swiper = this;
    let width;
    let height;
    const el = swiper.el;
    if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
      width = swiper.params.width;
    } else {
      width = el.clientWidth;
    }
    if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
      height = swiper.params.height;
    } else {
      height = el.clientHeight;
    }
    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    }
    width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
    height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
    if (Number.isNaN(width))
      width = 0;
    if (Number.isNaN(height))
      height = 0;
    Object.assign(swiper, {
      width,
      height,
      size: swiper.isHorizontal() ? width : height
    });
  }
  function updateSlides() {
    const swiper = this;
    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
    }
    const params = swiper.params;
    const {
      wrapperEl,
      slidesEl,
      rtlTranslate: rtl,
      wrongRTL
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    const slides = elementChildren(slidesEl, ".".concat(swiper.params.slideClass, ", swiper-slide"));
    const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === "function") {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }
    let offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === "function") {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }
    const previousSnapGridLength = swiper.snapGrid.length;
    const previousSlidesGridLength = swiper.slidesGrid.length;
    const swiperSize = swiper.size - offsetBefore - offsetAfter;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;
    if (typeof swiperSize === "undefined") {
      return;
    }
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    swiper.virtualSize = -spaceBetween - offsetBefore - offsetAfter;
    slides.forEach((slideEl) => {
      if (rtl) {
        slideEl.style.marginLeft = "";
      } else {
        slideEl.style.marginRight = "";
      }
      slideEl.style.marginBottom = "";
      slideEl.style.marginTop = "";
    });
    if (params.centeredSlides && params.cssMode) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
    }
    if (params.cssMode) {
      setCSSProperty(wrapperEl, "--swiper-slides-offset-before", "".concat(offsetBefore, "px"));
      setCSSProperty(wrapperEl, "--swiper-slides-offset-after", "".concat(offsetAfter, "px"));
    }
    const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
    if (gridEnabled) {
      swiper.grid.initSlides(slides);
    } else if (swiper.grid) {
      swiper.grid.unsetSlides();
    }
    let slideSize;
    const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
      return typeof params.breakpoints[key].slidesPerView !== "undefined";
    }).length > 0;
    for (let i9 = 0; i9 < slidesLength; i9 += 1) {
      slideSize = 0;
      const slide2 = slides[i9];
      if (slide2) {
        if (gridEnabled) {
          swiper.grid.updateSlide(i9, slide2, slides);
        }
        if (elementStyle(slide2, "display") === "none")
          continue;
      }
      if (isVirtual && params.slidesPerView === "auto") {
        if (params.virtual.slidesPerViewAutoSlideSize) {
          slideSize = params.virtual.slidesPerViewAutoSlideSize;
        }
        if (slideSize && slide2) {
          if (params.roundLengths)
            slideSize = Math.floor(slideSize);
          slide2.style[swiper.getDirectionLabel("width")] = "".concat(slideSize, "px");
        }
      } else if (params.slidesPerView === "auto") {
        if (shouldResetSlideSize) {
          slide2.style[swiper.getDirectionLabel("width")] = "";
        }
        const slideStyles = getComputedStyle(slide2);
        const currentTransform = slide2.style.transform;
        const currentWebKitTransform = slide2.style.webkitTransform;
        if (currentTransform) {
          slide2.style.transform = "none";
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = "none";
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
        } else {
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
          const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
          const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
          const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
          const boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box") {
            slideSize = width + marginLeft + marginRight;
          } else {
            const {
              clientWidth,
              offsetWidth
            } = slide2;
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }
        if (currentTransform) {
          slide2.style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
        if (slide2) {
          slide2.style[swiper.getDirectionLabel("width")] = "".concat(slideSize, "px");
        }
      }
      if (slide2) {
        slide2.swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);
      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i9 !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i9 === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1e3)
          slidePosition = 0;
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }
      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
      wrapperEl.style.width = "".concat(swiper.virtualSize + spaceBetween, "px");
    }
    if (params.setWrapperSize) {
      wrapperEl.style[swiper.getDirectionLabel("width")] = "".concat(swiper.virtualSize + spaceBetween, "px");
    }
    if (gridEnabled) {
      swiper.grid.updateWrapperSize(slideSize, snapGrid);
    }
    if (!params.centeredSlides) {
      const isFractionalSlidesPerView = params.slidesPerView !== "auto" && params.slidesPerView % 1 !== 0;
      const shouldSnapToSlideEdge = params.snapToSlideEdge && !params.loop && (params.slidesPerView === "auto" || isFractionalSlidesPerView);
      let lastAllowedSnapIndex = snapGrid.length;
      if (shouldSnapToSlideEdge) {
        let minVisibleSlides;
        if (params.slidesPerView === "auto") {
          minVisibleSlides = 1;
          let accumulatedSize = 0;
          for (let i9 = slidesSizesGrid.length - 1; i9 >= 0; i9 -= 1) {
            accumulatedSize += slidesSizesGrid[i9] + (i9 < slidesSizesGrid.length - 1 ? spaceBetween : 0);
            if (accumulatedSize <= swiperSize) {
              minVisibleSlides = slidesSizesGrid.length - i9;
            } else {
              break;
            }
          }
        } else {
          minVisibleSlides = Math.floor(params.slidesPerView);
        }
        lastAllowedSnapIndex = Math.max(slidesLength - minVisibleSlides, 0);
      }
      const newSlidesGrid = [];
      for (let i9 = 0; i9 < snapGrid.length; i9 += 1) {
        let slidesGridItem = snapGrid[i9];
        if (params.roundLengths)
          slidesGridItem = Math.floor(slidesGridItem);
        if (shouldSnapToSlideEdge) {
          if (i9 <= lastAllowedSnapIndex) {
            newSlidesGrid.push(slidesGridItem);
          }
        } else if (snapGrid[i9] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        if (!shouldSnapToSlideEdge) {
          snapGrid.push(swiper.virtualSize - swiperSize);
        }
      }
    }
    if (isVirtual && params.loop) {
      const size = slidesSizesGrid[0] + spaceBetween;
      if (params.slidesPerGroup > 1) {
        const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
        const groupSize = size * params.slidesPerGroup;
        for (let i9 = 0; i9 < groups; i9 += 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
        }
      }
      for (let i9 = 0; i9 < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i9 += 1) {
        if (params.slidesPerGroup === 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + size);
        }
        slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
        swiper.virtualSize += size;
      }
    }
    if (snapGrid.length === 0)
      snapGrid = [0];
    if (spaceBetween !== 0) {
      const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
      slides.filter((_2, slideIndex) => {
        if (!params.cssMode || params.loop)
          return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }).forEach((slideEl) => {
        slideEl.style[key] = "".concat(spaceBetween, "px");
      });
    }
    if (params.centeredSlides && params.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
      snapGrid = snapGrid.map((snap) => {
        if (snap <= 0)
          return -offsetBefore;
        if (snap > maxSnap)
          return maxSnap + offsetAfter;
        return snap;
      });
    }
    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      if (allSlidesSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }
    Object.assign(swiper, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid
    });
    if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "".concat(-snapGrid[0], "px"));
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "".concat(swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2, "px"));
      const addToSnapGrid = -swiper.snapGrid[0];
      const addToSlidesGrid = -swiper.slidesGrid[0];
      swiper.snapGrid = swiper.snapGrid.map((v3) => v3 + addToSnapGrid);
      swiper.slidesGrid = swiper.slidesGrid.map((v3) => v3 + addToSlidesGrid);
    }
    if (slidesLength !== previousSlidesLength) {
      swiper.emit("slidesLengthChange");
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow)
        swiper.checkOverflow();
      swiper.emit("snapGridLengthChange");
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit("slidesGridLengthChange");
    }
    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    swiper.emit("slidesUpdated");
    if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
      const backFaceHiddenClass = "".concat(params.containerModifierClass, "backface-hidden");
      const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded)
          swiper.el.classList.add(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper.el.classList.remove(backFaceHiddenClass);
      }
    }
  }
  function updateAutoHeight(speed) {
    const swiper = this;
    const activeSlides = [];
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let newHeight = 0;
    let i9;
    if (typeof speed === "number") {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    const getSlideByIndex = (index) => {
      if (isVirtual) {
        return swiper.slides[swiper.getSlideIndexByData(index)];
      }
      return swiper.slides[index];
    };
    if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        (swiper.visibleSlides || []).forEach((slide2) => {
          activeSlides.push(slide2);
        });
      } else {
        for (i9 = 0; i9 < Math.ceil(swiper.params.slidesPerView); i9 += 1) {
          const index = swiper.activeIndex + i9;
          if (index > swiper.slides.length && !isVirtual)
            break;
          activeSlides.push(getSlideByIndex(index));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper.activeIndex));
    }
    for (i9 = 0; i9 < activeSlides.length; i9 += 1) {
      if (typeof activeSlides[i9] !== "undefined") {
        const height = activeSlides[i9].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }
    if (newHeight || newHeight === 0)
      swiper.wrapperEl.style.height = "".concat(newHeight, "px");
  }
  function updateSlidesOffset() {
    const swiper = this;
    const slides = swiper.slides;
    const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
    for (let i9 = 0; i9 < slides.length; i9 += 1) {
      slides[i9].swiperSlideOffset = (swiper.isHorizontal() ? slides[i9].offsetLeft : slides[i9].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
  }
  var toggleSlideClasses$1 = (slideEl, condition, className) => {
    if (condition && !slideEl.classList.contains(className)) {
      slideEl.classList.add(className);
    } else if (!condition && slideEl.classList.contains(className)) {
      slideEl.classList.remove(className);
    }
  };
  function updateSlidesProgress(translate2 = this && this.translate || 0) {
    const swiper = this;
    const params = swiper.params;
    const {
      slides,
      rtlTranslate: rtl,
      snapGrid
    } = swiper;
    if (slides.length === 0)
      return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper.updateSlidesOffset();
    let offsetCenter = -translate2;
    if (rtl)
      offsetCenter = translate2;
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];
    let spaceBetween = params.spaceBetween;
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    for (let i9 = 0; i9 < slides.length; i9 += 1) {
      const slide2 = slides[i9];
      let slideOffset = slide2.swiperSlideOffset;
      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }
      const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper.slidesSizesGrid[i9];
      const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i9];
      const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
      if (isVisible) {
        swiper.visibleSlides.push(slide2);
        swiper.visibleSlidesIndexes.push(i9);
      }
      toggleSlideClasses$1(slide2, isVisible, params.slideVisibleClass);
      toggleSlideClasses$1(slide2, isFullyVisible, params.slideFullyVisibleClass);
      slide2.progress = rtl ? -slideProgress : slideProgress;
      slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
    }
  }
  function updateProgress(translate2) {
    const swiper = this;
    if (typeof translate2 === "undefined") {
      const multiplier = swiper.rtlTranslate ? -1 : 1;
      translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
    }
    const params = swiper.params;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    let {
      progress,
      isBeginning,
      isEnd,
      progressLoop
    } = swiper;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate2 - swiper.minTranslate()) / translatesDiff;
      const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
      const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
      isBeginning = isBeginningRounded || progress <= 0;
      isEnd = isEndRounded || progress >= 1;
      if (isBeginningRounded)
        progress = 0;
      if (isEndRounded)
        progress = 1;
    }
    if (params.loop) {
      const firstSlideIndex = swiper.getSlideIndexByData(0);
      const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
      const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
      const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
      const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
      const translateAbs = Math.abs(translate2);
      if (translateAbs >= firstSlideTranslate) {
        progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
      } else {
        progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
      }
      if (progressLoop > 1)
        progressLoop -= 1;
    }
    Object.assign(swiper, {
      progress,
      progressLoop,
      isBeginning,
      isEnd
    });
    if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
      swiper.updateSlidesProgress(translate2);
    if (isBeginning && !wasBeginning) {
      swiper.emit("reachBeginning toEdge");
    }
    if (isEnd && !wasEnd) {
      swiper.emit("reachEnd toEdge");
    }
    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit("fromEdge");
    }
    swiper.emit("progress", progress);
  }
  var toggleSlideClasses = (slideEl, condition, className) => {
    if (condition && !slideEl.classList.contains(className)) {
      slideEl.classList.add(className);
    } else if (!condition && slideEl.classList.contains(className)) {
      slideEl.classList.remove(className);
    }
  };
  function updateSlidesClasses() {
    const swiper = this;
    const {
      slides,
      params,
      slidesEl,
      activeIndex
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    const getFilteredSlide = (selector) => {
      return elementChildren(slidesEl, ".".concat(params.slideClass).concat(selector, ", swiper-slide").concat(selector))[0];
    };
    let activeSlide;
    let prevSlide;
    let nextSlide;
    if (isVirtual) {
      if (params.loop) {
        let slideIndex = activeIndex - swiper.virtual.slidesBefore;
        if (slideIndex < 0)
          slideIndex = swiper.virtual.slides.length + slideIndex;
        if (slideIndex >= swiper.virtual.slides.length)
          slideIndex -= swiper.virtual.slides.length;
        activeSlide = getFilteredSlide('[data-swiper-slide-index="'.concat(slideIndex, '"]'));
      } else {
        activeSlide = getFilteredSlide('[data-swiper-slide-index="'.concat(activeIndex, '"]'));
      }
    } else {
      if (gridEnabled) {
        activeSlide = slides.find((slideEl) => slideEl.column === activeIndex);
        nextSlide = slides.find((slideEl) => slideEl.column === activeIndex + 1);
        prevSlide = slides.find((slideEl) => slideEl.column === activeIndex - 1);
      } else {
        activeSlide = slides[activeIndex];
      }
    }
    if (activeSlide) {
      if (!gridEnabled) {
        nextSlide = elementNextAll(activeSlide, ".".concat(params.slideClass, ", swiper-slide"))[0];
        if (params.loop && !nextSlide) {
          nextSlide = slides[0];
        }
        prevSlide = elementPrevAll(activeSlide, ".".concat(params.slideClass, ", swiper-slide"))[0];
        if (params.loop && !prevSlide === 0) {
          prevSlide = slides[slides.length - 1];
        }
      }
    }
    slides.forEach((slideEl) => {
      toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
      toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
      toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
    });
    swiper.emitSlidesClasses();
  }
  var processLazyPreloader = (swiper, imageEl) => {
    if (!swiper || swiper.destroyed || !swiper.params)
      return;
    const slideSelector = () => swiper.isElement ? "swiper-slide" : ".".concat(swiper.params.slideClass);
    const slideEl = imageEl.closest(slideSelector());
    if (slideEl) {
      let lazyEl = slideEl.querySelector(".".concat(swiper.params.lazyPreloaderClass));
      if (!lazyEl && swiper.isElement) {
        if (slideEl.shadowRoot) {
          lazyEl = slideEl.shadowRoot.querySelector(".".concat(swiper.params.lazyPreloaderClass));
        } else {
          requestAnimationFrame(() => {
            if (slideEl.shadowRoot) {
              lazyEl = slideEl.shadowRoot.querySelector(".".concat(swiper.params.lazyPreloaderClass));
              if (lazyEl && !lazyEl.lazyPreloaderManaged)
                lazyEl.remove();
            }
          });
        }
      }
      if (lazyEl && !lazyEl.lazyPreloaderManaged)
        lazyEl.remove();
    }
  };
  var unlazy = (swiper, index) => {
    if (!swiper.slides[index])
      return;
    const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
    if (imageEl)
      imageEl.removeAttribute("loading");
  };
  var preload = (swiper) => {
    if (!swiper || swiper.destroyed || !swiper.params)
      return;
    let amount = swiper.params.lazyPreloadPrevNext;
    const len = swiper.slides.length;
    if (!len || !amount || amount < 0)
      return;
    amount = Math.min(amount, len);
    const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
    const activeIndex = swiper.activeIndex;
    if (swiper.params.grid && swiper.params.grid.rows > 1) {
      const activeColumn = activeIndex;
      const preloadColumns = [activeColumn - amount];
      preloadColumns.push(...Array.from({
        length: amount
      }).map((_2, i9) => {
        return activeColumn + slidesPerView + i9;
      }));
      swiper.slides.forEach((slideEl, i9) => {
        if (preloadColumns.includes(slideEl.column))
          unlazy(swiper, i9);
      });
      return;
    }
    const slideIndexLastInView = activeIndex + slidesPerView - 1;
    if (swiper.params.rewind || swiper.params.loop) {
      for (let i9 = activeIndex - amount; i9 <= slideIndexLastInView + amount; i9 += 1) {
        const realIndex = (i9 % len + len) % len;
        if (realIndex < activeIndex || realIndex > slideIndexLastInView)
          unlazy(swiper, realIndex);
      }
    } else {
      for (let i9 = Math.max(activeIndex - amount, 0); i9 <= Math.min(slideIndexLastInView + amount, len - 1); i9 += 1) {
        if (i9 !== activeIndex && (i9 > slideIndexLastInView || i9 < activeIndex)) {
          unlazy(swiper, i9);
        }
      }
    }
  };
  function getActiveIndexByTranslate(swiper) {
    const {
      slidesGrid,
      params
    } = swiper;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    let activeIndex;
    for (let i9 = 0; i9 < slidesGrid.length; i9 += 1) {
      if (typeof slidesGrid[i9 + 1] !== "undefined") {
        if (translate2 >= slidesGrid[i9] && translate2 < slidesGrid[i9 + 1] - (slidesGrid[i9 + 1] - slidesGrid[i9]) / 2) {
          activeIndex = i9;
        } else if (translate2 >= slidesGrid[i9] && translate2 < slidesGrid[i9 + 1]) {
          activeIndex = i9 + 1;
        }
      } else if (translate2 >= slidesGrid[i9]) {
        activeIndex = i9;
      }
    }
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === "undefined")
        activeIndex = 0;
    }
    return activeIndex;
  }
  function updateActiveIndex(newActiveIndex) {
    const swiper = this;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    const {
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;
    const getVirtualRealIndex = (aIndex) => {
      let realIndex2 = aIndex - swiper.virtual.slidesBefore;
      if (realIndex2 < 0) {
        realIndex2 = swiper.virtual.slides.length + realIndex2;
      }
      if (realIndex2 >= swiper.virtual.slides.length) {
        realIndex2 -= swiper.virtual.slides.length;
      }
      return realIndex2;
    };
    if (typeof activeIndex === "undefined") {
      activeIndex = getActiveIndexByTranslate(swiper);
    }
    if (snapGrid.indexOf(translate2) >= 0) {
      snapIndex = snapGrid.indexOf(translate2);
    } else {
      const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex && !swiper.params.loop) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit("snapIndexChange");
      }
      return;
    }
    if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
      return;
    }
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    let realIndex;
    if (swiper.virtual && params.virtual.enabled) {
      if (params.loop) {
        realIndex = getVirtualRealIndex(activeIndex);
      } else {
        realIndex = activeIndex;
      }
    } else if (gridEnabled) {
      const firstSlideInColumn = swiper.slides.find((slideEl) => slideEl.column === activeIndex);
      let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
      if (Number.isNaN(activeSlideIndex)) {
        activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
      }
      realIndex = Math.floor(activeSlideIndex / params.grid.rows);
    } else if (swiper.slides[activeIndex]) {
      const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
      if (slideIndex) {
        realIndex = parseInt(slideIndex, 10);
      } else {
        realIndex = activeIndex;
      }
    } else {
      realIndex = activeIndex;
    }
    Object.assign(swiper, {
      previousSnapIndex,
      snapIndex,
      previousRealIndex,
      realIndex,
      previousIndex,
      activeIndex
    });
    if (swiper.initialized) {
      preload(swiper);
    }
    swiper.emit("activeIndexChange");
    swiper.emit("snapIndexChange");
    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      if (previousRealIndex !== realIndex) {
        swiper.emit("realIndexChange");
      }
      swiper.emit("slideChange");
    }
  }
  function updateClickedSlide(el, path) {
    const swiper = this;
    const params = swiper.params;
    let slide2 = el.closest(".".concat(params.slideClass, ", swiper-slide"));
    if (!slide2 && swiper.isElement && path && path.length > 1 && path.includes(el)) {
      [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
        if (!slide2 && pathEl.matches && pathEl.matches(".".concat(params.slideClass, ", swiper-slide"))) {
          slide2 = pathEl;
        }
      });
    }
    let slideFound = false;
    let slideIndex;
    if (slide2) {
      for (let i9 = 0; i9 < swiper.slides.length; i9 += 1) {
        if (swiper.slides[i9] === slide2) {
          slideFound = true;
          slideIndex = i9;
          break;
        }
      }
    }
    if (slide2 && slideFound) {
      swiper.clickedSlide = slide2;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
      } else {
        swiper.clickedIndex = slideIndex;
      }
    } else {
      swiper.clickedSlide = void 0;
      swiper.clickedIndex = void 0;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }
  var update = {
    updateSize,
    updateSlides,
    updateAutoHeight,
    updateSlidesOffset,
    updateSlidesProgress,
    updateProgress,
    updateSlidesClasses,
    updateActiveIndex,
    updateClickedSlide
  };
  function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
    const swiper = this;
    const {
      params,
      rtlTranslate: rtl,
      translate: translate2,
      wrapperEl
    } = swiper;
    if (params.virtualTranslate) {
      return rtl ? -translate2 : translate2;
    }
    if (params.cssMode) {
      return translate2;
    }
    let currentTranslate = getTranslate(wrapperEl, axis);
    currentTranslate += swiper.cssOverflowAdjustment();
    if (rtl)
      currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }
  function setTranslate(translate2, byController) {
    const swiper = this;
    const {
      rtlTranslate: rtl,
      params,
      wrapperEl,
      progress
    } = swiper;
    let x2 = 0;
    let y3 = 0;
    const z2 = 0;
    if (swiper.isHorizontal()) {
      x2 = rtl ? -translate2 : translate2;
    } else {
      y3 = translate2;
    }
    if (params.roundLengths) {
      x2 = Math.floor(x2);
      y3 = Math.floor(y3);
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x2 : y3;
    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x2 : -y3;
    } else if (!params.virtualTranslate) {
      if (swiper.isHorizontal()) {
        x2 -= swiper.cssOverflowAdjustment();
      } else {
        y3 -= swiper.cssOverflowAdjustment();
      }
      wrapperEl.style.transform = "translate3d(".concat(x2, "px, ").concat(y3, "px, ").concat(z2, "px)");
    }
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate2);
    }
    swiper.emit("setTranslate", swiper.translate, byController);
  }
  function minTranslate() {
    return -this.snapGrid[0];
  }
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function translateTo(translate2 = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
    const swiper = this;
    const {
      params,
      wrapperEl
    } = swiper;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }
    const minTranslate2 = swiper.minTranslate();
    const maxTranslate2 = swiper.maxTranslate();
    let newTranslate;
    if (translateBounds && translate2 > minTranslate2)
      newTranslate = minTranslate2;
    else if (translateBounds && translate2 < maxTranslate2)
      newTranslate = maxTranslate2;
    else
      newTranslate = translate2;
    swiper.updateProgress(newTranslate);
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth"
        });
      }
      return true;
    }
    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionEnd");
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionStart");
      }
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e11) {
            if (!swiper || swiper.destroyed)
              return;
            if (e11.target !== this)
              return;
            swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;
            swiper.animating = false;
            if (runCallbacks) {
              swiper.emit("transitionEnd");
            }
          };
        }
        swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
      }
    }
    return true;
  }
  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate,
    minTranslate,
    maxTranslate,
    translateTo
  };
  function setTransition(duration, byController) {
    const swiper = this;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style.transitionDuration = "".concat(duration, "ms");
      swiper.wrapperEl.style.transitionDelay = duration === 0 ? "0ms" : "";
    }
    swiper.emit("setTransition", duration, byController);
  }
  function transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step
  }) {
    const {
      activeIndex,
      previousIndex
    } = swiper;
    let dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex)
        dir = "next";
      else if (activeIndex < previousIndex)
        dir = "prev";
      else
        dir = "reset";
    }
    swiper.emit("transition".concat(step));
    if (runCallbacks && dir === "reset") {
      swiper.emit("slideResetTransition".concat(step));
    } else if (runCallbacks && activeIndex !== previousIndex) {
      swiper.emit("slideChangeTransition".concat(step));
      if (dir === "next") {
        swiper.emit("slideNextTransition".concat(step));
      } else {
        swiper.emit("slidePrevTransition".concat(step));
      }
    }
  }
  function transitionStart(runCallbacks = true, direction) {
    const swiper = this;
    const {
      params
    } = swiper;
    if (params.cssMode)
      return;
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "Start"
    });
  }
  function transitionEnd(runCallbacks = true, direction) {
    const swiper = this;
    const {
      params
    } = swiper;
    swiper.animating = false;
    if (params.cssMode)
      return;
    swiper.setTransition(0);
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "End"
    });
  }
  var transition = {
    setTransition,
    transitionStart,
    transitionEnd
  };
  function slideTo(index = 0, speed, runCallbacks = true, internal, initial) {
    if (typeof index === "string") {
      index = parseInt(index, 10);
    }
    const swiper = this;
    let slideIndex = index;
    if (slideIndex < 0)
      slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled
    } = swiper;
    if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    const translate2 = -snapGrid[snapIndex];
    if (params.normalizeSlideIndex) {
      for (let i9 = 0; i9 < slidesGrid.length; i9 += 1) {
        const normalizedTranslate = -Math.floor(translate2 * 100);
        const normalizedGrid = Math.floor(slidesGrid[i9] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i9 + 1] * 100);
        if (typeof slidesGrid[i9 + 1] !== "undefined") {
          if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
            slideIndex = i9;
          } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
            slideIndex = i9 + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i9;
        }
      }
    }
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }
    if (slideIndex !== (previousIndex || 0) && runCallbacks) {
      swiper.emit("beforeSlideChangeStart");
    }
    swiper.updateProgress(translate2);
    let direction;
    if (slideIndex > activeIndex)
      direction = "next";
    else if (slideIndex < activeIndex)
      direction = "prev";
    else
      direction = "reset";
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    const isInitialVirtual = isVirtual && initial;
    if (!isInitialVirtual && (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate)) {
      swiper.updateActiveIndex(slideIndex);
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== "slide") {
        swiper.setTranslate(translate2);
      }
      if (direction !== "reset") {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      const t10 = rtl ? translate2 : -translate2;
      if (speed === 0) {
        if (isVirtual) {
          swiper.wrapperEl.style.scrollSnapType = "none";
          swiper._immediateVirtual = true;
        }
        if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
          swiper._cssModeVirtualInitialSet = true;
          requestAnimationFrame(() => {
            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t10;
          });
        } else {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t10;
        }
        if (isVirtual) {
          requestAnimationFrame(() => {
            swiper.wrapperEl.style.scrollSnapType = "";
            swiper._immediateVirtual = false;
          });
        }
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: t10,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t10,
          behavior: "smooth"
        });
      }
      return true;
    }
    const browser2 = getBrowser();
    const isSafari = browser2.isSafari;
    if (isVirtual && !initial && isSafari && swiper.isElement) {
      swiper.virtual.update(false, false, slideIndex);
    }
    swiper.setTransition(speed);
    swiper.setTranslate(translate2);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (speed === 0) {
      swiper.transitionEnd(runCallbacks, direction);
    } else if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e11) {
          if (!swiper || swiper.destroyed)
            return;
          if (e11.target !== this)
            return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
    }
    return true;
  }
  function slideToLoop(index = 0, speed, runCallbacks = true, internal) {
    if (typeof index === "string") {
      const indexAsNumber = parseInt(index, 10);
      index = indexAsNumber;
    }
    const swiper = this;
    if (swiper.destroyed)
      return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
    let newIndex = index;
    if (swiper.params.loop) {
      if (swiper.virtual && swiper.params.virtual.enabled) {
        newIndex = newIndex + swiper.virtual.slidesBefore;
      } else {
        let targetSlideIndex;
        if (gridEnabled) {
          const slideIndex = newIndex * swiper.params.grid.rows;
          targetSlideIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
        } else {
          targetSlideIndex = swiper.getSlideIndexByData(newIndex);
        }
        const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
        const {
          centeredSlides,
          slidesOffsetBefore,
          slidesOffsetAfter
        } = swiper.params;
        const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
        let slidesPerView = swiper.params.slidesPerView;
        if (slidesPerView === "auto") {
          slidesPerView = swiper.slidesPerViewDynamic();
        } else {
          slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
          if (bothDirections && slidesPerView % 2 === 0) {
            slidesPerView = slidesPerView + 1;
          }
        }
        let needLoopFix = cols - targetSlideIndex < slidesPerView;
        if (bothDirections) {
          needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
        }
        if (internal && bothDirections && swiper.params.slidesPerView !== "auto" && !gridEnabled) {
          needLoopFix = false;
        }
        if (needLoopFix) {
          const direction = bothDirections ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
          swiper.loopFix({
            direction,
            slideTo: true,
            activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
            slideRealIndex: direction === "next" ? swiper.realIndex : void 0
          });
        }
        if (gridEnabled) {
          const slideIndex = newIndex * swiper.params.grid.rows;
          newIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
        } else {
          newIndex = swiper.getSlideIndexByData(newIndex);
        }
      }
    }
    requestAnimationFrame(() => {
      swiper.slideTo(newIndex, speed, runCallbacks, internal);
    });
    return swiper;
  }
  function slideNext(speed, runCallbacks = true, internal) {
    const swiper = this;
    const {
      enabled,
      params,
      animating
    } = swiper;
    if (!enabled || swiper.destroyed)
      return swiper;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    let perGroup = params.slidesPerGroup;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
    }
    const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper.loopFix({
        direction: "next"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
      if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
        requestAnimationFrame(() => {
          swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        });
        return true;
      }
    }
    if (params.rewind && swiper.isEnd) {
      return swiper.slideTo(0, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }
  function slidePrev(speed, runCallbacks = true, internal) {
    const swiper = this;
    const {
      params,
      snapGrid,
      slidesGrid,
      rtlTranslate,
      enabled,
      animating
    } = swiper;
    if (!enabled || swiper.destroyed)
      return swiper;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper.loopFix({
        direction: "prev"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }
    const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0)
        return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }
    const normalizedTranslate = normalize(translate2);
    const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
    const isFreeMode = params.freeMode && params.freeMode.enabled;
    let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === "undefined" && (params.cssMode || isFreeMode)) {
      let prevSnapIndex;
      snapGrid.forEach((snap, snapIndex) => {
        if (normalizedTranslate >= snap) {
          prevSnapIndex = snapIndex;
        }
      });
      if (typeof prevSnapIndex !== "undefined") {
        prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }
    let prevIndex = 0;
    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0)
        prevIndex = swiper.activeIndex - 1;
      if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }
    if (params.rewind && swiper.isBeginning) {
      const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
    } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(prevIndex, speed, runCallbacks, internal);
      });
      return true;
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  function slideReset(speed, runCallbacks = true, internal) {
    const swiper = this;
    if (swiper.destroyed)
      return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  function slideToClosest(speed, runCallbacks = true, internal, threshold = 0.5) {
    const swiper = this;
    if (swiper.destroyed)
      return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    let index = swiper.activeIndex;
    const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    if (translate2 >= swiper.snapGrid[snapIndex]) {
      const currentSnap = swiper.snapGrid[snapIndex];
      const nextSnap = swiper.snapGrid[snapIndex + 1];
      if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      const prevSnap = swiper.snapGrid[snapIndex - 1];
      const currentSnap = swiper.snapGrid[snapIndex];
      if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }
    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }
  function slideToClickedSlide() {
    const swiper = this;
    if (swiper.destroyed)
      return;
    const {
      params,
      slidesEl
    } = swiper;
    const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    let slideToIndex = swiper.getSlideIndexWhenGrid(swiper.clickedIndex);
    let realIndex;
    const slideSelector = swiper.isElement ? "swiper-slide" : ".".concat(params.slideClass);
    const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
    if (params.loop) {
      if (swiper.animating)
        return;
      realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
      if (params.centeredSlides) {
        swiper.slideToLoop(realIndex);
      } else if (slideToIndex > (isGrid ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1) : swiper.slides.length - slidesPerView)) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, "".concat(slideSelector, '[data-swiper-slide-index="').concat(realIndex, '"]'))[0]);
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  var slide = {
    slideTo,
    slideToLoop,
    slideNext,
    slidePrev,
    slideReset,
    slideToClosest,
    slideToClickedSlide
  };
  function loopCreate(slideRealIndex, initial) {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
      return;
    const initSlides = () => {
      const slides = elementChildren(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
      slides.forEach((el, index) => {
        el.setAttribute("data-swiper-slide-index", index);
      });
    };
    const clearBlankSlides = () => {
      const slides = elementChildren(slidesEl, ".".concat(params.slideBlankClass));
      slides.forEach((el) => {
        el.remove();
      });
      if (slides.length > 0) {
        swiper.recalcSlides();
        swiper.updateSlides();
      }
    };
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    if (params.loopAddBlankSlides && (params.slidesPerGroup > 1 || gridEnabled)) {
      clearBlankSlides();
    }
    const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
    const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
    const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
    const addBlankSlides = (amountOfSlides) => {
      for (let i9 = 0; i9 < amountOfSlides; i9 += 1) {
        const slideEl = swiper.isElement ? createElement("swiper-slide", [params.slideBlankClass]) : createElement("div", [params.slideClass, params.slideBlankClass]);
        swiper.slidesEl.append(slideEl);
      }
    };
    if (shouldFillGroup) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
        addBlankSlides(slidesToAdd);
        swiper.recalcSlides();
        swiper.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else if (shouldFillGrid) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
        addBlankSlides(slidesToAdd);
        swiper.recalcSlides();
        swiper.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else {
      initSlides();
    }
    const bothDirections = params.centeredSlides || !!params.slidesOffsetBefore || !!params.slidesOffsetAfter;
    swiper.loopFix({
      slideRealIndex,
      direction: bothDirections ? void 0 : "next",
      initial
    });
  }
  function loopFix({
    slideRealIndex,
    slideTo: slideTo2 = true,
    direction,
    setTranslate: setTranslate2,
    activeSlideIndex,
    initial,
    byController,
    byMousewheel
  } = {}) {
    const swiper = this;
    if (!swiper.params.loop)
      return;
    swiper.emit("beforeLoopFix");
    const {
      slides,
      allowSlidePrev,
      allowSlideNext,
      slidesEl,
      params
    } = swiper;
    const {
      centeredSlides,
      slidesOffsetBefore,
      slidesOffsetAfter,
      initialSlide
    } = params;
    const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    if (swiper.virtual && params.virtual.enabled) {
      if (slideTo2) {
        if (!bothDirections && swiper.snapIndex === 0) {
          swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
        } else if (bothDirections && swiper.snapIndex < params.slidesPerView) {
          swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
        } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
          swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
        }
      }
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit("loopFix");
      return;
    }
    let slidesPerView = params.slidesPerView;
    if (slidesPerView === "auto") {
      slidesPerView = swiper.slidesPerViewDynamic();
    } else {
      slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
      if (bothDirections && slidesPerView % 2 === 0) {
        slidesPerView = slidesPerView + 1;
      }
    }
    const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
    let loopedSlides = bothDirections ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2)) : slidesPerGroup;
    if (loopedSlides % slidesPerGroup !== 0) {
      loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
    }
    loopedSlides += params.loopAdditionalSlides;
    swiper.loopedSlides = loopedSlides;
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
      showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
    } else if (gridEnabled && params.grid.fill === "row") {
      showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    }
    const prependSlidesIndexes = [];
    const appendSlidesIndexes = [];
    const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
    const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !bothDirections;
    let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
    if (typeof activeSlideIndex === "undefined") {
      activeSlideIndex = swiper.getSlideIndex(slides.find((el) => el.classList.contains(params.slideActiveClass)));
    } else {
      activeIndex = activeSlideIndex;
    }
    const isNext = direction === "next" || !direction;
    const isPrev = direction === "prev" || !direction;
    let slidesPrepended = 0;
    let slidesAppended = 0;
    const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
    const activeColIndexWithShift = activeColIndex + (bothDirections && typeof setTranslate2 === "undefined" ? -slidesPerView / 2 + 0.5 : 0);
    if (activeColIndexWithShift < loopedSlides) {
      slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
      for (let i9 = 0; i9 < loopedSlides - activeColIndexWithShift; i9 += 1) {
        const index = i9 - Math.floor(i9 / cols) * cols;
        if (gridEnabled) {
          const colIndexToPrepend = cols - index - 1;
          for (let i10 = slides.length - 1; i10 >= 0; i10 -= 1) {
            if (slides[i10].column === colIndexToPrepend)
              prependSlidesIndexes.push(i10);
          }
        } else {
          prependSlidesIndexes.push(cols - index - 1);
        }
      }
    } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
      slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
      if (isInitialOverflow) {
        slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
      }
      for (let i9 = 0; i9 < slidesAppended; i9 += 1) {
        const index = i9 - Math.floor(i9 / cols) * cols;
        if (gridEnabled) {
          slides.forEach((slide2, slideIndex) => {
            if (slide2.column === index)
              appendSlidesIndexes.push(slideIndex);
          });
        } else {
          appendSlidesIndexes.push(index);
        }
      }
    }
    swiper.__preventObserver__ = true;
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
    if (swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
      if (appendSlidesIndexes.includes(activeSlideIndex)) {
        appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
      }
      if (prependSlidesIndexes.includes(activeSlideIndex)) {
        prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
      }
    }
    if (isPrev) {
      prependSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.prepend(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    if (isNext) {
      appendSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.append(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    swiper.recalcSlides();
    if (params.slidesPerView === "auto") {
      swiper.updateSlides();
    } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
      swiper.slides.forEach((slide2, slideIndex) => {
        swiper.grid.updateSlide(slideIndex, slide2, swiper.slides);
      });
    }
    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    if (slideTo2) {
      if (prependSlidesIndexes.length > 0 && isPrev) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff);
          } else {
            swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
            if (setTranslate2) {
              swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
              swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          if (setTranslate2) {
            const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
            swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
            swiper.touchEventsData.currentTranslate = swiper.translate;
          }
        }
      } else if (appendSlidesIndexes.length > 0 && isNext) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff);
          } else {
            swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
            if (setTranslate2) {
              swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
              swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
        }
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.controller && swiper.controller.control && !byController) {
      const loopParams = {
        slideRealIndex,
        direction,
        setTranslate: setTranslate2,
        activeSlideIndex,
        byController: true
      };
      if (Array.isArray(swiper.controller.control)) {
        swiper.controller.control.forEach((c5) => {
          if (!c5.destroyed && c5.params.loop)
            c5.loopFix(__spreadProps(__spreadValues({}, loopParams), {
              slideTo: c5.params.slidesPerView === params.slidesPerView ? slideTo2 : false
            }));
        });
      } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
        swiper.controller.control.loopFix(__spreadProps(__spreadValues({}, loopParams), {
          slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : false
        }));
      }
    }
    swiper.emit("loopFix");
  }
  function loopDestroy() {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled)
      return;
    swiper.recalcSlides();
    const newSlidesOrder = [];
    swiper.slides.forEach((slideEl) => {
      const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
      newSlidesOrder[index] = slideEl;
    });
    swiper.slides.forEach((slideEl) => {
      slideEl.removeAttribute("data-swiper-slide-index");
    });
    newSlidesOrder.forEach((slideEl) => {
      slidesEl.append(slideEl);
    });
    swiper.recalcSlides();
    swiper.slideTo(swiper.realIndex, 0);
  }
  var loop = {
    loopCreate,
    loopFix,
    loopDestroy
  };
  function setGrabCursor(moving) {
    const swiper = this;
    if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
      return;
    const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  function unsetGrabCursor() {
    const swiper = this;
    if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  var grabCursor = {
    setGrabCursor,
    unsetGrabCursor
  };
  function closestElement(selector, base = this) {
    function __closestFrom(el) {
      if (!el || el === getDocument() || el === getWindow())
        return null;
      if (el.assignedSlot)
        el = el.assignedSlot;
      const found = el.closest(selector);
      if (!found && !el.getRootNode) {
        return null;
      }
      return found || __closestFrom(el.getRootNode().host);
    }
    return __closestFrom(base);
  }
  function preventEdgeSwipe(swiper, event2, startX) {
    const window2 = getWindow();
    const {
      params
    } = swiper;
    const edgeSwipeDetection = params.edgeSwipeDetection;
    const edgeSwipeThreshold = params.edgeSwipeThreshold;
    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
      if (edgeSwipeDetection === "prevent") {
        event2.preventDefault();
        return true;
      }
      return false;
    }
    return true;
  }
  function onTouchStart(event2) {
    const swiper = this;
    const document2 = getDocument();
    let e11 = event2;
    if (e11.originalEvent)
      e11 = e11.originalEvent;
    const data = swiper.touchEventsData;
    if (e11.type === "pointerdown") {
      if (data.pointerId !== null && data.pointerId !== e11.pointerId) {
        return;
      }
      data.pointerId = e11.pointerId;
    } else if (e11.type === "touchstart" && e11.targetTouches.length === 1) {
      data.touchId = e11.targetTouches[0].identifier;
    }
    if (e11.type === "touchstart") {
      preventEdgeSwipe(swiper, e11, e11.targetTouches[0].pageX);
      return;
    }
    const {
      params,
      touches,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params.simulateTouch && e11.pointerType === "mouse")
      return;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    if (!swiper.animating && params.cssMode && params.loop) {
      swiper.loopFix();
    }
    let targetEl = e11.target;
    if (params.touchEventsTarget === "wrapper") {
      if (!elementIsChildOf(targetEl, swiper.wrapperEl))
        return;
    }
    if ("which" in e11 && e11.which === 3)
      return;
    if ("button" in e11 && e11.button > 0)
      return;
    if (data.isTouched && data.isMoved)
      return;
    const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
    const eventPath = e11.composedPath ? e11.composedPath() : e11.path;
    if (swipingClassHasValue && e11.target && e11.target.shadowRoot && eventPath) {
      targetEl = eventPath[0];
    }
    const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : ".".concat(params.noSwipingClass);
    const isTargetShadow = !!(e11.target && e11.target.shadowRoot);
    if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!targetEl.closest(params.swipeHandler))
        return;
    }
    touches.currentX = e11.pageX;
    touches.currentY = e11.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY;
    if (!preventEdgeSwipe(swiper, e11, startX)) {
      return;
    }
    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: void 0,
      startMoving: void 0
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = void 0;
    if (params.threshold > 0)
      data.allowThresholdMove = false;
    let preventDefault = true;
    if (targetEl.matches(data.focusableElements)) {
      preventDefault = false;
      if (targetEl.nodeName === "SELECT") {
        data.isTouched = false;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl && (e11.pointerType === "mouse" || e11.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) {
      document2.activeElement.blur();
    }
    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
      e11.preventDefault();
    }
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
      swiper.freeMode.onTouchStart();
    }
    swiper.emit("touchStart", e11);
  }
  function onTouchMove(event2) {
    const document2 = getDocument();
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params.simulateTouch && event2.pointerType === "mouse")
      return;
    let e11 = event2;
    if (e11.originalEvent)
      e11 = e11.originalEvent;
    if (e11.type === "pointermove") {
      if (data.touchId !== null)
        return;
      const id = e11.pointerId;
      if (id !== data.pointerId)
        return;
    }
    let targetTouch;
    if (e11.type === "touchmove") {
      targetTouch = [...e11.changedTouches].find((t10) => t10.identifier === data.touchId);
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    } else {
      targetTouch = e11;
    }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit("touchMoveOpposite", e11);
      }
      return;
    }
    const pageX = targetTouch.pageX;
    const pageY = targetTouch.pageY;
    if (e11.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      if (!e11.target.matches(data.focusableElements)) {
        swiper.allowClick = false;
      }
      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }
      return;
    }
    if (params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) {
        return;
      } else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) {
        return;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== e11.target && e11.pointerType !== "mouse") {
      document2.activeElement.blur();
    }
    if (document2.activeElement) {
      if (e11.target === document2.activeElement && e11.target.matches(data.focusableElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit("touchMove", e11);
    }
    touches.previousX = touches.currentX;
    touches.previousY = touches.currentY;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
      return;
    if (typeof data.isScrolling === "undefined") {
      let touchAngle;
      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit("touchMoveOpposite", e11);
    }
    if (typeof data.startMoving === "undefined") {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling || e11.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    if (!params.cssMode && e11.cancelable) {
      e11.preventDefault();
    }
    if (params.touchMoveStopPropagation && !params.nested) {
      e11.stopPropagation();
    }
    let diff = swiper.isHorizontal() ? diffX : diffY;
    let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
    if (params.oneWayMovement) {
      diff = Math.abs(diff) * (rtl ? 1 : -1);
      touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
    }
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) {
      diff = -diff;
      touchesDiff = -touchesDiff;
    }
    const prevTouchesDirection = swiper.touchesDirection;
    swiper.swipeDirection = diff > 0 ? "prev" : "next";
    swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
    const isLoop = swiper.params.loop && !params.cssMode;
    const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
    if (!data.isMoved) {
      if (isLoop && allowLoopFix) {
        swiper.loopFix({
          direction: swiper.swipeDirection
        });
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true,
          detail: {
            bySwiperTouchMove: true
          }
        });
        swiper.wrapperEl.dispatchEvent(evt);
      }
      data.allowMomentumBounce = false;
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit("sliderFirstMove", e11);
    }
    let loopFixed;
    (/* @__PURE__ */ new Date()).getTime();
    if (params._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
        startTranslate: data.currentTranslate
      });
      data.loopSwapReset = true;
      data.startTranslate = data.currentTranslate;
      return;
    }
    swiper.emit("sliderMove", e11);
    data.isMoved = true;
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if (diff > 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
        swiper.loopFix({
          direction: "prev",
          setTranslate: true,
          activeSlideIndex: 0
        });
      }
      if (data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        }
      }
    } else if (diff < 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
        swiper.loopFix({
          direction: "next",
          setTranslate: true,
          activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
        });
      }
      if (data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
      }
    }
    if (disableParentSwiper) {
      e11.preventedByNestedSwiper = true;
    }
    if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    }
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }
    if (!params.followFinger || params.cssMode)
      return;
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
      swiper.freeMode.onTouchMove();
    }
    swiper.updateProgress(data.currentTranslate);
    swiper.setTranslate(data.currentTranslate);
  }
  function onTouchEnd(event2) {
    const swiper = this;
    const data = swiper.touchEventsData;
    let e11 = event2;
    if (e11.originalEvent)
      e11 = e11.originalEvent;
    let targetTouch;
    const isTouchEvent = e11.type === "touchend" || e11.type === "touchcancel";
    if (!isTouchEvent) {
      if (data.touchId !== null)
        return;
      if (e11.pointerId !== data.pointerId)
        return;
      targetTouch = e11;
    } else {
      targetTouch = [...e11.changedTouches].find((t10) => t10.identifier === data.touchId);
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e11.type)) {
      const proceed = ["pointercancel", "contextmenu"].includes(e11.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
      if (!proceed) {
        return;
      }
    }
    data.pointerId = null;
    data.touchId = null;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      slidesGrid,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params.simulateTouch && e11.pointerType === "mouse")
      return;
    if (data.allowTouchCallbacks) {
      swiper.emit("touchEnd", e11);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (swiper.allowClick) {
      const pathTree = e11.path || e11.composedPath && e11.composedPath();
      swiper.updateClickedSlide(pathTree && pathTree[0] || e11.target, pathTree);
      swiper.emit("tap click", e11);
      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit("doubleTap doubleClick", e11);
      }
    }
    data.lastClickTime = now();
    nextTick(() => {
      if (!swiper.destroyed)
        swiper.allowClick = true;
    });
    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }
    if (params.cssMode) {
      return;
    }
    if (params.freeMode && params.freeMode.enabled) {
      swiper.freeMode.onTouchEnd({
        currentPos
      });
      return;
    }
    const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
    let stopIndex = 0;
    let groupSize = swiper.slidesSizesGrid[0];
    for (let i9 = 0; i9 < slidesGrid.length; i9 += i9 < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      const increment2 = i9 < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
      if (typeof slidesGrid[i9 + increment2] !== "undefined") {
        if (swipeToLast || currentPos >= slidesGrid[i9] && currentPos < slidesGrid[i9 + increment2]) {
          stopIndex = i9;
          groupSize = slidesGrid[i9 + increment2] - slidesGrid[i9];
        }
      } else if (swipeToLast || currentPos >= slidesGrid[i9]) {
        stopIndex = i9;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }
    let rewindFirstIndex = null;
    let rewindLastIndex = null;
    if (params.rewind) {
      if (swiper.isBeginning) {
        rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      } else if (swiper.isEnd) {
        rewindFirstIndex = 0;
      }
    }
    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (timeDiff > params.longSwipesMs) {
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === "next") {
        if (ratio >= params.longSwipesRatio)
          swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
        else
          swiper.slideTo(stopIndex);
      }
      if (swiper.swipeDirection === "prev") {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
          swiper.slideTo(rewindLastIndex);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      const isNavButtonTarget = swiper.navigation && (e11.target === swiper.navigation.nextEl || e11.target === swiper.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === "next") {
          swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
        }
        if (swiper.swipeDirection === "prev") {
          swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
        }
      } else if (e11.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }
  function onResize() {
    const swiper = this;
    const {
      params,
      el
    } = swiper;
    if (el && el.offsetWidth === 0)
      return;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    const {
      allowSlideNext,
      allowSlidePrev,
      snapGrid
    } = swiper;
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();
    const isVirtualLoop = isVirtual && params.loop;
    if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      if (swiper.params.loop && !isVirtual) {
        swiper.slideToLoop(swiper.realIndex, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      clearTimeout(swiper.autoplay.resizeTimeout);
      swiper.autoplay.resizeTimeout = setTimeout(() => {
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
          swiper.autoplay.resume();
        }
      }, 500);
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }
  function onClick(e11) {
    const swiper = this;
    if (!swiper.enabled)
      return;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks)
        e11.preventDefault();
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e11.stopPropagation();
        e11.stopImmediatePropagation();
      }
    }
  }
  function onScroll() {
    const swiper = this;
    const {
      wrapperEl,
      rtlTranslate,
      enabled
    } = swiper;
    if (!enabled)
      return;
    swiper.previousTranslate = swiper.translate;
    if (swiper.isHorizontal()) {
      swiper.translate = -wrapperEl.scrollLeft;
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    }
    if (swiper.translate === 0)
      swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }
    swiper.emit("setTranslate", swiper.translate, false);
  }
  function onLoad(e11) {
    const swiper = this;
    processLazyPreloader(swiper, e11.target);
    if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
      return;
    }
    swiper.update();
  }
  function onDocumentTouchStart() {
    const swiper = this;
    if (swiper.documentTouchHandlerProceeded)
      return;
    swiper.documentTouchHandlerProceeded = true;
    if (swiper.params.touchReleaseOnEdges) {
      swiper.el.style.touchAction = "auto";
    }
  }
  var events = (swiper, method) => {
    const document2 = getDocument();
    const {
      params,
      el,
      wrapperEl,
      device
    } = swiper;
    const capture = !!params.nested;
    const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
    const swiperMethod = method;
    if (!el || typeof el === "string")
      return;
    document2[domMethod]("touchstart", swiper.onDocumentTouchStart, {
      passive: false,
      capture
    });
    el[domMethod]("touchstart", swiper.onTouchStart, {
      passive: false
    });
    el[domMethod]("pointerdown", swiper.onTouchStart, {
      passive: false
    });
    document2[domMethod]("touchmove", swiper.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("pointermove", swiper.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("touchend", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerup", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointercancel", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("touchcancel", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerout", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerleave", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("contextmenu", swiper.onTouchEnd, {
      passive: true
    });
    if (params.preventClicks || params.preventClicksPropagation) {
      el[domMethod]("click", swiper.onClick, true);
    }
    if (params.cssMode) {
      wrapperEl[domMethod]("scroll", swiper.onScroll);
    }
    if (params.updateOnWindowResize) {
      swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
    } else {
      swiper[swiperMethod]("observerUpdate", onResize, true);
    }
    el[domMethod]("load", swiper.onLoad, {
      capture: true
    });
  };
  function attachEvents() {
    const swiper = this;
    const {
      params
    } = swiper;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
    swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }
    swiper.onClick = onClick.bind(swiper);
    swiper.onLoad = onLoad.bind(swiper);
    events(swiper, "on");
  }
  function detachEvents() {
    const swiper = this;
    events(swiper, "off");
  }
  var events$1 = {
    attachEvents,
    detachEvents
  };
  var isGridEnabled = (swiper, params) => {
    return swiper.grid && params.grid && params.grid.rows > 1;
  };
  function setBreakpoint() {
    const swiper = this;
    const {
      realIndex,
      initialized,
      params,
      el
    } = swiper;
    const breakpoints2 = params.breakpoints;
    if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
      return;
    const document2 = getDocument();
    const breakpointsBase = params.breakpointsBase === "window" || !params.breakpointsBase ? params.breakpointsBase : "container";
    const breakpointContainer = ["window", "container"].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document2.querySelector(params.breakpointsBase);
    const breakpoint = swiper.getBreakpoint(breakpoints2, breakpointsBase, breakpointContainer);
    if (!breakpoint || swiper.currentBreakpoint === breakpoint)
      return;
    const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
    const breakpointParams = breakpointOnlyParams || swiper.originalParams;
    const wasMultiRow = isGridEnabled(swiper, params);
    const isMultiRow = isGridEnabled(swiper, breakpointParams);
    const wasGrabCursor = swiper.params.grabCursor;
    const isGrabCursor = breakpointParams.grabCursor;
    const wasEnabled = params.enabled;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove("".concat(params.containerModifierClass, "grid"), "".concat(params.containerModifierClass, "grid-column"));
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add("".concat(params.containerModifierClass, "grid"));
      if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
        el.classList.add("".concat(params.containerModifierClass, "grid-column"));
      }
      swiper.emitContainerClasses();
    }
    if (wasGrabCursor && !isGrabCursor) {
      swiper.unsetGrabCursor();
    } else if (!wasGrabCursor && isGrabCursor) {
      swiper.setGrabCursor();
    }
    ["navigation", "pagination", "scrollbar"].forEach((prop) => {
      if (typeof breakpointParams[prop] === "undefined")
        return;
      const wasModuleEnabled = params[prop] && params[prop].enabled;
      const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
      if (wasModuleEnabled && !isModuleEnabled) {
        swiper[prop].disable();
      }
      if (!wasModuleEnabled && isModuleEnabled) {
        swiper[prop].enable();
      }
    });
    const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
    const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
    const wasLoop = params.loop;
    if (directionChanged && initialized) {
      swiper.changeDirection();
    }
    extend2(swiper.params, breakpointParams);
    const isEnabled = swiper.params.enabled;
    const hasLoop = swiper.params.loop;
    Object.assign(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev
    });
    if (wasEnabled && !isEnabled) {
      swiper.disable();
    } else if (!wasEnabled && isEnabled) {
      swiper.enable();
    }
    swiper.currentBreakpoint = breakpoint;
    swiper.emit("_beforeBreakpoint", breakpointParams);
    if (initialized) {
      if (needsReLoop) {
        swiper.loopDestroy();
        swiper.loopCreate(realIndex);
        swiper.updateSlides();
      } else if (!wasLoop && hasLoop) {
        swiper.loopCreate(realIndex);
        swiper.updateSlides();
      } else if (wasLoop && !hasLoop) {
        swiper.loopDestroy();
      }
    }
    swiper.emit("breakpoint", breakpointParams);
  }
  function getBreakpoint(breakpoints2, base = "window", containerEl) {
    if (!breakpoints2 || base === "container" && !containerEl)
      return void 0;
    let breakpoint = false;
    const window2 = getWindow();
    const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints2).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point
        };
      }
      return {
        value: point,
        point
      };
    });
    points.sort((a8, b3) => parseInt(a8.value, 10) - parseInt(b3.value, 10));
    for (let i9 = 0; i9 < points.length; i9 += 1) {
      const {
        point,
        value
      } = points[i9];
      if (base === "window") {
        if (window2.matchMedia("(min-width: ".concat(value, "px)")).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || "max";
  }
  var breakpoints = {
    setBreakpoint,
    getBreakpoint
  };
  function prepareClasses(entries, prefix) {
    const resultClasses = [];
    entries.forEach((item) => {
      if (typeof item === "object") {
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === "string") {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }
  function addClasses() {
    const swiper = this;
    const {
      classNames,
      params,
      rtl,
      el,
      device
    } = swiper;
    const suffixes = prepareClasses(["initialized", params.direction, {
      "free-mode": swiper.params.freeMode && params.freeMode.enabled
    }, {
      "autoheight": params.autoHeight
    }, {
      "rtl": rtl
    }, {
      "grid": params.grid && params.grid.rows > 1
    }, {
      "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
    }, {
      "android": device.android
    }, {
      "ios": device.ios
    }, {
      "css-mode": params.cssMode
    }, {
      "centered": params.cssMode && params.centeredSlides
    }, {
      "watch-progress": params.watchSlidesProgress
    }], params.containerModifierClass);
    classNames.push(...suffixes);
    el.classList.add(...classNames);
    swiper.emitContainerClasses();
  }
  function removeClasses() {
    const swiper = this;
    const {
      el,
      classNames
    } = swiper;
    if (!el || typeof el === "string")
      return;
    el.classList.remove(...classNames);
    swiper.emitContainerClasses();
  }
  var classes = {
    addClasses,
    removeClasses
  };
  function checkOverflow() {
    const swiper = this;
    const {
      isLocked: wasLocked,
      params
    } = swiper;
    const {
      slidesOffsetBefore
    } = params;
    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper.slides.length - 1;
      const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
      swiper.isLocked = swiper.size > lastSlideRightEdge;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }
    if (params.allowSlideNext === true) {
      swiper.allowSlideNext = !swiper.isLocked;
    }
    if (params.allowSlidePrev === true) {
      swiper.allowSlidePrev = !swiper.isLocked;
    }
    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
    }
    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
  }
  var checkOverflow$1 = {
    checkOverflow
  };
  var defaults = {
    init: true,
    direction: "horizontal",
    oneWayMovement: false,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    eventsPrefix: "swiper",
    enabled: true,
    focusableElements: "input, select, option, textarea, button, video, label",
    // Overrides
    width: null,
    height: null,
    //
    preventInteractionOnTransition: false,
    // ssr
    userAgent: null,
    url: null,
    // To support iOS's swipe-to-go-back gesture (when being used in-app).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: "slide",
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: void 0,
    breakpointsBase: "window",
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    snapToSlideEdge: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: true,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 5,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // loop
    loop: false,
    loopAddBlankSlides: true,
    loopAdditionalSlides: 0,
    loopPreventsSliding: true,
    // rewind
    rewind: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    // NS
    containerModifierClass: "swiper-",
    // NEW
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    // Callbacks
    runCallbacksOnInit: true,
    // Internals
    _emitClasses: false
  };
  function moduleExtendParams(params, allModulesParams) {
    return function extendParams(obj = {}) {
      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];
      if (typeof moduleParams !== "object" || moduleParams === null) {
        extend2(allModulesParams, obj);
        return;
      }
      if (params[moduleParamName] === true) {
        params[moduleParamName] = {
          enabled: true
        };
      }
      if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
        params[moduleParamName].auto = true;
      }
      if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
        params[moduleParamName].auto = true;
      }
      if (!(moduleParamName in params && "enabled" in moduleParams)) {
        extend2(allModulesParams, obj);
        return;
      }
      if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
        params[moduleParamName].enabled = true;
      }
      if (!params[moduleParamName])
        params[moduleParamName] = {
          enabled: false
        };
      extend2(allModulesParams, obj);
    };
  }
  var prototypes = {
    eventsEmitter,
    update,
    translate,
    transition,
    slide,
    loop,
    grabCursor,
    events: events$1,
    breakpoints,
    checkOverflow: checkOverflow$1,
    classes
  };
  var extendedDefaults = {};
  var Swiper = class _Swiper {
    constructor(...args) {
      let el;
      let params;
      if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
        params = args[0];
      } else {
        [el, params] = args;
      }
      if (!params)
        params = {};
      params = extend2({}, params);
      if (el && !params.el)
        params.el = el;
      const document2 = getDocument();
      if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
        const swipers = [];
        document2.querySelectorAll(params.el).forEach((containerEl) => {
          const newParams = extend2({}, params, {
            el: containerEl
          });
          swipers.push(new _Swiper(newParams));
        });
        return swipers;
      }
      const swiper = this;
      swiper.__swiper__ = true;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params.userAgent
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];
      swiper.modules = [...swiper.__modules__];
      if (params.modules && Array.isArray(params.modules)) {
        params.modules.forEach((mod) => {
          if (typeof mod === "function" && swiper.modules.indexOf(mod) < 0) {
            swiper.modules.push(mod);
          }
        });
      }
      const allModulesParams = {};
      swiper.modules.forEach((mod) => {
        mod({
          params,
          swiper,
          extendParams: moduleExtendParams(params, allModulesParams),
          on: swiper.on.bind(swiper),
          once: swiper.once.bind(swiper),
          off: swiper.off.bind(swiper),
          emit: swiper.emit.bind(swiper)
        });
      });
      const swiperParams = extend2({}, defaults, allModulesParams);
      swiper.params = extend2({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = extend2({}, swiper.params);
      swiper.passedParams = extend2({}, params);
      if (swiper.params && swiper.params.on) {
        Object.keys(swiper.params.on).forEach((eventName) => {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      }
      if (swiper.params && swiper.params.onAny) {
        swiper.onAny(swiper.params.onAny);
      }
      Object.assign(swiper, {
        enabled: swiper.params.enabled,
        el,
        // Classes
        classNames: [],
        // Slides
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal() {
          return swiper.params.direction === "horizontal";
        },
        isVertical() {
          return swiper.params.direction === "vertical";
        },
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          // Form elements to match
          focusableElements: swiper.params.focusableElements,
          // Last click time
          lastClickTime: 0,
          clickTimeout: void 0,
          // Velocities
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      });
      swiper.emit("_swiper");
      if (swiper.params.init) {
        swiper.init();
      }
      return swiper;
    }
    getDirectionLabel(property) {
      if (this.isHorizontal()) {
        return property;
      }
      return {
        "width": "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        "marginRight": "marginBottom"
      }[property];
    }
    getSlideIndex(slideEl) {
      const {
        slidesEl,
        params
      } = this;
      const slides = elementChildren(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
      const firstSlideIndex = elementIndex(slides[0]);
      return elementIndex(slideEl) - firstSlideIndex;
    }
    getSlideIndexByData(index) {
      return this.getSlideIndex(this.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index));
    }
    getSlideIndexWhenGrid(index) {
      if (this.grid && this.params.grid && this.params.grid.rows > 1) {
        if (this.params.grid.fill === "column") {
          index = Math.floor(index / this.params.grid.rows);
        } else if (this.params.grid.fill === "row") {
          index = index % Math.ceil(this.slides.length / this.params.grid.rows);
        }
      }
      return index;
    }
    recalcSlides() {
      const swiper = this;
      const {
        slidesEl,
        params
      } = swiper;
      swiper.slides = elementChildren(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
    }
    enable() {
      const swiper = this;
      if (swiper.enabled)
        return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }
      swiper.emit("enable");
    }
    disable() {
      const swiper = this;
      if (!swiper.enabled)
        return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }
      swiper.emit("disable");
    }
    setProgress(progress, speed) {
      const swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      const min = swiper.minTranslate();
      const max = swiper.maxTranslate();
      const current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    emitContainerClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el)
        return;
      const cls = swiper.el.className.split(" ").filter((className) => {
        return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit("_containerClasses", cls.join(" "));
    }
    getSlideClasses(slideEl) {
      const swiper = this;
      if (swiper.destroyed)
        return "";
      return slideEl.className.split(" ").filter((className) => {
        return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
      }).join(" ");
    }
    emitSlidesClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el)
        return;
      const updates = [];
      swiper.slides.forEach((slideEl) => {
        const classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl,
          classNames
        });
        swiper.emit("_slideClass", slideEl, classNames);
      });
      swiper.emit("_slideClasses", updates);
    }
    slidesPerViewDynamic(view = "current", exact = false) {
      const swiper = this;
      const {
        params,
        slides,
        slidesGrid,
        slidesSizesGrid,
        size: swiperSize,
        activeIndex
      } = swiper;
      let spv = 1;
      if (typeof params.slidesPerView === "number")
        return params.slidesPerView;
      if (params.centeredSlides) {
        let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
        let breakLoop;
        for (let i9 = activeIndex + 1; i9 < slides.length; i9 += 1) {
          if (slides[i9] && !breakLoop) {
            slideSize += Math.ceil(slides[i9].swiperSlideSize);
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
        for (let i9 = activeIndex - 1; i9 >= 0; i9 -= 1) {
          if (slides[i9] && !breakLoop) {
            slideSize += slides[i9].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
      } else {
        if (view === "current") {
          for (let i9 = activeIndex + 1; i9 < slides.length; i9 += 1) {
            const slideInView = exact ? slidesGrid[i9] + slidesSizesGrid[i9] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i9] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          for (let i9 = activeIndex - 1; i9 >= 0; i9 -= 1) {
            const slideInView = slidesGrid[activeIndex] - slidesGrid[i9] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
    update() {
      const swiper = this;
      if (!swiper || swiper.destroyed)
        return;
      const {
        snapGrid,
        params
      } = swiper;
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper, imageEl);
        }
      });
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      function setTranslate2() {
        const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      let translated;
      if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
        setTranslate2();
        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
          const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
          translated = swiper.slideTo(slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate2();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit("update");
    }
    changeDirection(newDirection, needUpdate = true) {
      const swiper = this;
      const currentDirection = swiper.params.direction;
      if (!newDirection) {
        newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
      }
      if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
        return swiper;
      }
      swiper.el.classList.remove("".concat(swiper.params.containerModifierClass).concat(currentDirection));
      swiper.el.classList.add("".concat(swiper.params.containerModifierClass).concat(newDirection));
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.forEach((slideEl) => {
        if (newDirection === "vertical") {
          slideEl.style.width = "";
        } else {
          slideEl.style.height = "";
        }
      });
      swiper.emit("changeDirection");
      if (needUpdate)
        swiper.update();
      return swiper;
    }
    changeLanguageDirection(direction) {
      const swiper = this;
      if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
        return;
      swiper.rtl = direction === "rtl";
      swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
      if (swiper.rtl) {
        swiper.el.classList.add("".concat(swiper.params.containerModifierClass, "rtl"));
        swiper.el.dir = "rtl";
      } else {
        swiper.el.classList.remove("".concat(swiper.params.containerModifierClass, "rtl"));
        swiper.el.dir = "ltr";
      }
      swiper.update();
    }
    mount(element) {
      const swiper = this;
      if (swiper.mounted)
        return true;
      let el = element || swiper.params.el;
      if (typeof el === "string") {
        el = document.querySelector(el);
      }
      if (!el) {
        return false;
      }
      el.swiper = swiper;
      if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
        swiper.isElement = true;
      }
      const getWrapperSelector = () => {
        return ".".concat((swiper.params.wrapperClass || "").trim().split(" ").join("."));
      };
      const getWrapper = () => {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          const res = el.shadowRoot.querySelector(getWrapperSelector());
          return res;
        }
        return elementChildren(el, getWrapperSelector())[0];
      };
      let wrapperEl = getWrapper();
      if (!wrapperEl && swiper.params.createElements) {
        wrapperEl = createElement("div", swiper.params.wrapperClass);
        el.append(wrapperEl);
        elementChildren(el, ".".concat(swiper.params.slideClass)).forEach((slideEl) => {
          wrapperEl.append(slideEl);
        });
      }
      Object.assign(swiper, {
        el,
        wrapperEl,
        slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
        hostEl: swiper.isElement ? el.parentNode.host : el,
        mounted: true,
        // RTL
        rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
        rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
        wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
      });
      return true;
    }
    init(el) {
      const swiper = this;
      if (swiper.initialized)
        return swiper;
      const mounted = swiper.mount(el);
      if (mounted === false)
        return swiper;
      swiper.emit("beforeInit");
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.addClasses();
      swiper.updateSize();
      swiper.updateSlides();
      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }
      if (swiper.params.grabCursor && swiper.enabled) {
        swiper.setGrabCursor();
      }
      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
        swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
      }
      if (swiper.params.loop) {
        swiper.loopCreate(void 0, true);
      }
      swiper.attachEvents();
      const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
      if (swiper.isElement) {
        lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
      }
      lazyElements.forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper, imageEl);
        } else {
          imageEl.addEventListener("load", (e11) => {
            processLazyPreloader(swiper, e11.target);
          });
        }
      });
      preload(swiper);
      swiper.initialized = true;
      preload(swiper);
      swiper.emit("init");
      swiper.emit("afterInit");
      return swiper;
    }
    destroy(deleteInstance = true, cleanStyles = true) {
      const swiper = this;
      const {
        params,
        el,
        wrapperEl,
        slides
      } = swiper;
      if (typeof swiper.params === "undefined" || swiper.destroyed) {
        return null;
      }
      swiper.emit("beforeDestroy");
      swiper.initialized = false;
      swiper.detachEvents();
      if (params.loop) {
        swiper.loopDestroy();
      }
      if (cleanStyles) {
        swiper.removeClasses();
        if (el && typeof el !== "string") {
          el.removeAttribute("style");
        }
        if (wrapperEl) {
          wrapperEl.removeAttribute("style");
        }
        if (slides && slides.length) {
          slides.forEach((slideEl) => {
            slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
            slideEl.removeAttribute("style");
            slideEl.removeAttribute("data-swiper-slide-index");
          });
        }
      }
      swiper.emit("destroy");
      Object.keys(swiper.eventsListeners).forEach((eventName) => {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        if (swiper.el && typeof swiper.el !== "string") {
          swiper.el.swiper = null;
        }
        deleteProps(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
    static extendDefaults(newDefaults) {
      extend2(extendedDefaults, newDefaults);
    }
    static get extendedDefaults() {
      return extendedDefaults;
    }
    static get defaults() {
      return defaults;
    }
    static installModule(mod) {
      if (!_Swiper.prototype.__modules__)
        _Swiper.prototype.__modules__ = [];
      const modules = _Swiper.prototype.__modules__;
      if (typeof mod === "function" && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
    static use(module) {
      if (Array.isArray(module)) {
        module.forEach((m3) => _Swiper.installModule(m3));
        return _Swiper;
      }
      _Swiper.installModule(module);
      return _Swiper;
    }
  };
  Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer]);

  // node_modules/swiper/shared/create-element-if-not-defined.mjs
  function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
    if (swiper.params.createElements) {
      Object.keys(checkProps).forEach((key) => {
        if (!params[key] && params.auto === true) {
          let element = elementChildren(swiper.el, ".".concat(checkProps[key]))[0];
          if (!element) {
            element = createElement("div", checkProps[key]);
            element.className = checkProps[key];
            swiper.el.append(element);
          }
          params[key] = element;
          originalParams[key] = element;
        }
      });
    }
    return params;
  }

  // node_modules/swiper/modules/navigation.mjs
  var arrowSvg = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';
  function Navigation({
    swiper,
    extendParams,
    on,
    emit
  }) {
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        addIcons: true,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    });
    swiper.navigation = {
      nextEl: null,
      prevEl: null,
      arrowSvg
    };
    function getEl(el) {
      let res;
      if (el && typeof el === "string" && swiper.isElement) {
        res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
        if (res)
          return res;
      }
      if (el) {
        if (typeof el === "string")
          res = [...document.querySelectorAll(el)];
        if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
          res = swiper.el.querySelector(el);
        } else if (res && res.length === 1) {
          res = res[0];
        }
      }
      if (el && !res)
        return el;
      return res;
    }
    function toggleEl(el, disabled) {
      const params = swiper.params.navigation;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (subEl) {
          subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
          if (subEl.tagName === "BUTTON")
            subEl.disabled = disabled;
          if (swiper.params.watchOverflow && swiper.enabled) {
            subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
          }
        }
      });
    }
    function update2() {
      const {
        nextEl,
        prevEl
      } = swiper.navigation;
      if (swiper.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }
      toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
      toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
    }
    function onPrevClick(e11) {
      e11.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slidePrev();
      emit("navigationPrev");
    }
    function onNextClick(e11) {
      e11.preventDefault();
      if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slideNext();
      emit("navigationNext");
    }
    function init() {
      const params = swiper.params.navigation;
      swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      });
      if (!(params.nextEl || params.prevEl))
        return;
      let nextEl = getEl(params.nextEl);
      let prevEl = getEl(params.prevEl);
      Object.assign(swiper.navigation, {
        nextEl,
        prevEl
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const initButton = (el, dir) => {
        if (el) {
          if (params.addIcons && el.matches(".swiper-button-next,.swiper-button-prev") && !el.querySelector("svg")) {
            const tempEl = document.createElement("div");
            setInnerHTML(tempEl, arrowSvg);
            el.appendChild(tempEl.querySelector("svg"));
            tempEl.remove();
          }
          el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        }
        if (!swiper.enabled && el) {
          el.classList.add(...params.lockClass.split(" "));
        }
      };
      nextEl.forEach((el) => initButton(el, "next"));
      prevEl.forEach((el) => initButton(el, "prev"));
    }
    function destroy() {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const destroyButton = (el, dir) => {
        el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
      };
      nextEl.forEach((el) => destroyButton(el, "next"));
      prevEl.forEach((el) => destroyButton(el, "prev"));
    }
    on("init", () => {
      if (swiper.params.navigation.enabled === false) {
        disable();
      } else {
        init();
        update2();
      }
    });
    on("toEdge fromEdge lock unlock", () => {
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (swiper.enabled) {
        update2();
        return;
      }
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper.params.navigation.lockClass));
    });
    on("click", (_s, e11) => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const targetEl = e11.target;
      let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
      if (swiper.isElement && !targetIsButton) {
        const path = e11.path || e11.composedPath && e11.composedPath();
        if (path) {
          targetIsButton = path.find((pathEl) => nextEl.includes(pathEl) || prevEl.includes(pathEl));
        }
      }
      if (swiper.params.navigation.hideOnClick && !targetIsButton) {
        if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl)))
          return;
        let isHidden;
        if (nextEl.length) {
          isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        } else if (prevEl.length) {
          isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        }
        if (isHidden === true) {
          emit("navigationShow");
        } else {
          emit("navigationHide");
        }
        [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
      }
    });
    const enable = () => {
      swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
      init();
      update2();
    };
    const disable = () => {
      swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
      destroy();
    };
    Object.assign(swiper.navigation, {
      enable,
      disable,
      update: update2,
      init,
      destroy
    });
  }

  // node_modules/swiper/shared/classes-to-selector.mjs
  function classesToSelector(classes2 = "") {
    return ".".concat(classes2.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, "."));
  }

  // node_modules/swiper/modules/pagination.mjs
  function Pagination({
    swiper,
    extendParams,
    on,
    emit
  }) {
    const pfx = "swiper-pagination";
    extendParams({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: "bullets",
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: (number) => number,
        formatFractionTotal: (number) => number,
        bulletClass: "".concat(pfx, "-bullet"),
        bulletActiveClass: "".concat(pfx, "-bullet-active"),
        modifierClass: "".concat(pfx, "-"),
        currentClass: "".concat(pfx, "-current"),
        totalClass: "".concat(pfx, "-total"),
        hiddenClass: "".concat(pfx, "-hidden"),
        progressbarFillClass: "".concat(pfx, "-progressbar-fill"),
        progressbarOppositeClass: "".concat(pfx, "-progressbar-opposite"),
        clickableClass: "".concat(pfx, "-clickable"),
        lockClass: "".concat(pfx, "-lock"),
        horizontalClass: "".concat(pfx, "-horizontal"),
        verticalClass: "".concat(pfx, "-vertical"),
        paginationDisabledClass: "".concat(pfx, "-disabled")
      }
    });
    swiper.pagination = {
      el: null,
      bullets: []
    };
    let bulletSize;
    let dynamicBulletIndex = 0;
    function isPaginationDisabled() {
      return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
    }
    function setSideBullets(bulletEl, position) {
      const {
        bulletActiveClass
      } = swiper.params.pagination;
      if (!bulletEl)
        return;
      bulletEl = bulletEl["".concat(position === "prev" ? "previous" : "next", "ElementSibling")];
      if (bulletEl) {
        bulletEl.classList.add("".concat(bulletActiveClass, "-").concat(position));
        bulletEl = bulletEl["".concat(position === "prev" ? "previous" : "next", "ElementSibling")];
        if (bulletEl) {
          bulletEl.classList.add("".concat(bulletActiveClass, "-").concat(position, "-").concat(position));
        }
      }
    }
    function getMoveDirection(prevIndex, nextIndex, length) {
      prevIndex = prevIndex % length;
      nextIndex = nextIndex % length;
      if (nextIndex === prevIndex + 1) {
        return "next";
      } else if (nextIndex === prevIndex - 1) {
        return "previous";
      }
      return;
    }
    function onBulletClick(e11) {
      const bulletEl = e11.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
      if (!bulletEl) {
        return;
      }
      e11.preventDefault();
      const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
      if (swiper.params.loop) {
        if (swiper.realIndex === index)
          return;
        const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
        if (moveDirection === "next") {
          swiper.slideNext();
        } else if (moveDirection === "previous") {
          swiper.slidePrev();
        } else {
          swiper.slideToLoop(index);
        }
      } else {
        swiper.slideTo(index);
      }
    }
    function update2() {
      const rtl = swiper.rtl;
      const params = swiper.params.pagination;
      if (isPaginationDisabled())
        return;
      let el = swiper.pagination.el;
      el = makeElementsArray(el);
      let current;
      let previousIndex;
      const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.loop) {
        previousIndex = swiper.previousRealIndex || 0;
        current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
      } else if (typeof swiper.snapIndex !== "undefined") {
        current = swiper.snapIndex;
        previousIndex = swiper.previousSnapIndex;
      } else {
        previousIndex = swiper.previousIndex || 0;
        current = swiper.activeIndex || 0;
      }
      if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        const bullets = swiper.pagination.bullets;
        let firstIndex;
        let lastIndex;
        let midIndex;
        if (params.dynamicBullets) {
          bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
          el.forEach((subEl) => {
            subEl.style[swiper.isHorizontal() ? "width" : "height"] = "".concat(bulletSize * (params.dynamicMainBullets + 4), "px");
          });
          if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
            dynamicBulletIndex += current - (previousIndex || 0);
            if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
              dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (dynamicBulletIndex < 0) {
              dynamicBulletIndex = 0;
            }
          }
          firstIndex = Math.max(current - dynamicBulletIndex, 0);
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.forEach((bulletEl) => {
          const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => "".concat(params.bulletActiveClass).concat(suffix))].map((s11) => typeof s11 === "string" && s11.includes(" ") ? s11.split(" ") : s11).flat();
          bulletEl.classList.remove(...classesToRemove);
        });
        if (el.length > 1) {
          bullets.forEach((bullet) => {
            const bulletIndex = elementIndex(bullet);
            if (bulletIndex === current) {
              bullet.classList.add(...params.bulletActiveClass.split(" "));
            } else if (swiper.isElement) {
              bullet.setAttribute("part", "bullet");
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                bullet.classList.add(..."".concat(params.bulletActiveClass, "-main").split(" "));
              }
              if (bulletIndex === firstIndex) {
                setSideBullets(bullet, "prev");
              }
              if (bulletIndex === lastIndex) {
                setSideBullets(bullet, "next");
              }
            }
          });
        } else {
          const bullet = bullets[current];
          if (bullet) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          }
          if (swiper.isElement) {
            bullets.forEach((bulletEl, bulletIndex) => {
              bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
            });
          }
          if (params.dynamicBullets) {
            const firstDisplayedBullet = bullets[firstIndex];
            const lastDisplayedBullet = bullets[lastIndex];
            for (let i9 = firstIndex; i9 <= lastIndex; i9 += 1) {
              if (bullets[i9]) {
                bullets[i9].classList.add(..."".concat(params.bulletActiveClass, "-main").split(" "));
              }
            }
            setSideBullets(firstDisplayedBullet, "prev");
            setSideBullets(lastDisplayedBullet, "next");
          }
        }
        if (params.dynamicBullets) {
          const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
          const offsetProp = rtl ? "right" : "left";
          bullets.forEach((bullet) => {
            bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = "".concat(bulletsOffset, "px");
          });
        }
      }
      el.forEach((subEl, subElIndex) => {
        if (params.type === "fraction") {
          subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
            fractionEl.textContent = params.formatFractionCurrent(current + 1);
          });
          subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
            totalEl.textContent = params.formatFractionTotal(total);
          });
        }
        if (params.type === "progressbar") {
          let progressbarDirection;
          if (params.progressbarOpposite) {
            progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
          } else {
            progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
          }
          const scale = (current + 1) / total;
          let scaleX = 1;
          let scaleY = 1;
          if (progressbarDirection === "horizontal") {
            scaleX = scale;
          } else {
            scaleY = scale;
          }
          subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
            progressEl.style.transform = "translate3d(0,0,0) scaleX(".concat(scaleX, ") scaleY(").concat(scaleY, ")");
            progressEl.style.transitionDuration = "".concat(swiper.params.speed, "ms");
          });
        }
        if (params.type === "custom" && params.renderCustom) {
          setInnerHTML(subEl, params.renderCustom(swiper, current + 1, total));
          if (subElIndex === 0)
            emit("paginationRender", subEl);
        } else {
          if (subElIndex === 0)
            emit("paginationRender", subEl);
          emit("paginationUpdate", subEl);
        }
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
        }
      });
    }
    function render() {
      const params = swiper.params.pagination;
      if (isPaginationDisabled())
        return;
      const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
      let el = swiper.pagination.el;
      el = makeElementsArray(el);
      let paginationHTML = "";
      if (params.type === "bullets") {
        let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
          numberOfBullets = slidesLength;
        }
        for (let i9 = 0; i9 < numberOfBullets; i9 += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i9, params.bulletClass);
          } else {
            paginationHTML += "<".concat(params.bulletElement, " ").concat(swiper.isElement ? 'part="bullet"' : "", ' class="').concat(params.bulletClass, '"></').concat(params.bulletElement, ">");
          }
        }
      }
      if (params.type === "fraction") {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = '<span class="'.concat(params.currentClass, '"></span>') + " / " + '<span class="'.concat(params.totalClass, '"></span>');
        }
      }
      if (params.type === "progressbar") {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = '<span class="'.concat(params.progressbarFillClass, '"></span>');
        }
      }
      swiper.pagination.bullets = [];
      el.forEach((subEl) => {
        if (params.type !== "custom") {
          setInnerHTML(subEl, paginationHTML || "");
        }
        if (params.type === "bullets") {
          swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
        }
      });
      if (params.type !== "custom") {
        emit("paginationRender", el[0]);
      }
    }
    function init() {
      swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
        el: "swiper-pagination"
      });
      const params = swiper.params.pagination;
      if (!params.el)
        return;
      let el;
      if (typeof params.el === "string" && swiper.isElement) {
        el = swiper.el.querySelector(params.el);
      }
      if (!el && typeof params.el === "string") {
        el = [...document.querySelectorAll(params.el)];
      }
      if (!el) {
        el = params.el;
      }
      if (!el || el.length === 0)
        return;
      if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
        el = [...swiper.el.querySelectorAll(params.el)];
        if (el.length > 1) {
          el = el.find((subEl) => {
            if (elementParents(subEl, ".swiper")[0] !== swiper.el)
              return false;
            return true;
          });
        }
      }
      if (Array.isArray(el) && el.length === 1)
        el = el[0];
      Object.assign(swiper.pagination, {
        el
      });
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (params.type === "bullets" && params.clickable) {
          subEl.classList.add(...(params.clickableClass || "").split(" "));
        }
        subEl.classList.add(params.modifierClass + params.type);
        subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.type === "bullets" && params.dynamicBullets) {
          subEl.classList.add("".concat(params.modifierClass).concat(params.type, "-dynamic"));
          dynamicBulletIndex = 0;
          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }
        if (params.type === "progressbar" && params.progressbarOpposite) {
          subEl.classList.add(params.progressbarOppositeClass);
        }
        if (params.clickable) {
          subEl.addEventListener("click", onBulletClick);
        }
        if (!swiper.enabled) {
          subEl.classList.add(params.lockClass);
        }
      });
    }
    function destroy() {
      const params = swiper.params.pagination;
      if (isPaginationDisabled())
        return;
      let el = swiper.pagination.el;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          subEl.classList.remove(params.hiddenClass);
          subEl.classList.remove(params.modifierClass + params.type);
          subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
          if (params.clickable) {
            subEl.classList.remove(...(params.clickableClass || "").split(" "));
            subEl.removeEventListener("click", onBulletClick);
          }
        });
      }
      if (swiper.pagination.bullets)
        swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
    }
    on("changeDirection", () => {
      if (!swiper.pagination || !swiper.pagination.el)
        return;
      const params = swiper.params.pagination;
      let {
        el
      } = swiper.pagination;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.classList.remove(params.horizontalClass, params.verticalClass);
        subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      });
    });
    on("init", () => {
      if (swiper.params.pagination.enabled === false) {
        disable();
      } else {
        init();
        render();
        update2();
      }
    });
    on("activeIndexChange", () => {
      if (typeof swiper.snapIndex === "undefined") {
        update2();
      }
    });
    on("snapIndexChange", () => {
      update2();
    });
    on("snapGridLengthChange", () => {
      render();
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        el
      } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
      }
    });
    on("lock unlock", () => {
      update2();
    });
    on("click", (_s, e11) => {
      const targetEl = e11.target;
      const el = makeElementsArray(swiper.pagination.el);
      if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
        if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
          return;
        const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
        if (isHidden === true) {
          emit("paginationShow");
        } else {
          emit("paginationHide");
        }
        el.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
      }
    });
    const enable = () => {
      swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
      }
      init();
      render();
      update2();
    };
    const disable = () => {
      swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
      }
      destroy();
    };
    Object.assign(swiper.pagination, {
      enable,
      disable,
      render,
      update: update2,
      init,
      destroy
    });
  }

  // scripts/components/sliders/main.js
  var bindMainSlider = () => {
    const sliders = document.querySelectorAll(".js-slider-main");
    sliders.forEach((slider) => {
      let object;
      const swiper = slider.querySelector(".swiper");
      const prevEl = slider.querySelector("[data-button-prev]");
      const nextEl = slider.querySelector("[data-button-next]");
      const activeIndex = slider.querySelector("[data-active-index]");
      object = new Swiper(swiper, {
        modules: [
          Navigation,
          Pagination
        ],
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl,
          prevEl
        },
        on: {
          init: function() {
            if (activeIndex) {
              activeIndex.innerHTML = this.slides[this.activeIndex].getAttribute("data-index");
            }
          },
          slideChange: function() {
            if (activeIndex) {
              activeIndex.innerHTML = this.slides[this.activeIndex].getAttribute("data-index");
            }
          }
        }
      });
    });
    N.bind(".js-slider-main [data-fancybox]", {
      placeFocusBack: false,
      // Отключаем захват фокуса внутри попапа
      // trapFocus: false,
      // Отключаем автофокус на первый элемент при открытии (опционально)
      // autoFocus: false,
      zoomEffect: false
      // hash: false
    });
  };

  // scripts/components/sliders/add.js
  var bindAddSlider = () => {
    const sliders = document.querySelectorAll(".js-front-slider-add");
    sliders.forEach((slider) => {
      let object;
      const swiper = slider.querySelector(".swiper");
      const prevEl = slider.querySelector("[data-button-prev]");
      const nextEl = slider.querySelector("[data-button-next]");
      const isLoop = slider.hasAttribute("data-loop");
      const initial = +slider.getAttribute("data-initial");
      object = new Swiper(swiper, {
        modules: [
          Navigation,
          Pagination
        ],
        initialSlide: initial,
        slidesPerView: "auto",
        centeredSlides: true,
        centeredSlidesBounds: false,
        loop: isLoop,
        navigation: {
          nextEl,
          prevEl
        }
      });
    });
  };

  // scripts/components/common/index.js
  var common = (e11) => {
    N.bind("[data-fancybox]", {
      zoomEffect: false
    });
    N.bind(".content-image a", {
      zoomEffect: false,
      groupAll: true,
      Carousel: {
        Toolbar: false
      }
    });
    window.project = {
      defaultElements,
      onClick: []
    };
    bindCloseElements();
    bindSetLike();
    bindScrollById();
    bindCreateContentAside();
    bindDemoChecks();
    bindCatalogControls();
    bindMainSlider();
    bindAddSlider();
    window.project.defaultElements(e11);
  };

  // scripts/global.js
  document.addEventListener("DOMContentLoaded", (e11) => {
    common(e11);
  });
})();
/*! Bundled license information:

lozad/dist/lozad.js:
  (*! lozad.js - v1.0.2 - 2017-09-10
  * https://github.com/ApoorvSaxena/lozad.js
  * Copyright (c) 2017 Apoorv Saxena; Licensed MIT *)

@fancyapps/ui/dist/utils/isPlainObject.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/isString.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/isNode.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/strToHtml.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/getScrollableParent.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/scrollLock.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/extend.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/canUseDOM.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/clamp.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/map.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/addClass.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/removeClass.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/toggleClass.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/isEqual.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/libs/tween.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/libs/gestures.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/panzoom/l10n/en_EN.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/panzoom/panzoom.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/getDirectChildren.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/l10n/en_EN.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/utils/replaceAll.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.zoomable.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.sync.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.lazyload.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.arrows.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/shared/buttons.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.toolbar.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.autoplay.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.thumbs.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.html.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.video.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/carousel/carousel.fullscreen.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/fancybox/fancybox.hash.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/fancybox/l10n/en_EN.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/fancybox/fancybox.js:
  (*! License details at fancyapps.com/license *)

@fancyapps/ui/dist/fancybox/index.js:
  (*! License details at fancyapps.com/license *)
*/
