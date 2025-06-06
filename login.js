const SUPABASE_URL = "https://slxrikrmeaoobwlamjgu.supabase.co";
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNseHJpa3JtZWFvb2J3bGFtamd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxODg1ODUsImV4cCI6MjA2NDc2NDU4NX0.EC6jNF_g_y__JFOdpzNVCPZ6eOCQefFavxRA6-PriyA';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
