import { useState } from "react";
import Icon from "./Icon";

interface DropdownProps {
	placeholder?: string;
	options: readonly string[];
	value?: string;
	onChange: (newValue: string) => void;
	className?: string;
}

export default function Dropdown({ placeholder = "Select", options, value = "", onChange, className = "" }: DropdownProps) {
	const [open, setOpen] = useState(false);

	if (options.findIndex((val) => val === value) === -1) {
		console.warn(
			`Only an option item can be set as value. (${[value]}) is not present in provided options.`
		);
	}

	function toggleOpen() {
		setOpen((prev) => !prev);
	}

	function handleChange(option: string) {
		onChange(option);
		setOpen(false);
	}

	function handleBlur(e: React.FocusEvent) {
		if (e.currentTarget.contains(e.relatedTarget as Node)) return;
		setOpen(false);
	}

	return (
		<>
			<div className={`relative inline-block w-36 ${className}`} onBlur={handleBlur}>
				<button
					onClick={toggleOpen}
					className="w-full border-none cursor-pointer outline-none px-4 p-2 rounded-4xl text-gray-700 bg-gray-100"
				>
					<div className="flex gap-2 justify-between">
						<span className="text-ellipsis">
							{value || placeholder}
						</span>
						<Icon id="chevron-down" />
					</div>
				</button>

				<div
					className={`absolute top-full left-0 p-2 mt-2 border border-gray-100 shadow-dropdown rounded-lg overflow-hidden bg-white ${open ? "block" : "hidden"}`}
				>
					<ul>
						{options.map((option, index) => {
							return (
								<li key={String(option) + index}>
									<button
										className={`w-full flex gap-2 cursor-pointer border-none outline-none px-4 py-2 rounded-lg ${value === option ? "bg-blue-100 text-blue-600" : "bg-transparent text-gray-700 hover:bg-blue-50 focus:bg-blue-50"}`}
										onClick={() => handleChange(option)}
										autoFocus={option === value}
									>
										<Icon
											id="tickMark"
											className={`${value === option ? "opacity-100" : "opacity-0"}`}
										/>
										{option}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
