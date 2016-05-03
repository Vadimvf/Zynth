import { KEY_MAP, TONES, OCTAVE } from './constants';
import { Note, ctx } from './note';

const AudioContext = ctx;

class Controller {
  constructor(keyboardObj) {
    this.keyboard = keyboardObj;
    this.notes = keyboardObj.keys;
    this.settings = {
      oscType1: "sine",
      oscType2: "sine"
    };
    this.oscType1 = "sine";
    this.oscType2 = "sine";
  }

  setRange(rangeId){
    let range;
    if (rangeId === 1){
      range = OCTAVE.first;
    } else if (rangeId === 2){
      range = OCTAVE.second;
    } else {
      range = OCTAVE.third;
    }
    let noteNames = [];
    this.keyboard.setRange(range, this.settings);
    this.notes = this.keyboard.keys;
  }

  detune(value){
    this.eachNote(note => note.oscillatorNode1.detune.value = value);
  }

  setWaveTypeOsc1(type){
    this.eachNote(note => note.oscillatorNode1.type = type);
    this.settings.oscType1 = type;
  }

  setWaveTypeOsc2(type){
    this.eachNote(note => note.oscillatorNode2.type = type);
    this.settings.oscType2 = type;
  }

  eachNote(callback){
    const keys = Object.keys(this.notes);
    for (let i = 0; i < keys.length; i++){
      callback(this.notes[keys[i]], i);
    }

    return this.keys;
  }

}

export { Controller };
