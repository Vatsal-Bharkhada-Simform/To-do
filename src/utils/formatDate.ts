function getFormattedDate(date: string | Date) {
	return (
		new Date(date).toDateString().split(" ").slice(1, -1).join(" ") +
		", " +
		new Date(date).toLocaleTimeString("UTC", {
			hour: "numeric",
			minute: "2-digit",
		})
	);
}

export default getFormattedDate;
