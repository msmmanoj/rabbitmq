var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(err,connection) => {
    if(err) {
        throw err;
    }
    connection.createChannel((err,channel) => {
        if(err) {
            throw err;
        }

        var queue = 'hello';
        var msg = 'sample content';

        channel.assertQueue(queue,{
            durable:false,
        })

        channel.sendToQueue(queue,Buffer.from(msg))

        console.log('[x] %s from',msg)

        setTimeout(() => {
            connection.close();
            process.exit(0);
        })
    })
})

