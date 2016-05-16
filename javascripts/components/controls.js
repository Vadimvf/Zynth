import { KEY_MAP, TONES, OCTAVE } from './constants';
import { Note, ctx } from './note';
import { $d } from './domAble';
import { Tuna } from '../tuna-master/tuna';

const tuna = new Tuna (ctx);

class Controller {
  constructor(keyboardObj) {
    let controls = _createControls();
    this.keyboard = keyboardObj;
    this.notes = keyboardObj.keys;
    this.settings = {
      oscType1: "sine",
      oscType2: "sine"
    };
    this.oscType1 = "sine";
    this.oscType2 = "sine";
    this.setEffects();
    this.setListeners();
  }

  setRange(rangeId){
    let range;
    if (rangeId === "1"){
      range = OCTAVE.first;
    } else if (rangeId === "2"){
      range = OCTAVE.second;
    } else {
      range = OCTAVE.third;
    }
    let noteNames = [];
    this.keyboard.setRange(range, this.settings);
    this.notes = this.keyboard.keys;
    this.connectEffects();
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
      outputGain: 1,         //0 to 1+
      drive: 1,              //0 to 1
      curveAmount: 1,          //0 to 1
      algorithmIndex: 5,       //0 to 5, selects one of our drive algorithms
      outputGain: 0.4,         //0 to 1+
      drive: 1,              //0 to 1
      curveAmount: 1,          //0 to 1
      algorithmIndex: 3,       //0 to 5, selects one of our drive algorithms
      bypass: 0
    });

    this.tremolo = new tuna.Tremolo({
      intensity: 0.8,    //0 to 1
      rate: 5,         //0.001 to 8
      stereoPhase: 0,    //0 to 180
      bypass: 0
    });

    this.connectEffects();
  }

  connectEffects(){
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = 0.0; // this is the pitfall, leave some headroom
    limiter.knee.value = 0.0; // brute force
    limiter.ratio.value = 20.0; // max compression
    limiter.attack.value = 0.005; // 5ms attack
    limiter.release.value = 0.050; // 50ms release

    let effects = [this.chorus, this.delay, this.phaser, this.tremolo,
                   this.bitcrusher, this.compressor, this.overdrive];

    this.eachNote(note => {
      let gainNode1 = note.gainNode1;
      let gainNode2 = note.gainNode2;
      effects.forEach(effect => {
        gainNode1.connect(limiter);
        gainNode2.connect(limiter);
        limiter.connect(ctx.destination);
        limiter.connect(effect);
      });
    });
  }

  addEffect(effect){
    effect.connect(ctx.destination);
  }

  removeEffect(effect){
    effect.disconnect(ctx.destination);
  }

  setListeners(){
    $d('#controller').on('mouseup', 'p', this.handle.bind(this));
    $d('#controller').on('touchend', 'p', this.handle.bind(this));
  }

  handle(e){
    e.preventDefault();
    let button = $d(e.target).parent()[0];
    switch (button.classList[0]) {
      case "osc1":
        $d('.osc1').removeClass('selected');
        $d(button).addClass('selected');
        this.setWaveTypeOsc1(button.id);
        break;
      case "osc2":
        $d('.osc2').removeClass('selected');
        $d(button).addClass('selected');
        this.setWaveTypeOsc2(button.id);
        break;
      case "range":
        $d('.range').removeClass('selected');
        $d(button).addClass('selected');
        this.setRange(button.id);
        break;
      case "effect":
        if (button.classList.contains("selected")){
          $d(button).removeClass('selected');
          this.removeEffect(this[button.id]);
        } else {
          $d(button).addClass('selected');
          this.addEffect(this[button.id]);
        }
        break;
    }
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
