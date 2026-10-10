// Configuración del panel. Sin credenciales funciona en MODO DEMO (datos en el teléfono).
window.APP_CONFIG = {
  // Supabase (Settings > API)
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",

  // Cloudinary (subida sin firma): crea un "Upload preset" en modo Unsigned
  CLOUDINARY_CLOUD_NAME: "",
  CLOUDINARY_UPLOAD_PRESET: "",

  // URL pública de la tienda (se usa para los links de ofertas)
  STORE_URL: "https://tu-tienda.com",

  // Opcional: endpoint (Supabase Edge Function) que envía correos con Resend/SendGrid
  EMAIL_ENDPOINT: ""
};
