import { FirstPageStyle } from './FirstPage.style';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getExchangeRateReq } from '../../api';
import { conversionAction, getExchangeRateAction } from '../../store/slice';
import { toast } from 'react-toastify';
import { Button, FormControl, Input, TextField } from '@material-ui/core';

const FirstPage = () => {
  const exchangeRate = useSelector((state) => state.exchangeRate);
  const dispatch = useDispatch();
  const [conversion, setConversion] = useState('');
  
  useEffect(() => {
    const getResponse = async () => {
      const res = await getExchangeRateReq();
      dispatch(getExchangeRateAction(res));
    };
    getResponse();
  }, [dispatch]);

  const conversionInput = (value) => {
    setConversion(value);
  };

  const convert = (e) => {
    try {
      e.preventDefault();
      const inputValueArr = conversion.split(' ');
      const exchangeSum = inputValueArr[0];
      const firstValuta = inputValueArr[1].toUpperCase();
      const secondValuta = inputValueArr[3].toUpperCase();

      if (firstValuta !== 'RUB') {
        if (secondValuta === 'RUB') {
          const rate = exchangeRate.data[firstValuta].Value;
          const result = exchangeSum * rate;
          dispatch(conversionAction(result));
          return;
        }
        const rateFirstValuta = exchangeRate.data[firstValuta].Value;
        const rateSecondValuta = exchangeRate.data[secondValuta].Value;
        const result = (exchangeSum * (rateFirstValuta /rateSecondValuta)).toFixed(4);
        dispatch(conversionAction(result));
        return;
      } else {
        if (secondValuta === 'RUB') {
          const result = exchangeSum * 1;
          dispatch(conversionAction(result));
          return;
        }
        const rate = 1 / exchangeRate.data[secondValuta].Value;
        const result = (exchangeSum * rate).toFixed(4);
        dispatch(conversionAction(result));
      }
    } catch (err) {
      dispatch(conversionAction(''));
      toast("Wrong format. Сorrect format example: 100 rub in usd");
    }
  };

  const toExchangerate = () => {
    window.location.href = '/exchange-rate';
  };

  return (
    <FirstPageStyle>
      <Button className="navigationButton" variant="contained" onClick={toExchangerate}>Exchange rate</Button>
      <FormControl onSubmit={(e) => convert(e)}>
        <form>
          <TextField label="Enter conversion" value={conversion} onInput={(e) => conversionInput(e.target.value)}/>
          <Input className="formInputSubmit" type="submit" variant="contained"  value="Convert" />
        </form>
        {exchangeRate.conversionResult && <p >Result: {exchangeRate.conversionResult}</p >}
      </FormControl>
    </FirstPageStyle>
  );
};

export default FirstPage;