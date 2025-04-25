"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, X, Send, Bot } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample responses for the AI chatbot
const botResponses = {
  greeting: [
    "Hello! I'm your DrapeMe assistant. How can I help you today?",
    "Hi there! I'm here to help with any questions about our clothes or virtual try-on feature.",
    "Welcome to DrapeMe! I can help you find the perfect fit or answer any questions you have.",
  ],
  sizing: [
    "Our sizing is generally true to size. For shirts and jackets, we recommend going one size up from your usual t-shirt size for a comfortable fit.",
    "If you're between sizes, we recommend sizing up for a more comfortable fit. Our virtual try-on can help you visualize how different sizes might look on you.",
    "Based on your measurements, I'd recommend trying our size guide in the product details section for the most accurate fit.",
  ],
  fit: [
    "Our t-shirts have a regular fit that's true to size. Shirts and jackets tend to run slightly smaller, so consider sizing up.",
    "The fit depends on the specific item. T-shirts and hoodies are true to size, while shirts and jackets might require sizing up.",
    "You can use our virtual try-on feature to see exactly how the garment will fit on your body before purchasing.",
  ],
  tryon: [
    "Our virtual try-on technology uses AI to show how clothes will look on you. Simply upload a photo, select a garment, and see the result!",
    "The virtual try-on works best with a full-body photo taken against a plain background. Make sure you're standing straight with your arms slightly away from your body.",
    "After trying on virtually, you'll also get a size recommendation based on your body measurements that our AI detects.",
  ],
  returns: [
    "We offer a 30-day return policy for all unworn items with original tags attached. Returns are free for store credit, or ₹200 for refunds to original payment method.",
    "If you're not satisfied with your purchase, you can return it within 30 days. Please check our return policy page for more details.",
    "Virtual try-on helps reduce returns by showing you exactly how the clothes will look on you before purchasing!",
  ],
  shipping: [
    "We offer free shipping on orders over ₹1500. Standard shipping takes 3-5 business days, and express shipping (₹300) takes 1-2 business days.",
    "Shipping is available across India. Delivery typically takes 3-5 business days depending on your location.",
    "You can track your order through the link in your confirmation email or by logging into your account.",
  ],
  fallback: [
    "I'm not sure I understand. Could you rephrase your question about our clothes or virtual try-on feature?",
    "I don't have information on that specific topic. Can I help you with questions about our clothes, sizing, or the virtual try-on feature?",
    "I'm still learning! Could you ask about our clothes, sizing, virtual try-on, or shipping policies instead?",
  ],
}

// Helper function to get a random response from a category
const getRandomResponse = (category) => {
  const responses = botResponses[category] || botResponses.fallback
  return responses[Math.floor(Math.random() * responses.length)]
}

// Helper function to determine which category a message belongs to
const getCategoryFromMessage = (message) => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "greeting"
  } else if (
    lowerMessage.includes("size") ||
    lowerMessage.includes("measurement") ||
    lowerMessage.includes("large") ||
    lowerMessage.includes("small") ||
    lowerMessage.includes("medium") ||
    lowerMessage.includes("xl")
  ) {
    return "sizing"
  } else if (
    lowerMessage.includes("fit") ||
    lowerMessage.includes("tight") ||
    lowerMessage.includes("loose") ||
    lowerMessage.includes("snug")
  ) {
    return "fit"
  } else if (
    lowerMessage.includes("try on") ||
    lowerMessage.includes("virtual") ||
    lowerMessage.includes("try-on") ||
    lowerMessage.includes("upload") ||
    lowerMessage.includes("photo")
  ) {
    return "tryon"
  } else if (lowerMessage.includes("return") || lowerMessage.includes("refund") || lowerMessage.includes("exchange")) {
    return "returns"
  } else if (lowerMessage.includes("ship") || lowerMessage.includes("delivery") || lowerMessage.includes("track")) {
    return "shipping"
  } else {
    return "fallback"
  }
}

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your DrapeMe assistant. How can I help you with your virtual try-on experience today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking and responding
    setTimeout(
      () => {
        const category = getCategoryFromMessage(userMessage.text)
        const responseText = getRandomResponse(category)

        const botMessage: Message = {
          id: messages.length + 2,
          text: responseText,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-0 z-50"
      >
        <MessageCircle size={24} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-[350px] h-[500px] bg-white rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden border border-purple-100"
          >
            {/* Chat header */}
            <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="mr-2" size={20} />
                <h3 className="font-medium">DrapeMe Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl p-3 bg-gray-100 text-gray-800">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Chat input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about fit, sizing, or try-on..."
                  className="resize-none border-purple-200 focus:border-purple-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="icon"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
