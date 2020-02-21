import React, { useState } from 'react'
import car from './car.png'
import localisationIcon from './localisation.png'
import l1 from './distancePics/left/l1.png'
import l2 from './distancePics/left/l2.png'
import l3 from './distancePics/left/l3.png'
import l4 from './distancePics/left/l4.png'
import f1 from './distancePics/front/f1.png'
import f2 from './distancePics/front/f2.png'
import f3 from './distancePics/front/f3.png'
import f4 from './distancePics/front/f4.png'
import b1 from './distancePics/back/b1.png'
import b2 from './distancePics/back/b2.png'
import b3 from './distancePics/back/b3.png'
import b4 from './distancePics/back/b4.png'
import r1 from './distancePics/right/r1.png'
import r2 from './distancePics/right/r2.png'
import r3 from './distancePics/right/r3.png'
import r4 from './distancePics/right/r4.png'
import speedIcon from './speedIcon.png'
import issuesIcon from './issueIcon.jpg'
import { appStyle } from './appStyle'
import injectSheet from 'react-jss'
import io from 'socket.io-client'
const raspberryAdress = 'http://192.168.0.115:3000'
const socket = io(raspberryAdress)

const App = props => {
  let { classes } = props
  const [front, setFront] = useState(0)
  const [back, setBack] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [distance, setDistance] = useState(0)
  socket.on('connect', () => {
    console.warn('COOOOOONNNNEEEECTEEED')
  })
  socket.on('event', data => {
    setDistance(data)
    data > 0 && data < 10
      ? setBack(1)
      : data > 10 && data < 15
      ? setBack(2)
      : data > 15 && data < 20
      ? setBack(3)
      : setBack(0)
  })
  return (
    <div className={classes.App}>
      <h1>{distance}</h1>
      <div className={classes.infosDiv}>
        <div className={classes.speed}>
          <img className={classes.speedIcon} src={speedIcon} />
          <p>120 km/h</p>
        </div>
        <div className={classes.position}>
          <img className={classes.positionIcon} src={localisationIcon} />
          <p>Position label x</p>
        </div>
        <div className={classes.issues}>
          <img className={classes.issuesIcon} src={issuesIcon} />
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
          <img className={classes.car} src={car} />
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
