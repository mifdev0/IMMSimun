import type { Metadata } from "next"
import { Poppins, Anton } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageWrapper from "@/components/PageWrapper"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
})

export const metadata: Metadata = {
  title: "PK IMM Siti Munjiyah FKIP UMS",
  description: "Website resmi Pimpinan Komisariat IMM Siti Munjiyah FKIP Universitas Muhammadiyah Surakarta.",
  icons: { icon: "/logoImmSimun.png", apple: "/logoImmSimun.png" },
  openGraph: {
    title: "PK IMM Siti Munjiyah FKIP UMS",
    description: "Mewujudkan kader pendidik yang unggul dalam intelektualitas, humanitas, dan religiusitas.",
    images: ["/hero.jpeg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${anton.variable} scroll-smooth`}>
      <body className="font-poppins min-h-full flex flex-col bg-white text-dark antialiased">
        <Navbar />
        <main className="flex-1"><PageWrapper>{children}</PageWrapper></main>
        <Footer />
      </body>
    </html>
  )
}
