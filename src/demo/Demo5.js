import { openDB } from 'idb';

// demo5：获取值
const Demo5 = () => {
    const onClick = async () => {
        const db2 = await openDB('db2', 1);
        // retrieve by key:
        db2.get('store3', 'cat001').then(console.log);
        // retrieve all:
        db2.getAll('store3').then(console.log);
        // count the total number of items in a store:
        db2.count('store3').then(console.log);
        // get all keys:
        db2.getAllKeys('store3').then(console.log);
        db2.close();
    }
    return <button onClick={onClick}>demo5</button>
}

export default Demo5;