'use strict';

(function checkEmail() {
  const val = 'test@example.com';
  const result = v8n()
    .not.null() // 値がnullじゃないか
    .string() // 文字列
    .minLength(5) // a@b.c を想定して最低5文字
    .pattern(/[^\s@]+@[^\s@]+\.[^\s@]+/) // eメール用の正規表現
    .test(val);
  console.log(result);
})();
