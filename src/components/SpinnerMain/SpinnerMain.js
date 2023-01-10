import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
const SpinnerMain = () => {
	return (
		<div className='flex justify-center items-center h-screen'>
			<InfinitySpin width='200' color='#3B82F6' />
		</div>
	);
};

export default SpinnerMain;
