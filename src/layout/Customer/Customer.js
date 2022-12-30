import { faCubesStacked } from '@fortawesome/free-solid-svg-icons';
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
				<Link to='/customer'>
					<li className='flex w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center mb-6'>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faCubesStacked} />
							<span className='text-sm  ml-2'>Dashboard</span>
						</div>
					</li>
				</Link>
				{/* <li className='flex w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center mb-6'>
					<Link to='/admin/sales-report'>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faMoneyBillTrendUp} />
							<span className='text-sm  ml-2'>Sales Report</span>
						</div>
					</Link>
				</li> */}
				{/* <li className='flex w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center mb-6'>
					<Link to='/admin/products'>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faCubes} />
							<span className='text-sm  ml-2'>Inventory</span>
						</div>
					</Link>
				</li> */}
				{/* <li className='flex mb-6 w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center'>
					<Link to='/admin/categories'>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faSitemap} />
							<span className='text-sm  ml-2'>Categories</span>
						</div>
					</Link>
				</li> */}
				{/* <li className='flex mb-6 w-full justify-between text-gray-100 hover:text-gray-300 cursor-pointer items-center'>
					<Link to='/admin/customers'>
						<div className='flex items-center'>
							<FontAwesomeIcon icon={faUsers} />
							<span className='text-sm  ml-2'>Customers</span>
						</div>
					</Link>
				</li> */}
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
const Customer = () => {
	const [showMenu, setShowMenu] = useState(false);
	const sidebarHandler = () => {
		setShowMenu(!showMenu);
	};
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		// <>
		// 	<Navbar bg={'bg-gray-300'} />
		// 	<section className='grid grid-cols-6 gap-10 bg-gray-50'>
		// 		<aside className='col-span-1 sticky bg-gray-300 top-0 h-screen overflow-hidden'>
		// 			<nav aria-label='Main Nav' className='flex flex-col sticky top-0'>
		// 				<Link
		// 					to='/customer'
		// 					className='flex items-center border-l-[3px] border-blue-500 bg-blue-50 px-4 py-3 text-blue-700'
		// 				>
		// 					<svg
		// 						xmlns='http://www.w3.org/2000/svg'
		// 						className='h-5 w-5 opacity-75'
		// 						fill='none'
		// 						viewBox='0 0 24 24'
		// 						stroke='currentColor'
		// 						strokeWidth='2'
		// 					>
		// 						<path
		// 							strokeLinecap='round'
		// 							strokeLinejoin='round'
		// 							d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
		// 						/>
		// 						<path
		// 							strokeLinecap='round'
		// 							strokeLinejoin='round'
		// 							d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
		// 						/>
		// 					</svg>

		// 					<span className='ml-3 text-sm font-medium'>
		// 						{' '}
		// 						Dashboard{' '}
		// 					</span>
		// 				</Link>

		// 				{/* <Link
		// 					to='/customer'
		// 					className='flex items-center border-l-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700'
		// 				>
		// 					<svg
		// 						xmlns='http://www.w3.org/2000/svg'
		// 						className='h-5 w-5 opacity-75'
		// 						fill='none'
		// 						viewBox='0 0 24 24'
		// 						stroke='currentColor'
		// 						strokeWidth='2'
		// 					>
		// 						<path
		// 							strokeLinecap='round'
		// 							strokeLinejoin='round'
		// 							d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
		// 						/>
		// 					</svg>

		// 					<span className='ml-3 text-sm font-medium'>
		// 						{' '}
		// 						Customers{' '}
		// 					</span>
		// 				</Link> */}

		// 				{/* <Link
		// 					to='/admin/customers'
		// 					className='flex items-center border-l-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700'
		// 				>
		// 					<svg
		// 						xmlns='http://www.w3.org/2000/svg'
		// 						className='h-5 w-5 opacity-75'
		// 						fill='none'
		// 						viewBox='0 0 24 24'
		// 						stroke='currentColor'
		// 						strokeWidth='2'
		// 					>
		// 						<path
		// 							strokeLinecap='round'
		// 							strokeLinejoin='round'
		// 							d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
		// 						/>
		// 					</svg>

		// 					<span className='ml-3 text-sm font-medium'>
		// 						{' '}
		// 						Billing{' '}
		// 					</span>
		// 				</Link> */}

		// 				{/* <a
		// 					href=''
		// 					className='flex items-center border-l-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700'
		// 				>
		// 					<svg
		// 						xmlns='http://www.w3.org/2000/svg'
		// 						className='h-5 w-5 opacity-75'
		// 						fill='none'
		// 						viewBox='0 0 24 24'
		// 						stroke='currentColor'
		// 						strokeWidth='2'
		// 					>
		// 						<path
		// 							strokeLinecap='round'
		// 							strokeLinejoin='round'
		// 							d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
		// 						/>
		// 					</svg>

		// 					<span className='ml-3 text-sm font-medium'>
		// 						{' '}
		// 						Invoices{' '}
		// 					</span>
		// 				</a> */}

		// 				{/* <a
		// 					href=''
		// 					className='flex items-center border-l-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700'
		// 				>
		// 					<svg
		// 						xmlns='http://www.w3.org/2000/svg'
		// 						className='h-5 w-5 opacity-75'
		// 						fill='none'
		// 						viewBox='0 0 24 24'
		// 						stroke='currentColor'
		// 						strokeWidth='2'
		// 					>
		// 						<path
		// 							strokeLinecap='round'
		// 							strokeLinejoin='round'
		// 							d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
		// 						/>
		// 					</svg>

		// 					<span className='ml-3 text-sm font-medium'>
		// 						{' '}
		// 						Account{' '}
		// 					</span>
		// 				</a> */}
		// 				{/* <Link
		// 					to='/admin/products'
		// 					className='flex items-center border-l-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700'
		// 				>
		// 					<svg
		// 						xmlns='http://www.w3.org/2000/svg'
		// 						className='h-5 w-5 opacity-75'
		// 						fill='none'
		// 						viewBox='0 0 24 24'
		// 						stroke='currentColor'
		// 						strokeWidth='2'
		// 					>
		// 						<path
		// 							strokeLinecap='round'
		// 							strokeLinejoin='round'
		// 							d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
		// 						/>
		// 					</svg>

		// 					<span className='ml-3 text-sm font-medium'>
		// 						{' '}
		// 						Products{' '}
		// 					</span>
		// 				</Link> */}
		// 				{/* <Link
		// 					to='/admin/categories'
		// 					className='flex items-center border-l-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700'
		// 				>
		// 					<svg
		// 						xmlns='http://www.w3.org/2000/svg'
		// 						className='h-5 w-5 opacity-75'
		// 						fill='none'
		// 						viewBox='0 0 24 24'
		// 						stroke='currentColor'
		// 						strokeWidth='2'
		// 					>
		// 						<path
		// 							strokeLinecap='round'
		// 							strokeLinejoin='round'
		// 							d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
		// 						/>
		// 					</svg>

		// 					<span className='ml-3 text-sm font-medium'>
		// 						{' '}
		// 						Categories{' '}
		// 					</span>
		// 				</Link> */}
		// 			</nav>
		// 		</aside>
		// 		<div className='col-span-5 mx-10 my-5'>
		// 			<Outlet />
		// 		</div>
		// 	</section>
		// </>
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

export default Customer;
