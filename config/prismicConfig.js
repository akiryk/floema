// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import fetch from "node-fetch";
import dotenv from "dotenv";
import * as prismic from "@prismicio/client";

dotenv.config();

const repoName = "akiryk-floema"; // Fill in your repository name.
const accessToken = process.env.PRISMIC_ACCESS_TOKEN; // If your repository is private, add an access token.
console.log(
  "accessToken PRISMIC_ACCESS_TOKEN PRISMIC_ACCESS_TOKEN",
  accessToken
);
// The `routes` property is your Route Resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: "home",
    path: "/pages/home",
  },
  {
    type: "about",
    path: "/pages/about",
  },
];

export const client = prismic.createClient(repoName, {
  fetch,
  accessToken,
  routes,
});
