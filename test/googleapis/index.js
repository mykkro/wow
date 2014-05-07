var googleapis = require('googleapis');

googleapis
    .discover('urlshortener', 'v1')
    .discover('plus', 'v1')
    .execute(function(err, client) {
  var params = { shortUrl: 'http://goo.gl/DdUKX' };
  var req1 = client.urlshortener.url.get(params);
  req1.execute(function (err, response) {
    console.log('Long url is', response.longUrl);
  });

  var req2 = client.plus.people.get({ userId: '+burcudogan' });
  req2.execute();
});