(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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
          function onKeyDown(e) {
            if (e.metaKey || e.altKey || e.ctrlKey) {
              return;
            }
            if (isValidFocusTarget(scope.activeElement)) {
              addFocusVisibleClass(scope.activeElement);
            }
            hadKeyboardEvent = true;
          }
          function onPointerDown(e) {
            hadKeyboardEvent = false;
          }
          function onFocus(e) {
            if (!isValidFocusTarget(e.target)) {
              return;
            }
            if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
              addFocusVisibleClass(e.target);
            }
          }
          function onBlur(e) {
            if (!isValidFocusTarget(e.target)) {
              return;
            }
            if (e.target.classList.contains("focus-visible") || e.target.hasAttribute("data-focus-visible-added")) {
              hadFocusVisibleRecently = true;
              window.clearTimeout(hadFocusVisibleRecentlyTimeout);
              hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
                hadFocusVisibleRecently = false;
              }, 100);
              removeFocusVisibleClass(e.target);
            }
          }
          function onVisibilityChange(e) {
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
          function onInitialPointerMove(e) {
            if (e.target.nodeName && e.target.nodeName.toLowerCase() === "html") {
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
          var event;
          try {
            event = new CustomEvent("focus-visible-polyfill-ready");
          } catch (error) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent("focus-visible-polyfill-ready", false, false, {});
          }
          window.dispatchEvent(event);
        }
        if (typeof document !== "undefined") {
          applyFocusVisiblePolyfill(document);
        }
      });
    }
  });

  // scripts/components/common/index.js
  var import_focus_visible = __toESM(require_focus_visible(), 1);

  // scripts/components/utils/toggleBlock.js
  var initToggleBlock = (button) => {
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
  var defaultToggleBlocks = () => {
    document.querySelectorAll(".js-toggle-view-button").forEach(initToggleBlock);
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
    const transition = "all ".concat(options.timeout, "ms ").concat(options.animation);
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
        element.style.transition = transition;
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
        element.style.transition = transition;
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
    function checkVisible(e) {
      const box = e.getBoundingClientRect();
      const height = box.height || box.bottom - box.top;
      const width = box.width || box.right - box.left;
      return !!height || !!width;
    }
    function getStyle(e, style) {
      return parseInt(getComputedStyle(e)[style], 10);
    }
    function getStyles(e) {
      return {
        h: e.offsetHeight,
        mt: getStyle(e, "marginTop"),
        pt: getStyle(e, "paddingTop"),
        mb: getStyle(e, "marginBottom"),
        pb: getStyle(e, "paddingBottom"),
        btw: getStyle(e, "borderTopWidth"),
        bbw: getStyle(e, "borderBottomWidth")
      };
    }
    return true;
  };

  // scripts/components/utils/accordion.js
  var initAccordion = function(accordion, options = {}) {
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
  var defaultAccordions = () => {
    document.querySelectorAll(".js-accordion").forEach(initAccordion);
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
      if (!value) {
        result = false;
        viewErrorInput(input, "\u042D\u0442\u043E \u043F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043A&nbsp;\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E");
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
  var defaultForm = (form) => {
    const submitButton = form.querySelector('[type="submit"]');
    if (form.classList.contains("init"))
      return;
    form.classList.add("init");
    form.addEventListener("input", (e) => {
      const input = e.target;
      const errors = input.parentElement.querySelectorAll("[data-error]");
      input.classList.remove("error");
      errors.forEach((error) => error.remove());
      checkSubmit(form);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
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
  var defaultForms = () => {
    document.querySelectorAll(".js-default-form").forEach(defaultForm);
  };

  // scripts/components/common/blocks/defaultElements.js
  var defaultElements = (e) => {
    defaultToggleBlocks();
    defaultAccordions();
    defaultForms();
  };

  // scripts/components/helpers/closeElements.js
  var closeElements = function() {
    const check = function(e) {
      if (!window.project.onClick[0])
        return;
      const arr = window.project.onClick;
      for (let i = 0; i < arr.length; i++) {
        const fn = arr[i];
        if (typeof fn == "function")
          fn((e == null ? void 0 : e.target) || void 0);
      }
    };
    document.addEventListener("click", check);
    document.addEventListener("keydown", (e) => {
      if (e.key.toLocaleLowerCase() === "escape")
        check();
    });
  };

  // scripts/components/utils/basic/scrollById.js
  var scrollById = () => {
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

  // scripts/components/common/index.js
  var common = (e) => {
    window.project = {
      defaultElements,
      onClick: []
    };
    closeElements();
    scrollById();
    window.project.defaultElements(e);
  };

  // scripts/global.js
  document.addEventListener("DOMContentLoaded", (e) => {
    common(e);
  });
})();
