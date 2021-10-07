var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        var queue = 'work_queues';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertQueue(queue, {
            durable: true,
        })

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true,
        })

        console.log('[x] %s sent', msg)

        setTimeout(() => {
            connection.close();
            process.exit(0);
        })
    })
})

