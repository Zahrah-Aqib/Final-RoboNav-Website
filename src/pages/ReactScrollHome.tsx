import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import storyHtml from '@/scroll/story.html?raw';
import storyCss from '@/scroll/story.css?raw';
import setupStory from '@/scroll/story.js';

/**
 * The approved RoboNav scroll-controlled robot journey, rebuilt in React.
 *
 * This uses the SAME robot, colors, sections and 360° scroll waypoints from
 * the earlier working Streamlit/HTML concept, not the old decoration bot.
 *
 * - A ShadowRoot isolates the custom home styles from other React pages.
 * - The story moves with the real browser scroll, not a timed video.
 * - Clicking a simulator or experiment link navigates to the real pages.
 * - The entire setup and all event listeners are cleaned up on unmount.
 */
export default function ReactScrollHome() {
  const mountRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

    // Preserve the reference's OWN navigation, exactly as in the approved
    // scrolling website. The ordinary React navbar is hidden on this page.
    // Keep the stage sticky within its section so it disappears naturally
    // when the visitor reaches the bottom.
    const overrides = [
      ':host{display:block;width:100%;overflow:visible!important}',
      '#rn-story-wrap{height:490vh;min-height:2800px;position:relative;overflow:clip}',
      '#stage{position:sticky;top:0;inset:auto;height:100svh;min-height:500px}',
      '#scrollspace{display:none}',
      '.btn,[data-target],[data-scroll]{cursor:pointer}',
      'button[data-target]{cursor:pointer}',
      '@media(max-width:800px){',
      ' #rn-story-wrap{height:430vh;min-height:2300px}',
      ' .robot-anchor{width:205px;height:255px}',
      '}',
    ].join('\n');

    shadow.innerHTML = '<style>' + storyCss + overrides + '</style>' + storyHtml;

    const cleanup = setupStory(shadow, navigate);
    return () => {
      cleanup();
      shadow.replaceChildren();
    };
  }, [navigate]);

  return <div ref={mountRef} aria-label="RoboNav interactive scroll-controlled robot with 360 degree spin" />;
}
