import styled from "styled-components";
import React from "react";
import { pullFriendRequests, pullFriends } from "../services";

const OutsideBox = styled.div`
  font-weight: bold;
  background: #262626;
  padding: 1em;
  color: white;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const Information = styled.div`
  width: 100%;
  float: right;
  text-align: left;
  margin-left: 1em;
`;

const Img = styled.img`
  float: left;
  object-fit: cover;
`;

const Text = styled.p`
  font-weight: normal;
  margin: 0.5em 0;
`;

const Name = styled.p`
  font-weight: bold;
  margin: 0.5em 0;
`;

const Accept = styled.button`
  font-weight: bold;
  background: #1db954;
  cursor: pointer;
  float: left;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.25em 0.75em;
  &:hover {
    background-color: #3fe87a;
  }
`;

const Deny = styled.button`
  margin-left: 1em;
  font-weight: bold;
  background: #9e1a1a;
  cursor: pointer;
  float: left;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.25em 0.75em;
  &:hover {
    background-color: #d64040;
  }
`;

class FriendRequest extends React.Component {
  handleAcceptClick = async () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        friendId: this.props.friendSpotifyId,
      }),
    };
    await fetch(`/friend/${this.props.spotifyId}`, requestOptions);
    pullFriends(this.props.spotifyId);
    pullFriendRequests(this.props.spotifyId);
  };

  handleDenyClick = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        friendId: this.props.friendSpotifyId,
      }),
    };
    await fetch(`/friend/request/${this.props.spotifyId}`, requestOptions);
    pullFriends(this.props.spotifyId);
    pullFriendRequests(this.props.spotifyId);
  };

  render() {
    return (
      <OutsideBox>
        <FlexBox>
          <Img src={this.props.imgSrc} width={50} height={50} />
          <Information>
            <Text>Incoming friend request from</Text>
            <Name>{this.props.name}</Name>
            <Accept type={"button"} onClick={this.handleAcceptClick}>
              Accept
            </Accept>
            <Deny type={"button"} onClick={this.handleDenyClick}>
              Deny
            </Deny>
          </Information>
        </FlexBox>
      </OutsideBox>
    );
  }
}

export default FriendRequest;
