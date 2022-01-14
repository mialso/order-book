import React from 'react';
import { connect } from 'react-redux';
import { controlInProgress } from '../model/control/selector';
import { ConnectedStatusBar } from './Control';
import { ConnectedTotalAnimation } from './TotalAnimation';

import styles from './OrderBook.css';
import common from './common.css';

export const OrderBidRow = ({ className, count, amount, total, price }) => (
    <div className={className}>
        <div className={styles.BidColumn}>{count}</div>
        <div className={styles.BidColumn}>{amount}</div>
        <div className={styles.BidColumn}>{total}</div>
        <div className={styles.BidColumn}>{price}</div>
    </div>
)

export const OrderAskRow = ({ className, count, amount, total, price }) => (
    <div className={className}>
        <div className={styles.AskColumn}>{price}</div>
        <div className={styles.AskColumn}>{total}</div>
        <div className={styles.AskColumn}>{amount}</div>
        <div className={styles.AskColumn}>{count}</div>
    </div>
)

export const ConnectedBidOrder = connect(
    (state, { price }) => state.order.byPrice[price],
)(OrderBidRow);

export const ConnectedAskOrder = connect(
    (state, { price }) => state.order.byPrice[price],
)(OrderAskRow);

export const AsksHeader = ({ className }) => (
    <div className={className}>
        <div className={styles.AskColumn}>PRICE</div>
        <div className={styles.AskColumn}>TOTAL</div>
        <div className={styles.AskColumn}>AMOUNT</div>
        <div className={styles.AskColumn}>COUNT</div>
    </div>
);
export const BidsHeader = ({ className }) => (
    <div className={className}>
        <div className={styles.BidColumn}>COUNT</div>
        <div className={styles.BidColumn}>AMOUNT</div>
        <div className={styles.BidColumn}>TOTAL</div>
        <div className={styles.BidColumn}>PRICE</div>
    </div>
);

export const OrderBook = ({ bidsByPrice, asksByPrice, inProgress }) => (
    <div className={common.WidgetRow} style={{position: 'relative', zIndex: '1', color: inProgress ? 'lightgrey' : 'black'}}>
        <div className={common.OrderColumn}>
            <BidsHeader className={common.OrderRow}/>
            { bidsByPrice.map((price) => (
                <ConnectedBidOrder key={price} className={common.OrderRow} price={price} />
                )) }
        </div>
        <div className={common.OrderColumn}>
            <AsksHeader className={common.OrderRow}/>
            { asksByPrice.map((price) => (
                <ConnectedAskOrder key={price} className={common.OrderRow} price={price} />
                )) }
        </div>
    </div>
)

export const ConnectedOrderBook = connect(
    (state) => ({
        bidsByPrice: state.byPrice.bids,
        asksByPrice: state.byPrice.asks,
        inProgress: controlInProgress(state),
    }),
)(OrderBook);

export const OrderBookWidget = ({ className }) => (
    <div className={className}>
        <ConnectedStatusBar className={common.WidgetRow}/>
        <div style={{ position: 'relative' }}>
            <ConnectedOrderBook />
            <ConnectedTotalAnimation />
        </div>
    </div>
)
