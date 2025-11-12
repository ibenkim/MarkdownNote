import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

// Guide content as its own component
function MarkdownGuide({ onClose }) {
  return (
    <div className="guide-modal">
      <div className="guide-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 style={{ color: '#67e8f9', marginBottom: '1rem' }}>📚 Markdown Cheat Sheet</h2>
        <dl>
          <dt># Header 1</dt>
          <dd>Creates a large header (##, ### for smaller headers)</dd>
          <dt>**bold text**</dt>
          <dd>Bold</dd>
          <dt>*italic text*</dt>
          <dd>Italic</dd>
          <dt>[Link](https://example.com)</dt>
          <dd>Link</dd>
          <dt>- List / * List / + List</dt>
          <dd>Bulleted list</dd>
          <dt>1. First<br />2. Second</dt>
          <dd>Numbered list</dd>
          <dt>`code`</dt>
          <dd>Inline code</dd>
          <dt>{'``````'}</dt>
          <dd>Multi-line code block</dd>
          <dt>![Alt Text](url)</dt>
          <dd>Image</dd>
          <dt>&gt; Blockquote</dt>
          <dd>Quote</dd>
        </dl>
      </div>
    </div>
  );
}

function App() {
  const [markdown, setMarkdown] = useState('# Welcome to MarkdownNote!\nStart typing here...');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="App">
      {/* Top right hamburger menu */}
      <div className="hamburger-menu" onClick={() => setMenuOpen((prev) => !prev)}>
        <div></div>
        <div></div>
        <div></div>
        {menuOpen && (
          <div className="dropdown">
            <button onClick={() => { setShowGuide(true); setMenuOpen(false); }}>Guide</button>
          </div>
        )}
      </div>
      <h1 className="fancy-title">MarkdownNote</h1>

      {/* Guide modal */}
      {showGuide && <MarkdownGuide onClose={() => setShowGuide(false)} />}

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
