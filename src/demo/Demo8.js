import { openDB } from 'idb';

// demo8：单store的事务以及错误处理
const Demo8 = () => {
    const onClick = async () => {
        // we'll only operate on one store this time:
        const db1 = await openDB('db1', 1);
        // ↓ this is equal to db1.transaction(['store2'], 'readwrite'):
        let transaction = db1.transaction('store2', 'readwrite');
        // ↓ this is equal to transaction.objectStore('store2').add(..)
        transaction.store.add('foo', 'foo');
        transaction.store.add('bar', 'bar');
        // monitor if the transaction was successful:
        transaction.done
            .then(() => {
                console.log('All steps succeeded, changes committed!');
            })
            .catch(() => {
                console.error('Something went wrong, transaction aborted');
            });
        db1.close();
    }
    return <button onClick={onClick}>demo8</button>
}

export default Demo8;