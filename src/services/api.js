import { shuffleArray } from "../utils/shuffleArray";
import axios from "./axios";

export const fetchQuestions = async () => {
    const endpoint = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.results.map((question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        }
    ))
}  

export const login = async (username, password) => {
    const response = await axios.post("https://dummyjson.com/auth/login", JSON.stringify({ username, password }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}
