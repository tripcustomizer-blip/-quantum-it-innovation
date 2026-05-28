'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calendar, Clock, ArrowRight, ArrowUpRight, Search, Mail, CheckCircle2
} from 'lucide-react'

const categories = ['All', 'AI & Tech', 'App Dev', 'Web Dev', 'Marketing']

const blogPosts = [
  {
    id: 1,
    title: 'How Generative AI is Changing Enterprise Software Development',
    summary: 'Generative AI tools are reshaping the software engineering lifecycle. Discover how companies are implementing LLMs to automate testing and speed up coding velocity.',
    category: 'AI & Tech',
    date: 'May 20, 2026',
    readTime: '6 min read',
    accentColor: 'from-violet-500/20 to-fuchsia-500/10',
    borderColor: 'hover:border-violet-500/30',
    tagColor: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    title: 'Top 5 Mobile App UX Trends to Watch in 2026',
    summary: 'From spatial computing design patterns to micro-gestures and AI-driven personalization, explore the core design elements that will dominate iOS and Android app stores.',
    category: 'App Dev',
    date: 'May 15, 2026',
    readTime: '5 min read',
    accentColor: 'from-purple-500/20 to-pink-500/10',
    borderColor: 'hover:border-purple-500/30',
    tagColor: 'text-purple-400 border-purple-500/30 bg-purple-500/5',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    title: 'The Shift to Serverless Next.js and Edge Computing Platforms',
    summary: 'Edge middleware and serverless APIs are minimizing TTFB and maximizing Core Web Vitals performance. Learn why businesses are migrating their backends to edge configurations.',
    category: 'Web Dev',
    date: 'May 08, 2026',
    readTime: '8 min read',
    accentColor: 'from-teal-500/20 to-blue-500/10',
    borderColor: 'hover:border-teal-500/30',
    tagColor: 'text-teal-400 border-teal-500/30 bg-teal-500/5',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    title: 'Search Engine Landscaping: Navigating AI-Generated Search Summaries',
    summary: 'As search engines incorporate AI-driven results, traditional SEO strategies must evolve. Discover how to optimize content for AI answers and maintain high visibility.',
    category: 'Marketing',
    date: 'Apr 28, 2026',
    readTime: '7 min read',
    accentColor: 'from-orange-500/20 to-yellow-500/10',
    borderColor: 'hover:border-orange-500/30',
    tagColor: 'text-orange-400 border-orange-500/30 bg-orange-500/5',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    title: 'Securing IoT Devices: Best Practices for Firmware Development',
    summary: 'Connected hardware devices present unique security vulnerabilities. Explore practical steps for provisioning credentials, encrypting telemetry, and deploying OTA updates.',
    category: 'AI & Tech',
    date: 'Apr 22, 2026',
    readTime: '9 min read',
    accentColor: 'from-blue-500/20 to-indigo-500/10',
    borderColor: 'hover:border-blue-500/30',
    tagColor: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 6,
    title: 'Mastering App Store Optimization (ASO) for Higher Downloads',
    summary: 'Creating a great application is only half the battle. Discover the visual and text optimization guidelines to rank higher in Google Play and iOS App Store searches.',
    category: 'Marketing',
    date: 'Apr 14, 2026',
    readTime: '5 min read',
    accentColor: 'from-red-500/20 to-orange-500/10',
    borderColor: 'hover:border-red-500/30',
    tagColor: 'text-red-400 border-red-500/30 bg-red-500/5',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60',
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 bg-gradient-to-b from-blue-950/20 via-black to-black overflow-hidden border-b border-[#1a1a1a]">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-5">
              <span className="w-6 h-px bg-blue-400 inline-block" />
              Insights & News
              <span className="w-6 h-px bg-blue-400 inline-block" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
              Digitacurve <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Explore resources, technological deep dives, industry strategies, and developer tools curated by our engineering teams.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 pb-6 border-b border-[#1a1a1a]">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                      : 'bg-[#111] text-gray-400 border-[#2a2a2a] hover:text-white hover:border-[#444]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search inputs */}
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111] border border-[#2a2a2a] rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className={`rounded-2xl border border-[#2a2a2a] bg-[#111] bg-gradient-to-br ${post.accentColor} to-transparent ${post.borderColor} transition-all duration-300 flex flex-col group overflow-hidden`}
                >
                  <div className="w-full h-48 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-0.5 rounded-md border text-xxs font-bold uppercase tracking-wider ${post.tagColor}`}>
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xxs text-gray-500">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="mt-auto pt-4 border-t border-[#222]/30 flex items-center justify-between">
                      <span className="text-xxs text-gray-500 flex items-center gap-1.5">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                        Read Article
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-8 rounded-3xl border border-[#2a2a2a] bg-[#111] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl mx-auto text-center relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto mb-4">
                <Mail size={22} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">Subscribe to Digitacurve Insights</h2>
              <p className="text-gray-400 text-sm mb-6">
                Get monthly roundups of technology trends, frameworks comparisons, and digital marketing insights delivered right to your inbox.
              </p>

              {subscribed ? (
                <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                  <CheckCircle2 size={16} />
                  <span>Success! You have been subscribed to our newsletter.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="flex-1 bg-black border border-[#2a2a2a] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs py-3 px-6 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/20"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
