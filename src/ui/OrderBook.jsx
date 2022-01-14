import React from 'react';
import { connect } from 'react-redux';
import { ConnectedStatusBar } from './Control';
import { controlInProgress } from '../model/control/selector';

import styles from './OrderBook.css';

export const OrderBidRow = ({ count, amount, total, price }) => (
    <div className={styles.OrderRow}>
        <div className={styles.BidColumn}>{count}</div>
        <div className={styles.BidColumn}>{amount}</div>
        <div className={styles.BidColumn}>{total}</div>
        <div className={styles.BidColumn}>{price}</div>
    </div>
)

export const OrderAskRow = ({ count, amount, total, price }) => (
    <div className={styles.OrderRow}>
        <div className={styles.AskColumn}>{price}</div>
        <div className={styles.AskColumn}>{total}</div>
        <div className={styles.AskColumn}>{amount}</div>
        <div className={styles.AskColumn}>{count}</div>
    </div>
)

export const ConnectedBidOrder = connect(
    (state, { price }) => state.order.byPrice[price],
)(OrderBidRow)

export const ConnectedAskOrder = connect(
    (state, { price }) => state.order.byPrice[price],
)(OrderAskRow)

export const AsksHeader = () => (
    <div className={styles.OrderRow}>
        <div className={styles.AskColumn}>PRICE</div>
        <div className={styles.AskColumn}>TOTAL</div>
        <div className={styles.AskColumn}>AMOUNT</div>
        <div className={styles.AskColumn}>COUNT</div>
    </div>
)
export const BidsHeader = () => (
    <div className={styles.OrderRow}>
        <div className={styles.BidColumn}>COUNT</div>
        <div className={styles.BidColumn}>AMOUNT</div>
        <div className={styles.BidColumn}>TOTAL</div>
        <div className={styles.BidColumn}>PRICE</div>
    </div>
)

export const OrderBooks = ({ className, bidsByPrice, asksByPrice, inProgress }) => (
    <div className={className}>
        <ConnectedStatusBar className={styles.WidgetRow}/>
        <div className={styles.WidgetRow} style={{color: inProgress ? 'lightgrey' : 'black'}}>
            <div className={styles.OrderColumn}>
                <BidsHeader />
                { bidsByPrice.map((price) => <ConnectedBidOrder key={price} price={price} />) }
            </div>
            <div className={styles.OrderColumn}>
                <AsksHeader />
                { asksByPrice.map((price) => <ConnectedAskOrder key={price} price={price} />) }
            </div>
        </div>
    </div>
)

export const ConnectedOrderBook = connect(
    (state) => ({
        bidsByPrice: state.byPrice.bids,
        asksByPrice: state.byPrice.asks,
        inProgress: controlInProgress(state),
    }),
)(OrderBooks);
