import type { ImageURL } from '@/features/review/create/types/image';
import supabase from '@/shared/api/supabase/supabase';

export async function uploadProfileImage({ user_id, image }: { user_id: string; image?: ImageURL }) {
	if (!image) return;

	try {
		// 기존 이미지 삭제
		const { data: currentUser } = await supabase
			.from('user')
			.select('profile_image_url')
			.eq('user_id', user_id)
			.single();

		if (currentUser?.profile_image_url) {
			// URL에서 파일 경로 추출 (예: https://[...]/storage/v1/object/public/profile_images/user/xxx/profile/xxx.jpg)
			const urlParts = currentUser.profile_image_url.split('/profile_images/');
			if (urlParts.length > 1) {
				const oldFilePath = urlParts[1];
				await supabase.storage.from('profile_images').remove([oldFilePath]);
			}
		}

		// 새로운 이미지 파일 타입 준비
		const timestamp = Date.now();
		const randomString = Math.random().toString(36).substring(2, 9);
		const fileExtension = image.file.name.split('.').pop() || 'webp';
		const fileName = `${user_id}_${timestamp}_${randomString}.${fileExtension}`;
		const filePath = `user/${user_id}/profile/${fileName}`;

		// 스토리지 저장
		const { error: uploadeError } = await supabase.storage
			.from('profile_images')
			.upload(filePath, image.file, { cacheControl: '3600', upsert: false });
		if (uploadeError) throw uploadeError;

		// 테이블 저장
		const {
			data: { publicUrl },
		} = supabase.storage.from('profile_images').getPublicUrl(filePath);
		const { data: updatedImage, error: updateError } = await supabase
			.from('user')
			.update({ profile_image_url: publicUrl })
			.eq('user_id', user_id)
			.select()
			.single();

		if (updateError) throw updateError;
		return updatedImage;
	} catch (error) {
		console.log(error);
	}
}

/**
 * 모든 이미지 경로의 파일을 삭제하는 함수
 * @param path 아이디/이미지
 */
// export async function deleteProfileImage({ user_id, path }: { user_id: string; path: string }) {
// 	const { data: files, error: fetchFilesError } = await supabase.storage.from('profile_images').list(path);

// 	// 불필요한 삭제 요청 예외처리
// 	if (!files || files.length === 0) return;
// 	if (fetchFilesError) throw fetchFilesError;

// 	// API 요청
// 	const { error: removeError } = await supabase.storage
// 		.from('profile_images')
// 		.remove(files.map((file) => `/user/${path}/${file.name}`));
// 	if (removeError) throw removeError;
// }
