const express = require('express');
const app = express();
const axios = require('axios');


// hello world route

app.get("/", (req, res) => {
    res.send("Hello World");
})

// get Bitcoin informations

app.get("/getBitcoinInfo", async (req, res) => {

    const currencyCode = req.query.currency

    if (currencyCode === undefined) {

        res.status(400).send("Please provide currencies");

    } else {

        const requestDate = new Date()
        let todayDate = requestDate.getDate();
        let todayMonth = requestDate.getMonth() + 1;
        let todayYear = requestDate.getFullYear();
        let oneMonthAgoDate = null;
        let oneMonthAgoMonth = null;
        let oneMonthAgoYear = null;


        if (todayMonth === 1) {

            oneMonthAgoMonth = 12
            oneMonthAgoYear = todayYear - 1

        } else if (todayDate === 31) {

            todayDate = 31
            oneMonthAgoDate = 1
            oneMonthAgoMonth = todayMonth
            oneMonthAgoYear = todayYear
        }
        else {

            oneMonthAgoDate = todayDate
            oneMonthAgoMonth = todayMonth - 1
            oneMonthAgoYear = todayYear
        }


        if (todayMonth < 10)
            todayMonth = '0' + todayMonth;
        if (todayDate < 10)
            todayDate = '0' + todayDate;

        if (oneMonthAgoDate < 10)
            oneMonthAgoDate = '0' + oneMonthAgoDate;
        if (oneMonthAgoMonth < 10)
            oneMonthAgoMonth = '0' + oneMonthAgoMonth;


        try {

            const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");

            const currencyLink = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${oneMonthAgoYear}-${oneMonthAgoMonth}-${oneMonthAgoDate}&end=${todayYear}-${todayMonth}-${todayDate}&currency=${currencyCode.toLowerCase()}`;

            if (currencyCode === "USD" || currencyCode === "EUR" || currencyCode === "GBP") {

                const currenciesPrices = await axios.get(currencyLink);

                const obj = currenciesPrices.data.bpi

                const values = Object.values(obj);

                const max = Math.max(...values);

                const min = Math.min(...values);

                const data = {
                    currency: response.data.bpi[`${currencyCode}`].description,
                    currencyPresentRate: response.data.bpi.USD.rate,
                    highestReateOfMonth: max,
                    lowestReatOfMonth: min,
                }

                res.status(200).json(data)

            } else {

                res.status(400).json("currency code in not supported by api")
            }

        } catch (error) {

            res.status(500).send(error);
        }
    }
})

app.listen(5000, () => { console.log('Server is running on port 5000') });