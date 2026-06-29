-- ============================================
-- FIX RLS: Allow write access from anon key
-- Karena auth admin via env, bukan Supabase Auth
-- ============================================

-- Hapus policy lama yang pake auth.role()
DROP POLICY IF EXISTS "Admin write articles" ON articles;
DROP POLICY IF EXISTS "Admin write article_images" ON article_images;
DROP POLICY IF EXISTS "Admin write galeri" ON galeri;
DROP POLICY IF EXISTS "Admin write structural" ON structural;
DROP POLICY IF EXISTS "Admin write prestasi" ON prestasi;
DROP POLICY IF EXISTS "Admin read admins" ON admins;
DROP POLICY IF EXISTS "Admin write images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete images" ON storage.objects;

-- Buat policy baru: semua operasi diizinkan (tanpa auth Supabase)
CREATE POLICY "Public all articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all article_images" ON article_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all galeri" ON galeri FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all structural" ON structural FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all prestasi" ON prestasi FOR ALL USING (true) WITH CHECK (true);

-- Storage: izinkan upload/update/hapus tanpa auth
CREATE POLICY "Public all images" ON storage.objects FOR ALL USING (true) WITH CHECK (true);
