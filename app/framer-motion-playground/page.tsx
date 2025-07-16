"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"

export default function FramerMotionPlaygroundPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const parallaxRef = useRef(null)
  const stickyHeaderRef = useRef(null)

  useEffect(() => {
    if (user?.role === "guest") {
      router.push("/") // Redirect guests from playground page
    }
  }, [user, router])

  if (user?.role === "guest") {
    return null // Or a loading spinner, or a message
  }

  // Scroll Progress Bar
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Parallax Image
  const { scrollYProgress: parallaxScrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  })
  const yParallax = useTransform(parallaxScrollYProgress, [0, 1], ["-50%", "50%"])

  // Sticky Header with Transform
  const { scrollYProgress: stickyHeaderScrollYProgress } = useScroll({
    target: stickyHeaderRef,
    offset: ["start start", "end start"],
  })
  // Removed color transforms to rely on theme-aware Tailwind classes
  const headerScale = useTransform(stickyHeaderScrollYProgress, [0, 1], [1, 0.95])
  const headerBorderRadius = useTransform(stickyHeaderScrollYProgress, [0, 1], [0, 16])

  // Staggered List
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-[0%] z-50" style={{ scaleX }} />

      <main className="flex-1 container py-12 md:py-24">
        <h1 className="text-4xl font-bold tracking-tighter mb-12 text-center">Framer Motion Playground</h1>

        {/* Section 1: Scroll-Triggered Reveals */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Scroll-Triggered Reveals</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-lg font-semibold text-foreground"
              >
                Element {i + 1}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: Parallax Image */}
        <section
          className="mb-24 h-[500px] flex items-center justify-center overflow-hidden relative"
          ref={parallaxRef}
        >
          <motion.div style={{ y: yParallax }} className="absolute inset-0 w-full h-[150%]">
            {/* Using a placeholder image. Replace with your own image for a better visual. */}
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="Parallax Background"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
          </motion.div>
          <div className="relative z-10 text-white text-5xl font-bold text-center drop-shadow-lg">
            Amazing Parallax Effect
          </div>
        </section>

        {/* Section 3: Sticky Header with Transform */}
        <section className="mb-24 h-[1000px] bg-muted/30 rounded-lg p-8">
          <div ref={stickyHeaderRef} className="h-full">
            <motion.div
              style={{
                scale: headerScale,
                borderRadius: headerBorderRadius,
              }}
              className="sticky top-24 p-6 shadow-lg z-20 flex items-center justify-center text-2xl font-bold bg-card text-foreground"
            >
              Sticky Header
            </motion.div>
            <div className="mt-8 space-y-4 text-muted-foreground">
              <p>Scroll down to see the sticky header transform!</p>
              {[...Array(30)].map((_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Draggable Box with Hover */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Draggable & Hover</h2>
          <Card>
            <CardHeader>
              <CardTitle>Draggable & Hover</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-48 bg-muted/50 rounded-md">
              <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                className="w-24 h-24 bg-accent rounded-xl cursor-grab flex items-center justify-center text-accent-foreground font-bold"
              >
                Drag Me
              </motion.div>
            </CardContent>
          </Card>
        </section>

        {/* Section 5: Staggered List */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Staggered List</h2>
          <Card>
            <CardHeader>
              <CardTitle>Staggered List</CardTitle>
            </CardHeader>
            <CardContent className="bg-muted/50 rounded-md p-6">
              <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
                {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"].map((text, i) => (
                  <motion.li
                    key={i}
                    variants={itemVariants}
                    className="bg-card p-3 rounded-md shadow-sm text-foreground"
                  >
                    {text}
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </section>

        <section className="text-center text-muted-foreground py-12">
          <p>Keep scrolling to see more magic!</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
