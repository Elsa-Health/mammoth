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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AltLayout: () => AltLayout,
  Button: () => Button,
  Chip: () => Chip,
  Heading: () => Heading,
  Layout: () => MainLayout,
  MultiInput: () => MultiInput,
  Pressable: () => Pressable4,
  RevealContent: () => RevealContent,
  SearchInput: () => SearchInput,
  SectionedSelect: () => SectionedSelect,
  SelectableChip: () => SelectableChip,
  Text: () => Text,
  TextInput: () => TextInput,
  VariableTextInput: () => VariableTextInput,
  View: () => import_react_native3.View,
  _BaseButton: () => _BaseButton,
  _BaseTextInput: () => _BaseTextInput,
  buttonStyleMap: () => buttonStyleMap,
  buttonStyles: () => buttonStyles,
  chipStyles: () => chipStyles,
  defaults: () => defaults,
  fontStyle: () => fontStyle,
  iconToggle: () => iconToggle,
  layoutStyle: () => layoutStyle,
  multiInputStyles: () => multiInputStyles,
  normalizeConifiguration: () => normalizeConifiguration,
  pressableStyle: () => pressableStyle,
  textStyles: () => textStyles
});
module.exports = __toCommonJS(src_exports);

// src/components/layout.tsx
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
function Chip(_a) {
  var _b = _a, { text, children, style } = _b, other = __objRest(_b, ["text", "children", "style"]);
  return /* @__PURE__ */ import_react2.default.createElement(import_react_native2.Pressable, __spreadValues({
    android_ripple: { radius: 20, color: theme_default.color.secondary.light },
    style: [chipStyles.default, style]
  }, other), children || /* @__PURE__ */ import_react2.default.createElement(Text, {
    font: "medium",
    style: [
      { fontSize: 15, textAlign: "center" },
      other.textStyle
    ]
  }, text || ""));
}
function SelectableChip(_a) {
  var _b = _a, {
    selected,
    onChange,
    onPress
  } = _b, other = __objRest(_b, [
    "selected",
    "onChange",
    "onPress"
  ]);
  const _onPressChip = import_react2.default.useCallback((e) => {
    onChange && onChange(selected);
    onPress && onPress(e);
  }, [selected]);
  return /* @__PURE__ */ import_react2.default.createElement(Chip, __spreadProps(__spreadValues({}, other), {
    style: [selected ? chipStyles.selected : {}, other.style],
    textStyle: [
      selected ? chipStyles.selectedText : {},
      other.textStyle
    ],
    onPress: _onPressChip
  }));
}
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
var iconToggle = (name, style = {}) => {
  if (name === "close") {
    return /* @__PURE__ */ import_react2.default.createElement(XIcon, {
      style: {
        color: theme_default.color.secondary.base,
        size: 10
      }
    });
  }
  if (name === "check") {
    return /* @__PURE__ */ import_react2.default.createElement(CheckCircleIcon, {
      style
    });
  }
  if (name === "search") {
    return /* @__PURE__ */ import_react2.default.createElement(SearchIcon, {
      style
    });
  }
  if (name === "keyboard-arrow-down") {
    return /* @__PURE__ */ import_react2.default.createElement(ChevronDownIcon, {
      style
    });
  }
  return null;
};
function SectionedSelect(props) {
  return /* @__PURE__ */ import_react2.default.createElement(import_react_native_sectioned_multi_select.default, __spreadProps(__spreadValues({
    IconRenderer: (props2) => iconToggle(props2.name, props2.style),
    subKey: "children",
    showDropDowns: false,
    expandDropDowns: true,
    readOnlyHeadings: true
  }, props), {
    styles: {
      selectToggle: {
        padding: 8,
        paddingHorizontal: 12,
        marginVertical: 8,
        borderColor: theme_default.color.primary.base,
        borderWidth: 2,
        borderRadius: 10
      },
      selectToggleText: {
        fontFamily: theme_default.typography.fontFamilyStyle(),
        color: theme_default.color.primary.dark
      },
      selectedItem: { backgroundColor: `#CCCCCC55` },
      itemText: {
        fontFamily: theme_default.typography.fontFamilyStyle({
          font: "bold"
        }),
        textTransform: "uppercase",
        fontSize: 18
      },
      subItemText: {
        fontFamily: theme_default.typography.fontFamilyStyle({
          font: "normal"
        }),
        fontSize: 16,
        paddingHorizontal: 8
      },
      selectedSubItemText: {
        fontFamily: theme_default.typography.fontFamilyStyle({
          font: "medium",
          italic: true
        })
      },
      chipText: {
        fontFamily: theme_default.typography.fontFamilyStyle({
          font: "medium"
        }),
        fontSize: 14,
        color: theme_default.color.secondary.dark
      },
      chipContainer: [chipStyles.default, { paddingHorizontal: 6 }],
      confirmText: {
        fontFamily: theme_default.typography.fontFamilyStyle({
          font: "bold"
        })
      },
      chipIcon: { borderRadius: 100, padding: 14 }
    }
  }));
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

// src/components/input.tsx
var import_react4 = __toESM(require("react"));
var import_react_native4 = require("react-native");
var import_react_native5 = require("react-native");
var import_react_native6 = require("react-native");
var import_picker = require("@react-native-picker/picker");
var import_immer = __toESM(require("immer"));
function _BaseButton(_a) {
  var _b = _a, {
    title,
    children,
    textStyle
  } = _b, other = __objRest(_b, [
    "title",
    "children",
    "textStyle"
  ]);
  return /* @__PURE__ */ import_react4.default.createElement(import_react_native5.Pressable, __spreadProps(__spreadValues({}, other), {
    android_ripple: { color: "#000", radius: 0, foreground: true }
  }), children || /* @__PURE__ */ import_react4.default.createElement(Text, {
    font: "bold",
    style: [{ flex: 1, alignItems: "center" }, textStyle]
  }, title) || /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null));
}
function Button(_a) {
  var _b = _a, {
    type = "primary",
    outline = false,
    style
  } = _b, other = __objRest(_b, [
    "type",
    "outline",
    "style"
  ]);
  const [buttonStyle, buttonTextStyle] = buttonStyleMap(outline)[type];
  return /* @__PURE__ */ import_react4.default.createElement(_BaseButton, __spreadProps(__spreadValues({}, other), {
    style: [
      defaults.button,
      buttonStyle,
      outline ? { borderWidth: 2, borderRadius: 50 } : {},
      style
    ],
    textStyle: [defaults.buttonText, buttonTextStyle]
  }));
}
var buttonStyles = import_react_native5.StyleSheet.create({
  primaryButton: {
    backgroundColor: theme_default.color.primary.base
  },
  secondaryButton: {
    backgroundColor: theme_default.color.secondary.base
  },
  primaryButtonText: {
    color: theme_default.color.primary.text
  },
  secondaryButtonText: {
    color: theme_default.color.secondary.text
  },
  primaryOutlineButton: {
    borderColor: theme_default.color.primary.base,
    backgroundColor: "#FFF"
  },
  secondaryOultineButton: {
    borderColor: theme_default.color.secondary.base,
    backgroundColor: "#FFF"
  },
  primaryOutlineButtonText: {
    color: theme_default.color.primary.dark
  },
  secondaryOutlineButtonText: {
    color: theme_default.color.secondary.dark
  }
});
var buttonStyleMap = (outline = false) => !outline ? {
  primary: [
    buttonStyles.primaryButton,
    buttonStyles.primaryButtonText
  ],
  secondary: [
    buttonStyles.secondaryButton,
    buttonStyles.secondaryButtonText
  ]
} : {
  primary: [
    buttonStyles.primaryOutlineButton,
    buttonStyles.primaryOutlineButtonText
  ],
  secondary: [
    buttonStyles.secondaryOultineButton,
    buttonStyles.secondaryOutlineButtonText
  ]
};
var _BaseTextInput = import_react4.default.forwardRef((props, textInputRef) => {
  return /* @__PURE__ */ import_react4.default.createElement(import_react_native6.TextInput, __spreadProps(__spreadValues({}, props), {
    ref: textInputRef
  }));
});
var defaultTextLabelColor = "#777";
var TextInput = import_react4.default.forwardRef((props, ref) => {
  const [color, setColor] = import_react4.default.useState(defaultTextLabelColor);
  const onFocus = import_react4.default.useCallback((e) => {
    setColor(theme_default.color.primary.base);
    props.onFocus && props.onFocus(e);
  }, [props.onFocus]);
  const onBlur = import_react4.default.useCallback((e) => {
    setColor(defaultTextLabelColor);
    props.onBlur && props.onBlur(e);
  }, [props.onBlur]);
  return /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, {
    style: [
      { position: "relative", width: "auto", flex: 1 },
      props.containerStyle
    ]
  }, props.label && /* @__PURE__ */ import_react4.default.createElement(Text, {
    font: "bold",
    style: {
      zIndex: 10,
      position: "absolute",
      top: 0,
      left: 0,
      marginLeft: 8,
      paddingHorizontal: 4,
      marginTop: 8,
      color
    }
  }, props.label), /* @__PURE__ */ import_react4.default.createElement(import_react_native6.TextInput, __spreadProps(__spreadValues({}, props), {
    onFocus,
    ref,
    onBlur,
    testID: props.testID,
    style: [
      defaults.textInput,
      props.label !== void 0 ? textStyles.labeled : {},
      { borderColor: color },
      props.style
    ]
  })));
});
var textStyles = import_react_native5.StyleSheet.create({
  labeled: {
    paddingTop: 18
  }
});
var SearchInput = import_react4.default.forwardRef((props, textInputRef) => {
  const [borderColor, setBorderColor] = import_react4.default.useState(defaultTextLabelColor);
  const [focus, setFocus] = import_react4.default.useState(false);
  const [placeholder, setPlaceHolder] = import_react4.default.useState(void 0);
  import_react4.default.useEffect(() => {
    setBorderColor(focus ? theme_default.color.primary.base : defaultTextLabelColor);
    setPlaceHolder(focus ? "clear" : void 0);
  }, [focus]);
  const sideButtonAction = import_react4.default.useCallback(() => {
    if (placeholder === "clear") {
      props.onClearSearch && props.onClearSearch();
    }
  }, [focus, props.onClearSearch, placeholder]);
  const onFocus = import_react4.default.useCallback((e) => {
    setFocus(true);
    props.onFocus && props.onFocus(e);
  }, []);
  const onBlur = import_react4.default.useCallback((e) => {
    setFocus(false);
    props.onBlur && props.onBlur(e);
  }, []);
  return /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  }, /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: borderColor
    }
  }, /* @__PURE__ */ import_react4.default.createElement(SearchIcon, {
    width: 20,
    height: 20,
    style: {
      color: theme_default.color.secondary.dark,
      padding: 4
    }
  }), /* @__PURE__ */ import_react4.default.createElement(_BaseTextInput, __spreadProps(__spreadValues({}, props), {
    testID: `search-input${props.testID !== void 0 ? "-" + props.testID : ""}`,
    ref: textInputRef,
    onFocus,
    onBlur,
    placeholder: props.placeholder || "Search",
    style: [
      defaults.searchTextInput,
      { paddingLeft: 10 },
      props.style
    ]
  }))), /* @__PURE__ */ import_react4.default.createElement(RevealContent, {
    show: placeholder !== void 0
  }, /* @__PURE__ */ import_react4.default.createElement(import_react_native5.Pressable, {
    style: { alignSelf: "flex-start" },
    onPress: sideButtonAction,
    testID: `search-input-clear${props.testID !== void 0 ? "-" + props.testID : ""}`
  }, placeholder === "clear" ? /* @__PURE__ */ import_react4.default.createElement(XIcon, {
    width: 20,
    height: 20,
    style: { color: theme_default.color.primary.dark }
  }) : null)));
});
var VariableTextInput = import_react4.default.forwardRef((_a, ref) => {
  var _b = _a, {
    options,
    wrapperStyle,
    textInputStyle,
    pickerStyle,
    pickerItemStyle,
    pickerItemOptionProps,
    value,
    onChangeValue
  } = _b, props = __objRest(_b, [
    "options",
    "wrapperStyle",
    "textInputStyle",
    "pickerStyle",
    "pickerItemStyle",
    "pickerItemOptionProps",
    "value",
    "onChangeValue"
  ]);
  const [data, set] = (0, import_react4.useState)(() => value || { input: void 0, option: options[0].value });
  const changeText = import_react4.default.useCallback((text) => set((s) => (0, import_immer.default)(s, (df) => {
    df["input"] = text;
    return df;
  })), [set]);
  const changeOption = import_react4.default.useCallback((item, ix) => set((s) => (0, import_immer.default)(s, (df) => {
    df["option"] = item;
    return df;
  })), [set]);
  import_react4.default.useEffect(() => onChangeValue && onChangeValue(data), [data, onChangeValue]);
  return /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, {
    style: [
      {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 2
      },
      wrapperStyle
    ]
  }, /* @__PURE__ */ import_react4.default.createElement(_BaseTextInput, __spreadProps(__spreadValues({}, props), {
    ref,
    value: data.input,
    onChangeText: changeText,
    testID: `${props.testID}-text-input`,
    style: [layoutStyle.input, fontStyle.normal, { flex: 1 }]
  })), /* @__PURE__ */ import_react4.default.createElement(import_picker.Picker, {
    style: [
      { flex: 0.6, borderRadius: 100 },
      fontStyle.normal,
      pickerStyle
    ],
    testID: `${props.testID}-picker`,
    itemStyle: [
      { backgroundColor: "pink" },
      fontStyle.normal,
      pickerItemStyle
    ],
    selectedValue: data.option,
    onValueChange: changeOption
  }, options.map((s, ix) => /* @__PURE__ */ import_react4.default.createElement(import_picker.Picker.Item, __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, pickerItemOptionProps), {
    style: [fontStyle.normal, {}],
    key: s.value || ix
  }), s), {
    testID: `${props.testID}-picker-item-${ix + 1}`
  })))));
});
var fontStyle = import_react_native5.StyleSheet.create({
  normal: {
    fontFamily: "AvenirLTStd-Roman"
  }
});
var layoutStyle = import_react_native5.StyleSheet.create({
  input: {
    padding: 6,
    paddingHorizontal: 10,
    margin: 2
  }
});
var defaults = import_react_native5.StyleSheet.create({
  textInput: __spreadProps(__spreadValues({}, layoutStyle.input), {
    fontFamily: "AvenirLTStd-Roman",
    borderWidth: 1,
    borderRadius: 2
  }),
  searchTextInput: {
    padding: 6,
    paddingHorizontal: 10,
    paddingLeft: 0,
    margin: 2,
    fontFamily: "AvenirLTStd-Roman",
    fontSize: 16,
    flex: 1
  },
  button: {
    padding: 8,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderRadius: 40,
    elevation: 1
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18
  }
});
function MultiInput(_a) {
  var _b = _a, {
    title,
    fields,
    configuration = {},
    initialValue = {},
    onChangeValue,
    optionsText = "Options to show",
    component: HouseComponent
  } = _b, props = __objRest(_b, [
    "title",
    "fields",
    "configuration",
    "initialValue",
    "onChangeValue",
    "optionsText",
    "component"
  ]);
  const config = import_react4.default.useMemo(() => normalizeConifiguration(fields, configuration), [fields, configuration]);
  const [data, set] = (0, import_react4.useState)(initialValue);
  const [visible, setVisible] = (0, import_react4.useState)(() => {
    const t = {};
    fields.forEach((f) => {
      const s = config[f.name];
      t[f.name] = s.required ? true : s.show;
    });
    return t;
  });
  const [modalVisible, setModalVisible] = (0, import_react4.useState)(false);
  import_react4.default.useEffect(() => {
    onChangeValue && onChangeValue(data);
  }, [data, onChangeValue]);
  const onChangeComponentValue = import_react4.default.useCallback((name) => (value) => {
    set((s) => (0, import_immer.default)(s, (df) => {
      df[name] = value;
      return df;
    }));
  }, [set]);
  return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, /* @__PURE__ */ import_react4.default.createElement(import_react_native4.Modal, {
    animationType: "fade",
    transparent: true,
    visible: modalVisible,
    onRequestClose: () => setModalVisible(false)
  }, /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, {
    testID: `${props.testID}-modal-view`,
    style: multiInputStyles.centeredView
  }, /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, {
    style: multiInputStyles.modalView
  }, /* @__PURE__ */ import_react4.default.createElement(Text, {
    font: "bold",
    style: { textTransform: "uppercase" }
  }, optionsText), /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, {
    style: {
      flexDirection: "row",
      flexWrap: "wrap",
      display: "flex"
    }
  }, fields.map(({ name, label }, ix) => {
    return /* @__PURE__ */ import_react4.default.createElement(SelectableChip, {
      testID: `${props.testID}-item-option`,
      style: { margin: 4 },
      selected: visible[name],
      key: `${name}-${ix}`,
      text: label,
      onChange: () => {
        if (!config[name].required) {
          setVisible((s) => (0, import_immer.default)(s, (df) => {
            df[name] = !s[name];
          }));
        }
      }
    });
  })), /* @__PURE__ */ import_react4.default.createElement(Button, {
    title: "Close",
    testID: `${props.testID}-modal-button`,
    onPress: () => setModalVisible(!modalVisible)
  })))), /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, {
    style: [{ padding: 4, paddingVertical: 10 }, props.style]
  }, /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /* @__PURE__ */ import_react4.default.createElement(Text, {
    font: "bold",
    style: { fontSize: 16 }
  }, title), /* @__PURE__ */ import_react4.default.createElement(import_react_native5.Pressable, {
    testID: `${props.testID}-add-button`,
    android_ripple: { borderless: true, radius: 16 },
    onPress: () => setModalVisible(true),
    style: { padding: 4 }
  }, /* @__PURE__ */ import_react4.default.createElement(PlusIcon, null))), /* @__PURE__ */ import_react4.default.createElement(import_react_native4.View, null, fields.filter((p) => visible[p.name]).map(({ label, name, component: Component }, ix) => /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, {
    key: `${label}-${ix}`
  }, /* @__PURE__ */ import_react4.default.createElement(HouseComponent, {
    label,
    name,
    component: Component,
    value: data[name],
    onChangeValue: onChangeComponentValue(name)
  }))))));
}
function normalizeConifiguration(fields, configuration) {
  const s = {};
  fields.map(({ name }) => {
    const { required = false, show = false } = configuration[name] || {};
    s[name] = { required, show };
  });
  return s;
}
var multiInputStyles = import_react_native5.StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.2)"
  },
  modalView: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 2,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

// src/components/pressable.tsx
var import_react5 = __toESM(require("react"));
var import_react_native7 = require("react-native");
function Pressable4(_a) {
  var _b = _a, { ripple_color } = _b, props = __objRest(_b, ["ripple_color"]);
  return /* @__PURE__ */ import_react5.default.createElement(import_react_native7.Pressable, __spreadProps(__spreadValues({
    android_ripple: {
      color: ripple_color || "#00000055",
      radius: 1e3
    },
    hitSlop: 8
  }, props), {
    style: [
      pressableStyle.container,
      pressableStyle.button,
      props.style || {}
    ]
  }));
}
var pressableStyle = import_react_native7.StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  button: {
    borderRadius: 16,
    padding: 4,
    paddingHorizontal: 6
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AltLayout,
  Button,
  Chip,
  Heading,
  Layout,
  MultiInput,
  Pressable,
  RevealContent,
  SearchInput,
  SectionedSelect,
  SelectableChip,
  Text,
  TextInput,
  VariableTextInput,
  View,
  _BaseButton,
  _BaseTextInput,
  buttonStyleMap,
  buttonStyles,
  chipStyles,
  defaults,
  fontStyle,
  iconToggle,
  layoutStyle,
  multiInputStyles,
  normalizeConifiguration,
  pressableStyle,
  textStyles
});
