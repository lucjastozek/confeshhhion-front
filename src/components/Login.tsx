import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SignInProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignIn({ setIsLoggedIn }: SignInProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
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
            onClose();
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
        } catch (error) {
            toast({
                position: "top",
                title: "Error!",
                description: `${error}`,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    return (
        <div>
            <Button onClick={onOpen}>Click here to sign in!</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign in</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
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
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleSignIn}
                        >
                            <Link to="/confessions">Sign in</Link>
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default SignIn;
