import React from 'react';
import { connect } from 'react-redux';
import { ConnectedStatusBar } from './Control';

export const OrderBidRow = ({ count, amount, total, price }) => (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <div>{count}</div>
        <div style={{ minWidth: '150px', textAlign: 'center' }}>{amount}</div>
        <div>{total}</div>
        <div>{price}</div>
    </div>
)

export const OrderAskRow = ({ count, amount, total, price }) => (
    <div style={{display: 'flex', gap: '10px' }}>
        <div>{price}</div>
        <div>{total}</div>
        <div style={{ minWidth: '150px', textAlign: 'center' }}>{amount}</div>
        <div>{count}</div>
    </div>
)

export const ConnectedBidOrder = connect(
    (state, { price }) => state.order.byPrice[price],
)(OrderBidRow)

export const ConnectedAskOrder = connect(
    (state, { price }) => state.order.byPrice[price],
)(OrderAskRow)

export const OrderBooks = ({ bidsByPrice, asksByPrice}) => (
    <div>
        <ConnectedStatusBar />
        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
            <div style={{ width: '50%' }}>
                { bidsByPrice.map((price) => <ConnectedBidOrder key={price} price={price} />) }
            </div>
            <div>
                { asksByPrice.map((price) => <ConnectedAskOrder key={price} price={price} />) }
            </div>
        </div>
    </div>
)

export const ConnectedOrderBook = connect(
    (state) => ({
        bidsByPrice: state.byPrice.bids,
        asksByPrice: state.byPrice.asks,
    }),
)(OrderBooks);
