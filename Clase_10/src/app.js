import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewRouter from './routes/view.router.js';
import { Server } from 'socket.io';


const app = express();
const PORT = 9090;

// Preparar la configuración del servidor para recibir objetos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const httpServer = app.listen(PORT, () => {
    console.log("Server run on port: " + PORT);
})

// Instanciamos socket.io
const socketServer = new Server(httpServer);

// Config de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

// declaramos el router
app.use('/', viewRouter);

// Abrimos el canal de comunicación
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado!!");

    socket.on('mensajeKey', data => {
        console.log(data);
    })

    socket.emit('msg_individual', "Mensaje desde el back!!");

    socket.broadcast.emit('msg_para_todos_menos_el_socket_actual', 'Este evento lo veran todos los sockets conectados, MENOS el socket actual desde el que se envía el mensaje');

    socketServer.emit('msg_para_todos', 'Este mensaje los reciben todos los sockets conectados');


})