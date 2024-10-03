import { svg } from "better-react-dom";

const DropdownIcon = (props) => {
  svg
    .svg({
      xmlns: 'http://www.w3.org/2000/svg',
      width: '8',
      height: '5',
      viewBox: '0 0 8 5',
      fill: 'currentcolor',
      ...props,
    })
    .render(() => {
      svg
        .polygon({
          fillRule: 'evenodd',
          points: '0 0 8 0 4 5',
        })
        .render();
    });
};

export default DropdownIcon;
