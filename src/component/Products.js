import React, { useEffect, useState } from 'react'
import '../style/featured.css'
import Card from './Card';

const Products = () => {
    const [shopItems, setshopItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadData = async () => {
        try {
            let response = await fetch('https://give4goods.onrender.com/api/auth/productItems', {
                // let response = await fetch('http://localhost:5000/api/auth/productItems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            setshopItems(response[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <h2 className="title">All Products</h2>
            {loading ? (
                <p className='loader-parent'><span className="loader"></span></p>
            ) : (
                <div className="l">
                    {shopItems.length > 0
                        ? shopItems.map((data) => (
                            <Card key={data._id} img={data.image} name={data.name} price={data.price} id={data._id} description={data.description} features={data.features} />
                        ))
                        : "No Items to Display"
                    }
                </div>
            )}
        </>
    );
}

export default Products;
