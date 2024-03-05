import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/featured.css';

const Card = (props) => {
  const Navigate = useNavigate();

  const rating = Math.floor(Math.random() * 3) + 3;

  return (
    <div className="col-12 col-md-4 col-lg-4"> 
      <div className="card my-4 mx-4 border-0"
        style={{
          width: '18rem',
          borderRadius: '8px',
          boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
          transition: 'box-shadow 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.25)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
        }}
      >
        <img
          onClick={() => {
            const queryParams = `price=${props.price}&name=${props.name}&id=${props.id}&image=${encodeURIComponent(props.img)}&description=${props.description}&features=${props.features}`;
            Navigate(`/productsdetails?${queryParams}`);
        }}        
          style={{ height: '200px', cursor: 'pointer', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', objectFit: 'contain' }}
          src={props.img}
          className="card-img-top img-fluid"
          alt="items"
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <h6 className="card-text text-muted" style={{ fontSize: '14px' }}>₹{props.price}</h6>
          <div className="rating" style={{ fontSize: '16px', color: '#777', marginTop: '5px' }}>Rating : 
            {[...Array(rating)].map((_, index) => (
              <i key={index} className="fa-solid fa-star"></i>
            ))}
            {[...Array(5 - rating)].map((_, index) => (
              <i key={index + rating} className="fa-regular fa-star"></i>
            ))}
          </div>
          {/* <button className="btn btn-primary mt-3" onClick={() => {}}>Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
