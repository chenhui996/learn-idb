import { openDB } from 'idb';

// demo14：用单操作事务包装方法从索引中取值
const Demo14 = () => {
    const onClick = async () => {
        const db3 = await openDB('db3', 4);
        
        // do similar things as demo13, but use single-action transaction shortcuts:
        let weakestCats = await db3.getAllFromIndex('moreCats', 'strengthIndex', 0);
        console.log('weakest cats: ', weakestCats);

        let oneWeakCat = await db3.getFromIndex('moreCats', 'strengthIndex', 0);
        console.log('a weak cat: ', oneWeakCat);
        
        db3.close();
    }
    return <button onClick={onClick}>demo14</button>
}

export default Demo14;