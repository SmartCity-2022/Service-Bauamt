import pika
import sys


async def receive():
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()

    channel.exchange_declare(exchange='ExchangeDeclare', exchange_type='topic')

    result = channel.queue_declare('QueueDeclare', exclusive=False)
    queue_name = result.method.queue

    channel.queue_bind(
        exchange='ExchangeDeclare', queue=queue_name, routing_key="test.post")

    print(' [*] Waiting for Events. To exit press CTRL+C')

    def callback(ch, method, properties, body):
        print(" ---Event received--- \n")
        print(f" [x] Routing Key: {method.routing_key}")
        print(f" [x] Message: {body}", "\n\n\n")

    channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

    channel.start_consuming()
