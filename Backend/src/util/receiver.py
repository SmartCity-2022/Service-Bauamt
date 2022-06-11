import threading

import pika
import os
import dotenv
from src.util.database import *

dotenv.load_dotenv()


class Receiver(threading.Thread):

    def run(self):
        configParser = init_config()
        credentials = pika.PlainCredentials(configParser.get("rabbitMQ-configuration", "username"),
                                            configParser.get("rabbitMQ-configuration", "password"))
        connection = pika.BlockingConnection(pika.ConnectionParameters(
            host=configParser.get("rabbitMQ-configuration", "host"),
            port=configParser.get("rabbitMQ-configuration", "port"),
            virtual_host='/',
            credentials=credentials))
        channel = connection.channel()

        channel.exchange_declare(exchange=configParser.get("rabbitMQ-configuration", "exchange"), exchange_type='topic',
                                 durable=True)

        result = channel.queue_declare('', exclusive=False)
        queue_name = result.method.queue

        channel.queue_bind(exchange=configParser.get("rabbitMQ-configuration", "exchange"),
                           queue=queue_name, routing_key="*.#")

        print(' [*] Waiting for Events. To exit press CTRL+C')

        def callback(ch, method, properties, body):
            if method.routing_key == configParser.get("rabbitMQ-routes", "WORLD"):
                os.environ["SECRET"] = str(properties)

        channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

        channel.start_consuming()
