package com.markdownnote.controller;

import com.markdownnote.model.Note;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final Map<Long, Note> notes = new HashMap<>();
    private final AtomicLong counter = new AtomicLong();

    @GetMapping
    public Collection<Note> getAllNotes() {
        return notes.values();
    }

    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id) {
        return notes.get(id);
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        Long id = counter.incrementAndGet();
        note.setId(id);
        notes.put(id, note);
        return note;
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note note) {
        note.setId(id);
        notes.put(id, note);
        return note;
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        notes.remove(id);
    }
}
