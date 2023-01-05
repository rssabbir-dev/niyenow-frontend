import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import { Link } from 'react-router-dom';
const HomeBanner = ({ sliderData }) => {
	return (
		<>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={false}
				modules={[Autoplay]}
				className='mySwiper'
			>
				{sliderData?.map((slide) => (
					<SwiperSlide key={slide._id}>
						<Slide slide={slide} />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export const Slide = ({ slide }) => {
	return (
		<div className='bg-slate-100'>
			<div className=''>
				<div className='relative'>
					<div className='absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25'></div>
					<img
						src={slide?.slide_image}
						alt='A work table with house plants'
						className='w-full object-cover hidden lg:block h-[500px]'
					/>
					<img
						src={slide?.slide_image}
						alt='A work table with house plants'
						className='hidden sm:block lg:hidden w-full h-[500px] object-cover'
					/>
					<img
						src={slide?.slide_image}
						alt='A work table with house plants'
						className='sm:hidden w-full h-[300px] object-cover'
					/>

					<div className='absolute z-10 top-0 left-0 mx-4 sm:mx-0 mt-36 sm:mt-0 sm:py-20 md:py-28 lg:py-20 xl:py-28 sm:pl-14 flex flex-col sm:justify-start items-start'>
						<h1 className='text-3xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 sm:w-8/12 uppercase'>
							{slide?.slide_title}
						</h1>
						<p className='sm:block text-base leading-normal text-gray-800 mt-4 sm:mt-5 sm:w-5/12'>
							{slide?.slide_description}
						</p>
						<Link
							to={slide?.button_link}
							className='hidden sm:flex bg-gray-800 py-4 px-8 text-base font-medium text-white mt-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700'
						>
							{slide?.button_name}
						</Link>
					</div>
					<Link
						to={slide?.button_link}
						className='absolute bottom-0 sm:hidden bg-gray-800 py-4 text-base font-medium text-white mt-8 flex justify-center items-center w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700'
					>
						{slide?.button_name}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HomeBanner;
