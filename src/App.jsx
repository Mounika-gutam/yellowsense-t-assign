import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails"

const App = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/jobs" element={<Jobs />} />
                <Route exact path="/job-details/:id" element={<JobDetails />} />
            </Routes>
        </Router>
    )
}
export default App;