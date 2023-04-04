import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CountButton() {
  const [count, setCount] = useState(0);
  const backendUrl = `https://map-work-shop.herokuapp.com`;
  async function handleClick () {
    const response = await axios.get(`${backendUrl}/inc`);
    console.log(response)
    setCount(count + 1);
  }
  useEffect(() => {
    async function fetchCount() {
      const response = await axios.get(`https://map-work-shop.herokuapp.com/count`);
      console.log(response)
      setCount(response.data.counter);
    }
    fetchCount();
  }, []);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click to increase the counter!</button>
    </div>
  );
}

export default CountButton;
