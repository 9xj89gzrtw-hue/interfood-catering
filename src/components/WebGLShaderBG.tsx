"use client";

import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   WebGL Shader Background — GPU-powered animated gradient
   Uses raw WebGL2 fragment shader for cinematic light effects
   ═══════════════════════════════════════════════════════════════ */

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

/* Simplex-like noise */
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
         + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
               dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  
  /* Mouse influence */
  vec2 mouse = (uMouse - 0.5) * vec2(aspect, 1.0);
  float mouseDist = length(p - mouse);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;
  
  /* Layered noise */
  float n1 = snoise(p * 2.0 + uTime * 0.15) * 0.5;
  float n2 = snoise(p * 4.0 - uTime * 0.1) * 0.25;
  float n3 = snoise(p * 8.0 + uTime * 0.2) * 0.125;
  float noise = n1 + n2 + n3 + mouseInfluence;
  
  /* Warm gold/cream palette for light theme */
  vec3 color1 = vec3(0.976, 0.969, 0.945); /* #F9F7F1 warm white */
  vec3 color2 = vec3(0.722, 0.529, 0.043); /* #B8860B rich gold */
  vec3 color3 = vec3(0.560, 0.659, 0.494); /* #8FA87E sage */
  vec3 color4 = vec3(0.875, 0.710, 0.655); /* #DFB5A7 blush */
  
  /* Blend colors based on noise */
  float t = noise * 0.5 + 0.5;
  vec3 color = mix(color1, color2, smoothstep(0.3, 0.7, t));
  color = mix(color, color3, smoothstep(0.5, 0.9, t) * 0.4);
  color = mix(color, color4, smoothstep(0.2, 0.6, 1.0 - t) * 0.2);
  
  /* Soft vignette */
  float vignette = 1.0 - smoothstep(0.4, 1.2, length(p));
  color *= vignette * 0.15 + 0.85;
  
  /* Keep it subtle — this is a background effect */
  color = mix(vec3(0.996, 0.992, 0.984), color, 0.18);
  
  fragColor = vec4(color, 1.0);
}`;

interface WebGLShaderBGProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function WebGLShaderBG({ className = "", style }: WebGLShaderBGProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef([0.5, 0.5]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) {
      console.warn("WebGL2 not supported — shader background disabled");
      return;
    }

    /* Compile shader helper */
    const compileShader = (type: number, source: string) => {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    /* Fullscreen quad */
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    /* Uniforms */
    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    /* Resize */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // Cap for performance
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    /* Mouse */
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight];
    };
    window.addEventListener("mousemove", onMouse);

    /* Touch support */
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = [e.touches[0].clientX / window.innerWidth, 1 - e.touches[0].clientY / window.innerHeight];
      }
    };
    window.addEventListener("touchmove", onTouch, { passive: true });

    /* Render loop */
    const startTime = performance.now();

    const render = () => {
      const time = (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current[0], mouseRef.current[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vbo);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
