import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from './context';
import { useNavigate } from 'react-router';

export default function LoginPage () {
  const [message, setMessage] = useState('');
  const [data, setData] = useState({ email: '', password: '' });
  const { setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function onSubmit (e) {
    e.preventDefault();
    let msg = '';

    if (!data.email) {
      msg += 'Please input email.\n';
    }
    
    if (!data.password) {
      msg += 'Please input password.\n';
    }
    if (msg) {
      setMessage(msg);
      return;
    }
    const res = await axios.post(`https://map-work-shop.herokuapp.com/MapWorkShop/users/signin`, data);
    setUser(res.data.user);
    setToken(res.data.token);
    console.log(res.data.user);
    navigate('/showuser');
  }

  function onInput (e) {
    setData(prevState => ({
      ...prevState,
      [e.target.getAttribute('name')]: e.target.value
    }));
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>

        {
          !!message && (
            <div className="form-group">
              <div className="tip">{message}</div>
            </div>
          )
        }

        <div className="form-group">
          <h4>Email</h4>
          <input name="email" type={'email'} value={data.email} onInput={onInput}/>
        </div>

        <div className="form-group">
          <h4>Password</h4>
          <input name="password" type={'password'} value={data.password} onInput={onInput}/>
        </div>


        <div className="login">
          <button style={{width: '60%'}}>Login</button>
        </div>

        <br></br>

        <div className = 'notice'> Do not have an account? 
          <span style={{color:'blue', cursor:'pointer'}} onClick ={() => {
            navigate('/register');
          }}> Sign Up</span>
        </div>

        <br></br>

        <div className = 'Notice'>Continue as a 
          <span style={{color:'blue', cursor:'pointer'}}> Guest?</span>
        </div>

      </form>
    </div>
  );
}