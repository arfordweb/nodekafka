import { Kafka } from 'kafkajs';

const NUM_BROKERS = 3;
const FIRST_BROKER_PORT = 9092;

const kafkaConfig: {
  clientId: string
  brokers: string[]
} = {
  clientId: 'my-app',
  brokers: []
};

let brokerPort = FIRST_BROKER_PORT;
for (let i = 0; i < NUM_BROKERS; i += 1) {
  kafkaConfig.brokers.push(`localhost:${brokerPort}`);
  brokerPort += 1;
}

export const kafka = new Kafka(kafkaConfig);
