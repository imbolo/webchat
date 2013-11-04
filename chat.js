var chatContent = document.getElementById("chatContent");
var socket = io.connect('http://localhost');
socket.on('news', function (data) {
  console.log(data);
var markup = "<li class='chat-item'><div><span>"
+data.msg+
"</span></div></li>";
chatContent.innerHTML+=markup;
$('.chat-record').scrollTop($('.chat-record ul').height());
});
$('#inputMsg').keydown(function(event){
  if (event.keyCode == 13) {
  	 sendMessage();
  }
});

function sendMessage() {
  socket.emit('EventNewMsg', {msg:$('#inputMsg').val()});
  var markup = "<li class='chat-item chat-item-self'><div><span>"
  +$('#inputMsg').val()+
  "</span></div></li>";
  chatContent.innerHTML+=markup;
  $('#inputMsg').val("");
  $('.chat-record').scrollTop($('.chat-record ul').height());
}
$(function(){
  $('.chat-record').scrollTop($('.chat-record ul').height());
});