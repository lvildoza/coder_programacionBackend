// Config del lado del cliente
const socket = io();

socket.emit('mensajeKey', "Hola desde el cliente");

// Escuchamos al server
socket.on('msg_back', data => {
    console.log(data);
})

socket.on('msg_para_todos_menos_el_socket_actual', data =>{
    console.log(data);

socket.on('msg_para_todos', data =>{
    console.log(data);
})