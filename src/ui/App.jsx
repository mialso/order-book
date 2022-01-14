import React from 'react';
import { OrderBookWidget } from './OrderBook';

import style from './App.css';

export const App = () => (
    <>
        <h1>Order Book</h1>
        <OrderBookWidget className={style.AppWidget}/>
    </>
)
