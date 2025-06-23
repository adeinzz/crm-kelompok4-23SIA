import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yrbbqxslwtyzuvlhtcbo.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYmJxeHNsd3R5enV2bGh0Y2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NTg5NzEsImV4cCI6MjA2NjIzNDk3MX0.p7YQ72qhwrg12krvHrdRS2yE_Z0At-yZoA5TJR0fJF0'

export const supabase = createClient(supabaseUrl, supabaseKey)