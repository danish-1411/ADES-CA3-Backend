// Name      : Mohd Danish Shafiq
// Class     : DIT 2B22
// Admin no. : p2043483

//---------------------------------------------------------------------
// imports
//---------------------------------------------------------------------
const app = require('./controller/app');


//---------------------------------------------------------------------
// configuration
//---------------------------------------------------------------------
const hostname = 'localhost';
const port = 3000;

//---------------------------------------------------------------------
// mains
//---------------------------------------------------------------------
// start the server and start listening for incoming requests
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});