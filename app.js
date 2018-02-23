'use strict';
const express = require('express');
const app = express();

// 環境変数から Titter アプリケーションのキー等を取得
const options = {
  key: process.env.TWITTER_API_CONSUMER_KEY,
  secret: process.env.TWITTER_API_CONSUMER_SECRET,
  token: process.env.TWITTER_API_ACCESS_TOKEN_KEY,
  token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
};
app.set('options', options);

app.set('port', (process.env.PORT || 8000));

app.get('/', function(request, response) {
  response.send('This is Twitter-bot application.')
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

module.exports = app;
