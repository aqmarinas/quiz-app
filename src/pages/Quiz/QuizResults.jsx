/* eslint-disable react/prop-types */
export default function QuizResults({ totalCorrect, totalIncorrect, totalAnswered, totalQuestions }) {
  return (
    <>
      {/* count */}
      <div className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">{totalCorrect}</p>
            <p className="text-muted-foreground">Correct</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{totalIncorrect}</p>
            <p className="text-muted-foreground">Incorrect</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{totalQuestions}</p>
            <p className="text-muted-foreground">Total Questions</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{totalAnswered}</p>
            <p className="text-muted-foreground">Answered</p>
          </div>
        </div>
      </div>
    </>
  );
}
