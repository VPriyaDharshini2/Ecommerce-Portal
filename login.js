const SUPABASE_URL = "https://dbmvdknkdzcqrzuuxtxd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRibXZka25rZHpjcnp1dXh0eGQiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc0OTE5MzYyNiwiZXhwIjoyMDY0NzUxMjI2fQ.PV1jNkb_BHJZwV4TS6S_vn0mNMXFoMc3ceYcFVuPEEA";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    let { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    const { data: userData } = await client
        .from('users')
        .select()
        .eq('email', email)
        .single();

    if (!userData || userData.role !== role) return alert("Invalid role");

    window.location.href = role === 'buyer' ? 'buyer.html' : 'seller.html';
}
