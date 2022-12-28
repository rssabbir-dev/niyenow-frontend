import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cartActions } from '../../store/cartSlice';
import CartItem from './CartItem';

const Cart = () => {
	const { cartProducts } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const subTotal = cartProducts.reduce(
		(prev, curr) => prev + parseInt(curr.product_info.price),
		0
	);

	const handleDeleteCartItem = (id) => {
		fetch(
			`${process.env.REACT_APP_API_URL}/delete-cart/${user?.uid}?id=${id}`,
			{
				method: 'DELETE',
				headers: {
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem('token')
					)}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				toast.success('Item Delete');
				dispatch(cartActions.refetch());
			});
	};

	const confirmOrder = () => {
		const order = {
			customer_name: user.displayName,
			customer_email: user.email,
			customer_uid: user.uid,
			ordered_products: cartProducts,
			subTotal: subTotal,
			payment_status: false,
			createAt: new Date(),
		};
		Swal.fire({
			title: 'Want to order?',
			text: "You won't be able to revert this!",
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Order Now',
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(
					`${process.env.REACT_APP_API_URL}/confirm-order/${user?.uid}`,
					{
						method: 'POST',
						headers: {
							'content-type': 'application/json',
							authorization: `Bearer ${JSON.parse(
								localStorage.getItem('token')
							)}`,
						},
						body: JSON.stringify(order),
					}
				)
					.then((res) => res.json())
					.then((data) => {
						navigate('/customer');
						dispatch(cartActions.refetch());
						console.log(data);
						console.log(order);
						Swal.fire('Order Placed!', 'Payment Now', 'success');
					});
			}
		});
	};
	return (
		<section>
			<div class='max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8'>
				<div class='max-w-3xl mx-auto'>
					<header class='text-center'>
						<h1 class='text-xl font-bold text-gray-900 sm:text-3xl'>
							Your Cart
						</h1>
					</header>

					<div class='mt-8'>
						<ul class='space-y-4'>
							{cartProducts.map((cart) => (
								<CartItem
									handleDeleteCartItem={handleDeleteCartItem}
									key={cart._id}
									cart={cart}
								/>
							))}
						</ul>

						<div class='flex justify-end pt-8 mt-8 border-t border-gray-100'>
							<div class='w-screen max-w-lg space-y-4'>
								<dl class='space-y-0.5 text-sm text-gray-700'>
									<div class='flex justify-between'>
										<dt>Subtotal</dt>
										<dd>${subTotal}</dd>
									</div>

									<div class='flex justify-between'>
										<dt>VAT</dt>
										<dd>£25</dd>
									</div>

									<div class='flex justify-between'>
										<dt>Discount</dt>
										<dd>-£20</dd>
									</div>

									<div class='flex justify-between !text-base font-medium'>
										<dt>Total</dt>
										<dd>£200</dd>
									</div>
								</dl>

								<div class='flex justify-end'>
									<span class='inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke-width='1.5'
											stroke='currentColor'
											class='-ml-1 mr-1.5 h-4 w-4'
										>
											<path
												stroke-linecap='round'
												stroke-linejoin='round'
												d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z'
											/>
										</svg>

										<p class='text-xs whitespace-nowrap'>
											2 Discounts Applied
										</p>
									</span>
								</div>

								<div class='flex justify-end'>
									<button
										onClick={confirmOrder}
										class='block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600'
									>
										Confirm Order
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cart;
