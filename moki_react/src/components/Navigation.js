
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import React, { useState } from 'react';
import Home from './Home'
import Tasks from './Tasks'
import FootPrints from "./FootPrints";
import Schedule  from "./Schedule";
import Topics from './Topics'
function Navigation(){
    const [page, setPage] = useState("home");
    function changePage(page){
        setPage(page)
    }
    const color = {
        home:"text-gray-600",
        schedule:"text-gray-600",
        tasks:"text-gray-600",
        footprints:"text-gray-600",
        topics:"text-gray-600"
    }
    color[page]="text-black"
    return(
      
        <Router>
<div className="flex  fixed z-10 top-0 bg-white flex-row items-center gap-1 shadow-sm w-full min-h-10 h-12">

        <p className="pl-4 text-green-500 font-semibold text-3xl">
        MOKI
        </p>
    <div>
    <Link to="/">
        <p className={`pl-10 hover:text-black  ${color["home"]} cursor-pointer `}>
        Home
        </p>
    </Link>
    </div>
    <div>
    <Link to="/schedule">
    <p className={`hover:text-black ${color["schedule"]} cursor-pointer `}>
        Schedule
    </p>
    </Link>
</div>
<div>
<Link to="/tasks">
    <p className={`hover:text-black ${color["tasks"]} cursor-pointer `}>
        Tasks
    </p>
    </Link>
</div>
<div>
<Link to="/footprints">
    <p className={`hover:text-black ${color["footprints"]} cursor-pointer `}>
        Footprints
    </p>
    </Link>
</div>
<div>
<Link to="/topics">
    <p className={`hover:text-black ${color["topics"]} cursor-pointer `}>
        Topics
    </p>
    </Link>
</div>
</div>
<Switch>
         <Route path="/topics">
          <Topics changePage={changePage} />
          </Route>
          <Route path="/footprints">
            <FootPrints changePage={changePage} />
          </Route>
          <Route path="/schedule">
            <Schedule changePage={changePage}/>
          </Route>
          <Route path="/tasks">
            <Tasks changePage={changePage} />
          </Route>
          <Route path="/">
            <Home changePage={changePage} />
          </Route>
          
</Switch>
</Router>

    )
}


  
  function About(props) {
      props.changePage("schedule")
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }

export default Navigation;