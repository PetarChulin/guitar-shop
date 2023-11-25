export default function setBackgroundImage(imageUrl) {

    document.documentElement.style.setProperty('--backgroundImage', `url(${imageUrl})`);
};