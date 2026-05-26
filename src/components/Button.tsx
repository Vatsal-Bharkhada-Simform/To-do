const primary = "text-white bg-blue-500 rounded-4xl hover:bg-blue-600";
const secondary = "rounded-lg hover:bg-gray-200";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: "PRIMARY" | "SECONDARY";
}

const Button: React.FC<ButtonProps> = function (props: ButtonProps) {
	let buttonStyles: string =
		"px-4 py-2 cursor-pointer text-sm transition-all text-nowrap ";

	if (props.variant === "PRIMARY") {
		buttonStyles += primary;
	} else {
		buttonStyles += secondary;
	}

	return (
		<button
			className={`${buttonStyles} ${props.className}`}
			type={props.type}
			{...props}
		>
			{props.children}
		</button>
	);
};

export default Button;
