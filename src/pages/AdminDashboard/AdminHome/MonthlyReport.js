import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MonthlyReport = ({ report }) => {
    const total = report?.reduce((prev,curr)=>prev + curr.income,0)
    // const result = report?.map(p => {
    //     const data = [];
    //     const date = format(new Date(p.createAt),'P');
    //     return date
    // })
    // const result = report?.reduce((prev, curr) => {
    //     if (!prev[format(new Date(curr.createAt), 'P')]) {
	// 		prev[format(new Date(curr.createAt), 'P')] = [];
	// 	}
    //     prev[format(new Date(curr.createAt), 'P')].push(curr);
    //     return prev;
    // },{})
    // console.log(result);
	console.log(report);
    return (
		<>
			<div className='bg-white p-3 rounded-md'>
				<p className='uppercase font-semibold'>
					Monthly Report -{' '}
					<Link to='/admin/sales-report' className='text-blue-500'>
						see all
					</Link>
				</p>
				<ResponsiveContainer width='100%' height={400}>
					<BarChart
						data={report}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='date' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar
							dataKey='income'
							fill='#3B82F6'
							background={{ fill: '#F1F5F9' }}
						/>
					</BarChart>
				</ResponsiveContainer>
				<p className='uppercase font-semibold italic text-gray-600'>
					Total Income: ${total}
				</p>
			</div>
		</>
	);
};

export default MonthlyReport;
