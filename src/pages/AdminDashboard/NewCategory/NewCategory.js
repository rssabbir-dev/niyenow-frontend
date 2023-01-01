import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const NewCategory = () => {
	const [file, setFile] = useState('');
	const location = useLocation()

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
	const handleNewProduct = (data) => {
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
				console.log('Img Saved');
				handleSaveCategory(category);
			});
	};

	const handleSaveCategory = (categoryData) => {
		console.log('inside save pd');
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
				console.log(data);
				console.log('pd saved');
				toast.success('Product Added');
				reset();
				setFile('');
			});
		console.log('Hello');
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
					onSubmit={handleSubmit(handleNewProduct)}
					className='space-y-10'
				>
					<div>
						<input
							type='text'
							placeholder='Category Name'
							className='input w-full input-bordered'
							{...register('category_name', {
								required: 'Product Name Required',
							})}
						/>
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
											/>
										)}
										<input
											{...register('category_image', {
												required: 'Product Image Cover',
											})}
											type='file'
											className='opacity-0'
											onChange={handleChange}
										/>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div>
						<button className='btn btn-primary'>
							Save Product
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default NewCategory;
