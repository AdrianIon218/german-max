import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xqokqidcdvicwkxgrrcn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxb2txaWRjZHZpY3dreGdycmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyMjQ3OTcsImV4cCI6MjAxNzgwMDc5N30.s3jfQZHhZLdVMqRQlFYOoovDNHdkRpu5-i6JKCwls0E";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
