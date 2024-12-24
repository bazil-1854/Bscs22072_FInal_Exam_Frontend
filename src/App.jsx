import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './assets/Navbar'; 
import Footer from './assets/Footer'; 
import SignUpForm from './Components/Authentication/SignUp';
import SignInnForm from './Components/Authentication/SignIn';
import Profile from './Components/Authentication/Profile';  

function App() {

  return (

    <Router>
      <Navbar />
      <Routes>  

        {/* <Route path="/signUp" element={<SignUpForm />} /> */}
        <Route path="/" element={<SignUpForm />} />
        <Route path="/signIn" element={<SignInnForm />} />
        <Route path="/profile" element={<Profile />} />
  
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
