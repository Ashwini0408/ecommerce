import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Navbar from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent. We'll be in touch soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    "w-full bg-[#1f2214] border border-[#2c2f1d] text-[#e6e4d8] placeholder:text-[#b7b39a] focus:border-[#9fa36b] focus:ring-1 focus:ring-[#9fa36b]/40 outline-none rounded-md transition-all";

  return (
    <div className="bg-background text-foreground">

      {/* ================= HEADER ================= */}
      <section className="py-20 md:py-32 border-b border-border">
        <Navbar />
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-px bg-sage" />
            <p className="text-sage tracking-[0.3em] text-xs uppercase">
              Get in Touch
            </p>
            <div className="w-8 h-px bg-sage" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl mb-6"
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            We'd love to hear from you. Whether you have a question about our
            services or need styling advice, our team is here to help.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* ========== CONTACT FORM ========== */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-serif text-3xl mb-8">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-[#b7b39a] mb-3 block">
                      Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={`${inputClass} h-14 px-5`}
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-[#b7b39a] mb-3 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className={`${inputClass} h-14 px-5`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-[#b7b39a] mb-3 block">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className={`${inputClass} h-14 px-5`}
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-[#b7b39a] mb-3 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us more..."
                    required
                    className={`${inputClass} px-5 py-4 resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-primary-foreground hover:bg-sage/90 transition-all rounded-md group"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>

            {/* ========== CONTACT INFO ========== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-serif text-3xl mb-8">Visit Our Boutique</h2>

              <p className="text-muted-foreground mb-10 leading-relaxed">
                Experience STYLISTE in person at our boutique. Our style
                consultants are available to provide personalized styling
                assistance and doorstep service.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 border border-border flex items-center justify-center">
                    <Phone className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Phone</h3>
                    <a
                      href="tel:+917020601937"
                      className="text-muted-foreground text-sm hover:text-sage transition-colors"
                    >
                      +91 7020601937
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 border border-border flex items-center justify-center">
                    <Mail className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Email</h3>
                    <a
                      href="mailto:info@styliste-couturier.com"
                      className="text-muted-foreground text-sm hover:text-sage transition-colors"
                    >
                      info@styliste-couturier.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 border border-border flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-sage" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    F-44, 1st Floor, Raymond Realty TenX Vibes,
                    <br />
                    Pokharan Rd. No. 2, Thane West - 400606
                  </p>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 border border-border flex items-center justify-center">
                    <Clock className="w-5 h-5 text-sage" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Tuesday – Sunday: 11 AM – 8 PM
                    <br />
                    Monday: Closed
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="mt-10 aspect-video bg-secondary overflow-hidden rounded-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.5!2d72.97!3d19.22!5e0!3m2!1sen!2sin"
                  className="w-full h-full opacity-80"
                  loading="lazy"
                  title="STYLISTE Location"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
