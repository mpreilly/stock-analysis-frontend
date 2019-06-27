import React from 'react'

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            sentimentPct: -1,
            technicalPct: -1
        };
    }

    render() {
        if (this.state.symbol === '') {
            return (
                <p>search bar goes here</p>
            )
        } else if (this.state.sentimentPct === -1) {
            return (
                <p>percentage picking bar goes here</p>
            )
        } else {
            return (
                <p>graph and stuff goes here</p>
            )
        }
    }
}

export default MainScreen;