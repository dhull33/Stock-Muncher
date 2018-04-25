$("#loading").hide();
var str = " Stock Muncher.";
var n = 0;
var eatenString = " ";

// Stock Munch animation
function typeLines() {

    var brokenLetterList = ["$"];
    var strLen = str.length;

    if (n < strLen) {
        newStrArray = str.substring(n, strLen);
    }
    
    n += 2; // to eat two letters at a time

    if (n >= strLen + 24) { // Added 24 to make sure timing is right at the time the stock muncher is not earing the letters
        n = 0;
        eatenString = "";
    }
    if (n > 2 && n <= strLen) {
        eatenString += brokenLetterList[Math.floor(Math.random() * brokenLetterList.length)];
    }
    

    $("#stockMuncherText").html(eatenString + newStrArray);
    //$("#text").html(j);
        
}

setInterval(typeLines, 400);

// Autocomplete list
$("#loading").hide();

$(document).ready(function(){

    var url = '/api_stocks';
    var stockList = [];
    var stockData;

    console.log(stockList);
    
    var cache = {};
    var drew = false;
    
    $("#stockSymbol").on("keyup", function(event){
        var query = $("#stockSymbol").val()
 
        if($("#stockSymbol").val().length >= 1){
            
            //Check if we've searched for this term before
            if(query in cache){
                results = cache[query];
            }
            else{
                //Case insensitive search for stock array
                var results = $.grep(stockList, function(item){
                    return item.search(RegExp(query, "i")) != -1;
                });
                
                //Add results to cache
                cache[query] = results;
            }
            
            // Accesses our stock database and fills the dropdown
            var data = {userString: $("#stockSymbol").val()}
            var success = function(res){
                console.log(res, 'got a response')
                if(res.stocks.length){
                    stockData = res.stocks;
                    var stockDataLength = stockData.length;

                    for (var i = 0; i <= Math.min(stockDataLength, 5);i++) {
                        var stockName = stockData[i].stock_name;
                        var stockSymbol = stockData[i].stock_symbol;
                        var stockSector = stockData[i].sector;
                        var stockPrice = stockData[i].current_price;
                        
                        $(".stockName" + i).text(stockName);
                        $(".stockSymbol" + i).text(stockSymbol);
                        $(".stockSector" + i).text(stockSector);
                        $(".stockPrice" + i).text(stockPrice);
                    }
                }
            }
            // API call from our database
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                success: success,
                dataType: 'json'
            });

            //First search
            if(drew == false){
                //Create list for results
                $(".stockSymbol").after('<p id="res"></p>');
                
                //Prevent redrawing/binding of list
                drew = true;
                
                //Bind click event to list elements in results
                // $(".stockData").on("click", function(stockLine){ 
                //     currentStockSymbol = $(this).html().substring($(this).html().indexOf(">") + 1, $(this).html().indexOf("</td>"));
                //     $("#stockSymbol").val(currentStockSymbol); // Keeps stock symbol only in input box

                //     $("#res").empty();
                //  });
            }
            //Clear old results
            else{
                $("#res").empty();
            }
            
        }
        //Handle backspace/delete so results don't remain with less than 3 characters
            else if(drew){
                $("#res").empty();
            }
    });
})

// loads some stock data on page load so that the stock data section is not empty
$(document).ready(function(){
    var url = '/api_all_stocks';

    var success = function(res){
    console.log(res, 'got page load response')
    if(res.stocks.length){
        var stockData = res.stocks;
        var stockDataLength = stockData.length;
        console.log(res);


        for (var i = 0; i <= Math.min(stockDataLength, 5);i++) {
            var stockName = stockData[i].stock_name;
            var stockSymbol = stockData[i].stock_symbol;
            var stockSector = stockData[i].sector;
            var stockPrice = stockData[i].current_price;
            
            $(".stockName" + i).text(stockName);
            $(".stockSymbol" + i).text(stockSymbol);
            $(".stockSector" + i).text(stockSector);
            $(".stockPrice" + i).text(stockPrice);
            }
        }

    }

    $.ajax({
        type: "POST",
        url: url,
        success: success,
        dataType: 'json'
    });

});

// Makes the on click work on page load before the user types anything. Place anything here that should be updated when the user selects a stock.
$(".stockData").on("click", function(stockLine){
    var currentStockSymbol = $(this).html().substring($(this).html().indexOf(">") + 1, $(this).html().indexOf("</td>"));


    drawChart(currentStockSymbol);
    $("#stockSymbol").val(currentStockSymbol); // Keeps stock symbol only in input box
    
    $("#loading").addClass("loader");
    $("#chart_div").hide();
    $("#loading").show();
    console.log(this);
    drawChart(currentStockSymbol);
    $("#chartTitle").text(currentStockSymbol);
    
    company_logo(currentStockSymbol);

 });


 function drawChart(symbol) {
    (function() {
        console.log("Submitted")
        var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="
       
        // var symbol = document.getElementById("stockSymbol"); // Added : to end in case autocomplete is not used and only stock symbol is used
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
            var timeSeries15 = response["Time Series (1min)"];

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

                title: symbol,
                titleTextStyle: {
                    color: '#FBFBFB',
                    fontSize: 35,
                    bold: true
                },
                titlePosition: 'out',
                legend: 'none',
                colors: ["white"],
                backgroundColor: '#0A2E36',
                candlestick: {
                    fallingColor: { strokeWidth: 0, stroke: 'black', fill: '#a52714' }, // red
                    risingColor: { strokeWidth: 0, stroke: 'black', fill: '#0f9d58' }   // green
                },
                hAxis: {
                    title: 'Time',
                    titleTextStyle: {
                        color: '#FBFBFB',
                        fontSize: 25


                    },
                    textStyle: {
                        color: '#FBFBFB'
                    },
                    viewWindowMode: 'pretty',
                },

                vAxis: {

                    title: 'Price',
                    titleTextStyle: {
                        color: '#FBFBFB',
                        fontSize: 25

                    },
                    textStyle: {
                        color:'#FBFBFB'
                    }
                }

            };



            const dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));

            const zoom = new google.visualization.ControlWrapper({
                'controlType': 'ChartRangeFilter',
                'containerId': 'filter_div',
                'options': {
                    'filterColumnIndex': 0
                }
            });


            const candleStick = new google.visualization.ChartWrapper({
                'chartType': 'CandlestickChart',
                'containerId': 'chart_div',
                'options': {
                    'title': symbol,
                    'titleTextStyle': {
                        'color': '#FBFBFB',
                        'fontSize': 35,
                        'bold': true
                    },
                    'titlePosition': 'out',
                    'legend': 'none',
                    'colors': ["white"],
                    'backgroundColor': '#0A2E36',
                    'candlestick': {
                        'fallingColor': { 'strokeWidth': 0, 'stroke': 'black', 'fill': '#a52714' }, // red
                        'risingColor': { 'strokeWidth': 0, 'stroke': 'black', 'fill': '#0f9d58' }   // green
                    },
                    'hAxis': {
                        'textStyle': {
                            'color': '#FBFBFB'
                        },
                        'viewWindowMode': 'pretty',
                    },

                    'vAxis': {
                        'title': 'Price',
                        'titleTextStyle': {
                            'color': '#FBFBFB',
                            'fontSize': 25
                        },
                        'textStyle': {
                            'color':'#FBFBFB'
                        }
                    },
                    'ui':{
                    'chartOptions': {
                        'backgroundColor': '#0A2E36',
                        'legend': {
                            'position': 'top'

                        }

                        }
                    }
                }
            });

            dashboard.bind(zoom, candleStick);


            dashboard.draw(data);

            const chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));



            // ### Re-sizes and Draws the chart
            function resize () {
                // change dimensions if necessary
                dashboard.draw(data);

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


// To show company logo
function company_logo(symbol) {
    (function () {
        console.log("Submitted")
        var url = "https://api.iextrading.com/1.0/stock/"
        //specifies time interval
        var url2 = "/logo"


        // Retreives individual stock prices
        $.get(url + symbol + url2).done(function (response) {
            console.log("Success");
            updateUISuccess(response);
        }).fail(function (error) {
            console.log("Failed");
            alert("Failed. Please Try Again.");
            updateUIError();
        })

        // handle success
        function updateUISuccess(response) {
            var companyLogo = response["url"];
            console.log(companyLogo);
            $("#companyLogo").attr("src", companyLogo);
        }

        // handle error
        function updateUIError() {
            console.log("Fail");
        }

    })();

}