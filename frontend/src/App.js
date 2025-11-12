import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

// Markdown Guide Modal Component
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
          <dd>Makes text bold</dd>
          <dt>*italic text*</dt>
          <dd>Makes text italic</dd>
          <dt>[Link](https://example.com)</dt>
          <dd>Creates a clickable hyperlink</dd>
          <dt>- Item / * Item / + Item</dt>
          <dd>Creates bulleted list items</dd>
          <dt>1. First<br />2. Second</dt>
          <dd>Creates numbered list</dd>
          <dt>`code`</dt>
          <dd>Displays inline code</dd>
          <dt>{'``````'}</dt>
          <dd>Creates multi-line code block</dd>
          <dt>![Alt Text](url)</dt>
          <dd>Displays image</dd>
          <dt>&gt; Blockquote</dt>
          <dd>Shows quoted text</dd>
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
      <div className="header">
        <h1 className="fancy-title">MarkdownNote</h1>
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
      </div>

      {/* Guide Modal */}
      {showGuide && <MarkdownGuide onClose={() => setShowGuide(false)} />}

      <div className="editor-container">
        <textarea
          className="markdown-editor"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
        <div className
