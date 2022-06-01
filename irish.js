var https = require('follow-redirects').https;
var fs = require('fs');
var events = require('events');

let irish = {}

irish.ev = new events.EventEmitter();

irish.map = {}


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
                console.log(body.toString())
                if(JSON.parse(body.toString()) != undefined && JSON.parse(body.toString()).slots != undefined)
                    resolve(JSON.parse(body.toString()).slots.length);
                else
                    resolve(-1);
            });
            res.on("error", function (error) {
                reject(error);
            });
        });
        req.end();
    });
}

update = async()=>{
    
    let newmap = {};
    for (let i=0;i<7;i++) {
        date = new Date();
        date.setDate(date.getDate() + i);
        newmap[date.toISOString().slice(0, 10)] = await irish.countAvailableTables(8, date);
    }
    for (let key in newmap) {
        if(irish.map[key] != null && newmap[key] != irish.map[key]) {
            irish.ev.emit("change", {date:new Date(key), number:newmap[key]});
        }
    }
    irish.map = newmap;
    irish.ev.emit("update", irish.map);
}
update()

setInterval(update, process.env.IRISH_UPDATE_INTERVAL)



module.exports = irish;