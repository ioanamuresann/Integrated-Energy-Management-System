const fs = require('fs');
const amqp = require('amqplib');

const QUEUE_NAME = 'smart_meter_data';
const SENSOR_FILE_PATH = 'sensor.csv';

async function sendMessageToQueue(channel, message) {
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
  console.log(`Sent message to queue: ${message}`);
}

async function readDeviceId(deviceIdFilePath) {
  try {
    return fs.readFileSync(deviceIdFilePath, 'utf8').trim(); // Read and trim device_id
  } catch (error) {
    console.error(`Error reading device_id: ${error.message}`);
    return null;
  }
}

async function simulateSmartMeter(deviceIdFilePath) {
  try {
    const connection = await amqp.connect('amqps://lmatbgmf:dGqZpeoK1Zsdkr71F_M-mg418R_JsNGL@crow.rmq.cloudamqp.com/lmatbgmf');
    const channel = await connection.createChannel();

    const deviceId = await readDeviceId(deviceIdFilePath); // Read device_id from file

    // Read data from sensor.csv file
    const sensorData = fs.readFileSync(SENSOR_FILE_PATH, 'utf8').split('\n');

    // Simulate sending data from the sensor
    for (const measurementValue of sensorData) {
      const timestamp = new Date().toISOString();

      const message = JSON.stringify({
        timestamp: new Date(timestamp).getTime(),
        device_id: deviceId,
        measurement_value: parseFloat(measurementValue.trim()),
      });

      await sendMessageToQueue(channel, message);

      // Simulate sending data every 1 minute
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    // Close the connection when done
    setTimeout(async () => {
      await connection.close();
      process.exit(0);
    }, 0);
  } catch (error) {
    console.error(`Error in simulator: ${error.message}`);
  }
}

// Get the device ID file path from the command line arguments
const deviceIdFilePath = process.argv[2];

// Run the simulator with the specified device ID file path
simulateSmartMeter(deviceIdFilePath);
