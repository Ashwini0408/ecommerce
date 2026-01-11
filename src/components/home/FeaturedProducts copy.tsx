import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Indo-Western Gown",
    price: "₹12,500",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  },
  {
    id: 2,
    name: "Bridal Lehenga",
    price: "₹28,000",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
  },
  {
    id: 3,
    name: "Saree Conversion Dress",
    price: "₹9,800",
    image: "https://images.unsplash.com/photo-1617922001439-4a2e6562f6d0?w=600&q=80",
  },
  {
    id: 4,
    name: "Designer Blouse",
    price: "₹4,500",
    image: "https://images.unsplash.com/photo-1618354691229-88d47f285158?w=600&q=80",
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-28 md:py-40 bg-[hsl(var(--primary))]">
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-10 h-px bg-white/60" />
              <p className="text-white/70 tracking-[0.35em] text-xs uppercase">
                Our Collection
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl text-white"
            >
              Featured{" "}
              <span className="italic text-white/50">
                Products
              </span>
            </motion.h2>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3
                         rounded-full border border-white/40
                         px-7 py-3 text-white
                         backdrop-blur-sm
                         transition-all duration-300
                         hover:bg-white/10"
            >
              View All Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mt-5">
                <h3 className="font-serif text-xl text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-white/60 text-sm">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
