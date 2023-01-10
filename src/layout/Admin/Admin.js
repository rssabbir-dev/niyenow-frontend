import {
	faCubes,
	faCubesStacked,
	faLayerGroup,
	faMoneyBillTrendUp,
	faSitemap,
	faSlidersH,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
const items = (
	<>
		<div className='px-8'>
			<div className='h-16 w-full flex items-center'>
				<Link to='/' className='text-2xl font-bold text-gray-100'>
					NiyeNow
				</Link>
			</div>
			<ul className='mt-12'>
				<Link
					className='flex w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center mb-6'
					to='/admin'
				>
					<li>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faCubesStacked} />
							<span className='text-sm  ml-2'>Dashboard</span>
						</div>
					</li>
				</Link>
				<li>
					<Link
						className='flex w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center mb-6'
						to='/admin/manage-orders'
					>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faLayerGroup} />
							<span className='text-sm  ml-2'>Manage Order</span>
						</div>
					</Link>
				</li>
				<li>
					<Link
						className='flex w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center mb-6'
						to='/admin/sales-report'
					>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faMoneyBillTrendUp} />
							<span className='text-sm  ml-2'>Sales Report</span>
						</div>
					</Link>
				</li>
				{/* <li className='flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'>
								<div className='flex items-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='icon icon-tabler icon-tabler-code'
										width={20}
										height={20}
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path stroke='none' d='M0 0h24v24H0z' />
										<polyline points='7 8 3 12 7 16' />
										<polyline points='17 8 21 12 17 16' />
										<line x1={14} y1={4} x2={10} y2={20} />
									</svg>
									<span className='text-sm  ml-2'>
										Deliverables
									</span>
								</div>
							</li> */}
				{/* <li className='flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'>
								<div className='flex items-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='icon icon-tabler icon-tabler-puzzle'
										width={18}
										height={18}
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path stroke='none' d='M0 0h24v24H0z' />
										<path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1' />
									</svg>
									<span className='text-sm  ml-2'>
										Invoices
									</span>
								</div>
								<div className='py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs'>
									25
								</div>
							</li> */}
				<li>
					<Link
						className='flex w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center mb-6'
						to='/admin/products'
					>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faCubes} />
							<span className='text-sm  ml-2'>Products</span>
						</div>
					</Link>
				</li>
				<li>
					<Link
						className='flex mb-6 w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center'
						to='/admin/categories'
					>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faSitemap} />
							<span className='text-sm  ml-2'>Categories</span>
						</div>
					</Link>
				</li>
				<li>
					<Link
						className='flex mb-6 w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center'
						to='/admin/customers'
					>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faUsers} />
							<span className='text-sm  ml-2'>Customers</span>
						</div>
					</Link>
				</li>
				<li>
					<Link
						className='flex w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center mb-6'
						to='/admin/slider-editor'
					>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faSlidersH} />
							<span className='text-sm  ml-2'>Slider Editor</span>
						</div>
					</Link>
				</li>
			</ul>
			{/* <div className='flex justify-center mt-48 mb-4 w-full'>
				<div className='relative '>
					<div className='text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='icon icon-tabler icon-tabler-search'
							width={16}
							height={16}
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' />
							<circle cx={10} cy={10} r={7} />
							<line x1={21} y1={21} x2={15} y2={15} />
						</svg>
					</div>
					<input
						className=' bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2'
						type='text'
						placeholder='Search'
					/>
				</div>
			</div> */}
		</div>
		<div className='px-8 border-t border-gray-700'>
			<ul className='w-full flex items-center justify-between bg-gray-800'>
				<li className='cursor-pointer text-white pt-5 pb-3'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='icon icon-tabler icon-tabler-bell'
						width={20}
						height={20}
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' />
						<path d='M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6' />
						<path d='M9 17v1a3 3 0 0 0 6 0v-1' />
					</svg>
				</li>
				<li className='cursor-pointer text-white pt-5 pb-3'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='icon icon-tabler icon-tabler-messages'
						width={20}
						height={20}
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' />
						<path d='M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10' />
						<path d='M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2' />
					</svg>
				</li>
				<li className='cursor-pointer text-white pt-5 pb-3'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='icon icon-tabler icon-tabler-settings'
						width={20}
						height={20}
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' />
						<path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
						<circle cx={12} cy={12} r={3} />
					</svg>
				</li>
				<li className='cursor-pointer text-white pt-5 pb-3'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='icon icon-tabler icon-tabler-archive'
						width={20}
						height={20}
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' />
						<rect x={3} y={4} width={18} height={4} rx={2} />
						<path d='M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10' />
						<line x1={10} y1={12} x2={14} y2={12} />
					</svg>
				</li>
			</ul>
		</div>
	</>
);

const Admin = () => {
	const [showMenu, setShowMenu] = useState(false);
	const sidebarHandler = () => {
		setShowMenu(!showMenu);
	};
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<>
			<div className='flex flex-no-wrap relative'>
				{/* Sidebar starts */}
				{/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
				<div className='w-64 bg-gray-800 shadow md:h-screen flex-col justify-between md:flex md:sticky top-0 hidden'>
					{items}
				</div>
				<div
					className={`w-64 z-40 h-screen  bg-gray-800 shadow flex-col justify-between md:hidden transition duration-150 ease-in-out ${
						showMenu ? 'fixed left-0' : 'fixed -left-64'
					}`}
					id='mobile-nav'
				>
					<button onClick={sidebarHandler}>
						<div
							className='h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer'
							id='mobile-toggler'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon icon-tabler icon-tabler-adjustments'
								width={20}
								height={20}
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='#FFFFFF'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' />
								<circle cx={6} cy={10} r={2} />
								<line x1={6} y1={4} x2={6} y2={8} />
								<line x1={6} y1={12} x2={6} y2={20} />
								<circle cx={12} cy={16} r={2} />
								<line x1={12} y1={4} x2={12} y2={14} />
								<line x1={12} y1={18} x2={12} y2={20} />
								<circle cx={18} cy={7} r={2} />
								<line x1={18} y1={4} x2={18} y2={5} />
								<line x1={18} y1={9} x2={18} y2={20} />
							</svg>
						</div>
					</button>
					{items}
				</div>
				{/* Sidebar ends */}
				{/* Remove class [ h-64 ] when adding a card block */}
				<div className='py-10 w-full px-6 bg-slate-100'>
					{/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
					<div className='w-full h-full rounded'>
						{/* Place your content here */}
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default Admin;
