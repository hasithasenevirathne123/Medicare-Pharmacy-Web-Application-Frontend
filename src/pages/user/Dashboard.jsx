import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import inhailer from '../../assets/images/inhailer.png';
import eyemed from '../../assets/images/eyeMed2.jpg';
import entmed from '../../assets/images/entmed.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner1 from '../../assets/images/banner2.jpg'
import Banner2 from '../../assets/images/banner3.png'
import Banner3 from '../../assets/images/banner4.png'


import ItemCard from '../../components/ContentCard/ItemCard';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAllProductsForCustomerDashboard } from '../../services/customerService';
import { useSelector } from 'react-redux';



const Dashboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const navigate = useNavigate();

  const[allproducts, setAllProducts] = useState([]);
  const[category, setCategory] = useState([]);

 const customerId = useSelector((state)=> state.user.userDetails.userId);
 //console.log("all products",customerId)
  const getProducts = async() => {
     try {
      const response = await getAllProductsForCustomerDashboard(customerId);
      console.log("all products",response);
      setAllProducts(response?.data?.allProducts);
      
     } catch (error) {
      console.log("error",error);
     }
  }

  useEffect(()=>{
     getProducts();
  },[])

  return (
    <>   
    <div style={{overflowX:'hidden',overflowY:'hidden'}}>
        <Slider  {...settings}>
          <div> <img src={Banner1} alt="" /></div>
          <div> <img src={Banner3} alt="" /></div>
          <div> <img src={Banner2} alt="" /></div>
          <div> <img src={Banner3} alt="" /></div>
          <div> <img src={Banner1} alt="" /></div>
          <div> <img src={Banner3} alt="" /></div>


          
        </Slider>
      </div>
      <Grid container p={3} spacing={2}>
        {allproducts.map((products, key)=>(
      <Grid item md={3} key={key}>
      <ItemCard 
          img={products.image}
          category={products.category_name} 
          rating="4.5" 
          name={products.product_name}
          price={products.price} />
        </Grid>
        ))}
        {/* <Grid item md={3}>
          <ItemCard img={eyemed} category="Eye"rating="4.5" name="p-acuvail-eye-drops" disabled="true" active="Out of stock"/>
        </Grid>
        <Grid item md={3}>
          <ItemCard img={entmed} category="Ent"rating="4.5" name="flutimate-nasal-spray" disabled="true" active="Out of stock" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={entmed} category="Ent"rating="4.5" name="flutimate-nasal-spray"price="1103/=" />
        </Grid>


        <Grid item md={3}>
          <ItemCard img={inhailer} category="Heart"rating="4.5" name="SEROFLO-125 INHALER"price="650/=" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={eyemed} category="Eye"rating="4.5" name="p-acuvail-eye-drops"price="167/=" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={entmed} category="Ent"rating="4.5" name="flutimate-nasal-spray"price="1103/=" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={entmed} category="Ent"rating="4.5" name="flutimate-nasal-spray"price="1103/=" />
        </Grid> <Grid item md={3}>
          <ItemCard img={inhailer} category="Heart"rating="4.5" name="SEROFLO-125 INHALER"price="650/=" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={eyemed} category="Eye"rating="4.5" name="p-acuvail-eye-drops"price="167/=" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={entmed} category="Ent"rating="4.5" name="flutimate-nasal-spray"price="1103/=" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={entmed} category="Ent"rating="4.5" name="flutimate-nasal-spray"price="1103/=" />
        </Grid> <Grid item md={3}>
          <ItemCard img={inhailer} category="Heart"rating="4.5" name="SEROFLO-125 INHALER"price="650/=" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={eyemed} category="Eye"rating="4.5" name="p-acuvail-eye-drops"price="167/=" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={entmed} category="Ent"rating="4.5" name="flutimate-nasal-spray"price="1103/=" />
        </Grid>
        <Grid item md={3}>
          <ItemCard img={entmed} category="Ent"rating="4.5" name="flutimate-nasal-spray"price="1103/=" />
        </Grid> */}
       
      </Grid>
    </>
  );
}

export default Dashboard;
