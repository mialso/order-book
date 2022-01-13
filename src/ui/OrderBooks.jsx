import React from 'react';
import { connect } from 'react-redux';
import { connectBooks, disconnectBooks } from '../model/message';

export const PairTitle = ({ pair }) => (
    <span>current pair: {pair}</span>
)

export const StatusBar = ({ config, connect, disconnect }) => (
    <>
        <div><PairTitle pair={config.pair} /></div>
        <div>
            <span>connection: {config.connectStatus}</span>
        </div>
        <button type='button' onClick={connect} disabled={config.connectStatus !== 'DISCONNECTED'}>Connect</button>
        <button type='button' onClick={disconnect} disabled={config.connectStatus !== 'SUBSCRIBED'}>Disconnect</button>
    </>
)

export const ConnectedStatusBar = connect(
    (state) => ({
        config: state.config,
    }),
    { connect: connectBooks, disconnect: disconnectBooks },
)(StatusBar)

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

export const ConnectedOrderBooks = connect(
    (state) => ({
        bidsByPrice: state.byPrice.bids,
        asksByPrice: state.byPrice.asks,
    }),
)(OrderBooks);
