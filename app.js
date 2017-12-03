var app = require('./config/server');


var server = app.listen(8080,function(){

    console.log('Servidor online!');
            
});

io = require('socket.io').listen(server);

app.set('io',io);

io.on('connection',function(socket){

    console.log('Usuário conectou!');

    socket.on('disconnect',function(){
        console.log('Usuário desconectou!');
    });

    socket.on('mensagemParaServidor',function(data){
    


        socket.emit('msgParaCliente', 
                        {apelido: data.apelido, 
                        mensagem: data.mensagem});

        socket.broadcast.emit('msgParaCliente', 
                        {apelido: data.apelido, 
                        mensagem: data.mensagem});

        if(parseInt( data.apelidoAtualizadoNosClientes) == 0){
        
            socket.emit('participantesParaCliente',{apelido: data.apelido});
            
            socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
            
        }          
    });

});