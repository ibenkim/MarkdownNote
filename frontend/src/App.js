import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('# Welcome to MarkdownNote!\nStart typing here...');

  return (
    <div className="App">
      <h1 className="fancy-title">MarkdownNote</h1>
      <section className="markdown-guide">
        <h2 style={{ color: '#67e8f9', marginBottom: '1rem' }}>📚 Markdown Cheat Sheet</h2>
        <dl>
          <dt># Header 1</dt>
          <dd>Creates large header text (use more # for smaller headers: ##, ###, etc)</dd>

          <dt>**bold text**</dt>
          <dd>Makes text bold</dd>

          <dt>*italic text*</dt>
          <dd>Makes text italic</dd>

          <dt>[Link](https://example.com)</dt>
          <dd>Creates a clickable hyperlink</dd>

          <dt>- Item or * Item or + Item</dt>
          <dd>Creates bulleted list items</dd>

          <dt>1. First<br />2. Second</dt>
          <dd>Creates numbered list</dd>

          <dt>`code`</dt>
          <dd>Displays inline code</dd>

          <dt>``````</dt>
          <dd>Creates multi-line code block</dd>

          <dt>![Alt Text](url)</dt>
          <dd>Displays image</dd>

          <dt>&gt; Blockquote</dt>
          <dd>Shows quoted text</dd>
        </dl>
      </section>
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
