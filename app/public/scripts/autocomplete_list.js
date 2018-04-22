// Autocomplete list
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
                    stockDataLength = stockData.length;

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
function defaultData() {
    var url = '/api_all_stocks';

    var success = function(res){
    console.log(res, 'got page load response')
    if(res.stocks.length){
        stockData = res.stocks;
        stockDataLength = stockData.length;

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

}

defaultData();

// Makes the on click work on page load before the user types anything. Place anything here that should be updated when the user selects a stock.
$(".stockData").on("click", function(stockLine){ 
    currentStockSymbol = $(this).html().substring($(this).html().indexOf(">") + 1, $(this).html().indexOf("</td>"));
    $("#stockSymbol").val(currentStockSymbol); // Keeps stock symbol only in input box

    $("#res").empty();
 });