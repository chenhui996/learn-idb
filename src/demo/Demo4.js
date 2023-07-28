import { openDB } from 'idb';

// demo2: add some data into db1/store1/
const Demo4 = () => {
    const onClick = async () => {
        const db2 = await openDB('db2', 1);
        db2.add('store3', { id: 'cat001', strength: 10, speed: 10 });
        db2.add('store3', { id: 'cat002', strength: 11, speed: 9 });
        db2.add('store4', { id: 'cat003', strength: 8, speed: 12 });
        db2.add('store4', { id: 'cat004', strength: 12, speed: 13 });
        db2.close();
    }
    return <button onClick={onClick}>demo4</button>
}

export default Demo4;