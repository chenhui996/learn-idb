import { openDB } from 'idb';

// demo2: add some data into db1/store1/
const Demo3 = () => {
    const onClick = async () => {
        const db1 = await openDB('db1', 1);
        db1
            .add('store1', 'hello again!!', 'new message')
            .then(result => {
                console.log('success!', result);
            })
            .catch(err => {
                console.error('error: ', err);
            });
        db1.close();
    }
    return <button onClick={onClick}>demo3</button>
}

export default Demo3;

// db.clear(storeName)
// db.delete(storeName, keyName)