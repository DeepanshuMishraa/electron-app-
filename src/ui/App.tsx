import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [cpu, setCpu] = useState({ total: 0, usage: 0 });
  const [mem, setMem] = useState({ total: 0, usage: 0 });
  const [disk, setDisk] = useState({ total: 0, usage: 0 });

  useEffect(() => {
    //@ts-ignore
    window.electron.subscribeStatistics((data) => {
      if (data?.cpu) setCpu(data.cpu);
      if (data?.mem) setMem(data.mem);
      if (data?.disk) setDisk(data.disk);
    })
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>
          CPU: {cpu?.usage?.toFixed(1) ?? '0.0'}%
        </button>
        <button>
          MEM: {mem?.total ? ((mem.usage / mem.total) * 100).toFixed(1) : '0.0'}%
        </button>
        <button>
          DISK: {disk?.total ? ((disk.usage / disk.total) * 100).toFixed(1) : '0.0'}%
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more about deepanshu bhai
        kaise ho
      </p>
    </>
  )
}

export default App
