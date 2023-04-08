import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from './context';
import { useNavigate } from 'react-router';

// main entry
export default function FakeStackOverflow () {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className={'navbar'}>
          {
            user ? <>
              <div
                className={`nav-link`} onClick={() => {
                  setUser(null);
                  navigate('/');
                }}
              >
                Logout
              </div>
            </> : <>
              <Link className={`nav-link`} to={'/'}>Login</Link>
              <Link className={`nav-link`} to={'/register'}>Register</Link>

            </>
          }

    
        </div>
      </div>

      <main>
        {
          <AppContext.Provider value={{ user, token ,setUser, setToken }}>
            <Outlet/>
          </AppContext.Provider>
        }
      </main>
    </div>
  );
}