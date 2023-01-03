import { createBrowserRouter } from 'react-router-dom';
import Admin from '../layout/Admin/Admin';
import Customer from '../layout/Customer/Customer';
import Main from '../layout/Main/Main';
import AdminHome from '../pages/AdminDashboard/AdminHome/AdminHome';
import AdminProducts from '../pages/AdminDashboard/AdminProducts/AdminProducts';
import AllCustomer from '../pages/AdminDashboard/AllCustomer/AllCustomer';
import Categories from '../pages/AdminDashboard/Categories/Categories';
import ManageOrders from '../pages/AdminDashboard/ManageOrders/ManageOrders';
import NewCategory from '../pages/AdminDashboard/NewCategory/NewCategory';
import NewProduct from '../pages/AdminDashboard/NewProduct/NewProduct';
import NewSlide from '../pages/AdminDashboard/NewSlide/NewSlide';
import SalesReport from '../pages/AdminDashboard/SalesReport/SalesReport';
import SliderEditor from '../pages/AdminDashboard/SliderEditor/SliderEditor';
import Login from '../pages/AuthManager/Login';
import Register from '../pages/AuthManager/Register';
import Cart from '../pages/Cart/Cart';
import CategoryProducts from '../pages/CategoryProducts/CategoryProducts';
import Checkout from '../pages/Checkout/Checkout';
import MyOrder from '../pages/CustomerDashboard/MyOrder/MyOrder/MyOrder/MyOrder';
import OrderDetails from '../pages/CustomerDashboard/OrderDetails/OrderDetails';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Home from '../pages/Home/Home/Home';
import PaymentPage from '../pages/Payment/PaymentPage/PaymentPage';
import ProductView from '../pages/ProductView/ProductView';
import Shop from '../pages/Shop/Shop';
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
				path: '/shop',
				element: <Shop />,
			},
			{
				path: '/category/:slug',
				element: <CategoryProducts />,
			},
			{
				path: '/product/:id',
				element: <ProductView />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/cart',
				element: (
					<PrivateRoute>
						<Cart />
					</PrivateRoute>
				),
			},
			// {
			// 	path: '/checkout',
			// 	element: (
			// 		<PrivateRoute>
			// 			<Checkout />
			// 		</PrivateRoute>
			// 	),
			// },
			{
				path: '/payment/:id',
				element: (
					<PrivateRoute>
						<PaymentPage />
					</PrivateRoute>
				),
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '*',
				element: <ErrorPage />,
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
				path: '/admin/products/details/:id',
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
			{
				path: '/admin/manage-orders',
				element: (
					<AdminRoute>
						<ManageOrders />
					</AdminRoute>
				),
			},
			{
				path: '/admin/sales-report',
				element: (
					<AdminRoute>
						<SalesReport />
					</AdminRoute>
				),
			},
			{
				path: '/admin/order/details/:id',
				element: (
					<AdminRoute>
						<OrderDetails />
					</AdminRoute>
				),
			},
			{
				path: '/admin/slider-editor',
				element: (
					<AdminRoute>
						<SliderEditor />
					</AdminRoute>
				),
			},
			{
				path: '/admin/slider-editor/edit/:id',
				element: (
					<AdminRoute>
						<NewSlide/>
					</AdminRoute>
				)
			},
			{
				path: '/admin/slider-editor/new-slide',
				element: (
					<AdminRoute>
						<NewSlide />
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
			{
				path: '/customer/my-order/details/:id',
				element: <OrderDetails />,
			},
		],
	},
]);
