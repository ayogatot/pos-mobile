/* eslint-disable prettier/prettier */
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLUS_ITEM,
  MINUS_ITEM,
  DONE_TRANSACTION,
} from '../type';
import Data from '../../data.js';

const initialState = {
  cartItem: [],
  dataItem: Data,
  totalHarga: 0,
};

let _total = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (
        state.cartItem.filter((i) => i.id === action.payload.data.id).length > 0
      ) {
        return {...state};
      } else {
        let addProduct = state.dataItem.slice();
        addProduct.forEach((i) => {
          if (i.id === action.payload.data.id) {
            i.stock -= 1;
          }
        });
        return {
          ...state,
          cartItem: [...state.cartItem, action.payload.data],
          dataItem: addProduct,
          totalHarga: state.totalHarga + action.payload.data.totalHarga,
        };
      }

    case REMOVE_FROM_CART:
      let removeProduct = state.cartItem.slice();
      let _remove = state.dataItem.slice();
      removeProduct = removeProduct.filter((i) => i.id !== action.payload.id);
      _remove.forEach((i) => {
        if (i.id === action.payload.id) {
          i.stock += action.payload.data.jumlah;
        }
      });
      _total = 0;
      removeProduct.forEach((i) => (_total += i.totalHarga));
      return {
        ...state,
        dataItem: _remove,
        cartItem: removeProduct,
        totalHarga: _total,
      };

    case PLUS_ITEM:
      _total = 0;
      let plusItem = state.cartItem.slice();
      let _minus = state.dataItem.slice();
      plusItem.forEach((i) => {
        if (i.id === action.payload.id) {
          let _jumlah = i.jumlah + 1;
          if (i.stock >= _jumlah) {
            i.jumlah = _jumlah;
            i.totalHarga = Number(i.harga) * _jumlah;
          }
        }
        _total += i.totalHarga;
      });
      _minus.forEach((i) => {
        if (i.id === action.payload.id) {
          i.stock -= 1;
        }
      });
      return {
        ...state,
        dataItem: _minus,
        cartItem: plusItem,
        totalHarga: _total,
      };

    case MINUS_ITEM:
      _total = 0;
      let minusItem = state.cartItem.slice();
      let _plus = state.dataItem.slice();
      minusItem.forEach((i) => {
        if (i.id === action.payload.id) {
          if (i.jumlah > 1) {
            let _jumlah = i.jumlah - 1;
            i.jumlah = _jumlah;
            i.totalHarga = Number(i.harga) * _jumlah;
          }
        }
        _total += i.harga;
      });
      _plus.forEach((i) => {
        if (i.id === action.payload.id) {
          i.stock += 1;
        }
      });
      return {
        ...state,
        dataItem: _plus,
        cartItem: minusItem,
        totalHarga: _total,
      };

    case DONE_TRANSACTION:
      return {...state, cartItem: [], totalHarga: 0};

    default:
      return state;
  }
};
