import { openDB } from 'idb';

// demo15：使用range对象查找满足某些条件的记录
const Demo15 = () => {
    const onClick = async () => {
        const db3 = await openDB('db3', 4);

        // create some ranges. note that IDBKeyRange is a native browser API,
        // it's not imported from idb, just use it:
        const strongRange = IDBKeyRange.lowerBound(8); // strength >= 8
        const midRange = IDBKeyRange.bound(3, 7); // 3 <= strength <= 7
        const weakRange = IDBKeyRange.upperBound(2); // strength <= 2

        let [strongCats, ordinaryCats, weakCats] = [
            await db3.getAllFromIndex('moreCats', 'strengthIndex', strongRange),
            await db3.getAllFromIndex('moreCats', 'strengthIndex', midRange),
            await db3.getAllFromIndex('moreCats', 'strengthIndex', weakRange),
        ];

        console.log('strong cats (strength >= 8): ', strongCats);
        console.log('ordinary cats (strength from 3 to 7): ', ordinaryCats);
        console.log('weak cats (strength <=2): ', weakCats);

        db3.close();
    }
    return <button onClick={onClick}>demo15</button>
}

export default Demo15;

// 要获取区间对象（Range Object），需调用一个叫做IDBKeyRange的浏览器原生API
// 任何时候调用get()或getAll()，都可以传入range对象而不传具体的键（主键或索引键）。

// 字符串也可以作range，因为字符串可以作键，而键是自动排序的。比如您可以写：IDBKeyRange.bound('cat042', 'cat077')

// 创建各种range的方法可参考MDN