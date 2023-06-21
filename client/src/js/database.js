import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    await tx.objectStore('jate').add({ content: content });
    console.log('Data added to the jate database');
  };
  
  export const getDb = async () => {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const data = await tx.objectStore('jate').getAll();
    console.log('Data fetched from the jate database');
    return data.length > 0 ? data[data.length - 1].content : '';
  };
  
  initdb();