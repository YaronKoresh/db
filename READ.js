const fs = require("fs");

module.exports.LAST_ROW = function(file){
	var cont1 = fs.readFileSync(file, 'utf8')
	if (cont1 != undefined) {
		var cont2 = cont1.split(/\n|\r/);
		var last = cont2.length - 1;
		return cont2[last]
	} else {
		return undefined
	}
}

module.exports.DIRECTORY = function(dir){
	dir = dir.replace(/(\/)$/,"");
	var out = [];
	fs.readdirSync(dir).forEach(function (fileName) {
		out.push(
			fs.readFileSync(dir + '/' + fileName, 'utf8')
		);
	})
	return out;
}

module.exports.NAMES = function(dir){
	dir = dir.replace(/(\/)$/,"");
	var out = [];
	fs.readdirSync(dir).forEach(function (fileName) {
		out.push(fileName);
	})
	return out;
}

module.exports.FILE = function(file){
	try {
		return fs.readFileSync(file, 'utf8')
	} catch (e) {
		return undefined
	}
}

module.exports.ROWS = function(file){
	try {
		var f = fs.readFileSync(file, 'utf8');
	} catch (e) {
		console.log(e);
		return undefined
	}
	if(typeof f != "undefined"){
		f = f.split(/\r\n|\n\r|\n|\r/);
	}
	return f;
}
