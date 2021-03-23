import { copyFileSync } from 'fs';
import React, { Component } from 'react';
import { useState } from "react";
import './Profile.css'
import { ProfileInfo, AddNewSong, GetMySongs } from './profileComponents'
import { gethttp, posthttp, URL } from '../requests/Requests'
// signup


const SignUpForm = () => {
  return (
    <>
      <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">@</span>
        </div>
        <input data-aos-delay="200" type="text" id="signUpusername" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
      </div>

      <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
        <input type="text" id="signUpemail" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">@example.com</span>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
        <input type="password" id="signUppassword" class="form-control" placeholder="Password"></input>
      </div>
      <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
        <input type="password" id="accesstoken" class="form-control" placeholder="AccessToken"></input>
      </div>

    </>
  )
}

const SignInForm = () => {
  return (
    <>
      <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">@</span>
        </div>
        <input data-aos-delay="200" type="text" id="signInusername" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
      </div>

      <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
        <input type="password" id="signInpassword" class="form-control" placeholder="Password"></input>
      </div>

    </>
  )
}


const LoginPage = () => {
  const onSignUpClickButton = () => {
    let username = document.getElementById("signUpusername").value
    let email = document.getElementById("signUpemail").value
    let password = document.getElementById("signUppassword").value
    let accesstoken = document.getElementById("accesstoken").value
    let data = { username, password, email, accesstoken}
    posthttp(URL + "/api/signup", data)
      .then((value) => {
        let status = value.status
        let message = value.body.message
        if (status == 200) {
          window.open("/profile", "_self");
        } else {
          alert("error in sign in:\n" + value.body.error)
        }
      })
  }

  const onSignInClickButton = () => {
    let username = document.getElementById("signInusername").value
    let password = document.getElementById("signInpassword").value
    let data = { username, password }
    posthttp(URL + "/api/signin", data)
      .then((value) => {
        let status = value.status
        let message = value.body.message
        if (status == 200) {
          window.open("/profile", "_self");
        } else {
          alert("error in sign in:\n" + "wrong parameters")
        }
      })

  }

  return (
    <>

      <section class="signin" id="signin">
        <div class="container col-12">
          <div class="row">

            <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
              <h2 class="mb-3 text-white" data-aos="fade-up">sign in</h2>

              <SignInForm />

              <p data-aos="fade-up" data-aos-delay="200">if you dont have an account contact alipourgahsemi78@gmail.com<br /> we missed you.</p>

              <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal" onClick={onSignInClickButton}>Log In To Your Account</a>
            </div>

            <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">
              <div class="about-working-hours">
                <div>

                  <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">Masoud photography</h2>

                  <p data-aos="fade-up" data-aos-delay="800">photography is the story</p>
                  <p data-aos="fade-up" data-aos-delay="800">i fail to put into words</p>
                  <p data-aos="fade-up" data-aos-delay="800">-Destin Sparks</p>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      <section class="signup" id="signup">
        <div class="container col-12">
          <div class="row">

            <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
              <h2 class="mb-3 text-white" data-aos="fade-up">sign up</h2>

              <SignUpForm />

              <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal" onClick={onSignUpClickButton}>Become a member</a>

              <p data-aos="fade-up" data-aos-delay="200">for signing up you need admins access key. to find a key contact <a rel="nofollow" href="#" target="_parent">alipourghasemi78@gmail.com</a></p>
            </div>

            <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">
              <div class="about-working-hours">
                <div>

                  <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">Masoud photography</h2>

                  <p data-aos="fade-up" data-aos-delay="800">When words become unclear, I shall focus with photographs. </p>
                  <p data-aos="fade-up" data-aos-delay="800">When images become inadequate, I shall be content with silence.</p>
                  <p data-aos="fade-up" data-aos-delay="800">-Ansel Adams</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

    </>
  )
}
// prfile
function UserProfile({ user }) {
  console.log(user.username);
  return (
    <div>
      <ProfileInfo user={user} />
      <AddNewSong />
      <GetMySongs />
    </div>
  )
}


function Profile() {

  const [counter, updateCounter] = useState({ isLoggedIn: false })
  gethttp(URL + "/api/getcurrentuser").then(
    (res) => {
      let isLoggedInRemote = res.body.message ? true : false
      let isLoggedInLocal = counter.isLoggedIn
      if (isLoggedInRemote != isLoggedInLocal) {
        updateCounter({ isLoggedIn: isLoggedInRemote, currentUser: res.body.message })
      }
    }
  )

  return (
    <>
      {
        counter.isLoggedIn ?
          <UserProfile user={counter.currentUser} /> :
          <LoginPage />
      }
    </>
  )
}

export default Profile;