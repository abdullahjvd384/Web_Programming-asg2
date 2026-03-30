import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/cart');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCartAPI = createAsyncThunk('cart/add', async ({ productId, quantity = 1 }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/cart', { productId, quantity });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
  }
});

export const updateCartItemAPI = createAsyncThunk('cart/update', async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/cart/${itemId}`, { quantity });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
  }
});

export const removeCartItemAPI = createAsyncThunk('cart/remove', async (itemId, { rejectWithValue }) => {
  try {
    const { data } = await api.delete(`/cart/${itemId}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
  }
});

export const clearCartAPI = createAsyncThunk('cart/clear', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.delete('/cart');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
  }
});

const computeTotals = (items) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  items.forEach(item => {
    const product = item.productId;
    if (product) {
      totalQuantity += item.quantity;
      totalPrice += (product.price || 0) * item.quantity;
    }
  });
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null
  },
  reducers: {
    addToCartLocal: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find(item =>
        (item.productId?._id || item.productId) === product._id
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId: product, quantity, _id: Date.now().toString() });
      }
      const totals = computeTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    updateCartItemLocal: (state, action) => {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(item => item._id !== itemId);
      } else {
        const item = state.items.find(item => item._id === itemId);
        if (item) item.quantity = quantity;
      }
      const totals = computeTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    removeCartItemLocal: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      const totals = computeTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    clearCartLocal: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  },
  extraReducers: (builder) => {
    const handleCartFulfilled = (state, action) => {
      state.loading = false;
      state.items = action.payload.items || [];
      const totals = computeTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    };

    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, handleCartFulfilled)
      .addCase(fetchCart.rejected, (state) => { state.loading = false; })
      .addCase(addToCartAPI.pending, (state) => { state.loading = true; })
      .addCase(addToCartAPI.fulfilled, handleCartFulfilled)
      .addCase(addToCartAPI.rejected, (state) => { state.loading = false; })
      .addCase(updateCartItemAPI.pending, (state) => { state.loading = true; })
      .addCase(updateCartItemAPI.fulfilled, handleCartFulfilled)
      .addCase(updateCartItemAPI.rejected, (state) => { state.loading = false; })
      .addCase(removeCartItemAPI.pending, (state) => { state.loading = true; })
      .addCase(removeCartItemAPI.fulfilled, handleCartFulfilled)
      .addCase(removeCartItemAPI.rejected, (state) => { state.loading = false; })
      .addCase(clearCartAPI.pending, (state) => { state.loading = true; })
      .addCase(clearCartAPI.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addCase(clearCartAPI.rejected, (state) => { state.loading = false; });
  }
});

export const { addToCartLocal, updateCartItemLocal, removeCartItemLocal, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
