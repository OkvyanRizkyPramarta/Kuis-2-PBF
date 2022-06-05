import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('mahasiswas');
    this.state = {
      name: '',
      nim: '',
      status: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, nim, status } = this.state;

    this.ref.add({
      name,
      nim,
      status
    }).then((docRef) => {
      this.setState({
        name: '',
        nim: '',
        status: ''
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { name, nim, status } = this.state;
    return (
      <div className="container-fluid">
        <br></br>
        <Link to='/'>
          <button type="submit" class="btn btn-primary mb-2" >Back</button>
        </Link>
        <div class="row">
          <div class="col-lg-12 mb-4">
            <div class="card">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Input Data</h6>
              </div>
              <div class="card-body">
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
                  </div>
                  <div class="form-group">
                    <label>NIM</label>
                    <input type="text" class="form-control" name="nim" value={nim} onChange={this.onChange} placeholder="NIM" />
                  </div>
                  <div class="form-group">
                    <label>Status</label>
                    <input type="text" class="form-control" name="status" value={status} onChange={this.onChange} placeholder="Status" />
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
              <div class="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Create;
