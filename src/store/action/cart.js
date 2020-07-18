/* eslint-disable prettier/prettier */
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLUS_ITEM,
  MINUS_ITEM,
  DONE_TRANSACTION,
} from '../type';

export const addItem = (data) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {data: {...data, jumlah: 1, totalHarga: data.harga}},
  });
};

export const removeItem = (id, data) => (dispatch) => {
  dispatch({type: REMOVE_FROM_CART, payload: {id, data}});
};

export const plusItem = (id) => (dispatch) => {
  dispatch({type: PLUS_ITEM, payload: {id}});
};

export const minusItem = (id) => (dispatch) => {
  dispatch({type: MINUS_ITEM, payload: {id}});
};

export const doneTransaction = () => (dispatch) => {
  dispatch({type: DONE_TRANSACTION, payload: {}});
};
