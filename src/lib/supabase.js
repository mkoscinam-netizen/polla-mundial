import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ntcezvwqwjnfcmogooqy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50Y2V6dndxd2puZmNtb2dvb3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNTc1MDAsImV4cCI6MjA5NjgzMzUwMH0.EkYzi5mcAMPPX88m2f6u38FOrV93mA1itKmHMhyJEKo'
)
