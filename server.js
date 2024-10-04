//initialise dependancies / valaubles
const express = require('express');
const app = express();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');
const cors = require ('cors');


app.use(express.json());
app.use(cors());
dotenv.config();

// connet to the database ***

const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
 });

 // checking if db connections works
 db.connect((err) => {
    //NO CONNECTION 
    if(err) return console.log("error connecting mysql db");
        //YES WEDDING 
    console.log("Connected successfully to mysql as id: ", db.threadId);

    // code in here 


    app.set('view engine', 'ejs');
    app.set('views',__dirname + '/views');

    // specify the name of the file in view folder
    app.get('/data', (req, res) => {
        // retrieve data from db question 
        db.query('SELECT patient_id,first_name,last_name,date_of_birth FROM patients',(err, results) => {
            if (err){
                console.error(err);
                res.status(500).send('error retrieving data');
            }else {
                 //question 2
                 // get data from providers table 
               // diplay data records to browser

                db.query('SELECT first_name,last_name,provider_specialty FROM providers',(err, pim) => {

                    console.log(pim)

                    //question 3

                    db.query('SELECT first_name FROM patients',(err, moi) => {
                        console.log(moi)

                        // question 4 
                        db.query('SELECT provider_spcialty first_name,last_name FROM providers', (err, girl) => {
                            console.log(girl)

                            res.render('data', { results: results , pim : pim , moi : moi , girl : girl });

                        });


                        
                    });
                });
            }  
        });
    });

    app.listen(process.env.PORT, () => {
        console.log(`server listening on port ${process.env.PORT}`);

            //Send msg to the browser

            console.log('sending message to browser...');
            app.get('/',(req,res) => {
                res.send('server started successfully');
            })
    });

 });
  