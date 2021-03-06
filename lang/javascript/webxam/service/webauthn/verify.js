/**
 * @fileoverview WebAuthnの認証情報を検証するモジュール
 */

/* eslint no-undef: "error" */
/* eslint-env node */

class Verify {
  constructor() {
    this.contentType = 'application/json';
  }

  /**
   * TODO:
   * attestationObjectについても検証する。
   * challengeの検証はchallengeを含む検証対象データを
   * バイナリで送受信できるようになるまで無効化している。
   */
  execute({ response, body }) {
    const { origin, type } = JSON.parse(new TextDecoder().decode(body));
    const result = {};
    if (type === 'webauthn.create') { // 登録
      if (/* global.registeredChallenge === challenge && */
        global.registeredOrigin === origin &&
        global.registeredType === type) {
        result.status = 200;
      } else {
        result.status = 401;
      }
    } else if (type === 'webauthn.get') { // 認証
      // TODO: 認証時はsignatureのチェックも必要。
      if (/* global.authenticatedChallenge === challenge && */
        global.authenticatedOrigin === origin &&
        global.authenticatedType === type) {
        result.status = 200;
      } else {
        result.status = 401;
      }
    } else {
      result.status = 401;
    }
    response.write(JSON.stringify(result));
  }
}

module.exports = Verify;
