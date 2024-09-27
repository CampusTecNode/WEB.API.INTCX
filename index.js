const express = require('express')
const app = express();
const morgan = require('morgan');

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

app.get('/', (req, res) => {    
  res.json(
      {
          "Title": "Hola mundo"
      }
  );
})

app.listen(app.get('port'),()=>{
  console.log(`Server listening on port ${app.get('port')}`);
});