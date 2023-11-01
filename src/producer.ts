import Chance from 'chance';
import { sleep } from './utils/async';
import { kafka } from './services/kafka';
import { TOPIC } from './const';
import { type ProducerRecord } from 'kafkajs';

const SEND_INTERVAL = 2000;
const HARDCODE_PARTITIONS = false;
const NUM_PARTITIONS = 2; // only applied if HARDCODE_PARTITIONS is true

const chance = new Chance();

const producer = kafka.producer();

let partition = 0;

const run = async (): Promise<void> => {
  // Producing
  await producer.connect();
  while (true) {
    const value = chance.animal();
    let logStr = `Sending value "${value}"`;
    if (HARDCODE_PARTITIONS) {
      logStr = `${logStr} to partition ${partition}`;
    }
    console.log(logStr);
    const record: ProducerRecord = {
      topic: TOPIC,
      messages: [
        { value }
      ]
    };
    if (HARDCODE_PARTITIONS) {
      record.messages[0].partition = partition;
    }
    await producer.send(record);
    partition = (partition + 1) % NUM_PARTITIONS;
    await sleep(SEND_INTERVAL);
  }
};

run().catch(console.error);
