const mysql = require('mysql');
const input = require('readline-sync');

const db_Conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "learn",   // databsase name 
    password: 'Roshan@1'    // mysql password 
})

const check = () => {
    console.log('1. Signup \n2. Login \n3. update\n4. delete\n5. Show all data\n6 Exit');
    const opt = input.questionInt('Enter your option.: ')
    if (opt == 1) {
        const opt_id = input.questionInt('Enter the ID: ')
        db_Conn.query(`select * from bio_data where id=${opt_id}`, (err, data) => {
            if (err) throw err;
            if (data.length > 0) {
                console.log(`user already exist.`);
                check()
            }
            else {
                const opt_name = input.question('Enter your Name: ')
                const opt_city = input.question('Enter your city :')
                const opt_state = input.question('Enter your state :')
                const opt_pin = input.question('Enter your pic_code :')
                db_Conn.query(`insert into bio_data(id,name,city,state,pincode)values("${opt_id}","${opt_name}","${opt_city}","${opt_state}","${opt_pin}")`, (err, data) => {
                    if (err) throw err;
                    console.log('signUp successfully.');
                    check()
                })
            }
        })
    }

    else if (opt == 2) {
        const opt_id = input.questionInt('Enter the ID: ')
        db_Conn.query(`select * from bio_data where id=${opt_id}`, (err, data) => {
            if (err) throw err;
            if (data.length > 0) {
                console.log(`login successfully.`);
                check()
            }
            else {
                console.log('Not exist id. please type correct id.');
                check()
            }
        })
    }
    else if (opt == 3) {
        db_Conn.query('select * from bio_data', (err, result) => {
           if (err) throw err;
            console.log(result);
            const udata = input.question('which you column update.please enter name: ')
            const ndata = input.question('Enter your new insert data: ')
            const which_id = input.question('Enter your id: ')
            db_Conn.query(`update bio_data set ${udata}="${ndata}" where id="${which_id}"`, (err, data) => {
                if (err){
                    console.log(err);
                }
                else{
                    console.log('update data successfully.');
                    check()
                }
            })
        })
    }
    else if (opt == 4) {
        db_Conn.query('select * from bio_data', (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                console.log(result);
                const delete_id = input.questionInt('Enter the ID. whcth you want to delete: ')
                db_Conn.query(`delete from bio_data where id='${delete_id}'`, (err, data) => {
                    if (err) throw err;
                    console.log(data);
                    console.log('Delete data successfully.');
                    check()
                })
            }
        })
    }
    else if (opt == 5) {
        db_Conn.query('select * from bio_data', (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                console.log(result);
            }
            check()
        })
    }
    else if(opt == 6){
        console.log('you have out of the page');
 
    }
}
check()