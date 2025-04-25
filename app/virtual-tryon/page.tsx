"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {Upload,ArrowLeft,Share2,ThumbsUp,Download,Sparkles,MessageCircle,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Mock product data with local image paths
const allProducts = {
    tshirts: [
      { id: 1, name: "Classic Crew Neck T-shirt", price: 899, image: "/1.png", color: "Black", category: "tshirts" },
      { id: 2, name: "Graphic Print T-shirt", price: 1099, image: "/2.png", color: "White", category: "tshirts" },
      { id: 3, name: "Oversized Cotton T-shirt", price: 1299, image: "/3.png", color: "Grey", category: "tshirts" },
      { id: 4, name: "Striped Casual T-shirt", price: 999, image: "/4.png", color: "Blue/White", category: "tshirts" },
      { id: 5, name: "Pocket Detail T-shirt", price: 1199, image: "/5.png", color: "Navy", category: "tshirts" },
      { id: 6, name: "V-Neck Basic T-shirt", price: 799, image: "/6.png", color: "Maroon", category: "tshirts" },
      { id: 7, name: "Long Sleeve T-shirt", price: 1399, image: "/7.png", color: "Olive", category: "tshirts" },
      { id: 8, name: "Henley Neck T-shirt", price: 1299, image: "/8.png", color: "Rust", category: "tshirts" },
    ],
    shirts: [
      { id: 9, name: "Oxford Button-Down Shirt", price: 1899, image: "/9.png", color: "White", category: "shirts" },
      { id: 10, name: "Linen Casual Shirt", price: 2099, image: "/10.png", color: "Beige", category: "shirts" },
      { id: 11, name: "Denim Shirt", price: 2299, image: "/11.png", color: "Light Blue", category: "shirts" },
      { id: 12, name: "Flannel Check Shirt", price: 1999, image: "/12.png", color: "Red/Black", category: "shirts" },
      { id: 13, name: "Mandarin Collar Shirt", price: 1799, image: "/13.png", color: "Black", category: "shirts" },
      { id: 14, name: "Cuban Collar Shirt", price: 2199, image: "/14.png", color: "Teal", category: "shirts" },
      { id: 15, name: "Formal Dress Shirt", price: 2499, image: "/15.png", color: "Light Blue", category: "shirts" },
      { id: 16, name: "Printed Resort Shirt", price: 1899, image: "/16.png", color: "Multicolor", category: "shirts" },
    ],
    hoodies: [
      { id: 17, name: "Pullover Hoodie", price: 2499, image: "/17.png", color: "Grey", category: "hoodies" },
      { id: 18, name: "Zip-Up Hoodie", price: 2699, image: "/18.png", color: "Black", category: "hoodies" },
      { id: 19, name: "Oversized Graphic Hoodie", price: 2899, image: "/19.png", color: "Purple", category: "hoodies" },
      { id: 20, name: "Cropped Hoodie", price: 2299, image: "/20.png", color: "Pink", category: "hoodies" },
      { id: 21, name: "Color Block Hoodie", price: 2799, image: "/21.png", color: "Blue/White", category: "hoodies" },
      { id: 22, name: "Sleeveless Hoodie", price: 1999, image: "/22.png", color: "Charcoal", category: "hoodies" },
      { id: 23, name: "Lightweight Summer Hoodie", price: 2199, image: "/23.png", color: "Mint", category: "hoodies" },
      { id: 24, name: "Embroidered Logo Hoodie", price: 2799, image: "/24.png", color: "Burgundy", category: "hoodies" },
    ],
    jackets: [
      { id: 25, name: "Denim Jacket", price: 3499, image: "/25.png", color: "Blue", category: "jackets" },
      { id: 26, name: "Bomber Jacket", price: 3999, image: "/26.png", color: "Olive", category: "jackets" },
      { id: 27, name: "Windbreaker", price: 2999, image: "/27.png", color: "Red", category: "jackets" },
      { id: 28, name: "Puffer Jacket", price: 4499, image: "/28.png", color: "Black", category: "jackets" },
      { id: 29, name: "Track Jacket", price: 2799, image: "/29.png", color: "Navy/White", category: "jackets" },
      { id: 30, name: "Varsity Jacket", price: 3799, image: "/30.png", color: "Maroon/White", category: "jackets" },
      { id: 31, name: "Old School Jacket", price: 2899, image: "/31.png", color: "Khaki", category: "jackets" },
      { id: 32, name: "Trucker Jacket", price: 3299, image: "/32.png", color: "Washed Black", category: "jackets" },
    ]
    
};

// Flatten all products into a single array
const flattenedProducts = [
  ...allProducts.tshirts,
  ...allProducts.shirts,
  ...allProducts.hoodies,
  ...allProducts.jackets,
];

const categoryMap = {
  tshirts: "tops",
  shirts: "tops",
  hoodies: "tops",
  jackets: "tops",
};

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  category: string;
}

export default function VirtualTryOnPage() {
  const searchParams = useSearchParams();
  const initialProductId = searchParams.get("productId")
    ? Number.parseInt(searchParams.get("productId") as string)
    : null;
  const initialProduct = initialProductId
    ? flattenedProducts.find((p) => p.id === initialProductId)
    : null;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialProduct);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [suggestedSize, setSuggestedSize] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(
    initialProduct ? initialProduct.category : "tshirts"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<{
    tshirts: Product[];
    shirts: Product[];
    hoodies: Product[];
    jackets: Product[];
  }>({
    tshirts: allProducts.tshirts,
    shirts: allProducts.shirts,
    hoodies: allProducts.hoodies,
    jackets: allProducts.jackets,
  });
  const [showSizeRecommendation, setShowSizeRecommendation] = useState(false);
  const [showOutfitSuggestions, setShowOutfitSuggestions] = useState(false);
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = {
        tshirts: allProducts.tshirts.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.color.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        shirts: allProducts.shirts.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.color.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        hoodies: allProducts.hoodies.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.color.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        jackets: allProducts.jackets.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.color.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      };
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchTerm]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setResultImage(null);
        setSuggestedSize(null);
        setShowSizeRecommendation(false);
        setShowOutfitSuggestions(false);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (image: string, publicId: string) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, publicId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to upload to Cloudinary');
      return data.url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !selectedProduct) {
      setError("Please select a product and upload an image.");
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    setError(null);

    try {
      // Step 1: Upload user image to Cloudinary via API route
      let userImageUrl;
      if (userImage.startsWith('data:')) {
        userImageUrl = await uploadToCloudinary(userImage, `user_image_${Date.now()}`);
        console.log('User image uploaded to Cloudinary:', userImageUrl);
      } else {
        userImageUrl = userImage; // Handle case where userImage is already a URL
      }

      // Step 2: Fetch the product image data first
      const productImageResponse = await fetch(selectedProduct.image);
      if (!productImageResponse.ok) {
        throw new Error(`Failed to fetch product image: ${productImageResponse.status}`);
      }

      // Convert the image to base64
      const productImageBlob = await productImageResponse.blob();
      const reader = new FileReader();
      const productImageBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(productImageBlob);
      });

      // Now upload the base64 data to Cloudinary
      const productImageUrl = await uploadToCloudinary(
        productImageBase64 as string,
        `product_image_${selectedProduct.id}_${Date.now()}`
      );
      console.log('Product image uploaded to Cloudinary:', productImageUrl);

      // Step 3: Prepare FormData for Fashn.ai API
      const formData = new FormData();
      formData.append('model_image', userImageUrl);
      formData.append('garment_image', productImageUrl);
      const category = categoryMap[selectedProduct.category] || 'tops';
      formData.append('category', category);

      // Log FormData for debugging
      for (const pair of formData.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
      }

      // Step 4: Simulate progress
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 300);

      console.log("formData:", formData);

      // Step 5: Send request to Fashn.ai API
      console.log('Sending request to Fashn.ai API...');
      const runRes = await fetch('https://api.fashn.ai/v1/run', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer fa-RjT0FkWtCPpT-XrTAldBRBENe5olmlBmxN4q3',
        },
        body: JSON.stringify({
          model_image: userImageUrl,
          garment_image: productImageUrl,
          category: category
        }),
      });

      console.log('Fashn.ai response status:', runRes.status);

      if (!runRes.ok) {
        let errorMessage;
        try {
          const errorData = await runRes.json();
          console.error('Model API error response:', errorData);
          errorMessage = errorData.message || `Fashn.ai API error: ${runRes.status} ${runRes.statusText}`;
        } catch (e) {
          const errorText = await runRes.text();
          console.error('Fashn.ai API error text:', errorText);
          errorMessage = `Model API error: ${runRes.status} ${runRes.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const responseData = await runRes.json();
      console.log('Fashn.ai API response:', responseData);

      const { id } = responseData;
      if (!id) throw new Error('No job ID returned from Fashn.ai API');

      // Step 6: Poll Fashn.ai status
      let resultImageUrl = null;
      let attempts = 0;
      const maxAttempts = 20;

      // Exponential backoff approach
      let backoffTime = 2000; // Start with 200ms
      const maxBackoff = 10000; // Max 2 seconds between attempts

      while (attempts < maxAttempts && !resultImageUrl) {
        attempts++;
        console.log(`Polling attempt ${attempts} with backoff ${backoffTime}ms...`);
        await new Promise((res) => setTimeout(res, backoffTime));
        backoffTime = Math.min(backoffTime * 1.5, maxBackoff);
      
        const statusRes = await fetch(`https://api.fashn.ai/v1/status/${id}`, {
          headers: {
            Authorization: 'Bearer fa-RjT0FkWtCPpT-XrTAldBRBENe5olmlBmxN4q3',
          },
        });
      
        if (!statusRes.ok) {
          console.warn(`Fashn.ai status check failed (attempt ${attempts}): ${statusRes.status}`);
          if (attempts >= maxAttempts) {
            throw new Error('Max attempts reached with failed status checks');
          }
          continue;
        }
      
        const statusData = await statusRes.json();
        if (statusData.status === 'completed' && statusData.output?.length > 0) {
          resultImageUrl = statusData.output[0];
        } else if (statusData.error) {
          console.error(`Task failed: ${statusData.error}`);
          break;
        }
      }

      clearInterval(interval);
      setProcessingProgress(100);

      if (!resultImageUrl) {
        throw new Error('Model processing took too long. Please try again.');
      }

      setResultImage(resultImageUrl);

      // Step 7: Suggest size (mock implementation)
      const sizes = ['M', 'L', 'XL'];
      setSuggestedSize(sizes[Math.floor(Math.random() * sizes.length)]);
      setShowSizeRecommendation(true);
    } catch (err) {
      console.error('Try-On Error:', err);
      setError(err.message || 'Failed to process virtual try-on. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    if (!resultImage) return;
    try {
      await navigator.clipboard.writeText(resultImage);
      alert("Image URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy URL:", error);
      alert("Failed to copy URL. Please try again.");
    }
  };

  const handleDownload = async () => {
    if (!resultImage || !selectedProduct) return;
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedProduct.name}-try-on.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  const showOutfitSuggestion = () => {
    setShowOutfitSuggestions(true);
  };

  const resetAll = () => {
    setUserImage(null);
    setResultImage(null);
    setSelectedProduct(null);
    setSuggestedSize(null);
    setShowSizeRecommendation(false);
    setShowOutfitSuggestions(false);
    setLikes(0);
    setError(null);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

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
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-medium mb-6 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Virtual Try-On
            </h1>
            <p className="max-w-[700px] text-zinc-500 md:text-xl/relaxed">
              Upload your photo and see how our clothes look on you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Step 1: Select a Product</h2>
                  {selectedProduct && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProduct(null)}
                      className="text-purple-600"
                    >
                      Change
                    </Button>
                  )}
                </div>

                {selectedProduct ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-4 border p-4 rounded-lg bg-white shadow-md"
                  >
                    <div className="relative w-20 h-24 overflow-hidden rounded-md">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedProduct.name}</h3>
                      <p className="text-sm text-zinc-500">₹{selectedProduct.price}</p>
                      <p className="text-sm text-zinc-500">{selectedProduct.color}</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="border rounded-lg p-4 bg-white shadow-md">
                    <div className="mb-4 flex">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button className="rounded-l-none bg-gradient-to-r from-purple-600 to-pink-600">
                        Search
                      </Button>
                    </div>

                    <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-4 bg-purple-100/50">
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
                      <TabsContent value="tshirts" className="mt-4 max-h-[300px] overflow-y-auto pr-2">
                        <motion.div
                          variants={container}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-2 gap-4"
                        >
                          {filteredProducts.tshirts.map((product) => (
                            <motion.div key={product.id} variants={item}>
                              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </TabsContent>
                      <TabsContent value="shirts" className="mt-4 max-h-[300px] overflow-y-auto pr-2">
                        <motion.div
                          variants={container}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-2 gap-4"
                        >
                          {filteredProducts.shirts.map((product) => (
                            <motion.div key={product.id} variants={item}>
                              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </TabsContent>
                      <TabsContent value="hoodies" className="mt-4 max-h-[300px] overflow-y-auto pr-2">
                        <motion.div
                          variants={container}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-2 gap-4"
                        >
                          {filteredProducts.hoodies.map((product) => (
                            <motion.div key={product.id} variants={item}>
                              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </TabsContent>
                      <TabsContent value="jackets" className="mt-4 max-h-[300px] overflow-y-auto pr-2">
                        <motion.div
                          variants={container}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-2 gap-4"
                        >
                          {filteredProducts.jackets.map((product) => (
                            <motion.div key={product.id} variants={item}>
                              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Step 2: Upload Your Photo</h2>
                  {userImage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUserImage(null)}
                      className="text-purple-600"
                    >
                      Change
                    </Button>
                  )}
                </div>
                <div className="border rounded-lg p-6 flex flex-col items-center justify-center bg-white shadow-md">
                  {userImage ? (
                    <div className="space-y-4 w-full">
                      <div className="relative aspect-[3/4] w-full max-w-[300px] mx-auto overflow-hidden rounded-lg shadow-md">
                        <Image
                          src={userImage || "/placeholder.svg"}
                          alt="Your uploaded photo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                          <Upload className="h-10 w-10 text-purple-500" />
                        </div>
                        <p className="text-sm text-zinc-500">Upload a full-body photo for best results</p>
                        <p className="text-xs text-zinc-400 mt-1">Supported formats: JPG, PNG (max 10MB)</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="user-photo" className="sr-only">
                          Choose a photo
                        </Label>
                        <input
                          id="user-photo"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-purple-200 hover:bg-purple-50 transition-all duration-300"
                        >
                          <label htmlFor="user-photo" className="cursor-pointer">
                            Choose a photo
                          </label>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={!selectedProduct || !userImage || isProcessing}
                  onClick={handleTryOn}
                >
                  {isProcessing ? "Processing..." : "Try On Now"}
                </Button>

                {isProcessing && (
                  <div className="mt-4">
                    <p className="text-sm text-center mb-2">Processing your image...</p>
                    <Progress
                      value={processingProgress}
                      className="h-2 bg-purple-100"
                      indicatorClassName="bg-gradient-to-r from-purple-600 to-pink-600"
                    />
                  </div>
                )}
                {error && (
                  <p className="mt-4 text-sm text-center text-red-600">{error}</p>
                )}
              </motion.div>
            </div>

            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold"
              >
                Result
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="border rounded-lg p-6 flex flex-col items-center justify-center min-h-[500px] bg-white shadow-md"
              >
                {resultImage ? (
                  <div className="space-y-4 w-full">
                    <div className="relative aspect-[3/4] w-full max-w-[300px] mx-auto overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={resultImage || "/placeholder.svg"}
                        alt="Virtual try-on result"
                        fill
                        className="object-cover"
                      />
                      {showSizeRecommendation && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                            Recommended Size: {suggestedSize}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-4">
                      <p className="text-center text-sm font-medium">
                        Here's how {selectedProduct?.name} looks on you!
                      </p>

                      <div className="flex justify-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                                onClick={() => setLikes(likes + 1)}
                              >
                                <ThumbsUp className="h-4 w-4 text-purple-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Like</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                                onClick={handleShare}
                              >
                                <Share2 className="h-4 w-4 text-purple-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share with friends</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" className="rounded-full">
                                <MessageCircle className="h-4 w-4 text-purple-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Get feedback</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                                onClick={handleDownload}
                              >
                                <Download className="h-4 w-4 text-purple-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download image</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {likes > 0 && (
                        <p className="text-center text-xs text-purple-600">
                          {likes} {likes === 1 ? "person likes" : "people like"} this look
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="border-purple-200 hover:bg-purple-50 transition-all duration-300"
                          onClick={resetAll}
                        >
                          Try Another
                        </Button>
                        <Link href={`/products/${selectedProduct?.id}`} className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                            Buy Now
                          </Button>
                        </Link>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-purple-200 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={showOutfitSuggestion}
                      >
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        Get Outfit Suggestions
                      </Button>
                    </div>

                    <AnimatePresence>
                      {showOutfitSuggestions && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t"
                        >
                          <h3 className="text-sm font-medium mb-3">Complete Your Look</h3>
                          <div className="grid grid-cols-3 gap-2">
                            {flattenedProducts
                              .filter((p) => p.category !== selectedProduct?.category)
                              .slice(0, 3)
                              .map((product) => (
                                <div key={product.id} className="text-center">
                                  <div className="relative aspect-square w-full overflow-hidden rounded-md mb-1">
                                    <Image
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <p className="text-xs truncate">{product.name}</p>
                                  <p className="text-xs font-medium">₹{product.price}</p>
                                </div>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="text-center text-zinc-500 flex flex-col items-center">
                    {isProcessing ? (
                      <div className="space-y-4">
                        <div className="relative w-40 h-40">
                          <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-opacity-25"></div>
                          <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
                        </div>
                        <p>Processing your image...</p>
                        <p className="text-sm text-zinc-400">This may take a few moments</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-40 h-40 rounded-full bg-purple-50 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-purple-300"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </div>
                        <div>
                          <p>Select a product and upload your photo to see the result</p>
                          <p className="text-sm text-zinc-400 mt-2">
                            Our AI will create a realistic preview of how the clothing will look on you
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center text-xs text-purple-600">
                          <Badge variant="outline" className="bg-purple-50 border-purple-200">
                            Realistic Visuals
                          </Badge>
                          <Badge variant="outline" className="bg-purple-50 border-purple-200">
                            Smart Size Recommendations
                          </Badge>
                          <Badge variant="outline" className="bg-purple-50 border-purple-200">
                            Outfit Suggestions
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100"
              >
                <h3 className="font-medium text-sm mb-2">Why Use Virtual Try-On?</h3>
                <ul className="space-y-2 text-sm text-zinc-600">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 text-purple-600">•</div>
                    <p>See exactly how clothes will look on your body before buying</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 text-purple-600">•</div>
                    <p>Get personalized size recommendations based on your body shape</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 text-purple-600">•</div>
                    <p>Share your virtual try-on with friends for feedback</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 text-purple-600">•</div>
                    <p>Reduce returns by making confident purchase decisions</p>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">DrapeMe</h3>
              <p className="text-purple-200 text-sm">
                Virtual try-on technology for a better shopping experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/products/tshirts"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    T-shirts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/shirts"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Shirts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/hoodies"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Hoodies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/jackets"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
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
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 border-purple-100 h-full"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-2">
          <h3 className="font-medium text-xs truncate">{product.name}</h3>
          <p className="text-xs text-zinc-500">₹{product.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}
