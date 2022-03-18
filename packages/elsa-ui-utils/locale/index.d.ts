import React from 'react';
import { InitOptions } from 'i18next';

declare const LanguageProvider: ({ options, children, }: {
    options?: InitOptions | undefined;
    children: React.ReactNode;
}) => JSX.Element;

export { LanguageProvider };
