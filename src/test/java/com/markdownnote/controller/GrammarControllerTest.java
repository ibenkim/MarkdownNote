package com.markdownnote.controller;

import com.markdownnote.model.GrammarCheckRequest;
import com.markdownnote.model.GrammarCheckResponse;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

public class GrammarControllerTest {

    @Test
    public void testCheckGrammar() {
        GrammarController controller = new GrammarController();
        GrammarCheckRequest request = new GrammarCheckRequest();
        request.setText("I has a cat");

        GrammarCheckResponse response = controller.checkGrammar(request);
        List<String> suggestions = response.getSuggestions();

        assertNotNull(suggestions);
        assertTrue(suggestions.size() > 0);
        assertTrue(suggestions.get(0).contains("Consider changing 'I has' to 'I have'"));
    }

    @Test
    public void testCheckGrammarNoErrors() {
        GrammarController controller = new GrammarController();
        GrammarCheckRequest request = new GrammarCheckRequest();
        request.setText("I have a cat");

        GrammarCheckResponse response = controller.checkGrammar(request);
        List<String> suggestions = response.getSuggestions();

        assertNotNull(suggestions);
        assertEquals(0, suggestions.size());
    }
}
