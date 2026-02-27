import type { ImageURL } from '@features/review/@x/profile';
import { bffPatch } from '@shared/api/bff/client';
import supabase from '@shared/api/supabase/supabase';
import type { User } from '@shared/types/api';

/**
 * @description 사용자 프로필 이미지를 업로드하고 기존 이미지를 교체합니다.
 *
 * 동작 과정:
 * 1. 기존 프로필 이미지 조회 및 Storage 삭제 (클라이언트 직접)
 * 2. 새 이미지를 Supabase Storage 'profile_images' 버킷에 업로드 (클라이언트 직접)
 * 3. Public URL 생성
 * 4. BFF(/api/profile/image)를 통해 user 테이블의 profile_image_url 필드 업데이트
 *
 * @param {Object} params - 이미지 업로드 파라미터
 * @param {string} params.user_id - 사용자 ID
 * @param {ImageURL} [params.image] - 업로드할 이미지 (선택)
 * @returns {Promise<User | undefined>} 업데이트된 사용자 데이터 (이미지가 없으면 undefined)
 * @throws {Error} 이미지 업로드 또는 DB 업데이트 실패 시 에러 발생
 * @example
 * const updatedUser = await uploadProfileImage({
 *   user_id: 'user-123',
 *   image: { file: imageFile, previewUrl: 'blob:...' }
 * });
 */
export async function uploadProfileImage({
	user_id,
	image,
}: {
	user_id: string;
	image?: ImageURL;
}): Promise<User | undefined> {
	if (!image) return;

	try {
		// 기존 이미지 삭제 (Storage는 클라이언트에서 직접 처리)
		const { data: currentUser } = await supabase
			.from('user')
			.select('profile_image_url')
			.eq('user_id', user_id)
			.single();

		if (currentUser?.profile_image_url) {
			const urlParts = currentUser.profile_image_url.split('/profile_images/');
			if (urlParts.length > 1) {
				const oldFilePath = urlParts[1];
				await supabase.storage.from('profile_images').remove([oldFilePath]);
			}
		}

		// 새 이미지 Storage 업로드 (클라이언트에서 직접)
		const timestamp = Date.now();
		const randomString = Math.random().toString(36).substring(2, 9);
		const fileExtension = image.file.name.split('.').pop() || 'webp';
		const fileName = `${user_id}_${timestamp}_${randomString}.${fileExtension}`;
		const filePath = `user/${user_id}/profile/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from('profile_images')
			.upload(filePath, image.file, { cacheControl: '3600', upsert: false });
		if (uploadError) throw uploadError;

		// Public URL 생성
		const {
			data: { publicUrl },
		} = supabase.storage.from('profile_images').getPublicUrl(filePath);

		// DB 업데이트 → BFF
		return bffPatch<User>('/api/profile/image', { user_id, profile_image_url: publicUrl });
	} catch (error) {
		console.log(error);
	}
}
