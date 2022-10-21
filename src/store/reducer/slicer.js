import { createSlice } from '@reduxjs/toolkit';

const conversionAction = (state, action) => {
  const stateChange = state;
  stateChange.conversionResult = action.payload;
};

const getExchangeRateAction = (state, action) => {
  const stateChange = state;
  stateChange.data = action.payload.Valute;
  stateChange.updateDate = action.payload.Date;
};

export const initialState = {
  conversionResult: '',
  data: {},
  updateDate: '',
};

export const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
    conversionAction,
    getExchangeRateAction
  }
});

export default exchangeRateSlice.reducer;