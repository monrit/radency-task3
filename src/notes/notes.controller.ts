import { Controller, Get, Delete, Post, Patch, Param, Body } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { NoteType, StatsType } from "src/notes/types/types";
import { EditNoteDto } from "./dto/edit-note.dto";

@Controller("notes")
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Get()
    getNotes(): Array<NoteType> {
        return this.notesService.getNotes();
    }

    @Get("/stats")
    getStats(): StatsType {
        return this.notesService.getStats();
    }
    
    @Get(":id")
    getNote(@Param("id") id: string): NoteType {
        return this.notesService.getNote(Number(id));
    }

    @Delete(":id")
    deleteNote(@Param("id") id: string): NoteType {
        return this.notesService.deleteNote(Number(id));
    }

    @Post()
    addNote(@Body() createNoteDto: CreateNoteDto): NoteType {
        return this.notesService.addNote(createNoteDto);
    }

    @Patch(":id")
    editNote(@Param("id") id: string, @Body() editNoteDto: EditNoteDto): NoteType {
        return this.notesService.editNote({ id: Number(id), ...editNoteDto });
    }
}
