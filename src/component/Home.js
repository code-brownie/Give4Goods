import React from 'react'
import '../style/home.css'
import { Link } from 'react-router-dom'
import Footer from './Footer'
const Home = () => {
    return (
        <div className="header">
            <div className="Container">
                <div className='Row'>
                    <div className="Col-2">
                        <h1>Join the<br /> ReNewCycle!</h1>
                        <p>Together, we can create a sustainable future, one purchase and donation at a time.</p>
                        <Link to="/products">
                            <button className="learn-more">
                                <span className="circle" aria-hidden="true">
                                    <span className="icon arrow"></span>
                                </span>
                                <span className="button-text">Explore Now</span>
                            </button></Link>
                    </div>
                    <div className="Col-2">
                        <img src="./images/4894738.png" alt="images" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Home
