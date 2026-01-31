import { createContext, useContext, useEffect, useState } from "react";
import { wishlistApi } from "../api/wishlistApi";

interface WishlistContextType {
  wishlistIds: number[];
  toggleWishlist: (productId: number) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  // load wishlist once
  useEffect(() => {
    const load = async () => {
      try {
        const data = await wishlistApi.getWishlist();
        setWishlistIds(data.products.map(p => p.id));
      } catch {}
    };
    load();
  }, []);

  const toggleWishlist = async (productId: number) => {
    // optimistic update
    setWishlistIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );

    try {
      await wishlistApi.toggleWishlist(productId);
    } catch {
      // rollback if needed (optional)
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
