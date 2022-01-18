let db;

let clapOnOffVersion;


const request = indexedDB.open("Clap off Database", 1);

request.onupgradeneeded = function (e) {
  console.log(request.result.name);

let newVersion = e.newVersion || db.version;

console.log(`Clap on, Clap off updated to ${newVersion}`);

db = e.target.result;

if (db.objectStoreNames.length ===0){
    db.createObjectStore('ClapMoney', {autoIncrement: true});
}

};

request.onerror = function (e) {
    console.log(`Error: ${e.target.errorCode}`);
};


