// @ts-ignore
import glsl from "glslify";

export const fragmentShader = glsl`
uniform float uTime;
uniform float ratio;
uniform vec4 edges[lenOfEdges];
uniform sampler2D tex;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

#ifdef GL_ES
precision highp float;
#endif

const vec4 card_position = vec4(0., 0., 1., 1.);

vec2 absolute_point(vec2 point) {
    return vec2(
        card_position.x + (card_position.z * point.x),
        card_position.y + (card_position.w * point.y)
    );
}

// x1, y1, x2, y2
vec4 absolute_line(vec4 line) {
    vec2 point_a = absolute_point(line.xy);
    vec2 point_b = absolute_point(line.zw);
    return vec4(point_a.x, point_a.y, point_b.x, point_b.y);
}


float line_distance(vec2 point_a, vec4 point_b) {
    float d1 = distance(point_a, point_b.xy);
    float d2 = distance(point_a, point_b.zw);
    
    vec2 D = normalize(point_b.xy - point_b.zw);
    vec2 X = point_b.xy + D * dot(point_a - point_b.xy, D);

    float dd1 = distance(X, point_b.xy);
    float dd2 = distance(X, point_b.zw);


    float d3 = distance(point_b.xy, point_b.zw);
    if(d3 < dd2 || d3 < dd1) {
        return min(d1, d2);
    }
    return distance(point_a, X);
}


float edge_distance(vec2 i_v2_pos, vec4 edge) {
    return line_distance(i_v2_pos, absolute_line(edge));

}


vec4 get_color(vec2 i_v2_pos)
{
    
	float dist = 1000000.;
    
    for(int i=0; i < lenOfEdges; i++) {
        float d = edge_distance(i_v2_pos, edges[i]);
        if(d < dist) dist = d;
    }
    
	float intensity = 0.9;
	float radius = 0.0025 * (
    (
        sin((uTime * 3.0) + 
        ((sin(i_v2_pos.x + i_v2_pos.y))/0.05)
    ) * 0.5 + 0.5));
    
    if (radius < 0.0001 || dist > 9.) {
        radius = radius * 0.5;
    }
    
	float v1_glow = pow(radius / dist, intensity);

    vec4 v4_color = vec4(0.0);
	// white core
	v4_color += vec4(smoothstep(0.000, dist * 7., 0.003));
	// glow
	v4_color += v1_glow * vec4(0.00, 1.0, 0.0, 1.0);
	//v3_color += v1_glow_2 * vec3(0.05, 0.135, 1.0);
		
	// tone mapping
	v4_color = 1.0 - exp(-v4_color);

	return v4_color;
}

// main function
void main(){
   
    vec4 imgColor = texture2D(tex, vUv);

    vec2 v2_pos = vUv;

    // v2_pos.y *= ratio;

    vec4 v4_color = vec4(0.0);

    v4_color = get_color(v2_pos);

    gl_FragColor = vec4(v4_color);
}
`;
