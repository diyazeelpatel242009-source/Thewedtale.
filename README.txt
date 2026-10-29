THE WED TALE GUJARAT — REBUILT WEBSITE

FILES
- index.html: homepage
- auth.html: separate Couple / Business sign-up and login
- directory.html: public approved business directory with search/filter
- business.html: public business detail page + couple enquiries
- business-profile.html: create/edit business listing and upload portfolio photos
- couple-dashboard.html: couple wedding submission, saved businesses and enquiries
- business-dashboard.html: business listing status and enquiries
- admin-dashboard.html: approve/reject businesses and wedding submissions
- style.css: black-and-white responsive design
- supabase.js: Supabase project configuration (you must add your own URL + publishable/anon key)
- app.js: shared auth, navigation and helper functions
- setup.sql: additive database setup / policies

IMPORTANT
1. Open supabase.js and replace YOUR_SUPABASE_PROJECT_URL and YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY.
   Use the Project URL and publishable/anon key from Supabase Settings > API. NEVER put a service_role/secret key in frontend code.
2. In Supabase SQL Editor, inspect your existing tables first. This setup uses CREATE TABLE IF NOT EXISTS and CREATE OR REPLACE functions, but your existing schema may differ. Back up first. If the tables already exist, do not blindly drop or replace them.
3. Run setup.sql only if it matches/extends your current schema. Existing user data is not deleted by this file.
4. Supabase Authentication > URL Configuration: add your Netlify URL, e.g. https://thewedtale.netlify.app, to Site URL / Redirect URLs.
5. To make an admin, sign up normally first, then use Supabase SQL Editor to set that user's profiles.role to 'admin' using the user's auth UUID. Do not add an admin option to public signup.
6. The wedding-media storage bucket is expected to exist and be public for image previews. Create it in Storage if needed, with a 10 MB limit and image/jpeg, image/png, image/webp MIME types. Policies are included in setup.sql when supported by your existing storage configuration.
7. Upload ALL files together to the root of your Netlify site. Keep the exact filenames.
8. Test sign-up, email confirmation, login, business listing, admin approval, directory visibility and enquiries.

No frontend code can guarantee a fully functional deployment until the correct Supabase project credentials, schema, authentication settings and RLS policies are configured. This pack is designed to restore the main website flow and display actual Supabase errors instead of hiding them.
