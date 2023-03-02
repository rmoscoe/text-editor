import { openDB } from 'idb';

const initdb = async () =>
  openDB('content', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('content')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('content', { keyPath: 'id', autoIncrement: true });
      console.log('content database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB("content", 1);
  const tx = jateDb.transaction("content", "readwrite");
  const store = tx.objectStore("content");
  const request = store.put({content});
  const result = await request;
  return result;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("content", 1);
  const tx = jateDb.transaction("content", "readonly");
  const store = tx.objectStore("content");
  const request = store.getAll();
  const result = await request;
  return result[result.length-1].content;
}

initdb();
