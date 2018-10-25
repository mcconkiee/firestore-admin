import styled from 'styled-components';
import { Card, CardActionArea, CardContent } from '@material-ui/core';
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const DocCard = styled(Card)`
  padding: 10px;
  overflow: inherit !important;
  width: 275px;
  margin: 0 10px 10px 0;
`;
export const DocCardContent = styled(CardContent)``;
