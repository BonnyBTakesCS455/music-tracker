import React from "react";
import styled from "styled-components";
import { Link } from "wouter";

const Button = styled.button`
  border: none;
  font-weight: bold;
  cursor: pointer;
  background: #1db954;
  padding: 1em;
  color: white;
  width: 100%;
  height: 100px;
  padding-right: 100px;
  transition: background 200ms;
  &:hover {
    background: #1ed760;
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  float: left;
  object-fit: cover;
`;

const Information = styled.div`
  float: right;
  text-align: left;
  margin-left: 1em;
`;

const Name = styled.p`
  font-weight: bold;
  margin: 0.5em 0;
`;

const Song = styled.p`
  line-height: 1.25em;
  font-weight: normal;
  margin: 0.5em 0;
`;

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  render() {
    return (
      <Button>
        <Link
          href={"/friend/" + this.props.spotifyId + "/name/" + this.props.name}
        >
          <FlexBox>
            <Img src={this.props.imgSrc} width={50} height={50} />
            <Information>
              <Name>{this.props.name}</Name>
              <Song>{this.props.song}</Song>
            </Information>
          </FlexBox>
        </Link>
      </Button>
    );
  }
}

export default Friend;
