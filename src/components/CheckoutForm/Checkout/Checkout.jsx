import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'  
import { Link, useHistory } from 'react-router-dom'


import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce';
import useStyles from './styles'

const steps=['Shipping Address', 'Payment Details']

const Checkout = ({ cart, order, onCaptureCheckout ,error }) => {
    const classes=useStyles()
    const [activeStep, setActiveStep]=useState(0)
    const [shippingData, setShippingdata]=useState({})
    const [checkoutToken, setCheckoutToken]=useState(null)
    const [isFinished, setIsFinished] = useState(false)
    const history=useHistory()

    useEffect(() => {
       const generateToken = async ()=>{
           try {
               const token = await commerce.checkout.generateToken(cart.id, {type:'cart'})

               setCheckoutToken(token)
            } catch (error) {
               history.pushState('/')
           }
       }

       generateToken()
    }, [cart]);


    const nextStep=()=> setActiveStep((prevActiveStep)=> prevActiveStep+1)
    const backStep=()=> setActiveStep((prevActiveStep)=> prevActiveStep-1)


    const next = (data)=>{
        setShippingdata(data)

        nextStep()
    }

    const timeout= () =>[
        setTimeout(()=>{
            setIsFinished(true)
        }, 3000)
    ]

    let Confirmation=()=> order.customer ? (
        <>
            <div>
                <Typography variant="h6"> Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">Order reference number: {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h6"> Thank you for your purchase</Typography>
                <Divider className={classes.divider}/>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if(error){
        <>
            <Typography variant="h6">Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    }

    const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep}  next={next} />
    : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />);
    return (
        <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
    )
}

export default Checkout

