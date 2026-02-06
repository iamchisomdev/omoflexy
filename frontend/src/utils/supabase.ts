import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

console.log(supabaseUrl, supabaseAnonKey)

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export const initializeProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
    return;
  }

  console.log("Products:", data);
};
