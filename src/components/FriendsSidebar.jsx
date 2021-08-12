import React from "react";
import styled from "styled-components";
import SlidingPane from "react-sliding-pane";
import "../css/SldiingPane.css";
import FriendsIcon from "../icons/Friends_Filled_WHITE.png";
import Friend from "./Friend";
import FriendRequest from "./FriendRequest";
import FriendsSearchBar from "./FriendsSearchBar";
import { pullFriendRequests, pullFriends } from "../services";
import { connect } from "react-redux";

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

const SidebarTitle = styled.div`
  color: white;
  font-weight: bold;
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
    this.state = {
      show: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => {
      return { show: !prevState.show };
    });
    pullFriends(this.props.spotifyId);
    pullFriendRequests(this.props.spotifyId);
  }

  render() {
    return (
      <React.Fragment>
        <StickySidebar onClick={this.handleClick}>
          <StyledImage src={FriendsIcon} />
        </StickySidebar>
        <SlidingPane
          className={"Pane"}
          overlayClassName={"Pane"}
          isOpen={this.state.show}
          onRequestClose={() => {
            this.setState({ show: false });
          }}
          from={"left"}
          width={"400px"}
          title={<SidebarTitle>Top Tracks</SidebarTitle>}
        >
          {this.props.friendRequests.map((friendRequest) => (
            <FriendRequest
              spotifyId={this.props.spotifyId}
              friendSpotifyId={friendRequest.spotifyId}
              imgSrc={friendRequest.imgSrc}
              name={friendRequest.name}
            />
          ))}
          {this.props.friends.map((friend) => (
            <Friend
              key={friend.spotifyId}
              imgSrc={friend.imgSrc}
              name={friend.name}
              song={friend.topTrack}
              spotifyId={friend.spotifyId}
            />
          ))}
          <FriendsSearchBar spotifyId={this.props.spotifyId} />
        </SlidingPane>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    friends: state.userSettings.friends,
    friendRequests: state.userSettings.friendRequests,
  };
}

export default connect(mapStateToProps, null)(FriendsSidebar);
