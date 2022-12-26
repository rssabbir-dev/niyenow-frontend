import authSlice from './authSlice';
import cartSlice from './cartSlice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		cart: cartSlice.reducer,
	},
});
export default store;
