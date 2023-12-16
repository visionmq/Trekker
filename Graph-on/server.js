const express = require('express');
const client = require('prom-client');
const path = require('path');
const app = express();
const PORT = 8000;

// Create a Registry to register the metrics
const register = new client.Registry();

// Create a gauge metric
const dummyMetric = new client.Gauge({
  name: 'dummy_metric',
  help: 'A dummy metric that changes over time'
});

// Register the metric
register.registerMetric(dummyMetric);

// Update the gauge with a random value every second
setInterval(() => {
  dummyMetric.set(Math.random());
}, 1000);

//need to set the content-type so we read the MIME type correctly
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
  console.log(`CAPT'N Dummy Metrics listening on ${PORT}`);
});
