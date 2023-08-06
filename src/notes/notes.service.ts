import { Injectable, NotFoundException } from "@nestjs/common";
import { StatType, StatsType } from "src/notes/types/types";
import { CreateNoteDto } from "./dto/create-note.dto";
import { parseDates } from "src/notes/utils/parseDates";
import { EditNoteDto } from "./dto/edit-note.dto";
import { CATEGORY_VALUES } from "./constants/constants";
import { Note } from "./models/notes.model";
import { InjectModel } from "@nestjs/sequelize";
import { NOTES_MOCK_DATA } from "src/mocks/notes.mock";
@Injectable()
export class NotesService {
    constructor(@InjectModel(Note) private noteRepository: typeof Note) {
        this.initializeDatabase();
    }

    private async initializeDatabase() {
        const count = await this.noteRepository.count();
        if (count === 0) {
            await this.noteRepository.bulkCreate(NOTES_MOCK_DATA);
        }
    }

    async getNotes(): Promise<Note[]> {
        return await this.noteRepository.findAll();
    }

    async getNote(id: number): Promise<Note | null> {
        const note = await this.noteRepository.findOne({
            where: {
                id,
            },
        });
        if (!note) {
            throw new NotFoundException(`No note found with ID ${id}`);
        }
        return note;
    }

    async getStats(): Promise<StatsType> {
        const values: StatType[] = await Promise.all(
            CATEGORY_VALUES.map(async category => {
                return {
                    active: await this.noteRepository.count({
                        where: {
                            category,
                            isArchived: false,
                        },
                    }),
                    archived: await this.noteRepository.count({
                        where: {
                            category,
                            isArchived: true,
                        },
                    }),
                };
            })
        );
        return {
            task: values[0],
            randomThought: values[1],
            idea: values[2],
        };
    }

    async deleteNote(id: number): Promise<Note | null> {
        const note = await this.getNote(id);

        if (note) {
            await note.destroy();
        }

        return note;
    }

    async addNote(payload: CreateNoteDto): Promise<Note> {
        const note = await this.noteRepository.create({
            ...payload,
            isArchived: false,
            dates: parseDates(payload.content),
        });

        return note;
    }

    async editNote(payload: EditNoteDto & { id: number }) {
        const note = await this.getNote(payload.id);

        if (note) {
            await note.update({
                ...payload,
                dates: payload.content ? parseDates(payload.content): note.dates,
            });
        }

        return note;
    }
}
