import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MonthlyReport = ({ report }) => {
    console.log(report)
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
    return (
		<>
			<div>
				<p className='uppercase font-semibold'>
					Monthly Report -{' '}
					<Link to='/admin/sales-report' className='text-blue-500'>
						see all
					</Link>
				</p>
				<ComposedChart
					width={500}
					height={400}
					data={report}
					margin={{
						top: 20,
						right: 20,
						bottom: 20,
						left: 20,
					}}
				>
					<CartesianGrid stroke='#f5f5f5' />
					<XAxis dataKey='date' scale='band' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='income' barSize={20} fill='#413ea0' />
					<Line type='monotone' dataKey='income' stroke='#ff7300' />
				</ComposedChart>
				<p className='uppercase'>Total Income: ${total}</p>
			</div>
		</>
	);
};

export default MonthlyReport;
