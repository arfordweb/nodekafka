import { runProducer } from './producer';
import { runConsumer } from './consumer';

if (process.env.RUN_MODE === 'producer') {
  runProducer().catch(console.error);
} else if (process.env.RUN_MODE === 'consumer') {
  runConsumer().catch(console.error);
} else {
  console.error('No RUN_MODE environment variable specified! Doing nothing');
}
