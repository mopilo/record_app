import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeLgaName = this.onChangeLgaName.bind(this);
    this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      person_name: '',
      lga_name: '',
      phone_number:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:7000/app/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                person_name: response.data.person_name, 
                lga_name: response.data.lga_name,
                phone_number: response.data.phone_number });
          })
          .catch(function (error) {
              console.log(error);
          })
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
    axios.post('http://localhost:4000/app/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Entry</h3>
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
                    <option selected>{this.state.lga_name}</option>
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
                      value="Update Entry" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}