import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';
import { Slide } from '../../Home/HomeBanner/HomeBanner';

const SliderEditor = () => {
	const { data: sliderData, isLoading } = useQuery({
		queryKey: ['sliderData'],
		queryFn: async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/sliders`);
			const data = await res.json();
			return data;
		},
	});
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<div className='flex justify-between items-center mb-4'>
				<p className='font-bold text-lg'>Slide List</p>
				<Link
					className='btn btn-sm text-xs'
					to='/admin/slider-editor/new-slide'
				>
					New Slide
				</Link>
			</div>
			<div>
				{sliderData.map((slide) => (
                    <Slide key={slide._id} slide={slide} />
				))}
			</div>
		</section>
	);
};

export default SliderEditor;
