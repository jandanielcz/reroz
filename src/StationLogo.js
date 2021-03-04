import './StationLogo.css'
import React from "react"


import ddur from './logo/d-dur.svg'
import dvojka from './logo/dvojka.svg'
import jazz from './logo/jazz.svg'
import junior from './logo/junior.svg'
import plus from './logo/plus.svg'
import prague from './logo/prague.svg'
import radio_retro from './logo/radio_retro.svg'
import radiozurnal from './logo/radiozurnal.svg'
import vltava from './logo/vltava.svg'
import wave from './logo/wave.svg'
import rozhlas from './logo/default.svg'

const StationLogo = (props) => {

    const logoMap = {
        radiozurnal: radiozurnal,
        'd-dur': ddur,
        dvojka: dvojka,
        jazz: jazz,
        radiojunior: junior,
        plus: plus,
        prague: prague,
        radio_retro: radio_retro,
        vltava: vltava,
        radiowave: wave,
    }

    const findLogo = () => {
        if (logoMap.hasOwnProperty(props.station)) {
            return <img src={logoMap[props.station]} alt="Logo stanice" />
        } else {
            return <img src={rozhlas} alt="Logo stanice" />
        }
    }



    return (
        <div className="StationLogo">
            {findLogo()}
        </div>
    )
}

export default StationLogo