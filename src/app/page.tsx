"use client"
import Image from "next/image";

import Hero from '@/components/Hero'
import SuccessStory from '@/components/SuccessStory'
import DashboardSlide from '@/components/DashboardSlide'
import FAQ from '@/components/FAQ'
import CallToAction from '@/components/CallToAction'
import ContactSection from '@/components/ContactSection'


export default function Home() {
  return (
    <>
      <Hero website_name="Trucking360" />
      <SuccessStory />
      <DashboardSlide />
      <FAQ />
      <CallToAction />
      <ContactSection address={"620 E. Broad St. Suite U Columbus, OH 43215"} phone={"(614)359-6306"} email={"Contact@trucking360solutions.com"} cognitoWebhookUrl={""} />
    </>
  )
}
