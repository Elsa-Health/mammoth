var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/components/typography.tsx
var typography_exports = {};
__export(typography_exports, {
  Heading: () => Heading,
  Text: () => Text
});
module.exports = __toCommonJS(typography_exports);
var import_native = __toESM(require("styled-components/native"));
var import_react_native = require("react-native");

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
var theme_default = {
  color: {
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
  },
  typography: {
    fontFamilyStyle,
    sizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "20px",
      xl: "24px",
      "2xl": "28px"
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48
  }
};

// src/components/typography.tsx
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Heading,
  Text
});
