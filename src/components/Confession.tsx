import { Card, CardBody, Text } from "@chakra-ui/react";
import { ConfessionProps } from "./App";

function Confession({
    confession,
}: {
    confession: ConfessionProps;
}): JSX.Element {
    return (
        <Card>
            <CardBody>
                <Text>{confession.text}</Text>
            </CardBody>
        </Card>
    );
}

export default Confession;
