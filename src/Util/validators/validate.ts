export const isEmpty = (value: string | number): string => {
    return String(value).trim().length !== 0 ? '' : `this field is required <br>`
}
export const isEmail = (value: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim()) ? '' : `Email formatted incorrectly <br>`
}
export const isNumber = (age: number | undefined): string => {
    return age !== null && !isNaN(<number>age) ? '' : `Age is required and must be a number <br>`;
}

export const validationPassed = (values: string[]): boolean => {
    for (const value of values) {
        if (value.trim() !== '') return false;
    }
    return true;
}

