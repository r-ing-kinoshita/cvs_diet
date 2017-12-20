// This is a JavaScript file
function initial_db()
{
    try
    {
        var name = 'localdb';
        var version = '1.0';
        var description = 'Web SQL Database';
        var size = 2 * 1024 * 1024;
        var db = openDatabase(name, version, description, size);
        create_table(db);
        insert_datas(db);
        db.transaction(function(tx)
        {
            tx.executeSql('select id, name from test', [], function(tx, results)
            {
                // SUCCESS
                for (i = 0; i < results.rows.length; i++)
                {
                    alert(results.rows.item(i)
                        .id)
                    alert(results.rows.item(i)
                        .name)
                }
            }, function(err)
            {
                // ERROR
                alert('エラー');
            })
        })
        alert('DB登録完了');
    }
    catch (e)
    {
        alert(e);
    }
}
/**
 * テーブル作成 
 */
function create_table(db)
{
    execSql(db, 'create table test (id, name)', []);
}
/**
 * データ登録
 */
function insert_datas(db)
{
    var insertSql = 'insert into user (id, name) values (?, ?)';
    var datas = [
        ['kino1', 'kinoshita'],
        ['kino2', 'takashi'],
    ];
    for (data of datas)
    {
        execSql(db, insertSql, data);
    }
}

function execSql(db, sql, param)
{
    db.transaction(function(tx)
    {
        tx.executeSql(sql, param);
    });
}