import type { ConsumerConfig, EachMessagePayload } from 'kafkajs';
import { kafka } from './services/kafka';
import { TOPIC } from './const';
import { sleep } from './utils/async';

const GROUP_ID = 'test-group';

const consumerConfig: ConsumerConfig = {
  groupId: GROUP_ID
};

export const runConsumer = async (): Promise<void> => {
  const consumer = kafka.consumer(consumerConfig);

  await sleep(5000);

  const eachMessage = async ({ partition, message }: EachMessagePayload): Promise<void> => {
    console.log({
      partition,
      offset: message.offset,
      value: message.value?.toString()
    });
  };

  // consume!
  await consumer.connect();
  await consumer.subscribe({ topics: [TOPIC], fromBeginning: true });
  await consumer.run({ eachMessage });
};
