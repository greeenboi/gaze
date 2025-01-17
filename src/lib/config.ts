const currentEnvironment = (process.env.ENVIRONMENT || 'production') as
  | 'development'
  | 'production';

const config: {
  [key in 'development' | 'production']: {
    baseUrl?: string;
    apiUrl?: string;
    mailApiUrl?: string;
    sanity_token?: string;
    sanity_project_id?: string;
    sanity_dataset?: string;
  };
} = {
  development: {
    baseUrl: 'http://localhost:3000',
    // apiUrl: 'http://localhost:3000',
    // mailApiUrl: 'http://localhost:8787',
    // sanity_token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    // sanity_project_id: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    // sanity_dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  production: {
    baseUrl: 'https://www.suvangs.tech',
    // apiUrl: '',
    // mailApiUrl: process.env.NEXT_PUBLIC_MAIL_API_URL,
    // sanity_token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    // sanity_project_id: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    // sanity_dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
};

export default config[currentEnvironment];
