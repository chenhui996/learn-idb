import { openDB } from 'idb';

// demo12：创建索引
const Demo12 = () => {
    const onClick = async () => {
        const db3 = await openDB('db3', 4, {
            upgrade: (db, oldVersion, newVersion, transaction) => {
                // upgrade to v4 in a less careful manner:
                const store = transaction.objectStore('moreCats');
                store.createIndex('strengthIndex', 'strength');
            },
        });
        db3.close();
    }
    return <button onClick={onClick}>demo12</button>
}

export default Demo12;

// upgrade事件是创建索引的唯一途径，因此我们将不得不把db3升级到版本4。
// 加一个索引相当于把store以不同的’keyPath’复制一次。该副本是按这个key排序的，如同原store按主键排序一样。