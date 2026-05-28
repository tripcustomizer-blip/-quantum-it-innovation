'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Share2, Mail, CheckCircle2 } from 'lucide-react'

// Define blog interface matching the API
interface Blog {
  _id?: string
  id?: number
  title: string
  description: string
  meta_title?: string
  meta_desc?: string
  image: string
  category: string
  readTime?: string
  read_time?: string
  createdAt?: string
  date?: string
}

// Static blogs fallback definitions with HTML descriptions
const staticBlogsDetail: Record<string, { title: string; category: string; date: string; readTime: string; image: string; content: string }> = {
  'generative-ai-enterprise-software': {
    title: 'How Generative AI is Changing Enterprise Software Development',
    category: 'AI & Tech',
    date: 'May 20, 2026',
    readTime: '6 min read',
    image: '/assets/blogs/tech.jpg',
    content: `
      <p>Generative AI is no longer a futuristic concept—it is actively reshaping how enterprise software is designed, written, tested, and deployed. From auto-generating boilerplate code to predicting bugs before they manifest, LLMs (Large Large Models) are becoming essential partners for developers.</p>
      
      <h2>1. Accelerating Code Generation</h2>
      <p>Modern development teams are using AI coding assistants to automate mundane tasks. Developers can now use natural language prompts to write complex database queries, regex expressions, or boilerplate API endpoints, reducing coding time by up to 40%.</p>

      <h2>2. Automating Testing and QA</h2>
      <p>Generative AI tools can analyze code repositories and automatically write unit tests, integration tests, and edge-case scenarios. This leads to higher code coverage and fewer regressions in production environments.</p>

      <h2>3. Legacy Code Modernization</h2>
      <p>For large enterprises, migrating legacy codebases (like COBOL, Java 8, or old PHP) is a high-risk, high-cost endeavor. LLMs excel at translating code from one language to another while preserving business logic, significantly speeding up application modernization projects.</p>

      <h2>Conclusion</h2>
      <p>As AI agents continue to evolve, the developer's role is shifting from code writing to system architecture and oversight. Enterprises that adopt these tools early will outpace their competition in feature delivery velocity and software stability.</p>
    `
  },
  'mobile-app-ux-trends-2026': {
    title: 'Top 5 Mobile App UX Trends to Watch in 2026',
    category: 'App Dev',
    date: 'May 15, 2026',
    readTime: '5 min read',
    image: '/assets/blogs/design.jpg',
    content: `
      <p>Mobile user experience (UX) is evolving rapidly to match new hardware capabilities and changing user habits. To stand out in the crowded app stores, designers must look beyond flat interfaces and adopt more immersive, personalized design paradigms.</p>

      <h2>1. Spatial Interfaces & Neumorphic Depths</h2>
      <p>With the rise of mixed-reality headsets, flat design is making way for spatial depth. Mobile apps are incorporating subtle shadows, layering, and realistic physics to create tactile elements that feel satisfying to interact with.</p>

      <h2>2. AI-Driven Personalization</h2>
      <p>Static layouts are being replaced by dynamic, context-aware interfaces. AI algorithms analyze user patterns to highlight features, rearrange menus, and customize color schemes on the fly based on the time of day, location, and usage history.</p>

      <h2>3. Micro-interactions and Haptic Feedback</h2>
      <p>Micro-interactions provide delightful moments of feedback. Whether it's a smooth animation when completing a task or customized haptic vibrations, these elements keep users engaged and build brand loyalty.</p>

      <h2>Conclusion</h2>
      <p>UX in 2026 is about making interfaces invisible and interactions natural. Focusing on accessibility, personalization, and responsive tactile design will be the key to app retention.</p>
    `
  },
  'serverless-nextjs-edge-computing': {
    title: 'The Shift to Serverless Next.js and Edge Computing Platforms',
    category: 'Web Dev',
    date: 'May 08, 2026',
    readTime: '8 min read',
    image: '/assets/blogs/cloud.jpg',
    content: `
      <p>As speed and latency directly impact conversions, businesses are moving away from traditional server setups toward serverless architectures deployed at the Edge. Next.js and platforms like Vercel/Cloudflare are leading this revolution.</p>

      <h2>1. What is Edge Computing?</h2>
      <p>Edge computing runs server-side logic closer to the user physically (via global CDN nodes). Instead of sending every request to a single database server in Virginia, Edge functions handle routing, personalization, and page assembly instantly from the nearest regional node.</p>

      <h2>2. Benefits for Core Web Vitals</h2>
      <p>By computing static layouts and API responses at the edge, sites achieve near-zero Time to First Byte (TTFB). This drastically improves Largest Contentful Paint (LCP) and visual stability, helping search rankings and customer experience.</p>

      <h2>Conclusion</h2>
      <p>Transitioning to serverless and edge computing ensures absolute scalability without server maintenance overhead. For modern web applications, the edge is the new standard.</p>
    `
  },
  'search-engine-landscaping-ai-search': {
    title: 'Search Engine Landscaping: Navigating AI-Generated Search Summaries',
    category: 'Marketing',
    date: 'Apr 28, 2026',
    readTime: '7 min read',
    image: '/assets/blogs/marketplace.jpg',
    content: `
      <p>The search landscape is undergoing its biggest transformation since the introduction of mobile search. With search engines showing AI-generated answers directly at the top of results pages, traditional SEO is no longer sufficient.</p>

      <h2>1. The Rise of Search Generative Experience</h2>
      <p>AI search summaries synthesize answers from multiple web sources, offering users instant answers without requiring them to click through to websites. This has led to a drop in organic click-through rates for informational queries.</p>

      <h2>2. Optimizing for AI Mentions</h2>
      <p>To rank inside AI search summaries, content must be highly structured, authoritative, and direct. Focusing on answering long-tail questions, publishing unique case studies, and using semantic schemas is crucial.</p>

      <h2>Conclusion</h2>
      <p>SEO is shifting toward Answer Engine Optimization (AEO). Brands that write high-quality, deeply original content will continue to be cited as references by AI models.</p>
    `
  },
  'securing-iot-devices-firmware': {
    title: 'Securing IoT Devices: Best Practices for Firmware Development',
    category: 'AI & Tech',
    date: 'Apr 22, 2026',
    readTime: '9 min read',
    image: '/assets/blogs/smart-home.jpg',
    content: `
      <p>As IoT (Internet of Things) devices become integral to homes and industries, they present an attractive target for cyber threats. Securing firmware is the first and most critical line of defense in hardware development.</p>

      <h2>1. Secure Boot Mechanisms</h2>
      <p>Implementing cryptographic signatures ensures that only verified, original firmware can boot on the hardware. This prevents unauthorized attackers from flashing malicious code onto devices.</p>

      <h2>2. Encrypted Telemetry and Communications</h2>
      <p>All data sent from the IoT device to the cloud must be encrypted using modern TLS standards. Hardcoding API keys or sending telemetry in plain text is a significant vulnerability.</p>

      <h2>Conclusion</h2>
      <p>Security cannot be an afterthought in hardware design. Integrating security protocols into the initial firmware development lifecycle is vital for user trust and safety.</p>
    `
  },
  'mastering-aso-app-store-optimization': {
    title: 'Mastering App Store Optimization (ASO) for Higher Downloads',
    category: 'Marketing',
    date: 'Apr 14, 2026',
    readTime: '5 min read',
    image: '/assets/blogs/ecommerce.jpg',
    content: `
      <p>Creating a beautiful app is only half the battle; getting discovered by users is where App Store Optimization (ASO) comes in. With millions of apps available, optimization is critical for organic downloads.</p>

      <h2>1. Keyword Research & Localization</h2>
      <p>Identify terms your target audience searches for. Target high-volume, low-competition keywords in your app name, subtitle, and description fields, and localize them for different international markets.</p>

      <h2>2. Visual Optimization (Screenshots & Icon)</h2>
      <p>Your icon and screenshots are the first visual impression. Use high-contrast colors, clear fonts, and highlight core features dynamically in your screenshot sequence to drive conversions.</p>

      <h2>Conclusion</h2>
      <p>ASO is an ongoing experiment. Run regular A/B tests on your screenshots, monitor competitor keyword shifts, and encourage user reviews to maintain high search visibility.</p>
    `
  }
}

// Function to map dynamically loaded blog title keywords to local images
function getBlogImage(title: string, originalImage: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('shipping') || lower.includes('delivery')) {
    return '/assets/blogs/shipping.jpg';
  }
  if (lower.includes('walmart') || lower.includes('ecommerce')) {
    return '/assets/blogs/ecommerce.jpg';
  }
  if (lower.includes('marketplace') || lower.includes('buying') || lower.includes('selling')) {
    return '/assets/blogs/marketplace.jpg';
  }
  if (lower.includes('instacart') || lower.includes('shopper') || lower.includes('grocery')) {
    return '/assets/blogs/grocery.jpg';
  }
  if (lower.includes('chatgpt') || lower.includes('ai') || lower.includes('dopple') || lower.includes('quillbot') || lower.includes('generative')) {
    return '/assets/blogs/tech.jpg';
  }
  if (lower.includes('zigbee') || lower.includes('z-wave') || lower.includes('smart home') || lower.includes('iot')) {
    return '/assets/blogs/smart-home.jpg';
  }
  if (lower.includes('web 2.0') || lower.includes('web 3.0') || lower.includes('blockchain')) {
    return '/assets/blogs/web3.jpg';
  }
  if (lower.includes('azure') || lower.includes('aws') || lower.includes('google cloud') || lower.includes('cloud')) {
    return '/assets/blogs/cloud.jpg';
  }
  if (lower.includes('youtube') || lower.includes('shorts') || lower.includes('video')) {
    return '/assets/blogs/video.jpg';
  }
  if (lower.includes('canva') || lower.includes('photo') || lower.includes('design') || lower.includes('chub')) {
    return '/assets/blogs/design.jpg';
  }
  if (originalImage && originalImage.startsWith('http')) {
    return originalImage;
  }
  return '/assets/blogs/default.jpg';
}

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    // 1. Check if the slug matches a static blog
    if (staticBlogsDetail[slug]) {
      const staticPost = staticBlogsDetail[slug]
      setBlog({
        title: staticPost.title,
        description: staticPost.content,
        image: staticPost.image,
        category: staticPost.category,
        date: staticPost.date,
        readTime: staticPost.readTime,
      })
      setLoading(false)
      return
    }

    // 2. Fetch from API if not a static blog
    fetch('https://api.quantumitinnovation.com/api/blogs/blog?resultPerPage=40&currentPage=1')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.blogs) {
          const apiBlog = data.blogs.find((b: any) => b.custom_url === slug)
          if (apiBlog) {
            setBlog({
              title: apiBlog.title,
              description: apiBlog.description,
              image: getBlogImage(apiBlog.title, apiBlog.image),
              category: apiBlog.category || 'Digital Marketing',
              date: apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'May 28, 2026',
              readTime: apiBlog.readTime || '5 min read',
            })
          }
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching blog detail:', err)
        setLoading(false)
      })
  }, [slug])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-black mb-4">Article Not Found</h2>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          The blog article you are looking for does not exist or has been removed.
        </p>
        <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-bold hover:from-blue-500 hover:to-purple-500 transition-all">
          <ArrowLeft size={16} />
          Back to Insights
        </Link>
      </div>
    )
  }

  return (
    <main className="bg-black text-white min-h-screen pb-20">
      {/* Article Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-blue-950/20 via-black to-black overflow-hidden border-b border-[#1a1a1a]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white mb-8 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-md border text-xxs font-bold uppercase tracking-wider text-blue-400 border-blue-500/30 bg-blue-500/5">
              {blog.category}
            </span>
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock size={14} />
              {blog.readTime}
            </span>
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar size={14} />
              {blog.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-8">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-sm text-white">
                DC
              </div>
              <div>
                <p className="text-sm font-bold text-white">Digitacurve Editorial</p>
                <p className="text-xs text-gray-500">Tech & Marketing Experts</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111] border border-[#2a2a2a] hover:border-[#444] transition-colors text-xs font-semibold text-gray-400 hover:text-white"
            >
              <Share2 size={14} />
              {copied ? 'Link Copied!' : 'Share Article'}
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          {/* Main Cover Image */}
          <div className="w-full h-[300px] sm:h-[450px] rounded-3xl overflow-hidden border border-[#2a2a2a] mb-12">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          {/* HTML Render Body */}
          <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 blog-rich-text">
            <div dangerouslySetInnerHTML={{ __html: blog.description }} />
          </article>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <div className="p-8 rounded-3xl border border-[#2a2a2a] bg-[#111] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto mb-4 relative z-10">
              <Mail size={22} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-3 relative z-10">Enjoyed this article?</h3>
            <p className="text-gray-400 text-sm mb-6 relative z-10">
              Subscribe to Digitacurve Insights for monthly developer & digital marketing updates.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                <CheckCircle2 size={16} />
                <span>Success! You have been subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto relative z-10">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 bg-black border border-[#2a2a2a] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none"
                />
                <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs py-3 px-6 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
