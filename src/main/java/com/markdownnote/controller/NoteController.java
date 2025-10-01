package com.markdownnote.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NoteController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Welcome to MarkdownNote!";
    }
}
