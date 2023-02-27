const fs = require("fs");

module.exports.DIRECTORY = function(dir) {
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir, { recursive: true });
	}
}

module.exports.OVER = function(fileName, content) {
	fs.writeFileSync(fileName, content)
}

module.exports.INTO = function(fileName, content) {
	try {
		content = fs.readFileSync(fileName,'utf8') + '\n' + content;
	} catch (e) {
	}
	fs.writeFileSync(fileName, content)
}
