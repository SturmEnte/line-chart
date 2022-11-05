class LineChart {
	parent;
	svg;
	width;
	height;

	/**
	 * @param {HTMLElement} parent The parent
	 * @param {Number} width The width
	 * @param {Number} height The height
	 */
	constructor(parent) {
		this.parent = parent;
		this.width = parent.clientWidth;
		this.height = parent.clientHeight;
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("width", this.width);
		svg.setAttribute("height", this.height);
		svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
		parent.appendChild(svg);
		this.svg = svg;
	}
}
