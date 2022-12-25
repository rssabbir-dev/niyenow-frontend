import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authSlice';
import {
	handleEmailRegister,
	handleLogout,
	handleUpdateUserProfile,
} from './handleAuth';

const Register = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const handleRegister = (formData) => {
		const profileData = {
			displayName: formData.name,
		};
		handleEmailRegister(formData)
			.then((res) => {
				const registerUser = res.user;
				saveUser(registerUser, formData);
				handleUpdateUserProfile(profileData)
					.then((res) => {
						console.log(res);
						handleLogout()
							.then((res) => {
								toast.success(
									'Registration Success, Please Login Now'
								);
								navigate('/login');
							})
							.catch((err) => {
								console.log(err);
							});
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const saveUser = (userData, formData) => {
		console.log('inside saveUser');
		const user = {
			displayName: formData.displayName,
			email: userData.email,
			photoURL: userData.photoURL,
			uid: userData.uid,
			role: 'customer',
			registerAt: new Date(),
		};
		fetch(`${process.env.REACT_APP_API_URL}/users`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				console.log('saved User');
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
					onSubmit={handleSubmit(handleRegister)}
					className='mx-auto mt-8 mb-0 max-w-md space-y-4'
				>
					<div>
						<label htmlFor='name' className='sr-only'>
							Full Name
						</label>

						<div className='relative'>
							<input
								type='text'
								className={`w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm border ${
									errors.name &&
									'outline-red-500 border border-red-500'
								}`}
								placeholder='Enter Full Name'
								{...register('name', {
									required: 'Name is required',
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
						{errors.name && (
							<span className='text-xs mt-1 text-red-500'>
								{errors.name?.message}
							</span>
						)}
					</div>
					<div>
						<label htmlFor='email' className='sr-only'>
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
						<label htmlFor='password' className='sr-only'>
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
							Have an account?
							<Link to='/login' className='underline'>
								Login
							</Link>
						</p>

						<button
							type='submit'
							className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
						>
							Register
						</button>
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

export default Register;
