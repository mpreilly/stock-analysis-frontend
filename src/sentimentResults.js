module.exports.getSentimentScores = function getSentimentScores() {
    const sentimentString = `{"datetime.date(2019, 6, 29)": 0.981, "datetime.date(2019, 6, 28)": 0.97, "datetime.date(2019, 6, 27)": 0.981, "datetime.date(2019, 6, 26)": 0.984, "datetime.date(2019, 6, 22)": 0.04, "datetime.date(2019, 6, 21)": 0.999, "datetime.date(2019, 6, 20)": 0.989, "datetime.date(2019, 6, 19)": 0.997, "datetime.date(2019, 6, 18)": 0.965, "datetime.date(2019, 6, 15)": 0.936, "datetime.date(2019, 6, 12)": 0.954, "datetime.date(2019, 6, 7)": 0.993, "datetime.date(2019, 6, 6)": 0.994, "datetime.date(2019, 6, 5)": 0.998, "datetime.date(2019, 6, 4)": 0.805, "datetime.date(2019, 5, 31)": 0.414, "datetime.date(2019, 5, 30)": 0.994, "datetime.date(2019, 5, 29)": 0.992, "datetime.date(2019, 5, 26)": 0.996, "datetime.date(2019, 5, 25)": 0.983, "datetime.date(2019, 5, 21)": 0.994, "datetime.date(2019, 5, 19)": -0.778, "datetime.date(2019, 5, 18)": 0.486, "datetime.date(2019, 5, 17)": -0.966, "datetime.date(2019, 5, 16)": 0.121, "datetime.date(2019, 5, 15)": 0.028, "datetime.date(2019, 5, 14)": 0.03, "datetime.date(2019, 5, 12)": 0.97, "datetime.date(2019, 5, 11)": 0.997, "datetime.date(2019, 5, 10)": 0.043, "datetime.date(2019, 5, 9)": 0.969, "datetime.date(2019, 5, 8)": 0.98, "datetime.date(2019, 5, 4)": -0.007, "datetime.date(2019, 5, 3)": 0.998, "datetime.date(2019, 5, 2)": 0.997, "datetime.date(2019, 4, 30)": 0.966, "datetime.date(2019, 4, 27)": 0.993, "datetime.date(2019, 4, 26)": 0.996, "datetime.date(2019, 4, 20)": 0.782, "datetime.date(2019, 4, 19)": 0.917, "datetime.date(2019, 4, 17)": -0.982, "datetime.date(2019, 4, 14)": 0.932, "datetime.date(2019, 4, 13)": 0.95, "datetime.date(2019, 4, 11)": 0.005, "datetime.date(2019, 4, 10)": 0.317, "datetime.date(2019, 4, 6)": 0.406, "datetime.date(2019, 4, 5)": 0.978, "datetime.date(2019, 4, 4)": 0.997, "datetime.date(2019, 4, 3)": 0.991, "datetime.date(2019, 3, 30)": 0.983, "datetime.date(2019, 3, 29)": 0.979, "datetime.date(2019, 3, 27)": 0.966, "datetime.date(2019, 3, 26)": 0.707, "datetime.date(2019, 3, 23)": 0.992, "datetime.date(2019, 3, 21)": 0.998, "datetime.date(2019, 3, 17)": 0.885, "datetime.date(2019, 3, 16)": 0.972, "datetime.date(2019, 3, 15)": 0.989}`
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
    console.log(newSentObj)
}
