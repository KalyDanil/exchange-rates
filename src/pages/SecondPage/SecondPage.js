import { useSelector, useDispatch } from 'react-redux';
import { SecondPageStyle } from './SecondPage.style';
import { useEffect } from 'react';
import { getExchangeRateReq } from '../../api';
import ValutaExchangeRate from '../../components/ValutaExchangeRate/ValutaExchangeRate';
import { getBaseValutaAction, getExchangeRateAction } from '../../store/slice';
import SelectBaseValuta from '../../components/SelectBaseValuta/SelectBaseValuta';
import { Button, Table, TableBody } from '@material-ui/core';

const SecondPage = () => {
  const exchangeRate = useSelector((state) => state.exchangeRate);
  const dispatch = useDispatch();
  const baseValuta = exchangeRate.baseValuta;
  const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', };
  const updateDate = new Date(exchangeRate.updateDate).toLocaleDateString([], options);

  useEffect(() => {
    const getResponse = async () => {
      const res = await getExchangeRateReq();
      dispatch(getExchangeRateAction(res));
    };
    getResponse();
    switch(window.navigator.language) {
      case 'ru-RU':
        dispatch(getBaseValutaAction('RUB'));
        break;
      case 'en-US': 
        dispatch(getBaseValutaAction('USD'));
        break;
      default:
        break;
    }
  }, [dispatch]);

  const selectBaseValuta = (e) => {
    dispatch(getBaseValutaAction(e.target.value));
  };

  const toExchanger =() => {
    window.location.href = '/exchanger';
  };
 
  const exchangeRateList = Object.keys(exchangeRate.data).map((valuta) => 
    <ValutaExchangeRate
      key={valuta}
      valuta={valuta}
      baseValuta={baseValuta}
      rate={exchangeRate.data[valuta].Value}
      baseValutaRate={baseValuta === 'RUB' ? null : exchangeRate.data[baseValuta].Value}
    />
  );

  if (!baseValuta) {
    return <div></div>
  }

  return (
    <SecondPageStyle>
      <div className="topLineDiv">
        <span>Last exchange rate update date: {updateDate}</span>
        <Button variant="contained" onClick={toExchanger}>Exchanger</Button>
      </div>
      <div className="baseValutaDiv">
        <span>Base valuta: </span>
        <SelectBaseValuta baseValuta={baseValuta} selectBaseValuta={selectBaseValuta} />
      </div>
      <Table className="exchangeRateTable">
        <TableBody>
          {baseValuta !== 'RUB' 
          && <ValutaExchangeRate
                valuta={'RUB'}
                baseValuta={baseValuta}
                rate={exchangeRate.data[baseValuta] ? +(1 / exchangeRate.data[baseValuta].Value).toFixed(4) : 0}
                baseValutaRate={null}
              />
          }
          {exchangeRateList}
        </TableBody>
      </Table>
    </SecondPageStyle>
  );
};

export default SecondPage;