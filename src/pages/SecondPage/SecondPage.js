import { useSelector, useDispatch } from 'react-redux';
import { SecondPageStyle } from './SecondPage.style';
import { useEffect, useState } from 'react';
import { getExchangeRateReq } from '../../api';
import { getExchangeRateAction } from '../../store/reducer/thunks';
import ValutaExchangeRate from '../../components/ValutaExchangeRate/ValutaExchangeRate';

const SecondPage = () => {
  const exchangeRate = useSelector((state) => state.exchangeRate);
  const dispatch = useDispatch();
  const [baseValuta, setBaseValuta] = useState('');
  const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', };
  const updateDate = new Date(exchangeRate.updateDate).toLocaleDateString([], options);
  const baseValutaArr = ['RUB', 'AUD', 'AZN', 'GBP', 'AMD', 'BYN', 'BGN', 'BRL', 'HUF', 'HKD', 'DKK', 'USD', 'EUR', 'INR', 'KZT', 'CAD', 'KGS', 'CNY', 'MDL', 'NOK', 'PLN', 'RON', 'XDR', 'SGD', 'TJS', 'TRY', 'TMT', 'UZS', 'UAH', 'CZK', 'SEK', 'CHF', 'ZAR', 'KRW', 'JPY']

  useEffect(() => {
    const getResponse = async () => {
      const res = await getExchangeRateReq();
      dispatch(getExchangeRateAction(res));
    };
    getResponse();
    switch(window.navigator.language) {
      case 'ru-RU':
        setBaseValuta('RUB');
        break;
      case 'en-US': 
        setBaseValuta('USD');
        break;
      default:
        break;
    }
  }, [dispatch]);

  const selectBaseValuta = (e) => {
    setBaseValuta(e.target.value);
  };

  const toExchanger =() => {
    window.location.href = '/exchanger';
  };
 
  const a = Object.keys(exchangeRate.data).map((valuta) => ValutaExchangeRate(
    {
      valuta,
      baseValuta,
      rate: exchangeRate.data[valuta].Value,
      baseValutaRate: baseValuta === 'RUB' ? null : exchangeRate.data[baseValuta].Value,
    }
  ));

  const b = baseValutaArr.map((valuta) => {
    return (
      <>
        {
          baseValuta === valuta ? 
          <option value={valuta} selected>{valuta}</option>
          :
          <option value={valuta}>{valuta}</option>
        }
      </>
    )
  })
  return (
    <SecondPageStyle>
      <button onClick={toExchanger}>Exchanger</button>
      <span>Base valuta</span><select name="select" onChange={(e) => selectBaseValuta(e)}>
        {b}
      </select>
      <span>Last update date</span>{updateDate}
      {a}
    </SecondPageStyle>
  );
};

export default SecondPage;