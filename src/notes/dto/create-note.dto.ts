import { NoteType } from "src/notes/types/types";
import { IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CATEGORY_VALUES } from "../constants/constants";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    readonly name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    readonly content: string;
    @ApiProperty({ enum: CATEGORY_VALUES, required: false })
    @IsNotEmpty()
    @IsString()
    @IsIn(CATEGORY_VALUES)
    readonly category: NoteType["category"];
}
