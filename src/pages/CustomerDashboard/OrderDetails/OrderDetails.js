import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';

const OrderDetails = () => {
	const { user } = useSelector((state) => state.auth);
	const [order, setOrder] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();
	const param = useParams();
	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_API_URL}/order/${user?.uid}?id=${param.id}`,
			{
				headers: {
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem('token')
					)}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setOrder(data);
				setIsLoading(false);
			});
	}, [param.id, user?.uid]);
	const handleBack = () => {
		if (window.history.state) {
			window.history.go(-1);
			console.log(window.history);
		} else {
			navigate('/admin/customers');
		}
		return false;
	};
	if (isLoading) {
		return <SpinnerMain />;
	}
	const generatePDF = () => {
		const report = new jsPDF('p', 'pt', 'a4');
		report.html(document.querySelector('#invoice')).then(() => {
			report.save('invoice.pdf');
		});
	};

	return (
		<div id='invoice'>
			<div>
				<button onClick={handleBack} className='btn btn-sm'>
					Back
				</button>
			</div>
			<div className='flex justify-start item-start space-y-2 flex-col '>
				<h1 className='text-2xl font-semibold leading-7 lg:leading-9  text-gray-800'>
					Order #{order._id}
				</h1>
				<p className='text-base font-medium leading-6 text-gray-600'>
					{format(new Date(order.createAt), 'Pp')}
				</p>
			</div>
			<div className='mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0'>
				<div className='flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8'>
					<div className='flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full'>
						{order?.ordered_products.map((pd) => (
							<div
								key={pd._id}
								className='mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full '
							>
								<div className='w-full md:w-40'>
									<img
										className='w-full hidden md:block'
										src={pd.product_info.image}
										alt='dress'
									/>
									<img
										className='w-full md:hidden'
										src={pd.product_info.image}
										alt='dress'
									/>
								</div>
								<div className='  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  '>
									<div className='w-full flex flex-col justify-start items-start space-y-8'>
										<h3 className=' xl:text-lg font-semibold leading-6 text-gray-800'>
											{pd.product_info.name}
										</h3>
										<div className='flex justify-start items-start flex-col space-y-2'>
											<p className='text-sm leading-none text-gray-800'>
												<span className='text-gray-300'>
													Style:{' '}
												</span>{' '}
												Italic Minimal Design
											</p>
											<p className='text-sm leading-none text-gray-800'>
												<span className='text-gray-300'>
													Size:{' '}
												</span>{' '}
												Small
											</p>
											<p className='text-sm leading-none text-gray-800'>
												<span className='text-gray-300'>
													Color:{' '}
												</span>{' '}
												Light Blue
											</p>
										</div>
									</div>
									<div className='flex justify-between space-x-8 items-start w-full'>
										<p className='text-base xl:text-lg leading-6'>
											${pd.product_info.price}{' '}
											{/* <span className='text-red-300 line-through'>
												{' '}
												$30.00
											</span> */}
										</p>
										<p className='text-base xl:text-lg leading-6 text-gray-800'>
											Q:{pd.product_info.quantity}
										</p>
										<p className='text-base xl:text-lg font-semibold leading-6 text-gray-800'>
											${order.subTotal}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8'>
						<div className='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   '>
							<h3 className='text-xl font-semibold leading-5 text-gray-800'>
								Summary
							</h3>
							<div className='flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4'>
								<div className='flex justify-between  w-full'>
									<p className='text-base leading-4 text-gray-800'>
										Subtotal
									</p>
									<p className='text-base leading-4 text-gray-600'>
										${order.subTotal}
									</p>
								</div>
								{/* <div className='flex justify-between items-center w-full'>
									<p className='text-base leading-4 text-gray-800'>
										Discount{' '}
										<span className='bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800'>
											STUDENT
										</span>
									</p>
									<p className='text-base leading-4 text-gray-600'>
										-$28.00 (50%)
									</p>
								</div> */}
								<div className='flex justify-between items-center w-full'>
									<p className='text-base leading-4 text-gray-800'>
										Shipping
									</p>
									<p className='text-base leading-4 text-gray-600'>
										Free
									</p>
								</div>
							</div>
							<div className='flex justify-between items-center w-full'>
								<p className='text-base font-semibold leading-4 text-gray-800'>
									Total
								</p>
								<p className='text-base font-semibold leading-4 text-gray-600'>
									${order.subTotal}
								</p>
							</div>
						</div>
						<div className='flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   '>
							<h3 className='text-xl font-semibold leading-5 text-gray-800'>
								Shipping
							</h3>
							<div className='flex justify-between items-start w-full'>
								<div className='flex justify-center items-center space-x-4'>
									<div className='w-8 h-8'>
										<img
											className='w-full h-full'
											alt='logo'
											src='https://i.ibb.co/L8KSdNQ/image-3.png'
										/>
									</div>
									<div className='flex flex-col justify-start items-center'>
										<p className='text-lg leading-6 font-semibold text-gray-800'>
											DPD Delivery
											<br />
											<span className='font-normal'>
												Delivery with 24 Hours
											</span>
										</p>
									</div>
								</div>
								<p className='text-lg font-semibold leading-6 text-gray-800'>
									Free
								</p>
							</div>
							<div className='w-full flex justify-center items-center'>
								<button className='hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white'>
									View Carrier Details
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col '>
					<h3 className='text-xl font-semibold leading-5 text-gray-800'>
						Customer
					</h3>
					<div className='flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 '>
						<div className='flex flex-col justify-start items-start flex-shrink-0'>
							<div className='flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200'>
								{/* <img
									src='https://i.ibb.co/5TSg7f6/Rectangle-18.png'
									alt='avatar'
								/> */}
								<div className=' flex justify-start items-start flex-col space-y-2'>
									<p className='text-base font-semibold leading-4 text-left text-gray-800'>
										{order.customer_name}
									</p>
									<p className='text-sm leading-5 text-gray-600'>
										10 Previous Orders
									</p>
								</div>
							</div>

							<div className='flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z'
										stroke='#1F2937'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M3 7L12 13L21 7'
										stroke='#1F2937'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								<p className='cursor-pointer text-sm leading-5 text-gray-800'>
									{order.customer_email}
								</p>
							</div>
						</div>
						<div className='flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0'>
							<div className='flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start '>
								<div className='flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8'>
									<p className='text-base font-semibold leading-4 text-center md:text-left text-gray-800'>
										Shipping Address
									</p>
									<p className='w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600'>
										{order.address}
									</p>
								</div>
								<div className='flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 '>
									<p className='text-base font-semibold leading-4 text-center md:text-left text-gray-800'>
										Billing Address
									</p>
									<p className='w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600'>
										{order.address}
									</p>
								</div>
								<div className='flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 mb-5'>
									<p className='text-base font-semibold leading-4 text-center md:text-left text-gray-800 space-x-2'>
										<span>Payment Status</span>
										<span
											className={` text-sm p-2 rounded-xl ${
												order.payment_status
													? 'bg-green-100 text-green-700'
													: 'bg-red-100 text-red-500'
											}`}
										>
											{order.payment_status
												? 'Paid'
												: 'Unpaid'}
										</span>
									</p>
									<p className='w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600'>
										{order?.transactionId}
									</p>
								</div>
							</div>
							<div className='flex w-full justify-center items-center md:justify-start md:items-start'>
								<button
									onClick={generatePDF}
									className='mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800'
								>
									Download Invoice{' '}
									<FontAwesomeIcon icon={faDownload} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
