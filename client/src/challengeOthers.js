import Register from "./register";
import { useDispatch, useSelector } from "react-redux";
import Onliners from "./onliners";

export default function ChallengeOthers() {
    const dispatch = useDispatch();
    const hideRegister = useSelector((state) => state && state.hideRegister);

    return (
        <>
            <h1>Challenge Others</h1>
            {!hideRegister && <Register />}
            {hideRegister && <Onliners />}
        </>
    );
}
