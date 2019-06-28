import React from 'react'
import { Container , Row, Col, ListGroup } from "react-bootstrap";
import './ResultsPage.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts'

class ResultsPage extends React.Component {
    constructor(props) {
        // props store stock symbol, techPct, sentPct
        super(props);
        this.state = {
            bbRating: 0,
            rsiRating: 0,
            techRating: 0,
            sentRating: 0,
            rsiData: {},
            BBandsData: {},
            pbData: {},
            priceData: {},
            sentData: {}
        };

        this.getTechnicalTips = this.getTechnicalTips.bind(this);
    }

    componentDidMount() {
        // var url = "http://localhost:3000/"
        var apiKey = "8YO9J2LZLTZS952M"
        // var url = "https://www.alphavantage.co/"

        var url = this.props.symbol === 'BLK' ? "/" : "/" + this.props.symbol + "/"
        console.log("calling api starting with " + url)

        if (url === "https://www.alphavantage.co/") {
            fetch(url + `query?function=RSI&symbol=${this.props.symbol}&interval=daily&time_period=14&series_type=close&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => { this.useRSIData(data) })
        } else {
            fetch(url + "RSI")
            .then(response => response.json())
            .then(data => { this.useRSIData(data) })
        }
        
        if (url === "https://www.alphavantage.co/") {
            fetch(url + `query?function=BBANDS&symbol=${this.props.symbol}&interval=daily&time_period=20&series_type=close&nbdevup=2&nbdevdn=2&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => this.useBBandsData(data, url, apiKey))
        } else {
            fetch(url + "BBands")
            .then(response => response.json())
            .then(data => this.useBBandsData(data, url, apiKey))
        }

        this.getSentimentScores()
    }

    getSentimentScores() {
        var sentimentString = ''
        if (this.props.symbol === 'FB') {
            sentimentString = `{"datetime.date(2019, 6, 29)": 0.981, "datetime.date(2019, 6, 28)": 0.97, "datetime.date(2019, 6, 27)": 0.981, "datetime.date(2019, 6, 26)": 0.984, "datetime.date(2019, 6, 22)": 0.04, "datetime.date(2019, 6, 21)": 0.999, "datetime.date(2019, 6, 20)": 0.989, "datetime.date(2019, 6, 19)": 0.997, "datetime.date(2019, 6, 18)": 0.965, "datetime.date(2019, 6, 15)": 0.936, "datetime.date(2019, 6, 12)": 0.954, "datetime.date(2019, 6, 7)": 0.993, "datetime.date(2019, 6, 6)": 0.994, "datetime.date(2019, 6, 5)": 0.998, "datetime.date(2019, 6, 4)": 0.805, "datetime.date(2019, 5, 31)": 0.414, "datetime.date(2019, 5, 30)": 0.994, "datetime.date(2019, 5, 29)": 0.992, "datetime.date(2019, 5, 26)": 0.996, "datetime.date(2019, 5, 25)": 0.983, "datetime.date(2019, 5, 21)": 0.994, "datetime.date(2019, 5, 19)": -0.778, "datetime.date(2019, 5, 18)": 0.486, "datetime.date(2019, 5, 17)": -0.966, "datetime.date(2019, 5, 16)": 0.121, "datetime.date(2019, 5, 15)": 0.028, "datetime.date(2019, 5, 14)": 0.03, "datetime.date(2019, 5, 12)": 0.97, "datetime.date(2019, 5, 11)": 0.997, "datetime.date(2019, 5, 10)": 0.043, "datetime.date(2019, 5, 9)": 0.969, "datetime.date(2019, 5, 8)": 0.98, "datetime.date(2019, 5, 4)": -0.007, "datetime.date(2019, 5, 3)": 0.998, "datetime.date(2019, 5, 2)": 0.997, "datetime.date(2019, 4, 30)": 0.966, "datetime.date(2019, 4, 27)": 0.993, "datetime.date(2019, 4, 26)": 0.996, "datetime.date(2019, 4, 20)": 0.782, "datetime.date(2019, 4, 19)": 0.917, "datetime.date(2019, 4, 17)": -0.982, "datetime.date(2019, 4, 14)": 0.932, "datetime.date(2019, 4, 13)": 0.95, "datetime.date(2019, 4, 11)": 0.005, "datetime.date(2019, 4, 10)": 0.317, "datetime.date(2019, 4, 6)": 0.406, "datetime.date(2019, 4, 5)": 0.978, "datetime.date(2019, 4, 4)": 0.997, "datetime.date(2019, 4, 3)": 0.991, "datetime.date(2019, 3, 30)": 0.983, "datetime.date(2019, 3, 29)": 0.979, "datetime.date(2019, 3, 27)": 0.966, "datetime.date(2019, 3, 26)": 0.707, "datetime.date(2019, 3, 23)": 0.992, "datetime.date(2019, 3, 21)": 0.998, "datetime.date(2019, 3, 17)": 0.885, "datetime.date(2019, 3, 16)": 0.972, "datetime.date(2019, 3, 15)": 0.989}`
        } else if (this.props.symbol === 'BLK') {
            sentimentString = `{"datetime.date(2019, 6, 29)": 0.949, "datetime.date(2019, 6, 28)": 0.996, "datetime.date(2019, 6, 27)": 0.996, "datetime.date(2019, 6, 20)": -0.646, "datetime.date(2019, 5, 10)": 0.961, "datetime.date(2019, 4, 19)": 0.99, "datetime.date(2019, 4, 18)": 0.991, "datetime.date(2019, 4, 5)": 0.997, "datetime.date(2019, 2, 28)": 0.473, "datetime.date(2019, 1, 26)": 0.984, "datetime.date(2019, 1, 24)": 0.988, "datetime.date(2019, 1, 23)": 0.978, "datetime.date(2019, 1, 22)": 0.998, "datetime.date(2019, 1, 20)": 0.979, "datetime.date(2019, 1, 9)": 0.189, "datetime.date(2018, 12, 14)": 0.944, "datetime.date(2018, 12, 13)": 0.956, "datetime.date(2018, 11, 20)": 0.999, "datetime.date(2018, 11, 9)": 0.861, "datetime.date(2018, 11, 8)": 0.988, "datetime.date(2018, 11, 6)": 0.961, "datetime.date(2018, 10, 26)": 0.902, "datetime.date(2018, 9, 22)": 0.803, "datetime.date(2018, 9, 21)": 0.982, "datetime.date(2018, 9, 2)": 0.997, "datetime.date(2018, 9, 1)": 0.997, "datetime.date(2018, 6, 22)": 0.734, "datetime.date(2018, 5, 16)": 0.985, "datetime.date(2018, 5, 10)": 0.496, "datetime.date(2018, 4, 27)": 0.77, "datetime.date(2018, 4, 8)": 0.992, "datetime.date(2018, 4, 7)": 0.805, "datetime.date(2018, 3, 10)": 0.73, "datetime.date(2018, 3, 9)": 0.999, "datetime.date(2018, 3, 6)": -0.033, "datetime.date(2018, 3, 3)": 0.446, "datetime.date(2018, 2, 24)": 0.977, "datetime.date(2018, 2, 9)": 0.994}`
        } else { 
            console.log('no sentiment data for this stock')
            return
        }
        const sentObj = JSON.parse(sentimentString)
        console.log(sentObj)
    
        const newSentObj = {}
        for (let date of Object.keys(sentObj)) {
            var justDate = date.slice(14, -1)
            var list = justDate.split(",")
            var formattedDate = list[0] + "-" + list[1].trim().padStart(2, '0') + '-' + list[2].trim().padStart(2, '0')
            // console.log(formattedDate)
            newSentObj[formattedDate] = { sentScore: sentObj[date] }
        }
        this.setState({sentData: newSentObj})

        var recentSum = 0
        for (let date of Object.keys(newSentObj).slice(0,5)) {
            recentSum += newSentObj[date]["sentScore"]
        }
        var avg = recentSum / 5
        console.log("avg = " + avg)
        //get rating by scaling (-1 to 1) up to (0 to 5)
        var rating = (avg + 1) * 2.5
        this.setState({ sentRating: rating })
    }

    useRSIData(data) {
        const rsiData = data["Technical Analysis: RSI"]
        // console.log(rsiData)
        // console.log(Object.keys(rsiData))
        var RSIobj = {}
        for (let date of Object.keys(rsiData).slice(1, 101)) {
            RSIobj[date] = { RSI: parseFloat(rsiData[date]['RSI'])}
        }
        this.setState({ rsiData: RSIobj })

        var sum = 0
        for (let date of Object.keys(RSIobj).slice(0, 5)) {
            sum += RSIobj[date]['RSI']
            // console.log("sum = " + sum)
        }
        var avg = sum / 5.0
        var rating = ((100 - avg) / 100) * 5
        if (rating > 5) { rating = 5 }
        else if (rating < 0) { rating = 0 }
        this.setState({rsiRating: rating})
    }

    useBBandsData(data, url, apiKey) {
        const BBandsData = data["Technical Analysis: BBANDS"]
        // console.log(BBandsData)

        var BBandsObj = {}
        for (let date of Object.keys(BBandsData).slice(1, 101)) {
            BBandsObj[date] = { "Real Lower Band": parseFloat(BBandsData[date]['Real Lower Band']),
                                "Real Middle Band": parseFloat(BBandsData[date]['Real Middle Band']),
                                "Real Upper Band": parseFloat(BBandsData[date]['Real Upper Band']) }
        }
        this.setState({ BBandsData: BBandsObj })

        if (url === "https://www.alphavantage.co/") {
            fetch(url + `query?function=TIME_SERIES_DAILY&symbol=${this.props.symbol}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => { 
                const priceData = data["Time Series (Daily)"]
                // console.log(priceData)

                var closesObj = {}
                var pbObj = {}
                for (let date of Object.keys(priceData).slice(1, 101)) {
                    let closePrice = parseFloat(priceData[date]["4. close"])
                    closesObj[date] = { "closePrice": closePrice }
                    let datePB = (closePrice - BBandsObj[date]["Real Lower Band"]) / (BBandsObj[date]["Real Upper Band"] - BBandsObj[date]["Real Lower Band"])
                    pbObj[date] = { pb: datePB }
                }
                this.setState({ priceData: closesObj, pbData: pbObj })

                var sum = 0
                for (let date of Object.keys(pbObj).slice(0, 5)) {
                    // console.log('pb = ' + pbObj[date]['pb'])
                    sum += pbObj[date]['pb']
                    // console.log("sum = " + sum)
                }
                var avg = sum / 5.0

                var rating = (1 - avg) * 5
                if (rating > 5) { rating = 5 }
                else if (rating < 0) { rating = 0 }
                this.setState({ bbRating: rating })
            })
        } else {
            fetch(url + "prices")
            .then(response => response.json())
            .then(data => { 
                const priceData = data["Time Series (Daily)"]
                // console.log(priceData)

                var closesObj = {}
                var pbObj = {}
                for (let date of Object.keys(priceData).slice(1, 101)) {
                    let closePrice = parseFloat(priceData[date]["4. close"])
                    closesObj[date] = { "closePrice": closePrice }
                    let datePB = (closePrice - BBandsObj[date]["Real Lower Band"]) / (BBandsObj[date]["Real Upper Band"] - BBandsObj[date]["Real Lower Band"])
                    pbObj[date] = { pb: datePB }
                }
                this.setState({ priceData: closesObj, pbData: pbObj })

                var sum = 0
                for (let date of Object.keys(pbObj).slice(0, 5)) {
                    // console.log('pb = ' + pbObj[date]['pb'])
                    sum += pbObj[date]['pb']
                    // console.log("sum = " + sum)
                }
                var avg = sum / 5.0

                var rating = (1 - avg) * 5
                if (rating > 5) { rating = 5 }
                else if (rating < 0) { rating = 0 }
                this.setState({ bbRating: rating })
            })
        }
    }

    getChartData() {
        var chartDataList = []
        // console.log(Object.keys(this.state.priceData))
        for (let dataDate of Object.keys(this.state.priceData)) {
            var sentimentScore = this.state.sentData[dataDate] ? this.state.sentData[dataDate]['sentScore'] : 0
            chartDataList.push({ 
                date: dataDate,
                price: this.state.priceData[dataDate]['closePrice'],
                lowerBBand: this.state.BBandsData[dataDate]['Real Lower Band'],
                upperBBand: this.state.BBandsData[dataDate]['Real Upper Band'],
                RSI: this.state.rsiData[dataDate]['RSI'],
                sentScore: sentimentScore
            })
        }
        // console.log(chartDataList)
        // this.setState({chartData: chartDataList})
        return chartDataList.reverse()
    }

    getTechnicalTips() {
        var tipList = []
        if (this.state.bbRating < 2) { tipList.push(`The stock price is close to the top bolinger band (High %B - bad) `)}
        else if (this.state.bbRating > 3.5) { tipList.push("The stock price is close to the bottom bollinger band (Low %B - Good)")}
        else { tipList.push("The stock price is right around the middle of the bollinger bands (Neutral)") }

        if (this.state.rsiRating < 2) { tipList.push("The recent Relative Strength Index is high (Bad)") }
        else if (this.state.rsiRating > 3.5) { tipList.push("The recent Relative Strength Index is low (Good)") }
        else { tipList.push("The recent Relative Strength Index is around the middle (Neutral)") }

        return tipList
    }

    getSentimentTips() {
        if (this.state.sentRating > 4) {return "Recent news stories about this stock have been positive!"}
        else if (this.state.sentRating < 2.5) { return "Recent news stories about this stock have been negative. :(" }
        else { return "Recent news stories about this stock have been neutral."}
    }

    render () {
        const chartData = this.getChartData()
        return (
            <div className="mainContainer">
                <div id="header">
                    <h3>Results: {this.props.symbol.toUpperCase()}</h3>
                </div>
                <Container>
                    <Row>
                        <h2>Current Overall Rating: {(((this.state.bbRating + this.state.rsiRating) / 2.0) * (this.props.techPct / 100) + this.state.sentRating * (this.props.sentPct / 100)).toFixed(2)}</h2>
                    </Row>
                    <Row>
                        <Col className="categoryCol">
                            <h3>Sentiment ({this.props.sentPct}%)</h3>
                            <h5>Sentiment rating: {this.state.sentRating.toFixed(2)}/5</h5>
                            <div id="sentTips">
                                <p>{this.getSentimentTips()}</p>
                            </div>
                        </Col>
                        <Col className="categoryCol">
                            <h3>Technical ({this.props.techPct}%)</h3>
                            <h5>Technical rating: {((this.state.bbRating + this.state.rsiRating) / 2.0).toFixed(2)}/5</h5>
                            <p className="indValue">%B = {this.state.pbData[Object.keys(this.state.pbData)[0]] ? this.state.pbData[Object.keys(this.state.pbData)[0]]["pb"].toFixed(2) : ""}</p>
                            <p className="indValue">RSI = {this.state.rsiData[Object.keys(this.state.rsiData)[0]] ? this.state.rsiData[Object.keys(this.state.rsiData)[0]]["RSI"].toFixed(2) : ""}</p>
                            <ListGroup as="ul">
                                {this.getTechnicalTips().map((tipString, index) => {
                                    return (
                                        <ListGroup.Item as="li" key={index}>{tipString}</ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                    <hr />
                    <h2>Historical Technical &amp; Sentiment Data</h2>
                    {Object.keys(this.state.pbData).map(date => {
                        if (this.state.pbData[date]['pb'] < 0.1 && this.state.rsiData[date]['RSI'] < 35) {
                            return ( <Row className="date-good-bad"><p className="good-date">{date} was good for buying because %B was low and RSI was low. </p> </Row> )
                        } else if (this.state.pbData[date]['pb'] > 0.9 && this.state.rsiData[date]['RSI'] > 75) {
                            return ( <Row className="date-good-bad"><p className="bad-date">{date} was bad for buying because %B was high and RSI was high. </p> </Row> )
                        } else {
                            return (null)
                        }
                    })}
                    <Row >
                        <h5>Price &amp; Bollinger Bands</h5>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart width={700} height={400} data={chartData} syncId="1">
                                <Line type="monotone" dataKey="price" stroke="#8884d8" dot="false"/>
                                <Line type="monotone" dataKey="lowerBBand" stroke="#edaa2d" />
                                <Line type="monotone" dataKey="upperBBand" stroke="#ff9100" />
                                <XAxis dataKey="date" minTickGap={15} padding={{left:20, right:20}}/>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {Object.keys(this.state.pbData).map(date => {
                                    if (this.state.pbData[date]['pb'] < 0.1 && this.state.rsiData[date]['RSI'] < 35) {
                                        return ( <ReferenceLine x={date} stroke="green"  /> )
                                    } else if (this.state.pbData[date]['pb'] > 0.9 && this.state.rsiData[date]['RSI'] > 75) {
                                        return ( <ReferenceLine x={date} stroke="red" /> )
                                    } else {return null}
                                })}
                            </LineChart>
                        </ResponsiveContainer >
                        <h5>Relative Strength Index</h5>
                        <ResponsiveContainer width="100%" height={150}>
                            <LineChart width={700} height={150} data={chartData} syncId="1">
                                <Line type="monotone" dataKey="RSI" stroke="#226ae6" />
                                <XAxis dataKey="date" minTickGap={15} padding={{left:20, right:20}}/>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {Object.keys(this.state.pbData).map(date => {
                                    if (this.state.pbData[date]['pb'] < 0.1 && this.state.rsiData[date]['RSI'] < 35) {
                                        return ( <ReferenceLine x={date} stroke="green" /> )
                                    } else if (this.state.pbData[date]['pb'] > 0.9 && this.state.rsiData[date]['RSI'] > 75) {
                                        return ( <ReferenceLine x={date} stroke="red" /> )
                                    } else {return null}
                                })}
                            </LineChart>
                        </ResponsiveContainer >
                        <h5>Sentiment Score</h5>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart width={700} height={150} data={chartData} syncId="1">
                                <Line type="monotone" dataKey="sentScore" stroke="#2ae86c" />
                                <XAxis dataKey="date" minTickGap={15} padding={{left:20, right:20}}/>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {Object.keys(this.state.pbData).map(date => {
                                    if (this.state.pbData[date]['pb'] < 0.1 && this.state.rsiData[date]['RSI'] < 35) {
                                        return ( <ReferenceLine x={date} stroke="green" /> )
                                    } else if (this.state.pbData[date]['pb'] > 0.9 && this.state.rsiData[date]['RSI'] > 75) {
                                        return ( <ReferenceLine x={date} stroke="red" /> )
                                    } else {return null}
                                })}
                            </LineChart>
                        </ResponsiveContainer >
                    </Row>
                </Container>
                
            </div>
            

        )
    }
}

export default ResultsPage;