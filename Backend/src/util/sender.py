import pika
import sys


def send():
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()

    channel.exchange_declare(exchange='Test', exchange_type='topic')

    routing_key = 'test.post'
    message = 'Kekmens ist ein kek'
    channel.basic_publish(
        exchange='TestPost', routing_key=routing_key, body=message)
    print(" [x] Sent %r:%r" % (routing_key, message))
    connection.close()
