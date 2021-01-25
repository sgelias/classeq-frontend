# Classeq: Bringing real phylogenies into models for classifying biological sequences

This is the frontend part of Classeq project. The project is based on [Vibe template](https://themewagon.com/themes/free-bootstrap-4-react-js-admin-dashboard-template-vibe/), a '*free Bootstrap 4 React.js admin dashboard template for the backends of software, admin panels, dashboards, e-commerce dashboards*'. The project are developed in **Typescript** despite the legacy part of the Vibe template was temporary keeps in **Javascript**.

## Project structure

The backbone of the project components exists on the **vibe** directory. The other two important folders are **_helpers** and **views**. The former containing the `_store.ts` file, responsible by the connection with the global variables of redux, the `_history.ts`, responsible for the browser history management, and the `_url-provider.ts`, a provider of all application URLs. The **views** folder contains all main functionalities/modules of Classeq, as *projects*, *trees*, *clades*, *nodes*, and *models* management.

Almost each functionality/module have their own reducer (`_reducers`) and service (`_services`) directories, followed by the component folder (`component`), an index (`index.ts`), and a style file (`styles.scss`).

Example:

```bash
── clades
   ├── components
   ├── _reducers
   └── _services
```
The component directory can also contain subdirectories if needed.

## Available scripts

To view the project, simpleously download or clone our repository, insall all dependencies and run `npm start`.
___
Be happy and let's code!!
