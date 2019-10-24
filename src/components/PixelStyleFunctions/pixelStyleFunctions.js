const color = {
    0: 'rgb(255, 255, 255)',
    1: 'rgb(255, 0, 0)',
    2: 'rgb(0, 255, 0)',
    3: 'rgb(0, 0, 255)',
    4: 'rgb(255, 255, 0)',
};

export function classicPixelStyle(bit) {
    return `background-color: rgb(${255 * (1 - bit)},${255 * (1 - bit)},${255 * (1 - bit)})`;
}

export function pixelStyleTricolor(bits) {
    return `background-color: rgb(${255 * (bits[0])},${255 * (bits[1])},${255 * (bits[2])})`;
}

export function pixelStyleQuadLife(number) {
    return `background-color: ${color[number]}`;
}
