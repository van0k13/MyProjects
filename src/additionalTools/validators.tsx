export const requiredField = (value: any) => {
    if(value) return undefined;

    return 'Field is required';
}


export const maxLengthCreator = (maxLength: number) => (value: any) => {
    if(value.length > maxLength) return `max length is ${maxLength} symbols`;

    return undefined;
}