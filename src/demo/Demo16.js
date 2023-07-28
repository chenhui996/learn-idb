import { openDB } from 'idb';

// demo16：使用游标进行遍历
const Demo16 = () => {
    const onClick = async () => {
        const db3 = await openDB('db3', 4);

        // open a 'readonly' transaction:
        let store = db3.transaction('moreCats').store;
        // create a cursor, inspect where it's pointing at:
        let cursor = await store.openCursor();

        console.log('cursor.key: ', cursor.key);
        console.log('cursor.value: ', cursor.value);

        // move to next position:
        cursor = await cursor.continue();
        // inspect the new position:
        
        console.log('cursor.key: ', cursor.key);
        console.log('cursor.value: ', cursor.value);

        // keep moving until the end of the store
        // look for cats with strength and speed both greater than 8
        while (true) {
            const { strength, speed } = cursor.value;
            if (strength >= 8 && speed >= 8) {
                console.log('found a good cat! ', cursor.value);
            }
            cursor = await cursor.continue();
            if (!cursor) break;
        }
        db3.close();
    }
    return <button onClick={onClick}>demo16</button>
}

export default Demo16;