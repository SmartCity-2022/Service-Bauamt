import pika
import sys
from src.util.config import *

configParser = init_config()


def send(key, payload):
    credentials = pika.PlainCredentials(configParser.get("rabbitMQ-configuration", "username"),
                                            configParser.get("rabbitMQ-configuration", "password"))
    connection = pika.BlockingConnection(pika.ConnectionParameters(
            host=configParser.get("rabbitMQ-configuration", "host"),
            port=configParser.get("rabbitMQ-configuration", "port"),
            virtual_host='/',
            credentials=credentials))
    channel = connection.channel()

    channel.exchange_declare(exchange=configParser.get("rabbitMQ-configuration", "EXCHANGE"), exchange_type='topic')

    routing_key = key
    channel.basic_publish(
        exchange=configParser.get("rabbitMQ-configuration", "EXCHANGE"), routing_key=routing_key, body=payload)
    print(" [x] Sent %r:%r" % (routing_key, payload))
    connection.close()
