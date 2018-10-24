/**
 *
 * ReferenceDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Paper, CardMedia, CardContent, Typography } from '@material-ui/core';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { findDoc } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { RefCard } from './styles';
/* eslint-disable react/prefer-stateless-function */
const styles = {
  card: {
    maxWidth: 120,
  },
};

export class ReferenceDetails extends React.Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);

    this.props.findDoc(values.path);
  }
  docDetails() {
    const { doc } = this.props.referenceDetails;
    const data = doc.data();
    return (
      <RefCard>
        <Paper>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={styles.media}
            height="140"
            image={data.photo ? data.photo : null}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {data.displayName}
            </Typography>
            <Typography>{data.phone}</Typography>
            <Typography>{data.email}</Typography>
            <Typography component="p" />
          </CardContent>
        </Paper>
      </RefCard>
    );
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>ReferenceDetails</title>
          <meta name="description" content="Description of ReferenceDetails" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        {this.props.referenceDetails.doc ? this.docDetails() : null}
      </div>
    );
  }
}

ReferenceDetails.propTypes = {
  location: PropTypes.instanceOf(Object),
  referenceDetails: PropTypes.instanceOf(Object),
  findDoc: PropTypes.func,
};
const mapStateToProps = state => ({
  referenceDetails: state.get('referenceDetails'),
});

const mapDispatchToProps = { findDoc };

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'referenceDetails', reducer });
const withSaga = injectSaga({ key: 'referenceDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReferenceDetails);
