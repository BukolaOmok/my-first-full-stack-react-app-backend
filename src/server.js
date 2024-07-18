import { app } from "./support/setupExpress.js";
import { setupRoutes } from "./routes.js";

// This configures the request handling
setupRoutes(app);

// use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});