export interface Artikel {
  id: string
  title: string
  slug: string
  category: 'Agenda' | 'Artikel' | 'Hikmah' | 'Kegiatan' | 'Kaderisasi' | 'Intelektual' | 'Sosial' | 'Prestasi'
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

export interface Admin {
  id: string
  email: string
  role: 'super_admin' | 'developer'
  created_at: string
}

export interface Prestasi {
  id: string
  title: string
  description: string
  order: number
}

export interface KontakInfo {
  id: string
  type: 'whatsapp' | 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'email' | 'alamat'
  label: string
  value: string
  url: string
}
