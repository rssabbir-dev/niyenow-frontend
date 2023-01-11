import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const NewCategory = () => {
	const [file, setFile] = useState('');
	const location = useLocation()
	const [isCategorySaveLoading,setIsCategorySaveLoading] = useState(false)

	const { user } = useSelector((state) => state.auth);
	console.log(user);

	const handleChange = (e) => {
		setFile(URL.createObjectURL(e.target.files[0]));
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const handleNewCategory = (data) => {
		setIsCategorySaveLoading(true)
		const category = {
            name: data.category_name,
            image: data.category_image,
            slug: data.slug,
			createAt: new Date(),
		};
		const formData = new FormData();
		formData.append('image', data.category_image[0]);
		fetch(
			`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_api_key}`,
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((imgData) => {
				category.image = imgData.data.url;
				handleSaveCategory(category);
			});
	};

	const handleSaveCategory = (categoryData) => {
		fetch(`${process.env.REACT_APP_API_URL}/categories?uid=${user?.uid}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
			body: JSON.stringify(categoryData),
		})
			.then((res) => res.json())
			.then((data) => {
				setIsCategorySaveLoading(false)
				toast.success('Category Added');
				reset();
				setFile('');

			});
	};

	return (
		<section>
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
					to={`/admin/categories`}
					className={
						location.pathname === '/admin/categories'
							? 'breadcrumb-active'
							: 'breadcrumb-not-active'
					}
				>
					Categories List
				</Link>
				<span className='breadcrumb-arrow'>&gt;</span>
				<Link
					to={`/admin/categories/new-category`}
					className={
						location.pathname.startsWith(
							'/admin/categories/new-category'
						)
							? 'breadcrumb-active'
							: 'breadcrumb-not-active'
					}
				>
					Add New
				</Link>
			</nav>
			<div>
				<form
					onSubmit={handleSubmit(handleNewCategory)}
					className='space-y-10'
				>
					<div>
						<input
							type='text'
							placeholder='Category Name'
							className='input w-full input-bordered'
							{...register('category_name', {
								required: 'Category Name Required',
							})}
						/>
						{errors.category_name && (
							<span className='text-red-500 text-sm'>
								{errors.category_name?.message}
							</span>
						)}
					</div>
					<div>
						<input
							type='text'
							placeholder='Slug: winter-collection'
							className='input w-full input-bordered'
							{...register('slug', {
								required: 'Slug Name Required',
							})}
						/>
						{errors.slug && (
							<span className='text-red-500 text-sm'>
								{errors.slug?.message}
							</span>
						)}
					</div>
					<div>
						<h4 className='text-xl mb-3'>Category Image</h4>
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
												re
											/>
										)}
										<input
											{...register('category_image', {
												required: 'Product Image Cover',
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
					</div>
					<div>
						{!isCategorySaveLoading && (
							<button className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'>
								Save Category
							</button>
						)}
						{isCategorySaveLoading && (
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
		</section>
	);
};

export default NewCategory;
