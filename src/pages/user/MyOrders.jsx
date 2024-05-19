import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import inhailer from '../../assets/images/inhailer.png';
import { getOrderData } from '../../services/customerService';
import { useSelector } from 'react-redux';

const MyOrders = () => {

    const customerId = useSelector((state)=> state.user.userDetails.userId);
    const[myorder, setMyOrders] = useState([]);

    const getOrderDetails = async () => {
    const response = await getOrderData(customerId);
    setMyOrders(response?.data?.orders);
    }

    useEffect(()=>{
    getOrderDetails();
    },[]);

    


    // const orders = [
    //     { id: 1,item:inhailer ,itemName:"SEROFLO-125 INHALER",qty:"2",price:"650",status:"shipped",date:"03/03/2024",paymentType:"Cash" },
    //     { id: 2,item:inhailer ,itemName:"SEROFLO-125 INHALER",qty:"2",price:"650",status:"shipped",date:"03/03/2024",paymentType:"Cash" },
    //     { id: 3,item:inhailer ,itemName:"SEROFLO-125 INHALER",qty:"2",price:"650",status:"shipped",date:"03/03/2024",paymentType:"Cash" },
        
       
    // ];

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredOrders = myorder.filter((orders) =>
        {

            //orders.itemName.toLowerCase().includes(searchTerm.toLowerCase())

            return true;
        }
    );


    return (
        <div div style={{padding:20}}>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Qty</TableCell>

                            <TableCell>Price</TableCell>
                            <TableCell>Payment</TableCell>

                            <TableCell>Status</TableCell>
                            <TableCell>Date to recive</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
    {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
        order.order_details.map((detail) => (
            <TableRow key={detail.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell><img src={detail.product.image} width={'20%'} alt={detail.product.product_name} /></TableCell>
                <TableCell>{detail.product.product_name}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>{detail.price}</TableCell>
                <TableCell>{detail.tax}</TableCell>
                <TableCell>{order.is_active ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>{detail.is_active ? 'Active' : 'Inactive'}</TableCell>
            </TableRow>
        ))
    ))}
</TableBody>

                    {/* <TableBody>
                        {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((orders) => (
                            <TableRow key={orders.id} >
                                <TableCell>  {orders.id} </TableCell>
                                <TableCell>  <img src={orders.item} width={'20%'} alt="" /> </TableCell>
                                <TableCell>{orders?.order_details?.product?.product_name}</TableCell>
                                <TableCell>{orders.qty}</TableCell>

                                <TableCell>{orders.price}</TableCell>
                                <TableCell>{orders.paymentType}</TableCell>

                                <TableCell>{orders.status}</TableCell>
                                <TableCell>{orders.date}</TableCell>
                                

                            </TableRow>
                        ))}
                    </TableBody> */}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default MyOrders
