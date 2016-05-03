import { KEY_MAP, TONES, OCTAVE } from './constants';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

class Note {
  constructor(noteName, {oscType1="sine", oscType2="sine"}){
    this.name = noteName;
    this.freq = TONES[noteName];
    this.oscillatorNode1 = _createOscillator(this.freq, oscType1);
    this.oscillatorNode2 = _createOscillator(this.freq, oscType2);
    this.gainNode1 = _createGainNode();
    this.gainNode2 = _createGainNode();
    this.oscillatorNode1.connect(this.gainNode1);
    this.oscillatorNode2.connect(this.gainNode2);
    this.isPressed = false;
  }

  static createNoteRange(noteRange, paramsObj){
    let range = Object.keys(noteRange).map( key => {
      let noteName = noteRange[key];
      return new Note(noteName, paramsObj);
    });
    range = range.sort((a, b) => b.freq - a.freq );
    return range;
  }

  togglePress(){
    this.isPressed = !this.isPressed;
    if (this.isPressed){
      this.gainNode1.gain.value = 0.3;
      this.gainNode2.gain.value = 0.3;
    } else {
      this.gainNode1.gain.value = 0;
      this.gainNode2.gain.value = 0;
    }
  }

};

function _createGainNode (){
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

function _createOscillator (freq, type){
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

export { Note, ctx };
