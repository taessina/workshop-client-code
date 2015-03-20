(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {   
    $(document).on("click", "#btn-on", function(evt) {
        socket.emit('turn on', 'turning on LED');
        return false;
    });
     
     $(document).on("click", "#btn-off", function(evt) {
        socket.emit('turn off', 'turning off LED');
        return false;
    });
     
     $(document).on("click", "#btn-get-info", function(evt) {
        socket.emit('get info', '');
        return false;
    });

     var socket = io('http://localhost:3000');
    socket.on('sensor info', function(msg){
        $('#messages').val($('#messages').val() + '\n' + msg);
    });
     
    socket.on('chatroom', function(msg){
        $('#incoming-messages').append('<p>').append(msg);
    });
    
     /* button  Go to chatroom */
    $(document).on("click", ".uib_w_10", function(evt)
    {
         activate_page("#chatroom"); 
    });
    
        /* button  #btn-send */
    $(document).on("click", "#btn-send", function(evt)
    {
        socket.emit('chatroom', '<b>' + $('#name').val() + ':</b> ' + $('#message').val());
        return false;
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
