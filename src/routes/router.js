import { createBrowserRouter } from 'react-router-dom';
import Admin from '../layout/Admin/Admin';
import Main from '../layout/Main/Main';
import AdminHome from '../pages/AdminDashboard/AdminHome/AdminHome';
import AdminProducts from '../pages/AdminDashboard/AdminProducts/AdminProducts';
import NewProduct from '../pages/AdminDashboard/NewProduct/NewProduct';
import Login from '../pages/AuthManager/Login';
import Register from '../pages/AuthManager/Register';
import Home from '../pages/Home/Home/Home';
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
                element:<ProductView/>
            },
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
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
		],
	},
]);
