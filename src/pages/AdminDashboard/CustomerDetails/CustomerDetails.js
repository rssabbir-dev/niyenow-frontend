import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
    const { user } = useSelector(state => state.auth)
    const param = useParams()
    const [customerOrders, setCustomerOrders] = useState([])
    useEffect(() => {
       fetch(
			`${process.env.REACT_APP_API_URL}/customers/details/${user?.uid}?customerUid=${param.customerUid}`,
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
                setCustomerOrders(data.customerOrders);
                console.log(data);
			});
    },[param.customerUid, user?.uid])
    return (
        <div>
            <p>Hello</p>
        </div>
    );
};

export default CustomerDetails;