import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const NewSlide = () => {
	const [file, setFile] = useState('');

	const { user } = useSelector((state) => state.auth);
	const [isProductSaveLoading, setIsProductSaveLoading] = useState(false);

	const handleChange = (e) => {
		setFile(URL.createObjectURL(e.target.files[0]));
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const handleNewProduct = (data) => {
		setIsProductSaveLoading(true);
		const slide = {
			slide_title: data.slide_title,
			slide_description: data.slide_description,
			button_name: data.button_name,
			button_link: data.button_link,
			slide_image: null,
			createAt: new Date(),
		};
		const formData = new FormData();
		formData.append('image', data.slide_image[0]);
		fetch(
			`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_api_key}`,
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((imgData) => {
				slide.slide_image = imgData.data.url;
				handleSaveSlide(slide);
			});
	};

	const handleSaveSlide = (slideData) => {
		fetch(`${process.env.REACT_APP_API_URL}/sliders?uid=${user?.uid}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
			body: JSON.stringify(slideData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				toast.success('Slide Added');
				reset();
				setFile('');
				setIsProductSaveLoading(false);
			});
	};

	return (
		<section>
			<h4 className='text-xl mb-3'>Add New Slide</h4>
			<div>
				<form
					onSubmit={handleSubmit(handleNewProduct)}
					className='space-y-10'
				>
					<div>
						<input
							type='text'
							placeholder='Slide Title'
							className={`input w-full input-bordered ${
								errors.slide_title &&
								'focus:outline-red-500 border-red-500'
							}`}
							{...register('slide_title', {
								required: 'Slide Title Required',
								minLength: {
									value: 10,
									message: 'Should have minimum 10 character',
								},
								maxLength: {
									value: 20,
									message: 'Maximums 20 character',
								},
							})}
						/>
						{errors.slide_title && (
							<span className='text-red-500 text-sm'>
								{errors.slide_title?.message}
							</span>
						)}
					</div>

					<div>
						<h4 className='text-xl mb-2'>Description</h4>
						<textarea
							className={`textarea textarea-bordered w-full ${
								errors.slide_description &&
								'focus:outline-red-500 border-red-500'
							}`}
							placeholder='Some text'
							{...register('slide_description', {
								required: 'Slide Description Required',
								minLength: {
									value: 50,
									message: 'Should have minimum 50 character',
								},
								maxLength: {
									value: 150,
									message: 'Maximums 150 character',
								},
							})}
						></textarea>
						{errors.slide_description && (
							<span className='text-red-500 text-sm'>
								{errors.slide_description?.message}
							</span>
						)}
					</div>
					<div className='grid grid-cols-2 gap-10'>
						<div>
							<h4 className='text-xl mb-3'>Button Name</h4>
							<input
								type='text'
								placeholder='Button Name'
								className={`input input-bordered w-full ${
									errors.button_name &&
									'focus:outline-red-500 border-red-500'
								}`}
								{...register('button_name', {
									required: 'Button Name Required',
								})}
							/>
							{errors.button_name && (
								<span className='text-red-500 text-sm'>
									{errors.button_name?.message}
								</span>
							)}
						</div>
						<div>
							<h4 className='text-xl mb-3'>Button Link</h4>
							<input
								type='text'
								placeholder='Button Link'
								className={`input input-bordered w-full  ${
									errors.button_link &&
									'focus:outline-red-500 border-red-500'
								}`}
								{...register('button_link', {
									required: 'Button Link Required',
								})}
							/>
							{errors.button_link && (
								<span className='text-red-500 text-sm'>
									{errors.button_link?.message}
								</span>
							)}
						</div>
					</div>
					<div>
						<h4 className='text-xl mb-3'>Slide Image</h4>
						<div className=' rounded-lg shadow-xl bg-gray-50 '>
							<div className='m-4 py-4 cursor-pointer'>
								<div className='flex items-center justify-center w-full'>
									<label className='flex flex-col w-full items-center justify-center h-96 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300'>
										{!file && (
											<div className='flex flex-col items-center justify-center pt-7'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='w-8 h-8 text-gray-400 group-hover:text-gray-600'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
													/>
												</svg>
												<p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
													Attach a file
												</p>
											</div>
										)}
										{file && (
											<img
												className='h-full object-contain cursor-pointer'
												src={file}
												alt=''
											/>
										)}
										<input
											{...register('slide_image', {
												required:
													'Slide Image Required',
											})}
											type='file'
											className='opacity-0'
											onChange={handleChange}
											required
										/>
									</label>
								</div>
							</div>
						</div>
						{errors.slide_image && (
							<span className='text-red-500 text-sm'>
								{errors.slide_image?.message}
							</span>
						)}
					</div>
					<div>
						{!isProductSaveLoading && (
							<button className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'>
								Save Slide
							</button>
						)}
						{isProductSaveLoading && (
							<button
								disabled
								type='button'
								className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
							>
								<svg
									role='status'
									class='inline mr-3 w-4 h-4 text-white animate-spin'
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
		</section>
	);
};

export default NewSlide;
