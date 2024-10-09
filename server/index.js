const express = require('express');
const app = express();
const mysql = require('mysql');
const cors =require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "ruddanay1114",
    database: "cost"
});

app.get('/costs', (req,res) =>{
    db.query("SELECT * FROM costs", (err, result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
});
app.get('/report', (req,res) =>{
    db.query("select * from costs c join report r on r.id_cost = c.id;", (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.get('/reportchart', (req,res) =>{
    db.query("SELECT YEAR(datetime) AS year, MONTH(datetime) AS month, SUM(total_money) AS total_money FROM report GROUP BY YEAR(datetime),MONTH(datetime);", (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.put('/changstatus', (req, res) => {
    const id = req.body.id;

    db.query("UPDATE costs SET status_report = 1 WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('เกิดข้อผิดพลาดในการอัปเดต');
        } else {
            res.send(result);
        }
    });
});

app.delete('/delete/:id',(req, res) =>{
    const id = req.params.id;
    db.query("DELETE FROM costs where id = ?", id, (err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.post('/create_report' , (req,res)=>{
    const id = req.body.id
    const total_money = req.body.totalMoney
    const costdate = req.body.cost_date

    db.query("INSERT INTO report (id_cost,total_money,datetime) values (?,?,?)",
        [id, total_money, costdate],
        (err,result)=>{
            if (err) {
                console.log(err);
            }else{
                res.send("Values inserted");
            }
        }
    )
})
app.post('/create',(req,res) =>{

    const title = req.body.title
    const description = req.body.description
    const date = req.body.date
    const time_start = req.body.time_start
    const time_end = req.body.time_end
    const location = req.body.location
    const department = req.body.department
    const image = req.body.image_cost
    const status  = req.body.status

    db.query("INSERT INTO costs (title, description, date, time_start, time_end, location, department, image, status,status_report) VALUES(?,?,?,?,?,?,?,?,?,?)",
        [title, description, date, time_start, time_end, location, department, image, status,0],
        (err, result) =>{
            if (err) {
                console.log(err);
            }else {
                res.send("values inserted");
            }
        }
    )

})

app.listen('3003',()=>{
    console.log('server is runing port 3003');
})