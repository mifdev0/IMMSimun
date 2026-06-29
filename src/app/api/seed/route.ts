import { createClient } from '@supabase/supabase-js'
import { articles, galeri, pengurus, prestasi } from '@/lib/data'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const results: Record<string, { status: string; count: number; error?: string }> = {}

  // Seed articles
  try {
    const { error: delArticles } = await supabase.from('articles').delete().neq('id', '0')
    if (delArticles) throw delArticles
    const { error: delImages } = await supabase.from('article_images').delete().neq('id', '0')
    if (delImages) throw delImages

    for (const a of articles) {
      const { images, ...articleData } = a
      const { error } = await supabase.from('articles').upsert(articleData)
      if (error) throw error
      if (images.length > 0) {
        for (const img of images) {
          const { error: imgErr } = await supabase.from('article_images').upsert(img)
          if (imgErr) throw imgErr
        }
      }
    }
    results.articles = { status: 'ok', count: articles.length }
  } catch (e: any) {
    results.articles = { status: 'error', count: 0, error: e.message }
  }

  // Seed galeri
  try {
    const { error: delGaleri } = await supabase.from('galeri').delete().neq('id', '0')
    if (delGaleri) throw delGaleri
    for (const g of galeri) {
      const { error } = await supabase.from('galeri').upsert(g)
      if (error) throw error
    }
    results.galeri = { status: 'ok', count: galeri.length }
  } catch (e: any) {
    results.galeri = { status: 'error', count: 0, error: e.message }
  }

  // Seed structural
  try {
    const { error: delStructural } = await supabase.from('structural').delete().neq('id', '0')
    if (delStructural) throw delStructural
    for (const p of pengurus) {
      const { error } = await supabase.from('structural').upsert({
        id: p.id,
        name: p.name,
        position: p.position,
        group: p.group,
        unit_name: p.unit_name,
        photo_url: p.photo_url,
        period: p.period,
        order: p.order,
      })
      if (error) throw error
    }
    results.structural = { status: 'ok', count: pengurus.length }
  } catch (e: any) {
    results.structural = { status: 'error', count: 0, error: e.message }
  }

  // Seed prestasi
  try {
    const { error: delPrestasi } = await supabase.from('prestasi').delete().neq('id', '0')
    if (delPrestasi) throw delPrestasi
    for (const p of prestasi) {
      const { error } = await supabase.from('prestasi').upsert(p)
      if (error) throw error
    }
    results.prestasi = { status: 'ok', count: prestasi.length }
  } catch (e: any) {
    results.prestasi = { status: 'error', count: 0, error: e.message }
  }

  return Response.json(results)
}
