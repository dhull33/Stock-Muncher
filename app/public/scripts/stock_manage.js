// Modal Autocomplete list
$(document).ready(function(){
    var url = '/api_purchases';
    
    console.log("Check");
            
    // Accesses our stock database and fills the dropdown
    var success = function(res){
        console.log(res, 'got a response')
        var userData = res.purchases;
        var userDataLen = userData.length;
        console.log(userDataLen);
        for (var i = 0; i < userDataLen; i++) {
            
        }
        // if(res.stocks.length){
        //     stockData = res.stocks;
        //     stockDataLength = stockData.length;
            
        //     for (var i = 0; i <= Math.min(stockDataLength, 9); i++) {
        //         var stockSymbol = stockData[i].stock_symbol;
        //         var stockName = stockData[i].stock_name;
        //         var stockSector = stockData[i].sector;
        //         var stockPrice = stockData[i].current_price;
        //         $("#res").append("<p><b><span class='stockSymbol' id= stockList" + i + ">" + " " + stockSymbol + 
        //         "<span class='stockPrice'>" + stockPrice + "</span><br /></b><span class='stockName'>" + stockName + ")</span><br /><i><span class='stockSector'>" + stockSector  + "</span></p>");
        //     }
            
        //}
    }
    $.ajax({
        type: "POST",
        url: url,
        success: success,
        dataType: 'json'
    });

})