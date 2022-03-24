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
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/layout.tsx
var layout_exports = {};
__export(layout_exports, {
  AltLayout: () => AltLayout,
  Layout: () => MainLayout,
  View: () => import_react_native3.View
});
module.exports = __toCommonJS(layout_exports);
var import_react3 = __toESM(require("react"));
var import_react_native3 = require("react-native");
var import_react_native_safe_area_context = require("react-native-safe-area-context");

// src/visuals/vectors.tsx
var import_react = __toESM(require("react"));
var import_react_native_svg = __toESM(require("react-native-svg"));
var ElsaIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadValues({
    viewBox: "0 0 25 25",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    d: "M25 6.855v12.37H7.58c-1 0-1.82-.82-1.82-1.819v-5.915h2.16v5.296c0 .14.12.28.28.28h14.66V7.013A4.863 4.863 0 0018 2.158H0V0h18.14C21.92 0 25 3.078 25 6.855z",
    fill: "#000"
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    d: "M0 18.125V5.755h17.42c1 0 1.82.82 1.82 1.819v5.915h-2.16V8.193c0-.16-.12-.28-.28-.28H2.16v10.073a4.863 4.863 0 004.86 4.856H25V25H6.86C3.08 24.98 0 21.902 0 18.125z",
    fill: "#000"
  }));
}));
var ElsaColorableIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "none",
    viewBox: "0 0 25 25",
    fill: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    d: "M25 6.855v12.37H7.58c-1 0-1.82-.82-1.82-1.819v-5.915h2.16v5.296c0 .14.12.28.28.28h14.66V7.013A4.863 4.863 0 0018 2.158H0V0h18.14C21.92 0 25 3.078 25 6.855z",
    fill: "currentColor"
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    d: "M0 18.125V5.755h17.42c1 0 1.82.82 1.82 1.819v5.915h-2.16V8.193c0-.16-.12-.28-.28-.28H2.16v10.073a4.863 4.863 0 004.86 4.856H25V25H6.86C3.08 24.98 0 21.902 0 18.125z",
    fill: "currentColor"
  }));
}));
var ArrowBackIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
  }));
}));
var PlusIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 4v16m8-8H4"
  }));
}));
var XIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }));
}));
var SearchIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  }));
}));
var NextIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M14 5l7 7m0 0l-7 7m7-7H3"
  }));
}));
var PreviousIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
  }));
}));
var MenuIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 6h16M4 12h16m-7 6h7"
  }));
}));
var TrashIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
  }));
}));
var CheckIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 13l4 4L19 7"
  }));
}));
var CheckCircleIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  }));
}));
var EyeIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
  }));
}));
var XCircleIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
  }));
}));
var MenuAltIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 8h16M4 16h16"
  }));
}));
var SettingsIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
  }));
}));
var ArchiveIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
  }));
}));
var ChevronDownIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 9l-7 7-7-7"
  }));
}));
var ExclamationIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  }));
}));
var InformationIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "none",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2v-3a1 1 0 0 0-1-1H9z",
    clipRule: "evenodd"
  }));
}));
var LibraryIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "none",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    fillRule: "evenodd",
    d: "M10.496 2.132a1 1 0 0 0-.992 0l-7 4A1 1 0 0 0 3 8v7a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2V8a1 1 0 0 0 .496-1.868l-7-4zM6 9a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1zm3 1a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0v-3zm5-1a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1z",
    clipRule: "evenodd"
  }));
}));
var PencilAltIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
  }));
}));
var ArrowDownIcon = import_react.default.memo(import_react.default.forwardRef((props, svgRef) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.default, __spreadProps(__spreadValues({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ref: svgRef
  }, props), {
    style: [{ color: "#000" }, props.style]
  }), /* @__PURE__ */ import_react.default.createElement(import_react_native_svg.Path, {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "m19 14-7 7m0 0-7-7m7 7V3"
  }));
}));

// src/theme/index.ts
var fontFamilyStyle = (props = {}) => {
  if (props.italic !== void 0) {
    if (props.italic) {
      switch (props.font || "normal") {
        case "light":
          return "AvenirLTStd-LightOblique";
        case "medium":
          return "AvenirLTStd-MediumOblique";
        case "bold":
          return "AvenirLTStd-HeavyOblique";
        case "black":
          return "AvenirLTStd-BookOblique";
        case "extra-black":
          return "AvenirLTStd-BlackOblique";
        case "normal":
        default:
          return "AvenirLTStd-Oblique";
      }
    }
  }
  switch (props.font || "normal") {
    case "light":
      return "AvenirLTStd-Light";
    case "medium":
      return "AvenirLTStd-Medium";
    case "bold":
      return "AvenirLTStd-Heavy";
    case "black":
      return "AvenirLTStd-Book";
    case "extra-black":
      return "AvenirLTStd-Black";
    case "normal":
    default:
      return "AvenirLTStd-Roman";
  }
};
var Color = {
  primary: {
    base: "#4665AF",
    light: "#7993e0",
    dark: "#8456A3",
    text: "#ffffff"
  },
  secondary: {
    base: "#5558A6",
    light: "#4BB8E9",
    dark: "#5558A6",
    text: "#000"
  }
};
var Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48
};
var Typography = {
  fontFamilyStyle,
  sizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    "2xl": "28px"
  }
};
var theme_default = {
  color: Color,
  typography: Typography,
  spacing: Spacing
};

// src/components/misc.tsx
var import_react2 = __toESM(require("react"));
var import_react_native2 = require("react-native");
var import_react_native_sectioned_multi_select = __toESM(require("react-native-sectioned-multi-select"));

// src/components/typography.tsx
var import_native = __toESM(require("styled-components/native"));
var import_react_native = require("react-native");
function getFontSize(size) {
  switch (size) {
    case "xs":
      return theme_default.typography.sizes.xs;
    case "sm":
      return theme_default.typography.sizes.sm;
    case "md":
      return theme_default.typography.sizes.md;
    case "lg":
      return theme_default.typography.sizes.lg;
    case "xl":
      return theme_default.typography.sizes.xl;
    case "2xl":
      return theme_default.typography.sizes["2xl"];
    default:
      return size + "px";
  }
}
var Text = (0, import_native.default)(import_react_native.Text)`
	color: ${({ color }) => color || "#000"};
	font-family: ${theme_default.typography.fontFamilyStyle};
	font-style: normal;
	font-size: ${({ size = "md" }) => getFontSize(size)};
`;
var Heading = (0, import_native.default)(Text)`
	font-size: 20px;
`;

// src/components/misc.tsx
var chipStyles = import_react_native2.StyleSheet.create({
  default: {
    padding: 6,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: theme_default.color.secondary.base,
    width: "auto",
    elevation: 1,
    margin: 1,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    backgroundColor: "#FFF",
    shadowOpacity: 0.22,
    shadowRadius: 2.22
  },
  selected: {
    borderWidth: 2,
    borderColor: theme_default.color.secondary.dark,
    backgroundColor: theme_default.color.secondary.base
  },
  selectedText: {
    color: "#FFFFFF"
  }
});
function RevealContent({
  show,
  children,
  style
}) {
  if (!show) {
    return null;
  }
  return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement(import_react_native2.View, {
    style
  }, children));
}

// src/components/layout.tsx
var BaseLayout = function(_a) {
  var _b = _a, {
    hideGoBack = false,
    hideHeader = false,
    hideLogo = false,
    navigation,
    title,
    wrapperStyle,
    headerStyle,
    backIcon: BackIcon = ArrowBackIcon,
    testID
  } = _b, viewProps = __objRest(_b, [
    "hideGoBack",
    "hideHeader",
    "hideLogo",
    "navigation",
    "title",
    "wrapperStyle",
    "headerStyle",
    "backIcon",
    "testID"
  ]);
  const goBack = import_react3.default.useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return /* @__PURE__ */ import_react3.default.createElement(import_react_native_safe_area_context.SafeAreaView, {
    style: [{ flex: 1 }, wrapperStyle]
  }, /* @__PURE__ */ import_react3.default.createElement(import_react_native3.StatusBar, {
    animated: true,
    backgroundColor: "#FFF",
    barStyle: "dark-content"
  }), /* @__PURE__ */ import_react3.default.createElement(RevealContent, {
    show: !hideHeader,
    style: [
      {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#FFF"
      },
      headerStyle
    ]
  }, /* @__PURE__ */ import_react3.default.createElement(import_react_native3.View, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /* @__PURE__ */ import_react3.default.createElement(import_react_native3.View, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  }, /* @__PURE__ */ import_react3.default.createElement(RevealContent, {
    show: navigation !== void 0 && navigation.canGoBack() && !hideGoBack
  }, /* @__PURE__ */ import_react3.default.createElement(import_react_native3.Pressable, {
    android_ripple: {
      borderless: true,
      radius: 16,
      color: theme_default.color.primary.light
    },
    testID: `${testID}-back-button`,
    style: { padding: 8 },
    onPress: goBack
  }, /* @__PURE__ */ import_react3.default.createElement(BackIcon, {
    style: { color: theme_default.color.primary.dark }
  }))), /* @__PURE__ */ import_react3.default.createElement(RevealContent, {
    show: title !== void 0,
    style: { marginLeft: 10 }
  }, /* @__PURE__ */ import_react3.default.createElement(Heading, {
    font: "bold",
    color: "#000"
  }, title))), /* @__PURE__ */ import_react3.default.createElement(RevealContent, {
    show: !hideLogo,
    style: { marginRight: 6, flex: 1 }
  }, /* @__PURE__ */ import_react3.default.createElement(ElsaIcon, {
    style: { alignSelf: "flex-end" },
    width: 25,
    height: 25
  }))), /* @__PURE__ */ import_react3.default.createElement(import_react_native3.View, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "blue"
    }
  })), /* @__PURE__ */ import_react3.default.createElement(import_react_native3.View, __spreadProps(__spreadValues({}, viewProps), {
    testID,
    style: [
      {
        flex: 1,
        padding: 24,
        paddingTop: 8,
        backgroundColor: "#FFF"
      },
      viewProps.style
    ]
  })));
};
function MainLayout(props) {
  return /* @__PURE__ */ import_react3.default.createElement(BaseLayout, __spreadValues({}, props));
}
function AltLayout(props) {
  return /* @__PURE__ */ import_react3.default.createElement(BaseLayout, __spreadValues({}, props));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AltLayout,
  Layout,
  View
});