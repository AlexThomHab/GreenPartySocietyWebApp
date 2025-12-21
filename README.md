# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building Project

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
Building and Deploying (GitHub Pages)

This project is deployed using GitHub Pages via the Angular CLI.

## Building and Deploying to GitHub pages

To create a production build with the correct base URL for GitHub Pages, run:
```
ng build --configuration production --base-href /GreenPartySocietyWebApp/
```
This will generate the production build in:
```
dist/Frontend/
```
The dist/ directory is generated automatically and is not committed to the repository.

Deployment is handled using angular-cli-ghpages.

To deploy the site:
```
ng deploy
```

This command will:

Build the application in production mode

Output the build files to dist/Frontend

Push the build output to the gh-pages branch

Publish the site via GitHub Pages

Redeploying after changes

After making changes to the codebase:
```
git add .
git commit -m "Describe your changes"
git push
ng deploy
```
## Live site

Once deployed, the site is available at:

https://alexthomhab.github.io/GreenPartySocietyWebApp/

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
