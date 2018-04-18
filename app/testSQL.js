/*var  Sequelize= require('sequelize');   // used to be able to make changes to tables through code
var sequelize = new Sequelize('postgres://david:dhull33@localhost:5432/beatthemarket');
sequelize.authenticate()  .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    */

//https://api.iextrading.com/1.0
let data;

$.ajax({
    type: "GET",
    url: "public/data/GOOG.csv",
    dataType: 'text',
    success: function(response){
        data = $.csv.toObjects(response);
        //console.log(data);
    }
}, function(){
    console.log(data)
}
);





const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [
            "1/17/18",
        "1/18/18",
        "1/19/18",
        "1/22/18",
        "1/23/18",
        "1/24/18",
        "1/25/18",
        "1/26/18",
        "1/29/18",
        "1/30/18"
        ],
        datasets: [{
            //Label: title and appears in tooltips
            label: 'Google',
            data: [1126.219971,
                1131.410034,
                1131.829956,
                1137.48999,
                1159.849976,
                1177.329956,
                1172.530029,
                1175.079956,
                1176.47998,
                1192.020809],
            type: 'line',
            pointRadius: 2,
            fill: false,
            lineTension: 0,
            borderWidth: 2.5,

            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }]
    },
    options: {
        scales:{
            xAxes: [{
                type: 'time',
                distribution: 'series',
                ticks: {
                    source:'labels'
                }
            }],

            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Opening Price of GOOG'
                }
            }]
        }
    }
});

