import TypingPractice from "./typingPractice";
import ChallengeOthers from "./challengeOthers";
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <h1>typing-practice-app</h1>
                <Route exact path="/" component={TypingPractice} />
                <Route path="/challenge-others" component={ChallengeOthers} />
            </div>
        </BrowserRouter>
    );
}
