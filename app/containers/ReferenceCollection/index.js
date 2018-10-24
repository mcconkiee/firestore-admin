/**
 *
 * ReferenceCollection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectReferenceCollection from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import makeSelectAdminContainer from '../AdminContainer/selectors';

/* eslint-disable react/prefer-stateless-function */
export class ReferenceCollection extends React.Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    console.log(values);
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>ReferenceCollection</title>
          <meta
            name="description"
            content="Description of ReferenceCollection"
          />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div>todo: get the context from admin of the colleciton term</div>
      </div>
    );
  }
}

ReferenceCollection.propTypes = {
  location: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  referencecollection: makeSelectReferenceCollection(),
  adminContainer: makeSelectAdminContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'referenceCollection', reducer });
const withSaga = injectSaga({ key: 'referenceCollection', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReferenceCollection);
