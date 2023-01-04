import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';
import { Slide } from '../../Home/HomeBanner/HomeBanner';

const SliderEditor = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		data: sliderData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['sliderData'],
		queryFn: async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/sliders`);
			const data = await res.json();
			return data;
		},
	});
	const location = useLocation();
	const handleSlideDelete = (id) => {
		fetch(`${process.env.REACT_APP_API_URL}/slide/${user?.uid}?id=${id}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				toast.success('Slide Deleted');
				refetch();
			});
	};
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<div className='flex justify-between items-center mb-4'>
				<nav className='mb-3 text-xl font-bold'>
					<Link
						to='/admin'
						className={
							location.pathname === '/admin'
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						Dashboard
					</Link>
					<span className='breadcrumb-arrow'>&gt;</span>
					<Link
						to={`/admin/slider-editor`}
						className={
							location.pathname.startsWith('/admin/slider-editor')
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						Slider Editor
					</Link>
				</nav>
				<Link
					className='btn btn-sm text-xs'
					to='/admin/slider-editor/new-slide'
				>
					New Slide
				</Link>
			</div>
			<div className='space-y-5'>
				{sliderData.map((slide) => (
					<div key={slide._id} className='border-4 relative'>
						<Link
							to={`/admin/slider-editor/edit/${slide._id}`}
							className='absolute top-5 left-5 btn btn-sm z-20'
						>
							Edit
						</Link>
						<button
							className='absolute top-5 right-5 btn btn-sm z-20'
							onClick={() => handleSlideDelete(slide._id)}
						>
							Delete
						</button>
						<Slide slide={slide} />
					</div>
				))}
			</div>
		</section>
	);
};

export default SliderEditor;
