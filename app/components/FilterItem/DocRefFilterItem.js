/**
 *
 * DocRefFilterItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withBaseFilterItem from './BaseFilterItem';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class DocRefFilterItem extends React.Component {
  render() {
    const f = this.props.data;

    return (
      <div>
        <span>
          {f.term} == {f.val.path}
        </span>
      </div>
    );
  }
}

DocRefFilterItem.propTypes = {
  data: PropTypes.instanceOf(Object),
};

export default withBaseFilterItem(DocRefFilterItem);
