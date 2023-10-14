import {useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'


const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // getting the cart state
  const cart = useSelector((state)=>state.cart)
  const {shippingAddress} = cart

  useEffect(()=>{
    if(!shippingAddress){
      navigate('/shipping')
    }
  },[shippingAddress,navigate])

  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Select Methods</Form.Label>
          <Col>
            <Form.Check 
              type='radio' 
              className='my-2' 
              label='Paypal or Credit Card'
              id='paypal'
              name='paymentMethod'
              value={paymentMethod}
              checked
              onChange={(e)=>setPaymentMethod(e.target.value)}
              ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen