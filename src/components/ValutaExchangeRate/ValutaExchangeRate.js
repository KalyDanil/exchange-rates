import PropTypes from 'prop-types'
import nullable from 'prop-types-nullable';
import { TableCell, TableRow } from '@material-ui/core';

const ValutaExchangeRate = (props) => {
  return (
    <TableRow>
      {
        props.baseValutaRate === null
        ? <TableCell>1 {props.valuta} = {props.rate} {props.baseValuta}</TableCell>
        : props.baseValuta !== props.valuta && <TableCell> 1 {props.valuta} = {(props.rate / props.baseValutaRate).toFixed(4)} {props.baseValuta}</TableCell>
      }
    </TableRow>
  );
};

ValutaExchangeRate.propTypes = {
  valuta: PropTypes.string.isRequired,
  baseValuta: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  baseValutaRate: nullable(PropTypes.number).isRequired,
};

export default ValutaExchangeRate;