var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Admin';
        var text = "Test Text"
        
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';

        var locationMessage = generateLocationMessage(from, 1, 1);

        expect(locationMessage.from).toBe('Admin');
        expect(locationMessage.url).toBe('https://www.google.com/maps?=1,1');
        expect(locationMessage.createdAt).toBeA('number');

    });
});

