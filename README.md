# Line Chart
This branch is useable in Vue.js

This is a simple line chart renderer which uses an svg for the chart



## How to use

```javascript
const chart = new LineChart(parrentElement, options)
const dots = chart.updateData(data_array, yAxesMax)
```

An example can be seen in `test/index.html`



## Settings

All settings are optional and don't have to be defined



### dots

Wether you want dots to be drawn on the data points



### radius

The radius of the dots



### padding

The padding on the left and right side.

For example a padding of 10 would mean that the first point starts at x = 10 and the last point ends at width - 10


