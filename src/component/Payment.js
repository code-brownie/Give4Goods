import React, { useEffect } from 'react'

const Payment = () => {
    const payment = async () => {

        const response = await fetch('http://localhost:3000/api/auth/processed')
        const data = await response.json();
        console.log(data.msg)
    }
    useEffect(() => {
        payment();
    },[])
    return (
        <div>
            This is my

        </div>
    )
}

export default Payment
