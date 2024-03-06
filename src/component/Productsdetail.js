import React, { useState, useContext } from 'react';
import '../style/productdetail.css';
import Upload from './Upload';
import { useCart, useDispatchCart } from './ContexReducer';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

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
    const description = new URLSearchParams(location.search).get('description');
    const features = new URLSearchParams(location.search).get('features');
    const userId = localStorage.getItem('UserId');
    const featuresArray = features ? features.split(',') : [];

    const handleAddToCart = async () => {
        const finalPrice = parseInt(price) * Qty;
        let products = null;
        for (const item of data) {
            if (item.id === id) {
                products = item;
                break;
            }
        }
        if (products) {
            await dispatch({ type: 'UPDATE', id: id, price: finalPrice, Qty: Qty });
            props.showAlerts("Item Added successfully", "success");
            handleFoundProduct(false);
        } else {
            await dispatch({ type: 'ADD', id: id, name: name, price: finalPrice, img: imageURL, Qty: Qty, userId: userId });
            props.showAlerts("Item added successfully", "success");
            handleFoundProduct(false);
        }
    }

    return (
        <>
            <div className="small-container single-product">
                <div className="Row">
                    <div className="Col-2">
                        <img src={imageURL} style={{ height: '400px', width: 'auto' }} alt="gallery" />
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
                            {description}
                        </p>
                        <h3>Features</h3>
                        <div>
                            {featuresArray.map((feature, index) => (
                                <div key={index}>{feature}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {foundProduct ? <p className='notice'>
                    Image verified Successfully Now you can add item to the Cart
                </p> : (<p className='notice'>
                    Please Upload Image of the product You are purchasing so that we can verify the Product.
                </p>)}

                <Upload name={name} />
            </div>
        </>
    );
};

export default Productsdetail;
