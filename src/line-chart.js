class LineChart {
	parent;
	svg;
	width;
	height;
	settings;

	/**
	 * @param {HTMLElement} parent The parent
	 * @param {Number} width The width
	 * @param {Number} height The height
	 */
	constructor(parent, settings) {
		this.parent = parent;
		this.width = parent.clientWidth;
		this.height = parent.clientHeight;
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("width", this.width);
		svg.setAttribute("height", this.height);
		svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
		parent.appendChild(svg);
		this.svg = svg;
		this.settings = settings;

		// Default values
		if (this.settings.radius == undefined || this.settings.radius <= 0) {
			this.settings.radius = 5;
		}
	}

	/**
	 * @param {Array} data The new data
	 * @param {Number} yMax The maximum y number
	 */
	updateData(data, yMax) {
		const lineWidth = this.width / (data.length - 1);
		const pixelPerValue = this.height / yMax;

		this.svg.innerHTML = "";

		data.forEach((d, i) => {
			if (data.length != i + 1) {
				const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
				line.setAttribute("x1", lineWidth * i);
				line.setAttribute("y1", this.height - d * pixelPerValue);
				const x2 = lineWidth * (i + 1);
				const y2 = this.height - data[i + 1] * pixelPerValue;
				line.setAttribute("x2", x2);
				line.setAttribute("y2", y2);
				if (this.settings?.dots == true) {
					const dot = document.createElementNS(
						"http://www.w3.org/2000/svg",
						"circle"
					);
					dot.setAttribute("cx", x2);
					dot.setAttribute("cy", y2);
					dot.setAttribute("r", this.settings.radius);
					this.svg.appendChild(dot);
				}
				line.setAttribute("stroke", "black");
				this.svg.appendChild(line);
			}
		});
	}
}
