const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });
require('dotenv').config(); 

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const QUEUE_URL = process.env.QUEUE_URL;

// Function to send a message to SQS
const sendTaskToQueue = async (taskId) => {
  const params = {
    QueueUrl: QUEUE_URL,
    MessageBody: JSON.stringify({ taskId }),
  };
  
  try {
    await sqs.sendMessage(params).promise();
    console.log("Task added to SQS:", taskId);
  } catch (err) {
    console.error("Error adding task to SQS:", err);
  }
};

module.exports = {
    sqs,
    sendTaskToQueue
}
