import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'

const Table = (props) => {
   const table = props.table
   const setTable = props.setTable
   const name = props.name
   const actID = props.actID

   const [tableAll, setTableAll] = useState(false)
   const [tableName, setTableName] = useState(false)

   useEffect(() => {
      if (actID != null) {
         axios
            .get('http://localhost:4000/games/table')
            .then((res) => {
               setTable(res.data)
               console.log(res.data)
            })
            .catch((error) => console.log(error))
         console.log('the actID is:: ' + actID)
      }
   }, [actID])

   return (
      <div className="bg-grey-200 h-auto w-auto">
         {tableName && (
            <table className="inline mr-5 table-auto">
               <tbody className="bg-blue-400">
                  <tr>
                     <th className="p-3">Név</th>
                     <th className="p-3">Szám</th>
                     <th className="p-3">Idő</th>
                     <th className="p-3">Intervallum teteje</th>
                  </tr>
                  {name &&
                     table
                        .filter((x) => x.name === name)
                        .map((item, i) => {
                           return (
                              <tr key={i}>
                                 <td className="p-1">{item.name}</td>
                                 <td className="p-1">{item.number}</td>
                                 <td className="p-1">{item.time} másodperc</td>
                                 <td>{item.intervalMax}</td>
                              </tr>
                           )
                        })}
               </tbody>
            </table>
         )}
         {name && (
            <button
               onClick={() => setTableName(!tableName)}
               className="bg-blue-400 m-4 p-4"
            >
               {tableName ? 'Hide my games' : 'Show my games'}
            </button>
         )}

         {tableAll && (
            <table className="inline ml-5 table-auto">
               <tbody className="bg-green-400">
                  <tr>
                     <th className="p-3">Név</th>
                     <th className="p-3">Szám</th>
                     <th className="p-3">Idő</th>
                     <th className="p-3">Intervallum teteje</th>
                  </tr>
                  {name &&
                     table.map((item, i) => {
                        return (
                           <tr key={i}>
                              <td className="p-1">{item.name}</td>
                              <td className="p-1">{item.number}</td>
                              <td className="p-1">{item.time} másodperc</td>
                              <td>{item.intervalMax}</td>
                           </tr>
                        )
                     })}
               </tbody>
            </table>
         )}
         {name && (
            <button
               onClick={() => setTableAll(!tableAll)}
               className="bg-green-400 m-4 p-4"
            >
               {tableAll ? 'Hide all the games' : 'Show all the games'}
            </button>
         )}
      </div>
   )
}

export default Table
