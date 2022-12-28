import { createBrowserRouter } from 'react-router-dom';
import Admin from '../layout/Admin/Admin';
import Customer from '../layout/Customer/Customer';
import Main from '../layout/Main/Main';
import AdminHome from '../pages/AdminDashboard/AdminHome/AdminHome';
import AdminProducts from '../pages/AdminDashboard/AdminProducts/AdminProducts';
import AllCustomer from '../pages/AdminDashboard/AllCustomer/AllCustomer';
import Categories from '../pages/AdminDashboard/Categories/Categories';
import NewCategory from '../pages/AdminDashboard/NewCategory/NewCategory';
import NewProduct from '../pages/AdminDashboard/NewProduct/NewProduct';
import Login from '../pages/AuthManager/Login';
import Register from '../pages/AuthManager/Register';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import MyOrder from '../pages/CustomerDashboard/MyOrder/MyOrder';
import Home from '../pages/Home/Home/Home';
import PaymentPage from '../pages/Payment/PaymentPage/PaymentPage';
import ProductView from '../pages/ProductView/ProductView';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/product/:id',
				element: <ProductView />,
			},
			{
				path: '/cart',
				element: (
					<PrivateRoute>
						<Cart />
					</PrivateRoute>
				),
			},
			{
				path: '/checkout',
				element: (
					<PrivateRoute>
						<Checkout />
					</PrivateRoute>
				),
			},
			{
				path: '/payment',
				element: (
					<PrivateRoute>
						<PaymentPage />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: '/admin',
		element: (
			<PrivateRoute>
				<Admin />
			</PrivateRoute>
		),
		children: [
			{
				path: '/admin',
				element: (
					<AdminRoute>
						<AdminHome />
					</AdminRoute>
				),
			},
			{
				path: '/admin/products',
				element: (
					<AdminRoute>
						<AdminProducts />
					</AdminRoute>
				),
			},
			{
				path: '/admin/products/new-product',
				element: (
					<AdminRoute>
						<NewProduct />
					</AdminRoute>
				),
			},
			{
				path: '/admin/categories',
				element: (
					<AdminRoute>
						<Categories />
					</AdminRoute>
				),
			},
			{
				path: '/admin/categories/new-category',
				element: (
					<AdminRoute>
						<NewCategory />
					</AdminRoute>
				),
			},
			{
				path: '/admin/customers',
				element: (
					<AdminRoute>
						<AllCustomer />
					</AdminRoute>
				),
			},
		],
	},
	{
		path: '/customer',
		element: (
			<PrivateRoute>
				<Customer />
			</PrivateRoute>
		),
		children: [
			{
				path: '/customer',
				element: <MyOrder />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
]);
