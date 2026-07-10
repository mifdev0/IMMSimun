import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Artikel, Prestasi, SiteSettings } from '@/types'

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

export async function getLatestArticles(limit = 3): Promise<Artikel[]> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('articles')
    .select('*, images:article_images(*)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (data && data.length > 0) return data as Artikel[]
  return []
}

export async function getPrestasi(): Promise<Prestasi[]> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('prestasi')
    .select('*')
    .order('order', { ascending: true })
  if (data && data.length > 0) return data as Prestasi[]
  return []
}

export async function getSettings(): Promise<SiteSettings> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .single()
  if (data) return data as SiteSettings
  return defaultSettings
}
