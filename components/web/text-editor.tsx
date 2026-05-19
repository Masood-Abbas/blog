"use client";

import { useState } from "react";

import {
  Editor,
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  Link2,
  Unlink,
} from "lucide-react";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },

        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),

      UnderlineExtension,

      Highlight,

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],

    content: `
      <h2>Hello World!</h2>

      <p>
        Select text and add formatting.
      </p>
    `,

    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base max-w-none focus:outline-none",
      },
    },

    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="
          border
          rounded-md
          min-h-62.5
          p-4
          mt-4
          prose
          dark:prose-invert
          max-w-none

          [&_ul]:list-disc
          [&_ul]:ml-6

          [&_ol]:list-decimal
          [&_ol]:ml-6

          [&_blockquote]:border-l-4
          [&_blockquote]:pl-4
          [&_blockquote]:italic

          [&_a]:text-blue-500
          [&_a]:underline
        "
      />
    </div>
  );
};

export default Tiptap;

const Toolbar = ({ editor }: { editor: Editor }) => {
  const [url, setUrl] = useState("");

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
      isLink: ctx.editor.isActive("link"),
    }),
  });

  const addLink = () => {
    if (!url) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();

    setUrl("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded-md p-2">
      {/* Bold */}
      <Toggle
        pressed={editorState.isBold}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      {/* Italic */}
      <Toggle
        pressed={editorState.isItalic}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      {/* Underline */}
      <Toggle
        pressed={editorState.isUnderline}
        onPressedChange={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      {/* Strike */}
      <Toggle
        pressed={editorState.isStrike}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      {/* Code */}
      <Toggle
        pressed={editorState.isCode}
        onPressedChange={() => {
          editor.chain().focus().toggleCode().run();
        }}
      >
        <Code className="h-4 w-4" />
      </Toggle>

      {/* Highlight */}
      <Toggle
        pressed={editorState.isHighlight}
        onPressedChange={() => {
          editor.chain().focus().toggleHighlight().run();
        }}
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>

      {/* Bullet List */}
      <Toggle
        pressed={editorState.isBulletList}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="h-4 w-4" />
      </Toggle>

      {/* Ordered List */}
      <Toggle
        pressed={editorState.isOrderedList}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      {/* Blockquote */}
      <Toggle
        pressed={editorState.isBlockquote}
        onPressedChange={() => {
          editor.chain().focus().toggleBlockquote().run();
        }}
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      {/* Link / Unlink */}
      {editorState.isLink ? (
        <Toggle
          pressed
          onPressedChange={() => {
            editor.chain().focus().unsetLink().run();
          }}
        >
          <Unlink className="h-4 w-4" />
        </Toggle>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Toggle pressed={false}>
              <Link2 className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>

          <PopoverContent className="w-80">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Add Link</h4>

              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <Button
                type="button"
                className="w-full"
                onClick={addLink}
              >
                Add Link
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};