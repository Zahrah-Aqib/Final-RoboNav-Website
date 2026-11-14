import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import storyHtml from '@/scroll/story.html?raw';
import storyCss from '@/scroll/story.css?raw';
import setupStory from '@/scroll/story.js';

/**
 * React adaptation of the APPROVED RoboNav-3D scrolling storyboard.
 *
 * The Shadow DOM isolates all visual styles so Grid Simulator, Experiment
 * Lab, Algorithm Comparison and Python Visualizations remain untouched.
 * Unlike an iframe, the robot responds to the real browser page scroll.
 */
export default function ReactScrollHome() {
  const mountRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

    // React provides the sticky global Navbar; hide the duplicate one
    // from the visual storyboard rather than drawing two navigation bars.
    const markup = storyHtml.replace(/<nav>[\s\S]*?<\/nav>/i, '');
    const reactOverrides = [
      ':host{display:block;overflow:visible!important;width:100%}',
      '#rn-story-wrap{height:490vh;min-height:2800px;position:relative;overflow:clip}',
      '#stage{top:64px;height:calc(100svh - 64px);min-height:500px}',
      '.scene{inset:0 0 45px}',
      '#scrollspace{display:none}',
      '.btn,[data-target],[data-scroll]{cursor:pointer}',
      '@media(max-width:800px){#rn-story-wrap{height:420vh;min-height:2400px}.robot-anchor{width:210px;height:260px}}',
    ].join('\n');
    shadow.innerHTML = '<style>' + storyCss + reactOverrides + '</style>' + markup;

    // Install scroll/resize and button handlers; remove on navigation.
    const cleanup = setupStory(shadow, navigate);
    return () => {
      cleanup();
      shadow.replaceChildren();
    };
  }, [navigate]);

  return <div ref={mountRef} aria-label="RoboNav scroll-controlled 360 degree robot homepage" />;
}