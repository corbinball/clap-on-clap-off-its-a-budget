let db;

let clapOnOffVersion;


const request = indexedDB.open("Clap on off budget Database", 1);

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


function checkDatabase() {
    console.log('Checking ClapMondey db');
  
    let transaction = db.transaction(['ClapMoney'], 'readwrite');
  
    const store = transaction.objectStore('ClapMoney');
  
    const getAll = store.getAll();
  
    getAll.onsuccess = function () {
      if (getAll.result.length > 0) {
        fetch('/api/transaction/bulk', {
          method: 'POST',
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.length !== 0) {
              transaction = db.transaction(['ClapMoney'], 'readwrite');
  
              const currentStore = transaction.objectStore('ClapMoney');
  
              currentStore.clear();
              console.log('Clearing ClapMoney');
            }
          });
      }
    };
  };

  request.onsuccess = function (e) {
    console.log('its a success');
    db = e.target.result;
  
    
    if (navigator.onLine) {
      console.log('Backend is online');
      checkDatabase();
    }
  };

  const saveRecord = (record) => {
    console.log('Saveing records...');

    const transaction = db.transaction(['ClapMoney'], 'readwrite');
  
    const store = transaction.objectStore('ClapMoney');
  
    store.add(record);
  };
  
  window.addEventListener('online', checkDatabase);