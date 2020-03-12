const csv = require('csv-parser');
const fs = require('fs');

let dataset1 = [];

fs.createReadStream('teste.csv')
.pipe(csv())
.on('data', (row) => {
	dataset1 += row;
})
.on('end', () => {
	console.log(dataset1);
	console.log('CSV file successfully processed');
});