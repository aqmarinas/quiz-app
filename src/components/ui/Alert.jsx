import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";

const AlertTypes = {
  success: {
    bgColor: "bg-green-50",
    iconColor: "text-green-400",
    textColor: "text-green-800",
    icon: CheckCircleIcon,
  },
  error: {
    bgColor: "bg-red-50",
    iconColor: "text-red-400",
    textColor: "text-red-800",
    icon: XCircleIcon,
  },
  warning: {
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-400",
    textColor: "text-yellow-800",
    icon: ExclamationCircleIcon,
  },
};

export default function Alert({ type, message }) {
  const { bgColor, textColor, iconColor, icon: Icon } = AlertTypes[type];

  return (
    <div className={`rounded-md ${bgColor} p-4 mb-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            aria-hidden="true"
            className={`h-5 w-5 ${iconColor}`}
          />
        </div>
        <div className={`ml-3 text-sm ${textColor}`}>{message}</div>
      </div>
    </div>
  );
}
