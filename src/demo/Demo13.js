import { openDB } from 'idb';

// demo13：按照索引键从索引中取值
const Demo13 = () => {
    const onClick = async () => {
        const db3 = await openDB('db3', 4);

        const transaction = db3.transaction('moreCats');
        const strengthIndex = transaction.store.index('strengthIndex');

        // get all entries where the key is 10:
        let strongestCats = await strengthIndex.getAll(10);
        console.log('strongest cats: ', strongestCats);

        // get the first entry where the key is 10:
        let oneStrongCat = await strengthIndex.get(10);
        console.log('a strong cat: ', oneStrongCat);

        db3.close();
    }
    return <button onClick={onClick}>demo13</button>
}

export default Demo13;

// demo13在一个事务里执行了两个操作。您也可以用单操作事务包装方法：db.getFromIndex()和db.getAllFromIndex()，省得使用transaction对象去操作。