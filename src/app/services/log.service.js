import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const init = () => {
  Sentry.init({
    dsn: "https://ef6ce577592441cdb22f07f93db5df61@o1062463.ingest.sentry.io/6093548",
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

const log = (error) => {
  Sentry.captureException(error)
}



const logger = {
  init, log
}

export default logger;