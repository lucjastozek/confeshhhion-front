import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SignInProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignIn({ setIsLoggedIn }: SignInProps): JSX.Element {
    const toast = useToast();
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignIn() {
        try {
            await axios.post("https://confeshhhion.onrender.com/login", {
                username: username,
                password: password,
            });

            toast({
                position: "top",
                title: "Login successfull!",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
        } catch (error) {
            toast({
                position: "top",
                title: "Error!",
                description: "Username or password invalid!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    return (
        <Card width={"60vw"} margin={"auto"}>
            <CardHeader>
                <Heading>Sign in</Heading>
            </CardHeader>
            <CardBody pb={6}>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                        isRequired={true}
                        placeholder="Enter username..."
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Enter password..."
                            isRequired={true}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <InputRightElement width="4.5rem">
                            <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => setShow(!show)}
                            >
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </CardBody>

            <CardFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSignIn}>
                    <Link to="/confessions">Sign in</Link>
                </Button>
                <Button>
                    <Link to="/register">Or click here to sign up</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default SignIn;
