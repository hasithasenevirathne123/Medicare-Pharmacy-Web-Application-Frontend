import React, { useState } from 'react';
import ContainerForm from '../../components/ContainerForm/ContainerForm';
import { Button, Divider, Grid, TextField, Typography, Autocomplete } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { addProduct } from '../../services/adminService';

const AddItems = () => {
    const [itemName, setItemName] = useState([]);
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState([]);
    const [stockCount, setStockCount] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [description, setDescription] = useState([]);
    const [fileName, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleStockCountChange = (e) => {
        setStockCount(e.target.value);
    };

    const handleRatingsChange = (e) => {
        setRatings(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            productName: itemName,
            categoryId: parseInt(category, 10), // Ensure categoryId is an integer
            file: fileName.name,
            quantity: parseInt(stockCount, 10), // Ensure quantity is an integer
            price: parseFloat(price), // Ensure price is a float
            description: description,
            brand: 'test-products', // Hardcoded value
            rating: parseFloat(ratings) // Ensure rating is a float
        };

        console.log("Data to be sent:", data);

        try {
            const response = await addProduct(data);
            console.log('Response:', response);
            if (response && response.status === 200) {
                if (response.data.responseCode === 1001) {
                    console.log('Server returned no content, check the backend processing.');
                } else {
                    if (response.data.responseCode === 1000) {
                        console.log('product registration was successful but the confirmation message has been delayed.');
                    } else {
                        console.log('Product added successfully');
                    }
                    
                }
            } else {
                console.log('Error adding product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div style={{ padding: 10, height: '80vh', display: 'flex' }}>
            <ContainerForm>
                <Typography sx={{ color: "#00000", mt: 1 }} variant='h5'>Add Item</Typography>
                <Divider sx={{ my: 1, width: '40%' }} />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1} rowGap={1} mt={1}>
                        <Grid item xs={12} md={4} lg={4} xl={4} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ fontSize: { xs: '13px', sm: '13px', md: '13px', lg: '13px', xl: '15px' } }} fontWeight={600}>
                                Item Name <span style={{ color: '#0070C0' }}>*</span>
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { height: '35px' } }}
                                value={itemName}
                                onChange={handleItemNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ fontSize: { xs: '13px', sm: '13px', md: '13px', lg: '13px', xl: '15px' } }} fontWeight={600}>
                                Category <span style={{ color: '#0070C0' }}>*</span>
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { height: '35px' } }}
                                value={category}
                                onChange={handleCategoryChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ fontSize: { xs: '13px', sm: '13px', md: '13px', lg: '13px', xl: '15px' } }} fontWeight={600}>
                                Price <span style={{ color: '#0070C0' }}>*</span>
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { height: '35px' } }}
                                InputProps={{ startAdornment: <InputAdornment position="start">LKR</InputAdornment> }}
                                value={price}
                                onChange={handlePriceChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ fontSize: { xs: '13px', sm: '13px', md: '13px', lg: '13px', xl: '15px' } }} fontWeight={600}>
                                Stock Count <span style={{ color: '#0070C0' }}>*</span>
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { height: '35px' } }}
                                value={stockCount}
                                onChange={handleStockCountChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ fontSize: { xs: '13px', sm: '13px', md: '13px', lg: '13px', xl: '15px' } }} fontWeight={600}>
                                Ratings <span style={{ color: '#0070C0' }}>*</span>
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                sx={{ '& .MuiOutlinedInput-root': { height: '35px' } }}
                                value={ratings}
                                onChange={handleRatingsChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ fontSize: { xs: '13px', sm: '13px', md: '13px', lg: '13px', xl: '15px' } }} fontWeight={600}>
                                Description <span style={{ color: '#0070C0' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                multiline
                                rows={5}
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} flexDirection={'column'}>
                            <Typography variant='subtitle2' sx={{ fontSize: { xs: '13px', sm: '13px', md: '13px', lg: '13px', xl: '15px' } }} fontWeight={600}>
                                Upload Image <span style={{ color: '#0070C0' }}>*</span>
                            </Typography>
                            <Button
                                fullWidth
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                            </Button>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {filePreview && <img src={filePreview} width={'20%'} alt="Preview" />}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} flexDirection={'column'} display={'flex'} justifyContent={'end'} alignItems={'end'}>
                            <Link to={'/admin/dashboard'}>
                            <Button
                                type="submit"
                                variant="contained"
                                disableElevation
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#1976d2', // Primary color
                                    },
                                }}
                            >
                                Add Item
                            </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </ContainerForm>
        </div>
    );
}

export default AddItems;
