//Autocomplete list
$(document).ready(function(){
    var url = '/api_all_stocks';

    console.log('Check');


    // Accesses our stock database and fills the dropdown
    var success = function(res){
        console.log(res, 'got a response')
        var stockData = res.stocks;
        var stockDataLen = stockData.length;
        console.log(stockDataLen);
        for (var i = 0; i < stockDataLen; i++) {
            var stockSymbol = stockData[i].stock_symbol;
            var stockName = stockData[i].stock_name;
            var stockSector = stockData[i].sector;
            var stockPrice = stockData[i].current_price;
            $('#stockList').append('<tr> <td>' + (i + 1) + '</td> <td>' + stockSymbol + '</td><td>' + stockName + '</td><td>' + stockSector + '</td><td>' + stockPrice + '</td><br /></tr>');

        }



    }
    $.ajax({
        type: 'POST',
        url: url,
        success: success,
        dataType: 'json'
    });


})

