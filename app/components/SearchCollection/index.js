/**
 *
 * SearchCollection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
const SearchBox = styled.input`
  border: 1px solid #cacaca;
`;
const SearchButton = styled.button``;
function SearchCollection({ onSearch }) {
  let result = null;
  return (
    <div>
      <SearchBox
        type="text"
        onChange={e => {
          result = e.target.value;
          return result;
        }}
      />
      <SearchButton
        onClick={e => {
          e.preventDefault();
          onSearch(result);
        }}
      >
        Search
      </SearchButton>
    </div>
  );
}

SearchCollection.propTypes = { onSearch: PropTypes.func };

export default SearchCollection;
