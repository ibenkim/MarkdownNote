package com.markdownnote.model;

import java.util.List;

public class GrammarCheckResponse {
    private List<String> suggestions;

    public GrammarCheckResponse(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }
}
