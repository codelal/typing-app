import { BrowserRouter, Route } from "react-router-dom";
import Register from "./register";
import TypingPractice from "./typingPractice";
import ChallengeOthers from "./challengeOthers";

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
