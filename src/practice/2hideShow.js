import { useState, useEffect } from "react";

function Hello() {
  //3.
  useEffect(() => {
    console.log("hi :)");
    return () => console.log("bye :(");
  }, []);
  /*
  useEffect(function() {
    console.log("hi :)");
    return function() {
      console.log("bye :(");
    }
  }, []);
  */
  return <h1>Hello</h1>;

 /* 
  //2.
  function byFn() {
    console.log("bye :(");
  }

  function hiFn() {
    console.log("hi :)");
    return byFn;
  }
  useEffect(hiFn, []);
  return <h1>Hello</h1>;
*/
  
/*
  //1.
  useEffect(() => {
    console.log("created :)");
    return () => console.log("destroyed :(");
  }, []);
  return <h1>Hello</h1>;
*/
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing(prev => !prev);

  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
