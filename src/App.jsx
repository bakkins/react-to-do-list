// App.jsx
import React, { useState, useEffect } from 'react';
import { TodoItem } from './components/TodoItem'; 
import { Spinner } from './components/spinner';

export default function App() {
  // --- Navigācijas stāvoklis ---
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'about' vai 'contact'

  // --- Todo saraksta stāvokļi ---
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // --- Contact formas stāvokļi ---
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Todo ielādes simulācija
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAdd = () => {
    if (!task || !startDate || !expiringDate) return; 
    const newRow = { id: Date.now(), task, startDate, expiringDate };
    setTasks([...tasks, newRow]); 
    setTask(""); setStartDate(""); setExpiringDate("");
  };

  const handleDeleteRow = (idToRemove) => {
    const filteredTasks = tasks.filter(item => item.id !== idToRemove);
    setTasks(filteredTasks);
  };

  // --- Contact formas iesniegšana ---
  const handleContactSubmit = (e) => {
    e.preventDefault(); // Novērš lapas pārlādēšanos

    // Izgūstam vērtības konsolē
    console.log("=== Jauna Contact Formas ziņa ===");
    console.log("Vārds:", contactName);
    console.log("E-pasts:", contactEmail);
    console.log("Ziņa:", contactMessage);

    // Notīrām formu pēc iesniegšanas
    alert("Forma veiksmīgi nosūtīta! Pārbaudi pārlūka konsoli (F12).");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  // --- Navigācijas stila funkcija ---
  const navLinkStyle = (tab) => ({
    padding: '10px 20px',
    margin: '0 5px',
    cursor: 'pointer',
    backgroundColor: currentTab === tab ? '#222' : '#f3f3f3',
    color: currentTab === tab ? '#fff' : '#000',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold'
  });

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      
      {/* ================= NAVIGĀCIJAS JOSLA ================= */}
      <nav style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
        <button onClick={() => setCurrentTab('home')} style={navLinkStyle('home')}>Home</button>
        <button onClick={() => setCurrentTab('about')} style={navLinkStyle('about')}>About</button>
        <button onClick={() => setCurrentTab('contact')} style={navLinkStyle('contact')}>Contact</button>
      </nav>

      {/* ================= 1. HOME SADAĻA (Tavs Todo List) ================= */}
      {currentTab === 'home' && (
        <div style={{ textAlign: 'center' }}>
          <h1>To do list in react</h1>
          <p>To do</p>
          <input type="text" id="task" value={task} onChange={(e) => setTask(e.target.value)} />
          <p>From when</p>
          <input type="date" name="start_date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
          <p>Till when</p>
          <input type="date" name="expiring_date" id="expiring_date" value={expiringDate} onChange={(e) => setExpiringDate(e.target.value)}/>
          <br />
          <button onClick={handleAdd} style={{ marginTop: '10px', padding: '5px 10px' }}>
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
              {isLoading ? (
                <tr>
                  <td colSpan={4} style={{ padding: '30px', border: '1px solid #ddd', textAlign: 'center' }}>
                    <Spinner size="medium" color="#222" />
                    <span style={{ color: '#666', fontSize: '14px' }}>Ielādē uzdevumus...</span>
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '20px', border: '1px solid #ddd', textAlign: 'center', color: '#888' }}>
                    Nav neviena uzdevuma. Pievieno jaunu virsū!
                  </td>
                </tr>
              ) : (
                tasks.map((item) => (
                  <TodoItem 
                    key={item.id} id={item.id} task={item.task} startDate={item.startDate} expiringDate={item.expiringDate} onDelete={handleDeleteRow}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= 2. ABOUT SADAĻA (Lorem Ipsum) ================= */}
      {currentTab === 'about' && (
        <div style={{ padding: '20px', lineHeight: '1.6' }}>
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      )}

      {/* ================= 3. CONTACT SADAĻA (Forma) ================= */}
      {currentTab === 'contact' && (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
          <h2>Contact Us</h2>
          {/* onSubmit izsauc mūsu funkciju, kura satur e.preventDefault() */}
          <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Vārds:</label>
              <input 
                type="text" 
                required
                value={contactName} 
                onChange={(e) => setContactName(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>E-pasts:</label>
              <input 
                type="email" 
                required
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Ziņa:</label>
              <textarea 
                rows="4" 
                required
                value={contactMessage} 
                onChange={(e) => setContactMessage(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px', backgroundColor: '#222', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              Send Message
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
