import { BrowserRouter, Route } from "react-router-dom";
import Register from "./Register";
import TypingPractice from "./TypingPractice";
import Onliners from "./Onliners";
import PlayDuel from "./PlayDuel";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <h2>My Typing Practice</h2>
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={TypingPractice} />
                <Route path="/onliners" component={Onliners} />
                <Route path="/play-duel-secret-link" component={PlayDuel} />
            </div>
        </BrowserRouter>
    );
}
