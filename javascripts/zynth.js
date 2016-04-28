import { $d } from './components/domAble';
import { Keyboard } from './components/keyboard';

$d(function(){
  const docEl = $d('html');
  const keyBoardElement = $d('#keyboard');
  const keyboard = new Keyboard({
    parentEl: keyBoardElement,
    docEl: docEl
  });
  keyboard.setListeners();
});
