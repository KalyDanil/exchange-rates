import { MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

const SelectBaseValuta = (props) => {
  const exchangeRate = useSelector((state) => state.exchangeRate);

  return (
    <Select value={props.baseValuta} onChange={(e) => props.selectBaseValuta(e)}>
      <MenuItem  key={'RUB'} value={'RUB'} >RUB</MenuItem >
      {Object.keys(exchangeRate.data).map((valuta) => 
        <MenuItem  key={valuta} value={valuta} >{valuta}</MenuItem >
      )}
    </Select>
  );
};

SelectBaseValuta.propTypes = {
  baseValuta: PropTypes.string.isRequired,
  selectBaseValuta: PropTypes.func.isRequired,
};

export default SelectBaseValuta;