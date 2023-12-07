import React, {useState} from "react";
import pfp from '../../../../client/assets/Jonathan_banks.png'

const Checkout = () => {

  const [checkout, setCheckout] = useState(false)
  const [toggleText, setToggleText] = useState('To Checkout')

  const checkoutToggle = () => {
    setCheckout(!checkout)
    setToggleText(toggleText === 'To Checkout' ? 'Reviews' :'To Checkout')
  }

  const reviews = []
  for(let i = 0; i < 10; i++){
    reviews.push(<div className='review'><img src={pfp}></img><span><h5>Jonathan Banks</h5><p>Great relaxing stay here in the Catskills, looking forward to staying again. Joycelyn was a great host, I also got to meet her lovely daughter Cheri! ★★★★★</p></span></div>)
  }

  return (
    <div>
    <button id='toggle' onClick={checkoutToggle}>{toggleText}</button>
    <div id="checkout-div">
      {!checkout && <div id="reviews">
        {reviews}
      </div>}
      {checkout && <div id='checkout-form'>
        <h4>Please fill out your credit card information and proceed to Checkout.</h4>
        <div className='form-row' ><input id='cc-name' placeholder='Name'></input></div>
        <div className='form-row' ><input id='cc-number' placeholder='Credit Card'></input></div>
        <span>
          <div className='form-row' ><input id='cc-exp' placeholder='Exp. Date'></input></div>
          <div className='form-row' ><input id='cc-sec' placeholder='Sec. Code'></input></div>
        </span>
        <button>Checkout</button>
      </div>}
    </div>
    </div>
  );
};

export default Checkout;
