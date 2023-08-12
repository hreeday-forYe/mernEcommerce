import { useParams, Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap"
import Rating from '../components/Rating'
import axios from "axios";
import { useState, useEffect, React } from 'react';
const ProductScreen = () => {
  const {id: productId} = useParams();
  const [product, setProduct] = useState({})

  // fetching the products using the id
  useEffect(()=>{
    const fetchProduct = async ()=>{
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data);
    }
    fetchProduct();
    // const product = products.find((p)=>p._id === productId);
  }, [productId])


  // console.log(product);

  return (
    <>
      <Link className='btn btn-light my-3' to={'/'}>Go Back</Link>
      <Row>
        <Col  md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col  md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <strong>
                Price: ${product.price} 
              </strong>
            </ListGroup.Item> */}
          </ListGroup>
        </Col>
        <Col  md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product.countInStock> 0 ? 'In Stock': "Out Of Stock"}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={product.countInStock===0}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen