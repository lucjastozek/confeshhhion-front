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
    Textarea,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";

interface RegisterProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Register({ setIsLoggedIn }: RegisterProps): JSX.Element {
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

            await axios.post("https://confeshhhion.onrender.com/confessions", {
                text: confession,
            });

            toast({
                position: "top",
                title: "Account created!",
                description: "Your account has been successfully created!",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
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
        <Card width={"60vw"} margin={"auto"}>
            <CardHeader>
                <Heading>Create your account</Heading>
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
            </CardBody>

            <CardFooter>
                <Button colorScheme="blue" mr={3} onClick={handleRegisterUser}>
                    <Link to="/confessions">Register</Link>
                </Button>
                <Button>
                    <Link to="/login">Or click here to sign in</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Register;
