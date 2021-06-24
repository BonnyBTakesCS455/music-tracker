import React from 'react';
import styled from 'styled-components';
import FriendsSidebarPopout from './FriendsSidebarPopout';

// TODO: Add interaction and potential inner

const StickySidebar = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: #1db954;
    border: 2px solid #1db954;
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
        this.state = {show: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState) => {
            return {show: !prevState.show }
        });
    }

    render() {
        return (
            <React.Fragment>
                {
                    !this.state.show &&
                    <StickySidebar onClick={this.handleClick}>
                        <StyledImage
                            src={"https://i.pinimg.com/originals/d5/8b/03/d58b031567988c90642c40d94f680802.png"}/>
                    </ StickySidebar>
                }
                {this.state.show && <FriendsSidebarPopout show={this.state.show} onClick={() => this.handleClick()}/>}
            </React.Fragment>
        );
    }
}

export default FriendsSidebar;
