const easymidi = require('easymidi');
const request = require('request');



var inputs = easymidi.getInputs();
var outputs = easymidi.getOutputs();

// lists sound file names
var sounds = ['vienBoom', 'bruh', 'tacoBell', 'legoyoda', '19dfnc', 'applause', 'rickroll', 'wat', 'vienBoom', 'vienBoom', '']

console.log(inputs);
console.log(outputs);


let sendNote = ()=> {
  var output = new easymidi.Output('Launchpad MK2 8');
// send note
  output.send('noteon', {
    note: 12,
    velocity: 3,
    channel: 1
  })}

// //stop note from playing
//   setTimeout(() => {
//     output.send('noteoff', {
//       note: 11,
//       velocity: 0,
//       channel: 1
//     })
//   }, 200);
// }


var input = new easymidi.Input('Launchpad MK2 8');
input.on('noteon', function (msg) {
  console.log(msg);

  // makes it so that sounds are only played when a button is pressed, and not when a button is let go of
  if (msg.velocity == 127) {

    if (msg.note == 11) {
      request('http://192.168.10.53:5000/tutd?thumb=up', { json: true }, (err, res, body) => { });
    } else if (msg.note == 12){
      request('http://192.168.10.53:5000/tutd?thumb=wiggle', { json: true }, (err, res, body) => { });
    } else if (msg.note == 13){
      request('http://192.168.10.53:5000/tutd?thumb=down', { json: true }, (err, res, body) => { });
    } else if (msg.note == 14){
      request('http://192.168.10.53:5000/tutd?thumb=oops', { json: true }, (err, res, body) => { });

      // references the 'sounds' variable and selects a sound based upon which button is pressed
    } else {
        request('http://192.168.10.53:5000/sfx?file=' + sounds[msg.note - 21], { json: true }, (err, res, body) => { });

    }
  }

});
