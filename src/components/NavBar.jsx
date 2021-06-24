import React from 'react';
import styled from 'styled-components';
import { Link } from 'wouter';
import home_icon from '../icons/Home_Icon.png';
import home_icon_hovered from '../icons/home_icon_hovered.png';
import insights_icon from '../icons/insight_icon.png';
import insights_icon_hovered from '../icons/insight_icon_hovered.png';
import heart_icon from '../icons/heart_icon.png';
import heart_icon_hovered from '../icons/heart_icon_hovered.png';
import profile_icon from '../icons/profile_icon.png';
import profile_icon_hovered from '../icons/profile_icon_hovered.png';

const Nav = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #ffffff;
`;

const StyledListItem = styled.div`
  display: block;
  color: white;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
  float: right;
  position: relative;
  color: white;
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-width: 40px;
  max-height: 40px;
`;

const ProfileText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #1db954;
`;

function NavBar(props) {
  return (
    <React.Fragment>
      <Nav className='navbar'>
        <StyledListItem>
          <Link
            href='/profile'
            onMouseOver={(e) =>
              (e.currentTarget.children.item(1).src = profile_icon_hovered)
            }
            onMouseOut={(e) => {
              e.currentTarget.children.item(1).src = profile_icon;
            }}
          >
            <ProfileText>
              <h2>B</h2>
            </ProfileText>
            <StyledImage src={profile_icon} />
          </Link>
        </StyledListItem>
        <StyledListItem>
          <Link href='/fav'>
            <StyledImage
              src={heart_icon}
              onMouseOver={(e) => (e.currentTarget.src = heart_icon_hovered)}
              onMouseOut={(e) => (e.currentTarget.src = heart_icon)}
            />
          </Link>
        </StyledListItem>
        <StyledListItem>
          <Link href='/graph'>
            <StyledImage
              src={insights_icon}
              onMouseOver={(e) => (e.currentTarget.src = insights_icon_hovered)}
              onMouseOut={(e) => (e.currentTarget.src = insights_icon)}
            />
          </Link>
        </StyledListItem>
        <StyledListItem>
          <Link href='/'>
            <StyledImage
              src={home_icon}
              onMouseOver={(e) => (e.currentTarget.src = home_icon_hovered)}
              onMouseOut={(e) => (e.currentTarget.src = home_icon)}
            />
          </Link>
        </StyledListItem>
        <StyledListItem>
          <Link href='/settings'>
            <StyledImage
              src={home_icon}
              onMouseOver={(e) => (e.currentTarget.src = home_icon_hovered)}
              onMouseOut={(e) => (e.currentTarget.src = home_icon)}
            />
          </Link>
        </StyledListItem>
      </Nav>
    </React.Fragment>
  );
}

export default NavBar;
