import { openDB } from 'idb';

// demo2: add some data into db1/store1/
const Demo2 = () => {
    const onClick = async () => {
        const db1 = await openDB('db1', 1);
        db1.add('store1', 'hello world', 'message');
        db1.add('store1', true, 'delivered');
        db1.close();
    }
    return <button onClick={onClick}>demo2</button>
}

export default Demo2;