# Journey Builder Challenge

This project visualizes forms and their dependencies using a dynamic graph (React Flow).
Users can map fields from previous forms and global data into a target form.

---

## How do I run this locally?

1. **Clone the repository**
   ```bash
   git clone https://github.com/alesk1v9/702354.git
   cd journey-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the mock API server**
   ```bash
   git clone https://github.com/mosaic-avantos/frontendchallengeserver.git
   cd frontendchallengeserver
   npm start
   ```
   This will start the backend on `http://localhost:3000/`.

4. **Run the frontend app**
   ```bash
   cd journey-builder
   npm run dev
   ```

5. **Run the tests**
   ```bash
   npx vitest
   ```

The app will be available at:  
`http://localhost:5173/`

---

## How do I extend with new data sources?

If you want to connect new data (such as new nodes, edges, or form fields):
- Update the API endpoint or manually modify the `fetchGraph` function in `FormGraph.tsx`.
- The `nodes` and `edges` must follow the React Flow standard structure.
- Each node should have:
  - A unique `id`
  - A `data` object containing at least `label`, `prerequisites`, and `componentId`.
- New fields for forms should follow the JSON schema already used inside the `forms` array (`field_schema.properties`).

The app automatically adjusts based on the structure of `nodes`, `edges`, and `forms` coming from the backend.

---

## What patterns should I be paying attention to?

- **Component Separation**: The logic is modular between `FormGraph` (graph) and `Modal` (field mapping).
- **Dynamic Rendering**: 
  - Nodes and edges are dynamically created based on fetched data.
  - Fields inside the Modal are dynamically rendered based on form schemas.
- **State Management**: 
  - `useState` and `useEffect` manage dynamic loading and mapping updates.
  - `inputMapping` updates the selected fields in real time.
- **Recursion**:
  - `getAllPrerequisites` recursively finds direct and transitive dependencies between forms.
- **Testing**:
  - Component rendering is validated using `Vitest` and `@testing-library/react`.
- **Type Safety**:
  - Strong use of TypeScript types (`ModalProps`, etc.) to ensure consistency.

## 30 minutes video link
- https://drive.google.com/file/d/1QRzzfgnGoJBJwE4C3il6awKk0e4AEiVn/view?usp=drive_link
