import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ReviewModal = ({ product, setRefetch }) => {
	const { user } = useSelector((state) => state.auth);
	const [rating, setRating] = useState(4);
	const [reviewPostLoading, setReviewPostLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const handlePostReview = (data) => {
		setReviewPostLoading(true);
		const review = {
			customer_name: user?.displayName,
			customer_email: user?.email,
			customer_uid: user?.uid,
			customer_review: data.review,
			customer_rating: rating + 1,
			product_id: product._id,
			product_name: product.product_info.product_name,
			product_image: product.product_info.product_image,
			createAt: new Date(),
		};

		fetch(
			`${process.env.REACT_APP_API_URL}/review/${user?.uid}?id=${product._id}`,
			{
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem('token')
					)}`,
				},
				body: JSON.stringify(review),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				toast.success('Review Submitted');
				setReviewPostLoading(false);
				reset();
				setRefetch((state) => state + 1);
			});
	};
	return (
		<>
			<input type='checkbox' id='my-modal' className='modal-toggle' />
			<div className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Write Your Review</h3>
					<form
						onSubmit={handleSubmit(handlePostReview)}
						className='space-y-5'
					>
						<div className='-ml-1 flex'>
							{[...Array(5).keys()].map((rate) => (
								<FontAwesomeIcon
									key={rate}
									className={
										rate <= rating
											? 'text-yellow-400 h-6 w-6'
											: 'text-gray-300 h-6 w-6'
									}
									onClick={() => setRating(rate)}
									icon={faStar}
								/>
							))}
						</div>
						<div className='form-control'>
							<input
								type='text'
								className='input input-bordered'
								defaultValue={user?.displayName}
								disabled
							/>
						</div>
						<div className='form-control'>
							<input
								type='text'
								className='input input-bordered'
								defaultValue={user?.email}
								disabled
							/>
						</div>
						<div className='form-control'>
							<textarea
								className='textarea textarea-bordered'
								placeholder='Your review'
								{...register('review', {
									required: 'Please provide your review',
									minLength: {
										value: 100,
										message:
											'Please write your review minium 100 character',
									},
								})}
							></textarea>
						</div>
						{errors?.review && (
							<span className='text-sm text-red-500'>
								{errors?.review?.message}
							</span>
						)}
						<div className='modal-action'>
							<label
								htmlFor='my-modal'
								className='ml-3 inline-block rounded-lg bg-gray-400 px-5 py-3 text-sm font-medium text-white active:bg-blue-500 cursor-pointer '
							>
								Cancel
							</label>
							{!reviewPostLoading && (
								<button
									type='submit'
									className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white active:bg-black'
								>
									Submit Review
								</button>
							)}
							{reviewPostLoading && (
								<button
									disabled
									type='button'
									className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
								>
									<svg
										role='status'
										className='inline mr-3 w-4 h-4 text-white animate-spin'
										viewBox='0 0 100 101'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
											fill='#E5E7EB'
										/>
										<path
											d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
											fill='currentColor'
										/>
									</svg>
									Loading...
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ReviewModal;
