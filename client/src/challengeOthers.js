import Register from "./register";
import { useDispatch, useSelector } from "react-redux";

export default function ChallengeOthers() {
    const dispatch = useDispatch();
    const hideRegister = useSelector((state) => state && state.hideRegister);

    return (
        <>
            <h1>Challenge Others</h1>
            {!hideRegister && <Register />}
        </>
    );
}
