import { createSlice } from "@reduxjs/toolkit";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: load() },
  reducers: {
    addItem(state, { payload }) {
      const found = state.items.find((i) => i.id === payload.id);
      if (found) found.qty += payload.qty ?? 1;
      else state.items.push({ ...payload, qty: payload.qty ?? 1 });
    },
    changeQty(state, { payload: { id, qty } }) {
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = Math.max(1, qty);
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, changeQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
