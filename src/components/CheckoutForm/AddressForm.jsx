import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'

import FormInput from './FormInput'

const AddressForm = ( {next} ) => {
    const methods= useForm()

    useEffect(() => {
        

    }, [])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider  { ...methods }>
                <form onSubmit={methods.handleSubmit((data)=> next({ ...data }))}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First Name'/>
                        <FormInput required name='lastName' label='Last Name'/>
                        <FormInput required name='address' label='Address'/>
                        <FormInput required name='email' label='Email'/>
                        <FormInput required name='city' label='City'/>
                        <FormInput required name='zip' label='Postal Code'/>
                    </Grid>
                    <br/>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
