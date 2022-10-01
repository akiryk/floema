import path from "path";
import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import * as prismicH from "@prismicio/helpers";
import { client } from "./config/prismicConfig.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

// Use pug for our templating system
app.set("view engine", "pug");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "views")));

// Add a middleware function that runs on every route. It will inject
// the prismic context to the locals so that we can access these in
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  };
  next();
});

// Query for the root path.
app.get("/", async (req, res) => {
  // Here we are retrieving the first document from your API endpoint
  const document = await client.getFirst();
  res.render("pages/home", {
    meta: {
      data: {
        title: document.data.label,
        button: document.data.collection,
      },
    },
  });
});

app.get("/about", async (req, res) => {
  const document = await client.getSingle("about");
  console.log(document.data.body);
  // pass an images array to make it easier for frontend to parse
  const gallery = [];
  document.data.hero_gallery.forEach(({ gallery_image: img }) => {
    gallery.push({
      url: img.url,
      alt: img.alt,
      copyright: img.copyright,
      dimensions: img.dimensions,
    });
  });

  res.render("pages/about", { document, gallery });
});

app.get("/collection", collection);
app.get("/detail/:uid", detail);

app.listen(port, () => {
  console.log(`on port ${port}`);
});

function home(req, res) {
  res.render("pages/home", {
    meta: {
      data: {
        title: "Home Page",
        description: "A good site!",
      },
    },
  });
}

// function about(req, res) {
//   res.render("pages/about");
// }

function collection(req, res) {
  res.render("pages/collection", {
    meta: {
      data: {
        title: "Collection Page",
        description: "A good site!",
      },
    },
  });
}

function detail(req, res) {
  res.render("pages/detail", {
    meta: {
      data: {
        title: "Product Page",
        description: "A good site!",
      },
    },
  });
}
