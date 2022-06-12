import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import firebaseConfig from "../firebase/firebase";

const Register = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        try {
            firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
            setCurrentUser(true);
        } catch (error) {
            alert(error);
        }
    };
    if (currentUser) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            <div className="container">
                <div class="row justify-content-center">
                    <div class="col-xl-6 col-lg-10 col-md-9">
                        <div class="card shadow-sm my-5">
                            <div class="card-body p-0">
                                <div class="row">
                                    <div className="col-lg-12">
                                        <div className='card-body'>
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Register</h1>
                                            </div><br></br>
                                            <form onSubmit={handleSubmit}>
                                            <div class="form-group">
                                                <label>Email</label>
                                                <input type="text" class="form-control" id="email" name="email" 
                                                    placeholder="Masukkan Email Baru Anda" />
                                            </div>
                                            <div class="form-group">
                                                <label>Password</label>
                                                <input type="password" class="form-control" id="password" name="password"
                                                    placeholder="Masukkan Password Baru Anda"  />
                                            </div><br></br>
                                            <div class="form-group">
                                                <button type="submit" class="btn btn-primary btn-block">Submit</button>
                                            </div><br></br>
                                            <Link to='/login'>
                                                <div class="text-center">
                                                    <a class="font-weight-bold small" href="#">Kembali ke halaman login !!</a>
                                                </div><br></br>
                                                <div class="text-center">
                                                </div>
                                            </Link>
                                            </form>
                                        </div>
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
export default Register;