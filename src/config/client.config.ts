const clientConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  telegramServiceUrl:
    process.env.NEXT_PUBLIC_TELEGRAM_SERVICE_URL || "http://localhost",
  telegramServicePort: process.env.NEXT_PUBLIC_TELEGRAM_SERVICE_PORT || "8000",

  get telegramServiceFullUrl(): string {
    return `${this.telegramServiceUrl}`;
  },
};

export default clientConfig