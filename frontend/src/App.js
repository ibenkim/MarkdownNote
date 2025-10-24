import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('# Welcome to MarkdownNote!\nStart typing your markdown note here...');

  return (
    <div className="App">
      <h1 className="fancy-title">✨ MarkdownNote ✨</h1>
      <div className="editor-container">
        <textarea
          className="markdown-editor"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
        <div className="markdown-preview">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;

