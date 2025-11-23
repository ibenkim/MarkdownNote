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
        <h2 className="guide-title">📚 Markdown Cheat Sheet</h2>
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
          <dt>;[alpha]</dt>
          <dd>Inserts $\alpha$ (Scientific Symbol)</dd>
        </dl>
      </div>
    </div>
  );
}

function App() {
  const [markdown, setMarkdown] = useState('# Welcome to MarkdownNote!\nStart typing here...\n\nTry scientific symbols: ;[alpha] becomes $\\alpha$');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

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
    const file = new Blob([markdown], {type: 'text/markdown'});
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
                <input type="file" accept=".md" onChange={handleImport} style={{display: 'none'}} />
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
