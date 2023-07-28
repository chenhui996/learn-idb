import { openDB } from 'idb';

function generate100cats() {
    return new Array(100).fill().map((item, index) => {
        let id = 'cat' + index.toString().padStart(3, '0');
        let strength = Math.round(Math.random() * 10);
        let speed = Math.round(Math.random() * 10);
        return { id, strength, speed };
    });
}

// demo11：没有schema变更的版本升级
const Demo11 = () => {
    const onClick = async () => {
        const db3 = await openDB('db3', 3, {
            upgrade: async (db, oldVersion, newVersion, transaction) => {
                switch (oldVersion) {
                    case 0:
                        upgradeDB3fromV0toV1();
                    // falls through
                    case 1:
                        upgradeDB3fromV1toV2();
                    // falls through
                    case 2:
                        await upgradeDB3fromV2toV3();
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
                async function upgradeDB3fromV2toV3() {
                    const store = transaction.objectStore('userPreference');
                    store.put('English', 'language');
                    store.delete('resultsPerPage');
                    let colorTheme = 'automatic';
                    let useDarkMode = await store.get('useDarkMode');
                    if (oldVersion === 2 && useDarkMode === false) colorTheme = 'light';
                    if (oldVersion === 2 && useDarkMode === true) colorTheme = 'dark';
                    store.put(colorTheme, 'colorTheme');
                    store.delete('useDarkMode');
                }
            },
        });
        db3.close();
    }
    return <button onClick={onClick}>demo11</button>
}

export default Demo11;

// 译注：即，只有db和store的增删被视为schema变更，store里面的实体结构（属性）变更不是schema变更。
// upgrade：记住，只有当用户浏览器中的db版本低于openDB()中指定的版本时才会触发。