const idb = {
  openCostsDB:  (dbName, version) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("costs")) {
          db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  },

  addCost:  (db, costData) => {
    costData.timestamp = new Date().toISOString(); // Add timestamp
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("costs", "readwrite");
      const store = transaction.objectStore("costs");
      const request = store.add(costData);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  },

  getAllCosts:  (db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("costs", "readonly");
      const store = transaction.objectStore("costs");
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  },
};

export default idb;
