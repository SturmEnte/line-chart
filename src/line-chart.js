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

		if (this.settings.padding == undefined || this.settings.radius < 0) {
			this.settings.padding = 0;
		}

		if (this.settings.color == undefined) {
			this.settings.color = "black";
		}

		console.log(this.settings);
	}

	/**
	 * @param {Array} data The new data
	 * @param {Number} yMax The maximum y number
	 */
	updateData(data, yMax) {
		this.svg.innerHTML = "";

		const lineWidth = this.width / (data.length - 1) - 2 * this.settings.padding;
		const pixelPerValue = this.height / yMax;

		let dots = [];

		if (data.length == 1) {
			if (this.settings.dots != true) return;

			const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			dot.setAttribute("cx", this.width / 2);
			dot.setAttribute("cy", this.height - data[0] * pixelPerValue);
			dot.setAttribute("r", this.settings.radius);
			this.svg.appendChild(dot);
			dots.push(dot);

			return dots;
		}

		data.forEach((d, i) => {
			if (data.length != i + 1) {
				const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

				const x1 = lineWidth * i + this.settings.padding;
				const y1 = this.height - d * pixelPerValue;
				line.setAttribute("x1", x1);
				line.setAttribute("y1", y1);

				const x2 = lineWidth * (i + 1) + this.settings.padding;
				const y2 = this.height - data[i + 1] * pixelPerValue;
				line.setAttribute("x2", x2);
				line.setAttribute("y2", y2);

				if (this.settings?.dots == true) {
					if (i == 0) {
						const dot = document.createElementNS(
							"http://www.w3.org/2000/svg",
							"circle"
						);
						dot.setAttribute("cx", x1);
						dot.setAttribute("cy", y1);
						dot.setAttribute("r", this.settings.radius);
						dot.setAttribute("fill", this.settings.color);
						this.svg.appendChild(dot);
						dots.push(dot);
					}

					const dot = document.createElementNS(
						"http://www.w3.org/2000/svg",
						"circle"
					);
					dot.setAttribute("cx", x2);
					dot.setAttribute("cy", y2);
					dot.setAttribute("r", this.settings.radius);
					dot.setAttribute("fill", this.settings.color);
					this.svg.appendChild(dot);
					dots.push(dot);
				}
				line.setAttribute("stroke", this.settings.color);
				this.svg.appendChild(line);
			}
		});

		return dots;
	}
}
