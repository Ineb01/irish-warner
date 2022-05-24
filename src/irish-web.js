var https = require('follow-redirects').https;
var fs = require('fs');


let irish = {}

irish.url = "https://reservation.dish.co/rest/v1/hydra/establishment/253065/slots"
irish.countAvailableTables = async (seats, date) => {
    return new Promise((resolve, reject) => {
        var req = https.request(`${irish.url}?capacity=${seats}&date=${date.toISOString().slice(0, 10)}`, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                resolve(JSON.parse(body.toString()).slots.length);
            });
            res.on("error", function (error) {
                reject(error);
            });
        });
        req.end();
    });
}



module.exports = irish;