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

// TODO: Add logic to a method that accepts some content and adds it to the database

export const putDb = async (content) => {
  
  console.log("Save to the database!");

  const textDB = await openDB('jate', 1); // create connection

  const tx = textDB.transaction('jate', 'readwrite'); // create transaction and specify database

  const store = tx.objectStore('jate'); // open store

  const request = store.put({ content });

  const result = await request;
  console.log('Data saved to the database', result);
};
// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {
  
  console.log('Get stuff from the database');

  const textDB = await openDB('jate', 1); // create connection

  const tx = textDB.transaction('jate', 'readonly'); // create transaction and specify database

  const store = tx.objectStore('jate'); // open store

  const request = store.getAll(); 

  const result = await request;

  console.log('result.value', result);

  return result;
}; 


initdb();
