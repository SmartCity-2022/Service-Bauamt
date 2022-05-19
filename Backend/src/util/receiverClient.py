import pika


def callback(ch, method, props, body):
    print(" ---Event received--- \n")
    print(f" [x] Routing Key: {method.routing_key}")
    print(f" [x] Message: {body}", "\n\n")
    return body


class receiverClient(object):

    def __init__(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()

        self.channel.exchange_declare(exchange='Test', exchange_type='topic')

        self.result = self.channel.queue_declare('TestPost', exclusive=True)
        self.queue_name = self.result.method.queue

        self.channel.queue_bind(exchange='TestPost', queue=self.queue_name, routing_key="test.post")

        self.channel.basic_consume(queue=self.queue_name, on_message_callback=callback, auto_ack=True)
