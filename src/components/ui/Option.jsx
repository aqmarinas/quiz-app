export default function Option({ answer, callback, userAnswer, isSelected }) {
  return (
    <button
      className={`w-full px-4 py-2 border rounded-lg text-left focus:outline-none 
        ${isSelected ? "bg-indigo-500 text-white" : "bg-gray-200 hover:bg-indigo-100 text-gray-700"}`}
      disabled={userAnswer?.answer ? true : false}
      value={answer}
      onClick={callback}
    >
      <span dangerouslySetInnerHTML={{ __html: answer }} />
    </button>
  );
}
