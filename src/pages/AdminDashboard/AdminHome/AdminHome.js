import { faCubes, faLayerGroup, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';
import MonthlyReport from './MonthlyReport';
import TopSellingProducts from './TopSellingProducts';

const AdminHome = () => {
	const { user } = useSelector((state) => state.auth);
	const { data: dashboardData, isLoading } = useQuery({
		queryKey: ['dashboardData'],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/dashboard-data/${user?.uid}`,
				{
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token')
						)}`,
					},
				}
			);
			const data = await res.json();
			return data;
		},
	});
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<div>
			<h2 className='text-xl font-bold mb-3'>Dashboard</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-20'>
				<div className='bg-blue-500 text-white p-5 rounded-lg flex gap-10 justify-center items-center'>
					<div className=''>
						<FontAwesomeIcon
							className='text-5xl'
							icon={faLayerGroup}
						/>
					</div>
					<div>
						<h1 className='text-2xl uppercase'>Total Order</h1>
						<p className='text-xl font-bold'>
							{dashboardData?.totalOrder}
						</p>
					</div>
				</div>
				<div className='bg-pink-500 text-white p-5 rounded-lg flex gap-10 justify-center items-center'>
					<div className=''>
						<FontAwesomeIcon
							className='text-5xl'
							icon={faCubes}
						/>
					</div>
					<div>
						<h1 className='text-2xl uppercase'>Total Products</h1>
						<p className='text-xl font-bold'>
							{dashboardData?.totalProducts}
						</p>
					</div>
				</div>
				<div className='bg-green-500 text-white p-5 rounded-lg flex gap-10 justify-center items-center'>
					<div className=''>
						<FontAwesomeIcon
							className='text-5xl'
							icon={faMoneyBillTrendUp}
						/>
					</div>
					<div>
						<h1 className='text-2xl uppercase'>Today Income</h1>
						<p className='text-xl font-bold'>
							{dashboardData?.todaySale ? dashboardData.todaySale : 0	}
						</p>
					</div>
				</div>
			</div>
			<div className='grid lg:grid-cols-2 gap-10'>
				<TopSellingProducts
					title={'top selling product'}
					products={dashboardData?.topSellingProducts}
				/>
				<MonthlyReport report={dashboardData?.monthlyChartData} />
				<TopSellingProducts
					title={'Recent Product Added'}
					products={dashboardData?.recentProducts}
				/>
			</div>
		</div>
	);
};

export default AdminHome;
