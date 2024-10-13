import { formatTime } from "../../utils/formatTime";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function QuizHeader({ qNumber, questions, timer }) {
  return (
    <>
      <div className="flex justify-between items-center mb-4 text-md">
        <p className="text-slate-500">
          Question {qNumber + 1} of {questions.length}
        </p>
        <div className="p-2 border border-1 rounded-md w-20 text-center flex">
          {" "}
          <ClockIcon className="h-6 w-6 mr-2 " />
          {formatTime(timer)}
        </div>
      </div>
    </>
  );
}
