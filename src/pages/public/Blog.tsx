import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import heroBlog from "../../assets/hero-blog.jpg";

import sareeUpcycleHero from "../../assets/saree-upcycle-hero.jpg";
import transformSarees from "../../assets/blog/transform-sarees.jpg";
import bridalLehenga from "../../assets/blog/bridal-lehenga.jpg";
import perfectFitting from "../../assets/blog/perfect-fitting.jpg";
import fashionTrends from "../../assets/blog/fashion-trends.jpg";
import doorstepTailoring from "../../assets/blog/doorstep-tailoring.jpg";
import handEmbroidery from "../../assets/blog/hand-embroidery.jpg";
import { Footer } from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";

const blogPosts = [
  {
    id: "upcycling-sarees-climate-change",
    title: "Why Upcycling Sarees is Your Smart Move Against Climate Change",
    excerpt: "Discover how upcycling sarees can be a powerful personal action against climate change with far-reaching environmental benefits.",
    image: sareeUpcycleHero,
    category: "Sustainability",
    author: "Babita Dahal",
    date: "January 15, 2026",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: "transform-old-sarees",
    title: "10 Ways to Transform Your Old Sarees into Modern Outfits",
    excerpt: "Discover creative ways to give your treasured sarees a new life. From trendy dresses to stylish blouses, the possibilities are endless.",
    image: transformSarees,
    category: "Fashion Tips",
    author: "Babita Dahal",
    date: "December 28, 2025",
    readTime: "5 min read",
  },
  {
    id: "bridal-lehenga-fabric",
    title: "Choosing the Perfect Fabric for Your Bridal Lehenga",
    excerpt: "A comprehensive guide to selecting the right fabric that complements your style, comfort, and the wedding season.",
    image: bridalLehenga,
    category: "Bridal",
    author: "Babita Dahal",
    date: "December 20, 2025",
    readTime: "7 min read",
  },
  {
    id: "perfect-fitting-measurements",
    title: "The Art of Perfect Fitting: Why Measurements Matter",
    excerpt: "Understanding why precise measurements are the foundation of a perfectly fitted garment and how our experts achieve it.",
    image: perfectFitting,
    category: "Tailoring",
    author: "Istyak Ahemad",
    date: "December 15, 2025",
    readTime: "4 min read",
  },
  {
    id: "2026-fashion-trends",
    title: "2026 Fashion Trends: What's In and What's Timeless",
    excerpt: "Explore the upcoming fashion trends for the new year and learn which classic styles will never go out of fashion.",
    image: fashionTrends,
    category: "Trends",
    author: "Babita Dahal",
    date: "December 10, 2025",
    readTime: "6 min read",
  },
  {
    id: "doorstep-tailoring",
    title: "Doorstep Tailoring: Convenience Meets Craftsmanship",
    excerpt: "How our doorstep service is revolutionizing the way women experience custom fashion in Thane and Mumbai.",
    image: doorstepTailoring,
    category: "Services",
    author: "Babita Dahal",
    date: "December 5, 2025",
    readTime: "4 min read",
  },
  {
    id: "hand-vs-machine-embroidery",
    title: "Hand Embroidery vs Machine Embroidery: Know the Difference",
    excerpt: "A detailed comparison of hand and machine embroidery techniques, their unique characteristics, and when to choose each.",
    image: handEmbroidery,
    category: "Craftsmanship",
    author: "Pooja Gupta",
    date: "November 28, 2025",
    readTime: "5 min read",
  },
];

const categories = ["All", "Sustainability", "Fashion Tips", "Bridal", "Tailoring", "Trends", "Services", "Craftsmanship"];

const Blog = () => {
  return (
    
    <main className="bg-background text-foreground">
      <Navbar /> 
      
      {/* Hero Section */}
      <section className="relative py-28 md:py-40 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroBlog}
            alt="Styliste Blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/60" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-px bg-primary-foreground/60" />
              <p className="text-primary-foreground/80 font-sans tracking-[0.3em] text-xs uppercase">
                Our Blog
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 text-primary-foreground"
            >
              Fashion<br /><span className="italic text-accent">Insights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/80 text-lg leading-relaxed max-w-2xl"
            >
              Discover styling tips, fashion trends, and expert advice from our team of designers and tailoring professionals.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-background text-foreground border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-2 text-sm font-sans tracking-wide transition-all duration-300 hover:bg-sage hover:text-primary-foreground ${
                  category === "All" ? "bg-sage text-primary-foreground" : "border border-border"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div>
              <span className="inline-block px-4 py-1 bg-primary-foreground/10 text-primary-foreground text-xs font-sans tracking-wide uppercase mb-6">
                {blogPosts[0].category}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6 text-primary-foreground group-hover:text-accent transition-colors duration-300">
                {blogPosts[0].title}
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-6">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/70 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" strokeWidth={1.5} />
                  {blogPosts[0].author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  {blogPosts[0].date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  {blogPosts[0].readTime}
                </div>
              </div>
              <Link
                to={`/blog/${blogPosts[0].id}`}
                className="inline-flex items-center gap-2 text-accent font-sans tracking-wide text-sm group/link"
              >
                Read More
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-background border border-border hover:border-sage/50 hover:shadow-sage transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-sage/10 text-sage text-xs font-sans tracking-wide uppercase mb-4">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-xl mb-3 group-hover:text-sage transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{post.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button className="px-8 py-3 border border-sage text-sage font-sans tracking-wide text-sm hover:bg-sage hover:text-primary-foreground transition-all duration-300">
              Load More Articles
            </button>
          </motion.div>
        </div>
      </section>

       {/* CTA */}
      <section className="py-28 md:py-40 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl mb-8"
          >
            Ready to Transform Your Style?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Book a consultation today and let our experts create the perfect outfit for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
             <Link
    to="/appointment"
    className="
      group inline-flex items-center justify-center gap-2
      px-8 py-4 rounded-xl
      bg-background text-foreground
      font-medium
      transition-all duration-300
      hover:bg-background/90
    "
  >
    Book Appointment
    <ArrowRight
      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
      strokeWidth={1.5}
    />
  </Link>

  {/* Contact Us */}
  <Link
    to="/contact"
    className="
      inline-flex items-center justify-center
      px-8 py-4 rounded-xl
      border border-primary-foreground/40
      text-primary-foreground
      font-medium
      transition-all duration-300
      hover:bg-primary-foreground/10
      hover:border-primary-foreground
    "
  >
    Contact Us
  </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Blog;
