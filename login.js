const SUPABASE_URL = "https://dbwmdvkndczqruuzwxtd.supabase.co";
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRid21kdmtuZGN6cXJ1dXp3eHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTQ1MzEsImV4cCI6MjA2NDc3MDUzMX0.U--eqvp3XE-L75Nf5qjCUve6-secciOHFDY_oTKaJFM';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    let { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    const { data: userData } = await supabase.from('users').select().eq('email', email).single();
    if (userData.role !== role) return alert("Invalid role");

    window.location.href = role === 'buyer' ? 'buyer.html' : 'seller.html';
}
