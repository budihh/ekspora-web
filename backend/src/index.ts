import 'dotenv/config';
import express from 'express';
import { db } from './db/index.js';
import { products } from './db/schema/products.js';
import { categories } from './db/schema/categories.js';
import { companyProfile } from './db/schema/company.js';
import { news } from './db/schema/news.js';
import { team_members } from './db/schema/team.js';
import { eq } from 'drizzle-orm';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/v1/team — List all team members
app.get('/api/v1/team', async (_req, res) => {
  try {
    const result = await db.select().from(team_members);
    res.json({
      data: result,
      meta: { total: result.length },
    });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch team' },
    });
  }
});

// GET /api/v1/news — List all news
app.get('/api/v1/news', async (_req, res) => {
  try {
    const result = await db.select().from(news);
    res.json({
      data: result,
      meta: { total: result.length },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch news' },
    });
  }
});

// GET /api/v1/catalog — List all active products
app.get('/api/v1/catalog', async (_req, res) => {
  try {
    const result = await db
      .select({ 
        id: products.id, 
        name: products.name, 
        categoryId: products.categoryId,
        description: products.description,
        moq: products.moq,
        imageUrl: products.imageUrl,
        status: products.status
      })
      .from(products)
      .where(eq(products.status, 'active'));

    res.json({
      data: result,
      meta: { total: result.length },
    });
  } catch (error) {
    console.error('Error fetching catalog:', error);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch catalog' },
    });
  }
});

// GET /api/v1/commodities — List all active categories
app.get('/api/v1/commodities', async (_req, res) => {
  try {
    const result = await db
      .select({ 
        id: categories.id, 
        name: categories.name, 
        slug: categories.slug 
      })
      .from(categories);

    res.json({
      data: result,
      meta: { total: result.length },
    });
  } catch (error) {
    console.error('Error fetching commodities:', error);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch commodities' },
    });
  }
});

// GET /api/v1/company — Get company profile
app.get('/api/v1/company', async (_req, res) => {
  try {
    // Bypass database query because company_profile table does not exist
    res.json({
      data: {
        name: "Ekspora",
        tagline: "Your Trusted Export Partner",
        mission: "To provide transparent, efficient, and reliable sourcing of Indonesian commodities, while empowering local agricultural communities through fair trade practices.",
        vision: "To be the most trusted global partner for Indonesian commodities, recognized for our unyielding commitment to quality, sustainability, and integrity.",
        aboutHtml: "<p>Ekspora is an Indonesian-based export company dedicated to supplying premium agricultural commodities to the world. We believe in sustainable trade that benefits both our global clients and local farmers.</p>"
      }
    });
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch company profile' },
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Ekspora Backend running on http://localhost:${PORT}`);
  console.log(`📦 Catalog API: http://localhost:${PORT}/api/v1/catalog`);
  console.log(`🌿 Commodities API: http://localhost:${PORT}/api/v1/commodities`);
  console.log(`🏢 Company API: http://localhost:${PORT}/api/v1/company`);
  console.log(`📰 News API: http://localhost:${PORT}/api/v1/news`);
  console.log(`👥 Team API: http://localhost:${PORT}/api/v1/team`);
});
