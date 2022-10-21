import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './slice';

export const store = configureStore({
  reducer: {
    exchangeRate: exchangeRatesReducer,
  },
});
