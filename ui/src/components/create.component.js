import React, { Component } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeLgaName = this.onChangeLgaName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.importCSV = this.importCSV.bind(this)
    this.state = {
      person_name: '',
      lga_name: '',
      phone_number:"",
      csvfile: undefined,
      employees:[]
    }
  }
  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeLgaName(e) {
    this.setState({
      lga_name: e.target.value
    })  
  }
  onChangeGstNumber(e) {
    this.setState({
      phone_number: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      person_name: this.state.person_name,
      lga_name: this.state.lga_name,
      phone_number: this.state.phone_number
    };
    axios.post('http://localhost:7000/app/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      person_name: '',
      lga_name: '',
      phone_number: ''
    })
  }
  importCSV = () => {
    const { csvfile } = this.state;
    if(csvfile !== undefined){
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true 
    });
  }
  };
  updateData(result) {
    var data = result.data;
    console.log(data);
    for (let i=data.length;i>=0; i--){ 
      if(data[i] !== undefined){
        console.log(data[i]);
      axios.post('http://localhost:7000/app/add', data[i]).then((response) => {
          console.log(response.data)
         
      }).catch((err) => {
          console.log(err);
          console.log('tyrt');
      })
    } 
    // this.setState({employees: data})
  }
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    }, ()=> {console.log(this.state.csvfile)});
  };
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Add New Entry</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Person Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.person_name}
                      onChange={this.onChangePersonName}
                      />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlSelect1">LGA name</label>
                  <select
                  onChange={this.onChangeLgaName}
                   className="form-control" id="exampleFormControlSelect1">
                    <option selected>Choose...</option>
                    <option value="MOPA-AMURO">MOPA-AMURO</option>
                    <option value="YAGBA EAST">YAGBA EAST</option>
                    <option value="KABBA-BUNU">KABBA-BUNU</option>
                    <option value="YAGBA-WEST">YAGBA-WEST</option>
                    <option value="IJUMU">IJUMU</option>
                    <option value="koto karfe">koto karfe</option>
                    <option value="Lokoja">Lokoja</option>
                </select>
                </div>

                <div className="form-group">
                    <label>Phone Number: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.phone_number}
                      onChange={this.onChangeGstNumber}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Add to record" 
                      className="btn btn-primary"/>
                </div>
            </form>

            <div>
              <div className="form-group">
                <label for="exampleFormControlFile1">Upload csv file</label>
                <input 
                type="file" 
                onChange={this.handleChange}
                className="form-control-file" 
                id="exampleFormControlFile1"/>
              </div>
              <div className="form-group">
                    <input 
                    type="submit"
                    onClick={this.importCSV}
                      value="Add csv to record" 
                      className="btn btn-primary"/>
                </div>
            </div>
        </div>
    )
  }
}