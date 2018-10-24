/**
 *
 * DateFilterItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import moment from 'moment';
import withBaseFilterItem, { selectOperators } from './BaseFilterItem';

// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class DateFilterItem extends React.Component {
  constructor() {
    super();

    this.state = {
      term: null,
      operator: null,
      val: null,
      time: '12:00', // noon
      hasValue: false,
    };
  }
  componentWillMount() {
    if (!this.state.hasValue) {
      const { term, operator, val } = this.props;
      this.setState({ term, operator, val });
    }
  }
  render() {
    const f = this.props.data;
    return (
      <div>
        <span>
          <TextField
            type="text"
            placeholder="createdOn"
            onChange={e => {
              const term = e.target.value;
              f.term = term;
              this.setState({ term });
              // term = val;
            }}
            onBlur={() => {
              this.props.onUpdate(f);
            }}
            value={this.state.term || this.props.term}
          />
        </span>
        <span>{selectOperators(f, this.props.onUpdate, this.state)}</span>
        <span>
          <TextField
            onChange={e => {
              const val = e.target.value;
              f.val = moment(val).toDate();
              console.log(f.val);
              this.setState({ val });
            }}
            onBlur={() => {
              this.props.onUpdate(f);
            }}
            type="datetime-local"
            defaultValue={moment(this.state.val).format('YYYY-MM-DDThh:mm')}
            // value={this.state.val || ''}
          />
        </span>
      </div>
    );
  }
}

DateFilterItem.propTypes = {
  data: PropTypes.instanceOf(Object),
  onUpdate: PropTypes.func,
  term: PropTypes.string,
  operator: PropTypes.string,
  val: PropTypes.instanceOf(Date),
};

export default withBaseFilterItem(DateFilterItem);
