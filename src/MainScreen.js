import React from 'react'
import './MainScreen.css'

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbolInput: '',
            symbol: '',
            sentimentPct: -1,
            technicalPct: -1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ symbolInput: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState(prevState => ({ symbol: prevState.symbolInput }))
    }

    data = [ {key: "BLK", value: "Blackrock"}, {key: "MSFT", value: "Microsoft"} ]

    render() {
        if (this.state.symbol === '') {
            return (
                // <p>search bar goes here</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Choose the stock symbol you are interested in:<br/>
                        <input value={this.state.symbolInput} onChange={this.handleChange} type="text" />
                    </label>
                    <input id="select" type="submit" value="Select"/>
                </form>
                
            )
        } else if (this.state.sentimentPct === -1) {
            return (
                <div>
                    <p>percentage picking bar goes here</p>
                    <label for="customRange2">Example range</label>
                    
                    <form>
                        <label>Sentiment</label>
                        <input type="range" class="custom-range" min="0" max="100" step="5" id="customRange"></input>
                        <label>Technical</label>
                    </form>
                    
                </div>
                
            )
        } else {
            return (
                <p>graph and stuff goes here</p>
            )
        }
    }
}

export default MainScreen;