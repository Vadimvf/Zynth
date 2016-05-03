import { $d } from './components/domAble';
import { Keyboard } from './components/keyboard';
import { Controller } from './components/controls';

$d(function(){
  const docEl = $d('html');
  const keyBoardElement = $d('#keyboard');
  const keyboard = new Keyboard({
    parentEl: keyBoardElement,
    docEl: docEl
  });
  keyboard.setListeners();
  const controller = new Controller(keyboard);
  window.controller = controller;
});
