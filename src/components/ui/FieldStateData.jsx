import { CheckIcon, ExclamationTriangleIcon, Cross2Icon } from '@radix-ui/react-icons'

export const InputStateConfig = {
  success: {
    container:
      "border-green-500 bg-green-50 shadow-[0_0_6px_2px_rgba(34,197,94,0.4)]",
    message: "text-green-600",
    icon: <CheckIcon className="w-5 h-5 text-green-600" />,
  },
  warning: {
    container:
      "border-yellow-500 bg-yellow-50 shadow-[0_0_6px_2px_rgba(202,138,4,0.4)]",
    message: "text-yellow-600",
    icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />,
  },
  error: {
    container:
      "border-red-500 bg-red-50 shadow-[0_0_6px_2px_rgba(239,68,68,0.4)]",
    message: "text-red-600",
    icon: <Cross2Icon className="w-5 h-5 text-red-600" />,
  },
  disabled: {
    container: "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed",
    message: "text-gray-400",
    icon: null,
  },
  default: {
    container: "border-gray-300 bg-white",
    message: "text-gray-500",
    icon: null,
  },
}