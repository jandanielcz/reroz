import './Deck.scss'
import React, { useState, useEffect } from "react"
import Station from "./Station"

const Deck = () => {

    const [isLoading, setLoading] = useState(false)
    const [stations, setStations] = useState([])
    const [stationsInfo, setStationsInfo] = useState([])
    const [counter, setCounter] = useState(0)

    const wantedStations = ['dvojka', 'radiozurnal', 'vltava', 'plus', 'radiowave', 'd-dur', 'jazz', 'junior']

    const filterStations = (stations) => {
        let f = {...stations}

        Object.keys(stations).forEach((key) => {
            if (!wantedStations.includes(key)) {
                delete f[key]
            }
        })
        return f
    }

    useEffect(() => {
        const loadSchedule = async () => {
            setLoading(true)
            let res = await fetch('https://api.rozhlas.cz/data/v2/schedule/day.json')
            let obj = await res.json()
            let filtered = filterStations(obj.data)
            setStations([...Object.values(filtered)])
            setLoading(false)

        }

        loadSchedule()
    }, [counter]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const loadStationInfo = async () => {
            let res = await fetch('https://api.rozhlas.cz/data/v2/meta/stations.json')
            let obj = await res.json()

            setStationsInfo(obj.data)
        }

        loadStationInfo()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const findPlayerUrl = (stationId) => {

        let s = stationsInfo.find((one) => {
            return one.id === stationId;
        })

        if (s && s.hasOwnProperty('services') && s.services.hasOwnProperty('player')) {
            return s.services.player
        }

        return null
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCounter(counter + 1)
        }, 30 * 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [counter])

    let classNames = `Deck${ isLoading ? ' isLoading' : '' }`
    return (
        <div className={classNames}>
            <div className="inner">
                {stations.map((station) => {
                    return (
                        <Station key={station[0].station}
                                 station={station[0].station}
                                 schedule={station}
                                 playerUrl={findPlayerUrl(station[0].station)}
                        />
                        )
                })}
            </div>
        </div>
    )
}

export default Deck