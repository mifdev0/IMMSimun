'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import { Bold, Italic, Heading2, List, ListOrdered, Quote, Undo, Redo, ImageIcon, Link2 } from 'lucide-react'
import { useRef } from 'react'

interface Props {
  content: string
  onChange: (html: string) => void
}

export default function RichEditor({ content, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      LinkExtension.configure({ openOnClick: false }),
    ],
    content: content || '<p></p>',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) editor.chain().focus().setImage({ src: reader.result as string }).run()
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const addLink = () => {
    const url = prompt('Masukkan URL:')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  const ToolBtn = ({ onClick, active, children }: any) => (
    <button type="button" onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${active ? 'bg-[#f97316] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
      {children}
    </button>
  )

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-white">
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          <Heading2 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          <Quote className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={addLink} active={editor.isActive('link')}>
          <Link2 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => fileRef.current?.click()}>
          <ImageIcon className="w-4 h-4" />
        </ToolBtn>
        <input ref={fileRef} type="file" accept="image/*" onChange={addImage} className="hidden" />
        <div className="ml-auto flex gap-1">
          <ToolBtn onClick={() => editor.chain().focus().undo().run()}>
            <Undo className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().redo().run()}>
            <Redo className="w-4 h-4" />
          </ToolBtn>
        </div>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[300px] prose prose-sm max-w-none focus:outline-none" />
    </div>
  )
}
