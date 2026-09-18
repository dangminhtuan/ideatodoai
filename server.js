// High-performance Native Node.js Server for AG Project & Idea Tracker
// Strict port enforcement on 5199
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 5199;
const DATA_FILE = 'D:\\AI_Second_Brain\\projects_tracker.json';
const AG_BASE_DIR = 'd:\\__G AG Projects';
const PUBLIC_DIR = path.join(__dirname, 'public');

// Helper to read data safely
function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading data file:', err);
  }
  return { projects: [], categories: [] };
}

// Helper to write data safely
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing data file:', err);
    return false;
  }
}

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

// Response helper
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // API ROUTING
  if (pathname.startsWith('/api/')) {
    try {
      // GET /api/data
      if (method === 'GET' && pathname === '/api/data') {
        const data = readData();
        return sendJSON(res, 200, data);
      }

      // POST /api/projects (Add new project)
      if (method === 'POST' && pathname === '/api/projects') {
        const body = await parseBody(req);
        if (!body.name) {
          return sendJSON(res, 400, { error: 'Project name is required' });
        }
        const data = readData();
        const nowStr = new Date().toISOString();
        const newProj = {
          id: 'proj_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
          name: body.name.trim(),
          folderName: body.folderName ? body.folderName.trim() : body.name.trim(),
          category: body.category || 'General',
          stage: body.stage || 'Idea / Conceptual',
          tags: Array.isArray(body.tags) ? body.tags : [],
          ideas: [],
          createdAt: nowStr,
          updatedAt: nowStr
        };

        if (body.initialIdea && body.initialIdea.trim()) {
          newProj.ideas.push({
            id: Math.random().toString(36).substr(2, 8),
            text: body.initialIdea.trim(),
            status: 'Chưa triển khai',
            createdAt: nowStr
          });
        }

        data.projects.unshift(newProj);
        writeData(data);
        return sendJSON(res, 201, newProj);
      }

      // PUT /api/projects/:id (Update project fields)
      const projMatch = pathname.match(/^\/api\/projects\/([^\/]+)$/);
      if (method === 'PUT' && projMatch) {
        const projId = projMatch[1];
        const body = await parseBody(req);
        const data = readData();
        const proj = data.projects.find(p => p.id === projId);
        if (!proj) return sendJSON(res, 404, { error: 'Project not found' });

        if (body.name !== undefined) proj.name = body.name.trim();
        if (body.category !== undefined) proj.category = body.category;
        if (body.stage !== undefined) proj.stage = body.stage;
        if (body.tags !== undefined) proj.tags = body.tags;
        proj.updatedAt = new Date().toISOString();

        writeData(data);
        return sendJSON(res, 200, proj);
      }

      // DELETE /api/projects/:id
      if (method === 'DELETE' && projMatch) {
        const projId = projMatch[1];
        const data = readData();
        const idx = data.projects.findIndex(p => p.id === projId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Project not found' });

        data.projects.splice(idx, 1);
        writeData(data);
        return sendJSON(res, 200, { success: true });
      }

      // POST /api/projects/:id/ideas (Add idea)
      const ideaAddMatch = pathname.match(/^\/api\/projects\/([^\/]+)\/ideas$/);
      if (method === 'POST' && ideaAddMatch) {
        const projId = ideaAddMatch[1];
        const body = await parseBody(req);
        if (!body.text || !body.text.trim()) {
          return sendJSON(res, 400, { error: 'Idea text is required' });
        }
        const data = readData();
        const proj = data.projects.find(p => p.id === projId);
        if (!proj) return sendJSON(res, 404, { error: 'Project not found' });

        const newIdea = {
          id: Math.random().toString(36).substr(2, 8),
          text: body.text.trim(),
          status: body.status || 'Chưa triển khai',
          createdAt: new Date().toISOString()
        };

        if (!proj.ideas) proj.ideas = [];
        proj.ideas.push(newIdea);
        proj.updatedAt = new Date().toISOString();

        writeData(data);
        return sendJSON(res, 201, newIdea);
      }

      // PUT /api/projects/:id/ideas/:ideaId (Update idea text/status)
      const ideaUpdateMatch = pathname.match(/^\/api\/projects\/([^\/]+)\/ideas\/([^\/]+)$/);
      if (method === 'PUT' && ideaUpdateMatch) {
        const [_, projId, ideaId] = ideaUpdateMatch;
        const body = await parseBody(req);
        const data = readData();
        const proj = data.projects.find(p => p.id === projId);
        if (!proj) return sendJSON(res, 404, { error: 'Project not found' });

        const idea = (proj.ideas || []).find(i => i.id === ideaId);
        if (!idea) return sendJSON(res, 404, { error: 'Idea not found' });

        if (body.text !== undefined) idea.text = body.text.trim();
        if (body.status !== undefined) idea.status = body.status;
        proj.updatedAt = new Date().toISOString();

        writeData(data);
        return sendJSON(res, 200, idea);
      }

      // DELETE /api/projects/:id/ideas/:ideaId
      if (method === 'DELETE' && ideaUpdateMatch) {
        const [_, projId, ideaId] = ideaUpdateMatch;
        const data = readData();
        const proj = data.projects.find(p => p.id === projId);
        if (!proj) return sendJSON(res, 404, { error: 'Project not found' });

        proj.ideas = (proj.ideas || []).filter(i => i.id !== ideaId);
        proj.updatedAt = new Date().toISOString();

        writeData(data);
        return sendJSON(res, 200, { success: true });
      }

      // POST /api/categories (Add category)
      if (method === 'POST' && pathname === '/api/categories') {
        const body = await parseBody(req);
        if (!body.category || !body.category.trim()) {
          return sendJSON(res, 400, { error: 'Category name is required' });
        }
        const data = readData();
        const cat = body.category.trim();
        if (!data.categories.includes(cat)) {
          data.categories.push(cat);
          writeData(data);
        }
        return sendJSON(res, 200, { categories: data.categories });
      }

      // POST /api/rescan (Rescan d:\__G AG Projects)
      if (method === 'POST' && pathname === '/api/rescan') {
        const data = readData();
        const existingNames = new Set(data.projects.map(p => p.folderName || p.name));
        const entries = fs.readdirSync(AG_BASE_DIR, { withFileTypes: true });
        let addedCount = 0;
        const nowStr = new Date().toISOString();

        for (const entry of entries) {
          if (entry.isDirectory() && !entry.name.startsWith('.')) {
            if (!existingNames.has(entry.name)) {
              data.projects.push({
                id: 'proj_' + entry.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                name: entry.name,
                folderName: entry.name,
                category: 'General',
                stage: 'Idea / Conceptual',
                tags: ['#New'],
                ideas: [{
                  id: Math.random().toString(36).substr(2, 8),
                  text: 'Khao sat va lap ke hoach cho ' + entry.name,
                  status: 'Chưa triển khai',
                  createdAt: nowStr
                }],
                createdAt: nowStr,
                updatedAt: nowStr
              });
              addedCount++;
            }
          }
        }
        if (addedCount > 0) writeData(data);
        return sendJSON(res, 200, { addedCount, total: data.projects.length });
      }

      // Fallthrough API 404
      return sendJSON(res, 404, { error: 'Endpoint not found' });
    } catch (e) {
      console.error('API Error:', e);
      return sendJSON(res, 500, { error: e.message });
    }
  }

  // STATIC FILE SERVING
  let safePath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(PUBLIC_DIR, safePath);

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        return res.end('Server Error');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

// Strict Port enforcement
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`[STRICT PORT ERROR] Port ${PORT} is already in use. Server will exit immediately to prevent collision.`);
    process.exit(1);
  } else {
    console.error('Server error:', e);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[PROJECT TRACKER RUNNING] Server strictly listening on http://localhost:${PORT}`);
  console.log(`[SECOND BRAIN SYNC] Reading & writing to: ${DATA_FILE}`);
});
