import { Button, FormLabel, Textarea } from "@chakra-ui/react";
import { ConfessionProps } from "./App";
import Confession from "./Confession";
import { useState } from "react";
import axios from "axios";

interface ConfessionsListProps {
    confessions: ConfessionProps[];
}

function ConfessionsList({ confessions }: ConfessionsListProps): JSX.Element {
    const [confession, setConfession] = useState("");

    async function handleAddConfession() {
        await axios.post("https://confeshhhion.onrender.com/confessions", {
            text: confession,
        });

        setConfession("");
    }

    return (
        <div className="confessions">
            <FormLabel>Add a confession</FormLabel>
            <Textarea
                pr="4.5rem"
                value={confession}
                onChange={(e) => {
                    setConfession(e.target.value);
                }}
                placeholder="Enter a confession..."
                size="sm"
                isRequired={true}
            />
            <Button onClick={handleAddConfession}>Submit</Button>
            {confessions.map((c) => (
                <Confession confession={c} key={c.id} />
            ))}
        </div>
    );
}

export default ConfessionsList;
