// Modal Autocomplete list
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
                    
                    for (var i = 0; i <= Math.min(stockDataLength, 9); i++) {
                        var stockSymbol = stockData[i].stock_symbol;
                        var stockName = stockData[i].stock_name;
                        var stockSector = stockData[i].sector;
                        var stockPrice = stockData[i].current_price;
                        $("#res").append("<p><b><span class='stockSymbol' id= stockList" + i + ">" + " " + stockSymbol + 
                        "<span class='stockPrice'>" + stockPrice + "</span><br /></b><span class='stockName'>" + stockName + ")</span><br /><i><span class='stockSector'>" + stockSector  + "</span></p>");
                    }
                    
                }
            }
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
                $("#res").on("click", "p", function(stockLine){ 
                    currentStockSymbol = $(this).text().substring(0, $(this).text().indexOf("$"));
                    $("#stockSymbol").val(currentStockSymbol); // Keeps stock symbol only in input box
                    $("#stockSymbolText").text(currentStockSymbol);
                    console.log(stockLine.target);
                    for (var i = 0; i < 10; i++) {
                        $("#stockList" + i).on("click", function() {
                            console.log(stockData[i].current_price);
                        })
                    }
                    $("#stockList1").on("click", function() {
                        console.log(stockData[i].current_price);
                    })
                    // console.log(stockData[0].current_price);

                    $("#res").empty();
                 });
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