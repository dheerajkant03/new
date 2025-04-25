"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock product data - in a real app, this would come from a database or API
const allProducts = [
  {
    id: 1,
    name: "Classic Crew Neck T-shirt",
    price: 899,
    image: "/1.png?height=600&width=500",
    category: "tshirts",
    color: "Black",
    description:
      "Our classic crew neck t-shirt offers timeless style and exceptional comfort. Made from 100% organic cotton with just the right amount of stretch, this t-shirt provides a perfect fit that moves with you throughout the day. The rich black color offers versatile styling options for any outfit.",
    details: ["100% Organic Cotton", "Regular fit", "Crew neck", "Short sleeves", "Machine washable at 30°C"],
    sizing: "The model is 6'1\" and wears size M",
  },
  {
    id: 2,
    name: "Graphic Print T-shirt",
    price: 1099,
    image: "/2.png?height=600&width=500",
    category: "tshirts",
    color: "White",
    description:
      "Express your unique style with our eye-catching graphic print t-shirt. The crisp white background makes the custom artwork pop, while the premium cotton fabric ensures all-day comfort and durability. A statement piece that pairs perfectly with jeans or shorts.",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Custom graphic print", "Machine washable at 30°C"],
    sizing: "The model is 6'0\" and wears size L",
  },
  {
    id: 3,
    name: "Oversized Cotton T-shirt",
    price: 1299,
    image: "/3.png?height=600&width=500",
    category: "tshirts",
    color: "Grey",
    description:
      "Embrace relaxed style with our oversized cotton t-shirt in a versatile grey tone. The roomy silhouette offers effortless comfort while the premium cotton fabric provides a soft feel against your skin. Perfect for creating that coveted laid-back look.",
    details: ["100% Premium Cotton", "Oversized fit", "Dropped shoulders", "Reinforced neckline", "Machine washable at 30°C"],
    sizing: "The model is 5'11\" and wears size M (oversized fit)",
  },
  {
    id: 4,
    name: "Striped Casual T-shirt",
    price: 999,
    image: "/4.png?height=600&width=500",
    category: "tshirts",
    color: "Blue/White",
    description:
      "Add a nautical touch to your wardrobe with our blue and white striped casual t-shirt. The classic horizontal stripe pattern creates a fresh, timeless look while the breathable cotton blend keeps you comfortable all day long. Perfect for summer days or layering year-round.",
    details: ["95% Cotton, 5% Elastane", "Regular fit", "Crew neck", "Horizontal stripe pattern", "Machine washable at 30°C"],
    sizing: "The model is 6'0\" and wears size M",
  },
  {
    id: 5,
    name: "Pocket Detail T-shirt",
    price: 1199,
    image: "/5.png?height=600&width=500",
    category: "tshirts",
    color: "Navy",
    description:
      "Our navy pocket detail t-shirt combines classic style with practical design. The deep navy color creates a sophisticated look, while the chest pocket adds functional style. Crafted from soft cotton jersey for exceptional comfort and durability throughout the day.",
    details: ["100% Cotton jersey", "Regular fit", "Crew neck", "Chest pocket", "Reinforced seams", "Machine washable at 30°C"],
    sizing: "The model is 6'2\" and wears size L",
  },
  {
    id: 6,
    name: "V-Neck Basic T-shirt",
    price: 799,
    image: "/6.png?height=600&width=500",
    category: "tshirts",
    color: "Maroon",
    description:
      "Our maroon V-neck t-shirt offers a flattering neckline and rich color that complements any skin tone. Made from lightweight cotton with a touch of stretch, this versatile basic provides both comfort and style for everyday wear.",
    details: ["95% Cotton, 5% Elastane", "Regular fit", "V-neck", "Short sleeves", "Machine washable at 30°C"],
    sizing: "The model is 5'10\" and wears size M",
  },
  {
    id: 7,
    name: "Long Sleeve T-shirt",
    price: 1399,
    image: "/7.png?height=600&width=500",
    category: "tshirts",
    color: "Olive",
    description:
      "Our olive long sleeve t-shirt provides extra coverage without sacrificing style. The earthy olive tone works perfectly with both casual and smart-casual outfits. Crafted from breathable cotton with a soft finish, it's comfortable enough for all-day wear in any season.",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Long sleeves", "Ribbed cuffs", "Machine washable at 30°C"],
    sizing: "The model is 6'1\" and wears size M",
  },
  {
    id: 8,
    name: "Henley Neck T-shirt",
    price: 1299,
    image: "/8.png?height=600&width=500",
    category: "tshirts",
    color: "Orange",
    description:
      "Make a bold statement with our vibrant orange henley neck t-shirt. The distinctive button placket adds character while the soft cotton fabric ensures maximum comfort. The eye-catching color adds energy to your casual wardrobe.",
    details: ["100% Cotton", "Regular fit", "Henley neck with button placket", "Short sleeves", "Machine washable at 30°C"],
    sizing: "The model is 5'11\" and wears size M",
  },
  {
    id: 9,
    name: "Oxford Button-Down Shirt",
    price: 1899,
    image: "/9.png?height=600&width=500",
    category: "shirts",
    color: "White",
    description:
      "This versatile white button-down shirt is crafted from premium cotton Oxford cloth for breathable comfort. With its clean lines and tailored fit, it transitions seamlessly from casual to formal occasions. The crisp white color offers timeless elegance for any setting.",
    details: [
      "100% Cotton Oxford cloth",
      "Regular fit",
      "Button-down collar",
      "Chest pocket",
      "Machine washable at 40°C",
    ],
    sizing: "The model is 5'11\" and wears size M",
  },
  {
    id: 10,
    name: "Linen Casual Shirt",
    price: 2099,
    image: "/10.png?height=600&width=500",
    category: "shirts",
    color: "Beige",
    description:
      "Stay cool and stylish with our beige linen casual shirt. The natural linen fabric is perfect for warm weather, offering exceptional breathability and a relaxed drape. The neutral beige tone complements any outfit while providing that effortless summer look.",
    details: [
      "100% Linen",
      "Relaxed fit",
      "Button front",
      "Spread collar",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 6'0\" and wears size M",
  },
  {
    id: 11,
    name: "Denim Shirt",
    price: 2299,
    image: "/11.png?height=600&width=500",
    category: "shirts",
    color: "Light Blue",
    description:
      "Our light blue denim shirt combines casual style with rugged durability. Made from premium cotton denim with a gentle wash for immediate comfort, this versatile piece works equally well as a standalone shirt or lightweight jacket. The classic light blue shade adds a fresh dimension to any outfit.",
    details: [
      "100% Cotton denim",
      "Regular fit",
      "Button front",
      "Dual chest pockets",
      "Machine washable at 40°C",
    ],
    sizing: "The model is 6'1\" and wears size L",
  },
  {
    id: 12,
    name: "Flannel Check Shirt",
    price: 1999,
    image: "/12.png?height=600&width=500",
    category: "shirts",
    color: "Red/Black",
    description:
      "Embrace classic rugged style with our red and black check flannel shirt. The brushed cotton fabric provides exceptional warmth and softness while the iconic plaid pattern adds timeless character. Perfect for casual outings or layering during cooler months.",
    details: [
      "100% Brushed cotton",
      "Regular fit",
      "Button front",
      "Point collar",
      "Chest pockets",
      "Machine washable at 40°C",
    ],
    sizing: "The model is 6'0\" and wears size M",
  },
  {
    id: 13,
    name: "Mandarin Collar Shirt",
    price: 1799,
    image: "/13.png?height=600&width=500",
    category: "shirts",
    color: "Black",
    description:
      "Our black mandarin collar shirt offers a contemporary twist on a classic design. The clean lines and minimalist aesthetic create a sophisticated silhouette, while the premium cotton fabric ensures lasting comfort. The deep black color adds versatility for both casual and formal settings.",
    details: [
      "100% Cotton",
      "Slim fit",
      "Mandarin collar",
      "Concealed button placket",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 5'10\" and wears size M",
  },
  {
    id: 14,
    name: "Cuban Collar Shirt",
    price: 2199,
    image: "/14.png?height=600&width=500",
    category: "shirts",
    color: "Teal",
    description:
      "Make a stylish statement with our teal Cuban collar shirt. The vibrant color and relaxed open collar create a vacation-ready look, while the lightweight fabric ensures you stay cool in warm weather. Perfect for summer parties or casual weekend events.",
    details: [
      "55% Linen, 45% Cotton",
      "Relaxed fit",
      "Cuban collar",
      "Short sleeves",
      "Straight hem",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 6'0\" and wears size M",
  },
  {
    id: 15,
    name: "Formal Dress Shirt",
    price: 2499,
    image: "/15.png?height=600&width=500",
    category: "shirts",
    color: "Light Blue",
    description:
      "Elevate your formal attire with our light blue dress shirt. Crafted from premium two-ply cotton with a subtle sheen, this shirt provides a polished look for business or special occasions. The light blue tone offers a fresh alternative to traditional white while maintaining professional versatility.",
    details: [
      "100% Two-ply cotton",
      "Slim fit",
      "Spread collar",
      "French cuffs",
      "Machine washable at 40°C",
    ],
    sizing: "The model is 6'1\" and wears size M",
  },
  {
    id: 16,
    name: "Printed Resort Shirt",
    price: 1899,
    image: "/16.png?height=600&width=500",
    category: "shirts",
    color: "Multicolor",
    description:
      "Bring vacation vibes to your wardrobe with our multicolor printed resort shirt. Featuring a bold, eye-catching pattern on lightweight fabric, this shirt is perfect for summer parties or casual outings. The vibrant colors create a cheerful aesthetic that pairs well with simple bottoms.",
    details: [
      "100% Viscose",
      "Relaxed fit",
      "Camp collar",
      "Short sleeves",
      "Straight hem",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 5'11\" and wears size M",
  },
  {
    id: 17,
    name: "Pullover Hoodie",
    price: 2499,
    image: "/17.png?height=600&width=500",
    category: "hoodies",
    color: "Grey",
    description:
      "Our essential grey pullover hoodie is made from soft, heavyweight cotton blend for everyday comfort. The classic fit and durable construction ensure this hoodie will be a staple in your wardrobe for years to come. The versatile grey tone pairs easily with any casual outfit.",
    details: [
      "80% Cotton, 20% Polyester",
      "Regular fit",
      "Drawstring hood",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 6'0\" and wears size L",
  },
  {
    id: 18,
    name: "Zip-Up Hoodie",
    price: 2699,
    image: "/18.png?height=600&width=500",
    category: "hoodies",
    color: "Black",
    description:
      "Our black zip-up hoodie offers versatile styling options with premium comfort. The full-length zipper provides adaptable coverage while the plush cotton blend interior ensures warmth without bulk. The classic black color creates a sleek look that coordinates with any casual outfit.",
    details: [
      "70% Cotton, 30% Polyester",
      "Regular fit",
      "Full zip closure",
      "Drawstring hood",
      "Split kangaroo pockets",
      "Ribbed cuffs and hem",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 6'1\" and wears size M",
  },
  {
    id: 19,
    name: "Oversized Graphic Hoodie",
    price: 2899,
    image: "/19.png?height=600&width=500",
    category: "hoodies",
    color: "Purple",
    description:
      "Make a bold statement with our oversized purple graphic hoodie. The vibrant color and eye-catching design create a standout piece, while the roomy silhouette offers contemporary street style appeal. The soft fleece interior provides exceptional comfort for all-day wear.",
    details: [
      "80% Cotton, 20% Polyester",
      "Oversized fit",
      "Drawstring hood",
      "Custom graphic print",
      "Kangaroo pocket",
      "Dropped shoulders",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 5'11\" and wears size M (oversized fit)",
  },
  {
    id: 20,
    name: "Cropped Hoodie",
    price: 2299,
    image: "/20.png?height=600&width=500",
    category: "hoodies",
    color: "Pink",
    description:
      "Update your casual collection with our pink cropped hoodie. The shortened length creates a modern silhouette that pairs perfectly with high-waisted bottoms. The soft pink color adds a feminine touch while the cozy cotton blend fabric ensures comfort throughout the day.",
    details: [
      "80% Cotton, 20% Polyester",
      "Cropped length",
      "Relaxed fit",
      "Drawstring hood",
      "Kangaroo pocket",
      "Raw-cut hem",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 5'8\" and wears size S",
  },
  {
    id: 21,
    name: "Color Block Hoodie",
    price: 2599,
    image: "/21.png?height=600&width=500",
    category: "hoodies",
    color: "Blue/White",
    description:
      "Add visual interest to your casual wardrobe with our blue and white color block hoodie. The contrasting panels create a fresh, athletic aesthetic while the premium cotton blend provides exceptional comfort and warmth. A perfect combination of style and functionality.",
    details: [
      "80% Cotton, 20% Polyester",
      "Regular fit",
      "Drawstring hood",
      "Contrasting panels",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 6'0\" and wears size M",
  },
  {
    id: 22,
    name: "Sleeveless Hoodie",
    price: 1999,
    image: "/22.png?height=600&width=500",
    category: "hoodies",
    color: "Charcoal",
    description:
      "Our charcoal sleeveless hoodie is perfect for layering or training. The armhole design provides unrestricted movement while the deep charcoal color creates a sleek, urban look. Made from breathable cotton blend fabric for comfort during workouts or casual wear.",
    details: [
      "60% Cotton, 40% Polyester",
      "Regular fit",
      "Drawstring hood",
      "Sleeveless design",
      "Split kangaroo pocket",
      "Machine washable at 40°C",
    ],
    sizing: "The model is 6'2\" and wears size L",
  },
  {
    id: 23,
    name: "Lightweight Summer Hoodie",
    price: 2199,
    image: "/23.png?height=600&width=500",
    category: "hoodies",
    color: "Mint",
    description:
      "Stay comfortable on cool summer evenings with our mint lightweight hoodie. The refreshing color adds a seasonal pop to your wardrobe, while the thin cotton fabric provides just enough warmth without overheating. Perfect for beach nights or casual evening outings.",
    details: [
      "100% Cotton",
      "Regular fit",
      "Drawstring hood",
      "Kangaroo pocket",
      "Lightweight fabric",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 5'10\" and wears size M",
  },
  {
    id: 24,
    name: "Embroidered Logo Hoodie",
    price: 2799,
    image: "/24.png?height=600&width=500",
    category: "hoodies",
    color: "Burgundy",
    description:
      "Elevate your casual style with our burgundy embroidered logo hoodie. The rich, deep red tone creates a sophisticated look while the subtle embroidered detail adds premium character. Crafted from high-quality cotton blend for exceptional softness and durability.",
    details: [
      "80% Cotton, 20% Polyester",
      "Regular fit",
      "Drawstring hood",
      "Embroidered logo detail",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 6'0\" and wears size M",
  },
  {
    id: 25,
    name: "Denim Jacket",
    price: 3499,
    image: "/25.png?height=600&width=500",
    category: "jackets",
    color: "Blue",
    description:
      "A timeless blue denim jacket that never goes out of style. Made from premium denim with a comfortable fit, this jacket is perfect for layering in any season. The classic blue wash offers versatile styling options while the durable construction ensures years of wear.",
    details: [
      "100% Cotton denim",
      "Regular fit",
      "Button closure",
      "Chest and side pockets",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 5'10\" and wears size M",
  },
  {
    id: 26,
    name: "Bomber Jacket",
    price: 3999,
    image: "/26.png?height=600&width=500",
    category: "jackets",
    color: "Olive",
    description:
      "Our olive bomber jacket combines military-inspired design with modern style. The versatile olive green color creates an effortlessly cool look while the lightweight construction makes it perfect for transitional weather. Features include ribbed trims and a signature sleeve pocket.",
    details: [
      "100% Polyester shell",
      "100% Polyester lining",
      "Regular fit",
      "Ribbed collar, cuffs and hem",
      "Zip closure",
      "Multiple pockets",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 6'1\" and wears size L",
  },
  {
    id: 27,
    name: "Windbreaker",
    price: 2999,
    image: "/27.png?height=600&width=500",
    category: "jackets",
    color: "Red",
    description:
      "Shield yourself from the elements in style with our bright red windbreaker. The water-resistant fabric provides protection from light rain while the vibrant color ensures you stand out from the crowd. Lightweight and packable, it's perfect for unpredictable weather.",
    details: [
      "100% Polyester",
      "Regular fit",
      "Water-resistant",
      "Full zip with storm flap",
      "Adjustable hood",
      "Elastic cuffs",
      "Packable design",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 5'11\" and wears size M",
  },
  {
    id: 28,
    name: "Puffer Jacket",
    price: 4499,
    image: "/28.png?height=600&width=500",
    category: "jackets",
    color: "Black",
    description:
      "Stay warm without sacrificing style in our black puffer jacket. The quilted design with synthetic fill provides exceptional insulation while the sleek black finish creates a versatile, modern look. Perfect for cold weather with a lightweight feel that doesn't restrict movement.",
    details: [
      "100% Polyester shell",
      "Synthetic fill",
      "Regular fit",
      "Front zip closure",
      "Stand collar",
      "Side zip pockets",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 6'0\" and wears size M",
  },
  {
    id: 29,
    name: "Track Jacket",
    price: 2799,
    image: "/29.png?height=600&width=500",
    category: "jackets",
    color: "Navy/White",
    description:
      "Our navy and white track jacket combines retro athletic style with modern comfort. The contrasting white stripes against the deep navy background create a classic sporty look while the lightweight fabric allows for easy movement. Perfect for warm-ups or casual street style.",
    details: [
      "90% Polyester, 10% Elastane",
      "Regular fit",
      "Full zip closure",
      "Stand collar",
      "Contrast stripe detail",
      "Side pockets",
      "Elastic cuffs and hem",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 5'10\" and wears size M",
  },
  {
    id: 30,
    name: "Varsity Jacket",
    price: 3799,
    image: "/30.png?height=600&width=500",
    category: "jackets",
    color: "Maroon/White",
    description:
      "Channel classic collegiate style with our maroon and white varsity jacket. The premium wool-blend body with contrasting white sleeves creates an authentic varsity look. The rich maroon color adds a touch of tradition while modern details ensure contemporary appeal.",
    details: [
      "Wool-blend body",
      "Synthetic leather sleeves",
      "Regular fit",
      "Snap button closure",
      "Ribbed collar, cuffs and hem",
      "Welt pockets",
      "Dry clean only",
    ],
    sizing: "The model is 6'0\" and wears size L",
  },
  {
    id: 31,
    name: "Lightweight Jacket",
    price: 2899,
    image: "/31.png?height=600&width=500",
    category: "jackets",
    color: "Khaki",
    description:
      "Our khaki lightweight jacket offers versatile style for transitional weather. The clean lines and minimal design create a timeless silhouette while the neutral khaki color pairs effortlessly with any outfit. The lightweight construction makes it perfect for layering.",
    details: [
      "100% Cotton",
      "Regular fit",
      "Zip closure with snap button placket",
      "Stand collar",
      "Multiple pockets",
      "Adjustable cuffs",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 5'11\" and wears size M",
  },
  {
    id: 32,
    name: "Trucker Jacket",
    price: 3299,
    image: "/32.png?height=600&width=500",
    category: "jackets",
    color: "Washed Black",
    description:
      "Our washed black trucker jacket offers an edgy take on a classic silhouette. The faded black finish creates a vintage look with modern appeal, while the durable denim construction ensures lasting quality. Versatile enough to pair with almost any casual outfit.",
    details: [
      "100% Cotton denim",
      "Regular fit",
      "Button closure",
      "Point collar",
      "Chest flap pockets",
      "Side welt pockets",
      "Adjustable waist tabs",
      "Machine washable at 30°C",
    ],
    sizing: "The model is 6'1\" and wears size L",
  },
];

export default function ProductPage({ params }) {
  const productId = Number.parseInt(params.id)
  const product = allProducts.find((p) => p.id === productId) || allProducts[0]

  const [selectedSize, setSelectedSize] = useState("M")
  const [isWishlisted, setIsWishlisted] = useState(false)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
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
        </nav>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-medium mb-6 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex justify-center">
              <div className="relative aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-purple-600 font-medium mb-1">{product.category.toUpperCase()}</div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-xl font-medium mt-2">₹{product.price}</p>
                  <div className="flex items-center mt-2">
                    <div className="w-6 h-6 rounded-full bg-black mr-2 border border-gray-300"></div>
                    <span className="text-sm">{product.color}</span>
                  </div>
                </div>

                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-purple-100/50">
                    <TabsTrigger
                      value="description"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="details"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                    >
                      Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="sizing"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                    >
                      Sizing
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="pt-4">
                    <p className="text-zinc-600">{product.description}</p>
                  </TabsContent>
                  <TabsContent value="details" className="pt-4">
                    <ul className="space-y-2">
                      {product.details.map((detail, index) => (
                        <li key={index} className="flex items-center text-zinc-600">
                          <span className="mr-2 text-purple-600">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="sizing" className="pt-4">
                    <p className="text-zinc-600 mb-2">{product.sizing}</p>
                    <p className="text-zinc-600">
                      For the best fit, we recommend using our smart size recommendation feature in the virtual try-on
                      section.
                    </p>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <h2 className="font-medium">Size</h2>
                  <div className="flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className={`h-10 px-4 ${selectedSize === size ? "bg-gradient-to-r from-purple-600 to-pink-600" : "border-purple-200 hover:bg-purple-50"}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="pt-4 space-y-4">
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg">
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-200 hover:bg-purple-50 transition-all duration-300"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? "fill-pink-500 text-pink-500" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-200 hover:bg-purple-50 transition-all duration-300"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                  <Link href={`/virtual-tryon?productId=${product.id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-purple-200 hover:bg-purple-50 transition-all duration-300"
                    >
                      Try On Virtually
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allProducts
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-sm truncate">{relatedProduct.name}</h3>
                      <p className="text-sm">₹{relatedProduct.price}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
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