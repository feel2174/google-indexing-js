var request = require("request");
var { google } = require("googleapis");
var key = require("./service_account.json");

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"],
  null
);


jwtClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }
  let options = {
    url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    auth: { "bearer": tokens.access_token },
    json: {
      "url": "https://zucca100.com/123",
      "type": "URL_UPDATED"
    }
  };
  request(options, function (error, response, body) {
    // Handle the response
    console.log(response.statusCode)
    console.log(body);

  });
});