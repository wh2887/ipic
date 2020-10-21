import React from 'react'
import logo from './logo.svg'
import './App.css'
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import History from './pages/History'

function App() {
  return (
    <div className="app">
      <Header/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/history"  component={History}/>
          <Route path="/about"  component={About}/>
        </Switch>
      <Footer/>
    </div>
  )
}

export default App
