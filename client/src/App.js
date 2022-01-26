import React from 'react';
import Button from 'react-bootstrap/Button';

class App extends React.Component{

  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidUpdate() {
    console.log("data updated")
    // console.log(this.state.data)
  }

  getData = async () => {
    try {
      let url = `http://localhost:5000/get-data`
      let responsePromise = fetch(url)
      let response = await responsePromise
      if (!response.ok) {
          alert("we are not ok :(" + response.status)
          return
      }

      let jsonData = await response.json()
      this.setState({
        data: jsonData
      })
    } catch(e) {
      alert("an error occurred when contacting the server")
      console.log(e)
    }
  }
  
  
  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.getData}>Start</Button>
      </div>
    );
  }
}


export default App;