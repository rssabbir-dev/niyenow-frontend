import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import ReviewItem from './ReviewItem';

const CustomersReviews = ({ reviews, reviewsCount, averageSumOfReview }) => {
	const {user} = useSelector(state => state.auth)
	return (
		<section>
			<div class='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8'>
				<h2 class='text-xl font-bold sm:text-2xl'>Customer Reviews</h2>

				<div class='mt-4 flex items-center justify-between'>
					<div>
						<p class='text-3xl font-medium'>
							{averageSumOfReview}
							<span class='sr-only'> Average review score </span>
						</p>

						<div class='ml-4'>
							<div class='-ml-1 flex'>
								{[...Array(5).keys()].map((rate) => (
									<FontAwesomeIcon
										key={rate}
										className={
											rate <= averageSumOfReview - 1
												? 'text-yellow-400 h-6 w-6'
												: 'text-gray-300 h-6 w-6'
										}
										icon={faStar}
									/>
								))}
							</div>

							<p class='mt-0.5 text-xs text-gray-500'>
								Based on {reviewsCount} reviews
							</p>
						</div>
					</div>
					<div>
						{user?.uid && (
							<label
								htmlFor='my-modal'
								className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white cursor-pointer active:bg-black'
							>
								Post Review
							</label>
						)}
					</div>
				</div>

				{reviews.length > 0 ? (
					<div class='mt-8 grid gap-x-16 gap-y-12 grid-cols-1'>
						{reviews.map((review) => (
							<ReviewItem key={review._id} review={review} />
						))}
					</div>
				) : (
					<div className='mt-10 italic text-gray-500'>
						Don't have any review yet!
					</div>
				)}
			</div>
		</section>
	);
};

export default CustomersReviews;