const express = require('express')
const app = express();

app.use(express.json());
const vehicles = [
   { id: 1, make:'Honda',model:'Civic',year:'2018',zipcode: '98760' },
    { id: 2, make:'Toyota',model:'Rav4',year:'2019',zipcode: '92007'}
]

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/api/vehicles',(req,res) => {
    res.send(vehicles);
});

app.get('/api/vehicles/:id',(req,res) =>{
    const vehicle = vehicles.find(c=> c.id === parseInt(req.params.id))
    if(!vehicle) res.status(404).send(`The course with id ${req.params.id} is not found`);
    res.send(vehicle);
});

//POST Request
// Enable parsing of JSON objects in the body of the requests, so add a piece of middleware (line 4)
app.post('/api/vehicles',(req,res)=>{
    const vehicle ={
        id: vehicles.length + 1,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        zipcode: req.body.zipcode
    };
    vehicles.push(vehicle);
    // return the object in the body of the response
    res.send(vehicle);
});
//PORT - set to 5000 from CML (set port=5000). So use localhost:5000

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})