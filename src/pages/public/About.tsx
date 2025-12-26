import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

const About = () => {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      {/* Hero */}
        <section className="py-20 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-px bg-sage" />
            <p className="text-sage font-sans tracking-[0.3em] text-xs uppercase">
              Our Story
            </p>
            <div className="w-8 h-px bg-sage" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl mb-6"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            STYLISTE was born from a passion for exceptional craftsmanship and timeless design. We believe that true style transcends trends.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 md:py-40 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-sage" />
                <p className="text-sage font-sans tracking-[0.3em] text-xs uppercase">
                  Our Mission
                </p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl mb-8">
                Empowering Individual Style
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At STYLISTE, we believe that fashion is a form of self-expression. Our mission is to provide exceptional pieces that empower individuals to express their unique style with confidence and elegance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every piece in our collection is carefully curated for its quality, design, and versatility. We work with artisans and designers who share our commitment to excellence and sustainability.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/5] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"
                alt="Fashion craftsmanship"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 md:py-40 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <div className="w-8 h-px bg-sage" />
              <p className="text-sage font-sans tracking-[0.3em] text-xs uppercase">
                Our Values
              </p>
              <div className="w-8 h-px bg-sage" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl"
            >
              What We Stand For
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description:
                  "We source only the finest materials and work with skilled artisans to create pieces that stand the test of time.",
              },
              {
                title: "Sustainability",
                description:
                  "We're committed to ethical practices and sustainable fashion. Every purchase supports responsible production.",
              },
              {
                title: "Service",
                description:
                  "Our dedicated team provides personalized styling advice and exceptional customer service at every touchpoint.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-background border border-border p-10"
              >
                <h3 className="font-serif text-2xl mb-5">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <div className="w-8 h-px bg-sage" />
              <p className="text-sage font-sans tracking-[0.3em] text-xs uppercase">
                The Team
              </p>
              <div className="w-8 h-px bg-sage" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl"
            >
              Meet Our Stylists
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alexandra Chen",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
              },
              {
                name: "Marcus Williams",
                role: "Head Stylist",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
              },
              {
                name: "Sofia Martinez",
                role: "Personal Shopper",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl mb-2">{member.name}</h3>
                <p className="text-muted-foreground text-sm tracking-wide">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
   <section className="py-28 md:py-40 bg-[#6E9F7D] text-black">
  <div className="container mx-auto px-6 text-center">

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-serif text-4xl md:text-6xl mb-6"
    >
      Experience STYLISTE
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="max-w-2xl mx-auto mb-12 text-black/80 leading-relaxed"
    >
      Visit our boutique or schedule a personal styling appointment with one of our experts.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="flex flex-col sm:flex-row justify-center gap-4"
    >
      <Link
        to="/appointment"
        className="px-8 py-4 bg-black text-white font-medium hover:bg-black/90 transition group"
      >
        BOOK APPOINTMENT
        <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
      </Link>

      <Link
        to="/contact"
        className="px-8 py-4 border border-black text-black hover:bg-black/10 transition"
      >
        CONTACT US
      </Link>
    </motion.div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default About;
