import { KEY_MAP, TONES, OCTAVE } from './constants';
import { Note, ctx } from './note';
import { $d } from './domAble';
import { Tuna } from '../tuna-master/tuna';

const tuna = new Tuna (ctx);

class Controller {
  constructor(keyboardObj) {
    let controls = _createControls();
    this.controls = controls;
    this.keyboard = keyboardObj;
    this.notes = keyboardObj.keys;
    this.settings = {
      oscType1: "sine",
      oscType2: "sine"
    };
    this.oscType1 = "sine";
    this.oscType2 = "sine";
    this.setEffects();
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
    this.setEffects();
  }

  setWaveTypeOsc1(type){
    this.eachNote(note => note.oscillatorNode1.type = type);
    this.settings.oscType1 = type;
  }

  setWaveTypeOsc2(type){
    this.eachNote(note => note.oscillatorNode2.type = type);
    this.settings.oscType2 = type;
  }

  setEffects(){
    this.chorus = new tuna.Chorus({
      rate: 1.5,
      feedback: 0.2,
      delay: 0.0045,
      bypass: 0
    });

    this.delay = new tuna.PingPongDelay({
      wetLevel: 1, //0 to 1
      feedback: 0.6, //0 to 1
      delayTimeLeft: 150, //1 to 10000 (milliseconds)
      delayTimeRight: 200 //1 to 10000 (milliseconds)
    });

    this.phaser = new tuna.Phaser({
      rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
      depth: 0.3,                    //0 to 1
      feedback: 0.2,                 //0 to 1+
      stereoPhase: 30,               //0 to 180
      baseModulationFrequency: 700,  //500 to 1500
      bypass: 0
    });

    this.bitcrusher = new tuna.Bitcrusher({
      bits: 4,          //1 to 16
      normfreq: 0.1,    //0 to 1
      bufferSize: 4096  //256 to 16384
    });

    this.overdrive = new tuna.Overdrive({
      outputGain: 0.4,         //0 to 1+
      drive: 1,              //0 to 1
      curveAmount: 1,          //0 to 1
      algorithmIndex: 3,       //0 to 5, selects one of our drive algorithms
      bypass: 0
    });

    let effects = [this.chorus, this.delay, this.phaser,
                   this.bitcrusher, this.compressor, this.overdrive];

    this.eachNote(note => {
      let gainNode1 = note.gainNode1;
      let gainNode2 = note.gainNode2;
      effects.forEach(effect => {
        gainNode1.connect(effect);
        gainNode2.connect(effect);
      });
    });

  }

  addEffect(effect){
    effect.connect(ctx.destination);
  }

  removeEffect(effect){
    effect.disconnect(ctx.destination);
  }

  update(effect){
    effect.disconnect(ctx.destination);
    effect.connect(ctx.destination);
  }

  eachNote(callback){
    const keys = Object.keys(this.notes);
    for (let i = 0; i < keys.length; i++){
      callback(this.notes[keys[i]], i);
    }

    return this.keys;
  }

}

function _createControls(){
  const controlEl = $d(controller);
}

export { Controller };
