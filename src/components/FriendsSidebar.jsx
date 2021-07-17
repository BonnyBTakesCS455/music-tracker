import React from 'react';
import styled from 'styled-components';
import SlidingPane from 'react-sliding-pane';
import '../css/SldiingPane.css';
import FriendsIcon from '../icons/Friends_Filled_WHITE.png';
import Friend from './Friend';
import FriendsSearchBar from './FriendsSearchBar';

const StickySidebar = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #1db954;
  border: 2px solid #1db954;
  padding: 4px 4px;
  width: 50px;
  border-radius: 0px 25px 25px 0px;
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-width: 40px;
  max-height: 40px;
`;

class FriendsSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => {
      return { show: !prevState.show };
    });
  }

  render() {
    return (
      <React.Fragment>
        <StickySidebar onClick={this.handleClick}>
          <StyledImage src={FriendsIcon} />
        </StickySidebar>
        <SlidingPane
          className={'Pane'}
          overlayClassName={'Pane'}
          isOpen={this.state.show}
          onRequestClose={() => {
            this.setState({ show: false });
          }}
          from={'left'}
          width={'400px'}
          title={'Currently Listening'}
        >
          <Friend />
          <FriendsSearchBar />
        </SlidingPane>
      </React.Fragment>
    );
  }
}

export default FriendsSidebar;
