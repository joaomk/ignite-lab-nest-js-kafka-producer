import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto"

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['central-firefly-13560-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'Y2VudHJhbC1maXJlZmx5LTEzNTYwJFqUbsSj_omyNEOLPI3XKygH46_pqU3OO-I',
    password: '8TNBnYnA69td1Cvgy_U8omHRwOjtWwDflYzNrkl49FPJsfHwrgaBNLHnGuOAVeEkf7CAnw==',
  },
  ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
      })
    },
    ],
  })
  await producer.disconnect()

}

bootstrap()