/**
 *
 * KeysFilter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const KeyBox = styled.a`
  padding: 10px;
  margin-right: 10px;
  font-weight: 400;
  font-size: 20px;
`;
const uuidv1 = require('uuid/v1');
function KeysFilter({ data, onFilter = () => {} }) {
  if (data) {
    return (
      <Container>
        {data.map(k => (
          <div key={uuidv1()}>
            <KeyBox
              onClick={e => {
                e.preventDefault();
                onFilter(k);
              }}
            >
              {k}
            </KeyBox>
          </div>
        ))}
      </Container>
    );
  }
  return <div />;
}

KeysFilter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  onFilter: PropTypes.func,
};

export default KeysFilter;
