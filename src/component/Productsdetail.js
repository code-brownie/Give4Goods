import React, { useState, useContext } from 'react';
import '../style/productdetail.css';
import Upload from './Upload';
import { useCart, useDispatchCart } from './ContexReducer';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal)
const Productsdetail = (props) => {
    const { foundProduct, handleFoundProduct } = useContext(AuthContext);
    const data = useCart();
    const [Qty, setQty] = useState(1);
    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue >= 1) setQty(inputValue);
    };
    const dispatch = useDispatchCart();
    const location = useLocation();
    const imageURL = new URLSearchParams(location.search).get('image');
    const id = new URLSearchParams(location.search).get('id');
    const name = new URLSearchParams(location.search).get('name');
    const price = new URLSearchParams(location.search).get('price');

    const handleAddToCart = async () => {
        const finalPrice = parseInt(price) * Qty;
        let food = null;
        for (const item of data) {
            if (item.id === id) {
                food = item;
                break;
            }
        }
        if (food) {
            // Item already exists in the cart, update the quantity and price
            await dispatch({ type: 'UPDATE', id: id, price: finalPrice, Qty: Qty });
            props.showAlerts("Item Added successfully", "success");
            handleFoundProduct(false);
        } else {
            // Item doesn't exist in the cart, add it
            await dispatch({ type: 'ADD', id: id, name: name, price: finalPrice, img: imageURL, Qty: Qty });
            props.showAlerts("Item added successfully", "success");
            handleFoundProduct(false);
        }
    }



    return (
        <>
            <div className="small-container single-product">
                <div className="Row">
                    <div className="Col-2">
                        <img src={imageURL} width="100%" alt="gallery" />
                    </div>
                    <div className="Col-2">
                        <h3>{name.toUpperCase()}</h3>
                        <h3>₹{parseInt(price) * Qty}</h3>

                        {foundProduct ? (
                            <>
                                <input id="qty" type="number" max="5" value={Qty} onChange={handleChange} />
                                <div className="btn" style={{ cursor: 'pointer' }} onClick={handleAddToCart}>
                                    Add to Cart
                                </div>
                            </>
                        ) : (<p className='notice_cart'>
                            Please get verified first
                        </p>)}
                        <h3>Product Details</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laborum ab commodi eaque neque reiciendis
                            nemo laboriosam sequi voluptas dolorem?
                        </p>
                    </div>
                </div>
            </div>

            {foundProduct ? <p className='notice'>
                Image verified Successfully Now you can add item to the Cart
            </p> : (<p className='notice'>
                Please Upload Image of the product You are purchasing so that we can verify the Product.
            </p>)}

            <Upload name={name} />
        </>
    );
};

export default Productsdetail;
