float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
// reversing the black and white values because we provide the ocean map
texelRoughness = vec4(1.0) - texelRoughness;

// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
roughnessFactor *= clamp(texelRoughness.g, 0.5, 1.0);

#endif