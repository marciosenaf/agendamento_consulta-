// configuraçao inicial
const express = require ('express')
const mongoose  = require('mongoose')
const app = express()

//forma de ler json
app.use(
    express.urlencoded({
        extended: true
    }),

)

app.use(express.json())

//rotas de api 

//doctor
const doctorRoutes = require('./routes/doctorRoutes')

app.use('/doctor' , doctorRoutes)

//person/paciente

const personRouter = require('./routes/personRoutes')

app.use('/person', personRouter )


//entregar uma porta
mongoose
.connect(`mongodb+srv://usuario1:usuario1@cluster0.ypr3j.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conectamos ao mongodb")
    app.listen(3000)

}) 
.catch((err) => console.log(err))
 