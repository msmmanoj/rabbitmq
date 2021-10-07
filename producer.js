var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        var exchange = 'logs';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertExchange(exchange, 'fanout', {
            durable: false,
        })

        channel.publish(exchange, '', Buffer.from(msg))

        console.log('[x] %s sent', msg)
    })

    setTimeout(() => {
        connection.close();
        process.exit(0);
    },1000)
})

