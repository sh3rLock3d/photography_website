import React, { Component } from 'react';
import { useState } from "react";
import { gethttp, posthttp, URL } from '../requests/Requests'

const HomePics = ({allPics}) => {
  debugger
  return(
    <p>recived</p>
  )
}



const Home = () => {

  const [counter, updateCounter] = useState({ responseIsRecieved: false })
  const requestUrl = URL + "/api/getallpics"
  gethttp(requestUrl).then((res) => {
      let remoteresponseIsRecieved = true
      let localresponseIsRecieved = counter.searchIsFound
      if (remoteresponseIsRecieved != localresponseIsRecieved) {
          updateCounter({ responseIsRecieved: remoteresponseIsRecieved, result: res.body.message })
      }

  })
  return (
    <>
        {
            counter.responseIsRecieved ?
                <HomePics allPics={counter.result} /> :
                <p>loading...</p>
        }
    </>
);

}

export default Home;