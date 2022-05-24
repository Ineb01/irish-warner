const irish = require("./irish-web");

irish.countAvailableTables(8, new Date("2022-06-01")).then(data => {
    console.log(data);
});