const app = require('./config/server')
const server = app.listen(4200, () => console.log("Servidor online"))
const io = require('socket.io').listen(server)

app.set('io', io);

io.on('connection', (socket) => {
	console.log('Usuário conectou')

	socket.on('disconnect', () => console.log('Usuário desconectou'))

	socket.on('msgParaServidor', (data) => {
		socket.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem })
		socket.broadcast.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem })

		if(parseInt(data.apelidoAtualizadoNosClientes) == 0) {
			socket.emit('participantesParaCliente', { apelido: data.apelido })
			socket.broadcast.emit('participantesParaCliente', { apelido: data.apelido })
		}
	})


})
