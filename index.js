const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {Pool} = require('pg');

const PORT = process.env.PORT || 5000;
const pool = new Pool({connectionString: process.env.DATABASE_URL,ssl: true});

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .get('/:id', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))
    .get('/instructions', getDailyLimit())
    .post('/calculate', addPersonalData)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));


async function getDailyLimit(req, res) {
    const id = req.params.id;
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM data WHERE clientid = '${id}'`);
        const gender = await client.query(`SELECT gender FROM data WHERE clientid = '${id}'`);
        const goal = await client.query(`SELECT goal FROM data WHERE clientid = '${id}'`);
        const height = await client.query(`SELECT height FROM data WHERE clientid = '${id}'`);
        const age = await client.query(`SELECT age FROM data WHERE clientid = '${id}'`);
        if (data.gender === "M") {
             let dailyLimit = 66 + 13.7 * goal + 5 * height - 6.8 * age;
        } else {
             dailyLimit = 655 + 9.6 * data.goal + 1.8 * height - 4.7 * age;
        }
        res.send(dailyLimit);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }


async function addPersonalData(req, res) {
    let data = req.body;
    try {
        const client = await
        pool.connect();
        let x = await
        client.query(`INSERT INTO datas (goal, gender, weight, height,age) VALUES (${data.goal},'${data.gender}',${data.weight},${data.height},${data.age} )`);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
    res.send('success');
}

