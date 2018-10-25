/**
 *
 * FilterContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFilterContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  applyFilters,
  addFilter,
  removeFilter,
  resetFilters,
  modifyFilter,
} from './actions';
import FilterItem from '../../components/FilterItem/index';
import makeSelectAdminContainer from '../AdminContainer/selectors';
import { Container, FilterButton } from './styles';

const uuid = require('uuid/v1');
/* eslint-disable react/prefer-stateless-function */
export class FilterContainer extends React.Component {
  constructor() {
    super();
    this.state = { filtering: false };
  }
  handleClose = () => {};
  handleApply = () => {};
  removeFilter(term) {
    const { filterTerms } = this.state;
    let temp = filterTerms;
    temp = filterTerms.filter(t => t !== term);
    this.setState({
      filterTerms: temp,
    });
  }
  render() {
    const { filters } = this.props.filtercontainer;
    return (
      <Container
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <FilterButton
          onClick={e => {
            e.preventDefault();
            this.setState({ filtering: true });
          }}
        >
          <Container
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <FormattedMessage {...messages.header} />
            {filters.length > 0 ? `${filters.length} filters` : null}
          </Container>
        </FilterButton>
        <Dialog open={this.state.filtering}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent>
            <div>
              <button
                onClick={e => {
                  e.preventDefault();
                  this.props.addFilter();
                }}
              >
                Add
              </button>
            </div>
            <ul>
              {filters.map(f => (
                <li key={uuid()}>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      this.props.removeFilter(f, filters);
                    }}
                  >
                    -
                  </button>
                  <FilterItem
                    onUpdate={() => {
                      this.props.modifyFilter(filters);
                    }}
                    data={f}
                  />
                </li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <button
              onClick={e => {
                e.preventDefault();
                this.setState({ filtering: false });
              }}
            >
              Cancel
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                this.props.resetFilters();
                this.setState({ filtering: false });
              }}
            >
              Reset
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                this.setState({ filtering: false });
                const { collectionName } = this.props.adminContainer;
                this.props.applyFilters({ collectionName, filters });
              }}
            >
              Apply
            </button>
          </DialogActions>
        </Dialog>
        {/* {this.props.filterTerms.map(f => (
          <FilterItem key={uuid()} data={f} onRemove={this.removeFilter} />
        ))} */}
      </Container>
    );
  }
}

FilterContainer.propTypes = {
  adminContainer: PropTypes.instanceOf(Object),
  addFilter: PropTypes.func,
  applyFilters: PropTypes.func,
  filtercontainer: PropTypes.instanceOf(Object),
  modifyFilter: PropTypes.func,
  removeFilter: PropTypes.func,
  resetFilters: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  filtercontainer: makeSelectFilterContainer(),
  adminContainer: makeSelectAdminContainer(),
});

const mapDispatchToProps = {
  addFilter,
  resetFilters,
  applyFilters,
  modifyFilter,
  removeFilter,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'filterContainer', reducer });
const withSaga = injectSaga({ key: 'filterContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FilterContainer);
