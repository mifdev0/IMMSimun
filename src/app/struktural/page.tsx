'use client'

import { useState, useEffect } from 'react'
import { getPengurus, getPeriodes } from '@/lib/store'

type GroupKey = 'pimpinan' | 'bidang' | 'unit'

const tabs: { key: GroupKey; label: string }[] = [
  { key: 'pimpinan', label: 'Pimpinan Umum' },
  { key: 'bidang', label: '9 Bidang' },
  { key: 'unit', label: '5 Unit' },
]

const bidangList = [
  'Bidang Organisasi',
  'Bidang Kader',
  'Bidang HPKP',
  'Bidang RPK',
  'Bidang SPM',
  'Bidang IMMawati',
  'Bidang TKK',
  'Bidang Medkom',
  'Bidang SBO',
]

const unitList = [
  'LO BUMK',
  'LSO PUSAKA',
  'LSO LENTERA',
  'LSO IMD',
  'LSO GARDA',
]

const roleBadge = (role: string) => {
  if (role === 'Ketua Bidang' || role === 'Ketua Unit') {
    return <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white text-[9px] font-bold uppercase tracking-widest shadow-sm">{role}</span>
  }
  if (role === 'Sekretaris Bidang' || role === 'Sekretaris Unit') {
    return <span className="px-3 py-0.5 rounded-full bg-[#be0a06] text-white text-[9px] font-bold uppercase tracking-widest shadow-sm">{role}</span>
  }
  return <span className="px-3 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[9px] font-bold uppercase tracking-widest">{role.replace('Bidang', '').replace('Unit', '').trim() || 'Anggota'}</span>
}

export default function Struktural() {
  const [activeTab, setActiveTab] = useState<GroupKey>('pimpinan')
  const [selectedBidang, setSelectedBidang] = useState('Bidang Organisasi')
  const [selectedUnit, setSelectedUnit] = useState('LO BUMK')
  const [all, setAll] = useState<any[]>([])
  const [periods, setPeriods] = useState<any[]>([])
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>('')

  useEffect(() => {
    getPengurus().then(setAll)
    getPeriodes().then((p) => {
      setPeriods(p)
      const current = p.find((per) => per.is_current)
      if (current) setSelectedPeriodId(current.id)
      else if (p.length > 0) setSelectedPeriodId(p[0].id)
    })
  }, [])

  const filtered = all.filter((p) => p.period === selectedPeriodId)
  const selectedPeriod = periods.find((p) => p.id === selectedPeriodId)
  const isNonCurrent = selectedPeriod && !selectedPeriod.is_current

  if (activeTab === 'pimpinan') {
    const pimpinan = filtered.filter((p) => p.group === 'pimpinan').sort((a, b) => a.order - b.order)
    return (
      <div className="pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <Header periods={periods} selectedPeriodId={selectedPeriodId} onPeriodChange={setSelectedPeriodId} />
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex flex-wrap justify-center gap-8">
            {pimpinan.map((p, i) => (
              <div key={p.id} className={`relative flex flex-col items-center ${isNonCurrent ? 'opacity-60 grayscale' : ''}`} style={{ width: 'clamp(160px, 22vw, 220px)' }}>
                {isNonCurrent && (
                  <span className="absolute -top-2 right-0 z-10 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white text-[8px] font-bold uppercase tracking-widest shadow-md">
                    {selectedPeriod?.label}
                  </span>
                )}
                {i > 0 && (
                  <div className="hidden lg:block absolute -left-8 top-9 text-accent/30">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
                <div className="relative group">
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden bg-gradient-to-br from-[rgba(249,115,22,0.1)] to-[rgba(240,165,0,0.08)] shadow-[0_4px_20px_rgba(249,115,22,0.1)] group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.2)] transition-all duration-300 flex items-center justify-center ring-4 ring-white">
                    {p.photo_url ? (
                      <img src={p.photo_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <span className="text-4xl md:text-5xl font-anton text-accent/50">{p.name.split(' ').pop()?.charAt(0)}</span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white text-[9px] font-bold uppercase tracking-widest whitespace-nowrap shadow-md">
                    {p.position}
                  </div>
                </div>
                <div className="text-center mt-6">
                  <h3 className="font-semibold text-sm md:text-base">{p.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (activeTab === 'bidang') {
    const currentBidangMembers = filtered.filter((p) => p.group === 'bidang' && p.unit_name === selectedBidang).sort((a, b) => a.order - b.order)
    const ketua = currentBidangMembers.find((p) => p.position === 'Ketua Bidang')
    const sekretaris = currentBidangMembers.find((p) => p.position === 'Sekretaris Bidang')
    const anggota = currentBidangMembers.filter((p) => p.position === 'Anggota Bidang')

    const bidangIcons: Record<string, string> = {
      'Bidang Organisasi': 'Organisasi',
      'Bidang Kader': 'Kader',
      'Bidang HPKP': 'HPKP',
      'Bidang RPK': 'RPK',
      'Bidang SPM': 'SPM',
      'Bidang IMMawati': 'IMMawati',
      'Bidang TKK': 'TKK',
      'Bidang Medkom': 'Medkom',
      'Bidang SBO': 'SBO',
    }

    return (
      <div className="pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <Header periods={periods} selectedPeriodId={selectedPeriodId} onPeriodChange={setSelectedPeriodId} />
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2 infinite-scroll">
            {bidangList.map((b) => (
              <button key={b} onClick={() => setSelectedBidang(b)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedBidang === b
                    ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-accent hover:text-accent'
                }`}>
                {bidangIcons[b]}
              </button>
            ))}
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">{selectedBidang}</h2>
              <p className="text-sm text-gray-muted mt-2 max-w-2xl mx-auto">
                {selectedBidang === 'Bidang Organisasi' && 'Mengelola struktur organisasi, administrasi, dan pengembangan sistem keorganisasian komisariat.'}
                {selectedBidang === 'Bidang Kader' && 'Bertanggung jawab dalam proses perkaderan formal dan informal seluruh kader IMM Siti Munjiyah.'}
                {selectedBidang === 'Bidang HPKP' && 'Mengawal isu hikmah, politik, dan kebijakan publik di lingkungan kampus maupun masyarakat luas.'}
                {selectedBidang === 'Bidang RPK' && 'Mendorong riset, pengembangan keilmuan, dan inovasi akademik di kalangan kader.'}
                {selectedBidang === 'Bidang SPM' && 'Menggerakkan aksi sosial dan pemberdayaan masyarakat sebagai wujud humanitas IMM.'}
                {selectedBidang === 'Bidang IMMawati' && 'Mengelola dan memberdayakan potensi kader IMMawati dalam berbagai aspek organisasi.'}
                {selectedBidang === 'Bidang TKK' && 'Menangani kegiatan tablig, kajian keislaman, dan pengembangan spiritual kader.'}
                {selectedBidang === 'Bidang Medkom' && 'Mengelola media komunikasi, publikasi, dan informasi digital komisariat.'}
                {selectedBidang === 'Bidang SBO' && 'Mengembangkan seni, budaya, dan olahraga sebagai wahana kreativitas kader.'}
              </p>
            </div>

            {ketua && (
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4 text-center">Ketua Bidang</p>
                <div className="flex justify-center">
                  <MemberCard member={ketua} role="ketua" isNonCurrent={isNonCurrent} periodLabel={selectedPeriod?.label} />
                </div>
              </div>
            )}

            {sekretaris && (
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#be0a06] mb-4 text-center">Sekretaris Bidang</p>
                <div className="flex justify-center">
                  <MemberCard member={sekretaris} role="sekretaris" isNonCurrent={isNonCurrent} periodLabel={selectedPeriod?.label} />
                </div>
              </div>
            )}

            {anggota.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 text-center">Anggota</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {anggota.map((m) => (
                    <MemberCard key={m.id} member={m} role="anggota" isNonCurrent={isNonCurrent} periodLabel={selectedPeriod?.label} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // UNIT TAB
  const currentUnitMembers = filtered.filter((p) => p.group === 'unit' && p.unit_name === selectedUnit).sort((a, b) => a.order - b.order)
  const ketuaUnit = currentUnitMembers.find((p) => p.position === 'Ketua Unit')

  return (
    <div className="pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <Header periods={periods} selectedPeriodId={selectedPeriodId} onPeriodChange={setSelectedPeriodId} />
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2 infinite-scroll">
          {unitList.map((u) => (
            <button key={u} onClick={() => setSelectedUnit(u)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedUnit === u
                  ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-accent hover:text-accent'
              }`}>
              {u}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">{selectedUnit}</h2>
            <p className="text-sm text-gray-muted mt-2 max-w-2xl mx-auto">
              {selectedUnit === 'LO BUMK' && 'Lembaga Otonom yang mengelola badan usaha milik komisariat untuk kemandirian ekonomi kader.'}
              {selectedUnit === 'LSO PUSAKA' && 'Pusat Strategis Kajian Administrasi yang mengelola data dan arsip organisasi.'}
              {selectedUnit === 'LSO LENTERA' && 'Lembaga Episentrum Transformasi Kader Ikatan, fokus pada pengembangan soft skill dan karakter.'}
              {selectedUnit === 'LSO IMD' && 'Intelektual Muda Dewantara, wadah pengembangan intelektualitas dan pergerakan kader.'}
              {selectedUnit === 'LSO GARDA' && 'Gerakan Advokasi dan Respons Dinamis atas Aspirasi, menjembatani aspirasi kader.'}
            </p>
          </div>

          {ketuaUnit && (
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4 text-center">Ketua Unit</p>
              <div className="flex justify-center">
                <MemberCard member={ketuaUnit} role="ketua" isNonCurrent={isNonCurrent} periodLabel={selectedPeriod?.label} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Header({ periods, selectedPeriodId, onPeriodChange }: { periods: any[]; selectedPeriodId: string; onPeriodChange: (id: string) => void }) {
  return (
    <div className="text-center pt-12 mb-12">
      <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
        Struktural
      </span>
      <h1 className="text-3xl md:text-5xl font-bold">Kepengurusan <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">IMM Siti Munjiyah</span></h1>
      <div className="mt-4 inline-flex items-center gap-2 bg-[#fff8f0] px-4 py-2 rounded-full border border-[rgba(249,115,22,0.2)]">
        <span className="text-sm text-gray-muted">Periode:</span>
        <select
          value={selectedPeriodId}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="text-sm font-semibold text-accent bg-transparent border-none outline-none cursor-pointer"
        >
          {periods.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}{p.is_current ? ' (Saat Ini)' : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function TabNav({ activeTab, setActiveTab }: { activeTab: GroupKey; setActiveTab: (k: GroupKey) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {tabs.map((tab) => (
        <button key={tab.key} onClick={() => setActiveTab(tab.key)}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeTab === tab.key
              ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white'
              : 'bg-transparent text-gray-muted border border-[rgba(0,0,0,0.08)] hover:border-accent hover:text-accent'
          }`}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function MemberCard({ member, role, isNonCurrent, periodLabel }: { member: { id: string; name: string; photo_url: string; position: string }; role: 'ketua' | 'sekretaris' | 'anggota'; isNonCurrent?: boolean; periodLabel?: string }) {
  const size = role === 'ketua' ? 'w-28 h-28 md:w-32 md:h-32' : role === 'sekretaris' ? 'w-24 h-24 md:w-28 md:h-28' : 'w-20 h-20 md:w-24 md:h-24'
  const fontSize = role === 'ketua' ? 'text-3xl md:text-4xl' : role === 'sekretaris' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'

  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-[#fff8f0] transition-colors relative ${isNonCurrent ? 'opacity-60 grayscale' : ''}`}>
      {isNonCurrent && periodLabel && (
        <span className="absolute -top-1 right-2 z-10 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white text-[8px] font-bold uppercase tracking-widest shadow-md">
          {periodLabel}
        </span>
      )}
      <div className={`${size} rounded-full overflow-hidden bg-gradient-to-br from-[rgba(249,115,22,0.1)] to-[rgba(240,165,0,0.08)] flex items-center justify-center ring-4 ring-white shadow-[0_4px_15px_rgba(249,115,22,0.1)]`}>
        {member.photo_url ? (
          <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <span className={`${fontSize} font-anton text-accent/50`}>{member.name.split(' ').pop()?.charAt(0)}</span>
        )}
      </div>
      <div className="text-center">
        <p className="font-semibold text-sm">{member.name}</p>
        <div className="mt-1">{roleBadge(member.position)}</div>
      </div>
    </div>
  )
}
