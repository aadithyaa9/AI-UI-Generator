import React, { useEffect, useState } from 'react';
import * as ComponentLib from '../components/ComponentLibrary';

export default function Preview() {
  const [error, setError] = useState(null);
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    // 1. Signal to the parent window that the iframe is ready to receive code
    window.parent.postMessage({ type: 'PREVIEW_READY' }, window.location.origin);

    // 2. Listen for code updates from the parent window
    const handleMessage = (event) => {
      if (event.data.type === 'UPDATE_CODE') {
        renderComponent(event.data.code);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const renderComponent = async (codeString) => {
    try {
      setError(null);
      
      // Clean code: remove imports and exports that break 'new Function'
      const cleanedCode = codeString
        .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
        .replace(/export\s+default\s+function/g, 'function')
        .replace(/export\s+function/g, 'function')
        .trim();

      // Dynamically load Babel Standalone if not present to handle JSX transpilation
      if (!window.Babel) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@babel/standalone/babel.min.js';
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject(new Error("Failed to load Babel transpiler."));
        });
      }

      // Transpile JSX into executable JavaScript
      const transformed = window.Babel.transform(cleanedCode, {
        presets: ['env', 'react'],
      }).code;

      // Create evaluation scope with React hooks and our custom library components
      const componentFunc = new Function(
        'React',
        'useState',
        'useEffect',
        ...Object.keys(ComponentLib),
        `
        ${transformed}
        return typeof GeneratedUI !== 'undefined' ? GeneratedUI : null;
        `
      );

      // Execute with injected dependencies
      const GeneratedComponent = componentFunc(
        React,
        useState,
        useEffect,
        ...Object.values(ComponentLib)
      );

      if (!GeneratedComponent) {
        throw new Error("Could not find 'GeneratedUI' component in the generated code.");
      }

      setComponent(() => GeneratedComponent);
    } catch (err) {
      console.error("Preview Render Error:", err);
      setError(err.message);
      setComponent(null);
    }
  };

  // Error UI
  if (error) {
    return (
      <div className="p-6 bg-red-50 h-screen overflow-auto">
        <h3 className="text-sm font-bold text-red-900">Render Error</h3>
        <pre className="text-xs text-red-800 mt-2 whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  // Loading/Waiting UI
  if (!Component) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 bg-gray-50 font-mono text-sm">
        <p>Awaiting code generation...</p>
      </div>
    );
  }

  // Render the valid component
  return (
    <div className="animate-fade-in">
      <Component />
    </div>
  );
}