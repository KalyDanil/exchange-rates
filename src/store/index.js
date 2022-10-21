import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './reducer/slicer';

export const store = configureStore({
  reducer: {
    exchangeRate: exchangeRatesReducer,
  },
});
