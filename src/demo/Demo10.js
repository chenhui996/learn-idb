import { openDB } from 'idb';

function generate100cats() {
    return new Array(100).fill().map((item, index) => {
        let id = 'cat' + index.toString().padStart(3, '0');
        let strength = Math.round(Math.random() * 100);
        let speed = Math.round(Math.random() * 100);
        return { id, strength, speed };
    });
}

// demo10：同时处理版本0->2和1->2的升级
const Demo10 = () => {
    const onClick = async () => {
        const db3 = await openDB('db3', 2, {
            upgrade: (db, oldVersion, newVersion, transaction) => {
                switch (oldVersion) {
                    case 0:
                        upgradeDB3fromV0toV1();
                    // falls through
                    case 1:
                        upgradeDB3fromV1toV2();
                        break;
                    default:
                        console.error('unknown db version');
                }

                function upgradeDB3fromV0toV1() {
                    db.createObjectStore('moreCats', { keyPath: 'id' });
                    generate100cats().forEach(cat => {
                        transaction.objectStore('moreCats').add(cat);
                    });
                }

                function upgradeDB3fromV1toV2() {
                    db.createObjectStore('userPreference');
                    transaction.objectStore('userPreference').add(false, 'useDarkMode');
                    transaction.objectStore('userPreference').add(25, 'resultsPerPage');
                }
            },
        });
        db3.close();
    }
    return <button onClick={onClick}>demo10</button>
}

export default Demo10;