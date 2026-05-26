const primary = "px-4 text-white bg-blue-500 rounded-4xl hover:bg-blue-600";
const secondary = "rounded-lg hover:bg-gray-200";
const danger = "rounded-lg hover:bg-red-100 hover:text-red-600";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: "PRIMARY" | "SECONDARY" | "DANGER";
}

const Button: React.FC<ButtonProps> = function ({
	className,
	...props
}: ButtonProps) {
	let buttonStyles: string =
		"px-2 py-2 cursor-pointer text-sm transition-all text-nowrap ";

	if (props.variant === "PRIMARY") {
		buttonStyles += primary;
	} else if (props.variant === "SECONDARY") {
		buttonStyles += secondary;
	} else {
		buttonStyles += danger;
	}

	return (
		<button className={`${buttonStyles} ${className}`} {...props}>
			{props.children}
		</button>
	);
};

export default Button;
