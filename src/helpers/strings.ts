export function hexify(number: number, padding=8) {
    return `0x${number.toString(16).toUpperCase().padStart(8, "0")}`
}

export function capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
}
