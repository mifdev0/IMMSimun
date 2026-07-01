'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { getArticles, deleteArticle } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import ConfirmModal from '@/components/ConfirmModal'
import LoadingOverlay from '@/components/LoadingOverlay'
import { showToast } from '@/components/Toast'

export default function AdminArtikel() {
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    getArticles().then((all) =>
      setArticles(all.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()))
    )
  }, [])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [saving, setSaving] = useState(false)

  const refresh = async () => {
    const all = await getArticles()
    setArticles(all.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()))
  }

  const handleDelete = (id: string) => {
    setDeleteTarget(id)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    setSaving(true)
    setDeleting(true)
    try {
      await deleteArticle(deleteTarget)
      showToast('success', 'Berhasil dihapus')
      setDeleteTarget(null)
      refresh()
    } catch {
      showToast('error', 'Gagal menghapus')
    } finally {
      setSaving(false)
      setDeleting(false)
    }
  }

  const filtered = (articles || getArticles()).filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || a.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold">Artikel</h1>
        <Link href="/admin/artikel/buat"
          className="flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all hover:shadow-lg hover:shadow-[rgba(249,115,22,0.3)] shrink-0">
          <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Buat Artikel Baru</span><span className="sm:hidden">Buat</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari artikel..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
        </div>
        <div className="flex gap-2">
          {(['all', 'draft', 'published'] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 md:px-4 py-2 rounded-full text-[11px] md:text-xs font-medium transition-all ${
                filterStatus === s
                  ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
              }`}>
              {s === 'all' ? 'Semua' : s === 'draft' ? 'Draft' : 'Terbit'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm">Judul</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm hidden md:table-cell">Kategori</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm hidden sm:table-cell">Penulis</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm hidden sm:table-cell">Tanggal</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm">Status</th>
                <th className="text-right py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 md:py-4 px-4 md:px-6 font-medium text-xs md:text-sm">{a.title}</td>
                  <td className="py-3 md:py-4 px-4 md:px-6 hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-[9px] md:text-[10px] font-semibold">{a.category}</span>
                  </td>
                  <td className="py-3 md:py-4 px-4 md:px-6 text-gray-muted text-xs hidden sm:table-cell">{a.author}</td>
                  <td className="py-3 md:py-4 px-4 md:px-6 text-gray-muted text-xs hidden sm:table-cell">{formatDate(a.published_at)}</td>
                  <td className="py-3 md:py-4 px-4 md:px-6">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-semibold ${
                      a.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {a.status === 'published' ? 'Terbit' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 px-4 md:px-6 text-right">
                    <div className="flex items-center justify-end gap-1 md:gap-2">
                      <Link href={`/admin/artikel/${a.id}/edit`}
                        className="p-1.5 md:p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-[rgba(249,115,22,0.06)] transition-all">
                        <Pencil className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </Link>
                      <button onClick={() => setDeleteTarget(a.id)} className="p-1.5 md:p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                        <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-muted text-sm">Tidak ada artikel ditemukan.</div>
        )}
      </div>

      <ConfirmModal open={!!deleteTarget} title="Hapus Artikel" message="Yakin ingin menghapus artikel ini?" onConfirm={handleConfirmDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
      <LoadingOverlay open={saving} message="Menghapus..." />
    </div>
  )
}
