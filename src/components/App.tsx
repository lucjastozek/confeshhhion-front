import { useEffect, useState } from "react";
import "./App.css";
import Register from "./Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Login";
import axios from "axios";
import ConfessionsList from "./ConfessionsList";
export interface ConfessionProps {
    id: number;
    text: string;
    votes: number;
}
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("isLoggedIn"))
    );
    const [confessions, setConfesssions] = useState<ConfessionProps[]>([]);

    useEffect(() => {
        async function fetchConfessions() {
            const response = await axios.get(
                "https://confeshhhion.onrender.com/confessions"
            );

            setConfesssions(response.data);
        }

        fetchConfessions();
    }, [confessions]);

    return (
        <>
            <header>
                <h1>Confeshhhion 🤫</h1>
            </header>
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isLoggedIn ? (
                                    <ConfessionsList
                                        confessions={confessions}
                                    />
                                ) : (
                                    <Register setIsLoggedIn={setIsLoggedIn} />
                                )
                            }
                        >
                            <Route
                                path="*"
                                element={
                                    <h1>
                                        404 Page Not Found! Happy Birthday, or
                                        whatever
                                    </h1>
                                }
                            />
                        </Route>
                        <Route
                            path="/register"
                            element={<Register setIsLoggedIn={setIsLoggedIn} />}
                        />
                        <Route
                            path="/login"
                            element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
                        />
                        <Route
                            path="/confessions"
                            element={
                                isLoggedIn ? (
                                    <ConfessionsList
                                        confessions={confessions}
                                    />
                                ) : (
                                    <Register setIsLoggedIn={setIsLoggedIn} />
                                )
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
