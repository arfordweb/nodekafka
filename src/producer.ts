import Chance from 'chance';
import { sleep } from './utils/async';
import { kafka } from './services/kafka';

const SEND_INTERVAL = 2000; // 2s

const chance = new Chance();

const producer = kafka.producer();

const run = async (): Promise<void> => {
  // Producing
  await producer.connect();
  while (true) {
    await producer.send({
      topic: 'animals',
      messages: [
        { value: chance.animal() }
      ]
    });
    await sleep(SEND_INTERVAL);
  }
};

run().catch(console.error);
