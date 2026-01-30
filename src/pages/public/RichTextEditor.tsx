// components/RichTextEditor.tsx
import React, { useState, useEffect, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = "Enter description..." }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    list: 'none' as 'none' | 'ul' | 'ol'
  });

  // Initialize with value
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Handle input changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    updateActiveFormats();
  };

  // Execute formatting commands
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    setTimeout(handleInput, 0);
  };

  // Toggle lists - FIXED: This now works properly
  const toggleList = (type: 'insertUnorderedList' | 'insertOrderedList') => {
    document.execCommand(type);
    editorRef.current?.focus();
    setTimeout(handleInput, 0);
  };

  // Format block (headings, paragraphs)
  const formatBlock = (tag: string) => {
    if (tag === 'p') {
      document.execCommand('formatBlock', false, '<p>');
    } else {
      document.execCommand('formatBlock', false, `<${tag}>`);
    }
    editorRef.current?.focus();
    setTimeout(handleInput, 0);
  };

  // Handle paste to strip HTML
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    handleInput();
  };

  // Handle tab for list indentation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && editorRef.current) {
      e.preventDefault();
      if (e.shiftKey) {
        document.execCommand('outdent', false);
      } else {
        document.execCommand('indent', false);
      }
      handleInput();
    }
  };

  // Update active formatting states
  const updateActiveFormats = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      return;
    }

    const range = selection.getRangeAt(0);
    let element = range.commonAncestorContainer as HTMLElement;
    
    // If text node, get parent element
    if (element.nodeType === Node.TEXT_NODE) {
      element = element.parentElement!;
    }

    const newFormats = {
      bold: false,
      italic: false,
      underline: false,
      list: 'none' as 'none' | 'ul' | 'ol'
    };

    // Check current element and parents
    let currentElement: HTMLElement | null = element;
    while (currentElement && currentElement !== editorRef.current) {
      const tagName = currentElement.tagName.toLowerCase();
      const style = currentElement.style;

      // Check bold
      if (tagName === 'b' || tagName === 'strong' || style.fontWeight === 'bold' || style.fontWeight === '700') {
        newFormats.bold = true;
      }

      // Check italic
      if (tagName === 'i' || tagName === 'em' || style.fontStyle === 'italic') {
        newFormats.italic = true;
      }

      // Check underline
      if (tagName === 'u' || style.textDecoration.includes('underline')) {
        newFormats.underline = true;
      }

      // Check lists
      if (tagName === 'ul' || currentElement.closest('ul')) {
        newFormats.list = 'ul';
      } else if (tagName === 'ol' || currentElement.closest('ol')) {
        newFormats.list = 'ol';
      }

      currentElement = currentElement.parentElement;
    }

    setActiveFormats(newFormats);
  };

  // Clear all formatting
// const clearFormatting = () => {
//   if (!editorRef.current) return;

//   const editor = editorRef.current;

//   // Get plain text (keeps line breaks)
//   const text = editor.innerText;

//   // Reset editor to clean paragraphs
//   editor.innerHTML = text
//     .split('\n')
//     .map(line => `<p>${line || '<br>'}</p>`)
//     .join('');

//   // Reset formats state
//   setActiveFormats({
//     bold: false,
//     italic: false,
//     underline: false,
//     list: 'none',
//   });

//   editor.focus();
//   onChange(editor.innerHTML);
// };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-300">
        {/* Bold */}
        <button
          type="button"
          onClick={() => formatText('bold')}
          className={`p-2 rounded ${activeFormats.bold ? 'bg-[#8FAE8B] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        
        {/* Italic */}
        <button
          type="button"
          onClick={() => formatText('italic')}
          className={`p-2 rounded ${activeFormats.italic ? 'bg-[#8FAE8B] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        
        {/* Underline */}
        <button
          type="button"
          onClick={() => formatText('underline')}
          className={`p-2 rounded ${activeFormats.underline ? 'bg-[#8FAE8B] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1"></div>

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => toggleList('insertUnorderedList')}
          className={`p-2 rounded ${activeFormats.list === 'ul' ? 'bg-[#8FAE8B] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Bullet List"
        >
          ≡
        </button>

        {/* Numbered List */}
        <button
          type="button"
          onClick={() => toggleList('insertOrderedList')}
          className={`p-2 rounded flex items-center ${activeFormats.list === 'ol' ? 'bg-[#8FAE8B] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          title="Numbered List"
        >
          <span>1.</span>
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1"></div>

        {/* Headings/Paragraph */}
        <select
          onChange={(e) => formatBlock(e.target.value)}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="Format"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        {/* Clear Formatting */}
        {/* <button
          type="button"
          onClick={clearFormatting}
          className="ml-auto p-2 text-gray-700 hover:bg-gray-200 rounded"
          title="Clear Formatting"
        >
          Clear
        </button> */}
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        className="min-h-[150px] max-h-[300px] p-3 bg-white outline-none overflow-y-auto rich-text-editor"
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onClick={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        data-placeholder={placeholder}
        style={{
          wordWrap: 'break-word' as const,
          overflowWrap: 'break-word' as const,
          whiteSpace: 'pre-wrap' as const,
          wordBreak: 'break-word' as const,
          minWidth: '0'
        }}
      />
    </div>
  );
};

export default RichTextEditor;