import { Injectable, NotFoundException } from "@nestjs/common";
import { NoteType, StatType, StatsType } from "src/notes/types/types";
import { CreateNoteDto } from "./dto/create-note.dto";
import { parseDates } from "src/notes/utils/parseDates";
import { EditNoteDto } from "./dto/edit-note.dto";
import { CATEGORY_VALUES } from "./constants/constants";
import { countByCategory } from "./utils/countByCategory";

@Injectable()
export class NotesService {
    private notes: Array<NoteType> = [
        {
            id: 0,
            name: "Make beautiful sites",
            created: 1630890235946,
            category: "Task",
            content: "Notes app",
            dates: [],
            isArchived: false,
        },
        {
            id: 1,
            name: "Ineternet",
            created: 1640890235946,
            category: "Task",
            content: "Top up your balance",
            dates: [],
            isArchived: false,
        },
        {
            id: 2,
            name: "Go for a walk",
            created: 1650890235946,
            category: "Task",
            content: "There is some nice forest near the your town",
            dates: [],
            isArchived: false,
        },
        {
            id: 3,
            name: "Buy a second monitor",
            created: 1660890235946,
            category: "Task",
            content: "IPS 1080p 350 nits 24 inches",
            dates: [],
            isArchived: false,
        },
        {
            id: 4,
            name: "I had worked on a team project",
            created: 1670890235946,
            category: "Random Thought",
            content: "It started 13/02/2022 and ended somewheare near 20/05/2023",
            dates: ["13/02/2022", "20/05/2023"],
            isArchived: false,
        },
        {
            id: 5,
            name: "Test task deadline",
            created: 1680890235946,
            category: "Random Thought",
            content: "07/08/2023",
            dates: ["07/08/2023"],
            isArchived: false,
        },
        {
            id: 6,
            name: "Wash car with body shampoo",
            created: 1690890235946,
            category: "Idea",
            content: "Could be the nicest idea ever! Or be the worst one...",
            dates: [],
            isArchived: false,
        },
    ];

    getNotes(): Array<NoteType> {
        return this.notes;
    }

    getNote(id: number): NoteType {
        const note = this.notes.find(note => note.id === id);
        if (!note) {
            throw new NotFoundException(`No note found with ID ${id}`);
        }
        return note;
    }

    getStats(): StatsType {
        const values: StatType[] = CATEGORY_VALUES.map(category => {
            return {
                active: countByCategory(this.notes, category, false),
                archived: countByCategory(this.notes, category, true),
            };
        });
        return {
            task: values[0],
            randomThought: values[1],
            idea: values[2],
        };
    }

    deleteNote(id: number): NoteType {
        const note = this.getNote(id);
        this.notes = this.notes.filter(note => note.id !== id);
        return note;
    }

    addNote(payload: CreateNoteDto) {
        const note: NoteType = {
            ...payload,
            id: this.notes[this.notes.length - 1].id + 1,
            created: Date.now(),
            isArchived: false,
            dates: parseDates(payload.content),
        };

        this.notes.push(note);

        return note;
    }

    editNote(payload: EditNoteDto & { id: number }) {
        this.notes = this.notes.map(note => {
            if (note.id === payload.id) {
                return {
                    ...note,
                    ...payload,
                    dates: payload.content ? parseDates(payload.content) : note.dates,
                };
            } else {
                return note;
            }
        });

        return this.getNote(payload.id);
    }
}
