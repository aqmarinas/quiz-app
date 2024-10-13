import Option from "../../components/ui/Option";

/* eslint-disable react/prop-types */
export default function QuizSection({ question, answers, callback, userAnswer }) {
  return (
    <>
      <div className="mb-4 h-12">
        <h3
          dangerouslySetInnerHTML={{ __html: question }}
          className="font-semibold"
        />
      </div>
      <div>
        {answers.map((answer) => (
          <div
            key={answer}
            className="mb-2"
          >
            <Option
              answer={answer}
              isSelected={userAnswer?.answer === answer}
              callback={callback}
              userAnswer={userAnswer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </Option>
          </div>
        ))}
      </div>
    </>
  );
}
