function update_stock_price() {
    (function() {
        console.log("Submitted")
        var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="
        var symbol = document.getElementById("stockSymbol").value.toUpperCase() + ":"; // Added : to end in case autocomplete is not used and only stock symbol is used
        symbol = symbol.substr(0, symbol.indexOf(":")); // Keeps symbol only

        console.log(symbol);
        var url2 = "&interval=15min&apikey="
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
            var currentDateData = Object.keys(timeSeries15)[0];
            var timeZone = response["Meta Data"]["6. Time Zone"];
            console.log(timeSeries15[currentDateData]);
            console.log(currentDateData)
            var stockPrice = timeSeries15[currentDateData]["4. close"];
            $("#stockSymbolText").html(symbol);
            $("#price").html(stockPrice);
            $("#currentDate").html(currentDateData + " " + timeZone);
        }

        // handle error
        function updateUIError() {
            console.log("Fail");
        }

    })();

}

function update_sector_price() {
    (function() {
        console.log("Submitted")
        var url = "https://www.alphavantage.co/query?function=SECTOR&apikey="
        var apiKey = "3SW8F3VSYVSP0VAZ";
        // retrieves sector prices
        $.get(url + apiKey).done(function(response) {
            console.log("Success");
            updateUISuccess(response);
        }).fail(function(error) {
            console.log("Failed");
            alert("Failed");
            updateUIError();
        })
        var sectorResponse = ["Rank A: Real-Time Performance", "Rank B: 1 Day Performance", "Rank C: 5 Day Performance", "Rank D: 1 Month Performance", "Rank E: 3 Month Performance", "Rank F: Year-to-Date (YTD) Performance", "Rank G: 1 Year Performance", "Rank H: 3 Year Performance", "Rank I: 5 Year Performance", "Rank J: 10 Year Performance"];
        var sectors = ["Energy", "Utilities", "Real Estate", "Consumer Staples", "Health Care", "Materials", "Telecommunication Services", "Industrials", "Information Technology", "Consumer Discretionary", "Financials"]
        // handle success
        function updateUISuccess(response) {
            console.log(response);
            var table = document.getElementById("sectorTable");
//            var sectorPerformance = response[sectorResponse[0]];
//            console.log(sectorPerformance[sectors[1]]);
//            console.log(sectors[1])
            
            for (let i = 0; i < sectors.length; i++) {
                var row = table.insertRow(i + 1);
                var rowHeading = row.insertCell(0);
                rowHeading.innerHTML = sectors[i];
                console.log(sectors[i]);
                for (let j = 0; j < sectorResponse.length; j++) {
                    var cell = row.insertCell(j + 1);
                    cell.innerHTML = response[sectorResponse[j]][sectors[i]];
                    console.log(response[sectorResponse[j]][sectors[i]]);
                }
            }
        }

        // handle error
        function updateUIError() {
            console.log("Fail");
        }
    })();
}

$("#stockPriceUpdate").on("click", function(e) {
    console.log(e.target);
    update_stock_price();
})

$("#sectorPriceUpdate").on("click", function(e) {
    console.log(e.target);
    update_sector_price();
})

// Auto complete list
function getStockList() {
    var url = 'scripts/data/stock_symbols.json';
    $.getJSON(url, function(data) {
        console.log(data[0]["Symbol"]);
        var i = 0;
        $(data).each(function() {
            $("#stockSymbolList").append('<option value=' + data[i]["Symbol"] + ":" + data[i]["Name"] + '></option>');
            i ++;
        })
    })
}
getStockList();
