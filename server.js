// Name      : Mohd Danish Shafiq
// Class     : DIT 2B22
// Admin no. : p2043483

//---------------------------------------------------------------------
// imports
//---------------------------------------------------------------------
const app = require('./controller/app');

//---------------------------------------------------------------------
// mains
//---------------------------------------------------------------------
// start the server and start listening for incoming requests
app.listen(process.env.PORT || 3000)