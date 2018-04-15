function update_stock_price() {
    (function() {
        console.log("Submitted")
        var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="
        var symbol = document.getElementById("stockSymbol").value.toUpperCase();
        var url2 = "&interval=15min&apikey="
        var apiKey = "3SW8F3VSYVSP0VAZ";
        
        $.get(url + symbol + url2 + apiKey).done(function(response) {
            console.log("Success");
            alert("Success")
            updateUISuccess(response);
        }).fail(function(error) {
            console.log("Failed");
            alert("Failed");
            updateUIError();
        })

        // handle success
        function updateUISuccess(response) {
            console.log(response);
            var timeSeries15 = response["Time Series (15min)"];
            var currentDateData = Object.keys(timeSeries15)[0];
            var timeZone = response["Meta Data"]["6. Time Zone"]
            console.log(timeSeries15[currentDateData]);
            console.log(currentDateData)
            var stockPrice = timeSeries15[currentDateData]["4. close"];
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
        
        $.get(url + apiKey).done(function(response) {
            console.log("Success");
            alert("Success")
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
            
            for (i = 0; i < sectors.length; i++) {
                var row = table.insertRow(i + 1);
                var rowHeading = row.insertCell(0);
                rowHeading.innerHTML = sectors[i];
                console.log(sectors[i]);
                for (j = 0; j < sectorResponse.length; j++) {
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

$( "#stockPriceUpdate" ).click(function(event) {
    update_stock_price();
    
});

$( "#sectorPriceUpdate" ).click(function(event) {
    update_sector_price()
    
});