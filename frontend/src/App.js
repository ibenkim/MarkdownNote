import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './App.css';

// Markdown Guide Modal Component
function MarkdownGuide({ onClose }) {
  return (
    <div className="guide-modal">
      <div className="guide-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 className="guide-title">📚 Markdown & Symbols Guide</h2>
        <div className="guide-scroll">
          <div className="guide-section">
            <h3>Basic Markdown</h3>
            <dl>
              <dt># Header 1</dt><dd>Large header</dd>
              <dt>## Header 2</dt><dd>Medium header</dd>
              <dt>**bold**</dt><dd>Bold text</dd>
              <dt>*italic*</dt><dd>Italic text</dd>
              <dt>[Link](url)</dt><dd>Hyperlink</dd>
              <dt>![Alt](url)</dt><dd>Image</dd>
              <dt>- Item</dt><dd>List item</dd>
              <dt>1. Item</dt><dd>Numbered item</dd>
              <dt>`code`</dt><dd>Inline code</dd>
              <dt>```js...```</dt><dd>Code block</dd>
              <dt>&gt; Quote</dt><dd>Blockquote</dd>
              <dt>---</dt><dd>Horizontal rule</dd>
            </dl>
          </div>
          <div className="guide-section">
            <h3>Scientific Symbols</h3>
            <p className="guide-note">Type <code>;[name]</code> to insert symbol</p>
            <dl className="symbol-grid">
              <dt>;[alpha]</dt><dd>$\alpha$</dd>
              <dt>;[beta]</dt><dd>$\beta$</dd>
              <dt>;[gamma]</dt><dd>$\gamma$</dd>
              <dt>;[delta]</dt><dd>$\delta$</dd>
              <dt>;[pi]</dt><dd>$\pi$</dd>
              <dt>;[sigma]</dt><dd>$\sigma$</dd>
              <dt>;[theta]</dt><dd>$\theta$</dd>
              <dt>;[omega]</dt><dd>$\omega$</dd>
              <dt>;[infinity]</dt><dd>$\infty$</dd>
              <dt>;[sum]</dt><dd>$\sum$</dd>
              <dt>;[prod]</dt><dd>$\prod$</dd>
              <dt>;[int]</dt><dd>$\int$</dd>
              <dt>;[approx]</dt><dd>$\approx$</dd>
              <dt>;[neq]</dt><dd>$\neq$</dd>
              <dt>;[leq]</dt><dd>$\leq$</dd>
              <dt>;[geq]</dt><dd>$\geq$</dd>
              <dt>;[pm]</dt><dd>$\pm$</dd>
              <dt>;[partial]</dt><dd>$\partial$</dd>
              <dt>;[nabla]</dt><dd>$\nabla$</dd>
              <dt>;[sqrt]</dt><dd>$\sqrt{x}$</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  // Load from localStorage or use default
  const [markdown, setMarkdown] = useState(() => {
    const saved = localStorage.getItem('markdown-content');
    return saved || '# Welcome to MarkdownNote!\nStart typing here...\n\nTry scientific symbols: ;[alpha] becomes $\\alpha$';
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Save to localStorage whenever markdown changes
  useEffect(() => {
    localStorage.setItem('markdown-content', markdown);
  }, [markdown]);

  // Scientific symbol replacement map
  const symbolMap = {
    ';[alpha]': '$\\alpha$',
    ';[beta]': '$\\beta$',
    ';[gamma]': '$\\gamma$',
    ';[delta]': '$\\delta$',
    ';[pi]': '$\\pi$',
    ';[sigma]': '$\\sigma$',
    ';[theta]': '$\\theta$',
    ';[omega]': '$\\omega$',
    ';[infinity]': '$\\infty$',
    ';[sum]': '$\\sum$',
    ';[prod]': '$\\prod$',
    ';[int]': '$\\int$',
    ';[approx]': '$\\approx$',
    ';[neq]': '$\\neq$',
    ';[leq]': '$\\leq$',
    ';[geq]': '$\\geq$',
    ';[pm]': '$\\pm$',
    ';[partial]': '$\\partial$',
    ';[nabla]': '$\\nabla$',
    ';[sqrt]': '$\\sqrt{}$',
  };

  const handleMarkdownChange = (e) => {
    let newValue = e.target.value;

    // Check for symbol shortcuts
    Object.keys(symbolMap).forEach(key => {
      if (newValue.includes(key)) {
        newValue = newValue.replace(key, symbolMap[key]);
      }
    });

    setMarkdown(newValue);
  };

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = "note.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkdown(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleGrammarCheck = async () => {
    try {
      const response = await fetch('/api/grammar/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: markdown }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Grammar Check Results:\n${data.suggestions.join('\n') || 'No issues found!'}`);
      } else {
        alert('Failed to check grammar. Backend might be down.');
      }
    } catch (error) {
      console.error('Error checking grammar:', error);
      alert('Error checking grammar. Please try again.');
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="fancy-title">MarkdownNote</h1>
        <div className="actions">
          <label className="action-btn import-btn">
            Import
            <input type="file" accept=".md" onChange={handleImport} style={{ display: 'none' }} />
          </label>
          <button className="action-btn" onClick={handleExport}>Export</button>
          <button className="action-btn" onClick={handleGrammarCheck}>Check Grammar</button>
        </div>
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
          onChange={handleMarkdownChange}
          placeholder="Type your markdown here..."
        />
        <div className="markdown-preview">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;
