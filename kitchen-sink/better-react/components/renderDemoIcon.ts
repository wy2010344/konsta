import { dom } from "better-react-dom";
import IconSrc from '../images/demo-icon.png';

export default function () {
  dom.img({
    alt: "icon",
    src: IconSrc,
    className: "ios:w-7 material:w-6"
  }).render()
}