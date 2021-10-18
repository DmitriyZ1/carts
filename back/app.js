const http = require('http');
const url = require('url');
const {v4} = require('uuid');


const mysql = require('mysql');
let conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'mysql',
    password : 'mysql',
    database : 'person'
});
conn.connect();


http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log('server work');
    if (req.method == 'GET') {
        res.writeHead(200, { "Content-Type": "application/json" });
        conn.query(
            `SELECT * FROM baseperson`,    
            function(error, result){
                if(error) throw error;
                let arr = result;
                res.end(JSON.stringify(arr))
            }
        )
    }
    else {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let params = JSON.parse(body);
            res.writeHead(200, { "Content-Type": "application/json" });
            if (params.action === 'edit'){
                conn.query(
                    `UPDATE baseperson 
                    SET name = '${params.person.name}', 
                    surname = '${params.person.surname}',
                    phone = '${params.person.phone}',
                    mail = '${params.person.mail}',
                    pic = '${params.person.pic}',
                    sex = '${params.person.sex}',
                    color = '${params.person.color}'
                    WHERE id = '${params.person.id}'`,    
                    function(error, result){
                        if(error) throw error;
                        res.end();
                    }
                )
            }
            else if (params.action === 'add'){
                let d = new Date();
                conn.query(`INSERT INTO baseperson (id, name, surname, phone, mail, pic , sex, color, date) 
                            VALUES(
                            '${v4()}',  
                            '${params.person.name}', 
                            '${params.person.surname}',
                            '${params.person.phone}',
                            '${params.person.mail}',  
                            '${params.person.pic}',
                            '${params.person.sex}',
                            '${params.person.color}',
                            '${d.getDate()}.${+d.getMonth() + 1}.${d.getFullYear()}'      
                            )`,    
                    function(error, result){
                        if(error) throw error;
                        res.end();
                    }
                )
            }
            else if (params.action === 'del'){
                conn.query(`DELETE FROM baseperson WHERE id = '${params.id}'`,    
                    function(error, result){
                        if(error) throw error;
                        res.end();
                    }
                )
            }
            else if (params.action === 'getpers'){
                console.log(params.id)
                conn.query(`SELECT * FROM baseperson WHERE id = '${params.id}'`, 
                          
                    function(error, result){
                        if(error) throw error;
                        res.end(JSON.stringify(result[0]));
                    }
                )
            }
            
               
        })
    }
}).listen(3500);