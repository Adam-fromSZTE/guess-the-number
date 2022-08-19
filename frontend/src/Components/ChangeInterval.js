import axios from 'axios'
import React, { Component, useEffect, useState } from 'react'

const ChangeInterval = (props) => {
    const setIntervalMax = props.setIntervalMax
    const name = props.name
    const actID = props.actID
    const setActID = props.setActID
    const intervalMax = props.intervalMax

    const [helper, setHelper] = useState(100)

    const handleClick = () => {
        setIntervalMax(helper)

        console.log('Max interval changed')
    }

    useEffect(() => {
        if (name != null) {
            axios
                .delete('http://localhost:4000/games/delete-game/' + actID)
                .then((res) => {
                    console.log(res)
                })

            axios
                .post('http://localhost:4000/games/start-game', {
                    name: name,
                    interval: intervalMax,
                })
                .then((res) => {
                    console.log(res)
                    setActID(res.data)
                })

            console.log('game started with new interval')
        }
    }, [intervalMax])

    return (
        <div className="bg-purple-400 p-2">
            <h6>Here you can change the max value of the game</h6>
            <input
                type="number"
                onChange={(e) => setHelper(e.target.value)}
            ></input>
            <button
                className="bg-slate-500 p-2 m-2"
                onClick={() => handleClick()}
            >
                Confirm
            </button>
        </div>
    )
}

export default ChangeInterval
