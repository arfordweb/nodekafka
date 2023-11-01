import type { EachMessagePayload } from 'kafkajs';
import { kafka } from './services/kafka';

const GROUP_ID = 'test-group';
const TOPIC = 'animals';

const consumer = kafka.consumer({
  groupId: GROUP_ID
});

const eachMessage = async ({ /* topic, */ partition, message }: EachMessagePayload): Promise<void> => {
  console.log({
    partition,
    offset: message.offset,
    value: message.value?.toString()
  });
};

const run = async (): Promise<void> => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });
  await consumer.run({ eachMessage });
};

run().catch(console.error);
