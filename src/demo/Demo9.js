import { openDB } from 'idb';

function generate100cats() {
    return new Array(100).fill().map((item, index) => {
        let id = 'cat' + index.toString().padStart(3, '0');
        let strength = Math.round(Math.random() * 100);
        let speed = Math.round(Math.random() * 100);
        return { id, strength, speed };
    });
}

// demo9：创建db和store（2）
const Demo9 = () => {
    const onClick = async () => {
        const db3 = await openDB('db3', 1, {
            upgrade: (db, oldVersion, newVersion, transaction) => {
                if (oldVersion === 0) upgradeDB3fromV0toV1();

                function upgradeDB3fromV0toV1() {
                    db.createObjectStore('moreCats', { keyPath: 'id' });
                    generate100cats().forEach(cat => {
                        transaction.objectStore('moreCats').add(cat);
                    });
                }
            },
        });
        db3.close();
    }
    return <button onClick={onClick}>demo9</button>
}

export default Demo9;

// upgrade回调函数是创建/删除store的唯一途径。