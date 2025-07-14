import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xloaabnmnipnagtyqfaa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsb2FhYm5tbmlwbmFndHlxZmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjQ2MzcsImV4cCI6MjA2ODEwMDYzN30.QB5ZTjRsfoPm9cFbrJnKYYi7UakY6AeQWjRPRJQWhws';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);