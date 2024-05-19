import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination, TextField, MenuItem } from '@mui/material';
import { getOrders } from '../../services/adminService';


const Orders = () => {

    const [ordersdata, setOrdersData] = useState([]);

    console.log("response: ", getOrders())

    const getOrdersData = async () => {
        const response = await getOrders();
        console.log("Orders: ", response);
        setOrdersData(response.data.allOrders);
    };

    useEffect(() => {
        getOrdersData();
    }, [])


    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchName, setSearchName] = useState('');
    const [role, setRole] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    // const users = [
    //     { id: 1, name: 'Jason Stieve', orderId: "2342942sjskd", mobile: '1234567890', contact: '1234567890', email: 'johnDoe@gmail.com', address: '123 Main St', nic: '123456789V', Gender: 'Male', orderStatus: 'Shipped' },
    //     // Add more user data as needed
    // ];

    const handleUpdate = (id) => {
        console.log(`Update user with id ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete user with id ${id}`);
    };

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    let filteredUsers = ordersdata.slice(indexOfFirstUser, indexOfLastUser);

    if (searchName) {
        filteredUsers = filteredUsers.filter(user =>
            Object.values(user).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchName.toLowerCase())
            )
        );
    }

    if (role) {
        filteredUsers = filteredUsers.filter(user => user.paymentStatus.toLowerCase() === role.toLowerCase());
    }

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} p={2}>
                <Grid container p={1} spacing={1}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant='subtitle2'
                            sx={{ fontSize: { xs: '13px', sm: '13px', md: '13px', lg: '13px', xl: '15px' } }} fontWeight={200}>
                            Search   <span style={{ color: '#0070C0' }}>*</span></Typography>
                        <TextField
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '30px', // Set the desired height
                                },
                                '& .MuiOutlinedInput-input': {
                                    padding: '10px', // Optional: Add padding to the input field
                                },
                            }}

                        />
                    </Grid>

                </Grid>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ background: '#ec407a' }}>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Order Id</TableCell>

                                <TableCell>Customer</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>NIC</TableCell>
                                <TableCell>Order Status</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.customer?.id}</TableCell>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{`${order.customer?.first_name} ${order.customer?.last_name}`}</TableCell>
                                    <TableCell>{order.customer?.mobile_number}</TableCell>
                                    <TableCell>{order.customer?.user?.email}</TableCell>
                                    <TableCell>{`${order.customer?.street_address}, ${order.customer?.city}`}</TableCell>
                                    <TableCell>{order.customer?.nic}</TableCell>
                                    <TableCell>
                                        <TextField
                                            select
                                            value={order.order_status}
                                            onChange={(e) => {
                                                const newStatus = e.target.value;
                                                // Update the order status in your data
                                                // For now, log the new status
                                                console.log(`Change order status to ${newStatus}`);
                                                // Update the order status in the ordersdata
                                                const updatedOrders = ordersdata.map(o =>
                                                    o.id === order.id ? { ...o, order_status: newStatus } : o
                                                );
                                                setOrdersdata(updatedOrders);
                                            }}
                                            fullWidth
                                            variant="outlined"
                                        >
                                            <MenuItem value="Shipped">Shipped</MenuItem>
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="Delivered">Delivered</MenuItem>
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    count={Math.ceil(ordersdata.length / rowsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    component="div"
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Grid>


        </>
    );
}

export default Orders;
