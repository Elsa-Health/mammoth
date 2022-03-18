declare function build<T extends string, U = string>(c: {
    [k in T]: string;
}): {
    id: T;
    name: string;
}[];
declare function buildObject<T extends string, U = object>(c: {
    [k in T]: U;
}): Array<{
    id: T;
} & U>;

export { build, buildObject };
