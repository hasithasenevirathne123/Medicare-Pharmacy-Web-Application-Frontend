import { Grid } from '@mui/material'
import React from 'react'
import ItemCard from '../../../components/ContentCard/ItemCard'
import heart from '../../../assets/images/heart.jpg';

const Heart = () => {


  
  return (
    <Grid container p={3} spacing={2}>
      <Grid item md={3}>
        <ItemCard img={heart} category="Heart" rating="4.5" name="Nexium 24HR" price="1500/=" />
      </Grid>
    </Grid>

  )
}

export default Heart
