function ReviewTitleAndText({ review_title, review_text }: { review_title: string; review_text: string }) {
	return (
		<>
			<h3 className="text-base font-semibold">{review_title}</h3>
			<div className="text-sm">{review_text}</div>
		</>
	);
}

export default ReviewTitleAndText;
