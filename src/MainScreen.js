import React from 'react'
import './MainScreen.css'
import ResultsPage from './components/ResultsPage'

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbolInput: '',
            symbol: '',
            sentimentPct: -1,
            technicalPct: -1,
            listdata: [ {key: "BLK", value: "Blackrock"}, {key: "MSFT", value: "Microsoft"} ]
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

    render() {
        if (this.state.symbol === '') {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>Choose the stock symbol you are interested in:<br/>
                    <select style={{width:200}} onChange={this.handleChange}>
                        <option selected="selected"></option>
                        {this.state.listdata.map(dataTemplate => (
                            <option key={dataTemplate.key} value={dataTemplate.key}>
                                {dataTemplate.key}
                            </option>
                        ))}
                    </select>
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
                <ResultsPage 
                    symbol={this.state.symbol} 
                    techPct={this.state.technicalPct} 
                    sentPct={this.state.sentimentPct}
                />
            )
        }
    }
}

export default MainScreen;