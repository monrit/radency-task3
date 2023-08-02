export const parseDates = (text: string): Array<string> => {
    const regEx = /\d{2}\/\d{2}\/\d{4}/g;
    
    const result = text.match(regEx);

    return result ? result: [];
};