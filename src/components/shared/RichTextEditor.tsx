import React from 'react';

interface RichTextEditorProps {
 content: string;
  onChange: (html: string) => void;
 placeholder: string;
 className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder, className }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`border rounded-md ${className}`}>
      <textarea
        value={content}
 onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-2 min-h-[200px] outline-none resize-none"
      />
      {/* TODO: Replace this with a real rich text editor library (e.g., React-Quill, TinyMCE, Slate) */}
      {/* This is a basic placeholder implementation using a textarea */}

    </div>
  );
};

export default RichTextEditor;