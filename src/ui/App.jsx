import React from 'react';
import { ConnectedOrderBook } from './OrderBook';

import style from './App.css';

export const App = () => (
    <>
        <h1>Order Book</h1>
        <ConnectedOrderBook className={style.AppWidget}/>
    </>
)
