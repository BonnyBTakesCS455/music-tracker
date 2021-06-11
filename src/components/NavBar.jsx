import React from "react";
import styled from "styled-components";
import home_icon from '../icons/Home_Icon.png';
import home_icon_hovered from '../icons/home_icon_hovered.png';
import insights_icon from '../icons/Home_Icon.png';
import heart_icon from '../icons/Home_Icon.png';
import friends_icon from '../icons/Home_Icon.png';

const Nav = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #FFFFFF;
`;

const StyledListItem = styled.div`
  display: block;
  color: white;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
  float: right;
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-width: 40px;
  max-height: 40px;
`;

function NavBar(props) {
    return (
        <React.Fragment>
            <Nav className="navbar">
                <StyledListItem>
                    <a href=".">
                        <StyledImage
                            src={home_icon}
                            onMouseOver={(e) => e.currentTarget.src = home_icon_hovered}
                            onMouseOut={(e) => e.currentTarget.src = home_icon}/>
                    </a>
                </StyledListItem>
            </Nav>
        </React.Fragment>
    );
}

export default NavBar;