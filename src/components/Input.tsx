import type { RefObject } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	ref?: RefObject<HTMLInputElement | null>;
}

export default function Input({
	type = "text",
	onChange,
	placeholder = "",
	className = "",
	...props
}: InputProps) {
	return (
		<input
			type={type}
			onChange={onChange}
			placeholder={placeholder}
			className={`p-2 text-base font-normal border-none outline-none ${className}`}
			{...props}
		/>
	);
}
