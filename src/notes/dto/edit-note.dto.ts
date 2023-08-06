import { NoteType } from "src/notes/types/types";
import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { CATEGORY_VALUES } from "../constants/constants";
import { ApiProperty } from "@nestjs/swagger";

export class EditNoteDto {
    @ApiProperty({ example: "Shopping list", description: "Note name" })
    @IsOptional()
    @IsString()
    @MinLength(2)
    readonly name?: string;
    @ApiProperty({ example: "- Bread 23/09/2011", description: "Note content" })
    @IsOptional()
    @IsString()
    @MinLength(2)
    readonly content?: string;
    @ApiProperty({ enum: CATEGORY_VALUES, required: false, example: "Task", description: "Note category" })
    @IsOptional()
    @IsString()
    @IsIn(CATEGORY_VALUES)
    readonly category?: NoteType["category"];
    @ApiProperty({ example: "true", description: "Is the note archived" })
    @IsOptional()
    @IsBoolean()
    readonly isArchived?: boolean;
}
