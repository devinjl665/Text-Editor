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

// Function to save content to the database
export const putDb = async (content) => {
  console.log("Save to the database!");

  // Open a connection to the 'jate' database with version 1
  const textDB = await openDB('jate', 1);

  // Create a read-write transaction for the 'jate' object store
  const tx = textDB.transaction('jate', 'readwrite');

  // Open the 'jate' object store
  const store = tx.objectStore('jate');

  // Put the content into the store
  const request = store.put({ content });

  // Wait for the put operation to complete
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database

// Function to get all content from the database
export const getDb = async () => {
  console.log('Get stuff from the database');

  // Open a connection to the 'jate' database with version 1
  const textDB = await openDB('jate', 1);

  // Create a read-only transaction for the 'jate' object store
  const tx = textDB.transaction('jate', 'readonly');

  // Open the 'jate' object store
  const store = tx.objectStore('jate');

  // Get all the data from the store
  const request = store.getAll();

  // Wait for the getAll operation to complete
  const result = await request;

  console.log('result.value', result);

  return result;
};



initdb();
