import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, Table, DataType } from "sequelize-typescript";
import { CreateNoteDto } from "../dto/create-note.dto";
import { NoteType } from "../types/types";

@Table({ tableName: "notes" })
export class Note extends Model<Note, CreateNoteDto & Pick<NoteType, "dates" | "isArchived">> {
    toJSON() {
        const object = this.get();

        delete object.updatedAt;

        return object;
    }

    @ApiProperty({ example: "1", description: "Note ID" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "Shopping list", description: "Note name" })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: "Task", description: "Note category" })
    @Column({ type: DataType.STRING, allowNull: false })
    category: "Task" | "Random Thought" | "Idea";

    @ApiProperty({ example: "- Bread 23/09/2011", description: "Note content" })
    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    @ApiProperty({ example: "['23/09/2011']", description: "Parsed dates from content field" })
    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true, defaultValue: [] })
    dates: string[];

    @ApiProperty({ example: "true", description: "Is the note archived" })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isArchived: boolean;
}
