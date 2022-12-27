import { createSlice, current } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: { cartProducts: [],refetch:0 },
	reducers: {
		loadCart(state, action) {
            const cartItems = action.payload;
            state.cartProducts = []
            state.cartProducts.push(...cartItems)
		},

		refetch(state) {
            state.refetch++
		},
	},
});
export const cartActions = cartSlice.actions;
export default cartSlice;
