import { KEY_MAP, TONES, OCTAVE } from './constants';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

class Note {
  constructor(noteName){
    this.name = noteName;
    this.freq = TONES[noteName];
    this.oscillatorNode = _createOscillator(this.freq);
    this.gainNode = _createGainNode();
    this.oscillatorNode.connect(this.gainNode);
    this.isPressed = false;
  }

  static createNoteRange(noteRange){
    let range = Object.keys(noteRange).map( key => {
      let noteName = noteRange[key];
      return new Note(noteName);
    });
    range = range.sort((a, b) => a.freq -b.freq );
    return range;
  }

  togglePress(){
    this.isPressed = !this.isPressed;
    if (this.isPressed){
      this.gainNode.gain.value = 0.3;
    } else {
      this.gainNode.gain.value = 0;
    }
  }

};

function _createGainNode (){
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

function _createOscillator (freq){
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

export { Note };
