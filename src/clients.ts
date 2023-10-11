import { handleInstapay } from './workflows';
import { nanoid } from 'nanoid';
import { Client } from '@temporalio/client';

async function run() {
  const client = new Client();
  const ops = Array.from({ length: 1 }).map(() => {
    const userId = nanoid();
    return client.workflow.execute(handleInstapay, {
      args: [{ userId,bsb:'123456' }],
      taskQueue: 'your-queue',
      workflowId: `handleInstapay-user-${userId}`,
    });
  })
  await Promise.all(ops);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});