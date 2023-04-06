import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CountButton() {
  const [count, setCount] = useState(0);
  //const backendUrl = `https://map-work-shop.herokuapp.com`;
  async function handleClick () {
    const response = await axios.post(`https://map-work-shop.herokuapp.com/MapWorkShop/users/signin`, {
      email: "yanguang.gong@stonybrook.edu",
      password: "123456",
      username: "1fweg3"
    });
    console.log(response.data);
    //setCount(count + 1);
  }
  useEffect(() => {
    // async function fetchCount() {
    //   const response = await axios.get(`https://map-work-shop.herokuapp.com/api/count`);
    //   console.log(response);
    //   setCount(response.data.counter);
    // }
    // fetchCount();
    console.log("Heroku Open");
  }, []);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click to increase the counter!</button>
    </div>
  );
}

export default CountButton;
