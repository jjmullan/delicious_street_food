function CreateReviewTitle({
	title,
	subtitle,
	isNecessary,
}: {
	title: string;
	subtitle: string;
	isNecessary: boolean;
}) {
	return (
		<h3 className="text-sm">
			<span className="font-semibold">{title}</span>
			{subtitle}
			&nbsp;{isNecessary && <span className="text-red font-bold">*</span>}
		</h3>
	);
}

export default CreateReviewTitle;
