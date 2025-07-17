import React from 'react';
import TipTapEditor from '../TipTapEditor';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder, className }) => {
  return (
    <div className={`border rounded-md ${className}`}>
      <TipTapEditor value={content} onContentChange={onChange} />
    </div>
  );
};

export default RichTextEditor;