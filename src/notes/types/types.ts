export type NoteType = {
    id: number;
    name: string;
    created: number;
    category: "Task" | "Random Thought" | "Idea";
    content: string;
    dates: string[];
    isArchived: boolean;
};

export type StatType = {
    active: number;
    archived: number;
};

export type StatsType = {
    task: StatType;
    randomThought: StatType;
    idea: StatType;
};
