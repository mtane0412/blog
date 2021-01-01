require("dotenv").config({ path: `.env.development` });
const env = process.env;

process.on("unhandledRejection", console.dir);

const contentful = require("contentful-management");
const client = contentful.createClient({
  accessToken: env.CONTENTFUL_PERSONAL_ACCESS_TOKEN,
});

(async () => {
  const space = await client.getSpace(env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");
  const entries = await environment.getEntries({
    content_type: "blogPost",
    order: "-sys.createdAt",
  });
  for (let item of entries.items) {
    if (item.fields.body.ja.match(/iframely/g)) {
      // iframelyを素のリンクに変換
      const re = /<div class="iframely-embed">.*?\/dp\/(.*?)".*?<\/div><\/div>/g;
      item.fields.body.ja = item.fields.body.ja.replace(
        re,
        "https://www.amazon.co.jp/exec/obidos/ASIN/$1/mtane0412-22/"
      );
      const updatedEntry = await item.update();
      await updatedEntry.publish();
      console.log(`DONE: ${item.fields.title.ja}`);
    }
  }
})();