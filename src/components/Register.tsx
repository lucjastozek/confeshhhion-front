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
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";

function Register(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confession, setConfession] = useState("");

    const UserData = z.object({
        username: z
            .string()
            .min(5, "Username should have at least 5 characters")
            .max(50, "Username should have maximum 50 characters"),
        password: z
            .string()
            .min(8, "Password should have at least 8 characters")
            .max(100, "Password should have maximum 100 characters")
            .regex(/[a-z]/, "Password should contain a lowercase letter")
            .regex(/[A-Z]/, "Password should contain an uppercase letter")
            .regex(/[0-9]/, "Password should contain a number")
            .regex(
                /[*.!@#$%^&(){}[\]:";'<>,.?/~`_+\-=|\\]/,
                "Password should contain a special character"
            ),

        confession: z
            .string()
            .min(10, "Confession should contain at least 10 characters"),
    });

    interface UserProps {
        username: string;
        password: string;
        confession: string;
    }

    function validateData(data: UserProps) {
        return UserData.parse(data);
    }

    async function handleRegisterUser() {
        try {
            validateData({
                username: username,
                password: password,
                confession: confession,
            });

            await axios.post("https://confeshhhion.onrender.com/register", {
                username: username,
                password: password,
            });

            toast({
                position: "top",
                title: "Account created!",
                description: "Your account has been successfully created!",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            onClose();
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
            } else {
                toast({
                    position: "top",
                    title: "Error!",
                    description:
                        "User with that name already exists. Choose another username.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    }

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
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
                        <FormControl mt={4}>
                            <FormLabel>Confession</FormLabel>
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
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleRegisterUser}
                        >
                            Register
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Register;
