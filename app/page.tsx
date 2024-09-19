"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Radio, Users, Headphones, Play } from "lucide-react"
import { motion } from "framer-motion"


export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 items-center ">
        
     
      <main className="flex-0 pt-16">
        <section className="w-full py-24 md:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Let Your Fans Be the DJ
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-gray-400 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Sanzy is the revolutionary music streaming platform where creators and fans create the perfect playlist together.
              </motion.p>
              <motion.div
                className="w-full max-w-sm space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                
                  
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white mt-7">
                    Get Started
                  </Button>
                
              </motion.div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 bg-gray-950 mt-10">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-white">Features</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {[
                { icon: Radio, title: "Start Your Stream", description: "Create your music stream and set the mood." },
                { icon: Users, title: "Engage Your Fans", description: "Let fans vote on songs in real-time." },
                { icon: Headphones, title: "Enjoy Together", description: "Experience music curated by your community." },
              ].map((feature, index) => (
                <motion.div key={index} className="flex flex-col items-center text-center" variants={item}>
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section id="popular" className="w-full py-12 md:py-24 bg-gray-900 mt-10">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-white">Popular Streams</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                { name: "Electro Nights", creator: "DJ Spark", listeners: "2.5k", genre: "Electronic" },
                { name: "Acoustic Vibes", creator: "Melody Maven", listeners: "1.8k", genre: "Acoustic" },
                { name: "Hip Hop Hustle", creator: "Rhyme Master", listeners: "3.2k", genre: "Hip Hop" },
              ].map((stream, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                  variants={item}
                >
                  <div className="relative h-48 bg-purple-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-16 w-16 text-white opacity-75" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{stream.name}</h3>
                    <p className="text-gray-400 mb-4">by {stream.creator}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {stream.listeners} listeners
                      </span>
                      <span className="text-gray-400">{stream.genre}</span>
                    </div>
                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                      Join Stream
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section id="faq" className="w-full py-12 md:py-24 bg-gray-950 mt-10">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-white">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-36">
              {[
                { q: "How does fan voting work?", a: "Fans can vote on a selection of songs in real-time. The most voted song plays next." },
                { q: "Can I use my own music?", a: "Yes, you can upload and stream your own original music on Sanzy." },
                { q: "Is there a mobile app?", a: "We're currently developing mobile apps for iOS and Android. Stay tuned!" },
                { q: "How do payouts work?", a: "Creators earn based on listener count and engagement. Payouts are monthly." },
              ].map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-xl font-bold text-white">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Ready to Transform Your Music Streams?
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[600px] text-gray-400 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join Sanzy today and create unforgettable music experiences with your audience.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Get Started for Free
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2023 Sanzy. All rights reserved.</p>
            <nav className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}