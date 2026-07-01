export const BIDANG_LIST = [
  'Bidang Organisasi',
  'Bidang Kader',
  'Bidang Hikmah, Politik dan Kebijakan Publik',
  'Bidang Riset dan Pengembangan Keilmuan',
  'Bidang Sosial dan Pemberdayaan Masyarakat',
  'Bidang IMMawati',
  'Bidang Tabligh dan Kajian Keislaman',
  'Bidang Media dan Komunikasi',
  'Bidang Seni, Budaya dan Olahraga',
] as const

export const BIDANG_SHORT: Record<string, string> = {
  'Bidang Organisasi': 'Organisasi',
  'Bidang Kader': 'Kader',
  'Bidang Hikmah, Politik dan Kebijakan Publik': 'HPKP',
  'Bidang Riset dan Pengembangan Keilmuan': 'RPK',
  'Bidang Sosial dan Pemberdayaan Masyarakat': 'SPM',
  'Bidang IMMawati': 'IMMawati',
  'Bidang Tabligh dan Kajian Keislaman': 'TKK',
  'Bidang Media dan Komunikasi': 'Medkom',
  'Bidang Seni, Budaya dan Olahraga': 'SBO',
}

export const BIDANG_DESC: Record<string, string> = {
  'Bidang Organisasi': 'Mengelola struktur organisasi, administrasi, dan pengembangan sistem keorganisasian komisariat.',
  'Bidang Kader': 'Bertanggung jawab dalam proses perkaderan formal dan informal seluruh kader IMM Siti Munjiyah.',
  'Bidang Hikmah, Politik dan Kebijakan Publik': 'Mengawal isu hikmah, politik, dan kebijakan publik di lingkungan kampus maupun masyarakat luas.',
  'Bidang Riset dan Pengembangan Keilmuan': 'Mendorong riset, pengembangan keilmuan, dan inovasi akademik di kalangan kader.',
  'Bidang Sosial dan Pemberdayaan Masyarakat': 'Menggerakkan aksi sosial dan pemberdayaan masyarakat sebagai wujud humanitas IMM.',
  'Bidang IMMawati': 'Mengelola dan memberdayakan potensi kader IMMawati dalam berbagai aspek organisasi.',
  'Bidang Tabligh dan Kajian Keislaman': 'Menangani kegiatan tablig, kajian keislaman, dan pengembangan spiritual kader.',
  'Bidang Media dan Komunikasi': 'Mengelola media komunikasi, publikasi, dan informasi digital komisariat.',
  'Bidang Seni, Budaya dan Olahraga': 'Mengembangkan seni, budaya, dan olahraga sebagai wahana kreativitas kader.',
}
