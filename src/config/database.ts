interface Config {
  "secret": string;
  "database": string;
}

export const config: Config = {
    "secret": "newsecret",
    "database": "mongodb://localhost/formedapi"
};