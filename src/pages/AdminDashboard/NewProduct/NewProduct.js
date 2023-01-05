import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';

const NewProduct = () => {
	const [file, setFile] = useState('');
	const location = useLocation();
	const param = useParams();
	const { user } = useSelector((state) => state.auth);
	const [isProductSaveLoading, setIsProductSaveLoading] = useState(false);
	const [isProductExist, setIsProductExist] = useState({});
	const [isProductExistLoading, setIsProductExistLoading] = useState(false);

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
		const optionCategoryName = data.product_category.split('^^')[1];
		const optionCategorySlug = data.product_category.split('^^')[0];
		setIsProductSaveLoading(true);
		const formData = new FormData();
		formData.append('image', data.product_image[0]);
		if (!location.pathname.startsWith('/admin/products/details')) {
			const product = {
				product_info: {
					product_name: data.product_name,
					product_description: data.product_description,
					product_category: optionCategoryName,
					category_slug: optionCategorySlug,
					product_image: null,
					product_price: parseInt(data.product_price),
					product_quantity: parseInt(data.product_quantity),
					totalSale: 0,
				},
				seller_info: {
					seller_name: user.displayName,
					seller_email: user.email,
					seller_uid: user.uid,
				},
				createAt: new Date(),
				visibility: true,
			};
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
					handleSaveProduct(product);
				});
		} else {
			const updatedProduct = {
				product_name: data.product_name,
				product_description: data.product_description,
				product_category: optionCategoryName,
				category_slug: optionCategorySlug,
				product_image: isProductExist.product_info.product_image,
				product_price: parseInt(data.product_price),
				product_quantity: parseInt(data.product_quantity),
			};
			if (data.product_image[0]) {
				fetch(
					`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_api_key}`,
					{
						method: 'POST',
						body: formData,
					}
				)
					.then((res) => res.json())
					.then((imgData) => {
						updatedProduct.product_image = imgData.data.url;
						handleUpdateProduct(updatedProduct);
					});
			} else {
				handleUpdateProduct(updatedProduct);
			}
		}
		console.log(data.product_image[0]);
	};
	const handleSaveProduct = (productData) => {
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
				reset();
				setFile('');
				setIsProductSaveLoading(false);
				toast.success('Product Added');
			});
	};
	const handleUpdateProduct = (productData) => {
		fetch(
			`${process.env.REACT_APP_API_URL}/product/${user?.uid}?id=${param.id}`,
			{
				method: 'PATCH',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem('token')
					)}`,
				},
				body: JSON.stringify(productData),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setIsProductSaveLoading(false);
				toast.success('Product Updated');
			});
	};
	useEffect(() => {
		if (location.pathname.startsWith('/admin/products/details')) {
			setIsProductExistLoading(true);
			axios
				.get(`${process.env.REACT_APP_API_URL}/product/${param.id}`)
				.then((res) => {
					setIsProductExist(res.data);
					setIsProductExistLoading(false);
					setFile(res.data.product_info.product_image);
				});
		}
	}, [location.pathname, param.id]);
	const { data: categories, isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/categories`
			);
			return res.data;
		},
	});
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<h4 className='text-xl mb-3'>
				{/* {location.pathname.startsWith('/admin/products/details')
					? 'Update Product'
					: 'Add New Product'} */}
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
						to={`/admin/products`}
						className={
							location.pathname === '/admin/products'
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						Product List
					</Link>
					<span className='breadcrumb-arrow'>&gt;</span>
					{!isProductExist._id && (
						<Link
							to={`/admin/products/new-product`}
							className={
								location.pathname.startsWith(
									'/admin/products/new-product'
								)
									? 'breadcrumb-active'
									: 'breadcrumb-not-active'
							}
						>
							Add New
						</Link>
					)}
					{isProductExist._id && (
						<Link
							to={`/admin/products/details/${isProductExist._id}`}
							className={
								location.pathname.startsWith(
									'/admin/products/details'
								)
									? 'breadcrumb-active'
									: 'breadcrumb-not-active'
							}
						>
							Edit Product
						</Link>
					)}
				</nav>
			</h4>

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
							defaultValue={
								isProductExist?.product_info?.product_name
							}
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
							defaultValue={
								isProductExist?.product_info
									?.product_description
							}
						></textarea>
					</div>
					<div className='grid sm:grid-cols-3 gap-10'>
						<div>
							<h4 className='text-xl mb-3'>Category</h4>
							<select
								{...register('product_category', {
									required: 'Category is Required',
								})}
								className='select select-bordered w-full '
								defaultValue={
									isProductExist?.product_info
										?.product_category
								}
							>
								<option disabled selected>
									Uncategory
								</option>
								{categories?.map((category) => {
									return (
										<option
											value={`${category.slug}^^${category.name}`}
										>
											{category.name}
										</option>
									);
								})}
							</select>
						</div>
						<div>
							<h4 className='text-xl mb-3'>Price</h4>
							<input
								type='number'
								placeholder='Product Price'
								className='input input-bordered w-full '
								{...register('product_price', {
									required: 'Product Price Required',
								})}
								defaultValue={
									isProductExist?.product_info?.product_price
								}
							/>
						</div>
						<div>
							<h4 className='text-xl mb-3'>Quantity</h4>
							<input
								type='number'
								placeholder='Product Quantity'
								className='input input-bordered w-full '
								{...register('product_quantity', {
									required: 'Product Quantity Required',
								})}
								defaultValue={
									isProductExist?.product_info
										?.product_quantity
								}
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
						{!isProductSaveLoading && (
							<button className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'>
								Save Product
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

export default NewProduct;
