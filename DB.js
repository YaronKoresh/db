const Write = require("./WRITE.js").OVER;
const Directory = require("./WRITE.js").DIRECTORY;
const Read = require("./READ.js").FILE;
const Names = require("./READ.js").NAMES;

module.exports.SET = function(db, data) {
	const timestamp = parseInt(Date.parse(new Date().toISOString()));
	Directory(`./db/${db}/${timestamp}/`);
	const keys = Object.keys(data);
	const files = keys.map(key=>`./db/${db}/${timestamp}/`+key);
	const values = Object.values(data);
	for (var i = 0; i < files.length; i++) {
		Write(files[i], values[i]);
	}
}
module.exports.GET = function(db, time_s, filters) {
	const timestamp = parseInt(Date.parse(new Date().toISOString()));
	time_s = parseInt(Date.parse(new Date(time_s).toISOString()));
	var folders = null;
	try {
		folders = Names(`./db/${db}/`).filter( tm => +tm >= time_s ).map( tm => `./db/${db}/` + tm + "/" );
	} catch(e) {
		return null
	}
	var keys = Object.keys(filters);
	var values = Object.values(filters);
	var temp = keys.map((key,index)=>{
		folders = folders.filter(
			(folder) => {
				return Names(folder).includes(key)
			}
		).filter(
			(folder) => {
				return Read(folder + key) == values[index]
			}
		)
	});
	return folders.map( (folder) => {
		var folderSplit = folder.split("/");
		var folderName = folderSplit[folderSplit.length-2];
		var time = new Date(parseInt(folderName)).toGMTString();
		var data = {};
		var temp = Names(folder).map( (key) => { data[key] = Read(folder + key) });
		return {
			time: time,
			data: data
		}
	}).reverse();
}
