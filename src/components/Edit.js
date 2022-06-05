import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      nim: '',
      status: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('mahasiswas').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const mahasiswa = doc.data();
        this.setState({
          key: doc.id,
          name: mahasiswa.name,
          nim: mahasiswa.nim,
          status: mahasiswa.status,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ mahasiswa: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, nim, status } = this.state;

    const updateRef = firebase.firestore().collection('mahasiswas').doc(this.state.key);
    updateRef.set({
      name,
      nim,
      status
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        nim: '',
        status: ''
      });
      this.props.history.push("/detail/" + this.props.match.params.id)
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
                    <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
                  </div>
                  <div class="form-group">
                    <label>NIM</label>
                    <input type="text" class="form-control" name="nim" value={this.state.nim} onChange={this.onChange} placeholder="NIM" />
                  </div>
                  <div class="form-group">
                    <label>Status</label>
                    <input type="text" class="form-control" name="status" value={this.state.status} onChange={this.onChange} placeholder="Status" />
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
