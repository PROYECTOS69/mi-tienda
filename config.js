ya// Configuración del panel. Sin credenciales funciona en MODO DEMO (datos en el teléfono).
window.APP_CONFIG = {.
  // Supabase (Settings > API) 
  SUPABASE_URL: "https://cifkzcijpjmnxhesqdtw.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZmt6Y2lqcGptbnhoZXNxZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NDY4MTUsImV4cCI6MjEwNzIyMjgxNX0.eCN6PbOyMJwHGWKaRc6Mtp0S0uMT5J-b-5JBoRQO7j4",

  // Cloudinary (subida sin firma): crea un "Upload preset" en modo Unsigned
  CLOUDINARY_CLOUD_NAME: "",
  CLOUDINARY_UPLOAD_PRESET: "",

  // URL pública de la tienda (se usa para los links de ofertas)
  STORE_URL: "https://tu-tienda.com",

  // Opcional: endpoint (Supabase Edge Function) que envía correos con Resend/SendGrid
  EMAIL_ENDPOINT: ""
};
