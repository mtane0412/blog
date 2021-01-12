require("dotenv").config({ path: `.env.development` });
const env = process.env;

process.on("unhandledRejection", console.dir);

const contentful = require("contentful-management");
const client = contentful.createClient({
  accessToken: env.CONTENTFUL_PERSONAL_ACCESS_TOKEN,
});

const convertNoUtcOffset = async (entries) => {
  for (let item of entries.items) {
    try {
      if (item.fields.publishDate.ja.split('+')[1]) {
        const convertedTime = await item.fields.publishDate.ja.split('+')[0];
        console.log(`converted: ${item.fields.publishDate.ja} --> ${convertedTime}`);
        item.fields.publishDate.ja = convertedTime;
        const updatedEntry = await item.update();
        await updatedEntry.publish();
      }
    } catch (err) {
      console.log('skipped for some reason');
    }
  };
}

const checkPublishDate = (entries) => {
  for (let item of entries.items) {
    try {
      if (item.fields.publishDate.ja.split('+')[1]) {
        console.log(`warning: ${item.fields.title.ja}`);
        console.log(item.fields.publishDate.ja);
      } else {
        console.log(item.fields.publishDate.ja)
      }
    } catch (err) {
      throw err;
    }
  }
}

(async () => {
  const space = await client.getSpace(env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");
  const entries = await environment.getEntries({
    content_type: "blogPost",
    limit: 200,
    order: "sys.createdAt",
  });
  convertNoUtcOffset(entries);
  checkPublishDate(entries);
})();