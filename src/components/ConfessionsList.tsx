import { Button, FormLabel, Textarea, useToast } from "@chakra-ui/react";
import { ConfessionProps } from "./App";
import Confession from "./Confession";
import { useState } from "react";
import axios from "axios";
import fetchConfessions from "../utils/fetchConfessions";
import { z } from "zod";

interface ConfessionsListProps {
    confessions: ConfessionProps[];
    setConfessions: React.Dispatch<React.SetStateAction<ConfessionProps[]>>;
}

function ConfessionsList({
    confessions,
    setConfessions,
}: ConfessionsListProps): JSX.Element {
    const [confession, setConfession] = useState("");
    const toast = useToast();

    async function handleAddConfession() {
        try {
            z.string()
                .min(10, "Confession should contain at least 10 characters")
                .parse(confession);

            await axios.post("https://confeshhhion.onrender.com/confessions", {
                text: confession,
            });

            setConfession("");
            fetchConfessions(setConfessions);
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach((err) => {
                    toast({
                        position: "top",
                        title: "Error!",
                        description: err.message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                });
            }
        }
    }

    return (
        <div className="confessions">
            <FormLabel fontSize={"1.5rem"}>Add a confession</FormLabel>
            <Textarea
                pr="4.5rem"
                value={confession}
                onChange={(e) => {
                    setConfession(e.target.value);
                }}
                placeholder="Enter a confession..."
                size="md"
                isRequired={true}
            />
            <Button marginBottom={"4vh"} onClick={handleAddConfession}>
                Submit
            </Button>
            {confessions
                .sort((a, b) => b.votes - a.votes)
                .map((c) => (
                    <Confession
                        confession={c}
                        key={c.id}
                        setConfessions={setConfessions}
                    />
                ))}
        </div>
    );
}

export default ConfessionsList;
