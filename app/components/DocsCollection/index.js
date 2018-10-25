/**
 *
 * DocsCollection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paper, Table, TableHead, TableBody } from '@material-ui/core';
import DocItem from '../DocItem/index';
import CollectionRowHeader from '../CollectionRowHeader';
const Container = styled(Paper)`
  width: fit-content;
`;

function DocsCollection({ data }) {
  return (
    <Container>
      <Table>
        <TableHead>
          <CollectionRowHeader data={data} />
        </TableHead>
        <TableBody>
          {data.map(doc => <DocItem key={doc.ref.id} data={doc} />)}
        </TableBody>
      </Table>
    </Container>
  );
}

DocsCollection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};

export default DocsCollection;
