import { useState, useEffect } from "react";
import Layout from "@/components/layouts/Layout";
import { fetchQuestions } from "@/services/api";
import QuizSection from "./QuizSection";
import QuizResults from "./QuizResults";
import Button from "../../components/ui/Button";
import QuizHeader from "./QuizHeader";

const INITIAL_TIMER = 10 * 60;

function Quiz() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(true);
  const [timer, setTimer] = useState(INITIAL_TIMER);

  const startQuiz = async () => {
    setLoading(true);
    setFinish(false);
    setTimer(INITIAL_TIMER);

    try {
      const newQuestions = await fetchQuestions();
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (e) => {
    if (finish) return;

    const answer = e.target.value;
    const correct = questions[number].correct_answer === answer;
    if (correct) {
      setScore((prev) => prev + 1);
    }
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
    nextQuestion();
  };

  const nextQuestion = () => {
    const next = number + 1;
    if (next < questions.length) {
      setNumber(next);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setFinish(true);
  };

  useEffect(() => {
    let timerId;

    if (!finish && timer > 0) {
      timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      endQuiz();
    }

    return () => clearInterval(timerId);
  }, [finish, timer]);

  const totalIncorrect = userAnswers.length - score;
  const totalAnswered = userAnswers.length;

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center mx-auto">
          <h1 className="text-2xl text-slate-800 font-bold tracking-tight sm:text-6xl mb-8">Quiz App</h1>

          {finish && <Button onClick={startQuiz}>Start Quiz</Button>}

          {loading && <p>Loading....</p>}
        </div>

        {finish && userAnswers.length > 0 && (
          <>
            <QuizResults
              questions={questions}
              userAnswers={userAnswers}
              totalCorrect={score}
              totalIncorrect={totalIncorrect}
              totalAnswered={totalAnswered}
              totalQuestions={questions.length}
            />
          </>
        )}

        {!loading && !finish && questions[number]?.answers && (
          <>
            <QuizHeader
              qNumber={number}
              questions={questions}
              timer={timer}
            />
            <QuizSection
              question={questions[number].question}
              answers={questions[number].answers}
              callback={checkAnswer}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
            />
          </>
        )}
      </Layout>
    </>
  );
}

export default Quiz;
