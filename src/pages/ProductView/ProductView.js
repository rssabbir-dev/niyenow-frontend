import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { toast } from 'react-hot-toast';
import SpinnerMain from '../../components/SpinnerMain/SpinnerMain';

const ProductView = () => {
	const { user } = useSelector((state) => state.auth);
	const {cartProducts} = useSelector(state => state.cart)
	const dispatch = useDispatch();
	const param = useParams();
	const [isLoading, setIsLoading] = useState(true)
	const [product,setProduct] = useState({})
	// const { data: product, isLoading } = useQuery({
	// 	queryKey: ['singleProduct'],
	// 	queryFn: async () => {
	// 		const res = await axios.get(
	// 			`${process.env.REACT_APP_API_URL}/product/${param.id}`
	// 		);
	// 		return res.data;
	// 	},
	// });
	useEffect(() => {
		setIsLoading(true)
		axios.get(`${process.env.REACT_APP_API_URL}/product/${param.id}`)
			.then(res => {
				setProduct(res.data)
				setIsLoading(false)
			})
			.catch(err => {
			console.log(err);
			setIsLoading(false)
		})
	},[param.id])
	const location = useLocation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const exist = cartProducts.find(pd => pd.product_info.id === param.c)
	const handleAddToCart = (formData) => {
		const order = {
			product_info: {
				name: product.product_info.product_name,
				price: product.product_info.product_price,
				image: product.product_info.product_image,
				quantity: formData.quantity,
				category: product.product_info.product_category,
				id: product._id,
			},
			customer_info: {
				name: user.displayName,
				email: user.email,
				uid: user.uid,
			},
			seller_info: {
				name: product.seller_info.seller_name,
				uid: product.seller_info.seller_uid,
			},
			uid:user.uid,
			cartAddedTime: new Date(),
		};

		fetch(`${process.env.REACT_APP_API_URL}/add-to-cart/${user.uid}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
			body: JSON.stringify(order),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				console.log('inside ad to cart');
				toast.success('Product added to cart')
				dispatch(cartActions.refetch());
			});
		console.log('bottom add to cart');
	};
	if (isLoading) {
		return <SpinnerMain/>;
	}
	return (
		<section>
			<div className='relative max-w-screen-xl px-4 py-8 mx-auto'>
				<nav className='mb-3'>
					<Link
						to='/'
						className={
							location.pathname === '/'
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						Home
					</Link>
					<span className='breadcrumb-arrow'>&gt;</span>
					<Link
						to={`/product/${param.id}`}
						className={
							location.pathname.startsWith('/product')
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						{product.product_info?.product_name}
					</Link>
				</nav>
				<div className='grid items-start grid-cols-1 gap-8 md:grid-cols-2'>
					<div className='grid grid-cols-2 gap-4 md:grid-cols-1'>
						<img
							alt='Les Paul'
							src={product.product_info?.product_image}
							className='object-cover w-full aspect-square rounded-xl'
						/>

						{/* <div className='grid grid-cols-2 gap-4 lg:mt-4'>
							<img
								alt='Les Paul'
								src='https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
								className='object-cover w-full aspect-square rounded-xl'
							/>

							<img
								alt='Les Paul'
								src='https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
								className='object-cover w-full aspect-square rounded-xl'
							/>

							<img
								alt='Les Paul'
								src='https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
								className='object-cover w-full aspect-square rounded-xl'
							/>

							<img
								alt='Les Paul'
								src='https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
								className='object-cover w-full aspect-square rounded-xl'
							/>
						</div> */}
					</div>

					<div className='sticky top-0'>
						<strong className='rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600'>
							{product.product_info?.product_category}
						</strong>

						<div className='flex justify-between mt-8'>
							<div className='max-w-[35ch]'>
								<h1 className='text-2xl font-bold'>
									{product.product_info?.product_name}
								</h1>

								<p className='mt-0.5 text-sm'>
									Highest Rated Product
								</p>

								<div className='mt-2 -ml-0.5 flex'>
									<svg
										className='w-5 h-5 text-yellow-400'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>

									<svg
										className='w-5 h-5 text-yellow-400'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>

									<svg
										className='w-5 h-5 text-yellow-400'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>

									<svg
										className='w-5 h-5 text-yellow-400'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>

									<svg
										className='w-5 h-5 text-gray-200'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
								</div>
							</div>

							<p className='text-lg font-bold'>
								${product.product_info?.product_price}
							</p>
						</div>

						<details className='group relative mt-4 [&_summary::-webkit-details-marker]:hidden'>
							<summary className='block'>
								<div>
									<div className='prose max-w-none group-open:hidden'>
										<p>
											Lorem ipsum dolor sit amet
											consectetur adipisicing elit. Ipsa
											veniam dicta beatae eos ex error
											culpa delectus rem tenetur,
											architecto quam nesciunt, dolor
											veritatis nisi minus inventore,
											rerum at recusandae?
										</p>
									</div>

									<span className='mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0'>
										Read More
									</span>
								</div>
							</summary>

							<div className='pb-6 prose max-w-none'>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Ipsa veniam dicta beatae
									eos ex error culpa delectus rem tenetur,
									architecto quam nesciunt, dolor veritatis
									nisi minus inventore, rerum at recusandae?
								</p>

								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Placeat nam sapiente nobis
									ea veritatis error consequatur nisi
									exercitationem iure laudantium culpa, animi
									temporibus non! Maxime et quisquam amet. A,
									deserunt!
								</p>
							</div>
						</details>

						<form
							onSubmit={handleSubmit(handleAddToCart)}
							className='mt-8'
						>
							<fieldset>
								<legend className='mb-1 text-sm font-medium'>
									Stock
								</legend>
								<p>
									Only {product.product_info.product_quantity}{' '}
									Stock Left
								</p>
								{/* <div className='flow-root'>
									<div className='-m-0.5 flex flex-wrap'>
										<label
											htmlFor='color_tt'
											className='cursor-pointer p-0.5'
										>
											<input
												type='radio'
												name='color'
												id='color_tt'
												className='sr-only peer'
											/>

											<span className='inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white'>
												Texas Tea
											</span>
										</label>

										<label
											htmlFor='color_fr'
											className='cursor-pointer p-0.5'
										>
											<input
												type='radio'
												name='color'
												id='color_fr'
												className='sr-only peer'
											/>

											<span className='inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white'>
												Fiesta Red
											</span>
										</label>

										<label
											htmlFor='color_cb'
											className='cursor-pointer p-0.5'
										>
											<input
												type='radio'
												name='color'
												id='color_cb'
												className='sr-only peer'
											/>

											<span className='inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white'>
												Cobalt Blue
											</span>
										</label>
									</div>
								</div> */}
							</fieldset>

							<fieldset className='mt-4'>
								<legend className='mb-1 text-sm font-medium'>
									Size
								</legend>

								<div className='flow-root'>
									<div className='-m-0.5 flex flex-wrap'>
										<label
											htmlFor='size_xs'
											className='cursor-pointer p-0.5'
										>
											<input
												type='radio'
												name='size'
												id='size_xs'
												className='sr-only peer'
											/>

											<span className='inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white'>
												XS
											</span>
										</label>

										<label
											htmlFor='size_s'
											className='cursor-pointer p-0.5'
										>
											<input
												type='radio'
												name='size'
												id='size_s'
												className='sr-only peer'
											/>

											<span className='inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white'>
												S
											</span>
										</label>

										<label
											htmlFor='size_m'
											className='cursor-pointer p-0.5'
										>
											<input
												type='radio'
												name='size'
												id='size_m'
												className='sr-only peer'
											/>

											<span className='inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white'>
												M
											</span>
										</label>

										<label
											htmlFor='size_l'
											className='cursor-pointer p-0.5'
										>
											<input
												type='radio'
												name='size'
												id='size_l'
												className='sr-only peer'
											/>

											<span className='inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white'>
												L
											</span>
										</label>

										<label
											htmlFor='size_xl'
											className='cursor-pointer p-0.5'
										>
											<input
												type='radio'
												name='size'
												id='size_xl'
												className='sr-only peer'
											/>

											<span className='inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white'>
												XL
											</span>
										</label>
									</div>
								</div>
							</fieldset>

							<div className='flex mt-8'>
								<div>
									<label
										htmlFor='quantity'
										className='sr-only'
									>
										Qty
									</label>

									<input
										type='number'
										id='quantity'
										min='1'
										defaultValue={1}
										{...register('quantity', {
											required: true,
										})}
										className='w-12 rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'
									/>
								</div>

								{user?.uid && (
									<>
										{product.product_info.product_quantity >
										0 ? (
											<button
												type='submit'
												className='block px-5 py-3 ml-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500 disabled:bg-gray-500'
												disabled={
													exist?.product_info?.id ===
													param.id
												}
											>
												{exist?.product_info.id ===
												param.id
													? 'Already Added'
													: 'Add to Cart'}
											</button>
										) : (
											<p className='italic font-bold text-red-500 py-3 px-5 ml-3'>
												Stock Out
											</p>
										)}
									</>
								)}
								{!user?.uid && (
									<Link
										to='/login'
										className='block px-5 py-3 ml-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500 disabled:bg-gray-500'
									>
										Login First
									</Link>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductView;
