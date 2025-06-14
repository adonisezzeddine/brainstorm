"use client";
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export function MermaidRenderer() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const initializeMermaid = async () => {
      try {
        await mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
        });
        initialized.current = true;

        // Create a MutationObserver to watch for new mermaid diagrams
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach((node) => {
                if (node instanceof HTMLElement) {
                  const containers = node.querySelectorAll('.mermaid-diagram-container');
                  containers.forEach((container) => {
                    const content = container.getAttribute('data-mermaid');
                    const id = container.getAttribute('data-id');
                    if (content && id) {
                      mermaid.render(id, content).then(({ svg }) => {
                        container.innerHTML = svg;
                      }).catch((error) => {
                        console.error('Error rendering Mermaid diagram:', error);
                        container.innerHTML = `<div class="p-4 border rounded-lg bg-destructive/10 text-destructive">
                          <p class="text-sm">Error: ${error.message}</p>
                        </div>`;
                      });
                    }
                  });
                }
              });
            }
          });
        });

        // Start observing the document body for changes
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        // Initial render of any existing diagrams
        const containers = document.querySelectorAll('.mermaid-diagram-container');
        containers.forEach((container) => {
          const content = container.getAttribute('data-mermaid');
          const id = container.getAttribute('data-id');
          if (content && id) {
            mermaid.render(id, content).then(({ svg }) => {
              container.innerHTML = svg;
            }).catch((error) => {
              console.error('Error rendering Mermaid diagram:', error);
              container.innerHTML = `<div class="p-4 border rounded-lg bg-destructive/10 text-destructive">
                <p class="text-sm">Error: ${error.message}</p>
              </div>`;
            });
          }
        });
      } catch (error) {
        console.error('Error initializing Mermaid:', error);
      }
    };

    initializeMermaid();
  }, []);

  return null;
} 