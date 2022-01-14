export const BOOKS_SNAPSHOT_DOC = 'doc/books/snapshot';
export const BOOKS_CHANGE_DOC = 'doc/books/change';
export const ORDER_TOTAL_DOC = 'doc/order/total';

export const setBooksSnapshot = (data) => ({
    type: BOOKS_SNAPSHOT_DOC,
    payload: data,
});
export const setBooksChange = (data) => ({
    type: BOOKS_CHANGE_DOC,
    payload: data,
});

export const setOrderTotal = (data) => ({
    type: ORDER_TOTAL_DOC,
    payload: data,
})
