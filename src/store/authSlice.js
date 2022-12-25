const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
	name: 'auth',
	initialState: { user: null, isAdmin: false, userLoading: true,adminLoading:true },
	reducers: {
		login(state, action) {
			const formData = JSON.parse(action.payload);
			console.log('payload', formData);
			state.user = formData;
		},
		register() {},
		providerLogin() {},
		logout() {},
		checkAdmin(state, action) {
			const userRole = action.payload;
			if (userRole === 'admin') {
				state.isAdmin = true;
				console.log('admin');
			} else {
				state.isAdmin = false;
				console.log('customer');
			}
        },
        setLoading(state, action) {
            state.userLoading = action.payload;
        },
        setAdminLoading(state, action) {
            state.adminLoading = action.payload;
        }
	},
});

export const authActions = authSlice.actions;
export default authSlice;
