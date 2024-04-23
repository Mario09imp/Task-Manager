from supabase import create_client

URL = "https://opvnsvbhhdbnmdbckpmi.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdm5zdmJoaGRibm1kYmNrcG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyNzI1NzMsImV4cCI6MjAyNTg0ODU3M30.xWTACTv3dgn2oxNM3C-KRtJtm9UO2lo4IY47B1iG-fc"

supabase_client = create_client(URL, KEY)

