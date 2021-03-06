import React from 'react'
import './MainScreen.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import ResultsPage from './components/ResultsPage'
import logo from './logo.jpg'
import {Button, Row, Col} from 'react-bootstrap'

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbolInput: '',
            symbol: '',
            sentimentPct: -1,
            technicalPct: -1,
            value1: 50,
            listdata: [ {key: "BLK", value: "Blackrock"}, {key: "FB", value: "Facebook"} ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitPcts = this.handleSubmitPcts.bind(this);
        this.changePcts = this.changePcts.bind(this);
        this.changeStock = this.changeStock.bind(this);
    }

    handleChange2 = value1 => {
      this.setState({
        value1: value1
      })
    };

    handleChange(event) {
        this.setState({ symbolInput: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState(prevState => ({ symbol: prevState.symbolInput }))
    }

    handleSubmitPcts() {
        this.setState({ sentimentPct: 100 - this.state.value1, technicalPct: this.state.value1 })
    }

    changePcts() {
        this.setState({sentimentPct: -1})
    }

    changeStock() {
        this.setState({ symbol: '', sentimentPct: -1 })
    }

    render() {
      const test = {
        0: 'High Sentiment',
        50: 'Medium Sentiment and Technical',
        100: 'High Technical'
      }
        if (this.state.symbol === '') {
            return (
                <div>
                <img id="logo" src={logo} width="400"/>
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
                </div>
            )
        } else if (this.state.sentimentPct === -1) {
          const { value1 } = this.state
            return (
              <div className='slider'>
                <Slider
                  min={0}
                  max={100}
                  value={value1}
                  step={1}
                  labels={test}
                  // onChangeStart={this.handleChangeStart}
                  onChange={this.handleChange2}
                  // onChangeComplete={this.handleChangeComplete}
                />
                <Row id='valuesRow'>
                    <Col id="sentValue"> {100 - value1}%</Col>
                    <Col id="techValue"> {value1}%</Col>
                </Row>
                <Button onClick={this.handleSubmitPcts}>Submit</Button>
              </div>
            )
        } else {
            return (
                <div>
                    <Row style={{marginTop: "1em"}}>
                        <Button onClick={this.changePcts}>Change Percentages</Button>
                        <Button onClick={this.changeStock} style={{marginLeft: "1em"}}>Change Stock</Button>
                    </Row>
                    <ResultsPage
                        symbol={this.state.symbol}
                        techPct={this.state.technicalPct}
                        sentPct={this.state.sentimentPct}
                    />
                </div>
            )
        }
    }
}

export default MainScreen;
