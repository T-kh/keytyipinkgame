'use strict';

{

  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }

  const words = [
    'red',
    'blue',
    'pink',
    'green',
  ];
  const target = document.getElementById('target');
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;

  document.addEventListener('click', () => {
    if(isPlaying === true) {
      return;
    }
    isPlaying = true;
    startTime = Date.now();
    setWord();
  });

  document.addEventListener('keydown', e => {

    if(e.key !== word[loc]) {                //e.keyがword[loc]と違ったら。= 押したキーがword内の文字列の文字と異なれば
      return;                                //次の処理をしない。
    }
    loc++;                                   //locを1ずつ増やす
    target.textContent = '_'.repeat(loc) + word.substring(loc);    //loc個分_を増やし、loc番目の次の文字を表示する。

    if(loc === word.length) {    //1単語打ち終わったら
      if(words.length === 0) {      //1単語打ち終わり、且つwords配列の中身が無くなったら。
        const d = new Date(Date.now() - startTime);    //ゲームした時間を取る
        const s = String(d.getSeconds()).padStart(2, '0');   //dから秒を取る
        const ms = String(d.getMilliseconds()).padStart(3, '0');    //dからミリ秒を取る
        const result = document.getElementById('result');     
        result.textContent = `終了！ ${s}:${ms}秒！`;
        target.textContent = '結果発表';
        target.classList.add('finished');
        return;            //wordsの中が亡くなったら新しい単語を出さない。
      }
      setWord();
    }

  });
}