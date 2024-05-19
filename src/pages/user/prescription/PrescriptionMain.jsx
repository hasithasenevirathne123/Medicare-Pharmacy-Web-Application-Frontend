import React, { useEffect, useState } from 'react'
import banner from '../../../assets/images/orderbanner.png'
import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPrescriptionInfo } from '../../../services/customerService'

const PrescriptionMain = () => {


  const customerId = useSelector((state)=> state.user.userDetails.userId);
  const[prescriptiondata, setPrescriptionData] = useState([]);

  const getPrecriptionData = async () => {
    const response = await getPrescriptionInfo(customerId);
    console.log("prescription data",response);
    setPrescriptionData(response?.data?.prescription);
    if (response && response.responseCode === 1000) {
      // navigate("/user/prescription");
      showAlertMessage({
        message:"Prescription saved",
        type:"success",
      });
    }

  };
  useEffect(()=>{
 getPrecriptionData();
  },[]);




  // const orders = [
  //   { id: 1, frequency: "One Time",Fulfilment:'full', description: "Crestor 10mg – 10 Qty", substitutes: "no", options: "Card Payment", status: "shipped" },
    
  //   { id: 2, frequency: "One Time",Fulfilment:'full', description: "Crestor 10mg – 10 Qty", substitutes: "no", options: "Card Payment", status: "shipped" },
  //   { id: 3, frequency: "One Time",Fulfilment:'full', description: "Crestor 10mg – 10 Qty", substitutes: "no", options: "Card Payment", status: "shipped" },
  //   { id: 4, frequency: "One Time",Fulfilment:'full', description: "Crestor 10mg – 10 Qty", substitutes: "no", options: "Card Payment", status: "shipped" },
  //   { id: 5, frequency: "One Time",Fulfilment:'full', description: "Crestor 10mg – 10 Qty", substitutes: "no", options: "Card Payment", status: "shipped" },
  //   { id: 6, frequency: "One Time",Fulfilment:'full', description: "Crestor 10mg – 10 Qty", substitutes: "no", options: "Card Payment", status: "shipped" },

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

  const filteredOrders = prescriptiondata.filter((order) =>{

   // order.description.toLowerCase().includes(searchTerm.toLowerCase())
  
  return true;
  }
  );

  return (
    <>
      <div style={{ padding: 10, margin: 10, display: 'flex', flex: '1' }}>
        <img src={banner} width={'50%'} alt="" />
        <Box sx={{ background: "#E13764", display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Link to={'/user/prescription/upload'}>
            <Button
              variant='outlined'
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  color: '#ffffff',
                  borderColor: 'white'
                }
              }}
            >
              Upload New Prescription
            </Button>
          </Link>
        </Box>
      </div>
      <div style={{ padding: 10 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Fulfilment</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Substitutes</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Option</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                <TableRow key={order?.id} >
                  <TableCell>{order?.id}</TableCell>
                  <TableCell>{order?.frequency}</TableCell>
                  <TableCell>{order?.fulfilment}</TableCell>
                  <TableCell>{order?.prescription_item}</TableCell>
                  <TableCell>{order?.substitutes}</TableCell>
                  <TableCell>{order?.status}</TableCell>
                  <TableCell>{order?.payment_method}</TableCell>

                </TableRow>
              ))}
            </TableBody>
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
    </>
  )
}

export default PrescriptionMain
