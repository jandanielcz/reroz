import './Station.scss'
import React from "react"
import StationLogo from "./StationLogo"
import {DateTime} from "luxon"
import Progress from "./Progress"

const Station = (props) => {

    let now = DateTime.now()
    let future = props.schedule.filter(t => {
        let till = DateTime.fromISO(t.till)
        return till >= now
    })
    let current = future[0]

    const asset = () => {
        if (current.hasOwnProperty('edition') && current.edition.hasOwnProperty('asset')) {
            return <img src={current.edition.asset} alt=""/>
        }
        return ''
    }

    const nextContent = (t, distance = 0) => {

        return (
            <div className={`next distance-${distance}`}>
                <div className="time">{DateTime.fromISO(t.since).toLocaleString(DateTime.TIME_24_SIMPLE)}</div>
                <p>{t.title}</p>
            </div>
        )
    }

    return (
        <div className="Station" key={props.station}>
            <StationLogo station={props.station} />
            <div className="name">
                {asset()}
                <div className="textBox">
                    <h3>{current.title}</h3>
                </div>
            </div>
            <Progress since={current.since} till={current.till} />
            <div className="description">
                <p>{current.description}</p>
            </div>
            <div className="listen">
                {props.playerUrl !== null &&
                    <a href={props.playerUrl} target="_blank" rel="noreferrer">▷</a>
                }
            </div>
            {nextContent(future[1])}
            {nextContent(future[2], 1)}
        </div>
    )
}

export default Station