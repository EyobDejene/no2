// File: fade.js
// Import Highway
import Highway from '@dogstudio/highway';
// GSAP Library
import {TimelineLite} from 'gsap';

// Fade
class Slide extends Highway.Transition {
  in({from, to ,done}){
    const tl = new TimelineLite();
    tl.fromTo(to, 0.5 ,{left: '100%', top:'0%'}, {left: '0%'})
      .fromTo(to, 0.5, {height: '1vh'} , {height: '100vh', onComplete: function () {
          done();
        }})
}

out({from , to ,done}){
    const tl = new TimelineLite();
    tl.fromTo(from, 1 ,{left: '0%', top:'0%'}, {left: '-100%' , onComplete: function () {
          done();
          from.remove();
        }})
  }


}



export default Slide;
