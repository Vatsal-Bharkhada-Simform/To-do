export default function isValidToDo(text: string) {
	if (text.trim() === "" || !/[\^a-zA-Z]+/.test(text.trim())) return false;
	return true;
}
