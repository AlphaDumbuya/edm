'use client';

import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaCode,
  FaQuoteLeft,
  FaLink,
  FaUnlink,
  FaUndo,
  FaRedo,
} from 'react-icons/fa';

import './TipTapEditor.css';

interface TipTapEditorProps {
  value: string;
  onContentChange: (newContent: string) => void;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ value, onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Image.configure({
        inline: true,
      }),
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'ProseMirror focus:outline-none min-h-[150px]',
      },
    },
  });

  const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const setLink = useCallback(() => {
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('Enter URL:', previousUrl);
      if (url === null) return;
      if (url === '') {
        editor.chain().focus().unsetLink().run();
      } else {
        editor.chain().focus().setLink({ href: url }).run();
      }
    }, [editor]);

    return (
      <div className="MenuBar flex flex-wrap gap-2 p-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
          <FaBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
          <FaItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''}>
          <FaUnderline />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
          H3
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
          <FaListUl />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
          <FaListOl />
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
          <FaCode />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
          <FaQuoteLeft />
        </button>
        <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
          <FaLink />
        </button>
        <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}>
          <FaUnlink />
        </button>
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    );
  };

  return (
    <div className="border rounded-md shadow-sm bg-white dark:bg-gray-800">
      <MenuBar editor={editor} />
      <div className="p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
