import { $d } from './components/domAble';
import { Keyboard } from './components/keyboard';
import { Controller } from './components/controls';
import { Tuna } from './tuna-master/tuna';

$d(function(){
  const docEl = $d('html');
  const keyBoardElement = $d('#keys');
  const keyboard = new Keyboard({
    parentEl: keyBoardElement,
    docEl: docEl
  });
  keyboard.setListeners();
  const controller = new Controller(keyboard);
<<<<<<< HEAD
  window.$d = $d;
=======
  window.controller = controller;
>>>>>>> a9de5f3e138ea6921dd6ce3d8458ef61d0d5d2f0
});
