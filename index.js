//Rohan Arora
const express = require('express');
const app = express();
const port = 3000;
const CRD = require('./CRD/CRD');

const args = process.argv[2];
const Default_path = './Database/db.json';
const Data_path = args || Default_path;

app.post(['/create', '/create/:key'], function (req, res) {
    if (!req.params.key && !req.query.key) {
        res.send("Please mention key!<br><br>Your request should be in either of the formats<br> =>  http://localhost:3000/create/JSON_Data <br><strong>or</strong><br> =>  http://localhost:3000/create?key=JSON_Data")
    }
    else {
        const key = req.params.key || req.query.key;
        res.send(CRD.Create(key, Data_path));
    }
});

app.get(['/read', '/read/:key'], function (req, res) {
    if (!req.params.key && !req.query.key) {
        res.send("Please mention key!<br><br>Your request should be in either of the formats<br> =>  http://localhost:3000/read/The_Key_You_Want_To_Read <br><strong>or</strong><br> =>  http://localhost:3000/read?key=The_Key_You_Want_To_Read")
    }
    else {
        const key = req.params.key || req.query.key;
        res.send(CRD.Read(key, Data_path));
    }
});

app.delete(['/delete', '/delete/:key'], function (req, res) {
    if (!req.params.key && !req.query.key) {
        res.send("Please mention key!<br><br>Your request should be in either of the formats<br> =>  http://localhost:3000/delete/The_Key_You_Want_To_Delete <br><strong>or</strong><br> =>  http://localhost:3000/delete?key=The_Key_You_Want_To_Delete")
    }
    else {
        const key = req.params.key || req.query.key;
        res.send(CRD.Delete(key, Data_path));
    }
});

app.all(['/', '/help', '*'], function (req, res) {
    res.send('404 not found, Please use appropriate function, that is GET for Read, POST for Create and DELETE for Delete functions')
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
