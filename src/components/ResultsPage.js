import React from 'react'
import { Container , Row, Col, ListGroup } from "react-bootstrap";
import './ResultsPage.css'

class ResultsPage extends React.Component {
    constructor(props) {
        // props store stock symbol, techPct, sentPct
        super(props);
        this.state = {
            bbRating: 0,
            rsiRating: 0,
            techScore: 0,
            sentScore: 0
        };

        this.getRelevantTips = this.getRelevantTips.bind(this);
    }

    componentDidMount() {
        // var url = "http://localhost:3000/"
        var url = "/"
        fetch(url + "bollinger-rating/" + this.props.symbol)
        .then(response => response.json())
        .then(data => this.setState({bbRating: data}))

        fetch(url + "RSI-rating/" + this.props.symbol)
        .then(response => response.json())
        .then(data => this.setState({rsiRating: data}))
    }

    getRelevantTips() {
        var tipList = []
        if (this.state.bbRating < 2) { tipList.push("The stock price is close to the top bolinger band (Bad)")}
        else if (this.state.bbRating > 3.5) { tipList.push("The stock price is close to the bottom bollinger band (Good)")}
        else { tipList.push("The stock price is right around the middle of the bollinger bands (Neutral)") }

        if (this.state.rsiRating < 2) { tipList.push("The recent Relative Strength Index is high (Bad)") }
        else if (this.state.rsiRating > 3.5) { tipList.push("The recent Relative Strength Index is low (Good)") }
        else { tipList.push("The recent Relative Strength Index is around the middle (Neutral)") }

        return tipList
    }

    render () {
        return (
            <div className="mainContainer">
                <div id="header">
                    <h3>Results: {this.props.symbol.toUpperCase()}</h3>
                </div>
                <Container>
                    <Row>
                        <h2>Overall Score: {(((this.state.bbRating + this.state.rsiRating) / 2.0) * (this.props.techPct / 100) + this.state.sentScore * this.props.sentPct).toFixed(2)}</h2>
                    </Row>
                    <Row>
                        <Col className="categoryCol">
                            <h3>Sentiment ({this.props.sentPct}%)</h3>
                            <h5>Sentiment score: {this.state.sentScore.toFixed(2)}/5</h5>
                        </Col>
                        <Col className="categoryCol">
                            <h3>Technical ({this.props.techPct}%)</h3>
                            <h5>Technical score: {((this.state.bbRating + this.state.rsiRating) / 2.0).toFixed(2)}/5</h5>
                            <ListGroup as="ul">
                                {this.getRelevantTips().map((tipString, index) => {
                                    return (
                                        <ListGroup.Item as="li" key={index}>{tipString}</ListGroup.Item>
                                    )
                                })}
                            </ListGroup>

                        </Col>
                    </Row>
                </Container>
                
            </div>
            

        )
    }
}

export default ResultsPage;