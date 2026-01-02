import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Sparkles, Shirt, RefreshCw, Palette, Clock, Truck, Heart } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

const services = [
  {
    icon: Scissors,
    title: "Bespoke Tailoring",
    description: "Expert craftsmanship for made-to-measure garments. Every piece is meticulously crafted to your exact measurements and personal style preferences.",
    features: ["Perfect fit guaranteed", "Premium stitching", "Personalized design consultation"],
  },
  {
    icon: Shirt,
    title: "Designer Dresses",
    description: "Elegant designer dresses with intricate embroidery, modern cuts, and traditional craftsmanship for everyday elegance.",
    features: ["Latest fashion trends", "Custom embroidery", "Quality fabrics"],
  },
  {
    icon: RefreshCw,
    title: "Upscaling Old Sarees",
    description: "One-on-one styling sessions to help you choose the perfect design. Transform your old saree collection into stunning contemporary pieces with contrast colours that suit your personality and occasion.",
    features: ["Saree to dress conversion", "Modern redesign", "Preserve sentimental pieces"],
  },
  {
    icon: Sparkles,
    title: "Bridal Wear",
    description: "Create your dream bridal outfit with our expert designers. From lehengas to gowns, we bring your wedding vision to life.",
    features: ["Custom bridal design", "Hand embroidery", "Perfect fitting"],
  },
  {
    icon: Palette,
    title: "Theme-Based Outfits",
    description: "Perfect outfits for themed events, parties, and special occasions. We design matching family outfits and coordinated ensembles.",
    features: ["Family coordination", "Event-specific design", "Color matching"],
  },
  {
    icon: Heart,
    title: "Alterations & Repairs",
    description: "Expert alterations to ensure your existing garments fit perfectly. From simple hemming to complex restructuring.",
    features: ["Quick turnaround", "Invisible repairs", "Size adjustments"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description: "Visit our boutique or book a doorstep consultation. We understand your ideas, occasion details, and preferences.",
  },
  {
    number: "02",
    title: "Design & Measurement",
    description: "Our experts help you choose the perfect design while taking precise measurements for a flawless fit.",
  },
  {
    number: "03",
    title: "Crafting",
    description: "Our skilled tailors bring your vision to life with meticulous attention to detail and premium craftsmanship.",
  },
  {
    number: "04",
    title: "Delivery",
    description: "Your perfectly finished garment is delivered to your doorstep, ready to make you shine.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <Navbar />
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="STYLISTE services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-px bg-sage" />
              <p className="text-sage font-sans tracking-[0.3em] text-xs uppercase">
                Our Services
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8"
            >
              Complete Fashion
              <br />
              <span className="italic text-sage">Solutions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl"
            >
              From bespoke tailoring to transforming treasured sarees, we offer comprehensive fashion services tailored to your unique style and needs.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-28 md:py-40 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 border border-border bg-card hover:border-sage/50 hover:shadow-sage transition-all duration-500"
              >
                <div className="w-16 h-16 mb-6 border border-sage/30 flex items-center justify-center group-hover:bg-sage group-hover:border-sage transition-all duration-500">
                  <service.icon className="w-7 h-7 text-sage group-hover:text-primary-foreground transition-colors duration-500" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-2xl mb-4 group-hover:text-sage transition-colors duration-300">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 bg-sage rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-28 md:py-40 bg-secondary/30">
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
                Why Choose Us
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
              The STYLISTE Difference
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Doorstep Service",
                description: "We come to you. Our tailors visit your home for measurements and fabric pickup.",
              },
              {
                icon: Clock,
                title: "Timely Delivery",
                description: "We value your time. Every order is delivered on schedule, guaranteed.",
              },
              {
                icon: Heart,
                title: "Personal Touch",
                description: "Every garment is crafted with love and attention to your unique preferences.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group text-center p-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-sage/30 rounded-full flex items-center justify-center group-hover:bg-sage group-hover:border-sage transition-all duration-500">
                  <feature.icon className="w-8 h-8 text-sage group-hover:text-primary-foreground transition-colors duration-500" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-xl mb-4 group-hover:text-sage transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <div className="w-8 h-px bg-rose" />
              <p className="text-rose font-sans tracking-[0.3em] text-xs uppercase">
                How It Works
              </p>
              <div className="w-8 h-px bg-rose" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl"
            >
              Our Simple Process
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative"
              >
                <div className="text-8xl font-serif text-sage/20 group-hover:text-sage/40 transition-colors duration-500 mb-4">
                  {step.number}
                </div>
                <h3 className="font-serif text-xl mb-3 group-hover:text-sage transition-colors duration-300">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 bg-sage text-primary-foreground">
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
  className="px-6 py-3 text-base font-medium bg-background text-foreground border rounded-md hover:bg-background/90 flex items-center gap-2 justify-center"
>
  Book Appointment
  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
</Link>
            <Link
  to="/contact"
  className="px-6 py-3 text-base font-medium border border-white/50 rounded-md hover:bg-white/10"
>
  Contact Us
</Link>

          </motion.div>
        </div>
        
      </section>
      <Footer/>
    </div>
  );
};

export default Services;
