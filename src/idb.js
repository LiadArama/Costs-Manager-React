const idb = {
  openCostsDB: async (dbName, version) => {
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

  addCost: async (db, costData) => {
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

  getAllCosts: async (db) => {
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

  deleteCost: async (db, id) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("costs", "readwrite");
      const store = transaction.objectStore("costs");

      // eslint-disable-next-line no-unused-vars
      const request = store.delete(id);

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = (event) => {
        reject(event.target.error);
      };
    });
  },
};

export default idb;
