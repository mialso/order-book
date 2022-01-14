import {
    setOrderTotal,
    BOOKS_CHANGE_DOC, BOOKS_SNAPSHOT_DOC,
} from './message';
import { round10 } from '../util/math';

export const getTotalsFromSorted = (prices, byPrice) => {
    const totals = prices.reduce(
        (acc, price, index) => {
            const item = byPrice[price];
            if (item) {
                let total = item.amount;
                if (index) {
                    total += acc[index - 1][1];
                }
                acc.push([price, round10(total, -4)]);
            } else {
                // error case
                acc.push([price, 0]);
            }
            return acc;
        },
        [],
    );
    const maxVal = totals[totals.length - 1][1];
    return [ totals, maxVal ];
}

export const totalsToObjMap = (totals) => totals.reduce(
    (acc, item) => {
        const [price, total] = item;
        acc[price] = total;
        return acc;
    },
    {},
)

export const totalCtrl = ({ getState, dispatch }, action) => {
    switch (action.type) {
        case BOOKS_SNAPSHOT_DOC:
        case BOOKS_CHANGE_DOC: {
            const { byPrice: { asks, bids }, order } = getState();
            const [ bidTotals, bidTotal ] = getTotalsFromSorted(bids, order.byPrice); 
            const [ askTotals, askTotal ] = getTotalsFromSorted(asks, order.byPrice); 
            const totalsByPrice = totalsToObjMap([
                ...bidTotals,
                ...askTotals,
            ]);
            dispatch(setOrderTotal({ totalsByPrice, askTotal, bidTotal }));
            break;
        }
        default: break;
    }
}
