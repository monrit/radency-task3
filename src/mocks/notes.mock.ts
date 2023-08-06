import { CreateNoteDto } from "src/notes/dto/create-note.dto";
import { NoteType } from "src/notes/types/types";

export const NOTES_MOCK_DATA: Array<CreateNoteDto & Pick<NoteType, "isArchived" | "dates">> = [
    {
        name: "Make beautiful sites",
        category: "Task",
        content: "Notes app",
        dates: [],
        isArchived: false,
    },
    {
        name: "Ineternet",
        category: "Task",
        content: "Top up your balance",
        dates: [],
        isArchived: false,
    },
    {
        name: "Go for a walk",
        category: "Task",
        content: "There is some nice forest near the your town",
        dates: [],
        isArchived: false,
    },
    {
        name: "Buy a second monitor",
        category: "Task",
        content: "IPS 1080p 350 nits 24 inches",
        dates: [],
        isArchived: false,
    },
    {
        name: "I had worked on a team project",
        category: "Random Thought",
        content: "It started 13/02/2022 and ended somewheare near 20/05/2023",
        dates: ["13/02/2022", "20/05/2023"],
        isArchived: false,
    },
    {
        name: "Test task deadline",
        category: "Random Thought",
        content: "07/08/2023",
        dates: ["07/08/2023"],
        isArchived: false,
    },
    {
        name: "Wash car with body shampoo",
        category: "Idea",
        content: "Could be the nicest idea ever! Or be the worst one...",
        dates: [],
        isArchived: false,
    },
];