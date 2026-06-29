-- ============================================
-- SEED DATA: IMM Siti Munjiyah
-- Jalankan di Supabase SQL Editor
-- ============================================

-- ARTICLES
INSERT INTO articles (id, title, slug, category, author, published_at, content, status, created_at) VALUES
('1', 'Darul Arqam Dasar (DAD) 2026', 'darul-arqam-dasar-2026', 'Kegiatan', 'IMMawati Anna', '2026-03-15', '<p>Pintu gerbang pertama bagi mahasiswa untuk mengenal dan bergabung dengan keluarga besar IMM Siti Munjiyah.</p>', 'published', '2026-03-10'),
('2', 'Munjiyah Literacy Club Vol. 12', 'munjiyah-literacy-club-vol-12', 'Intelektual', 'IMMawati Eldina', '2026-03-08', '<p>Diskusi rutin mingguan membedah isu terkini dan karya ilmiah dari berbagai perspektif pendidikan.</p>', 'published', '2026-03-05'),
('3', 'Siti Munjiyah Berbagi Ramadan', 'siti-munjiyah-berbagi-ramadan', 'Sosial', 'IMMawati Fatimah', '2026-02-22', '<p>Gerakan nyata pengabdian masyarakat dengan berbagi takjil dan santunan anak yatim.</p>', 'published', '2026-02-20'),
('4', 'Lolos PKM-PM Kemendikbudristek 2025', 'lolos-pkm-pm-kemendikbudristek-2025', 'Prestasi', 'IMMawati Alifah', '2026-02-10', '<p>Tim PKM-PM IMM Siti Munjiyah berhasil lolos pendanaan Kementerian Pendidikan dan Kebudayaan.</p>', 'published', '2026-02-08'),
('5', 'Pelatihan Kader Lanjut (PKL) 2026', 'pelatihan-kader-lanjut-2026', 'Kaderisasi', 'IMMawati Lisa', '2026-01-25', '<p>Program pengkaderan lanjutan bagi kader yang telah menyelesaikan DAD.</p>', 'published', '2026-01-20'),
('6', 'Juara 1 International Essay Competition ALIEC 2025', 'juara-1-aliec-2025', 'Prestasi', 'IMMawati Dini', '2026-01-15', '<p>IMMawati Dini Nur Azizah berhasil meraih juara 1 dalam ajang internasional.</p>', 'published', '2026-01-10');

-- GALERI
INSERT INTO galeri (id, image_url, caption, category, event_date, created_at) VALUES
('1', '', 'DAD 2025', 'Kaderisasi', '2025-10-15', '2025-10-16'),
('2', '', 'MLC Vol. 10', 'Intelektual', '2025-09-20', '2025-09-21'),
('3', '', 'Berbagi Ramadan', 'Sosial', '2025-03-10', '2025-03-11'),
('4', '', 'PIMPTA 2025', 'Kegiatan', '2025-08-05', '2025-08-06'),
('5', '', 'PKL 2026', 'Kaderisasi', '2026-01-25', '2026-01-26'),
('6', '', 'ALIEC 2025', 'Prestasi', '2025-12-15', '2025-12-16'),
('7', '', 'P2MW', 'Prestasi', '2025-11-01', '2025-11-02'),
('8', '', 'Porsema 2025', 'Kegiatan', '2025-07-20', '2025-07-21');

-- STRUKTURAL (PENGURUS)
INSERT INTO structural (id, name, position, "group", unit_name, photo_url, period, "order") VALUES
('1', 'IMMawan Faris', 'Ketua Umum', 'pimpinan', '', '', '2025/2026', 1),
('2', 'IMMawati Anna', 'Sekretaris Umum', 'pimpinan', '', '', '2025/2026', 2),
('3', 'IMMawati Ayu', 'Bendahara Umum', 'pimpinan', '', '', '2025/2026', 3),
('4', 'IMMawati Salma', 'Bendahara Umum', 'pimpinan', '', '', '2025/2026', 4),
('5', 'IMMawati Deswita', 'Ketua Bidang', 'bidang', 'Bidang Organisasi', '', '2025/2026', 5),
('101', 'IMMawati Salwa', 'Sekretaris Bidang', 'bidang', 'Bidang Organisasi', '', '2025/2026', 6),
('102', 'IMMawati Muna', 'Anggota Bidang', 'bidang', 'Bidang Organisasi', '', '2025/2026', 7),
('103', 'IMMawati Aurel', 'Anggota Bidang', 'bidang', 'Bidang Organisasi', '', '2025/2026', 8),
('104', 'IMMawati Aisyah', 'Anggota Bidang', 'bidang', 'Bidang Organisasi', '', '2025/2026', 9),
('105', 'IMMawati Meiva', 'Anggota Bidang', 'bidang', 'Bidang Organisasi', '', '2025/2026', 10),
('106', 'IMMawati Eva', 'Anggota Bidang', 'bidang', 'Bidang Organisasi', '', '2025/2026', 11),
('6', 'IMMawati Lisa', 'Ketua Bidang', 'bidang', 'Bidang Kader', '', '2025/2026', 12),
('107', 'IMMawati Nabila', 'Sekretaris Bidang', 'bidang', 'Bidang Kader', '', '2025/2026', 13),
('108', 'IMMawan Nauval', 'Anggota Bidang', 'bidang', 'Bidang Kader', '', '2025/2026', 14),
('7', 'IMMawati Dwi Rahma', 'Ketua Bidang', 'bidang', 'Bidang HPKP', '', '2025/2026', 15),
('109', 'IMMawati Nabila H', 'Sekretaris Bidang', 'bidang', 'Bidang HPKP', '', '2025/2026', 16),
('110', 'IMMawati Alifah', 'Anggota Bidang', 'bidang', 'Bidang HPKP', '', '2025/2026', 17),
('111', 'IMMawati Leni', 'Anggota Bidang', 'bidang', 'Bidang HPKP', '', '2025/2026', 18),
('112', 'IMMawati Warda', 'Anggota Bidang', 'bidang', 'Bidang HPKP', '', '2025/2026', 19),
('8', 'IMMawati Fawaz', 'Ketua Bidang', 'bidang', 'Bidang RPK', '', '2025/2026', 20),
('113', 'IMMawati Nabela', 'Sekretaris Bidang', 'bidang', 'Bidang RPK', '', '2025/2026', 21),
('114', 'IMMawan Attar', 'Anggota Bidang', 'bidang', 'Bidang RPK', '', '2025/2026', 22),
('115', 'IMMawati Faza', 'Anggota Bidang', 'bidang', 'Bidang RPK', '', '2025/2026', 23),
('116', 'IMMawati Salma', 'Anggota Bidang', 'bidang', 'Bidang RPK', '', '2025/2026', 24),
('9', 'IMMawati Fatimah', 'Ketua Bidang', 'bidang', 'Bidang SPM', '', '2025/2026', 25),
('117', 'IMMawati Nurul', 'Sekretaris Bidang', 'bidang', 'Bidang SPM', '', '2025/2026', 26),
('118', 'IMMawati Ariqah', 'Anggota Bidang', 'bidang', 'Bidang SPM', '', '2025/2026', 27),
('119', 'IMMawati Zaskia', 'Anggota Bidang', 'bidang', 'Bidang SPM', '', '2025/2026', 28),
('120', 'IMMawati Humairah', 'Anggota Bidang', 'bidang', 'Bidang SPM', '', '2025/2026', 29),
('10', 'IMMawati Novi', 'Ketua Bidang', 'bidang', 'Bidang IMMawati', '', '2025/2026', 30),
('121', 'IMMawati Kholif', 'Sekretaris Bidang', 'bidang', 'Bidang IMMawati', '', '2025/2026', 31),
('122', 'IMMawan Febri', 'Anggota Bidang', 'bidang', 'Bidang IMMawati', '', '2025/2026', 32),
('123', 'IMMawati Rosita', 'Anggota Bidang', 'bidang', 'Bidang IMMawati', '', '2025/2026', 33),
('11', 'IMMawan Rizki', 'Ketua Bidang', 'bidang', 'Bidang TKK', '', '2025/2026', 34),
('124', 'IMMawati Kindi', 'Sekretaris Bidang', 'bidang', 'Bidang TKK', '', '2025/2026', 35),
('125', 'IMMawati Najwa', 'Anggota Bidang', 'bidang', 'Bidang TKK', '', '2025/2026', 36),
('126', 'IMMawan Marvel', 'Anggota Bidang', 'bidang', 'Bidang TKK', '', '2025/2026', 37),
('127', 'IMMawan Fadly', 'Anggota Bidang', 'bidang', 'Bidang TKK', '', '2025/2026', 38),
('12', 'IMMawati Eldina', 'Ketua Bidang', 'bidang', 'Bidang Medkom', '', '2025/2026', 39),
('128', 'IMMawati Irsyada', 'Sekretaris Bidang', 'bidang', 'Bidang Medkom', '', '2025/2026', 40),
('129', 'IMMawati Hanin', 'Anggota Bidang', 'bidang', 'Bidang Medkom', '', '2025/2026', 41),
('130', 'IMMawan Firdaus', 'Anggota Bidang', 'bidang', 'Bidang Medkom', '', '2025/2026', 42),
('131', 'IMMawan Kholik', 'Anggota Bidang', 'bidang', 'Bidang Medkom', '', '2025/2026', 43),
('13', 'IMMawati Tora', 'Ketua Bidang', 'bidang', 'Bidang SBO', '', '2025/2026', 44),
('132', 'IMMawati Anggita', 'Sekretaris Bidang', 'bidang', 'Bidang SBO', '', '2025/2026', 45),
('133', 'IMMawati Dini', 'Anggota Bidang', 'bidang', 'Bidang SBO', '', '2025/2026', 46),
('134', 'IMMawati Ica', 'Anggota Bidang', 'bidang', 'Bidang SBO', '', '2025/2026', 47),
('135', 'IMMawati Sherly', 'Anggota Bidang', 'bidang', 'Bidang SBO', '', '2025/2026', 48),
('14', 'IMMawati Widi', 'Ketua Unit', 'unit', 'LO BUMK', '', '2025/2026', 49),
('15', 'IMMawati Damar', 'Ketua Unit', 'unit', 'LSO PUSAKA', '', '2025/2026', 50),
('16', 'IMMawati Alifia', 'Ketua Unit', 'unit', 'LSO LENTERA', '', '2025/2026', 51),
('17', 'IMMawati Bunga', 'Ketua Unit', 'unit', 'LSO IMD', '', '2025/2026', 52),
('18', 'IMMawati Rani', 'Ketua Unit', 'unit', 'LSO GARDA', '', '2025/2026', 53);

-- PRESTASI
INSERT INTO prestasi (id, title, description, "order") VALUES
('1', 'Gold B Medal Folklore & Mixed Choir', '3rd Soegijapranata International Choir Competition', 1),
('2', 'Lolos Pendanaan P2MW Kemendikbud', 'Deswita, Fatimah, Bilqis, Ariqah', 2),
('3', 'Lolos Pendanaan PKM-PM 2024 Kemendikbudristek', 'Alifah, Salma, Ja''anur', 3),
('4', 'Juara 1 International Essay Competition ALIEC 2025', 'IMMawati Dini Nur Azizah', 4),
('5', 'Juara 3 Lomba Tahfidz Juz 30 HMP PGSD UMS', 'IMMawati Najwa', 5),
('6', 'Juara 2 Lomba Konten Islami HMP PGSD UMS', 'IMMawati Meiva & Dhika', 6),
('7', 'Juara 1 Lomba Poster Digital HMP PBSI UMS', 'IMMawati Eldina', 7),
('8', 'Juara 2 Kelas C Putra Kejuaraan Antar Fakultas 2025', 'IMMawan Nauval', 8),
('9', 'Juara 2 Kelas Under A Putri Kejuaraan Antar Fakultas 2025', 'IMMawati Tiara', 9),
('10', 'Harapan 3 PIMPTA Muhammadiyah Nasional ke-4', 'Eva Yulianti', 10),
('11', 'Juara 1 Lomba Poster Porsema 2025', 'IMMawati Nindy', 11);
