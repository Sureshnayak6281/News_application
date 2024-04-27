import React,{useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar';
import News from './component/News';
import LoadingBar from 'react-top-loading-bar';
import './App.css';

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <LoadingBar color='#f11946' progress={progress} />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} pageSize={9} country='in' category='general' />} />
          <Route path="/business" element={<News setProgress={setProgress} pageSize={9} country='in' category='business' />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} pageSize={9} country='in' category='entertainment' />} />
          <Route path="/general" element={<News setProgress={setProgress} pageSize={9} country='in' category='general' />} />
          <Route path="/health" element={<News setProgress={setProgress} pageSize={9} country='in' category='health' />} />
          <Route path="/science" element={<News setProgress={setProgress} pageSize={9} country='in' category='science' />} />
          <Route path="/sports" element={<News setProgress={setProgress} pageSize={9} country='in' category='sports' />} />
          <Route path="/technology" element={<News setProgress={setProgress} pageSize={9} country='in' category='technology' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
