import React from 'react';
import { connect } from 'react-redux';
import { controlInProgress } from '../model/control/selector';

import style from './TotalAnimation.css';
import common from './common.css';

export const AnimatedBidRow = ({ value, max }) => (
    <div style={{backgroundColor: 'green', width: `${value / max * 100 }%`, height: '1.2rem'}}></div>
)
export const AnimatedAskRow = ({ value, max }) => (
    <div style={{backgroundColor: 'red', width: `${value / max * 100 }%`, height: '1.2rem'}}></div>
)

export const TotalAnimation = ({
    className, byPrice, bidsByPrice, asksByPrice, inProgress, bidTotal, askTotal,
}) => (
    <div className={`${className} ${style.TotalAnimation}`}>
        <div className={common.WidgetRow} style={{opacity: inProgress ? '15%' : '35%', gap: 'unset'}}>
            <div className={`${common.OrderColumn} ${style.AnimatedLeftColumn}`}>
                <div />
                { bidsByPrice.map((price) => (
                    <AnimatedBidRow key={price} value={byPrice[price].total} max={bidTotal} />
                    )) }
            </div>
            <div className={common.OrderColumn}>
                <div />
                { asksByPrice.map((price) => (
                    <AnimatedAskRow key={price} value={byPrice[price].total} max={askTotal} />
                    )) }
            </div>
        </div>
    </div>
);

export const ConnectedTotalAnimation = connect(
    (state) => ({
        bidsByPrice: state.byPrice.bids,
        asksByPrice: state.byPrice.asks,
        byPrice: state.order.byPrice,
        bidTotal: state.order.bidTotal,
        askTotal: state.order.askTotal,
        inProgress: controlInProgress(state),
    }),
)(TotalAnimation);
