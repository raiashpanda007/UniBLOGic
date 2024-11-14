import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser());
app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)
import authRoute from './routes/auth.routes'
app.use('/api/auth', authRoute)

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000')
    }
)