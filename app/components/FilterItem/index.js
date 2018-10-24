/**
 *
 * FilterItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { firestore } from 'firebase';
import FilterInputItem from './FilterInputItem';
import DocRefFilterItem from './DocRefFilterItem';
import DateFilterItem from './DateFilterItem';

/* eslint-disable react/prefer-stateless-function */
class FilterItem extends React.Component {
  filterTermType(f) {
    switch (f.type) {
      case String:
        return <FilterInputItem data={f} onUpdate={this.props.onUpdate} />;
      case Date:
        return <DateFilterItem data={f} onUpdate={this.props.onUpdate} />;
      case firestore.DocumentReference:
        return <DocRefFilterItem data={f} />;
      default:
        break;
    }
    return <div>Unsupported Filter Type</div>;
  }
  render() {
    const f = this.props.data;
    // let { term, operator, val } = this.state;
    return (
      <div>
        <span>{this.filterTermType(f)}</span>
      </div>
    );
  }
}

FilterItem.propTypes = {
  data: PropTypes.instanceOf(Object),
  onUpdate: PropTypes.func,
};

export default FilterItem;
