export const AppSetting = () => ({
  environment: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 3001,
  defaultLimit: +process.env.DEFAULT_LIMIT || 5,
});
