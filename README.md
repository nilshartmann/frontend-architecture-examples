# Fullstack Application Example

This example contains a simple webapplication built with three technologies:

- "classic" serverside rendered with some JS snippets
- "single page application" using React
- "fullstack application" using Next.js

I use this application as an example in my  talk on frontend architectures. You can find [the Slides here (PDF, german)](https://react.schule/saa2023)

## Running the example

In order to run the example you have to first start the backend services that are implemented in java. Note that you need to use JDK 20.

To do so, either import this repository in your Java-based idea and run the main classes `nh.example.commentservice.CommentServiceApplication`
and `nh.example.webappdemo.WebappDemoApplication`.

You can also run the backend using `./gradlew bootRun` in both directories `comment-service` and `spring-webapp`

## Classic Webapp

The classic webapp is rendered serverside using Spring WebMVC and (partially) HTMX.
The web app is built step-by-step (one requirement after the other) so you'll find multiple "step" folders.
After starting the two java processes you can access the webapp at http://localhost:8080/.

## React application

The react application is located in `spa-example` and built with React 18, React Router 6 and TanStack query 4.x.

In order to run it, switch to `spa-example` and run:

```bash

pnpm install
pnpm start
```

The spa will then run on http://localhost:3000. It will use the API "REST" Endpoints, that are implemented in the Java applications. (`BlogRestController` and `CommentController`).

## Next.js application

The Next.js application is built as a "backend for frontend" that requests the data needed for the (serverside) rendered frontend from the Java services.

To build and start go to `nextjs-example` and run:

```bash

pnpm install
pnpm dev
```

The Next.js server then runs on http://localhost:3000 (or picks a different port if that port is already in use. Please find the actual used port in the console.)

The API access in the next.js application is done in `api-queries.ts` and `api-actions.ts`. At the beginning of the file are some constants that you can use to simulate slow network responses from the upstream Java services. This can be helpful to see the Supsense features working.

# Questions, comments, contact

If you have any questions or comments on this project, please open an issue here in this repositoy or drop me a line. You can find my contact data on my [Homepage https://nilshartmann.net](https://nilshartmann.net). You can also find me on [Twitter](https://twitter.com/nilshartmann), [Mastodon](https://norden.social/@nilshartmann) and [LinkedIn](https://www.linkedin.com/in/nils-hartmann-2a5738252/)

