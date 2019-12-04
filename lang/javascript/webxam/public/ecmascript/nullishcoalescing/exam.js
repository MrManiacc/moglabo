/**
 * @fileoverview Nullish Coalescing調査用スクリプト
 */

const runTest = () => {
  const sample = {
    x: 0,
    y: 1,
    z: null,
    a: false,
    b: undefined,
    c: ''
  };

  const noVal = 'NO VALUE';

  const result = Object.keys(sample)
    .map(key => `${key}=${sample[key] ?? noVal}`); // eslint-disable-line

  // null, undefinedの時だけ??の右辺値が利用される。
  result.forEach(r => console.log(r));
  console.log(sample.noValue ?? noVal);
};

const init = () => {
  console.log(document.querySelector('footer').classList);
};

// async属性を指定したscript要素はDOMContentLoadedイベントで解析されない。
// defer属性を指定したscript要素はドキュメントの解析後に解析される。
// ただしDOMContetLoadedよりも早い。
// 参考: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
//window.addEventListener('DOMContentLoaded', () => {
runTest();
init();
//});
