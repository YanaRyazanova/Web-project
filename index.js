import express from 'express'
import path from "path"
import serverRoutes from './routes/serverRoutes.js'

const PORT = 3000
const __dirname = path.resolve()

const app = express()
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(serverRoutes)
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'view/static', 'index.html'))
// });

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})