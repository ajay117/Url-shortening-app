const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
           
    res.sendFile(__dirname + '/index.html');
    })

    const PORT = process.env.PORT || 5000


 app.listen(PORT, () =>{
                console.log('SERVER RUNNING')
            })