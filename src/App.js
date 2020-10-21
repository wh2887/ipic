import React,{ Suspense, lazy } from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'

const Home = lazy(()=> import('./pages/Home'))
const About = lazy(()=>import('./pages/About'))
const History = lazy(()=>import('./pages/History'))


function App() {
  return (
    <>
      <Header/>
      <main>
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/history"  component={History}/>
            <Route path="/about"  component={About}/>
          </Switch>
        </Suspense>
      </main>
      <Footer/>
    </>
  )
}

export default App
