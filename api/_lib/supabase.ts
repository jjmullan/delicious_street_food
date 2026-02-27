// BFF 전용 서버 Supabase 클라이언트
// SUPABASE_SERVICE_ROLE_KEY: RLS를 우회하는 완전 권한 키 — 절대 클라이언트에 노출하면 안 됨
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);
export default supabaseServer;
