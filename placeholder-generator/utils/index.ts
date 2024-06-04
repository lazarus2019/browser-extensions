export const copyToClipboard = (content: string, type?: any) => {
  navigator.clipboard.writeText(content);
};

export const downloadImage = (
  url: string,
  fileName = 'placeholder_image',
  fileType = 'png'
) => {
  const image = document.createElement('a');
  image.setAttribute('src', url);
  image.setAttribute('download', `${fileName}.${fileType}`);
  image.click();
};

type imageConfig = {
  width: number;
  height: number;
};

export const generateCanvasPlaceholder = ({ width, height }: imageConfig) => {
  const element = document.createElement('canvas');
  const context = element.getContext('2d')!;

  console.log({ context });

  // const fontSize = Math.floor(width / 8);
  // const fontSize = Math.floor(width / height) * 2;
  const fontSize = calculateFontSize(width, height);

  // console.log({
  //   size: Math.floor(width / height) * 4,
  // });

  element.width = width;
  element.height = height;

  // Fill in the background
  context.fillStyle = '#aaaaaa';
  context.fillRect(0, 0, element.width, element.height);

  // Place the text
  context.font = `bold ${fontSize}px sans-serif`;
  context.fillStyle = '#333333';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(`${width}x${height}`, element.width / 2, element.height / 2);

  const dataUrl = element.toDataURL();
  createSvgPlacholder({
    width,
    height,
  });
  return dataUrl;
};

function calculateFontSize(containerWidth, containerHeight) {
  // Define constants for minimum and maximum font size
  const minFontSize = 8;
  const maxFontSize = 72;

  // Calculate the ratio of the container dimensions
  const widthRatio = containerWidth / 400; // Assuming 400px width is the reference
  const heightRatio = containerHeight / 300; // Assuming 300px height is the reference

  // Choose the smaller ratio to ensure the text fits both width and height
  const minRatio = Math.min(widthRatio, heightRatio);

  // Calculate the font size based on the minRatio
  const fontSize = Math.max(
    minFontSize,
    Math.min(maxFontSize, minRatio * maxFontSize)
  );

  return fontSize;
}

const createSvgPlacholder = ({ width, height }: imageConfig) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('style', 'background: #333333');
  svg.setAttribute('width', width.toString());
  svg.setAttribute('height', height.toString());
  svg.setAttribute('preserveAspectRatio', 'xMinYMax meet');

  svg.innerHTML = `<text x="50%" y="50%" text-anchor="middle" stroke="black" stroke-width="1px" dy=".3em">N/A</text>`;

  document.body.appendChild(svg);
};
