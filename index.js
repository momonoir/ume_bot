'use strict';
const app = require('./app.js');
const Twitter = require('twitter');
const cron = require('cron').CronJob;
const moment = require('moment');

const useMoment = {
  date: function() {
    let date = moment().utc().add(9, 'h').format('YYYY/MM/DD HH:mm');
    return date;
  },
  time: function() {
    let time = moment().utc().add(9, 'h').format('HH時mm分');
    return time;
  }
}

const client = new Twitter({
  consumer_key: app.get('options').key,
  consumer_secret: app.get('options').secret,
  access_token_key: app.get('options').token,
  access_token_secret: app.get('options').token_secret
});

//エラーの時、Promise内の例外の詳細を表示する
process.on('unhandledRejection', console.dir);

const headerMessage = '[うめbot] ';



//bot起動時のツイート
function firstTweet() {
  // date = moment().utc().add(9, 'h').format('YYYY/MM/DD HH:mm');
  let date = useMoment.date();
  client.post('statuses/update', {status: headerMessage + '起動したよ' + ' (' + date + ')'
  })
  .then((tweet) => {
      console.log(tweet);
  })
  .catch((error) => {
      throw error;
  });
}

//時報ツイートを投稿
function postTweet() {
  //let time = moment().utc().add(9, 'h').format('HH時mm分');
  let time = useMoment.time();
  client.post('statuses/update', {status: headerMessage + 'じほー：' + time + 'をお知らせしまーす'
  })
  .then((tweet) => {
      console.log(tweet);
  })
  .catch((error) => {
      throw error;
  });
}

//こうめ本垢へアラームツイートをする
function alarmClockTweet() {
  //let time = moment().utc().add(9, 'h').format('HH時mm分')
  let time = useMoment.time();
  const alarmClockMessage = '@umeume888 ' + headerMessage + time +'ですよー';
  client.post('statuses/update', {status: alarmClockMessage
  })
  .then((tweet) => {
      console.log(tweet);
  })
  .catch((error) => {
      throw error;
  });
}

const cronJob1 = new cron({
    cronTime: '00 00 9-20 * * *', // 9時から18時まで1時間ごとに実行
    start: true, // newした後即時実行するかどうか
    onTick: function() {
        postTweet();
    },
    timeZone: 'Asia/Tokyo'
});

const cronJob2 = new cron({
    cronTime: '00 00 08 * * *', // 毎朝8時に実行
    start: true, // newした後即時実行するかどうか
    onTick: function() {
        alarmClockTweet();
    },
    timeZone: 'Asia/Tokyo'
});

console.log('起動しました');
firstTweet();
