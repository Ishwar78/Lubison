# LUBESON React + Vite starter

## Run locally
1. Install Node.js (LTS).
2. Extract this folder.
3. Open the folder in VS Code.
4. Open terminal in the project folder and run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL printed by Vite.

## Included
- Responsive Home page
- Equipment catalogue with search/category filter
- Individual equipment detail pages
- About, Industries and Contact pages
- Responsive navigation and footer
- Enquiry form currently opens a prefilled email draft

## Before client launch
- Replace sample contact details and verify company email/phone/address.
- Replace stock photography with client-approved equipment photos.
- Product names/categories are placeholders until LUBESON confirms its actual inventory.
- Connect Supabase database and secure admin authentication. Enquiries are NOT yet stored in a database in this starter.
- Test production build with `npm run build`.

## Next implementation stage
Supabase schema + environment variables + enquiry persistence + admin login/product CRUD.
