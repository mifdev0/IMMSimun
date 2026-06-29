'use client'

import { createClient } from '@/lib/supabase/client'
import { Artikel, GaleriFoto, Pengurus, Prestasi } from '@/types'
import { articles as staticArticles, galeri as staticGaleri, pengurus as staticPengurus, prestasi as staticPrestasi } from './data'

const supabase = createClient()

function useFallback() {
  return typeof window === 'undefined'
}

// --- ARTICLES ---

export async function getArticles(): Promise<Artikel[]> {
  try {
    const { data } = await supabase.from('articles').select('*, images:article_images(*)').order('published_at', { ascending: false })
    if (data) return data as Artikel[]
  } catch {}
  return staticArticles
}

export async function saveArticle(article: Artikel) {
  const { images, ...articleData } = article
  const { error } = await supabase.from('articles').upsert(articleData)
  if (error) throw error

  if (images.length > 0) {
    const { error: delErr } = await supabase.from('article_images').delete().eq('artikel_id', article.id)
    if (delErr) throw delErr
    for (const img of images) {
      const { error: imgErr } = await supabase.from('article_images').upsert(img)
      if (imgErr) throw imgErr
    }
  }
}

export async function deleteArticle(id: string) {
  await supabase.from('articles').delete().eq('id', id)
}

// --- GALERI ---

export async function getGaleri(): Promise<GaleriFoto[]> {
  try {
    const { data } = await supabase.from('galeri').select('*').order('created_at', { ascending: false })
    if (data) return data as GaleriFoto[]
  } catch {}
  return staticGaleri
}

export async function saveGaleri(foto: GaleriFoto) {
  const { error } = await supabase.from('galeri').upsert(foto)
  if (error) throw error
}

export async function deleteGaleri(id: string) {
  await supabase.from('galeri').delete().eq('id', id)
}

// --- PENGURUS ---

export async function getPengurus(): Promise<Pengurus[]> {
  try {
    const { data } = await supabase.from('structural').select('*').order('order', { ascending: true })
    if (data) return data as Pengurus[]
  } catch {}
  return staticPengurus
}

export async function savePengurus(p: Pengurus) {
  const { error } = await supabase.from('structural').upsert(p)
  if (error) throw error
}

export async function deletePengurus(id: string) {
  await supabase.from('structural').delete().eq('id', id)
}

// --- PRESTASI ---

export async function getPrestasi(): Promise<Prestasi[]> {
  try {
    const { data } = await supabase.from('prestasi').select('*').order('order', { ascending: true })
    if (data) return data as Prestasi[]
  } catch {}
  return staticPrestasi
}

export async function savePrestasi(p: Prestasi) {
  const { error } = await supabase.from('prestasi').upsert(p)
  if (error) throw error
}

export async function deletePrestasi(id: string) {
  await supabase.from('prestasi').delete().eq('id', id)
}
