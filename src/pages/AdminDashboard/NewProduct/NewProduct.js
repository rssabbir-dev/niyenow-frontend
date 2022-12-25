import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const NewProduct = () => {
	const [file, setFile] = useState('');

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
		const product = {
			product_info: {
				product_name: data.product_name,
				product_description: data.product_description,
				product_category: data.product_category,
				product_image: null,
				product_price: data.product_price,
				product_quantity: data.product_quantity,
			},
			seller_info: {
				seller_name: user.displayName,
				seller_email: user.email,
				seller_uid: user.uid,
			},
			createAt: new Date(),
		};
		const formData = new FormData();
		formData.append('image', data.product_image[0]);
		fetch(
			`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_api_key}`,
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((res) => res.json())
			.then((imgData) => {
				product.product_info.product_image = imgData.data.url;
				console.log('Img Saved');
				handleSaveProduct(product);
			});
	};

	const handleSaveProduct = (productData) => {
		console.log('inside save pd');
		fetch(`${process.env.REACT_APP_API_URL}/product?uid=${user?.uid}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
			body: JSON.stringify(productData),
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
			<h4 className='text-xl mb-3'>Add New Product</h4>
			<div>
				<form
					onSubmit={handleSubmit(handleNewProduct)}
					className='space-y-10'
				>
					<div>
						<input
							type='text'
							placeholder='Product Name'
							className='input w-full input-bordered'
							{...register('product_name', {
								required: 'Product Name Required',
							})}
						/>
					</div>
					<div>
						<h4 className='text-xl mb-2'>Description</h4>
						<textarea
							className='textarea textarea-bordered w-full'
							placeholder='Bio'
							{...register('product_description', {
								required: 'Product Description Required',
							})}
						></textarea>
					</div>
					<div className='grid grid-cols-3 gap-10'>
						<div>
							<h4 className='text-xl mb-3'>Category</h4>
							<select
								{...register('product_category', {
									required: 'Category is Required',
								})}
								className='select select-bordered w-full max-w-xs'
							>
								<option disabled selected>
									Who shot first?
								</option>
								<option>Han Solo</option>
								<option>Greedo</option>
							</select>
						</div>
						<div>
							<h4 className='text-xl mb-3'>Price</h4>
							<input
								type='number'
								placeholder='Product Price'
								className='input input-bordered w-full max-w-xs'
								{...register('product_price', {
									required: 'Product Price Required',
								})}
							/>
						</div>
						<div>
							<h4 className='text-xl mb-3'>Quantity</h4>
							<input
								type='text'
								placeholder='Product Quantity'
								className='input input-bordered w-full max-w-xs'
								{...register('product_quantity', {
									required: 'Product Quantity Required',
								})}
							/>
						</div>
					</div>
					<div>
						<h4 className='text-xl mb-3'>Cover Image</h4>
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
											{...register('product_image', {
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

export default NewProduct;
