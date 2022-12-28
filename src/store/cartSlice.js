import { createSlice, current } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: { cartProducts: [], refetch: 0, subTotal: 0 },
	reducers: {
		loadCart(state, action) {
			const cartItems = action.payload;
			state.cartProducts = [];
			state.cartProducts.push(...cartItems);
			state.subTotal = state.cartProducts.reduce(
				(prev, curr) =>
					prev + parseInt(curr.product_info?.price),
				0
			);
			console.log(state.subTotal);
			console.log(state.cartProducts);
		},

		refetch(state) {
			state.refetch++;
		},
	},
});
export const cartActions = cartSlice.actions;
export default cartSlice;
