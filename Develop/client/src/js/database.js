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
  try{
    console.log ('PUT to databse');
    const textDB = await openDB('jate', 1);
    const tx = textDB.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put(content);
    await tx.done;

    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('Unable to add content to database:', error); 
  }  
};
       
// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {
  try{
    console.log('GET all from database');
    const allTextDB = await openDB('jate', 1);
    const allTx = allTextDB.transaction('jate', 'readonly');
    const store = allTx.objectStore('jate');
    const content = await store.getAll();
    await allTx.done;

    console.log('All content retrieved from database:', content);
    return content;
  } catch (error) {
    console.log('Unable to retrieve content from database:', error);
    return [];
  }
};

initdb();
