Product Dashboard

**Deploy Site:** https://frontend-assignment-olive-nu.vercel.app/

**Screenshots of the UI** can also be seen in **Output_Pictures Folder**

**For Local**
Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser


**Core Libraries** <br>
react <br>
react-dom <br>
react-scripts <br>

**Styling & UI Helpers** <br>
clsx <br>
tailwind-merge <br>

**Development Tools** <br>
tailwindcss <br>
postcss <br>
autoprefixer <br>

shadcn/ui Button and shadcn/ui Skeleton are custom UI components built using the shadcn/ui system. <br>

**Approach for the all files** <br>
**src/components/Layout.js** - Creates the overall page structure with the sidebar (Products, Dashboard, Settings) and header with search bar <br>
**src/components/ProductTable.js** - Shows all your products in a table with Edit/Delete buttons and pagination. Also handles the skeleton loading animation <br>
**src/components/ProductDialog.js** - The popup form where you add new products or edit existing ones. Has all the input fields like title, price, description, etc. <br>
**src/components/ui/button.js** - A button component that can look different (blue, gray, outlined) depending on what you need <br>
**src/components/ui/skeleton.js** - Creates those loading animations that show while your data is loading <br>
**src/services/productService.js** - Handles all the data operations like add, edit, or delete products. <br>
