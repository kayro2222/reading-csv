const csv = require('csv-parser');
const fs = require('fs');

let dataset1 = [];
let dataset2 = [];

main();

async function main() {
	await readFile('dataset1.csv');
	await readFile('dataset2.csv');

	console.log(dataset1);
console.log(dataset2);
}

async function readFile(file) {
	var temp = [];
	fs.createReadStream(file)
		.pipe(csv())
		.on('data', (row) => {
			if (file.includes('set1')) {
				dataset1.push(row);
			}
			if (file.includes('set2')) {
				dataset2.push(row);
			}
		})
		.on("end", function () {
			console.log("We are done!")
		});
		
}

