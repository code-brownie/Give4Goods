import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/featured.css';

const Card = (props) => {
  const Navigate = useNavigate();

  return (
    <div className="container col-12 col-md-4 col-lg-4 product">
      <div className="row justify-start"> {/* Added "justify-content-start" class */}
        <div className="col-12">
          <div className="card my-4 mx-4" style={{ width: '18rem' }}>
            <img
              onClick={() => {
                Navigate(`/productsdetails?price=${props.price}&name=${props.name}&id=${props.id}&image=${encodeURIComponent(props.img)}`);
              }}
              style={{ height: '200px' }}
              src={props.img}
              className="card-img-top img-fluid" // Added "img-fluid" class here
              alt="items"
            />
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <h5 className="card-title">₹{props.price}</h5>
              <div className="rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
