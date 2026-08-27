/**
 * lib/api.js
 * Generic fetch helper for the SIMBA Laravel backend.
 *
 * Usage:
 *   import { fetchJson } from '../lib/api';
 *   const data = await fetchJson('/ppid/berkala');
 */

const API_BASE = import.meta.env.VITE_API_URL ?? '';

/**
 * Fetch JSON from the backend.
 * @param {string} path   - e.g. '/ppid/berkala' or '/ppid/berkala?jenis_dokumen_id=1'
 * @param {RequestInit} [options] - optional fetch options (method, signal, …)
 * @returns {Promise<any>} parsed JSON body
 * @throws {Error} with a human-readable message on network or HTTP error
 */
export async function fetchJson(path, options = {}) {
  const url = `${API_BASE}${path}`;

  let response;
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      ...options,
    });
  } catch (networkErr) {
    // Jangan lempar error jika fetch di-abort (AbortController / React StrictMode cleanup)
    const isAbort =
      networkErr.name === 'AbortError' ||
      options?.signal?.aborted ||
      networkErr.message?.toLowerCase().includes('abort');
    if (isAbort) {
      // Lempar DOMException AbortError standar agar catch di komponen bisa filter dengan err.name
      throw new DOMException('Fetch aborted', 'AbortError');
    }
    throw new Error(
      `Tidak dapat terhubung ke server. Periksa koneksi internet Anda. (${networkErr.message})`
    );
  }

  if (!response.ok) {
    let detail = '';
    try {
      const body = await response.json();
      detail = body?.message ?? body?.error ?? '';
    } catch {
      // ignore parse error
    }
    throw new Error(
      detail
        ? `Kesalahan server: ${detail} (HTTP ${response.status})`
        : `Gagal mengambil data (HTTP ${response.status})`
    );
  }

  return response.json();
}
