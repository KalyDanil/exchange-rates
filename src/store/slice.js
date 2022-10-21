import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversionResult: '',
  data: {},
  updateDate: '',
  baseValuta: '',
};

export const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
    conversionAction: (state, action) => {
      const stateChange = state;
      stateChange.conversionResult = action.payload;
    },
    getExchangeRateAction: (state, action) => {
      const stateChange = state;
      stateChange.data = action.payload.Valute;
      stateChange.updateDate = action.payload.Timestamp;
    },
    getBaseValutaAction: (state, action) => {
      const stateChange = state;
      stateChange.baseValuta = action.payload;
    },
  }
});

export const { conversionAction, getExchangeRateAction, getBaseValutaAction } = exchangeRateSlice.actions;

export default exchangeRateSlice.reducer;