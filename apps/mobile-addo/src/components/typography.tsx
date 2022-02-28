import React from "react";
import styled from "styled-components/native"
import { Text as NativeText } from 'react-native'
import theme from "../theme";

export const Text = styled(NativeText)<{ font?: 'light' | 'normal' | 'medium' | 'bold' | 'black' | 'extra-black', italic?: boolean }>`
    color: #000;
    font-family: ${theme.typography.fontFamilyStyle};
    font-style: normal;
    font-size: 16px;
`

export const Heading = styled(Text)`
    font-size: 20px;
`
