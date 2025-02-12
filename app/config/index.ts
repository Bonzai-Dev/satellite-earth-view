const config = {
	earth: {
		rotationSpeed: 0.1,
		geometrySize: 2,
    resolution: 1024,

    inclination: -23.5,
    cloudsRotationSpeed: 0.07,
	},

	files: {
    environment: {
      space: "/assets/img/hiptyc_2020_4k_gal.exr",
    },

    textures: {
      earth: {
        albedoMap: "/assets/img/earth/albedo.jpg",
        bumpMap: "/assets/img/earth/bump.jpg",
      },
      clouds: {
        albedoMap: "/assets/img/earth/clouds.png",
      },
    }
  },
};

export default config;
