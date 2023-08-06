import { ApiProperty } from "@nestjs/swagger";

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

export class StatsType {
    @ApiProperty()
    task: StatType;

    @ApiProperty()
    randomThought: StatType;

    @ApiProperty()
    idea: StatType;
}
