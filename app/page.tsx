import Preloader from '@/components/sections/Preloader'
import ScrollRevealProvider from '@/components/ui/ScrollRevealProvider'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import SectionSep from '@/components/ui/SectionSep'
import Features from '@/components/sections/Features'
import Showcase from '@/components/sections/Showcase'
import Specs from '@/components/sections/Specs'
import Product2 from '@/components/sections/Product2'
import ShowcaseV2 from '@/components/sections/ShowcaseV2'
import Drone3D from '@/components/sections/Drone3D'
import Trust from '@/components/sections/Trust'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollRevealProvider />
      <Navbar />
      <main>
        <Hero />
        <SectionSep num="01" label="Можливості" />
        <Features />
        <SectionSep num="02" label="Лінійка продуктів" />
        <Showcase />
        <Specs />
        <Product2 />
        <ShowcaseV2 />
        <SectionSep num="03" label="Конструкція · 3D Огляд" />
        <Drone3D />
        <SectionSep num="04" label="Довіра і партнери" />
        <Trust />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
