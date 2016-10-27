'use strict';

const Twit = require('twit');
const moment = require('moment');
const request = require('request');
require('dotenv').config();

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

T.get('search/tweets', { q: 'from:justgrimes since:'+moment().format('YYYY-MM-DD') }, function(err, data, response) {
  if (data.statuses.length === 0) {
    request.post('https://justgrimes.review/api/rate/1', function (e, r, body) {
      console.log(body);
    });
  } else {
    request.post('https://justgrimes.review/api/rate/5');
  }
});
