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
import { Anchor, NestObject } from './styles';
import makeSelectAdminContainer from '../../containers/AdminContainer/selectors';
import { FilterButton } from '../../containers/FilterContainer/styles';
import {
  applyFilters,
  addDocRefFilter,
  addFilter,
} from '../../containers/FilterContainer/actions';

const uuidv1 = require('uuid/v1');

const primitiveValue = val =>
  typeof val === 'string' || typeof val === 'number';

const destuct = (docSnap, ky, props) => {
  const obj = docSnap[ky];
  if (!obj) return '';
  if (primitiveValue(obj)) return obj;
  if (isBoolean(obj)) {
    return obj === false ? 'false' : 'true';
  }

  if (obj instanceof firebase.firestore.Timestamp) {
    const momentDate = moment(obj.seconds * 1000);
    const formatDate = momentDate.format('MMM DD , YYYY HH:mm:ss');
    return (
      <FilterButton
        onClick={e => {
          e.preventDefault();
          props.addFilter(Date, ky, momentDate.toDate());
          props.applyFilters();
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
            props.applyFilters();
          }}
        >
          find all {props.adminContainer.collectionName}
        </FilterButton>
      </div>
    );
  }

  if (obj instanceof Object) {
    const keys = Object.keys(obj);
    return (
      <NestObject>
        {keys.map(k => (
          <div key={uuidv1()}>
            <h5>{k}</h5>
            <span>{obj[k]}</span>
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
    <div>
      {keys.map(ky => (
        <div key={uuidv1()}>
          <h3>{ky}</h3>
          {destuct(docSnap, ky, props)}
        </div>
      ))}
    </div>
  );
}

DocItem.propTypes = {
  data: PropTypes.instanceOf(Object),
};
const mapStateToProps = createStructuredSelector({
  adminContainer: makeSelectAdminContainer(),
});
const mapDispatchToProps = { addFilter, addDocRefFilter, applyFilters };

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default withConnect(DocItem);
