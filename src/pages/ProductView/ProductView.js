import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { toast } from 'react-hot-toast';
import SpinnerMain from '../../components/SpinnerMain/SpinnerMain';
import CustomersReviews from './CustomerReviews/CustomersReviews';
import ReviewModal from './CustomerReviews/ReviewModal';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '../../components/Pagination/Pagination';
import InnerImageZoom from 'react-inner-image-zoom';
import SpinnerSecond from '../../components/SpinnerSecond/SpinnerSecond';

const ProductView = () => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const param = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [isReviewLoading, setIsReviewLoading] = useState(true);
	const [product, setProduct] = useState({});
	const [reviews, setReviews] = useState([]);
	const [reviewsCount, setReviewsCount] = useState(0);
	const [averageSumOfReview, setAverageSumOfReview] = useState(0);
	const location = useLocation();
	const [refetch, setRefetch] = useState(0);

	const [currentPage, setCurrentPage] = useState(0);
	const [perPageView, setPerPageView] = useState(8);
	const pageCount = Math.ceil(reviewsCount / perPageView) || 0;
	const paginationAction = {
		currentPage,
		setCurrentPage,
		perPageView,
		setPerPageView,
		pageCount,
	};
	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${process.env.REACT_APP_API_URL}/product/${param.id}`)
			.then((res) => {
				setProduct(res.data.product);
				// setReviews(res.data.reviews)
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, [param.id]);
	useEffect(() => {
		setIsReviewLoading(true);
		axios
			.get(
				`${process.env.REACT_APP_API_URL}/reviews/${param.id}?perPageView=${perPageView}&currentPage=${currentPage}`
			)
			.then((res) => {
				setReviews(res.data.reviews);
				setReviewsCount(res.data.reviewsCount);
				setAverageSumOfReview(res.data.averageSumOfReview);
				setIsReviewLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsReviewLoading(false);
			});
	}, [currentPage, param.id, perPageView, refetch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
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
			uid: user.uid,
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
				toast.success('Product added to cart');
				dispatch(cartActions.refetch());
			});
		console.log('bottom add to cart');
	};

	//Check is He/she order this product before
	const [isOrder, setIsOrder] = useState(false);
	useEffect(() => {
		if (user?.uid) {
			fetch(
				`${process.env.REACT_APP_API_URL}/check-is-order/${user?.uid}?id=${param?.id}`,
				{
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token')
						)}`,
					},
				}
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setIsOrder(data);
				});
		}
	}, [param?.id, user?.uid]);

	const navigate = useNavigate();
	const redirectToLogin = () => {
		localStorage.setItem('location',location.pathname)
		navigate('/login');
	};
	if (isLoading) {
		return <SpinnerMain />;
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
					<div className='grid'>
						{/* <img
							alt='Les Paul'
							src={product.product_info?.product_image}
							className='object-contain w-full aspect-square rounded-xl'
						/> */}
						<InnerImageZoom
							src={product.product_info?.product_image}
							zoomSrc={product.product?.product_image}
							className='md:object-contain w-full aspect-square rounded-xl h-full'
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

								{/* <p className='mt-0.5 text-sm'>
									Highest Rated Product
								</p> */}

								<div className='mt-2 -ml-0.5 flex'>
									{[...Array(5).keys()].map((rate) => (
										<FontAwesomeIcon
											key={rate}
											className={
												rate <= averageSumOfReview - 1
													? 'text-yellow-400 h-3 w-3'
													: 'text-gray-300 h-3 w-3'
											}
											icon={faStar}
										/>
									))}
								</div>
							</div>

							<p className='text-lg font-bold'>
								${product.product_info?.product_price}
							</p>
						</div>

						<details className='group relative mt-4'>
							<summary className='block'>
								<div>
									<div>
										<p>
											{product.product_info.product_description}
										</p>
									</div>

									{/* <span className='mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0'>
										Read More
									</span> */}
								</div>
							</summary>

							{/* <div className='pb-6 prose max-w-none'>
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
							</div> */}
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
										max={product.product_info.product_quantity}
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
												className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white cursor-pointer active:bg-black'
											>
												Add to Cart
											</button>
										) : (
											<p className='italic font-bold text-red-500 py-3 px-5 ml-3'>
												Stock Out
											</p>
										)}
									</>
								)}
								{!user?.uid && (
									<button
										onClick={redirectToLogin}
										className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white cursor-pointer active:bg-black'
									>
										Login First
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
			{isReviewLoading && (
				<div className='flex justify-center items-center h-[700px]'>
					<SpinnerSecond/>
				</div>
			)}
			{!isReviewLoading && (
				<>
					<CustomersReviews
						isOrder={isOrder}
						reviews={reviews}
						reviewsCount={reviewsCount}
						averageSumOfReview={averageSumOfReview}
					/>
					<div className='my-10'>
						<Pagination paginationAction={paginationAction} />
					</div>
				</>
			)}
			<ReviewModal product={product} setRefetch={setRefetch} />
		</section>
	);
};

export default ProductView;
