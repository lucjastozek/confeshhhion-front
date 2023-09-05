import axios from "axios";
import { ConfessionProps } from "../components/App";

async function fetchConfessions(
    setConfessions: React.Dispatch<React.SetStateAction<ConfessionProps[]>>
) {
    const response = await axios.get(
        "https://confeshhhion.onrender.com/confessions"
    );

    setConfessions(response.data);
}

export default fetchConfessions;
