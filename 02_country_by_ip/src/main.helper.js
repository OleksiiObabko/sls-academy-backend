const {createReadStream} = require("fs");
const csvParser = require("csv-parser");

module.exports = {
	ipToInteger: (ip) => {
		const [octet1, octet2, octet3, octet4] = ip.split(".");

		return ((parseInt(octet1) << 24) >>> 0)
			+ ((parseInt(octet2) << 16) >>> 0)
			+ ((parseInt(octet3) << 8) >>> 0)
			+ (parseInt(octet4) >>> 0);
	},
	getCountry: (integerIp) => {
		return new Promise((resolve, reject) => {
			console.log(process.cwd());
			createReadStream(process.cwd() + "/src/IP2LOCATION-LITE-DB1.CSV")
				.pipe(csvParser({delimiter: ","}))
				.on("data", (r) => {
					const from = parseInt(r["0"]);
					const to = parseInt(r["16777215"]);

					if (integerIp >= from && integerIp <= to) {
						const country = r["-"]
						resolve(country);
					}
				})
				.on("end", () => {
					reject({message: "Country not found", status: 404})
				})
				.on('error', (error) => {
					reject(error);
			});
		});
	},
};
