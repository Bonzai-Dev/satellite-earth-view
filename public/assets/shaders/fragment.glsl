// reference from https://youtu.be/vM8M4QloVL0?si=CKD5ELVrRm3GjDnN
varying vec3 vNormal;
varying vec3 eyeVector;
uniform float opacity;
uniform float powerFactor;
uniform float multiplier;

void main() {
    // Starting from the rim to the center at the back, dotP would increase from 0 to 1
    float dotP = dot( vNormal, eyeVector );
    // This factor is to create the effect of a realistic thickening of the atmosphere coloring
    float factor = pow(dotP, powerFactor) * multiplier;
    // Adding in a bit of dotP to the color to make it whiter while the color intensifies
    vec3 atmColor = vec3(0.35 + dotP/4.5, 0.35 + dotP/4.5, 1.0);
    // use opacity to control the overall intensity of the atmospheric color
    gl_FragColor = vec4(atmColor, opacity) * factor;
}