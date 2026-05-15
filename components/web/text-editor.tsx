"use client";
import { useEditor, EditorContent, Editor, useEditorState } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
  });

  return (
    <>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  );
};

export default Tiptap;

const Toolbar=({ editor }: { editor: Editor }) =>{
    const editorState = useEditorState({editor,selector:(ctx)=>{
        return{
            isBold:ctx.editor.isActive("bold") ?? false
        }
    }})
  return (
    <>
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={!editorState.canBold}
      className={editorState.isBold ? "is-active" : ""}
    >
    Bold
  </button>
  </>
  )
}
