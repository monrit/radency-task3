import { NoteType } from "src/notes/types/types";
import { IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CATEGORY_VALUES } from "../constants/constants";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto {
    @ApiProperty({ example: "Shopping list", description: "Note name" })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    readonly name: string;
    @ApiProperty({ example: "- Bread 23/09/2011", description: "Note content" })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    readonly content: string;
    @ApiProperty({ enum: CATEGORY_VALUES, required: true, example: "Task", description: "Note category" })
    @IsNotEmpty()
    @IsString()
    @IsIn(CATEGORY_VALUES)
    readonly category: NoteType["category"];
}
