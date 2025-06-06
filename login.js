document.addEventListener("DOMContentLoaded", () => {
    const SUPABASE_URL = "https://eqhetdbwdivpeilymyyg.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxaGV0ZGJ3ZGl2cGVpbHlteXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTAzNTcsImV4cCI6MjA2NDc4NjM1N30.wry7A86h5mZlNu-WEFLlngxcv1b0JukSSBaumrSzhKo";
  
    // Use `window.supabase` to access the loaded library
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
    window.login = async function () {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;
  
      try {
        // 🔐 Sign in the user
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
        if (authError) {
          alert("Login failed: " + authError.message);
          return;
        }
  
        // ✅ Fetch user role from Supabase table (assuming you have a 'users' table with 'role' and 'email')
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("email", email)
          .single();
  
        if (userError || !userData) {
          alert("Failed to retrieve user role");
          return;
        }
  
        if (userData.role !== role) {
          alert("Invalid role selected");
          return;
        }
  
        // ✅ Redirect based on role
        window.location.href = role === "buyer" ? "buyer.html" : "seller.html";
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("Unexpected error: " + err.message);
      }
    };
  });