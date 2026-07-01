'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { Extension } from '@tiptap/core'
import { useRef, useCallback } from 'react'


import {
  Bold, Italic, Heading2, List, ListOrdered, Quote, Undo, Redo,
  ImageIcon, Link2, AlignLeft, AlignCenter, AlignRight, AlignJustify, Minus, Plus,
} from 'lucide-react'

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return { types: ['textStyle'] }
  },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: { fontSize: { default: null, parseHTML: el => el.style.fontSize?.replace('px', '') || null, renderHTML: attrs => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}px` } : {} } },
    }]
  },
})

interface Props {
  content: string
  onChange: (html: string) => void
}

export default function RichEditor({ content, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({ inline: false }),
      LinkExtension.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'], alignments: ['left', 'center', 'right', 'justify'] }),
      FontSize,
    ],
    content: content || '<p></p>',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  const addImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        editor?.chain().focus().setImage({ src: reader.result as string }).run()
        // set default width 100% after insert
        setTimeout(() => {
          editor?.chain().focus().updateAttributes('image', { width: '100%' }).run()
        }, 50)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [editor])

  const addLink = () => {
    const url = prompt('Masukkan URL:')
    if (url) editor?.chain().focus().setLink({ href: url }).run()
  }

  const adjustImageWidth = (delta: number) => {
    const attrs = editor?.getAttributes('image')
    const current = parseInt(attrs?.width || '100')
    const next = Math.min(100, Math.max(20, current + delta))
    editor?.chain().focus().updateAttributes('image', { width: next + '%' }).run()
  }

  if (!editor) return null

  const isImage = editor.isActive('image')
  const imgWidth = parseInt(editor.getAttributes('image')?.width || '100')
  const fontSize = editor.getAttributes('textStyle')?.fontSize || '16'

  const ToolBtn = ({ onClick, active, children, title }: any) => (
    <button type="button" title={title} onClick={onClick}
      className={`p-1.5 md:p-2 rounded-lg transition-colors ${active ? 'bg-[#f97316] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
      {children}
    </button>
  )

  const Divider = () => <div className="w-px h-5 bg-gray-200 mx-1" />

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-100 bg-white sticky top-0 z-10">
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Tebal">
          <Bold className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Miring">
          <Italic className="w-4 h-4" />
        </ToolBtn>
        <Divider />
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading">
          <Heading2 className="w-4 h-4" />
        </ToolBtn>
        <Divider />
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Rata kiri">
          <AlignLeft className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Rata tengah">
          <AlignCenter className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Rata kanan">
          <AlignRight className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Rata kanan-kiri">
          <AlignJustify className="w-4 h-4" />
        </ToolBtn>
        <Divider />
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="List">
          <List className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbering">
          <ListOrdered className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Kutipan">
          <Quote className="w-4 h-4" />
        </ToolBtn>
        <Divider />
        <ToolBtn onClick={addLink} active={editor.isActive('link')} title="Tautan">
          <Link2 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => fileRef.current?.click()} title="Gambar">
          <ImageIcon className="w-4 h-4" />
        </ToolBtn>

        {isImage && (
          <>
            <Divider />
            <span className="text-[10px] text-gray-400 mx-1">Gambar:</span>
            <ToolBtn onClick={() => adjustImageWidth(-10)} title="Kecilkan">
              <Minus className="w-4 h-4" />
            </ToolBtn>
            <span className="text-xs text-gray-500 w-8 text-center">{imgWidth}%</span>
            <ToolBtn onClick={() => adjustImageWidth(10)} title="Perbesar">
              <Plus className="w-4 h-4" />
            </ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().updateAttributes('image', { width: '50%' }).run()} active={imgWidth === 50}>
              <span className="text-[10px] font-bold">1/2</span>
            </ToolBtn>
            <ToolBtn onClick={() => editor.chain().focus().updateAttributes('image', { width: '100%' }).run()} active={imgWidth === 100}>
              <span className="text-[10px] font-bold">Full</span>
            </ToolBtn>
          </>
        )}

        <Divider />
        <select value={fontSize} onChange={(e) => editor.chain().focus().setMark('textStyle', { fontSize: e.target.value }).run()}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none">
          <option value="16">Normal (16px)</option>
          <option value="14">Kecil (14px)</option>
          <option value="18">Sedang (18px)</option>
          <option value="20">Besar (20px)</option>
          <option value="24">Judul (24px)</option>
        </select>

        <div className="ml-auto flex gap-0.5">
          <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <Undo className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <Redo className="w-4 h-4" />
          </ToolBtn>
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*" onChange={addImage} className="hidden" />

      {/* Editor area */}
      <EditorContent editor={editor} className="p-4 md:p-6 min-h-[400px] max-w-none focus:outline-none" />

      <style jsx global>{`
        .ProseMirror { outline: none; min-height: 400px; }
        .ProseMirror p { margin: 0.5em 0; line-height: 1.7; }
        .ProseMirror h2 { font-size: 1.25rem; font-weight: 700; margin: 1em 0 0.5em; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 1.5em; margin: 0.5em 0; }
        .ProseMirror li { margin: 0.25em 0; }
        .ProseMirror blockquote {
          border-left: 3px solid #f97316; padding-left: 1em; margin: 1em 0;
          color: #6b7280; font-style: italic;
        }
        .ProseMirror img {
          display: block; margin: 1em auto; border-radius: 0.75rem;
          max-width: 100%; height: auto; cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .ProseMirror img:hover { box-shadow: 0 0 0 2px #f97316; }
        .ProseMirror a { color: #f97316; text-decoration: underline; }
      `}</style>
    </div>
  )
}
