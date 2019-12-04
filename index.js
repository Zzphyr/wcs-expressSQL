const express = require('express');
const connection = require('./conf');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// GET - Retrieve all of the data from your table
app.get('/api/icecream', (req, res) => {
   connection.query('SELECT * from icecream', (err, results) => {
      if (err) {
         res.status(500).send('Error retrieving list of icecream');
      } else {
         res.json(results);
      }
   });
});

// GET - Retrieve specific fields (i.e. id, names, dates, etc.)
app.get('/api/icecream/names', (req, res) => {
   connection.query('SELECT name from icecream', (err, results) => {
      if (err) {
         res.status(500).send('Error retrieving list of icecreams\' name');
      } else {
         res.json(results);
      }
   });
});

// GET - Retrieve a data set with the following filters (use one route per filter type):
// A filter for data that contains... (e.g. name containing the string 'wcs')
app.get('/api/icecream/contain', (req, res) => {
   const q = 'SELECT * from icecream where name like "%Chocolate%"';
   connection.query(q, (err, results) => {
      if (err) {
         res.status(500).send('Error retrieving list of icecreams containing chocolate');
      } else {
         res.json(results);
      }
   });
});

// A filter for data that starts with... (e.g. name beginning with 'campus')
app.get('/api/icecream/start', (req, res) => {
   const q = 'SELECT * from icecream where name like "Chocolate%"';
   connection.query(q, (err, results) => {
      if (err) {
         res.status(500).send('Error retrieving list of ice creams starting with chocolate');
      } else {
         res.json(results);
      }
   });
});

// A filter for data that is greater than... (e.g. date greater than 18/10/2010)
app.get('/api/icecream/greater', (req, res) => {
   const q = 'SELECT name, entry_date from icecream where entry_date > "2017-07-04"';
   connection.query(q, (err, results) => {
      if (err) {
         res.status(500).send('Error retrieving list of ice creams with entry date greater than 2017-07-04');
      } else {
         res.json(results);
      }
   });
});

// GET - Ordered data recovery (i.e. ascending, descending) - The order should be passed as a route parameter
// use http://localhost:3000/api/icecream/name/desc
app.get('/api/icecream/:field/:order', (req, res) => {
   //const dataOrder = req.params.order;
   const q = `SELECT * from icecream order by ${req.params.field} ${req.params.order}`;
   connection.query(q, (err, results) => {
      if (err) {
         res.status(500).send('Error retrieving list of ice creams');
      } else {
         res.json(results);
      }
   });
});


// POST - Insertion of a new entity
// tables has columns: id, name, entry_date, isVegan (0 or 1)
app.post('/api/icecream', (req, res) => {
   // Get the data sent
   const formData = req.body;
   const q = 'INSERT INTO icecream SET ?'
   // connection to the database, and insertion of the employee
   connection.query(q, formData, (err, results) => {
     if (err) {
       // If an error has occurred, then the user is informed of the error
       console.log("the err",err);
       res.status(500).send("Error saving an ice cream");
     } else {
       // If everything went well, we send a status "ok".
       res.sendStatus(200);
     }
   });
 });


// PUT - Modification of an entity
app.put('/api/icecream/:id', (req, res) => {
   const idIcecream = req.params.id;
   const formData = req.body;
    connection.query('UPDATE icecream SET ? WHERE id = ?', [formData, idIcecream], err => {
     if (err) {
        console.log(err);
       res.status(500).send("Error editing an ice cream");
     } else {
       res.sendStatus(200);
     }
   });
});

// PUT - Toggle a Boolean value
// https://www.hashbangcode.com/article/toggle-tinyint-field-mysql
app.put('/api/icecream/isVegan/:id', (req, res) => {
   const idIcecream = req.params.id;
    connection.query('UPDATE icecream SET isVegan=1-isVegan WHERE id = ?', [idIcecream], err => {
     if (err) {
        console.log(err);
       res.status(500).send("Error editing an ice cream");
     } else {
       res.sendStatus(200);
     }
   });
});


// DELETE - Delete an entity
app.delete('/api/icecream/:id', (req, res) => {
   const idIcecream = req.params.id;
   connection.query('DELETE FROM icecream WHERE id = ?', [idIcecream], err => {
      if (err) {
         console.log(err);
         res.status(500).send("Error deleting an ice cream");
      } else {
         res.sendStatus(200);
      }
   });
});

// DELETE - Delete all entities where boolean value is false
app.delete('/api/icecream/', (req, res) => {
   connection.query('DELETE FROM icecream WHERE isVegan = 0', err => {
      if (err) {
         console.log(err);
         res.status(500).send("Error deleting all non-vegan ice creams");
      } else {
         res.sendStatus(200);
      }
   });
});


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
