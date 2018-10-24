/**
 *
 * BaseFilterItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FIRESTORE_QUERY_OPERATORS } from '../../utils/constants';
const selectOptions = () => {
  const kys = Object.keys(FIRESTORE_QUERY_OPERATORS);
  return kys.map(k => (
    <option key={k} value={FIRESTORE_QUERY_OPERATORS[k]}>
      {FIRESTORE_QUERY_OPERATORS[k]}
    </option>
  ));
};
export const selectOperators = (f, onUpdate, state) => (
  <span>
    <select
      onChange={e => {
        /* eslint-disable no-param-reassign */
        f.operator = e.target.value;
        onUpdate(f);
      }}
      value={state.operator}
    >
      {selectOptions()}
    </select>
  </span>
);
/* eslint-disable react/prefer-stateless-function */
const withBaseFilterItem = WrappedComponent => {
  class BaseFilterItem extends React.Component {
    constructor() {
      super();

      this.state = {
        term: null,
        operator: null,
        val: null,
        hasValue: false,
      };
    }
    componentWillMount() {
      const f = this.props.data;
      if (!this.state.hasValue) {
        const { term, operator, val } = f;
        this.setState({ term, operator, val });
      }
    }

    render() {
      return (
        <div>
          <WrappedComponent {...this.state} {...this.props} />
        </div>
      );
    }
  }

  BaseFilterItem.propTypes = {
    data: PropTypes.instanceOf(Object),
    onUpdate: PropTypes.func,
  };
  return BaseFilterItem;
};

export default withBaseFilterItem;
