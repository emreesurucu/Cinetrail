import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import HomePage  from './Pages/HomePage/HomePage'
import Footer from './Components/Footer/Footer'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Favorites from './Pages/Favorites/Favorite'
import CombinedContextProvider from './context/index'


function App() {
 
  return (
    <>
      <BrowserRouter>
        <CombinedContextProvider>
          <Header />
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/movieDetails/:movieId"} element={<MovieDetails />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/signin"} element={<SignIn />} />
            <Route path={"/myFavorites"} element={<Favorites />} />
            <Route path={"*"} element={<HomePage />} />
          </Routes>
          <Footer />
        </CombinedContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
