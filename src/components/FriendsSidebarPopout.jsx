import React from 'react';
import styled from 'styled-components';

class FriendsSidebarPopout extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state;
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <button type={"button"} onClick={this.props.onClick}>Close Friend Pop-out</button>
                </div>
            </React.Fragment>
        )
    }
}

export default FriendsSidebarPopout;