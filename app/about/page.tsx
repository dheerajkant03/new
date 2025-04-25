"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Users, Lightbulb, Sparkles, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AiChat } from "@/components/ai-chat"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <div className="relative w-10 h-10 mr-2">
            <Image src="/placeholder-logo.png" alt="DrapeMe Logo" fill className="object-contain" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            DrapeMe
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/products">
            Shop
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/virtual-tryon">
            Virtual Try-On
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/contact">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                    About DrapeMe
                  </h1>
                  <p className="max-w-[600px] text-zinc-500 md:text-xl">Where fashion meets technology</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto w-full max-w-[500px] lg:max-w-none overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="DrapeMe Team"
                  className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none"
              >
                <p className="text-lg leading-relaxed text-zinc-600">
                  Welcome to DrapeMe – where fashion meets technology.
                </p>
                <p className="text-lg leading-relaxed text-zinc-600">
                  We're redefining the way you shop for clothes by bringing the trial room to your screen. Our platform
                  lets you virtually try on outfits using your own photo, so you can see exactly how your chosen styles
                  will look on you – before you buy.
                </p>
                <p className="text-lg leading-relaxed text-zinc-600">
                  No more guesswork, no more returns. Just fashion that fits you. Whether you're hunting for the perfect
                  outfit or exploring new styles, we make it easy, fun, and personalized. Try it on, mix and match, and
                  express your unique style – all with just a few clicks.
                </p>
                <p className="text-lg leading-relaxed text-zinc-600">
                  Join us as we transform online shopping into a smarter, more confident experience.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-zinc-600 max-w-3xl mx-auto">
                To revolutionize online shopping by eliminating uncertainty and enhancing confidence in fashion choices
                through innovative technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Users className="text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Customer-Centric</h3>
                <p className="text-zinc-600">
                  We put our customers first, designing every feature to enhance your shopping experience and
                  satisfaction.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Lightbulb className="text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Innovation</h3>
                <p className="text-zinc-600">
                  We continuously push the boundaries of technology to create better, more intuitive shopping
                  experiences.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Sparkles className="text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quality</h3>
                <p className="text-zinc-600">
                  We curate high-quality clothing and ensure our virtual try-on technology provides accurate
                  representations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Sustainability</h3>
                <p className="text-zinc-600">
                  By reducing returns and helping customers make confident choices, we're working toward a more
                  sustainable fashion industry.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                  Our Story
                </h2>
                <p className="text-zinc-600">
                  DrapeMe was born from a simple frustration: the uncertainty of online clothes shopping. Our founders,
                  avid online shoppers themselves, were tired of ordering clothes only to find they didn't fit or look
                  as expected.
                </p>
                <p className="text-zinc-600">
                  In 2022, they assembled a team of fashion experts and tech innovators to create a solution. After
                  months of development and testing, DrapeMe was launched with a mission to transform how people shop
                  for clothes online.
                </p>
                <p className="text-zinc-600">
                  Today, we're proud to help thousands of customers find their perfect fit and style with confidence,
                  reducing returns and increasing satisfaction with every virtual try-on.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-[400px] overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our Team"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-50">
          <div className="container px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                Join Our Journey
              </h2>
              <p className="text-zinc-600">
                We're just getting started on our mission to revolutionize online fashion shopping. Join us and
                experience the future of clothes shopping today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/virtual-tryon">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    Try It Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-purple-200 hover:bg-purple-50 transition-all duration-300"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">DrapeMe</h3>
              <p className="text-purple-200 text-sm">Virtual try-on technology for a better shopping experience.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products/tshirts" className="text-purple-200 hover:text-white transition-colors">
                    T-shirts
                  </Link>
                </li>
                <li>
                  <Link href="/products/shirts" className="text-purple-200 hover:text-white transition-colors">
                    Shirts
                  </Link>
                </li>
                <li>
                  <Link href="/products/hoodies" className="text-purple-200 hover:text-white transition-colors">
                    Hoodies
                  </Link>
                </li>
                <li>
                  <Link href="/products/jackets" className="text-purple-200 hover:text-white transition-colors">
                    Jackets
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-purple-200 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-purple-200 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </Link>
                <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-purple-200">© 2024 DrapeMe. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Link className="text-xs text-purple-200 hover:text-white transition-colors" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs text-purple-200 hover:text-white transition-colors" href="#">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <AiChat />
    </div>
  )
}
