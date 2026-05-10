import next from "eslint-config-next";

const config = [
  {
    ignores: ["storybook-static/**"],
  },
  ...next,
];

export default config;
