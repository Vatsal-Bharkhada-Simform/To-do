export default function Input({
	type = "text",
	onChange,
	placeholder = "",
	value = "",
	...props
}) {
	return (
		<input
			type={type}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			className="w-full p-2 font-normal border-none outline-none"
			{...props}
		/>
	);
}
