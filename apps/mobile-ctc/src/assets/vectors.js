import React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {render} from '@testing-library/react-native';

export function ElsaIcon(props) {
  return (
    <Svg
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M25 6.855v12.37H7.58c-1 0-1.82-.82-1.82-1.819v-5.915h2.16v5.296c0 .14.12.28.28.28h14.66V7.013A4.863 4.863 0 0018 2.158H0V0h18.14C21.92 0 25 3.078 25 6.855z"
        fill="#000"
      />
      <Path
        d="M0 18.125V5.755h17.42c1 0 1.82.82 1.82 1.819v5.915h-2.16V8.193c0-.16-.12-.28-.28-.28H2.16v10.073a4.863 4.863 0 004.86 4.856H25V25H6.86C3.08 24.98 0 21.902 0 18.125z"
        fill="#000"
      />
    </Svg>
  );
}

export const ElsaColorableIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        stroke="none"
        viewBox="0 0 25 25"
        fill="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          d="M25 6.855v12.37H7.58c-1 0-1.82-.82-1.82-1.819v-5.915h2.16v5.296c0 .14.12.28.28.28h14.66V7.013A4.863 4.863 0 0018 2.158H0V0h18.14C21.92 0 25 3.078 25 6.855z"
          fill="currentColor"
        />
        <Path
          d="M0 18.125V5.755h17.42c1 0 1.82.82 1.82 1.819v5.915h-2.16V8.193c0-.16-.12-.28-.28-.28H2.16v10.073a4.863 4.863 0 004.86 4.856H25V25H6.86C3.08 24.98 0 21.902 0 18.125z"
          fill="currentColor"
        />
      </Svg>
    );
  }),
);

export const ArrowBackIcon = React.memo(props => {
  return (
    <Svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
      style={[{color: '#000'}, props.style]}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </Svg>
  );
});

export const PlusIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </Svg>
    );
  }),
);

export const XIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </Svg>
    );
  }),
);

export const SearchIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </Svg>
    );
  }),
);

export const NextIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </Svg>
    );
  }),
);

export const PreviousIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </Svg>
    );
  }),
);

export const MenuIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </Svg>
    );
  }),
);

export const TrashIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </Svg>
    );
  }),
);

export const CheckIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </Svg>
    );
  }),
);

export const CheckCircleIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </Svg>
    );
  }),
);

export const EyeIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </Svg>
    );
  }),
);

export const XCircleIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </Svg>
    );
  }),
);

export const MenuAltIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8h16M4 16h16"
        />
      </Svg>
    );
  }),
);

export const SettingsIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </Svg>
    );
  }),
);

export const ArchiveIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </Svg>
    );
  }),
);

export const ChevronDownIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </Svg>
    );
  }),
);

export const ExclamationIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </Svg>
    );
  }),
);

export const InformationIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        stroke="none"
        viewBox="0 0 24 24"
        fill="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2v-3a1 1 0 0 0-1-1H9z"
          clipRule="evenodd"
        />
      </Svg>
    );
  }),
);

export const LibraryIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        stroke="none"
        viewBox="0 0 24 24"
        fill="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          fillRule="evenodd"
          d="M10.496 2.132a1 1 0 0 0-.992 0l-7 4A1 1 0 0 0 3 8v7a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2V8a1 1 0 0 0 .496-1.868l-7-4zM6 9a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1zm3 1a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0v-3zm5-1a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1z"
          clipRule="evenodd"
        />
      </Svg>
    );
  }),
);

export const PencilAltIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </Svg>
    );
  }),
);

export const ArrowDownIcon = React.memo(
  React.forwardRef((props, svgRef) => {
    return (
      <Svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ref={svgRef}
        {...props}
        style={[{color: '#000'}, props.style]}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m19 14-7 7m0 0-7-7m7 7V3"
        />
      </Svg>
    );
  }),
);
