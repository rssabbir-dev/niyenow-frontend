import userEvent from '@testing-library/user-event';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import { handleLogout } from '../../AuthManager/handleAuth';

const Navbar = ({bg}) => {
	const { user } = useSelector((state) => state.auth);
	const [isAdmin, isAdminLoading] = useAdmin();
	console.log(isAdmin);
	const { cartProducts } = useSelector((state) => state.cart);
	const logout = () => {
		handleLogout().then((res) => {
			toast.success('Logout Successfully');
		});
	};
	const subTotal = cartProducts.reduce(
		(prev, curr) => prev + parseInt(curr.product_info.price),
		0
	);
	return (
		<div className={`navbar ${bg}`}>
			<div className='flex-1'>
				<Link to='/' className='btn btn-ghost normal-case text-xl'>
					daisyUI
				</Link>
			</div>
			<div className='flex-none'>
				<div className='dropdown dropdown-end'>
					<label tabIndex={0} className='btn btn-ghost btn-circle'>
						<div className='indicator'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
								/>
							</svg>
							<span className='badge badge-sm indicator-item'>
								{cartProducts.length}
							</span>
						</div>
					</label>
					<div
						tabIndex={0}
						className='mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
					>
						<div className='card-body'>
							<span className='font-bold text-lg'>
								{cartProducts.length} Items
							</span>
							<span className='text-info'>
								Subtotal: ${subTotal}
							</span>
							<div className='card-actions'>
								<Link
									to='/cart'
									className='btn btn-primary btn-block'
								>
									View cart
								</Link>
							</div>
						</div>
					</div>
				</div>
				{user?.uid && (
					<div className='dropdown dropdown-end'>
						<label
							tabIndex={0}
							className='btn btn-ghost btn-circle avatar'
						>
							<div className='w-10 rounded-full'>
								<img src='https://placeimg.com/80/80/people' />
							</div>
						</label>
						<ul
							tabIndex={0}
							className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
						>
							{isAdmin && !isAdminLoading ? (
								<li>
									<Link to='/admin'>Admin Dashboard</Link>
								</li>
							) : (
								<li>Loading...</li>
							)}
							{!isAdmin && (
								<li>
									<Link to='/admin'>Customer Dashboard</Link>
								</li>
							)}
							<li>
								<a>Settings</a>
							</li>
							<li>
								<button onClick={logout}>Logout</button>
							</li>
						</ul>
					</div>
				)}
				{!user?.uid && (
					<Link to='/login' className='btn'>
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
