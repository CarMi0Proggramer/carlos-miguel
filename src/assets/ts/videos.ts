export function isRecentVideo(publishedAt: string) {
	const today = new Date();
	const videoDate = new Date(publishedAt);
	const diffTime = Math.abs(today.getTime() - videoDate.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays <= 3;
}
