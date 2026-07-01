'use client'

import { useState, useEffect, useRef } from 'react'
import { Save, Upload, X, Crop } from 'lucide-react'
import { getSettings, saveSettings } from '@/lib/store'
import ImageCropper from '@/components/ImageCropper'
import type { SiteSettings } from '@/types'

const tabs = [
  { id: 'hero', label: 'Hero' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'visimisi', label: 'Visi Misi' },
  { id: 'kontak', label: 'Kontak' },
  { id: 'cta', label: 'CTA' },
]

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('hero')
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [cropTarget, setCropTarget] = useState('')
  const [cropField, setCropField] = useState('')
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  const handleFile = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || file.size > 5 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) { setCropTarget(reader.result as string); setCropField(field) }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const update = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => prev ? { ...prev, [field]: value } : prev)
  }

  const handleSave = async () => {
    if (!settings) return
    setSaving(true)
    try {
      await saveSettings(settings)
      alert('Pengaturan berhasil disimpan!')
    } catch {
      alert('Gagal menyimpan pengaturan.')
    } finally {
      setSaving(false)
    }
  }

  if (!settings) return <div className="text-center py-12 text-gray-muted text-sm">Memuat...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-[rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
          <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        {activeTab === 'hero' && (
          <div className="space-y-5">
            <InputField label="Tagline" value={settings.hero_tagline} onChange={(v) => update('hero_tagline', v)} />
            <InputField label="Subtitle" value={settings.hero_subtitle} onChange={(v) => update('hero_subtitle', v)} />
            <ImageField label="Cover Hero" value={settings.hero_cover} onChange={(v) => update('hero_cover', v)} onUpload={handleFile('hero_cover')} fileRef={fileRef} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Label Statistik" value={settings.hero_stat_label} onChange={(v) => update('hero_stat_label', v)} />
              <InputField label="Nilai Statistik" value={settings.hero_stat_value} onChange={(v) => update('hero_stat_value', v)} />
            </div>
          </div>
        )}

        {activeTab === 'tentang' && (
          <div className="space-y-5">
            <ImageField label="Gambar Tentang" value={settings.about_image} onChange={(v) => update('about_image', v)} onUpload={handleFile('about_image')} fileRef={fileRef} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Teks Tentang</label>
              <textarea value={settings.about_text} onChange={(e) => update('about_text', e.target.value)} rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
            </div>
          </div>
        )}

        {activeTab === 'visimisi' && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Teks Visi</label>
              <textarea value={settings.vision_text} onChange={(e) => update('vision_text', e.target.value)} rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Misi (satu baris per item)</label>
              <textarea value={(() => { try { return JSON.parse(settings.mission_items).join('\n') } catch { return settings.mission_items } })()}
                onChange={(e) => update('mission_items', JSON.stringify(e.target.value.split('\n').filter(Boolean)))}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
            </div>
          </div>
        )}

        {activeTab === 'kontak' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="WhatsApp" value={settings.kontak_whatsapp} onChange={(v) => update('kontak_whatsapp', v)} />
            <InputField label="Instagram" value={settings.kontak_instagram} onChange={(v) => update('kontak_instagram', v)} />
            <InputField label="TikTok" value={settings.kontak_tiktok} onChange={(v) => update('kontak_tiktok', v)} />
            <InputField label="YouTube" value={settings.kontak_youtube} onChange={(v) => update('kontak_youtube', v)} />
            <InputField label="Twitter" value={settings.kontak_twitter} onChange={(v) => update('kontak_twitter', v)} />
            <InputField label="Email" value={settings.kontak_email} onChange={(v) => update('kontak_email', v)} />
            <div className="sm:col-span-2">
              <InputField label="Alamat" value={settings.kontak_alamat} onChange={(v) => update('kontak_alamat', v)} />
            </div>
          </div>
        )}

        {activeTab === 'cta' && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Teks CTA</label>
              <textarea value={settings.cta_text} onChange={(e) => update('cta_text', e.target.value)} rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
            </div>
            <InputField label="Link CTA" value={settings.cta_link} onChange={(v) => update('cta_link', v)} />
            <InputField label="Label Tombol CTA" value={settings.cta_link_label} onChange={(v) => update('cta_link_label', v)} />
          </div>
        )}
      </div>

      {cropTarget && (
        <ImageCropper
          image={cropTarget}
          aspect={16 / 9}
          cropShape="rect"
          onCropDone={(dataUrl) => { update(cropField as keyof SiteSettings, dataUrl); setCropTarget('') }}
          onCancel={() => setCropTarget('')}
        />
      )}
    </div>
  )
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
    </div>
  )
}

function ImageField({ label, value, onChange, onUpload, fileRef }: { label: string; value: string; onChange: (v: string) => void; onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; fileRef: React.RefObject<HTMLInputElement | null> }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} className="hidden" />
      {value ? (
        <div className="relative inline-block group">
          <img src={value} alt={label} className="max-h-48 rounded-xl border border-gray-200" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
            <button type="button" onClick={() => fileRef.current?.click()}
              className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-all">
              <Crop className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => onChange('')}
              className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-red-400 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-accent transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-accent/50 mx-auto mb-2" />
          <p className="text-sm text-gray-muted">Klik untuk upload gambar</p>
        </div>
      )}
    </div>
  )
}
