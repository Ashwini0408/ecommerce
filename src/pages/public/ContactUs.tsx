import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { i } from "framer-motion/client";
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

  return (
    <div className="bg-background text-foreground">
        <Navbar />
      {/* Header */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-px bg-sage" />
            <p className="text-sage font-sans tracking-[0.3em] text-xs uppercase">
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
            We'd love to hear from you. Whether you have a question about our collections or need styling advice, our team is here to help.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-serif text-3xl mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-xs font-sans tracking-[0.15em] uppercase mb-3 block">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="h-14 px-5 bg-secondary border-border focus:border-sage"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-sans tracking-[0.15em] uppercase mb-3 block">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="h-14 px-5 bg-secondary border-border focus:border-sage"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="text-xs font-sans tracking-[0.15em] uppercase mb-3 block">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="h-14 px-5 bg-secondary border-border focus:border-sage"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-xs font-sans tracking-[0.15em] uppercase mb-3 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={6}
                    required
                    className="bg-secondary border-border resize-none focus:border-sage px-5 py-4"
                  />
                </div>
                <button
  type="submit"
  className="px-6 h-12 bg-sage text-black flex items-center gap-2 border border-transparent hover:bg-sage/90 transition group"
>
  Send Message
  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
</button>

              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-serif text-3xl mb-8">Visit Our Boutique</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Experience STYLISTE in person at our flagship store. Our style consultants are available to provide personalized shopping assistance.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 border border-border flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-sage" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Address</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      123 Fashion Avenue
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 border border-border flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-sage" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 border border-border flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-sage" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm">hello@styliste.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 border border-border flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-sage" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Hours</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Monday - Saturday: 10am - 8pm
                      <br />
                      Sunday: 11am - 6pm
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-10 aspect-video bg-secondary overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=80"
                  alt="Store location"
                  className="w-full h-full object-cover opacity-60"
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
