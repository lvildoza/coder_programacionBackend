import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';


//import { Server } from "socket.io";
//import cors from 'cors';
//import mongoose from "mongoose";

// Dependencias para las sesiones
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

//import Routers
import viewsRouter from './routes/views.router.js';
import usersViewRouter from './routes/users.views.router.js';
import sessionsRouter from './routes/sessions.router.js';

//import router from "./routes/index.js";

const app = express();

// JSON Settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors());

// Configuraciones handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

/*
app.use('/', router);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

export function getIO() {
    return io;
}
*/

// Conectamos nuestra session con el file storage.
const fileStorage = FileStore(session);

const MONGO_URL = "mongodb+srv://api1234:api1234@apirest.rkcheo3.mongodb.net/APIRest?retryWrites=true&w=majority";
/*===========================================
=               session                     =
===========================================*/
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10 * 60
    }),

    secret: "coderS3cr3t",
    resave: false, //guarda en memoria
    saveUninitialized: true, //lo guarda a penas se crea
}));


/*=======================================
=           Routes                      =
=======================================*/
app.use("/", viewsRouter);
app.use("/users", usersViewRouter);
app.use("/api/sessions", sessionsRouter);


const SERVER_PORT = 9090;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando en puerto: " + SERVER_PORT);
});

/*=======================================
=           connectMongoDB              =
=======================================*/

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();