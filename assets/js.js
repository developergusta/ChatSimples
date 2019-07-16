

$(document).ready(function(){
  console.log('2');
  
 var socket = io.connect("http://35.231.126.180/");
 var ready = false;
// var ar = [];
  console.log('33');
 var inSala = function(dados) {
    console.log('22');
      if (ready) {
        
        console.log(dados);
        //console.log(dados.mensagem);
                
        if(dados !== "You have connected to the server."){
          if(dados.mensagem !== undefined){
          var procura = dados.mensagem.match(/has left the server./i);
          
          
          if(dados.pessoas !== undefined){
              for(var i = 0; i < dados.pessoas.length ; i++){
                if(procura == "has left the server."){
                  console.log("excluiu");
                  $( ".chat" ).remove( ":contains('"+dados.pessoas[i]+"')" );
                  var removed = online.splice(i,1);
                  console.log(dados.pessoas);
                }
              $(".chat").append('<li class="other"><span> Usuário: ' +  dados.pessoas[i] + '</span></li>');
             
                
          /*if(clients[client.id] == dados.pessoas[i]){
         delete online[i] ;
         var removed = online.splice(i,1);
        }*/       
                }
          }
          
          $('.chat').append('<li class="info">' + dados.mensagem + '</li>')
              }
          }
        /*else{
          if(dados.pessoas.length>1){
            $(".chat").append('<li class="other"><span> Usuário: ' +  dados.pessoas[i] + '</span></li>');
          }
        }
        else{
        
          $('.chat').append('<li class="info">' + dados + '</li>')
        }*/
      }
    };
 var mensEnviada = function(client,msg) 
  {
    console.log('43');
            
   if (ready) 
   {
    var time = new Date();
     
    console.log(client+" enviou uma mensagem: " + msg);   
      
      $(".chat").append('<li class="other"><div class="msg"><span>' + 
                   client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + 
                   time.getMinutes() + '</time></div></li>');
    
   }
  };
  var areaTexto = function(e){
      if(e.which == 13) {
          
           var text = $("#textarea").val();
           var nick = $("#nickname").val();
            console.log(nick+' enviou uma mensagem: "'+text+'"');
            $("#textarea").val('');
           var time = new Date();
           $(".chat").append('<li class="self"><div class="msg"><span>'+ $("#nickname").val() + ':</span>    <p>' + text + '</p><time>' + 
                        time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
           socket.emit("send", text);
      }
  };
  
  var envia = function(e) {
      console.log('8');
      e.preventDefault();
      $("#nick").fadeOut();
      $("#chat").fadeIn();
      var name = $("#nickname").val();
      var time = new Date();
      $("#name").html(name);
      $("#time").html('First login: ' + time.getHours() + ':' + time.getMinutes());

      ready = true;
      socket.emit("join", name);
  };
  
  
  $("#submit").submit(envia);
  
  socket.on("update", inSala);
  
  $("#textarea").keypress(areaTexto);
  
  socket.on("chat", mensEnviada);
});


