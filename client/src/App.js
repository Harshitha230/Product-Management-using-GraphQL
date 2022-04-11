import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './functionalities/Login'
import Signup from './functionalities/Signup'
import Dashboard from './functionalities/Dashboard'
import CreateProduct from './functionalities/createProduct'
import UpdateProduct from './functionalities/updateProduct'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Signup />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/dashboard" element={<Dashboard />} />

          <Route path="/create" element={<CreateProduct />} />

          <Route path="/update/:id" element={<UpdateProduct />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
