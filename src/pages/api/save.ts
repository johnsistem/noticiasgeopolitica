export const prerender = false

import type { APIRoute } from 'astro'

const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN
const GITHUB_REPO = import.meta.env.GITHUB_REPO // ej: "johnsistem/noticiasgeopolitica"
const GITHUB_BRANCH = 'main'

export const POST: APIRoute = async ({ request }) => {
  try {
    const { path, content } = await request.json()

    if (!path || !content) {
      return new Response(JSON.stringify({ error: 'Falta path o content' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      return new Response(JSON.stringify({ error: 'Falta GITHUB_TOKEN o GITHUB_REPO en .env' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let encodedContent: string
    if (content.startsWith('data:image/')) {
      // Base64 data URL from file upload — extract raw base64
      encodedContent = content.split(',')[1]
    } else {
      encodedContent = Buffer.from(content).toString('base64')
    }

    const existing = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'geopolitica-admin' } }
    )

    let sha = ''
    if (existing.ok) {
      const data = await existing.json()
      sha = data.sha
    }

    const body: Record<string, any> = {
      message: `Add: ${path.split('/').pop()}`,
      content: encodedContent,
      branch: GITHUB_BRANCH,
    }
    if (sha) body.sha = sha

    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'geopolitica-admin',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.text()
      return new Response(JSON.stringify({ error: `GitHub API: ${err}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, path }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error('Save error:', err)
    return new Response(JSON.stringify({ error: err.message || 'Error al guardar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
