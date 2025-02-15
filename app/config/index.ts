const config = {
	earth: {
		rotationSpeed: 3.2 / 6378,
		geometrySize: 2,
    resolution: 1024,

    inclination: -23.5,
    cloudsRotationSpeed: 3.2 / 6378 + 0.0003,

    ocean: {
      bumpScale: 0.03,
      metalness: 0.1,
    },

    atmosphere: {
      opacity: { value: 3 },
      powerFactor: { value: 0.6 },
      multiplier: { value: 0.5 },
    }
	},
};

export default config;
