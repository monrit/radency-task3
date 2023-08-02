import { NoteType } from "src/notes/types/types";
import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { CATEGORY_VALUES } from "../constants/constants";
import { ApiProperty } from "@nestjs/swagger";

export class EditNoteDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(2)
    readonly name?: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(2)
    readonly content?: string;
    @ApiProperty({ enum: CATEGORY_VALUES, required: false })
    @IsOptional()
    @IsString()
    @IsIn(CATEGORY_VALUES)
    readonly category?: NoteType["category"];
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    readonly isArchived?: boolean;
}
