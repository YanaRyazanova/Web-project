const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
const path = require('path');
const serverRoutes = require('./routes/serverRoutes.js');
const exphbs = require('express-handlebars');

const PORT = 3000;
const _dirname = path.resolve();

const app = express();

<<<<<<< HEAD
/*const hbs = exphbs.create({
=======
const ejs = exphbs.create({
>>>>>>> 93f7278... Change engine on ejs
    defaultLayout: 'main',
    extname: 'ejs',
    defaultView: "default",
    layoutsDir: path.join(_dirname, "/views/layouts/"),
    partialsDir: path.join(_dirname, "/views/partials/"),
<<<<<<< HEAD
});*/

//app.engine('ejs');
=======
});
app.engine('ejs', ejs.engine );
>>>>>>> 93f7278... Change engine on ejs
app.set("view engine", "ejs");
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(serverRoutes);


async function start() {
    try {
        await mongoose.connect(config.dbConnect, {
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
