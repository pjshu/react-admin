//https://sentry.io/配置
import * as Sentry from '@sentry/browser';

const dsn = {
  dsn: 'https://8131fc431780456c9566b7ea820dfc71@o385649.ingest.sentry.io/5218784'
};

export const max_upload_image_length = 3;

export const refresh_token_space = 30 * 60 * 1000;


export const registerSentrySDK = () => {
  Sentry.init(dsn);
};
