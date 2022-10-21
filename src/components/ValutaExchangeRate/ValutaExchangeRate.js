import PropTypes from 'prop-types'
import { ValutaExchangeRateStyle } from './ValutaExchangeRate.style';
import nullable from 'prop-types-nullable';

const ValutaExchangeRate = (props) => {
  return (
    <ValutaExchangeRateStyle>
      {
        props.baseValuta === "RUB" ? 
        <span>1 {props.valuta} = {props.rate} {props.baseValuta}</span>
        :
        <span>1 {props.valuta} = {(props.rate / props.baseValutaRate).toFixed(4)} {props.baseValuta}</span>
      }
      
    </ValutaExchangeRateStyle>
  );
};

ValutaExchangeRate.propTypes = {
  valuta: PropTypes.string.isRequired,
  baseValuta: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  baseValutaRate: nullable(PropTypes.number).isRequired,
};

export default ValutaExchangeRate;