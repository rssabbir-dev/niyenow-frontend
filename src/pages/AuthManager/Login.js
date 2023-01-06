import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getJwtToken, handleEmailLogin } from './handleAuth';

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// const from = location.state?.from?.pathname || '/';
	const from = localStorage.getItem('location') || '/'
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const handleLogin = (formData) => {
		setIsLoading(true);
		handleEmailLogin(formData)
			.then((data) => {
				console.log(data.user);
				toast.success('Welcome, Login Successfully');
				navigate(from, { replace: true });
				localStorage.removeItem('location')
				getJwtToken(data.user?.uid);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
				setIsLoading(false);
				reset();
			});
	};
	return (
		<section className='relative flex flex-wrap lg:h-screen lg:items-center'>
			<div className='w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24'>
				<div className='mx-auto max-w-lg text-center'>
					<h1 className='text-2xl font-bold sm:text-3xl'>
						Get started today!
					</h1>

					<p className='mt-4 text-gray-500'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Et libero nulla eaque error neque ipsa culpa autem, at
						itaque nostrum!
					</p>
				</div>

				<form
					onSubmit={handleSubmit(handleLogin)}
					className='mx-auto mt-8 mb-0 max-w-md space-y-4'
				>
					<div>
						<label htmlhtmlFor='email' className='sr-only'>
							Email
						</label>

						<div className='relative'>
							<input
								type='email'
								className={`w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm border ${
									errors.email &&
									'outline-red-500 border border-red-500'
								}`}
								placeholder='Enter email'
								name='email'
								{...register('email', {
									required: 'Email is required',
								})}
							/>

							<span className='absolute inset-y-0 right-4 inline-flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-gray-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
									/>
								</svg>
							</span>
						</div>
						{errors.email && (
							<span className='text-xs mt-1 text-red-500'>
								{errors.email?.message}
							</span>
						)}
					</div>

					<div>
						<label htmlhtmlFor='password' className='sr-only'>
							Password
						</label>
						<div className='relative'>
							<input
								type='password'
								className={`w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm border ${
									errors.password &&
									'outline-red-500 border border-red-500'
								}`}
								placeholder='Enter password'
								name=''
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 6,
										message:
											'Password should be 6 character',
									},
								})}
							/>

							<span className='absolute inset-y-0 right-4 inline-flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-gray-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
									/>
								</svg>
							</span>
						</div>
						{errors.password && (
							<span className='text-xs mt-1 text-red-500'>
								{errors.password?.message}
							</span>
						)}
					</div>

					<div className='flex items-center justify-between'>
						<p className='text-sm text-gray-500'>
							Don't have an account?
							<Link to='/register' className='underline'>
								Register Now
							</Link>
						</p>

						{!isLoading && (
							<button
								type='submit'
								className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
							>
								Sign in
							</button>
						)}
						{isLoading && (
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

			<div className='relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2'>
				<img
					alt='Welcome'
					src='https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
					className='absolute inset-0 h-full w-full object-cover'
				/>
			</div>
		</section>
	);
};

export default Login;
