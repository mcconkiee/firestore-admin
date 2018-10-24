/**
 *
 * DocsCollection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, CardActionArea, CardContent } from '@material-ui/core';
import DocItem from '../DocItem/index';
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const DocCard = styled(Card)`
  padding: 10px;
  overflow: inherit !important;
  width: 275px;
  margin: 0 10px 10px 0;
`;
const DocCardContent = styled(CardContent)``;

function DocsCollection({ data }) {
  return (
    <Container>
      {data.map(doc => (
        <DocCard key={doc.ref.id}>
          <CardActionArea
            onClick={e => {
              e.preventDefault();
              console.log(doc);
            }}
          >
            {doc.ref.path}
          </CardActionArea>
          <DocCardContent>
            <DocItem data={doc} />
          </DocCardContent>
        </DocCard>
      ))}
    </Container>
  );
}

DocsCollection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};

export default DocsCollection;
