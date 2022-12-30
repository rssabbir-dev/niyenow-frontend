import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';
import MonthlyReport from './MonthlyReport';
import TopSellingProducts from './TopSellingProducts';

const AdminHome = () => {
	const { user } = useSelector((state) => state.auth);
	const { data: topSales, isLoading } = useQuery({
		queryKey: ['topSales'],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/top-sales`,
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
	const { data: monthlyReport, isReportLoading } = useQuery({
		queryKey: ['monthlyReport'],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/monthly-sales-report/${user?.uid}`,
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
	const { data: recentProducts, isRecentLoading } = useQuery({
		queryKey: ['recentProduct'],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/recent-products`
			);
			const data = await res.json();
			return data;
		},
	});

	if (isLoading || isReportLoading || isRecentLoading) {
		return <SpinnerMain />;
	}
	return (
		<div>
			<h2 className='text-xl font-bold mb-3'>Dashboard</h2>
			<div className='grid lg:grid-cols-2 gap-10'>
				<TopSellingProducts
					title={'top selling product'}
					products={topSales}
				/>
				<MonthlyReport report={monthlyReport} />
				<TopSellingProducts
					title={'Recent Product Added'}
					products={recentProducts}
				/>
			</div>
		</div>
	);
};

export default AdminHome;
