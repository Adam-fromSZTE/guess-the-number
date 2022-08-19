import axios from 'axios'
import React, { Component, useEffect } from 'react'
import { useState } from 'react'

const Game = (props) => {
    const name = props.name
    const setName = props.setName

    const actID = props.actID
    const setActID = props.setActID

    const intervalMax = props.intervalMax

    const [nameHelp, setNameHelp] = useState('')
    const [numberHelp, setNumberHelp] = useState(0)
    const [help, setHelp] = useState('Add meg a neved')
    const [number, setNumber] = useState()

    const handleClick = () => {
        name ? setNumber(numberHelp) : setName(nameHelp)
        setHelp('Tippelj')
    }

    //Which upload data to the server when the player enter the name
    useEffect(() => {
        if (name != null) {
            axios
                .post('http://localhost:4000/games/start-game', {
                    name: name,
                    interval: intervalMax,
                })
                .then((res) => {
                    console.log(res)
                    setActID(res.data)
                })
            console.log('start')
        }
    }, [name])

    useEffect(() => {
        if (number != null) {
            axios
                .post('http://localhost:4000/games/tipp/' + actID, {
                    number: number,
                })
                .then((res) => {
                    console.log(res.data)
                    setHelp(res.data)
                })
            console.log('tipp')
        }
    }, [number])

    useEffect(() => {
        if (help.startsWith('Eltaláltad')) {
            axios
                .post('http://localhost:4000/games/start-game', {
                    name: name,
                    interval: intervalMax,
                })
                .then((res) => {
                    console.log(res)
                    setActID(res.data)
                })
            console.log('start')
        }
    }, [help])

    return (
        <div className="bg-green-400 p-8 m-2">
            <h4 className="mb-4 p-4">{help}</h4>
            <input
                type={name ? 'number' : 'text'}
                onChange={
                    name
                        ? (e) => setNumberHelp(e.target.value)
                        : (e) => setNameHelp(e.target.value)
                }
            ></input>
            <button
                className="bg-blue-400 p-4 ml-4"
                onClick={() => handleClick()}
            >
                {name ? 'Tipp!' : 'Elfogadás'}
            </button>
        </div>
    )
}

export default Game
