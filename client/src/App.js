import React from 'react';
import Button from 'react-bootstrap/Button';
import './override_default.css';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend } from 'recharts';

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
        text: 'Data collection and transmission started!'
      })
    }
  }

  stopInterval = () => {
    clearInterval(this.intervalID);
    this.setState({
      text: 'Data collection and transmission stopped!'
    })
  }

  
  
  render() {
    return (
      <div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Button variant="primary" onClick={this.changeText} style={{marginTop: "1em", marginRight: "5em", marginBottom: "1em"}}>Start</Button>
          <Button variant="primary" onClick={this.stopInterval} style={{marginTop: "1em", marginBottom: "1em"}}>Stop</Button>
        </div>

        <div style={{display: "flex", justifyContent: "center", marginBottom: "1em"}}>{this.state.text}</div>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <ResponsiveContainer width="80%" height={600}>
            <LineChart
              data = {this.state.data}
              margin = {{ top: 5, right: 30, left: 20, bottom: 5}}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time">
                <Label value="time" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis label={{ value: 'temperature (F)', angle: -90, position: 'insideLeft', offset:25 }} />
              <Tooltip />
              <Legend />
              <Line dataKey="temp" stroke="#8884d8" activeDot={{ r: 5 }} legendType={'none'} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}


export default App;