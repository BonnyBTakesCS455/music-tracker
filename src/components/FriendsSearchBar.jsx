import styled from 'styled-components';
import React from 'react';
import { pullFriends } from '../services';

const StyledSearchBar = styled.div`
  position: absolute;
  bottom: 1em;
  margin-top: 1em;
  padding: 1em;
`;

const StyledInput = styled.input`
  margin-right: 1em;
`;

const DEFAULT_PLACEHOLDER = 'Add friend by Spotify ID';
const NOT_FOUND_PLACEHOLDER = 'No user found! :(';
const ADDED_PLACEHOLDER = 'Added!';

class FriendsSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '', placeholder: DEFAULT_PLACEHOLDER };
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleClick = async () => {
    if (!this.props.spotifyId) return;
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        friendId: this.state.input
      }),
    };
    console.log('this is my spotifyid ' + this.props.spotifyId);
    const response = await fetch(`/friend/${this.props.spotifyId}`, requestOptions);
    if (response.status === 200) {
      this.setState({ input: '', placeholder: ADDED_PLACEHOLDER });
      pullFriends(this.props.spotifyId);
    } else {
      this.setState({ input: '', placeholder: NOT_FOUND_PLACEHOLDER });
    }
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.handleClick();
  }

  render() {
    return (
      <StyledSearchBar>
        <form onSubmit={this.onFormSubmit}>
          <StyledInput
            type='text'
            id='header-search'
            placeholder={this.state.placeholder}
            onChange={this.handleChange}
            value={this.state.input}
          />
          <button type='submit'>
            Add friend
          </button>
        </form>
      </StyledSearchBar>
    );
  }
}

export default FriendsSearchBar;
