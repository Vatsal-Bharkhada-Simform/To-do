export default function Icon({
	path = "/public/sprite.svg",
	id = "",
}: {
	path?: string;
	id: string;
}) {
	return (
		<svg className="pointer-events-none w-[1.2rem] aspect-square">
			<use href={`${path}#${id}`}></use>
		</svg>
	);
}
