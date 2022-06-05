import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase';
import "../App.css";
import '../assets/css/ruang-admin.min.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';

class Home extends Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('mahasiswas');
        this.unsubscribe = null;
        this.state = {
            mahasiswas: [],
            key: ''
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const mahasiswas = [];
        querySnapshot.forEach((doc) => {
            const { name, nim, status } = doc.data();
            mahasiswas.push({
                key: doc.id,
                doc, // DocumentSnapshot
                name,
                nim,
                status
            });
        });
        this.setState({
            mahasiswas
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {

        const { isLoggingOut, logoutError } = this.props;
        return (
            <div className="container-fluid"> <br></br>
                <button onClick={this.handleLogout}>Logout</button>
                {isLoggingOut && <p>Logging Out....</p>}
                {logoutError && <p>Error logging out</p>}
                <br></br>
                <br></br>
                <div className="">
                    <Link to='/create'>
                        <button type="submit" class="btn btn-primary mb-2" >Create</button>
                    </Link>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <div class="card">
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Mahasiswa Teknologi Informasi</h6>
                                </div>
                                <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>Name</th>
                                                <th>NIM</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.mahasiswas.map(mahasiswa =>
                                                <tr>
                                                    <td>{mahasiswa.name}</td>
                                                    <td>{mahasiswa.nim}</td>
                                                    <td>{mahasiswa.status}</td>
                                                    <td><Link to={`/detail/${mahasiswa.key}`}>
                                                        <button type="submit" class="btn btn-primary mb-2" >Detail</button>
                                                    </Link></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="card-footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
}
export default connect(mapStateToProps)(Home);