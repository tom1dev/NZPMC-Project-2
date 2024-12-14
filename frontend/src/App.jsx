import './styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"
import Admin from "./pages/Admin"
import SignIn from "./pages/Signin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="admin" element={<Admin />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
