// Modal Autocomplete list
$(document).ready(function(){
    var url = '/api_all_stocks';
    
    console.log('Check');
            
    // Accesses our stock database and fills the dropdown
    var success = function(res){
        console.log(res, 'got a response')
        var stockData = res.stocks;
        var stockDataLen = stockData.length;
        console.log(stockDataLen);
        for (var i = 0; i < 10; i++) {
            var stockSymbol = stockData[i].stock_symbol;
            var stockName = stockData[i].stock_symbol;
            var stockPrice = stockData[i].current_price;
            $('#managementTable').append('<td>' + stockSymbol + '</td><td>' + '<tr><td>' + stockName + '</td><td>' + stockPrice + '</td><br />');

        }
    
    }
    $.ajax({
        type: 'POST',
        url: url,
        success: success,
        dataType: 'json'
    });

})