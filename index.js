const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
const dbConnect = config.dbConnect;
//const dbConnect = process.env.dbConnect;
const path = require('path');
const serverRoutes = require('./routes/serverRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminApiRoutes.js');
const editorRoutes = require('./routes/redactorApiRoutes.js');
const cookieParser = require("cookie-parser");


const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();

const app = express();

app.set("view engine", "ejs");
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(serverRoutes);
app.use(express.static(_dirname + '/static'))
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes);
app.use('/editor', editorRoutes);
app.use(express.json());
app.use(cookieParser());

async function start() {
    try {
        await mongoose.connect(dbConnect, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        });
    }
    catch (e) {
        console.log(e);
    }
}

start();
