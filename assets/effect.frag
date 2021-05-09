precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform float time;

// revised color conversion functions from Sam Hocevar
// http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
vec3 rgb2hsb(vec3 c){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
    vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-2;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsb2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.5), c.y);
}

void main() {
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;

  vec4 tex = texture2D(tex0, uv);

  // convert from rgb to hsb
  vec3 hsb = rgb2hsb(tex.rgb);
  hsb.r += time;
  hsb.r = fract(hsb.r);

  // and then back to rgb
  vec3 rgb = hsb2rgb(hsb);

  // output to screen
  gl_FragColor = vec4(rgb, 1);
}