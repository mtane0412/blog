require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const fs = require("fs");
const yaml = require("js-yaml");
const moment = require("moment");

const amazonPaapi = require("amazon-paapi");
const regex = /https:\/\/www\.amazon\.co\.jp\/exec\/obidos\/ASIN\/(.*?)\/.*?-22\//;
const amazonList = yaml.safeLoad(
  fs.readFileSync("content/amazon-list.yaml"),
  "utf8"
);

const html = ({ title, imageUrl, price, url, updatedAt }) => {
  const updatedAtYYYYMMDD = moment(updatedAt).format("YYYY年MM月DD日");
  if (title && imageUrl && price) {
    return `
    <div style="display: flex; background-color: #fff; padding: 1em; margin: 1em; border: 1px solid #ccc;align-items: center; flex-wrap: wrap;">
      <div style="min-width: 160px; min-height: 160px; text-align: center; flex: 1;">
        <a href="${url}" target="_blank" rel="noopener"><img src="${imageUrl}" loading="lazy" alt="${title}" /></a>
      </div>
      <div style="display: flex; flex-direction: column; align-content: center; padding: 1em; flex: 9;">
        <span style="padding: .5em; font-weight: bold; font-size: 1.25em;"><a href="${url}" target="_blank" rel="noopener">${title}</a></span>
        <span style="padding: .5em; font-weight: bold; color: red;">${price} <small style="margin-left: 1em;font-weight: normal;color: #666;">(${updatedAtYYYYMMDD}時点)</small></span>
        <span style="padding: .5em;"><a href="${url}" target="_blank" rel="noopener">Amazon.co.jp</a></span>
      </div>
    </div>
  `;
  } else {
    /* 情報が欠けているときは変換しない */
    return `${url}`;
  }
};

const updateAmazonListYaml = async (amazonList) => {
  fs.writeFile(
    "content/amazon-list.yaml",
    yaml.dump(amazonList),
    "utf8",
    (err) => {
      if (err) {
        console.error(err.message);
        process.exit(1);
      }
      console.log("updated: amazon-list.yaml");
    }
  );
};

const amazonFetch = async (url, asin) => {
  /* PA-APIから商品情報をamazonListに登録する */
  const commonParameters = {
    AccessKey: process.env.AMAZON_ACCESS_KEY,
    SecretKey: process.env.AMAZON_SECRET_KEY,
    PartnerTag: process.env.AMAZON_PARTNER_TAG,
    PartnerType: process.env.AMAZON_PARTNER_TYPE,
    Marketplace: "www.amazon.co.jp",
  };
  const requestParameters = {
    ItemIds: [asin],
    ItemIdType: "ASIN",
    Condition: "New",
    Resources: [
      "Images.Primary.Medium",
      "ItemInfo.Title",
      "Offers.Listings.Price",
    ],
  };

  return amazonPaapi
    .GetItems(commonParameters, requestParameters)
    .then((data) => {
      console.log(`${url}の商品情報を取得します`);
      const updatedAt = new Date();
      const item = data.ItemsResult.Items[0];
      const title = item.ItemInfo.Title.DisplayValue;
      const imageUrl = item.Images.Primary.Medium.URL;
      const price = item.Offers
        ? item.Offers.Listings[0].Price.DisplayAmount
        : "N/A";
      return (amazonList[asin] = {
        title,
        imageUrl,
        price,
        url,
        updatedAt,
      });
    })
    .catch((error) => {
      /* エラーをキャッチした場合、urlと日付だけamazonListに登録する */
      console.log(`${url}の変換に失敗しました`);
      console.log(error);
      return (amazonList[asin] = {
        title: null,
        imageUrl: null,
        price: null,
        url,
        updatedAt,
      });
    });
};

const getHTML = async (url) => {
  const asin = await url.replace(regex, "$1");
  if (asin in amazonList === false) {
    /* ASINが登録されていない場合、amazonListに登録する */
    try {
      await amazonFetch(url, asin); // amazonListに商品情報登録
      await updateAmazonListYaml(amazonList); // amazon-list.yamlを更新
    } catch (err) {
      console.error(err.message);
    }
  }

  try {
    return html(amazonList[asin]);
  } catch (err) {
    /* どうしてもダメなときは変換しない */
    return `${url}`;
  }
};

const name = "amazon";

const shouldTransform = (url) => regex.test(url);

module.exports = { getHTML, name, shouldTransform };
