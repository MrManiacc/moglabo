/**
 * 参考:
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 */

const CACHE_PREFIX = "update-cache-sample-";

const CONTEXT = "/webcise/";

const APP_BASE = `${CONTEXT}esproposal/serviceworker/`;

const CACHE_BASE = `${APP_BASE}images/`;

const VERSION = "v1";

const getErrorPage = url => {
    const page = `
<html>
<head>
<meta charset="UTF-8" />
<title>Error Page</title>
</head>
<body>
<h1>Error Page</h1>
<h2>Error URL</h2>
<a href="${url}">${url}</a>
</body>
</html>
`;
    return Promise.resolve(page);
};

const COMMON_RESOURCES = [
    `${CONTEXT}gomakit.js`,
    `${CONTEXT}images/star.png`,
    APP_BASE,
    `${APP_BASE}index.html`,
    `${APP_BASE}main.css`,
    `${APP_BASE}main.js`
];

// バージョンごとにキャッシュ対象リソースを変えることで
// キャッシュされるリソースとされないリソースを混在させ動作確認を行う。
const cacheTargets = {
    [`${CACHE_PREFIX}v1`]: COMMON_RESOURCES.concat([
        `${CACHE_BASE}green.png`,
        `${CACHE_BASE}orange.png`
    ]),
    [`${CACHE_PREFIX}v2`]: COMMON_RESOURCES.concat([
        `${CACHE_BASE}red.png`,
        `${CACHE_BASE}yellow.png`
    ])
};

const getKey = () => `${CACHE_PREFIX}${VERSION}`;

const isCacheTargetResource = url => {
    return cacheTargets[getKey()].indexOf(url) >= 0;
};

const checkResponse = async ({request, response}) => {
    if (response) {
        console.log(`Fetched (from cache storage): ${request.url}`);
        return Promise.resolve(response);
    }

    const promise = fetch(request).then(response => {
        console.log(`Fetched (from server): ${request.url}`);
        // 元々キャッシュ対象だったリソースのみFetch時にキャッシュへ追加する。
        if (isCacheTargetResource(request.url)) {
            return caches.open(getKey()).then(cache => {
                console.log(`Recoveroed cache: ${request.url}`);
                cache.put(request, response.clone());
                return response;
            });
        } else {
            console.log(`Not add to cache: ${request.url}`);
            return response;
        }
    });

    return promise;
};

self.addEventListener("activate", event => {
    console.log(`Activated: ${getKey()}`);
    event.waitUntil(caches.keys().then(keys => {
        return Promise.all(keys.map(key => {
            if (key.startsWith(CACHE_PREFIX) && key !== getKey()) {
                console.log(`Delete: ${key}`);
                return caches.delete(key);
            } else {
                return Promise.resolve(false);
            }
        }));
    }));
});

self.addEventListener("install", async event => {
    const key = getKey();
    const cache = await caches.open(key);
    console.log(`Installed: ${key}`);
    event.waitUntil(cache.addAll(cacheTargets[key]));
});

// CacheStorage保存対象でないリソースへのリクエスト時もfetchイベントが発生する。
self.addEventListener("fetch", async event => {
    const request = event.request;
    // waitUntilやrespondWithの引数はPromiseでなければならないので，
    // thenやcatchの関数の戻り値がPromiseでなければ意図した動作にならない場合がある。
    event.respondWith(caches.match(request)
            .then(response => checkResponse({request, response})))
            .catch(() => getErrorPage(request.url));
});