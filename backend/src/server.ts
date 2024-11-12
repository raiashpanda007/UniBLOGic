import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000')
    }
)