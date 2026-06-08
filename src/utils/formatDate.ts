function getFormattedDate(date: string | Date) {
	return new Date(date).toLocaleTimeString("UTC", {
		hour: "numeric",
		minute: "2-digit",
	});
}

export default getFormattedDate;
