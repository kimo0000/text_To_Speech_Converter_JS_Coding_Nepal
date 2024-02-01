const btnConvert = document.querySelector("button"),
  textAreaEl = document.querySelector("textarea"),
  selectEl = document.querySelector("select");

let synth = speechSynthesis;
let isSpeaking = true;

function getAllvoices() {
  for (let voice of synth.getVoices()) {
    let selected =
      voice.name == "Microsoft Hortense - French (France)" ? "selected" : "";
    let optionTag = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    selectEl.innerHTML += optionTag;
  }
}

synth.addEventListener("voiceschanged", getAllvoices);

const textToSpeech = (text) => {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === selectEl.value) {
      utterance.voice = voice;
      // console.log(utterance);
    }
  }
  synth.speak(utterance);
};

btnConvert.addEventListener("click", (e) => {
  e.preventDefault();
  let areaValue = textAreaEl.value;
  if (areaValue !== "") {
    if (!synth.speaking) {
      textToSpeech(areaValue);
    }
  }

  if (textAreaEl.value.length > 15) {
    if (isSpeaking) {
      synth.resume();
      isSpeaking = false;
      btnConvert.innerText = "Paused Speech";
    } else {
      synth.pause();
      isSpeaking = true;
      btnConvert.innerText = "Resume Speech";
    }

    setInterval(() => {
      if (!synth.speaking && !isSpeaking) {
        isSpeaking = true;
        btnConvert.innerText = "Convert To Speech";
      }
    });
  } else {
    btnConvert.innerText = "Convert To Speech";
  }
});
