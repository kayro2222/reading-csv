const csv = require('csv-parser');
const fs = require('fs');

let dataset1 = [];
let dataset2 = [];
let fullObject = [];
let speed;

main();

async function main() {
	await readFile('dataset1.csv');
	await readFile('dataset2.csv');

	await mergeObjects(dataset1, dataset2);
}

async function readFile(file) {
	var temp = [];
	await fs.createReadStream(file)
	.pipe(csv())
	.on('data', (row) => {
		if (file.includes('set1')) {
			dataset1.push(row);
		}
		if (file.includes('set2')) {
			dataset2.push(row);
		}
	});
}

function mergeObjects(dataset1, dataset2){
	setTimeout(() => {
		fullObject = dataset1.map((item, i) => Object.assign({}, item, dataset2[i]));

		calculateSpeed(fullObject);
	}, 1000);
}

function calculateSpeed(fullObject){
	let temp = [];
	let g = Math.pow(9.8, 2);

	fullObject.filter(data => {
		if(data.STANCE == 'bipedal'){
			temp.push({
				name: data.NAME, 
				speed: ((data.STRIDE_LENGTH / data.LEG_LENGTH) - 1) * Math.sqrt(data.LEG_LENGTH * g)
			});
		}
	});

	let result = temp.sort((a, b) => {
		return b.speed - a.speed;
	});

	let writeFile = '';
	result.filter(data => {
		writeFile += data.name+'\n';
	});

	fs.writeFile('output.txt', writeFile, function (err) {
		if (err){
			return console.log(err);
		}else{
			console.log('File has been created.');
		}
	});
}
