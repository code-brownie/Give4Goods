import React, { useEffect, useState } from 'react'
import '../style/featured.css'
import Card from './Card';
const Products = () => {
    const [shopItems, setshopItems] = useState([]);

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/auth/productItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setshopItems(response[0]);
    }
    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <h2 className="title">All Products</h2>
            <div className="l">
                {shopItems !== []
                    ?
                    shopItems.map((data) => {
                        return (
                            <Card key={data._id} img={data.image} name={data.name} price={data.price} id={data._id}/>
                        )
                    })
                    : "No Items to Display"
                }</div>
        </>
    )
}

export default Products
