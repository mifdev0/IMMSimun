import { BookOpen, Heart, Clock } from 'lucide-react'

const misiData = [
  { num: '1', title: 'Internalisasi Nilai', desc: 'Menguatkan internalisasi nilai-nilai Al-Islam dan Kemuhammadiyahan dalam setiap langkah organisasi dan pribadi kader.' },
  { num: '2', title: 'Budaya Literasi', desc: 'Meningkatkan budaya literasi dan daya kritis mahasiswa sebagai calon pendidik masa depan yang berkualitas.' },
  { num: '3', title: 'Aksi Kemanusiaan', desc: 'Responsif terhadap isu sosial dan aktif dalam berbagai gerakan kemanusiaan yang inklusif dan berkelanjutan.' },
  { num: '4', title: 'Kemandirian Kader', desc: 'Mengembangkan potensi kewirausahaan dan soft skills demi kemandirian kader secara kolektif dan berkelanjutan.' },
]

const pilarData = [
  { icon: BookOpen, title: 'Intelektualitas', desc: 'Pilar yang mendorong kader untuk selalu mengembangkan daya pikir kritis, ilmiah, dan inovatif.' },
  { icon: Heart, title: 'Humanitas', desc: 'Pilar yang menanamkan kepedulian sosial dan kemanusiaan sebagai wujud pengabdian kepada umat.' },
  { icon: Clock, title: 'Religiusitas', desc: 'Pilar yang memperkuat nilai-nilai keislaman dan ketakwaan dalam setiap aspek kehidupan.' },
]

export default function VisiMisi() {
  return (
    <div className="pb-20 bg-[#fff8f0] relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.04),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
        <div className="text-center pt-12 mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
            Visi & Misi
          </span>
          <h1 className="text-3xl md:text-5xl font-bold">Visi & Misi <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">Perjuangan</span></h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-gradient-to-br from-[#f97316] to-[#f0a500] p-8 md:p-14 rounded-[2rem] text-white relative overflow-hidden shadow-xl shadow-[rgba(249,115,22,0.2)]">
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl -mr-28 -mt-28" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20" />
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-white/70 block mb-4">Visi Utama</span>
              <p className="text-2xl md:text-3xl italic leading-relaxed font-medium">
                &ldquo;Unggul dalam keilmuan, mandiri dalam berkarya, dan bertaqwa dalam mengabdi
                demi kemaslahatan umat dan bangsa.&rdquo;
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold mb-6">Misi Organisasi</h2>
            <div className="space-y-6">
              {misiData.map((misi) => (
                <div key={misi.num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f97316] to-[#f0a500] flex items-center justify-center shrink-0 text-white font-anton text-lg">
                    {misi.num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{misi.title}</h3>
                    <p className="text-sm text-gray-muted mt-1">{misi.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold mb-6">Tiga Pilar IMM</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pilarData.map((pilar) => (
                <div key={pilar.title} className="p-6 rounded-2xl bg-[#fff8f0] text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f97316] to-[#f0a500] flex items-center justify-center mx-auto mb-4">
                    <pilar.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">{pilar.title}</h3>
                  <p className="text-sm text-gray-muted">{pilar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
