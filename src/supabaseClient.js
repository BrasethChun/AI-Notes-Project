import { createClient } from "@supabase/supabase-js";

// PASTE YOUR SUPABASE URL AND PUBLIC KEY HERE
const SUPABASE_URL = "https://xixcgarkuksstefyxhxq.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_evMK5ff5qsaF-vJdtw_GLQ_eWIwQaJj";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
