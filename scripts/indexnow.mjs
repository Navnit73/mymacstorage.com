// Tells Bing and other IndexNow engines which URLs changed. Run after a deploy: node scripts/indexnow.mjs
// The key file is public/dac7207c2eed4165c635063ad4de94e4.txt and must stay reachable at the site root.
const HOST = "mymacstorage.com";
const KEY = "dac7207c2eed4165c635063ad4de94e4";
const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(res.status, res.statusText, `${urlList.length} URLs submitted`);
