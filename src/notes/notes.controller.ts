import { Controller, Get, Delete, Post, Patch, Param, Body } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { StatsType } from "src/notes/types/types";
import { EditNoteDto } from "./dto/edit-note.dto";
import { Note } from "./models/notes.model";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("notes")
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @ApiOperation({ summary: "Get all notes`" })
    @ApiResponse({ status: 200, type: [Note] })
    @Get()
    getNotes(): Promise<Note[]> {
        return this.notesService.getNotes();
    }

    @ApiOperation({ summary: "Get stats" })
    @ApiResponse({ status: 200, type: StatsType })
    @Get("/stats")
    getStats(): Promise<StatsType> {
        return this.notesService.getStats();
    }

    @ApiOperation({ summary: "Get note by ID" })
    @ApiResponse({ status: 201, type: Note })
    @Get(":id")
    getNote(@Param("id") id: string): Promise<Note | null> {
        return this.notesService.getNote(Number(id));
    }
    @ApiOperation({ summary: "Delete note by ID" })
    @ApiResponse({ status: 200, type: Note })
    @Delete(":id")
    deleteNote(@Param("id") id: string): Promise<Note | null> {
        return this.notesService.deleteNote(Number(id));
    }

    @ApiOperation({ summary: "Create note" })
    @ApiResponse({ status: 200, type: Note })
    @Post()
    addNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
        return this.notesService.addNote(createNoteDto);
    }

    @ApiOperation({ summary: "Edit note by ID" })
    @ApiResponse({ status: 200, type: Note })
    @Patch(":id")
    editNote(@Param("id") id: string, @Body() editNoteDto: EditNoteDto): Promise<Note | null> {
        return this.notesService.editNote({ id: Number(id), ...editNoteDto });
    }
}
