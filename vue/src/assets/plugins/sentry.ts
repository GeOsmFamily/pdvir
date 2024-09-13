import * as Sentry from "@sentry/vue";
import type { App } from "vue";
import type { Router } from "vue-router";

export const initSentry = (app: App, router: Router) => {
  Sentry.init({
    app,
    dsn: "https://e9bd6bf2e6b703942957b86a4816bf97@o1427569.ingest.us.sentry.io/4507946046259200",
    integrations: [
      Sentry.browserTracingIntegration({ router }),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [/^https:\/\/(dev|uat)\.puc.\.cartong\.org/],
  });
}