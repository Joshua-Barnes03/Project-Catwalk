import React, {useState, useEffect} from 'react';
import ImageGallery from './Components/ImageGallery.jsx';
import ProductInfo from './Components/ProductInfo.jsx';
import StyleSelector from './Components/StyleSelector.jsx';
import AddToCart from './Components/AddToCart.jsx';
import axios from 'axios';
const {url, API_TOKEN} = require('../../../config.js')
axios.defaults.headers.common['Authorization'] = API_TOKEN;

const {products, productStyles} = require('./DefaultData/placeholderData.js');

const Overview = function({getProducts}) {

  const [product, setProduct] = useState(products[0]);
  const [styles, setStyles] = useState(productStyles);
  const [currentStyle, setCurrent] = useState(styles[0]);
  const [isEmpty, setEmpty] = useState(false);


  // useEffect(() => {
  //   axios.get(url + 'products')
  //     .then( (products) => {
  //       setProduct(products.data[0])
  //       axios.get(`${url}products/${products.data[0].id}/styles`)
  //         .then( (styles) => {
  //           setStyles(styles.data.results);
  //         })
  //         .catch( (error) => {
  //           throw new Error(error);
  //         })
  //     })
  //     .catch( (error) => {
  //       throw new Error(error);
  //     })
  // }, []);

  useEffect( ()=> {
    setProduct(getProducts)
  }, [getProducts])

  useEffect( () => {
    if (product.id) {
      axios.get(url + 'products/' + product.id + '/styles')
        .then( (result) => {
          setStyles(result.data.results)
        })
        .catch( (error) => {
          throw new Error(error)
        })
    } else {

    }
  }, [product])

  useEffect( () => {
    if (styles[0]) {
      setCurrent(styles[0])
    }
  }, [styles])

  // const overviewStyle = {
  //   display: 'grid',
  //   gridTemplateColumns: '45vw 35vw',
  //   gridTemplateRows: '1fr 1fr 1fr'
  // }

  // const overviewStyle = {
  //   display: 'flex',
  //   flexDirection: 'row'
  // }

  return (
    <React.Fragment>
      {currentStyle.style_id
      ? <div id="overview-widget" >
          <ImageGallery style={currentStyle} />
          <div id='overview-second-column'>
          <ProductInfo product={product} currentStyle={currentStyle}/>
          <StyleSelector styles={styles} setCurrent={setCurrent} currentStyle={currentStyle} />
          <AddToCart currentStyle={currentStyle} isEmpty={isEmpty} setEmpty={setEmpty} />
          </div>
        </div>
      : <div></div>}
    </React.Fragment>
  )
}

export default Overview;