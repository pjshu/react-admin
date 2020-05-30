//https://sentry.io/配置
import * as Sentry from '@sentry/browser';

const dsn = {
  dsn: ''
};

export const max_upload_image_length = 3;

export const refresh_token_space = 30 * 60 * 1000;


export const registerSentrySDK = () => {
  Sentry.init(dsn);
};
