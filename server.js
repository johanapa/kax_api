const fetch = require('node-fetch');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/products/coop", (req, res, next) => {
    var coopUrl = 'https://www.coop.se/api/ecommerce/product/search?query=ost&pageSize=900&page=0';
    fetch(coopUrl)
        .then(res => res.json())
        .then(json => res.json(json));
});

app.get("/products_ica", (req, res, next) => {
    // affärer (xml), http://api.ica.se/api/stores/search?Filters&Phrase=nyk%C3%B6ping

    const storeId = '09718';
    const requestType = 'ajax';
    const q = 'ost';
    const n = '4294868433';
    const sFlag = true;
    const baseUrl = 'https://www.ica.se/handla/_includes/header/searchEndecaFlyout.jsp?collection=/content/Web/DimSearchLatin&';
    const icaUrl = `${baseUrl}icaRequestType=${requestType}&currentStoreid=${storeId}&Ntt=${q}*&Dy=1&Nty=1&N=${n}&searchFlag=${sFlag}`;

    
    fetch(icaUrl)
        .then(res => res.json())
        .then(json => res.json(json));
});

console.log('todo list RESTful API server started on: ' + port);