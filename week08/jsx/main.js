import { Component, createElement } from "./framework.js";

class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (let record of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child)
        }

        let position = 0;

        this.root.addEventListener("mousedown", event => {
            let children = this.root.children;
            let startX = event.clientX;
            let move = event => {
                let x = event.clientX - startX;

                let current = position - Math.round((x - x % 500) / 500);
                for (let offset of[-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length
                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${-pos * 500+offset*500+x%500}px)`;
                }
                /*for (let child of children) {
                    child.style.transition = "none";
                    child.style.transform = `translateX(${-position * 500 + x}px)`;
                }*/
            }
            let up = event => {
                let x = event.clientX - startX;
                position = position - Math.round(x / 500);
                for (let offset of[0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length
                    children[pos].style.transition = "";
                    children[pos].style.transform = `translateX(${-pos * 500+offset*500}px)`;
                }
                /*for (let child of children) {
                    child.style.transition = "";
                    child.style.transform = `translateX(${-position * 500}px)`;
                }*/
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })

        /*let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;

            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = "none";
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

            setTimeout(() => {
                next.style.transition = "";
                current.style.transform = `translateX(${-100 - nextIndex * 100}%)`;
                next.style.transform = `translateX(${-nextIndex * 100}%)`;
                currentIndex = nextIndex;
            }, 16)
            for (let child of children) {
                child.style.transform = "translateX(-100%)";
            }
        }, 3000)*/

        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

let d = [
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
];

let a = < Carousel src = { d }
/>
a.mountTo(document.body);