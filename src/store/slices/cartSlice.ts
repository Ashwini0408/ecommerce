// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import type { CartItem } from '../../types';

// interface CartState {
//   items: CartItem[];
//   totalItems: number;
//   totalPrice: number;
// }

// const initialState: CartState = {
//   items: JSON.parse(localStorage.getItem('cart') || '[]'),
//   totalItems: 0,
//   totalPrice: 0,
// };

// // Calculate totals helper
// const calculateTotals = (items: CartItem[]) => {
//   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = items.reduce((sum, item) => {
//     const price = item.salePrice || item.price;
//     return sum + price * item.quantity;
//   }, 0);
//   return { totalItems, totalPrice };
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     ...initialState,
//     ...calculateTotals(initialState.items),
//   },
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find(
//         (item) =>
//           item.productId === action.payload.productId &&
//           item.selectedSize === action.payload.selectedSize &&
//           item.selectedColor === action.payload.selectedColor
//       );

//       if (existingItem) {
//         // Check if adding quantity exceeds stock
//         if (existingItem.quantity + action.payload.quantity <= action.payload.stock) {
//           existingItem.quantity += action.payload.quantity;
//         } else {
//           existingItem.quantity = action.payload.stock;
//         }
//       } else {
//         state.items.push(action.payload);
//       }

//       // Recalculate totals
//       const totals = calculateTotals(state.items);
//       state.totalItems = totals.totalItems;
//       state.totalPrice = totals.totalPrice;

//       // Save to localStorage
//       localStorage.setItem('cart', JSON.stringify(state.items));
//     },

//     removeFromCart: (state, action: PayloadAction<{ productId: number; selectedSize?: string; selectedColor?: string }>) => {
//       state.items = state.items.filter(
//         (item) =>
//           !(
//             item.productId === action.payload.productId &&
//             item.selectedSize === action.payload.selectedSize &&
//             item.selectedColor === action.payload.selectedColor
//           )
//       );

//       // Recalculate totals
//       const totals = calculateTotals(state.items);
//       state.totalItems = totals.totalItems;
//       state.totalPrice = totals.totalPrice;

//       // Save to localStorage
//       localStorage.setItem('cart', JSON.stringify(state.items));
//     },

//     updateQuantity: (
//       state,
//       action: PayloadAction<{ productId: number; quantity: number; selectedSize?: string; selectedColor?: string }>
//     ) => {
//       const item = state.items.find(
//         (item) =>
//           item.productId === action.payload.productId &&
//           item.selectedSize === action.payload.selectedSize &&
//           item.selectedColor === action.payload.selectedColor
//       );

//       if (item) {
//         // Ensure quantity doesn't exceed stock
//         item.quantity = Math.min(Math.max(action.payload.quantity, 1), item.stock);
//       }

//       // Recalculate totals
//       const totals = calculateTotals(state.items);
//       state.totalItems = totals.totalItems;
//       state.totalPrice = totals.totalPrice;

//       // Save to localStorage
//       localStorage.setItem('cart', JSON.stringify(state.items));
//     },

//     clearCart: (state) => {
//       state.items = [];
//       state.totalItems = 0;
//       state.totalPrice = 0;
//       localStorage.removeItem('cart');
//     },

//     loadCartFromStorage: (state) => {
//       const savedCart = localStorage.getItem('cart');
//       if (savedCart) {
//         state.items = JSON.parse(savedCart);
//         const totals = calculateTotals(state.items);
//         state.totalItems = totals.totalItems;
//         state.totalPrice = totals.totalPrice;
//       }
//     },

//     incrementQuantity: (state, action: PayloadAction<{ productId: number; selectedSize?: string; selectedColor?: string }>) => {
//       const item = state.items.find(
//         (item) =>
//           item.productId === action.payload.productId &&
//           item.selectedSize === action.payload.selectedSize &&
//           item.selectedColor === action.payload.selectedColor
//       );

//       if (item && item.quantity < item.stock) {
//         item.quantity += 1;
//       }

//       // Recalculate totals
//       const totals = calculateTotals(state.items);
//       state.totalItems = totals.totalItems;
//       state.totalPrice = totals.totalPrice;

//       // Save to localStorage
//       localStorage.setItem('cart', JSON.stringify(state.items));
//     },

//     decrementQuantity: (state, action: PayloadAction<{ productId: number; selectedSize?: string; selectedColor?: string }>) => {
//       const item = state.items.find(
//         (item) =>
//           item.productId === action.payload.productId &&
//           item.selectedSize === action.payload.selectedSize &&
//           item.selectedColor === action.payload.selectedColor
//       );

//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }

//       // Recalculate totals
//       const totals = calculateTotals(state.items);
//       state.totalItems = totals.totalItems;
//       state.totalPrice = totals.totalPrice;

//       // Save to localStorage
//       localStorage.setItem('cart', JSON.stringify(state.items));
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
//   loadCartFromStorage,
//   incrementQuantity,
//   decrementQuantity,
// } = cartSlice.actions;

// export default cartSlice.reducer;



import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const saveGuestCart = (items: CartItem[]) => {
  localStorage.setItem("styliste_cart", JSON.stringify(items));
};

// Helper function to load and validate cart from localStorage
const loadAndValidateCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      
      // Validate and ensure numeric values
      return parsed.map((item: any) => ({
        ...item,
        price: Number(item.price) || 0,
        salePrice: item.salePrice ? Number(item.salePrice) : undefined,
        quantity: Number(item.quantity) || 1,
        stock: Number(item.stock) || 0,
        productId: Number(item.productId) || 0,
        itemId: Number(item.itemId) || 0, // This should be the backend ID
      }));
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

// Calculate totals helper with validation
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    return sum + quantity;
  }, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    const price = Number(item.salePrice || item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);
  
  return { totalItems, totalPrice };
};

// Single initialState declaration
const initialState: CartState = {
  items: loadAndValidateCartFromStorage(),
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    ...calculateTotals(initialState.items),
  },
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (existingItem) {
        // Check if adding quantity exceeds stock
        if (existingItem.quantity + action.payload.quantity <= action.payload.stock) {
          existingItem.quantity += action.payload.quantity;
        } else {
          existingItem.quantity = action.payload.stock;
        }
        
        // IMPORTANT: Update the itemId if provided (from backend)
        if (action.payload.itemId && action.payload.itemId > 0) {
          existingItem.itemId = action.payload.itemId;
        }
      } else {
        // Add new item with the backend itemId
        state.items.push({
          ...action.payload,
          itemId: action.payload.itemId || 0, // Use backend ID if provided
        });
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save guest cart ONLY if not logged in
      if (!localStorage.getItem("authToken")) {
        saveGuestCart(state.items);
      } else {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }

    },

    removeFromCart: (state, action: PayloadAction<{ productId: number; selectedSize?: string; selectedColor?: string }>) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
          )
      );

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      if (!localStorage.getItem("authToken")) {
      saveGuestCart(state.items);
    } else {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }

    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number; selectedSize?: string; selectedColor?: string }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (item) {
        // Ensure quantity doesn't exceed stock
        item.quantity = Math.min(Math.max(action.payload.quantity, 1), item.stock);
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      if (!localStorage.getItem("authToken")) {
      saveGuestCart(state.items);
    } else {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }

    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("styliste_cart");
    },


    // Load cart from localStorage
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          
          // Validate and ensure numeric values
          state.items = parsed.map((item: any) => ({
            ...item,
            price: Number(item.price) || 0,
            salePrice: item.salePrice ? Number(item.salePrice) : undefined,
            quantity: Number(item.quantity) || 1,
            stock: Number(item.stock) || 0,
            productId: Number(item.productId) || 0,
            itemId: Number(item.itemId) || 0,
          }));
          
          // Recalculate totals
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.totalPrice = totals.totalPrice;
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          state.items = [];
          state.totalItems = 0;
          state.totalPrice = 0;
        }
      }
    },

    // NEW ACTION: Load cart from backend response
    loadCartFromBackend: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload.map(item => ({
        ...item,
        price: Number(item.price) || 0,
        salePrice: item.salePrice ? Number(item.salePrice) : undefined,
        quantity: Number(item.quantity) || 1,
        stock: Number(item.stock) || 0,
        productId: Number(item.productId) || 0,
        itemId: Number(item.itemId) || 0, // This should be the backend ID
      }));
      
      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      if (!localStorage.getItem("authToken")) {
      saveGuestCart(state.items);
    } else {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }

    },

    // NEW ACTION: Update itemId from backend
    updateItemId: (
      state,
      action: PayloadAction<{ 
        productId: number; 
        itemId: number; 
        selectedSize?: string; 
        selectedColor?: string 
      }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (item) {
        item.itemId = action.payload.itemId;
      }

      // Save to localStorage
      if (!localStorage.getItem("authToken")) {
      saveGuestCart(state.items);
    } else {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }

    },

    incrementQuantity: (state, action: PayloadAction<{ productId: number; selectedSize?: string; selectedColor?: string }>) => {
      const item = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      if (!localStorage.getItem("authToken")) {
      saveGuestCart(state.items);
    } else {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }

    },

    decrementQuantity: (state, action: PayloadAction<{ productId: number; selectedSize?: string; selectedColor?: string }>) => {
      const item = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      if (!localStorage.getItem("authToken")) {
        saveGuestCart(state.items);
      } else {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }

    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCartFromStorage,
  loadCartFromBackend, // New export
  updateItemId, // New export
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;