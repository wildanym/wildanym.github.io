const space = new Audio("./sound/space.ogg");
const bigKey = new Audio("./sound/big-key.ogg");
const backspace = new Audio("./sound/backspace.ogg");
const keys = new Audio("./sound/key.ogg");
const enter = new Audio("./sound/enter.ogg");

const key = Array.from(document.querySelectorAll(".key"));
for (let i = 0; i < key.length; i++) {
	key[i].addEventListener("mousedown", () => {
		if (i === 77) {
			key[i].classList.add("clicked-bigbtn");
			space.play();
		} else if (i === 29) {
			key[i].classList.add("clicked");
			backspace.play();
		} else if (i === 58) {
			key[i].classList.add("clicked");
			enter.play();
		} else if (i === 46 || i === 60 || i === 71) {
			key[i].classList.add("clicked");
			bigKey.play();
		} else {
			key[i].classList.add("clicked");
			keys.play();
		}
	});
	key[i].addEventListener("mouseup", () => {
		if (i == 77) {
			key[i].classList.remove("clicked-bigbtn");
		} else {
			key[i].classList.remove("clicked");
		}
	});
}
