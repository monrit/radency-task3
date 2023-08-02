import { NoteType } from "../types/types";

export const countByCategory = (
    initialData: NoteType[],
    category: NoteType["category"],
    isArchived: boolean
): number => {
    return initialData.reduce((accum, value) => {
        if (value.category === category && value.isArchived === isArchived) {
            return accum + 1;
        } else {
            return accum;
        }
    }, 0);
};