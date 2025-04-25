"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"

// Mock product data with INR pricing and more items
const products = {
  tshirts: [
    {
      id: 1,
      name: "Classic Crew Neck T-shirt",
      price: 899,
      image: "/1.png?height=400&width=300",
      color: "Black",
    },
    {
      id: 2,
      name: "Graphic Print T-shirt",
      price: 1099,
      image: "/2.png?height=400&width=300",
      color: "White",
    },
    {
      id: 3,
      name: "Oversized Cotton T-shirt",
      price: 1299,
      image: "/3.png?height=400&width=300",
      color: "Grey",
    },
    {
      id: 4,
      name: "Striped Casual T-shirt",
      price: 999,
      image: "/4.png?height=400&width=300",
      color: "Blue/White",
    },
    {
      id: 5,
      name: "Pocket Detail T-shirt",
      price: 1199,
      image: "/5.png?height=400&width=300",
      color: "Navy",
    },
    {
      id: 6,
      name: "V-Neck Basic T-shirt",
      price: 799,
      image: "/6.png?height=400&width=300",
      color: "Maroon",
    },
    { id: 7,
       name: "Long Sleeve T-shirt",
       price: 1399,
        image: "/7.png?height=400&width=300",
         color: "Olive" 
        },
    { id: 8, 
      name: "Henley Neck T-shirt", 
      price: 1299, image: "/8.png?height=400&width=300",
       color: "Orange" 
      },
  ],
  shirts: [
    {
      id: 9,
      name: "Oxford Button-Down Shirt",
      price: 1899,
      image: "/9.png?height=400&width=300",
      color: "White",
    },
    { id: 10, 
      name: "Linen Casual Shirt", 
      price: 2099, image: "/10.png?height=400&width=300", color: "Beige" },
    { id: 11, name: "Denim Shirt",
       price: 2299, image: "/11.png?height=400&width=300", color: "Light Blue" },
    {
      id: 12,
      name: "Flannel Check Shirt",
      price: 1999,
      image: "/12.png?height=400&width=300",
      color: "Red/Black",
    },
    {
      id: 13,
      name: "Mandarin Collar Shirt",
      price: 1799,
      image: "/13.png?height=400&width=300",
      color: "Black",
    },
    { id: 14, name: "Cuban Collar Shirt",
       price: 2199, image: "/14.png?height=400&width=300", color: "Teal" },
    {
      id: 15,
      name: "Formal Dress Shirt",
      price: 2499,
      image: "/15.png?height=400&width=300",
      color: "Light Blue",
    },
    {
      id: 16,
      name: "Printed Resort Shirt",
      price: 1899,
      image: "/16.png?height=400&width=300",
      color: "Multicolor",
    },
  ],
  hoodies: [
    { id: 17, name: "Pullover Hoodie",
       price: 2499, 
       image: "/17.png?height=400&width=300",
        color: "Grey" },
    { id: 18, name: "Zip-Up Hoodie",
       price: 2699, image: "/18.png?height=400&width=300", color: "Black" },
    {
      id: 19,
      name: "Oversized Graphic Hoodie",
      price: 2899,
      image: "/19.png?height=400&width=300",
      color: "Purple",
    },
    { id: 20, name: "Cropped Hoodie",
       price: 2299, image: "/20.png?height=400&width=300", color: "Pink" },
    {
      id: 21,
      name: "Color Block Hoodie",
      price: 2599,
      image: "/21.png?height=400&width=300",
      color: "Blue/White",
    },
    {
      id: 22,
      name: "Sleeveless Hoodie",
      price: 1999,
      image: "/22.png?height=400&width=300",
      color: "Charcoal",
    },
    {
      id: 23,
      name: "Lightweight Summer Hoodie",
      price: 2199,
      image: "/23.png?height=400&width=300",
      color: "Mint",
    },
    {
      id: 24,
      name: "Embroidered Logo Hoodie",
      price: 2799,
      image: "/24.png?height=400&width=300",
      color: "Burgundy",
    },
  ],
  jackets: [
    { id: 25, name: "Denim Jacket",
       price: 3499, image: "/25.png?height=400&width=300", color: "Blue" },
    { id: 26, name: "Bomber Jacket",
       price: 3999, image: "/26.png?height=400&width=300", color: "Olive" },
    { id: 27, name: "Windbreaker",
       price: 2999, image: "/27.png?height=400&width=300", color: "Red" },
    { id: 28, name: "Puffer Jacket",
       price: 4499, image: "/28.png?height=400&width=300", color: "Black" },
    { id: 29, name: "Track Jacket",
       price: 2799, image: "/29.png?height=400&width=300", color: "Navy/White" },
    {
      id: 30,
      name: "Varsity Jacket",
      price: 3799,
      image: "/30.png?height=400&width=300",
      color: "Maroon/White",
    },
    { id: 31, name: "Lightweight Jacket",
       price: 2899, image: "/31.png?height=400&width=300", color: "Khaki" },
    {
      id: 32,
      name: "Trucker Jacket",
      price: 3299,
      image: "/32.png?height=400&width=300",
      color: "Washed Black",
    },
  ],
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState({
    tshirts: products.tshirts,
    shirts: products.shirts,
    hoodies: products.hoodies,
    jackets: products.jackets,
  })

  useEffect(() => {
    if (searchTerm) {
      const filtered = {
        tshirts: products.tshirts.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.color.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
        shirts: products.shirts.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.color.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
        hoodies: products.hoodies.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.color.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
        jackets: products.jackets.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.color.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      }
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [searchTerm])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

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
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
            >
              Shop Our Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[700px] text-zinc-500 md:text-xl/relaxed"
            >
              Browse our unisex clothing collection and find your perfect style
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
              <Input
                placeholder="Search by name or color..."
                className="pl-10 border-purple-200 focus:border-purple-400 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-purple-100/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="tshirts"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                T-Shirts
              </TabsTrigger>
              <TabsTrigger
                value="shirts"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                Shirts
              </TabsTrigger>
              <TabsTrigger
                value="hoodies"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                Hoodies
              </TabsTrigger>
              <TabsTrigger
                value="jackets"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                Jackets
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {[
                  ...filteredProducts.tshirts,
                  ...filteredProducts.shirts,
                  ...filteredProducts.hoodies,
                  ...filteredProducts.jackets,
                ].map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="tshirts">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredProducts.tshirts.map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="shirts">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredProducts.shirts.map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="hoodies">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredProducts.hoodies.map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="jackets">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredProducts.jackets.map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
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
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-purple-200 hover:text-white transition-colors">
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
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-purple-100">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={product.image || "/.png"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-110 duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm font-medium">{product.color}</p>
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="space-y-1 mb-2 w-full">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm font-medium">₹{product.price}</p>
        </div>
        <div className="flex gap-2 w-full">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-purple-200 hover:bg-purple-50 transition-all duration-300"
            >
              View
            </Button>
          </Link>
          <Link href={`/virtual-tryon?productId=${product.id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              Try On
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
