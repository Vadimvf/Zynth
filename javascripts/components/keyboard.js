import { Note } from './note';
import { $d } from './domAble';
import { KEY_MAP, TONES, OCTAVE } from './constants';

class Keyboard {
  constructor(domAbleElement, domAbleDoc){
    let noteObjs = _createKeys(domAbleElement);
    // this.keys = domKeys;
    this.notes = noteObjs;
    this.el = domAbleElement;
    this.ctx = domAbleDoc;
  }

  setListeners(){
    let el = this.el;
    let ctx = this.ctx;
    el.on('mousedown', 'div', this.playNote);
    el.on('mouseup', 'div', this.stopNote);
    ctx.on('keydown', this.playNote.bind(this));
    ctx.on('keyup', this.stopNote);
  }

  removeListeners(){
    el.off('mousedown', 'div', this.playNote);
    el.off('mouseup', 'div', this.stopNote);
    ctx.off('keydown', this.playNote);
    ctx.off('keyup', this.stopNote);
  }

  playNote(e){
    // Keyboard.playNote.call(this, e);
    console.log(this.notes);
    debugger;
    // debugger;
    // if (e.type === "keydown") _pressRightKey(e);
    // $d(e.target).addClass("pressed");
    // _findKey(e);
    // function _findKey(e){
    //     if (e.type === "keydown"){
    //
    //     }else{
    //       console.log("playing " + e.target + " " + e.currentTarget);
    //     }
    // }
  }

  stopNote(e){
    // debugger;
    console.log("stopped");
    $d(e.target).removeClass("pressed");
  }

}

function _createKeys(domAbleElement){
  const noteRange = Note.createNoteRange();

  noteRange.forEach( note => {
    let li = document.createElement("li");
    let name = note.name;
    let klass = "key";
    if (name.includes("s")) klass += " sharp";
    let key = $d(li).setHTML(`<div class="${klass}" id=${name}></div>`);

    domAbleElement.append(key);
  });

  return noteRange;
};

function _pressListener(domAbleElement, keyboard){
  domAbleElement.on('mousedown', 'li', keyboard.playNote(e));
  domAbleElement.on('mouseup', 'li', keyboard.stopNote(e));
}

function _keyListener(domAbleDoc){
  domAbleDoc.on('keyup', this.playNote(e));
  domAbleDoc.on('keydown', this.stopNote(e));
}

export { Keyboard };
