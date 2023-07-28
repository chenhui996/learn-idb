import { openDB } from 'idb';

// demo17：在索引和区间上使用游标
const Demo17 = () => {
    const onClick = async () => {
        const db3 = await openDB('db3', 4);

        let store = db3.transaction('moreCats').store;

        // create a cursor on a very small range:
        const range = IDBKeyRange.bound('cat042', 'cat045');

        let cursor1 = await store.openCursor(range);

        // loop over the range:
        while (true) {
            console.log('cursor1.key: ', cursor1.key);
            cursor1 = await cursor1.continue();
            if (!cursor1) break;
        }

        console.log('------------');

        // create a cursor on an index:
        let index = db3.transaction('moreCats').store.index('strengthIndex');

        let cursor2 = await index.openCursor();

        // cursor.key will be the key of the index:
        console.log('cursor2.key:', cursor2.key);

        // the primary key will be located in cursor.primaryKey:
        console.log('cursor2.primaryKey:', cursor2.primaryKey);

        // it's the first item in the index, so it's a cat with strength 0
        console.log('cursor2.value:', cursor2.value);

        db3.close();
    }
    return <button onClick={onClick}>demo17</button>
}

export default Demo17;