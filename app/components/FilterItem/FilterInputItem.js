/**
 *
 * FilterInputItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import withBaseFilterItem, { selectOperators } from './BaseFilterItem';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class FilterInputItem extends React.Component {
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
            placeholder="user.firstName"
            onChange={e => {
              const term = e.target.value;
              f.term = term;
              this.setState({ term });
              // term = val;
            }}
            onBlur={() => {
              this.props.onUpdate(f);
            }}
            value={this.state.term || ''}
          />
        </span>
        <span>{selectOperators(f, this.props.onUpdate, this.state)}</span>
        {this.props.selectableOptions ? (
          <span>
            <select
              onChange={e => {
                e.preventDefault();
                const val = e.target.value;
                f.val = val;
                this.props.onUpdate(f);
              }}
            >
              {this.props.selectableOptions.map(o => (
                <option value={o.val}>{o.label}</option>
              ))}
            </select>
          </span>
        ) : (
          <span>
            <TextField
              onChange={e => {
                const val = e.target.value;
                f.val = val;
                this.setState({ val });
              }}
              onBlur={() => {
                this.props.onUpdate(f);
              }}
              type="text"
              placeholder="value"
              value={this.state.val || ''}
            />
          </span>
        )}
      </div>
    );
  }
}

FilterInputItem.propTypes = {
  data: PropTypes.instanceOf(Object),
  onUpdate: PropTypes.func,
  term: PropTypes.string,
  operator: PropTypes.string,
  selectableOptions: PropTypes.arrayOf(PropTypes.any),
  val: PropTypes.string,
};

export default withBaseFilterItem(FilterInputItem);
