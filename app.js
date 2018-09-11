var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , app = express()
    , db = require('./db')
    , cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

db.initialize
    .then((data)=>{
        app.listen(process.env.PORT, function() {
            console.log('app listening on port:', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log('Initialization Failed:', err)
    });

// controllers
app.use(require('./controllers'));
