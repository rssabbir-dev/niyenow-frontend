import React, { useState } from 'react';

const Pagination = ({ paginationAction }) => {
	const {
		currentPage,
		setCurrentPage,
		perPageView,
		setPerPageView,
		pageCount,
	} = paginationAction;
	return (
		<ol className='flex justify-center gap-1 mt-8 text-xs font-medium'>
			<li>
				<button
					onClick={() => {
						if (currentPage > 0) {
							setCurrentPage(currentPage - 1);
						}
					}}
					className='inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded'
				>
					<span className='sr-only'>Prev Page</span>

					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-3 h-3'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
			</li>

			{[...Array(pageCount).keys()].map((page) => (
				<li>
					<button
						onClick={() => setCurrentPage(page)}
						className={`block w-8 h-8 leading-8 text-center border rounded ${
							page === currentPage
								? 'text-white bg-gray-900 border-gray-900'
								: 'border-gray-100'
						}`}
					>
						{page + 1}
					</button>
				</li>
			))}

			<li>
				<button
					onClick={() => {
						if (currentPage < pageCount) {
							setCurrentPage(currentPage + 1);
						}
					}}
					className='inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded'
				>
					<span className='sr-only'>Next Page</span>

					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-3 h-3'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
			</li>
		</ol>
	);
};

export default Pagination;
