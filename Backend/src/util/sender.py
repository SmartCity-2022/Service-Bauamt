import pika
import sys
from src.util.config import *

configParser = init_config()


def send(key, payload):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=configParser.get("rabbitMQ-configuration", "HOST")))
    channel = connection.channel()

    channel.exchange_declare(exchange=configParser.get("rabbitMQ-configuration", "EXCHANGE"), exchange_type='topic')

    routing_key = key
    channel.basic_publish(
        exchange=configParser.get("rabbitMQ-configuration", "EXCHANGE"), routing_key=routing_key, body=payload)
    print(" [x] Sent %r:%r" % (routing_key, payload))
    connection.close()
