import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Wesan · Practical AI, useful software';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// A sparse dot field stands in for the site's dither horizon; ImageResponse has no WebGL.
const DOTS = Array.from({ length: 140 }, (_, i) => ({
  x: (i * 73) % 1200,
  y: 360 + ((i * 37) % 270),
  o: 0.15 + ((i * 13) % 10) / 20,
}));

// The MELTIR shield (logo kit), inlined: ImageResponse fetches no files on its own.
const MARK = `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), 'public/brand/mark-ivory.svg')).toString('base64')}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#15171b', color: '#eceef1', position: 'relative' }}>
        {DOTS.map((d, i) => (
          <div key={i} style={{ position: 'absolute', left: d.x, top: d.y, width: 4, height: 4, background: '#d6dbe2', opacity: d.o }} />
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, letterSpacing: 6, fontWeight: 600 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} width={46} height={48} alt="" />
          WESAN
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, lineHeight: 1.02, fontWeight: 600, letterSpacing: -1, maxWidth: 900 }}>
            Practical AI. Useful software. Built around your work.
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 28, color: '#959aa2' }}>Meltir · Levios AI · London</div>
        </div>
      </div>
    ),
    size,
  );
}
