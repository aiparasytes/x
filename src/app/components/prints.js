import { ARView, ARFaceMesh } from 'react-three-mind'; // Asegúrate de tener instalada la librería
import { Canvas } from '@react-three/fiber'; // Necesario para integrar con Three.js en React

const ARComponent = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <ARView>
          <ARFaceMesh>
            <meshBasicMaterial color="hotpink" wireframe />
          </ARFaceMesh>
        </ARView>
      </Canvas>
    </div>
  );
};

export default ARComponent;
