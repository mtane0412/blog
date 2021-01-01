require('dotenv').config({path: `.env.development`})
const fs = require('fs');
const yaml = require('js-yaml');
const amazonPaapi = require('amazon-paapi');
const env = process.env

process.on('unhandledRejection', console.dir);

const contentful = require('contentful-management')
const client = contentful.createClient({
    accessToken: env.CONTENTFUL_PERSONAL_ACCESS_TOKEN
});

const getAsinList = async () => {
  /*
    contentfulのBlog PostにあるすべてのASINのリストを返す
   */
    const space = await client.getSpace(env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');
    const entries = await environment.getEntries({
      content_type: "blogPost",
      order: "-sys.createdAt",
      query: "https://www.amazon.co.jp/"
    });

    let asinList = [];
    for (let item of entries.items) {
      const re = /(?<=https:\/\/www.amazon.co.jp\/exec\/obidos\/ASIN\/).*?(?=\/mtane0412-22\/)/g
      if(item.fields.body.ja.match(re)) {
        const asins = item.fields.body.ja.match(re)
        asinList = asinList.concat(asins);
      }
    }
    const result = asinList.filter((x, i, self) => {
      return self.indexOf(x) === i;
    });

    return result
}

const amazonFetch = (asin) => {
  /*
    Amazon PA-APIで商品情報を返す
  */
  const commonParameters = {
    'AccessKey' : env.AMAZON_ACCESS_KEY,
    'SecretKey' : env.AMAZON_SECRET_KEY,
    'PartnerTag' : env.AMAZON_PARTNER_TAG,
    'PartnerType': env.AMAZON_PARTNER_TYPE,
    'Marketplace': 'www.amazon.co.jp'
  };

  const requestParameters = {
    'ItemIds' : [asin],
    'ItemIdType': 'ASIN', 
    'Condition' : 'New',
    'Resources' : [ 
      'Images.Primary.Medium',
      'ItemInfo.Title',
      'Offers.Listings.Price'
    ]
  };
  
  return amazonPaapi.GetItems(commonParameters, requestParameters).then(data => {
    const item = data.ItemsResult.Items[0];
    const title = item.ItemInfo.Title.DisplayValue;
    const imageUrl = item.Images.Primary.Medium.URL;
    const price = item.Offers ? item.Offers.Listings[0].Price.DisplayAmount : 'N/A';
    return {title, imageUrl, price}
  }).catch(error => {
    console.log(error);
    }
  )
}

(async () => {
  const asinList = await getAsinList();
  let counter = asinList.length;

  const amazonList = {};
  const myFunction = async () => {
    const asin = asinList[counter - 1];
    amazonList[asin] = await amazonFetch(asin);

    counter--;

    if (counter > 0) {
      console.log(counter);
      console.log(amazonList[asin]);
      setTimeout(myFunction, 60000);
    } else {
      const yamlText = yaml.dump(amazonList);
      fs.writeFile('./content/amazon-list.yaml', yamlText, 'utf8', (err) => {
        if (err) {
          console.error(err.message);
          process.exit(1);
        }
        console.log('success!: amazon-list.yaml');
      });
    }
  }
  myFunction();
})();