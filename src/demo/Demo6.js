import { openDB } from 'idb';

// demo6：设置值 db.put()
const Demo6 = () => {
    const onClick = async () => {
        // set db1/store1/delivered to be false:
        const db1 = await openDB('db1', 1);
        db1.put('store1', false, 'delivered');
        db1.close();
        // replace cat001 with a supercat:
        const db2 = await openDB('db2', 1);
        db2.put('store3', { id: 'cat001', strength: 99, speed: 99 });
        db2.close();
    }
    return <button onClick={onClick}>demo6</button>
}

export default Demo6;