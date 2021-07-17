import styled from 'styled-components';
import React from 'react';

const StyledSearchBar = styled.div`
  position: absolute;
  bottom: 1em;
  margin-top: 1em;
  padding: 1em;
`;

const StyledInput = styled.input`
  margin-right: 1em;
`;

class FriendsSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleClick = () => {
    console.log(this.state.input);
  };

  render() {
    return (
      <StyledSearchBar>
        <StyledInput
          type='text'
          id='header-search'
          placeholder='Add friend by Spotify ID'
          onChange={this.handleChange}
        />
        <button type='submit' onClick={this.handleClick}>
          Add friend
        </button>
      </StyledSearchBar>
    );
  }
}

export default FriendsSearchBar;
