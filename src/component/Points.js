import React, { useState, useEffect } from 'react';

const Points = (props) => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (props.message) {
      const previousCoins = parseInt(localStorage.getItem('coins')) || 0;
      const newCoins = previousCoins + 100;
      setCoins(newCoins);
      localStorage.setItem('coins', newCoins.toString());
    } else {
      const storedCoins = parseInt(localStorage.getItem('coins')) || 0;
      setCoins(storedCoins);
    }
  }, []);

  return (
    <div>
      <p style={{textAlign:'center',fontSize:'25px',fontWeight:'700'}}>{coins}🪙</p>
    </div>
  );
};

export default Points;

