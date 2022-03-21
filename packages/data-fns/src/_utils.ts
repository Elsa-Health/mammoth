
export function build<T extends string, U = string>(c: { [k in T]: string }) {
    return Object.entries(c)
        .map(c => {
            const [id, name] = c as [T, string]
            return { id, name }
        })
        .sort((a, b) => a.name.localeCompare(b.name))
}

export function buildObject<T extends string, U = object>(c: { [k in T]: U }): Array<{ id: T } & U> {
    return Object.entries(c)
        .map(c => {
            const [id, obj] = c as [T, U]
            return { ...obj, id }
        })
        .sort((a, b) => a.id.localeCompare(b.id))
}
