import { Login } from "./Components/authentication/login/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from "./Components/authentication/signup/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Login />
        <Routes>
          <Route path="/signup" element={<Signup/>}/>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
