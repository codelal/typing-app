import { BrowserRouter, Route } from "react-router-dom";
import Register from "./Register";
import TypingPractice from "./TypingPractice";
import ChallengeOthers from "./ChallengeOthers";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <h1>App</h1>
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={TypingPractice} />
                <Route path="/challenge-others" component={ChallengeOthers} />
            </div>
        </BrowserRouter>
    );
}
