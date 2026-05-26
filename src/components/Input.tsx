export default function Input({
	type = "text",
	onChange,
	placeholder = "",
	value = "",
	className = "",
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			type={type}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			className={`p-2 text-sm font-normal border-none outline-none ${className}`}
			{...props}
		/>
	);
}
