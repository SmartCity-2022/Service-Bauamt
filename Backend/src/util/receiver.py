import threading

import pika

from fastapi import *
from sqlalchemy.orm import Session
from src.models.citizen import Citizen
from src.util.database import *


class Receiver(threading.Thread):

    def run(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        channel = connection.channel()

        channel.exchange_declare(exchange='microservice.eventbus', exchange_type='topic')

        result = channel.queue_declare('', exclusive=False)
        queue_name = result.method.queue

        channel.queue_bind(exchange='microservice.eventbus', queue=queue_name, routing_key="*.#")

        print(' [*] Waiting for Events. To exit press CTRL+C')

        def callback(ch, method, properties, body):
            if method.routing_key == "service.mainhub.register":
                print(body)

        channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

        channel.start_consuming()
