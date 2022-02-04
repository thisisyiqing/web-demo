import React from 'react';
import Button from 'react-bootstrap/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class App extends React.Component{

  constructor() {
    super()
    this.state = {
      data: [],
      text: ''
    }
    this.intervalID = 0
    this.fetchData = this.fetchData.bind(this)
  }

  fetchData() {
    console.log("im in")
    fetch('http://localhost:5000/get-data',{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => this.setState({data: response}))
    .catch(error => console.log(error))
  }

  changeText = () => {
    if(this.intervalID === 0) {
      this.intervalID = setInterval(this.fetchData, 3000);

      this.setState({
        text: 'Data collection started!'
      })
    }
  }

  stopInterval = () => {
    clearInterval(this.intervalID);
  }

  
  
  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.changeText}>Start</Button>
        <div>{this.state.text}</div>
        <Button variant="primary" onClick={this.stopInterval}>Stop</Button>

        <LineChart
          width = {1200}
          height = {400}
          data = {this.state.data}
          margin = {{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    );
  }
}


export default App;