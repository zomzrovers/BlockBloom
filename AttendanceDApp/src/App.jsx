import { useState } from 'react'
import { Contract, BrowserProvider } from 'ethers'
import { abi, contractAddress } from './Attendance.json'

function App() {
  const [output, setOutput] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const [date, setDate] = useState("")
  const [isPresent, setIsPresent] = useState(false)
  const [attendance, setAttendance] = useState([])
  const [queryRollNumber, setQueryRollNumber] = useState("")

  const provider = new BrowserProvider(window.ethereum)

  const connectMetamask = async () => {
    const signer = await provider.getSigner()
    alert(`Connected to Metamask with address: ${signer.address}`)
  }

  const handleRegisterRollNumber = async () => {
    const signer = await provider.getSigner()
    const instance = new Contract(contractAddress, abi, signer)

    try {
      const trx = await instance.registerRollNumber(rollNumber)
      console.log('Transaction Hash:', trx.hash)
      alert(`Roll number ${rollNumber} registered successfully!`)
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleMarkAttendance = async (event) => {
    event.preventDefault()

    const signer = await provider.getSigner()
    const instance = new Contract(contractAddress, abi, signer)

    try {
      const trx = await instance.markAttendance(rollNumber, date, isPresent)
      console.log('Transaction Hash:', trx.hash)
      alert(`Attendance for ${rollNumber} on ${date} marked successfully!`)
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleGetAttendance = async () => {
    setAttendance([])  // Clear previous attendance data
    setOutput('')  // Clear previous output message

    const signer = await provider.getSigner()
    const instance = new Contract(contractAddress, abi, signer)

    try {
      const result = await instance.getAttendance(queryRollNumber)
      
      // Check if no records are found and show appropriate message
      if (result.length === 0) {
        setOutput('No attendance records found.')
      } else {
        const formattedData = result.map((record, index) => (
          <div key={index}>
            <p>Date: {record.date}</p>
            <p>Present: {record.isPresent ? 'Yes' : 'No'}</p>
            <hr />
          </div>
        ))
        setAttendance(formattedData)
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <>
      <h1>Attendance DApp IITK</h1>
      <button onClick={connectMetamask}>Connect to Metamask</button>

      <div>
        <h2>Register Roll Number</h2>
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button onClick={handleRegisterRollNumber}>Register Roll Number</button>
      </div>

      <form onSubmit={handleMarkAttendance}>
        <h2>Mark Attendance</h2>
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>
          Present:
          <input
            type="checkbox"
            checked={isPresent}
            onChange={() => setIsPresent(!isPresent)}
          />
        </label>
        <button type="submit">Mark Attendance</button>
      </form>

      <div>
        <h2>Get Attendance Records</h2>
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={queryRollNumber}
          onChange={(e) => setQueryRollNumber(e.target.value)}
        />
        <button onClick={handleGetAttendance}>Get Attendance</button>
        <div>{attendance}</div>
      </div>

      <p>{output}</p>
    </>
  )
}

export default App
