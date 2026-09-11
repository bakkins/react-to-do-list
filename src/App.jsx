import React, { useState } from 'react';

export default function App() {
  // 1. State, kurā glabāsim saraksta rindas
  const [tasks, setTasks] = useState([]);

  // 2. State, kas seko līdzi tam, ko Tu raksti katrā laukā
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiringDate, setExpiringDate] = useState("");

  // 3. Funkcija, kas paņem datus no inputiem un ieliek tabulā
  const handleAdd = () => {
    if (!task || !startDate || !expiringDate) return; // Ja kāds lauks tukšs, neko nedara

    const newRow = { id: Date.now(), task, startDate, expiringDate };
    setTasks([...tasks, newRow]); // Pievieno rindu sarakstam

    // Notīra laukus pēc tam, kad nospiedi Submit
    setTask("");
    setStartDate("");
    setExpiringDate("");
  };

  


  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>To do list in react</h1>
    <p>To do</p>
      <input type="text" id="task" value={task} onChange={(e) => setTask(e.target.value)} />
      <p>From when</p>
      <input type="date" name="start_date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
      <p>Till when</p>
      <input type="date" name="expiring_date" id="expiring_date" value={expiringDate} onChange={(e) => setExpiringDate(e.target.value)}/>
      <br />
      <button onClick={handleAdd}>
        Submit
      </button>
       <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }} id="result_table">
        <thead>
          <tr style={{ backgroundColor: '#222', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>To do</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Start</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>End</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Options</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => (
            <tr key={item.id} style={{ textAlign: 'left' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.task}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.startDate}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.expiringDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>    
  )
}
