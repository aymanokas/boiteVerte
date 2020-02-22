import React, { useState } from 'react'
import car from './car.png'
import localisationIcon from './localisation.png'
import { l1, l2, l3, l4 } from './distancePics/left'
import { f1, f2, f3, f4 } from './distancePics/front'
import { b1, b2, b3, b4 } from './distancePics/back'
import { r1, r2, r3, r4 } from './distancePics/right'
import speedIcon from './speedIcon.png'
import issuesIcon from './issueIcon.jpg'
import { appStyle } from './appStyle'
import injectSheet from 'react-jss'
import io from 'socket.io-client'
const raspberryAdress = 'http://192.168.0.115:3000'
const socket = io(raspberryAdress)

let a = new AudioContext()
const beep = (vol, freq, duration) => {
  let v= a.createOscillator()
  let u= a.createGain()
  v.connect(u)
  v.frequency.value=freq
  v.type="square"
  u.connect(a.destination)
  u.gain.value=vol*0.01
  v.start(a.currentTime)
  v.stop(a.currentTime+duration*0.001)
}

const App = props => {
  let { classes } = props
  const [front, setFront] = useState(3)
  const [back, setBack] = useState(4)
  const [left, setLeft] = useState(4)
  const [right, setRight] = useState(4)
  const setAndBeep = (side) => {
    switch(side) {
      case 'back' :
          setBack(1);
          beep(30,1000,500);
          break
      case 'front' :
          setFront(1);
          beep(30,1000,500);
          break
      case 'left' :
          setLeft(1);
          beep(30,1000,500);
          break
      case 'right' :
          setRight(1);
          beep(30,1000,500);
          break
      default : setRight(0)
    }
  }

  socket.on('connect', () => {
    console.warn('Socket Connected')
  })
  socket.on('event', data => {
    data.back > 0 && data.back < 10
      ? setAndBeep('back') 
      : data.back > 10 && data.back < 15
      ? setBack(2)
      : data.back > 15 && data.back < 20
      ? setBack(3)
      : setBack(0)

       data.front > 0 && data.front < 10
      ? setAndBeep('front') 
      : data.front > 10 && data.front < 15
      ? setFront(2)
      : data.front > 15 && data.front < 20
      ? setFront(3)
      : setFront(0)

      data.left > 0 && data.left < 10
      ? setAndBeep('left') 
      : data.left > 10 && data.left < 15
      ? setLeft(2)
      : data.left > 15 && data.left < 20
      ? setLeft(3)
      : setLeft(0)

      data.right > 0 && data.right < 10
      ? setAndBeep('right') 
      : data.right > 10 && data.right < 15
      ? setRight(2)
      : data.right > 15 && data.right < 20
      ? setRight(3)
      : setRight(0)
  })
  return (
    <div className={classes.App}>
      <h1>Green Box</h1>
      <div className={classes.infosDiv}>
        <div className={classes.speed}>
          <img className={classes.speedIcon} src={speedIcon} alt='speed'/>
          <p>120 km/h</p>
        </div>
        <div className={classes.position}>
          <img className={classes.positionIcon} src={localisationIcon} alt='localisation'/>
          <p>Position label x</p>
        </div>
        <div className={classes.issues}>
          <img className={classes.issuesIcon} src={issuesIcon} alt='issues'/>
          <p>No Entries</p>
        </div>
      </div>
      <div className={classes.carDiv}>
        <div className={classes.leftDistance}>
          <img
            className={props.classes.distanceImg}
            src={
              left === 1
                ? l1
                : left === 2
                ? l2
                : left === 3
                ? l3
                : left === 4
                ? l4
                : null
            }
            alt='left distance'
          />
        </div>
        <div className={classes.distanceAndCar}>
          <div className={classes.frontDistance}>
            <img
              className={classes.distanceImg}
              src={
                front === 1
                  ? f1
                  : front === 2
                  ? f2
                  : front === 3
                  ? f3
                  : front === 4
                  ? f4
                  : null
              }
              alt='front distance'
            />
          </div>
          <img className={classes.car} src={car} alt='car'/>
          <div className={classes.backDistance}>
            <img
              className={classes.distanceImg}
              src={
                back === 1
                  ? b1
                  : back === 2
                  ? b2
                  : back === 3
                  ? b3
                  : back === 4
                  ? b4
                  : null
              }
              alt='back distance'
            />
          </div>
        </div>
        <div className={classes.rightDistance}>
          <img
            className={classes.distanceImg}
            src={
              right === 1
                ? r1
                : right === 2
                ? r2
                : right === 3
                ? r3
                : right === 4
                ? r4
                : null
            }
            alt='right distance'
          />
        </div>
      </div>
    </div>
  )
}

export default injectSheet(appStyle)(App)
