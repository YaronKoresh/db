// ../_tools_/src/back/Write.js
import fs from "fs";
var Directory = function(dir) {
  dir = dir.toString();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
var Over = function(fileName, content) {
  fs.writeFileSync(fileName, content.toString());
};
var Remove = function(path) {
  if (!(process.env && process.env.DB)) {
    throw new Error(`process.env.DB is not defined`);
  }
  fs.rmSync(path, { recursive: true, force: true });
};

// ../_tools_/src/back/Read.js
import fs2 from "fs";
var Names = function(dir) {
  dir = dir.replace(/(\/)$/, "");
  var out = [];
  fs2.readdirSync(dir).forEach(function(fileName) {
    out.push(fileName);
  });
  return out;
};
var File = function(file) {
  try {
    return fs2.readFileSync(file, "utf8");
  } catch (e) {
    return void 0;
  }
};

// ../_tools_/src/back/Database.js
import process2 from "process";
var Latest = function(db = "*", filters = {}, days = null, identifierKey = "id") {
  if (!(process2.env && process2.env.DB)) {
    throw new Error(`process.env.DB is not defined`);
  }
  if (db == "*") {
    let ret = {};
    Names(process2.env.DB).map((currentDb) => {
      ret[currentDb] = Latest(currentDb, filters, days, identifierKey);
    });
    return ret;
  } else if (Array.isArray(db)) {
    let ret = {};
    db.map((currentDb) => {
      ret[currentDb] = Latest(currentDb, filters, days, identifierKey);
    });
    return ret;
  }
  let latest = [];
  let ids = [];
  _Get(db).map(function(item) {
    let id = item.data[identifierKey];
    let index = ids.indexOf(id);
    if (index == -1) {
      ids.push(id);
      latest.push(item);
    } else {
      let latestIndex = latest.map((obj) => obj.data[identifierKey]).indexOf(id);
      if (+latest[latestIndex].timestamp < +item.timestamp) {
        latest[latestIndex] = item;
      }
    }
  });
  var keys = Object.keys(filters);
  var values = Object.values(filters);
  let time_s = days == null ? 0 : Date.parse(new Date(timestamp - 864e5 * days).toISOString());
  latest = latest.filter((obj) => +obj.timestamp >= time_s).filter(function(obj) {
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = values[i];
      if (!(typeof obj.data[key] != "undefined" && obj.data[key] == value)) {
        return false;
      }
    }
    return true;
  });
  return latest.map((item) => item.data);
};
var ForceHistoryCleanUpForEach = function(identifierKey = "id") {
  if (!(process2.env && process2.env.DB)) {
    throw new Error(`process.env.DB is not defined`);
  }
  Names(process2.env.DB).map((dirName) => ForceHistoryCleanUp(dirName, identifierKey));
};
var ForceHistoryCleanUp = function(db, identifierKey = "id") {
  if (!(process2.env && process2.env.DB)) {
    throw new Error(`process.env.DB is not defined`);
  }
  const latest = Latest(db, {}, null, identifierKey);
  Remove(`${process2.env.DB}/${db}`);
  latest.map((obj) => Set(db, obj, obj.timestamp));
};
var Set = function(db, data, tst = null) {
  if (!(process2.env && process2.env.DB)) {
    throw new Error(`process.env.DB is not defined`);
  }
  const timestamp2 = tst == null ? Date.parse((/* @__PURE__ */ new Date()).toISOString()) : Date.parse(new Date(parseInt(tst)).toISOString());
  Directory(`${process2.env.DB}/${db}/${timestamp2}/`);
  const keys = Object.keys(data);
  const files = keys.map(function(key) {
    return `${process2.env.DB}/${db}/${timestamp2}/` + key;
  });
  const values = Object.values(data);
  for (let i = 0; i < files.length; i++) {
    Over(files[i], JSON.stringify(values[i]));
  }
};
var _Get = function(db, filters = {}, days = null) {
  if (!(process2.env && process2.env.DB)) {
    throw new Error(`process.env.DB is not defined`);
  }
  const timestamp2 = Date.parse((/* @__PURE__ */ new Date()).toISOString());
  let time_s = days == null ? 0 : Date.parse(new Date(timestamp2 - 864e5 * days).toISOString());
  var folders = null;
  try {
    folders = Names(`${process2.env.DB}/${db}/`).filter((tm) => +tm >= time_s).map((tm) => `${process2.env.DB}/${db}/` + tm + "/");
  } catch (e) {
    return [];
  }
  var keys = Object.keys(filters);
  var values = Object.values(filters);
  keys.map(function(key, index) {
    folders = folders.filter(
      function(folder) {
        return Names(folder).includes(key);
      }
    ).filter(
      function(folder) {
        return JSON.parse(File(folder + key)) == values[index];
      }
    );
  });
  return folders.map(function(folder) {
    var folderSplit = folder.split("/");
    var folderName = folderSplit[folderSplit.length - 2];
    var time = new Date(parseInt(folderName)).toGMTString();
    var data = {};
    var temp = Names(folder).map((key) => {
      data[key] = JSON.parse(File(folder + key));
    });
    return {
      timestamp: folderName,
      time,
      data
    };
  }).reverse();
};
var Get = function(db, filters = {}, days = null) {
  if (!(process2.env && process2.env.DB)) {
    throw new Error(`process.env.DB is not defined`);
  }
  const timestamp2 = Date.parse((/* @__PURE__ */ new Date()).toISOString());
  let time_s = days == null ? 0 : Date.parse(new Date(timestamp2 - 864e5 * days).toISOString());
  var folders = null;
  try {
    folders = Names(`${process2.env.DB}/${db}/`).filter((tm) => +tm >= time_s).map((tm) => `${process2.env.DB}/${db}/` + tm + "/");
  } catch (e) {
    return [];
  }
  var keys = Object.keys(filters);
  var values = Object.values(filters);
  keys.map(function(key, index) {
    folders = folders.filter(
      function(folder) {
        return Names(folder).includes(key);
      }
    ).filter(
      function(folder) {
        return JSON.parse(File(folder + key)) == values[index];
      }
    );
  });
  return folders.map(function(folder) {
    var folderSplit = folder.split("/");
    var folderName = folderSplit[folderSplit.length - 2];
    var time = new Date(parseInt(folderName)).toGMTString();
    var data = {};
    var temp = Names(folder).map((key) => {
      data[key] = JSON.parse(File(folder + key));
    });
    return data;
  }).reverse();
};
export {
  ForceHistoryCleanUp,
  ForceHistoryCleanUpForEach,
  Get,
  Latest,
  Set
};
