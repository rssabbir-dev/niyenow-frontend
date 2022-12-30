import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = ({transactionId}) => {
	return (
		<div className='flex justify-center items-center h-[500px]'>
			<div className='text-center space-y-3'>
				<h4 className='text-4xl text-green-500'>Payment Complete</h4>
				Transaction ID: {transactionId}
				<p>You can track you order here</p>
				<Link
					to='/customer'
					type='button'
					className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
				>
					Manage Order
				</Link>
			</div>
		</div>
	);
};

export default OrderSuccess;
