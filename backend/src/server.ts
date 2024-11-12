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
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000')
    }
)