'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Upload, X, Crop } from 'lucide-react'
import Link from 'next/link'
import { savePengurus, getPengurus, getPeriodes } from '@/lib/store'
import { BIDANG_LIST, BIDANG_SHORT } from '@/lib/bidang'
import ImageCropper from '@/components/ImageCropper'
import LoadingOverlay from '@/components/LoadingOverlay'
import { showToast } from '@/components/Toast'

function Form() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')
  const fileRef = useRef<HTMLInputElement>(null)

  const [nama, setNama] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [kelompok, setKelompok] = useState('pimpinan')
  const [bidangUnit, setBidangUnit] = useState('')
  const [periode, setPeriode] = useState('2025/2026')
  const [foto, setFoto] = useState('')
  const [cropTarget, setCropTarget] = useState('')
  const [periods, setPeriods] = useState<any[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getPeriodes().then((p) => {
      setPeriods(p)
      const group = searchParams.get('group')
      const unit = searchParams.get('unit')
      const period = searchParams.get('period')
      if (group) setKelompok(group)
      if (unit) setBidangUnit(unit)
      if (period) setPeriode(period)
      else {
        const current = p.find((per) => per.is_current)
        if (current) setPeriode(current.label)
      }
    })
    if (editId) {
      getPengurus().then((all) => {
        const item = all.find((p) => p.id === editId)
        if (item) {
          setNama(item.name)
          setJabatan(item.position)
          setKelompok(item.group)
          setBidangUnit(item.unit_name)
          setPeriode(item.period)
          setFoto(item.photo_url)
        }
      })
    }
  }, [searchParams, editId])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || file.size > 2 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) setCropTarget(reader.result as string)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const id = editId || String(Date.now())
      const existing = await getPengurus()
      const maxOrder = existing.reduce((max, p) => Math.max(max, p.order), 0)
      await savePengurus({
        id,
        name: nama,
        position: jabatan,
        group: kelompok as any,
        unit_name: bidangUnit,
        photo_url: foto,
        period: periode,
        order: editId ? (existing.find((p) => p.id === editId)?.order || maxOrder + 1) : maxOrder + 1,
      })
      showToast('success', 'Berhasil disimpan')
      router.push('/admin/struktural')
    } catch (e: any) {
      showToast('error', 'Gagal menyimpan: ' + e.message)
      setSaving(false)
    }
  }

  return (
    <div>
      <Link href="/admin/struktural" className="inline-flex items-center gap-2 text-sm text-gray-muted hover:text-accent transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <h1 className="text-xl md:text-2xl font-bold mb-6">{editId ? 'Edit Pengurus' : 'Tambah Pengurus'}</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama <span className="text-red-500">*</span></label>
              <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required
                placeholder="Contoh: IMMawan Faris"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Jabatan <span className="text-red-500">*</span></label>
              {kelompok === 'bidang' ? (
                <select value={jabatan} onChange={(e) => setJabatan(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                  <option value="">Pilih jabatan</option>
                  <option value="Ketua Bidang">Ketua Bidang</option>
                  <option value="Sekretaris Bidang">Sekretaris Bidang</option>
                  <option value="Anggota Bidang">Anggota Bidang</option>
                </select>
              ) : kelompok === 'unit' ? (
                <select value={jabatan} onChange={(e) => setJabatan(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                  <option value="">Pilih jabatan</option>
                  <option value="Ketua Unit">Ketua Unit</option>
                  <option value="Sekretaris Unit">Sekretaris Unit</option>
                  <option value="Anggota Unit">Anggota Unit</option>
                </select>
              ) : kelompok === 'pimpinan' ? (
                <select value={jabatan} onChange={(e) => setJabatan(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                  <option value="">Pilih jabatan</option>
                  <option value="Ketua Umum">Ketua Umum</option>
                  <option value="Sekretaris Umum">Sekretaris Umum</option>
                  <option value="Bendahara Umum">Bendahara Umum</option>
                  <option value="Bendahara Satu">Bendahara Satu</option>
                </select>
              ) : (
                <input type="text" value={jabatan} onChange={(e) => setJabatan(e.target.value)} required
                  placeholder="Contoh: Ketua Umum"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kelompok <span className="text-red-500">*</span></label>
              <select value={kelompok} onChange={(e) => { setKelompok(e.target.value); setBidangUnit('') }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                <option value="pimpinan">Pimpinan Umum</option>
                <option value="bidang">Bidang</option>
                <option value="unit">Unit Pembantu Pimpinan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Bidang / Unit</label>
              {kelompok === 'bidang' ? (
                <select value={bidangUnit} onChange={(e) => setBidangUnit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                  <option value="">Pilih bidang</option>
                  {BIDANG_LIST.map((b) => (
                    <option key={b} value={b}>{BIDANG_SHORT[b]}</option>
                  ))}
                </select>
              ) : kelompok === 'unit' ? (
                <select value={bidangUnit} onChange={(e) => setBidangUnit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                  <option value="">Pilih unit</option>
                  <option value="LO BUMK">LO BUMK</option>
                  <option value="LSO PUSAKA">LSO PUSAKA</option>
                  <option value="LSO LENTERA">LSO LENTERA</option>
                  <option value="LSO IMD">LSO IMD</option>
                  <option value="LSO GARDA">LSO GARDA</option>
                </select>
              ) : (
                <input type="text" value={bidangUnit} onChange={(e) => setBidangUnit(e.target.value)} readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-400 cursor-not-allowed" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Periode <span className="text-red-500">*</span></label>
              <select value={periode} onChange={(e) => setPeriode(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                <option value="">Pilih periode</option>
                {periods.map((p) => (
                  <option key={p.id} value={p.label}>{p.label} {p.is_current ? '(Saat Ini)' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto <span className="text-gray-400 text-xs">(maks 2MB)</span></label>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              {!foto ? (
                <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl py-6 px-4 text-center hover:border-accent transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-accent/60 mx-auto mb-1" />
                  <p className="text-xs text-gray-muted">Klik untuk upload & crop</p>
                </div>
              ) : (
                <div className="relative inline-block group">
                  <img src={foto} alt="" className="h-16 w-16 rounded-full object-cover border-2 border-gray-200" />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="text-white p-1 hover:bg-white/20 rounded-full transition-colors">
                      <Crop className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => setFoto('')}
                      className="text-white p-1 hover:bg-white/20 rounded-full transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button type="submit"
            className="bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg active:scale-[0.98]">
            {editId ? 'Simpan Perubahan' : 'Simpan'}
          </button>
          <Link href="/admin/struktural"
            className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all">
            Batal
          </Link>
        </div>
      </form>

      {cropTarget && (
        <ImageCropper
          image={cropTarget}
          aspect={1}
          cropShape="round"
          onCropDone={(dataUrl) => { setFoto(dataUrl); setCropTarget('') }}
          onCancel={() => setCropTarget('')}
        />
      )}
      <LoadingOverlay open={saving} message="Menyimpan..." />
    </div>
  )
}

export default function TambahPengurus() {
  return <Suspense><Form /></Suspense>
}
