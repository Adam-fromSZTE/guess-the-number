import { useState } from 'react'
import './App.css'
import ChangeInterval from './Components/ChangeInterval'
import Game from './Components/Game'
import Table from './Components/Table'
import axios from 'axios'
import { useBeforeunload } from 'react-beforeunload'

function App() {
   const [name, setName] = useState()
   const [table, setTable] = useState([])
   const [actID, setActID] = useState()
   const [intervalMax, setIntervalMax] = useState(100)

   useBeforeunload((event) => {
      if (name != null) {
         axios
            .delete('http://localhost:4000/games/delete-game/' + actID)
            .then((res) => {
               console.log(res)
            })
      }

      // added the delay otherwise database operation will not work
      this.setTimeout('Wait for database action', 5000)

      return
   })

   return (
      <div className="App">
         <h1 className="h-12">Guess the number from 0 to {intervalMax}</h1>
         <Game
            name={name}
            setName={setName}
            actID={actID}
            setActID={setActID}
            intervalMax={intervalMax}
         />
         <ChangeInterval
            setIntervalMax={setIntervalMax}
            name={name}
            actID={actID}
            setActID={setActID}
            intervalMax={intervalMax}
         />
         <Table name={name} table={table} setTable={setTable} actID={actID} />
      </div>
   )
}

export default App
