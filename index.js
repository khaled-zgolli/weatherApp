const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');

app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){

    res.sendFile(__dirname+'/index.html');

});

app.post('/',function(req,res){

    const querry=req.body.city;
    const apiKey='e688895fba874b24eed83c6a4b6e4379';
    const units='metric';
    const url=('https://api.openweathermap.org/data/2.5/weather?q='+querry+'&appid='+apiKey+'&units='+units);

    https.get(url,function(response){
        response.on('data',function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const main=weatherData.weather[0].main;
            const weatherIcon='http://openweathermap.org/img/wn/'+weatherData.weather[0].icon+'@2x.png';
            res.write('<p>The weather is currently '+main+' </p>');
            res.write('<h1>the temperature in '+querry+' is '+temp+'</h1>');
            res.write('<img src='+weatherIcon+'>');
            res.send();

        });
    });

});














app.listen(3000,function(){
    console.log('serveur started');
});