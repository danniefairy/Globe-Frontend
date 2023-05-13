import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import ThreeGlobe from 'three-globe';
import Markers from "./Markers";
import ImageGallery from "./Gallery";

const server_endpoint = "http://127.0.0.1:5000"

const Globe = () => {
  const globeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(server_endpoint+'/api/images');
        const data = await response.json();

        // parse data
        const gData = [];
        Object.entries(data).forEach(([city, value]) => {
          console.log(city + ': ' + value);
          const meta_data = {};
          meta_data.city = city;
          meta_data.lat = value.lat;
          meta_data.lng = value.lng;
          meta_data.images = value.images;
          meta_data.color = ['red', 'orange', 'blue', 'green'][Math.round(Math.random() * 3)];
          meta_data.size = 30 + meta_data.images.length / 10;
          gData.push(meta_data)
        });
        const Globe = new ThreeGlobe()
          .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
          .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
          .htmlElementsData(gData)
          .htmlElement(d => {
            const el = document.createElement('div');
            ReactDOM.render(
              <Markers
                city={d.city}
                number={d.images.length}
              />
              , el);
            el.style.color = d.color;
            el.style.width = `${d.size}px`;
            el.style.pointerEvents = 'auto'; // make it clickable
            el.onclick = function () {
              const ic = document.getElementById("imageContainer");
              ReactDOM.render(
                <ImageGallery
                  city={d.city}
                  images={d.images}
                  server_endpoint={server_endpoint}
                />
                , ic);
            };
            return el;
          });

        // custom globe material
        const globeMaterial = Globe.globeMaterial();
        globeMaterial.bumpScale = 10;
        new THREE.TextureLoader().load('https://unpkg.com/three-globe/example/img/earth-water.png', texture => {
          globeMaterial.specularMap = texture;
          globeMaterial.specular = new THREE.Color('grey');
          globeMaterial.shininess = 15;
        });

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect

        // Setup renderers
        const renderers = [new THREE.WebGLRenderer(), new CSS2DRenderer()];
        //renderers[0].setClearColor( 0x000000, 0 );
        const canvasContainer = document.querySelector('#canvasContainer');
        renderers.forEach((r, idx) => {
          //r.setSize(window.innerWidth, window.innerHeight);
          r.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
          if (idx > 0) {
            // overlay additional on top of main renderer
            r.domElement.style.position = 'absolute';
            r.domElement.style.top = '0px';
            r.domElement.style.pointerEvents = 'none';
          }
          globeRef.current.appendChild(r.domElement);
        });

        // Setup scene
        const scene = new THREE.Scene();
        scene.add(Globe);
        scene.add(new THREE.AmbientLight(0xcccccc));
        scene.add(new THREE.DirectionalLight(0xffffff, 0.6));
        // Setup camera

        //Load background texture
        const loader = new THREE.TextureLoader();
        loader.load('images/background.jpg', function (texture) {
          scene.background = texture;
          scene.backgroundIntensity = 0.05;
        });

        const camera = new THREE.PerspectiveCamera();
        camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
        camera.updateProjectionMatrix();
        camera.position.z = 500;

        // Add camera controls
        const tbControls = new TrackballControls(camera, renderers[0].domElement);
        tbControls.minDistance = 5;
        tbControls.rotateSpeed = 1;
        tbControls.zoomSpeed = 0.3;

        // Update pov when camera moves
        Globe.setPointOfView(camera.position, Globe.position);
        tbControls.addEventListener('change', () => Globe.setPointOfView(camera.position, Globe.position));



        // Kick-off renderers
        (function animate() {
          // Frame cycle
          tbControls.update();
          renderers.forEach(r => r.render(scene, camera));
          requestAnimationFrame(animate);
        })();

        // Cleanup function
        return () => {
          renderers.forEach(r => {
            r.dispose();
            r.forceContextLoss();
          });
          tbControls.dispose();
          Globe.dispose();
        };

      } catch (error) {
        console.error('Error fetching data:', error);
      }


    };

    fetchData();
  }, []);

  return <div ref={globeRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default Globe;
