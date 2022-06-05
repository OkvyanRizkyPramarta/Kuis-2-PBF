import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app';
import '../assets/css/ruang-admin.min.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mahasiswa: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('mahasiswas').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          mahasiswa: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase.firestore().collection('mahasiswas').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div>
        <div className='pt-4 w-100'>
          <div className="container-fluid">
            <Link to='/'>
              <button type="submit" class="btn btn-primary mb-2" >Back</button>
            </Link>
            <div>
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800 pt-2">Detail Data</h1>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active"></li>
                </ol>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="card mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 class="m-0 font-weight-bold text-primary">Mahasiswa Jurusan Teknologi Informasi</h6>
                    </div>
                    <div class="card-body">
                      <p>Name : {this.state.mahasiswa.name}</p>
                      <p>NIM :  {this.state.mahasiswa.nim}</p>
                      <p>Status :  {this.state.mahasiswa.status}</p>
                      <Link to={`/edit/${this.state.key}`}>
                        <button type="button" class="btn btn-primary"
                          data-toggle="popover">Edit</button>
                      </Link>&nbsp;
                      <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
