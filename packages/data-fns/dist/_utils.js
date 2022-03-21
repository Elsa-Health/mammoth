export function build(c) {
    return Object.entries(c)
        .map(c => {
        const [id, name] = c;
        return { id, name };
    })
        .sort((a, b) => a.name.localeCompare(b.name));
}
export function buildObject(c) {
    return Object.entries(c)
        .map(c => {
        const [id, obj] = c;
        return { ...obj, id };
    })
        .sort((a, b) => a.id.localeCompare(b.id));
}
