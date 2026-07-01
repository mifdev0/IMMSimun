export interface Artikel {
  id: string
  title: string
  slug: string
  category: string
  author: string
  published_at: string
  content: string
  status: 'draft' | 'published'
  created_at: string
  images: ArtikelImage[]
}

export interface ArtikelImage {
  id: string
  artikel_id: string
  image_url: string
  order: number
}

export interface GaleriFoto {
  id: string
  image_url: string
  caption: string
  category: string
  event_date: string
  created_at: string
}

export interface Pengurus {
  id: string
  name: string
  position: string
  group: 'pimpinan' | 'bidang' | 'unit'
  unit_name: string
  photo_url: string
  period: string
  order: number
}

export interface Prestasi {
  id: string
  title: string
  description: string
  order: number
}

export interface SiteSettings {
  hero_tagline: string
  hero_subtitle: string
  hero_cover: string
  hero_stat_label: string
  hero_stat_value: string
  about_image: string
  about_text: string
  vision_text: string
  mission_items: string
  kontak_whatsapp: string
  kontak_instagram: string
  kontak_tiktok: string
  kontak_youtube: string
  kontak_twitter: string
  kontak_email: string
  kontak_alamat: string
  cta_text: string
  cta_link: string
  cta_link_label: string
}

export interface Kategori {
  id: string
  type: 'artikel' | 'galeri'
  name: string
  order: number
}

export interface Periode {
  id: string
  label: string
  is_current: boolean
}
