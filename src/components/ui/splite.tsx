'use client'

import React, { useRef, useEffect, useState } from 'react'

interface SplineSceneProps {
  scene: string
  className?: string
}

const SPLINE_READY_EVENT = 'spline-app-ready'
const SCRIPT_ID = 'spline-esm-loader'
const SPLINE_CDN = 'https://unpkg.com/@splinetool/runtime/build/runtime.js'

function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let isMounted = true

    if (!isWebGLSupported()) {
      setError('WebGL not supported')
      setLoading(false)
      return
    }

    const initSpline = async () => {
      if (!canvasRef.current) return

      const AppClass = (window as any).__SplineApplication
      if (!AppClass) {
        console.warn('[Spline] Application class not available yet')
        return
      }

      try {
        const app = new AppClass(canvasRef.current)
        await app.load(scene)
        if (!isMounted) return

        setLoading(false)

        // ── Transparent background ───────────────────────────────────────
        // Try multiple API surfaces — Spline runtime version differs on which works
        try { app.setBackgroundColor('transparent') } catch {}
        try { app.setBackgroundColor(0x000000, 0) } catch {}  // RGBA with 0 alpha
        try {
          if (app.scene) {
            app.scene.background = null
            app.scene.backgroundAlpha = 0
          }
        } catch {}
        // Make the canvas itself transparent
        if (canvasRef.current) {
          canvasRef.current.style.backgroundColor = 'transparent'
        }
        // ─────────────────────────────────────────────────────────────────

        // ── Remove watermark DOM node (the runtime injects it after load) ─
        const removeWatermark = () => {
          document
            .querySelectorAll(
              'a[href*="spline.design"], [class*="spline-watermark"], [class*="SplineWatermark"], canvas ~ a, canvas + a'
            )
            .forEach(el => {
              (el as HTMLElement).style.cssText =
                'display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;'
              el.remove()
            })
        }
        removeWatermark()
        const wmObserver = new MutationObserver(removeWatermark)
        wmObserver.observe(document.body, { childList: true, subtree: true })
        // Interval fallback for the first 10s
        let attempts = 0
        const wmInterval = setInterval(() => {
          removeWatermark()
          if (++attempts > 20) clearInterval(wmInterval)
        }, 500)
        // ─────────────────────────────────────────────────────────────────

        // ── Hide background text / logo objects ──────────────────────────
        const namesToHide = [
          'NEXBOT', 'Text', 'nexbot_text', 'BG', 'Background',
          'Background Text', 'Logo', 'brand', 'watermark', 'title',
        ]
        for (const name of namesToHide) {
          const obj = app.findObjectByName?.(name)
          if (obj) obj.visible = false
        }
        try {
          const all = app.getAllObjects?.() ?? []
          all.forEach((obj: any) => {
            const n = (obj.name ?? '').toLowerCase()
            if (
              n.includes('text') || n.includes('nexbot') ||
              n.includes('logo') || n.includes('bg') ||
              n.includes('background') || n.includes('brand') ||
              n.includes('title')
            ) {
              obj.visible = false
            }
          })
        } catch { /* ignore */ }
        // ────────────────────────────────────────────────────────────────

        // ── Section-scoped cursor tracking ───────────────────────────────
        // Track cursor anywhere on the About section, not just the robot box.
        // Falls back to window if the section element isn't found.
        const canvas = canvasRef.current
        const trackingTarget: EventTarget =
          document.getElementById('about') ?? window

        const proxy = (e: MouseEvent) => {
          canvas?.dispatchEvent(
            new MouseEvent('mousemove', {
              clientX: e.clientX,
              clientY: e.clientY,
              bubbles: true,
              cancelable: true,
            })
          )
        }
        trackingTarget.addEventListener('mousemove', proxy as EventListenerOrEventListenerObject, { passive: true } as AddEventListenerOptions)
        // ────────────────────────────────────────────────────────────────

        cleanupRef.current = () => {
          trackingTarget.removeEventListener('mousemove', proxy as EventListenerOrEventListenerObject)
          wmObserver.disconnect()
          clearInterval(wmInterval)
          try { app.dispose?.() } catch {}
        }
      } catch (err) {
        console.error('[Spline] Scene load error:', err)
        if (isMounted) setLoading(false)
      }
    }

    // ── ESM Module Loader ────────────────────────────────────────────────
    // Loaded as type="module" so the ES module syntax works correctly.
    // This completely bypasses the Webpack bundler — no process.wasm error.
    if ((window as any).__SplineApplication) {
      initSpline()
    } else if (document.getElementById(SCRIPT_ID)) {
      window.addEventListener(SPLINE_READY_EVENT, () => {
        if (isMounted) initSpline()
      }, { once: true })
    } else {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.type = 'module'
      script.textContent = `
        try {
          const { Application } = await import('${SPLINE_CDN}');
          window.__SplineApplication = Application;
          window.dispatchEvent(new CustomEvent('${SPLINE_READY_EVENT}'));
        } catch(e) {
          console.error('[Spline] ESM import failed:', e);
        }
      `
      window.addEventListener(SPLINE_READY_EVENT, () => {
        if (isMounted) initSpline()
      }, { once: true })
      document.head.appendChild(script)
    }
    // ────────────────────────────────────────────────────────────────────

    return () => {
      isMounted = false
      cleanupRef.current?.()
    }
  }, [scene])

  return (
    <div className={`w-full h-full relative ${className ?? ''}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full border-2 border-transparent animate-spin"
              style={{ borderTopColor: '#c3e41d' }}
            />
            <div
              className="absolute inset-2 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: '#8b5cf6',
                animation: 'spin 0.8s linear infinite reverse',
              }}
            />
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 text-center p-6">
          <div className="text-[#c3e41d] font-mono text-sm mb-2 opacity-80 uppercase tracking-widest">
            3D Content Unavailable
          </div>
          <p className="text-white/40 text-xs max-w-[200px] leading-relaxed">
            WebGL is disabled or unsupported. Enable hardware acceleration for the full experience.
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full block outline-none"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
