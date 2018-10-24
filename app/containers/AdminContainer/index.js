/**
 *
 * AdminContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import { firestoreFind, firestoreFindWithQuery } from './actions';
import makeSelectAdminContainer from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import SearchCollection from '../../components/SearchCollection/index';
import DocsCollection from '../../components/DocsCollection/index';

import FilterContainer from '../FilterContainer/index';
import makeSelectFilterContainer from '../FilterContainer/selectors';

/* eslint-disable react/prefer-stateless-function */
export class AdminContainer extends React.Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    console.log(values);
  }
  applyFilter = () => {
    this.props.firestoreFindWithQuery(
      this.props.filterContainer.filters,
      this.props.adminContainer.collectionName,
    );
  };
  filterResults() {
    const { docs } = this.props.filterContainer;
    return (
      <div>
        {docs ? (
          <div>
            <div>Filtered results ({docs.length})</div>
            <DocsCollection data={docs} />
          </div>
        ) : null}
      </div>
    );
  }
  defaultUI() {
    const { docs } = this.props.adminContainer;
    return <div>{docs ? <DocsCollection data={docs} /> : null}</div>;
  }
  render() {
    const { docs } = this.props.filterContainer;
    const actualDocs = this.props.adminContainer.docs;
    return (
      <div>
        <Helmet>
          <title>AdminContainer</title>
          <meta name="description" content="Description of AdminContainer" />
        </Helmet>
        <FormattedMessage {...messages.header} />

        <div>
          <h1>Find a collection</h1>
          <SearchCollection
            onSearch={term => {
              this.props.firestoreFind(term);
            }}
          />
        </div>
        <div>{actualDocs ? `${actualDocs.length} Documents` : null} </div>
        <div>
          <FilterContainer />
        </div>
        {docs ? this.filterResults() : this.defaultUI()}
      </div>
    );
  }
}

AdminContainer.propTypes = {
  adminContainer: PropTypes.instanceOf(Object),
  firestoreFind: PropTypes.func.isRequired,
  firestoreFindWithQuery: PropTypes.func.isRequired,
  filterContainer: PropTypes.instanceOf(Object),
  location: PropTypes.instanceOf(Object),
};

// const mapStateToProps = state => ({
//   adminContainer: state.get('adminContainer'),
// });
const mapStateToProps = createStructuredSelector({
  filterContainer: makeSelectFilterContainer(),
  adminContainer: makeSelectAdminContainer(),
});

const mapDispatchToProps = {
  firestoreFind,
  firestoreFindWithQuery,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminContainer', reducer });
const withSaga = injectSaga({ key: 'adminContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminContainer);
