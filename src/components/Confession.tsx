import { Card, CardBody, Text } from "@chakra-ui/react";
import { ConfessionProps } from "./App";

function Confession({
    confession,
}: {
    confession: ConfessionProps;
}): JSX.Element {
    return (
        <Card marginBottom={"2vh"} colorScheme="teal">
            <CardBody>
                <Text fontSize={"1.5rem"}>{confession.text}</Text>
            </CardBody>
        </Card>
    );
}

export default Confession;
