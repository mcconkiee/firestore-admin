/**
 *
 * DocItem
 *
 */

import React from 'react';
import firebase from 'firebase';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isBoolean } from 'util';
import { TableCell, TableRow } from '@material-ui/core';
import { Anchor, NestObject } from './styles';
import makeSelectAdminContainer from '../../containers/AdminContainer/selectors';
import { FilterButton } from '../../containers/FilterContainer/styles';
import {
  applyCurrentFilters,
  addDocRefFilter,
  addFilter,
} from '../../containers/FilterContainer/actions';

const uuidv1 = require('uuid/v1');

const primitiveValue = val =>
  typeof val === 'string' || typeof val === 'number';

const destuct = (docSnap, ky, props) => {
  const obj = docSnap[ky];
  if (!obj) return '';
  if (primitiveValue(obj))
    return (
      <FilterButton
        onClick={e => {
          e.preventDefault();
          props.addFilter(String, ky, obj);
          props.applyCurrentFilters();
        }}
      >
        {obj}
      </FilterButton>
    );
  if (isBoolean(obj)) {
    return (
      <FilterButton
        onClick={e => {
          e.preventDefault();
          props.addFilter(Boolean, ky, obj);
          props.applyCurrentFilters();
        }}
      >
        {obj === false ? 'false' : 'true'}
      </FilterButton>
    );
  }

  if (obj instanceof firebase.firestore.Timestamp) {
    const momentDate = moment(obj.seconds * 1000);
    const formatDate = momentDate.format('MMM DD , YYYY HH:mm:ss');
    return (
      <FilterButton
        onClick={e => {
          e.preventDefault();
          props.addFilter(Date, ky, momentDate.toDate());
          props.applyCurrentFilters();
        }}
      >
        {formatDate}
      </FilterButton>
    );
    // return moment(obj.seconds * 1000).format('MMM DD , YYYY HH:mm:ss');
  }
  if (obj instanceof firebase.firestore.DocumentReference) {
    return (
      <div>
        <Anchor href={`/reference?path=${obj.path}`}>{obj.path}</Anchor>;
        <FilterButton
          onClick={e => {
            e.preventDefault();
            props.addDocRefFilter(obj, ky);
            props.applyCurrentFilters();
          }}
        >
          find all {props.adminContainer.collectionName}
        </FilterButton>
      </div>
    );
  }

  if (obj instanceof Object) {
    // return <div>{destuct(obj)}</div>;
    const keys = Object.keys(obj);
    return (
      <NestObject>
        {keys.map(k => (
          <div key={uuidv1()}>
            <h5>{k}</h5>
            <span>{destuct(obj, k, props)}</span>
          </div>
        ))}
      </NestObject>
    );
  }
  return 'null';
};
function DocItem(props) {
  const { data } = props;
  const docSnap = data.data();

  const keys = Object.keys(docSnap);

  return (
    <TableRow>
      <TableCell>{data.ref.id}</TableCell>
      {keys.map(ky => (
        <TableCell key={uuidv1()}>
          <h3>{ky}</h3>
          {destuct(docSnap, ky, props)}
        </TableCell>
      ))}
    </TableRow>
  );
}

DocItem.propTypes = {
  data: PropTypes.instanceOf(Object),
};
const mapStateToProps = createStructuredSelector({
  adminContainer: makeSelectAdminContainer(),
});
const mapDispatchToProps = { addFilter, addDocRefFilter, applyCurrentFilters };

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default withConnect(DocItem);
