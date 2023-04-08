import React, { useContext } from 'react';
import { AppContext } from './context';

export default function ShowUser () {
    const { user, token } = useContext(AppContext);

    return (
        <div>
            <h1>Username: {user.username}</h1>
            <br/>
            <br/>
            <h2>Email: {user.email}</h2>
            <br/>
            <br/>
            <h2>Token: {token}</h2>
        </div>
    );
}