import { Card, CardBody, CardFooter, IconButton, Text } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { ConfessionProps } from "./App";
import axios from "axios";

function Confession({
    confession,
}: {
    confession: ConfessionProps;
}): JSX.Element {
    async function handleUpVote() {
        await axios.put(
            `https://confeshhhion.onrender.com/confessions/${confession.id}/upvote`
        );
    }

    async function handleDownVote() {
        await axios.put(
            `https://confeshhhion.onrender.com/confessions/${confession.id}/downvote`
        );
    }

    return (
        <Card marginBottom={"2vh"} colorScheme="teal">
            <CardBody>
                <Text fontSize={"1.5rem"}>{confession.text}</Text>
            </CardBody>
            <CardFooter>
                <IconButton
                    colorScheme="green"
                    aria-label="Up vote"
                    icon={<ArrowUpIcon />}
                    onClick={handleUpVote}
                    marginRight={"1vw"}
                />
                <IconButton
                    colorScheme="red"
                    aria-label="Down vote"
                    icon={<ArrowDownIcon />}
                    onClick={handleDownVote}
                    marginRight={"1vw"}
                />
                <Text fontSize={"1.5rem"}>Votes: {confession.votes}</Text>
            </CardFooter>
        </Card>
    );
}

export default Confession;
