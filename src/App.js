import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  pageSize = 6;
  // apiKey = "45e272b319684494826016f1ffcec203";
  apiKey = process.env.REACT_APP_NEWS_API;
  // coder = 'Mohammad Ali';
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <>
        <div>
          {/* This is a React Class Based Component by {this.coder} */}
          <Router>
            <NavBar />
            <LoadingBar
              height={3}
              color='#f11946'
              progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
            />
            <Routes>
              {/* <Route path='/' element={<News pageSize={8} country="in" category="about" />}></Route>    */}
              <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} country="in" category="general" />}></Route>
              <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={this.pageSize} country="in" category="business" />}></Route>
              <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
              <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} country="in" category="general" />}></Route>
              <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={this.pageSize} country="in" category="health" />}></Route>
              <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageSize} country="in" category="science" />}></Route>
              <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country="in" category="sports" />}></Route>
              <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country="in" category="technology" />}></Route>
            </Routes>
          </Router>
        </div>
      </>
    )
  }
}