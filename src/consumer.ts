import type { ConsumerConfig, EachMessagePayload } from 'kafkajs';
import { kafka } from './services/kafka';
import { TOPIC } from './const';

const GROUP_ID = 'test-group';

const consumerConfig: ConsumerConfig = {
  groupId: GROUP_ID
};
const consumer = kafka.consumer(consumerConfig);

const eachMessage = async ({ partition, message }: EachMessagePayload): Promise<void> => {
  console.log({
    partition,
    offset: message.offset,
    value: message.value?.toString()
  });
};

const run = async (): Promise<void> => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topics: [TOPIC], fromBeginning: true });
  await consumer.run({ eachMessage });
};

run().catch(console.error);
