'use client'

import { createClient } from '@/lib/supabase/client'
import { Artikel, GaleriFoto, Pengurus, Prestasi, SiteSettings, Kategori, Periode } from '@/types'
import { articles as staticArticles, galeri as staticGaleri, pengurus as staticPengurus, prestasi as staticPrestasi } from './data'

const supabase = createClient()

// In-memory + localStorage cache (stale-while-revalidate)
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const memCache = new Map<string, any>()
function lsKey(key: string) { return `imm_cache_${key}` }

function cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  // 1. Return memory cache if available
  if (memCache.has(key)) return Promise.resolve(memCache.get(key) as T)

  const ls = lsKey(key)

  // 2. Try localStorage (stale-while-revalidate)
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem(ls)
      if (stored) {
        const parsed = JSON.parse(stored)
        const notExpired = Date.now() - parsed.timestamp < CACHE_TTL
        memCache.set(key, parsed.data)
        if (notExpired) {
          // Return cached immediately, revalidate in background
          fetcher().then(fresh => {
            memCache.set(key, fresh)
            if (typeof localStorage !== 'undefined')
              try { localStorage.setItem(ls, JSON.stringify({ data: fresh, timestamp: Date.now() })) } catch {}
          }).catch(() => {})
          return Promise.resolve(parsed.data) as Promise<T>
        }
      }
    } catch {}
  }

  // 3. Fetch fresh
  return fetcher().then(data => {
    memCache.set(key, data)
    if (typeof localStorage !== 'undefined')
      try { localStorage.setItem(ls, JSON.stringify({ data, timestamp: Date.now() })) } catch {}
    return data
  })
}

function invalidate(key: string) {
  memCache.delete(key)
  if (typeof localStorage !== 'undefined')
    try { localStorage.removeItem(lsKey(key)) } catch {}
}

// --- ARTICLES ---

export async function getArticles(): Promise<Artikel[]> {
  return cached('articles', async () => {
    try {
      const { data } = await supabase.from('articles').select('*, images:article_images(*)').order('published_at', { ascending: false })
      if (data && data.length > 0) return data as Artikel[]
    } catch {}
    return staticArticles
  })
}

export async function saveArticle(article: Artikel) {
  const { images, ...articleData } = article
  const { error } = await supabase.from('articles').upsert(articleData)
  if (error) throw error

  await supabase.from('article_images').delete().eq('artikel_id', article.id)
  if (images && images.length > 0) {
    for (const img of images) {
      await supabase.from('article_images').upsert(img)
    }
  }
  invalidate('articles')
}

export async function deleteArticle(id: string) {
  await supabase.from('articles').delete().eq('id', id)
  invalidate('articles')
}

// --- GALERI ---

export async function getGaleri(): Promise<GaleriFoto[]> {
  return cached('galeri', async () => {
    try {
      const { data } = await supabase.from('galeri').select('*').order('created_at', { ascending: false })
      if (data && data.length > 0) return data as GaleriFoto[]
    } catch {}
    return staticGaleri
  })
}

export async function saveGaleri(foto: GaleriFoto) {
  const { error } = await supabase.from('galeri').upsert(foto)
  if (error) throw error
  invalidate('galeri')
}

export async function deleteGaleri(id: string) {
  await supabase.from('galeri').delete().eq('id', id)
  invalidate('galeri')
}

// --- PENGURUS ---

export async function getPengurus(): Promise<Pengurus[]> {
  return cached('structural', async () => {
    try {
      const { data } = await supabase.from('structural').select('*').order('order', { ascending: true })
      if (data && data.length > 0) return data as Pengurus[]
    } catch {}
    return staticPengurus
  })
}

export async function savePengurus(p: Pengurus) {
  const { error } = await supabase.from('structural').upsert(p)
  if (error) throw error
  invalidate('structural')
}

export async function deletePengurus(id: string) {
  await supabase.from('structural').delete().eq('id', id)
  invalidate('structural')
}

// --- PRESTASI ---

export async function getPrestasi(): Promise<Prestasi[]> {
  return cached('prestasi', async () => {
    try {
      const { data } = await supabase.from('prestasi').select('*').order('order', { ascending: true })
      if (data && data.length > 0) return data as Prestasi[]
    } catch {}
    return staticPrestasi
  })
}

export async function savePrestasi(p: Prestasi) {
  const { error } = await supabase.from('prestasi').upsert(p)
  if (error) throw error
  invalidate('prestasi')
}

export async function deletePrestasi(id: string) {
  await supabase.from('prestasi').delete().eq('id', id)
  invalidate('prestasi')
}

// --- SITE SETTINGS ---
const defaultSettings: SiteSettings = {
  hero_tagline: 'Universitas Muhammadiyah Surakarta',
  hero_subtitle: 'Anggun dalam moral, unggul dalam intelektual',
  hero_cover: '/hero.jpeg',
  hero_stat_label: 'Kader Aktif',
  hero_stat_value: '71+',
  hero_stat_label_2: 'Pimpinan Aktif',
  hero_stat_value_2: '18',
  about_image: '/hero.jpeg',
  about_text: 'IMM Siti Munjiyah merupakan wadah perkaderan Ikatan Mahasiswa Muhammadiyah di lingkungan FKIP Universitas Muhammadiyah Surakarta.',
  vision_text: 'Unggul dalam keilmuan, mandiri dalam berkarya, dan bertaqwa dalam mengabdi demi kemaslahatan umat dan bangsa.',
  mission_items: JSON.stringify([
    'Menguatkan internalisasi nilai-nilai Al-Islam dan Kemuhammadiyahan.',
    'Meningkatkan budaya literasi dan daya kritis mahasiswa.',
    'Responsif terhadap isu sosial dan gerakan kemanusiaan inklusif.',
    'Mengembangkan potensi kewirausahaan dan soft skills.'
  ]),
  kontak_whatsapp: '6281234567890',
  kontak_instagram: 'immsitimunjiyah_fkip',
  kontak_tiktok: 'immsitimunjiyah_fkip',
  kontak_youtube: '@immsitimunjiyah',
  kontak_twitter: 'immsitimunjiyah',
  kontak_email: 'immsitimunjiyah@ums.ac.id',
  kontak_alamat: 'FKIP UMS, Kampus 1, Pabelan, Kartasura, Sukoharjo',
  cta_text: 'Siap Bergabung? Jadilah bagian dari generasi pendidik yang berkarakter, cerdas, dan religius.',
  cta_link: 'https://forms.google.com/...',
  cta_link_label: 'Daftar Sekarang',
}

export async function getSettings(): Promise<SiteSettings> {
  return cached('settings', async () => {
    try {
      const { data } = await supabase.from('site_settings').select('*').single()
      if (data) return data as SiteSettings
    } catch {}
    return defaultSettings
  })
}

export async function saveSettings(s: SiteSettings) {
  const { error } = await supabase.from('site_settings').upsert({ id: '1', ...s })
  if (error) throw error
  invalidate('settings')
}

// --- KATEGORI ---
export async function getKategoris(type: 'artikel' | 'galeri'): Promise<Kategori[]> {
  const key = 'kategori_' + type
  return cached(key, async () => {
    try {
      const { data } = await supabase.from('kategori').select('*').eq('type', type).order('order')
      if (data && data.length > 0) return data as Kategori[]
    } catch {}
    const defaults = type === 'artikel' 
      ? [{ id: 'agenda', type: 'artikel' as const, name: 'Agenda', order: 1 }, { id: 'kegiatan', type: 'artikel' as const, name: 'Kegiatan', order: 2 }]
      : [{ id: 'kegiatan', type: 'galeri' as const, name: 'Kegiatan', order: 1 }, { id: 'prestasi', type: 'galeri' as const, name: 'Prestasi', order: 2 }]
    return defaults
  })
}

export async function saveKategori(k: Kategori) {
  const { error } = await supabase.from('kategori').upsert(k)
  if (error) throw error
  invalidate('kategori_artikel')
  invalidate('kategori_galeri')
}

export async function deleteKategori(id: string) {
  await supabase.from('kategori').delete().eq('id', id)
  invalidate('kategori_artikel')
  invalidate('kategori_galeri')
}

// --- PERIODE ---
export async function getPeriodes(): Promise<Periode[]> {
  return cached('periode', async () => {
    try {
      const { data } = await supabase.from('periode').select('*').order('label', { ascending: false })
      if (data && data.length > 0) return data as Periode[]
    } catch {}
    return [{ id: '1', label: '2025/2026', is_current: true }]
  })
}

export async function savePeriode(p: Periode) {
  const { error } = await supabase.from('periode').upsert(p)
  if (error) throw error
  invalidate('periode')
}

export async function deletePeriode(id: string) {
  await supabase.from('periode').delete().eq('id', id)
  invalidate('periode')
}
