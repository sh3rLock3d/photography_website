import React from 'react';
import { useState } from "react";
import { gethttp, URL } from '../requests/Requests'
import './Home.css'




const PicElement = ({ picInfo }) => {
  const [counter, updateCounter] = useState({ imageRecived: false })
  const requestUrl = URL + "/api/getpicture" + "?id=" + picInfo.file + "&c=true"
  if (!counter.imageRecived) {
    gethttp(requestUrl).then((res) => {
      updateCounter({ imageRecived: true, result: res.body.message })
      console.log(counter.result)
    })
  }

  const image = counter.imageRecived ?
    <div class="imgWrapper">
      <img src={counter.result} alt={picInfo.title} class="mw-100 rounded"></img>
      <div class="card-title card-hover">
        <h6>
          {picInfo.title}
        </h6>
      </div>

      <h6 class="card-desc card-hover">{picInfo.descriptin} <br/> {picInfo.tags.join(" , ")} </h6>
    </div>
    :
    <div class="container-fluid no-padding">
      <div class="row">
        <div class="col-md-12 p-4">
          <div class="d-flex justify-content-center loadingspinner">
            <div class="spinner-border text-light " role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>





  return (
    <div class="card picElement">
      {image}
    </div>

  )
}



const HomePics = ({ allPics }) => {
  const [counter, updateCounter] = useState({ tagToShow: undefined })

  var tagset = new Set();
  for (let i in allPics) {

    for (let tag of allPics[i].tags) {
      tagset.add(tag)
    }
  }
  let picsToShow = [];
  if (counter.tagToShow) {
    for (let i of allPics) {
      if (i.tags.includes(counter.tagToShow)) {
        picsToShow.push(i)
      }
    }
  } else {
    picsToShow = allPics
  }


  return (
    <div class="container-fluid">
      <div class="row">

        <div class="showtags col-sm-12 col-md-2 order-3">
          <h6 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">categories</h6>
          {
            Array.from(tagset).map((tag) => {
              const showTagPic = () => {
                updateCounter({ tagToShow: tag })
              }
              return <p key={tag} data-aos="fade-up" data-aos-delay="800" onClick={showTagPic}>{tag}</p>
            }
            )
          }
          <p data-aos="fade-up" data-aos-delay="800" onClick={() => { updateCounter({ tagToShow: undefined }) }}>remove all categories</p>
        </div>

        <div class="showallpic col-sm-12 col-md-10 order-2 order-md-12">
          <div class="container-fluid">
            <div class="card-columns">
              {
                picsToShow.map((picInfo) => <PicElement key={picInfo.title} picInfo={picInfo} />)
              }
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}





const Home = () => {
  const [counter, updateCounter] = useState({ responseIsRecieved: false })
  const requestUrl = URL + "/api/getallpics"
  if (counter.responseIsRecieved == false) {
    gethttp(requestUrl).then((res) => {
      updateCounter({ responseIsRecieved: true, result: res.body.message })
    })
  }
  return (
    <>
      {
        counter.responseIsRecieved ?
          <HomePics allPics={counter.result} /> :
          <div class="loading">Loading&#8230;</div>
      }
    </>
  );

}

export default Home;