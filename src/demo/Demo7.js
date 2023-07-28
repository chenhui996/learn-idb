import { openDB } from 'idb';

// demo7：将多个操作放在同一个事务中
const Demo7 = () => {
    const onClick = async () => {
        const db2 = await openDB('db2', 1);
        // open a new transaction, declare which stores are involved:
        let transaction = db2.transaction(['store3', 'store4'], 'readwrite'); // readwrite or readonly, default is readonly
        // do multiple things inside the transaction, if one fails all fail:
        let superCat = await transaction.objectStore('store3').get('cat001');
        transaction.objectStore('store3').delete('cat001');
        transaction.objectStore('store4').add(superCat);
        db2.close();
    }
    return <button onClick={onClick}>demo7</button>
}

export default Demo7;

// 同一个store同时只能执行一个readwrite的事务，期间store会被锁定