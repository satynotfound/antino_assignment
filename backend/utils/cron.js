const cron = require("node-cron");
const Data  = require("../models/data");
require('dotenv').config();
const {sqs} = require("./sqs");

const processTaskFromQueue = async (task) => {
  try {
    const { taskId } = JSON.parse(task.Body);
    const data = await Data.findById(taskId);
    if (data) {
      const wordCount = data.description.split(' ').length;
      const titleHash = require('crypto').createHash('sha256').update(data.title).digest('hex');
      const updatedData = await Data.findByIdAndUpdate(taskId, {
        wordCount:wordCount,
        titleHash:titleHash
      });

      console.log(`Data processed and updated for ID: ${taskId}`);
    }
  } catch (err) {
    console.error("Error processing task from SQS:", err);
  }
};


const startCronJob = () => {
    cron.schedule("* * * * *", async () => {
      try {
        const params = { QueueUrl: process.env.QUEUE_URL, MaxNumberOfMessages: 10 ,WaitTimeSeconds: 20 };
        const response = await sqs.receiveMessage(params).promise();
        console.log(response.Messages.length,"<><><><><><><><><><>");
    
        if (response.Messages) {
          for (const message of response.Messages) {
            console.log("<><><><><>message<><><><><><",message);
            await processTaskFromQueue(message);
            await sqs.deleteMessage({ QueueUrl: process.env.QUEUE_URL, ReceiptHandle: message.ReceiptHandle }).promise();
          }
        }
        else {
            console.log("No messages to process.");
          }
        console.log("Cron Running");
      } catch (err) {
        console.error("Error in cron job:", err);
      }
    });
  };
  
  module.exports = startCronJob;