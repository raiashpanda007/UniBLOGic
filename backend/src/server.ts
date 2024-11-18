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


import userRoute from './routes/user.routes'
app.use('/api/user', userRoute)
import communityRoute from './routes/community.routes'
app.use('/api/community', communityRoute)
import postRoute from './routes/post.routes'
app.use('/api/post', postRoute)
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000')
    }
)