"use client";

import {
  Editor,
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

import { Toggle } from "@/components/ui/toggle";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Highlighter,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, UnderlineExtension, Highlight],

    content: `
      <h2>Hello World!</h2>
      <p>Select text and test toolbar buttons.</p>
    `,

    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="border rounded-md min-h-62.5 p-4 mt-4 prose max-w-none"
      />
    </div>
  );
};

export default Tiptap;

const Toolbar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,

    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isStrike: ctx.editor.isActive("strike"),
      isCode: ctx.editor.isActive("code"),
      isHighlight: ctx.editor.isActive("highlight"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isBlockquote: ctx.editor.isActive("blockquote"),
    }),
  });

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded-md p-2">
      {/* bold */}
      <Toggle
        pressed={editorState.isBold}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      {/* italic */}
      <Toggle
        pressed={editorState.isItalic}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      {/* underline */}
      <Toggle
        pressed={editorState.isUnderline}
        onPressedChange={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      {/* strike */}
      <Toggle
        pressed={editorState.isStrike}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      {/* code */}
      <Toggle
        pressed={editorState.isCode}
        onPressedChange={() => {
          editor.chain().focus().toggleCode().run();
        }}
      >
        <Code className="h-4 w-4" />
      </Toggle>

      {/* highlight */}
      <Toggle
        pressed={editorState.isHighlight}
        onPressedChange={() => {
          editor.chain().focus().toggleHighlight().run();
        }}
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>

      {/* bullet list */}
      <Toggle
        pressed={editorState.isBulletList}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="h-4 w-4" />
      </Toggle>

      {/* ordered list */}
      <Toggle
        pressed={editorState.isOrderedList}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      {/* blockquote */}
      <Toggle
        pressed={editorState.isBlockquote}
        onPressedChange={() => {
          editor.chain().focus().toggleBlockquote().run();
        }}
      >
        <Quote className="h-4 w-4" />
      </Toggle>
    </div>
  );
};
