
function toString(date: Date): string {
    return date?.toISOString().replace(/T/, ' at ').replace(/\..+/, '');
}

export const dateUtils = Object.freeze({
    toString
})