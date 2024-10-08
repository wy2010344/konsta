import { svg } from 'better-react-dom';
import { React, SvgAttributeSO } from 'wy-dom-helper';

const PreloaderMaterial = (props: React.SVGAttributes<SVGSVGElement> | SvgAttributeSO<"svg"> | undefined) => {
  svg.svg({
    viewBox: "0 0 36 36",
    ...props,
    fill: "none",
    stroke: "currentcolor"
  }).render(() => {
    svg.circle({
      cx: "18",
      cy: "18",
      r: "16"
    }).render()
  })
};

export default PreloaderMaterial;
