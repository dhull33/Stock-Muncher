
google.charts.load('current', {packages: ['corechart', 'controls']});

google.charts.setOnLoadCallback(function(){
    $("#stockPriceUpdate").on("click", function() {
        //console.log(e.target);
    });
});




/*function drawChart() {
    (function() {
        console.log("Submitted")
        var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="
        var symbol = document.getElementById("stockSymbol").value.toUpperCase(); // Added : to end in case autocomplete is not used and only stock symbol is used
        //symbol = symbol.substr(0, symbol.indexOf(":")); // Keeps symbol only
        console.log(symbol);

        //specifies time interval
        var url2 = "&interval=1min&apikey="
        var apiKey = "3SW8F3VSYVSP0VAZ";


        // Retreives individual stock prices
        $.get(url + symbol + url2 + apiKey).done(function(response) {
            console.log("Success");
            updateUISuccess(response);
        }).fail(function(error) {
            console.log("Failed");
            alert("Failed. Please Try Again.");
            updateUIError();
        })

        // handle success
        function updateUISuccess(response) {
            console.log(response);
            var timeSeries15 = response["Time Series (15min)"];

            //Use object.keys to access data
            var currentDateData = Object.keys(timeSeries15)[0];
            var timeZone = response["Meta Data"]["6. Time Zone"];
            //console.log(timeSeries15[currentDateData]);

            var stockPrice = timeSeries15[currentDateData]["4. close"];

            // ### CHARTZZZZZZZ ###

            // array that holds intra-day prices
            const todayDate= currentDateData.slice(0,10);

            let newData = [];

            const accessStrings = ['1. open', '2. high', '3. low', '4. close']
            for(let i=0; i < Object.keys(timeSeries15).length; i++) {

                let curDateData = Object.keys(timeSeries15)[i];
                let testDate = currentDateData.slice(0,10);

                if (testDate == todayDate) {
                    let date= new Date(curDateData);

                    let points = timeSeries15[curDateData];

                    let rows = [date, parseFloat(points['3. low']), parseFloat(points['1. open']), parseFloat(points['4. close']), parseFloat(points['2. high']) ];

                    newData.push(rows);

                }
                else{
                    continue;
                }
            }

            //console.log("");
            //console.log(newData);
            //console.log(timeSeries15.length);



            //Load google charts

            //Draws chart

            const data = new google.visualization.arrayToDataTable(newData, true); // Treat first row as data as well

            let options = {
                legend: 'right',
                colors: ["white"],
                backgroundColor: '#0A2E36',
                candlestick: {
                    fallingColor: { strokeWidth: 0, stroke: 'black', fill: '#a52714' }, // red
                    risingColor: { strokeWidth: 0, stroke: 'black', fill: '#0f9d58' }   // green
                },
                hAxis: {
                    title: 'Time',
                    titleTextStyle: {
                        color: '#FBFBFB'
                    },
                    textStyle: {
                        color: '#FBFBFB'
                    },
                    viewWindowMode: 'pretty',
                },

                vAxis: {
                    title: '$Price',
                    titleTextStyle: {
                        color: '#FBFBFB'
                    },
                    textStyle: {
                        color:'#FBFBFB'
                    }
                }

            };


            const chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));


            chart.draw(data, options);

            // ### Re-sizes and Draws the chart
            function resize () {
                // change dimensions if necessary
                chart.draw(data, options);
            };

            if (window.addEventListener) {
                window.addEventListener('resize', resize);
            }
            else {
                window.attachEvent('onresize', resize);
            }
        }

        // handle error
        function updateUIError() {
            console.log("FailGraph");
        }

    })();

};

*/

