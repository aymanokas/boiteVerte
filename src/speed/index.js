import React from 'react'
import style from './style'

const Speed = (props) => {
  let {classes} = props
  const speedEnum = [0,20,40,60,80,100,120,140,160,180,200,220,240]
  return (
    <div className={classes.root}>
      <div className={classes.outerCircle}>
        <div className={classes.innerCirle}>
          <span className={classes.spiner}/>
        </div>
      </div>
    </div>
  )
}

export default injectSheet(style)(Speed)
