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
  window.controller = controller;

  const confirm = document.getElementById('modal-confirm')
  confirm && confirm.addEventListener("click", function() {
    $d(document.getElementById('modal')).addClass('hide')
    controller.setRange("2")
  })
  window.$d = $d;
});
