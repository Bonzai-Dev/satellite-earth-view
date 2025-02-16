const config = {
	earth: {
		radius: 4,
    resolution: 1024,

    inclination: -0, // -23.5
    cloudsRotationSpeed: 0.0008,

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
