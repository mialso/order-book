import {
    setOrderTotal,
    BOOKS_CHANGE_DOC, BOOKS_SNAPSHOT_DOC,
} from './message';

function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

const round10 = (value, exp) => decimalAdjust('round', value, exp);

export const getTotalsByPriceFromSorted = (prices, byPrice) => prices.reduce(
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
            const totalsByPrice = totalsToObjMap([
                ...getTotalsByPriceFromSorted(bids, order.byPrice),
                ...getTotalsByPriceFromSorted(asks, order.byPrice),
            ]);
            dispatch(setOrderTotal(totalsByPrice));
            break;
        }
        default: break;
    }
}
