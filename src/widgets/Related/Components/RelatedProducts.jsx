import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RelatedModal from './RelatedModal.jsx'
const { url, API_TOKEN } = require('../../../../config.js');
axios.defaults.headers.common['Authorization'] = API_TOKEN;

const RelatedProducts = (props) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(relatedProducts.length);
  const [showModal, setShowModal] = useState(false);
  const [compareItems, setCompareItems] = useState([]);

  // leftCount
  const increment = () => {
    setLeftCount((leftCount) => leftCount + 1)
  }

  // rightCount
  const decrement = () => {
    setLeftCount((leftCount) => {
      if (leftCount !== 0) {
        return leftCount - 1;
      } else {
        return 0;
      }
    })
  }


  const getRelatedProducts = (arrayProductID) => {
    const promise = arrayProductID.map((id) => {
      return axios.get(url + `products/${id}`)
        .then()
        .catch();
    })
    return Promise.all(promise);
  }

  const getRelatedStyles = (arrayProducts) => {
    const promiseStyles = arrayProducts.map((id) => {
      return axios.get(url + `products/${id}/styles`)
        .then()
        .catch();
    })
    return Promise.all(promiseStyles);
  }

  useEffect(() => {
    axios.get(url + 'products')
      .then((res) => {
        axios.get(url + `products/${res.data[1].id}/related`)
          .then((res) => {
            //res.data = [12030, 230124, 412033, 23013]
            getRelatedProducts(res.data)
              .then((res) => {
                // res === array of related products

                let arrayRP = res.map((rp) => {
                  return rp.data;
                });
                return arrayRP;
              })
              .then((arrayRP) => {
                let productID = arrayRP.map((rp) => {
                  return rp.id;
                });
                getRelatedStyles(productID)
                  .then((styleData) => {
                    let arrayStyle = styleData.map((rp, index) => {
                      let temp = Object.assign({}, rp.data, arrayRP[index]);
                      return temp;
                    });
                    return arrayStyle;
                  })
                  .then((res) => {
                    setRelatedProducts(res);
                    setRightCount(arrayRP.length);
                  })
              })
          })
      })
  }, [])


  return (
    <div>
      <h3>Related Products Section</h3>
      <div className='related-cards' style={{ display: 'flex', flexDirection: 'row', width: 'fitContent', position: 'relative' }}>

        {leftCount !== 0 ? (
          <i className='left-arrow' style={{ position: 'absolute', top: '50%', width: '0', height: '0', borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderRight: '15px solid red' }} onClick={() => {
            decrement();
          }}>
          </i>
        ) : (null)}

        {relatedProducts.slice(leftCount, rightCount).map((item, index) =>
          <div onClick={() => {
            setShowModal(true);
            setCompareItems(item);}} key={index} style={{ border: '1px solid black', width: '20%', margin: '3px', height: '250px' }}>
            <img style={{ height: '60%', width: '100%' }} src={item.results[0].photos[0].thumbnail_url} />
            <div style={{ paddingLeft: '5px' }}>{item.category}</div>
            <div style={{ fontWeight: 'bold', paddingLeft: '5px' }}>{item.name}</div>
            <div style={{ paddingLeft: '5px' }}>${item.default_price}</div>
            <div style={{ paddingLeft: '5px' }}>StarRating</div>
          </div>
        )}

        {leftCount !== rightCount - 1 ? (
          <i className='right-arrow' style={{ position: 'absolute', top: '50%', right: '10%', width: '0', height: '0', borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderLeft: '15px solid red' }} onClick={() => {
            increment();
          }}>
          </i>
        ) : (null)}

        <RelatedModal showModal={showModal} onClose={() => setShowModal(false)} chosenItem={compareItems}/>

      </div>
    </div>
  )
}


export default RelatedProducts