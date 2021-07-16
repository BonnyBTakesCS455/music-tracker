import React from 'react';
import styled from 'styled-components';
import ian from "../icons/ianmah.jpg";

const Button = styled.button`
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: #1DB954;
    padding: 1em;
    color: white;
    min-width: 100px;
    padding-right: 100px;
    transition: background 200ms;
    &:hover {
        background: #1ED760;
    }
`;

const Img = styled.img`
  position: relative;
  padding: 16px 16px;
  float: left;
`;

const Information = styled.div`;
  float: right;
  text-align: left;
`;

const Name = styled.div`;
  font-weight: bold;
  margin-top: 25px ;
`;

const Song = styled.div`;
  font-weight: normal;
  margin-top: 5px ;
`;

class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state;
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Button type={"button"} onClick={this.props.onClick}>
                        <Img src={ian} width={50} height={50} />
                        <Information>
                            <Name>Ian Mah</Name>
                            <Song>Yu-Gi-Oh Soundtrack</Song>
                        </Information>
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}

export default Friend;