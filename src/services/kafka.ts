import { Kafka } from 'kafkajs';

const HOSTNAME = '192.168.0.151';
// const HOSTNAME = 'localhost';
const NUM_BROKERS = 1;
const FIRST_BROKER_PORT = 9092;

const kafkaConfig: {
  clientId: string
  brokers: string[]
} = {
  clientId: 'my-app',
  brokers: []
};

let brokerPort = FIRST_BROKER_PORT;
// generate sequential port numbered brokers
for (let i = 0; i < NUM_BROKERS; i += 1) {
  kafkaConfig.brokers.push(`${HOSTNAME}:${brokerPort}`);
  brokerPort += 1;
}

console.log('kafkaConfig: ', kafkaConfig);

export const kafka = new Kafka(kafkaConfig);
