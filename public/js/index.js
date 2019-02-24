var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});



//jQuery Functions


$('#message-form').on("submit", function(e) {
    e.preventDefault();
    
    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {
        $('[name=message]').val('');
    });
});

var locationButton = $("#send-location");
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by this browser.');
    } else {

        locationButton.attr('disabled', 'disabled').text('Sending Location...');

        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send Location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function() {
            alert('Unable to fetch location');
        });
    }
})



