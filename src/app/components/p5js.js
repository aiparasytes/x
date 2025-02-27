"use client";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const P5Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    import("p5").then((p5) => {
      let cols;
      let rows;
      let size = 50;
      let arrows = [];
      let r = size / 2;
      let xoff = 0;
      let yoff = 0;
      let zoff = 0;
      let increment = 0.1;
      let particles = [];
      let num = 100;

      class Particle {
        constructor(x, y, p) {
          this.p = p; // Guardamos el contexto de p5.js
          this.pos = this.p.createVector(x, y);
          this.vel = this.p.createVector(0, 0);
          this.acc = this.p.createVector(0, 0);
          this.maxSpeed = 2;
        }

        // Actualizar la partícula
        update() {
          this.acc.add(this.applyForce());
          this.vel.add(this.acc);
          this.vel.limit(this.maxSpeed);
          this.pos.add(this.vel);
          this.acc.mult(0);
        }

        // Aplicar la fuerza del flow field
        applyForce() {
          const col = this.p.floor(this.pos.x / size);
          const row = this.p.floor(this.pos.y / size);

          if (col < 0 || col >= cols || row < 0 || row >= rows) {
            return this.p.createVector(0, 0);
          }

          return arrows[col][row];
        }

        // Verificar los bordes de la pantalla
        checkEdges() {
          if (this.pos.x > this.p.width) this.pos.x = 0;
          if (this.pos.x < 0) this.pos.x = this.p.width;
          if (this.pos.y > this.p.height) this.pos.y = 0;
          if (this.pos.y < 0) this.pos.y = this.p.height;
        }

        // Mostrar la partícula
        display() {
          this.p.noStroke();
          this.p.fill(255, 150);
          this.p.ellipse(this.pos.x, this.pos.y, 5, 5);
        }
      }

      const sketch = (p) => {
        // Función para generar el flow field
        const generateFlowField = () => {
          xoff = 0;
          for (let i = 0; i < cols; i++) {
            arrows[i] = [];
            yoff = 0;
            for (let j = 0; j < rows; j++) {
              let angle = p.map(xoff + yoff + zoff, 0, 1, 0, 360); // Cambié p5.map por p.map
              arrows[i][j] = p.createVector(p.cos(angle), p.sin(angle)); // Cambié p5.createVector por p.createVector
              yoff += increment;
            }
            xoff += increment;
          }
          zoff += 0.001;
        };

        p.setup = () => {
          let cnv = p.createCanvas(window.innerWidth, document.documentElement.scrollHeight);
          cnv.position(0, 0);
          cnv.style("position", "fixed");
          cnv.style("top", "0");
          cnv.style("left", "0");
          p.background(255);

          cols = p.width / size;
          rows = p.height / size;

          // Crear partículas y pasar `p` al constructor
          for (let i = 0; i < num; i++) {
            particles[i] = new Particle(p.random(0, p.width), p.random(0, p.height), p);
          }

          // Generar el flow field una vez
          generateFlowField();
        };

        p.draw = () => {
          p.fill(255);
          p.stroke(0);
          p.background(255, 25); // Fondo con algo de transparencia

          // Generar el flow field en cada cuadro
          generateFlowField(); // Necesitamos que se ejecute dentro de p.draw

          // Actualizar y mostrar las partículas
          for (let i = 0; i < num; i++) {
            particles[i].checkEdges();
            particles[i].update();
            particles[i].display();
          }

          // Dibujar el flow field (líneas de dirección)
          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              const force = arrows[i][j];
              const xPos = i * size;
              const yPos = j * size;

              p.stroke(0);
              p.push();
              p.translate(xPos, yPos);
              p.rotate(force.heading());
              p.line(0, 0, r * force.x, r * force.y);
              p.pop();
            }
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, document.documentElement.scrollHeight);
          cols = p.width / size;
          rows = p.height / size;

          // Regenerar el flow field al redimensionar
          generateFlowField();
        };
      };

      const p5Instance = new p5.default(sketch, canvasRef.current);

      return () => {
        p5Instance.remove();
      };
    });
  }, []);

  return <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-10" />;
};

// Desactiva SSR para este componente
export default dynamic(() => Promise.resolve(P5Canvas), { ssr: false });
