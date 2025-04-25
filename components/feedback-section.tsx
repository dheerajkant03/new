"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample feedback data - in a real app, this would come from a database
const initialFeedbacks = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    comment: "The virtual try-on feature is amazing! It helped me find the perfect size for my new shirt.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Rahul Patel",
    rating: 4,
    comment: "Great selection of clothes and the try-on feature is very accurate. Would recommend!",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Ananya Gupta",
    rating: 5,
    comment:
      "I love how I can see exactly how the clothes will look on me before buying. Saved me from making a mistake!",
    date: "2 weeks ago",
  },
]

export function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks)
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeedbackIndex((prev) => (prev + 1) % feedbacks.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [feedbacks.length])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !comment.trim()) return

    const newFeedback = {
      id: feedbacks.length + 1,
      name,
      rating,
      comment,
      date: "Just now",
    }

    // In a real app, this would be sent to a backend API
    setFeedbacks([...feedbacks, newFeedback])
    setName("")
    setComment("")
    setRating(5)
    setIsFormOpen(false)
  }

  return (
    <section className="w-full py-8 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Customer Feedback
            </h2>
            <p className="text-zinc-500">See what our customers are saying about their experience</p>
          </div>
          <Button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isFormOpen ? "Cancel" : "Share Your Experience"}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {isFormOpen ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md mb-8"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                        <Star
                          size={24}
                          className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="comment">Your Feedback</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with our virtual try-on feature..."
                    required
                    className="border-purple-200 focus:border-purple-400"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={feedbacks[currentFeedbackIndex].id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-6 rounded-xl shadow-md flex-1"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 flex items-center justify-center text-lg font-bold text-purple-700">
                          {feedbacks[currentFeedbackIndex].name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">{feedbacks[currentFeedbackIndex].name}</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < feedbacks[currentFeedbackIndex].rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <div className="ml-auto text-xs text-gray-500">{feedbacks[currentFeedbackIndex].date}</div>
                      </div>
                      <p className="text-gray-600">{feedbacks[currentFeedbackIndex].comment}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="hidden md:flex flex-col gap-6 w-1/3">
                    {feedbacks
                      .filter((_, i) => i !== currentFeedbackIndex)
                      .slice(0, 2)
                      .map((feedback) => (
                        <div key={feedback.id} className="bg-white p-4 rounded-xl shadow-sm">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 flex items-center justify-center text-sm font-bold text-purple-700">
                              {feedback.name.charAt(0)}
                            </div>
                            <div className="ml-2">
                              <h3 className="font-medium text-sm">{feedback.name}</h3>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    className={
                                      i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">{feedback.comment}</p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex justify-center mt-6 space-x-2">
                  {feedbacks.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentFeedbackIndex(i)}
                      className={`w-2 h-2 rounded-full ${
                        i === currentFeedbackIndex ? "bg-purple-600" : "bg-purple-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
