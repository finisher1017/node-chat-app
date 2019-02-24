// Jan 1st 1970 00:00:00 am
// 1000 = Jan 1st 1970 00:00:01 am
// 10000 = Jan 1st 1970 00:00:10 am
var moment = require('moment');

// var date = moment();
// date.subtract(100, 'year')
// console.log(date.format('MMM Do YYYY'))
// var date = new Date();
// console.log(date.getMonth());

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'))