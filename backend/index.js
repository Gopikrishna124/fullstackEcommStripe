const express=require('express')
const cors=require('cors')
const env=require('dotenv').config()
const Connection=require('./config/db').module
const app=express()
const cookieParser=require('cookie-parser')


app.use(cors({
    origin:process.env.FRONTEND_URL  ,   
    // to store cookies in frontend
    credentials:true,
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204

}))
app.use(express.json())
app.use(cookieParser())

app.use(express.urlencoded())

const routes=require('./routes/index.js').module   

app.use('/api',routes)
const PORT= process.env.PORT
Connection().then(()=>{
    app.listen(PORT,()=>{
         console.log('connected to DB')
        console.log('port',PORT)
    })
})


 


