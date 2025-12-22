import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { productApi } from "../../api/productApi";
import  ProductCard  from "../../components/product/ProductCard";
import toast from "react-hot-toast";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await productApi.searchProducts({
        page: 0,
        pageSize: 8,          // show up to 8 featured products
        // isFeatured: true      // <-- IMPORTANT
      });

      setProducts(res.content);
    } catch (err) {
      toast.error("Failed to load featured products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-28 md:py-40">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-8 h-px bg-sage" />
              <p className="text-sage font-sans tracking-[0.3em] text-xs uppercase">
                Curated Selection
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl"
            >
              Featured Pieces
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 text-foreground hover:text-sage transition-colors mt-6 md:mt-0"
            >
              <span className="text-sm tracking-[0.15em] uppercase">View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-96 bg-secondary animate-pulse rounded-xl" />
            ))
          ) : (
            products.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

      </div>
    </section>
  );
};
