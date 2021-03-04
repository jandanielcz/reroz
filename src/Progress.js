import './Progress.scss'
import React, {useEffect, useState} from "react"
import DateTime from "luxon/src/datetime"

const Progress = (props) => {

    let [width, setWidth] = useState(0);



    const calculateWidth = () => {
        let now = DateTime.now()
        let since = DateTime.fromISO(props.since)
        let till = DateTime.fromISO(props.till)
        let whole = till - since;
        let progress = now - since
        let w = (progress / whole) * 100
        return w
    }


    useEffect(() => {
        setTimeout(() => {
            setWidth(calculateWidth())
        }, 1000)
    })

    return (
        <div className="Progress">
            <div style={{width: `${Math.round(width)}%`}}></div>
        </div>
    )
}

export default Progress