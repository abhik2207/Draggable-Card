let card = document.querySelector(".card");
let moving = false;
let offsetX, offsetY, prevX, prevTime;

card.addEventListener("mousedown", (e) => {
    moving = true;
    card.style.transformOrigin = e.clientX + ", " + e.clientY;
    offsetX = e.clientX - card.getBoundingClientRect().left;
    offsetY = e.clientY - card.getBoundingClientRect().top;
    card.classList.toggle("active");
    card.style.cursor = "grabbing";

    prevX = e.clientX;
    prevTime = Date.now();
});

document.addEventListener("mousemove", changeCardPosition);

function changeCardPosition(e) {
    if (moving) {
        card.style.top = e.clientY - offsetY + "px";
        card.style.left = e.clientX - offsetX + "px";

        const currentTime = Date.now();
        const deltaTime = currentTime - prevTime;
        const deltaX = e.clientX - prevX;
        const velocity = Math.abs(deltaX / deltaTime);
        const maxTilt = 20;
        const tiltAngle = Math.min(velocity * maxTilt, maxTilt);

        if (deltaX > 0) {
        card.style.transform = `rotate(${tiltAngle}deg)`;
        } else {
        card.style.transform = `rotate(-${tiltAngle}deg)`;
        }

        prevX = e.clientX;
        prevTime = currentTime;
    }
}

document.addEventListener("mouseup", () => {
    moving = false;
    card.classList.toggle("active");
    card.style.cursor = "grab";
    card.style.transform = "none";
});