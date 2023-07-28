import { openDB } from 'idb';

// demo1: 创建db和store
const Demo1 = () => {
    const onClick = () => {
        openDB('db1', 1, {
            upgrade(db) {
                db.createObjectStore('store1');
                db.createObjectStore('store2');
            },
        });
        openDB('db2', 1, {
            upgrade(db) {
                db.createObjectStore('store3', { keyPath: 'id' });
                db.createObjectStore('store4', { autoIncrement: true });
            },
        });
    }
    return <button onClick={onClick}>demo1</button>
}

export default Demo1;