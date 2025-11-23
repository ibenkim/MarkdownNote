package com.markdownnote.controller;

import com.markdownnote.model.GrammarCheckRequest;
import com.markdownnote.model.GrammarCheckResponse;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/grammar")
@CrossOrigin(origins = "http://localhost:3000")
public class GrammarController {

    @PostMapping("/check")
    public GrammarCheckResponse checkGrammar(@RequestBody GrammarCheckRequest request) {
        String text = request.getText();
        List<String> suggestions = new ArrayList<>();

        if (text == null || text.isEmpty()) {
            return new GrammarCheckResponse(suggestions);
        }

        // Basic rule-based checks
        if (text.contains("I has")) {
            suggestions.add("Consider changing 'I has' to 'I have'.");
        }
        if (text.contains(" their is ")) {
            suggestions.add("Did you mean 'there is'?");
        }
        if (text.contains(" its a ")) {
            suggestions.add("Did you mean 'it's a'?");
        }
        if (text.contains(" alot ")) {
            suggestions.add("'alot' is not a word. Did you mean 'a lot'?");
        }

        // Add more rules or integrate with a library here

        return new GrammarCheckResponse(suggestions);
    }
}
