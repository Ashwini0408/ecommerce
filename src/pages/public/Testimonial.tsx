import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Thane West",
    rating: 5,
    text: "Absolutely amazing experience! Babita ma'am transformed my mother's old Banarasi saree into a stunning lehenga for my engagement. The craftsmanship is impeccable and the fit was perfect.",
    service: "Saree Upscaling",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    id: 2,
    name: "Ananya Patel",
    location: "Mulund",
    rating: 5,
    text: "The doorstep service is so convenient! The tailor came home, took measurements, and delivered my blouse within a week. Perfect fitting and beautiful work.",
    service: "Bespoke Tailoring",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    id: 3,
    name: "Sneha Desai",
    location: "Thane",
    rating: 5,
    text: "Got my bridal lehenga designed here and it was beyond my expectations. The attention to detail, the embroidery work, everything was just perfect for my special day.",
    service: "Bridal Wear",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  },
  {
    id: 4,
    name: "Kavita Mehta",
    location: "Powai",
    rating: 5,
    text: "I had several old sarees sitting in my wardrobe. STYLISTE transformed them into beautiful kurtas and dresses. Now I can wear them proudly!",
    service: "Saree Upscaling",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  },
  {
    id: 5,
    name: "Rashmi Kulkarni",
    location: "Ghatkopar",
    rating: 5,
    text: "The team is so patient and understanding. They helped me choose the perfect design for my daughter's thread ceremony outfit. Highly recommended!",
    service: "Designer Dresses",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
  {
    id: 6,
    name: "Deepika Joshi",
    location: "Thane West",
    rating: 5,
    text: "Got matching outfits designed for my entire family for Diwali. The color coordination and quality were outstanding. Will definitely come back!",
    service: "Theme Outfits",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  },
  {
    id: 7,
    name: "Meera Iyer",
    location: "Mulund West",
    rating: 5,
    text: "The alterations service is top-notch. My old dress fits perfectly now. Quick turnaround and very reasonable pricing.",
    service: "Alterations",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80",
  },
  {
    id: 8,
    name: "Sonali Rane",
    location: "Thane",
    rating: 5,
    text: "Babita ma'am is incredibly talented. She understood exactly what I wanted and created a gorgeous cocktail dress. The premium lining makes it so comfortable!",
    service: "Designer Dresses",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
  },
];

const stats = [
  { number: "500+", label: "Happy Customers" },
  { number: "25+", label: "Years Experience" },
  { number: "1000+", label: "Garments Created" },
  { number: "100%", label: "Satisfaction Rate" },
];

const Testimonials = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-28 md:py-40 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
            alt="STYLISTE testimonials"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
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
                Testimonials
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 text-primary-foreground"
            >
              What Our
              <br />
              <span className="italic text-accent">Clients Say</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/80 text-lg leading-relaxed max-w-2xl"
            >
              Real stories from our valued customers who trusted us with their
              fashion dreams.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="font-serif text-4xl md:text-5xl text-sage mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm font-sans tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-28 md:py-40 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Quote
              className="w-16 h-16 text-primary-foreground/30 mx-auto mb-8"
              strokeWidth={1}
            />
            <p className="font-serif text-2xl md:text-4xl leading-relaxed mb-8 italic text-primary-foreground">
              "STYLISTE has transformed how I think about fashion. Their
              attention to detail and personalized service makes every piece
              feel special. I wouldn't trust anyone else with my wardrobe."
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[0].image}
                alt={testimonials[0].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-serif text-lg text-primary-foreground">
                  {testimonials[0].name}
                </div>
                <div className="text-primary-foreground/60 text-sm">
                  {testimonials[0].location}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-background border border-border p-8 hover:border-sage/50 hover:shadow-sage transition-all duration-500"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-sage text-sage" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div>
                    <div className="font-serif group-hover:text-sage transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="inline-block px-3 py-1 bg-sage/10 text-sage text-xs font-sans tracking-wide">
                    {testimonial.service}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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
            Ready to Join Our Happy Clients?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Experience the STYLISTE difference. Book your consultation today.
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
              className="group inline-flex items-center gap-2
             bg-background text-foreground
             px-8 py-4 rounded-xl
             font-medium transition-all
             hover:bg-background/90"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center
             px-8 py-4 rounded-xl
             border border-primary-foreground/40
             text-primary-foreground
             transition-all
             hover:bg-primary-foreground/10
             hover:border-primary-foreground"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
