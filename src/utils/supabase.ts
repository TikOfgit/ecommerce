import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zqeglvublnriqyuawdvj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxZWdsdnVibG5yaXF5dWF3ZHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTA2NTIsImV4cCI6MjA0OTQyNjY1Mn0.WRBHgf_FYH41iQ1ljwgFynxkLEn03QTEGy6sInksrsY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
