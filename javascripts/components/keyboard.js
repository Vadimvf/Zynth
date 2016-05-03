import { Note } from './note';
import { $d } from './domAble';
import { KEY_MAP, TONES, OCTAVE } from './constants';

class Keyboard {
  constructor({parentEl, docEl, noteRange=OCTAVE.second}){
    let keys = _createKeys(parentEl, noteRange);
    this.keys = keys;
    this.range = noteRange;
    this.el = parentEl;
    this.ctx = docEl;
    this.active = {};
    this.slideListener = null;
  }

  setListeners(){
    debugger;
    let el = this.el;
    let ctx = this.ctx;
    el.on('mousedown', 'div.key', this.playNote.bind(this));
    el.on('mouseout', 'div.key', this.stopNote.bind(this));
    ctx.on('mouseup', this.stopNote.bind(this));

    el.on('touchstart', 'div.key', this.playNote.bind(this));
    el.on('touchend', 'div.key', this.stopNote.bind(this));

    ctx.on('keydown', this.playNote.bind(this));
    ctx.on('keyup', this.stopNote.bind(this));
  }

  playNote(e){
    let keyId;
    if (e.type === "keydown"){
      keyId = this.range[e.keyCode];
    } else if (e.type === "mousedown"){
      this.slideListener = this.el.on('mouseover', 'div.key', this.playNote.bind(this));
      keyId = e.target.id;
    } else {
      keyId = e.target.id;
    }

    if (!keyId) return;
    if (this.active[keyId]) return;

    this.active[keyId] = true;
    let li = $d(`div#${keyId}`);
    li.addClass("pressed");
    this.keys[keyId].togglePress();
  }

  stopNote(e){
    let keyId;
    if (e.type === "keyup"){
      keyId = this.range[e.keyCode];
      if (e.keyCode === 51){
        this.setRange(OCTAVE.third);
      } else if (e.keyCode === 50) {
        this.setRange(OCTAVE.second);
      } else if (e.keyCode === 49) {
        this.setRange(OCTAVE.first);
      }
    } else if (e.type === "mouseup"){
      this.el.off('mouseover', this.slideListener);
      this.slideListener = null;
      keyId = e.target.id;
    } else {
      keyId = e.target.id;
    }
    if (!this.active[keyId]) return;

    this.active[keyId] = false;
    let li = $d(`div#${keyId}`);
    this.keys[keyId].togglePress();
    li.removeClass("pressed");
  }

  setRange(noteRange){
    this.el.setHTML("");
    this.keys = _createKeys(this.el, noteRange);
    this.range = noteRange;
    this.active = {};
  }

}

function _createKeys(domAbleElement, noteRange){
  const keys = Note.createNoteRange(noteRange);
  let keyObj = {};

  keys.forEach( key => {
    let li = document.createElement("li");
    let name = key.name;
    let klass = "key";

    keyObj[name] = key;
    if (name.includes("s")) {
      klass += " sharp";
      $d(li).addClass("hidden");
    }
    let keyEl = $d(li).setHTML(`<div class="${klass}" id=${name}></div>`);

    domAbleElement.append(keyEl);
  });

  return keyObj;
};


export { Keyboard };
