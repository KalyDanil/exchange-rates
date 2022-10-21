import styled from 'styled-components';

export const SecondPageStyle = styled.div`
display: flex;
flex-direction: column;
align-items: center;

.topLineDiv {
  display: flex;
  width: 90%;
  justify-content: space-between;
}

.baseValutaDiv {
  width: 90%;
  margin-left: 0;
}

.exchangeRateTable {
  width: 25%;
  .MuiTableCell-root {
    text-align: center;
    border-left: 1px solid rgba(224, 224, 224, 1);
    border-right: 1px solid rgba(224, 224, 224, 1);
  }
}
`;