# Shader Playground

An interactive shader playground built with Three.js for testing and experimenting with different shader effects. Optimized for macOS and Apple Silicon.

## Features

- Real-time shader preview
- Interactive controls with dat.GUI
- Mouse interaction support
- Hot-reloading for shader development
- Responsive design

## Setup

1. Clone this repository:
```bash
git clone https://github.com/mattashes/shader-playground-macos.git
cd shader-playground-macos
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Modifying Shaders

The main shader code is located in `src/main.ts`. To experiment with different effects:

1. Modify the `fragmentShader` variable in `src/main.ts`
2. The shader will hot-reload automatically
3. Use the GUI controls to adjust colors
4. Mouse position and time are available as uniforms:
   - `u_time`: Elapsed time in seconds
   - `u_mouse`: Mouse position
   - `u_resolution`: Screen resolution
   - `u_color1`, `u_color2`: Customizable colors

## Example Shaders

Here are some example effects you can try (replace the `fragmentShader` content):

### Circular Wave Pattern
```glsl
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 center = vec2(0.5);
    float dist = distance(st, center);
    float wave = sin(dist * 50.0 - u_time * 2.0);
    vec3 color = mix(u_color1, u_color2, wave);
    gl_FragColor = vec4(color, 1.0);
}
```

### Mouse Interactive Pattern
```glsl
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution.xy;
    float dist = distance(st, mouse);
    vec3 color = mix(u_color1, u_color2, 
        smoothstep(0.0, 0.5, dist + sin(u_time) * 0.1));
    gl_FragColor = vec4(color, 1.0);
}
```

## Contributing

Feel free to submit issues and enhancement requests!