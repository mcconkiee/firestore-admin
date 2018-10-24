/**
 *
 * DataComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDataComponent from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class DataComponent extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>DataComponent</title>
          <meta name="description" content="Description of DataComponent" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <button
          onClick={e => {
            e.preventDefault();
            console.log(this);
          }}
        >
          test
        </button>
      </div>
    );
  }
}

DataComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  datacomponent: makeSelectDataComponent(),
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

const withReducer = injectReducer({ key: 'dataComponent', reducer });
const withSaga = injectSaga({ key: 'dataComponent', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DataComponent);
