/**
 *
 * CollectionRowHeader
 *
 */

import React from 'react';
import _ from 'lodash';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { TableRow, TableCell } from '@material-ui/core';
import uuid from 'uuid/v1';

function CollectionRowHeader({ data }) {
  const uniqs = data.map(d => Object.keys(d.data()));
  const terms = _.uniq(_.flatten(uniqs));
  return (
    <TableRow>
      {terms.map(u => <TableCell key={uuid()}>{u}</TableCell>)}
    </TableRow>
  );
}

CollectionRowHeader.propTypes = {};

export default CollectionRowHeader;
