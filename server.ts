import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to initialize Gemini SDK on demand safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Tupperware Marketing AI Server' });
});

// 1. AI Content Generator Endpoint
app.post('/api/ai/content', async (req, res) => {
  try {
    const {
      postType = 'Instagram Caption',
      tone = 'Friendly',
      length = 'Medium',
      ctaStyle = 'Strong',
      includeEmoji = true,
      includeSeo = true,
      includeHashtags = true,
      includeQuestion = true,
      topic = 'Airtight food storage containers for pantry organisation',
      productName = '',
      brandInfo = {},
    } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback structured mock if key not present
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          title: `${postType}: ${topic.substring(0, 30)}...`,
          postType,
          tone,
          caption: `✨ Kitchen transformation alert! ✨\n\nIf your pantry is currently filled with open bags of pasta and half-empty boxes, it's time to upgrade to airtight freshness. ${productName ? `Our ${productName}` : 'Our premium container sets'} keeps dry ingredients crisp and 100% insect-free.\n\n🔒 Airtight Silicone Lock\n🌱 BPA-Free & Eco-friendly\n📦 Stackable Modular Design\n\n${includeQuestion ? 'How do you currently organise your dry goods? Let us know below! 👇' : ''}\n\n👉 Click the link in bio to shop our pantry restock collection today!`,
          hook: 'Kitchen transformation alert!',
          callToAction: 'Click link in bio to shop pantry restock collection today!',
          hashtags: ['#PantryOrganisation', '#TupperwareStyle', '#AestheticKitchen', '#MealPrepContainers', '#FreshLuxe', '#PantryRestock', '#HomeOrganiser'],
          seoKeywords: ['airtight food containers', 'pantry storage', 'kitchen organization', 'BPA free containers'],
          emojis: ['✨', '🔒', '🌱', '📦', '👇'],
          engagementQuestion: 'How do you currently organise your dry goods?',
        },
      });
    }

    const systemPrompt = `You are an expert Instagram Marketing Strategist specializing in food storage containers, pantry organization, Tupperware, and kitchen lifestyle brands.
Always output valid JSON matching this schema:
{
  "title": "Short title",
  "caption": "Complete engaging caption text formatted with paragraph breaks and emoji",
  "hook": "Attention grabbing first line",
  "callToAction": "Clear call to action string",
  "hashtags": ["10-15 relevant hashtags starting with #"],
  "seoKeywords": ["4-6 high volume keywords"],
  "emojis": ["5 relevant emojis"],
  "engagementQuestion": "Question to boost comments"
}`;

    const userPrompt = `Generate a ${length} length ${postType} for an Instagram business selling kitchen storage & organization containers.
Topic / Product: ${topic} ${productName ? `(Product: ${productName})` : ''}
Brand Name: ${brandInfo.businessName || 'FreshLuxe Kitchen'}
Target Tone: ${tone}
CTA Style: ${ctaStyle}
Include Emojis: ${includeEmoji}
Include SEO Keywords: ${includeSeo}
Include Hashtags: ${includeHashtags}
Include Engagement Question: ${includeQuestion}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Content Generation Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to generate content' });
  }
});

// 2. AI Reel Generator Endpoint
app.post('/api/ai/reel', async (req, res) => {
  try {
    const { topic = '3 Pantry Organisation Hacks using Glass Bento Boxes', tone = 'Exciting', brandName = 'FreshLuxe Kitchen' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          title: `Reel Script: ${topic}`,
          hook: 'Stop storing your salad in regular plastic bowls! Do this instead 🥗✨',
          musicSuggestion: 'Upbeat Aesthetic Lofi / Trending Chill Pop Beat',
          endingCta: 'Save this reel & tap link in bio for 15% off Bento Glass sets!',
          voiceoverScript: 'Stop storing your salads in regular plastic bowls. Here are 3 bento hacks that keep your lettuce crisp for 7 full days! Step 1: Layer dressing at the bottom. Step 2: Use an airtight silicone divider. Step 3: Seal with our 4-hinge lock.',
          caption: `Say goodbye to soggy meal prep salads! 🥗\n\nHere is how our 3-compartment glass bento containers keep ingredients separated until you are ready to eat.\n\nSave this reel for your Sunday prep session! 📌`,
          hashtags: ['#MealPrepHacks', '#GlassBento', '#ReelIdeas', '#PantryOrganisation', '#KitchenInspo', '#LunchBoxPrep'],
          scenes: [
            { sceneNumber: 1, timeframe: '0:00 - 0:03', visual: 'Close up of opening crisp glass container with satisfying lock snap sound', cameraAngle: 'Top-down 90 degree overhead', bRollIdea: 'Satisfying snap audio', voiceoverText: 'Stop storing your salads in regular plastic bowls!', onScreenText: 'STOP doing soggy meal prep 🚫' },
            { sceneNumber: 2, timeframe: '0:03 - 0:07', visual: 'Pouring dressing into bottom compartment first', cameraAngle: '45 degree side tilt', bRollIdea: 'Dressing drizzle macro shot', voiceoverText: 'Always put your dressing in the bottom compartment first.', onScreenText: 'Hack #1: Dressing at bottom 💧' },
            { sceneNumber: 3, timeframe: '0:07 - 0:12', visual: 'Stacking fresh greens and crunchy vegetables on top divider', cameraAngle: 'Eye-level panning shot', bRollIdea: 'Fresh produce color contrast', voiceoverText: 'Keep greens separated so they stay 100% dry and crisp.', onScreenText: 'Hack #2: Separate greens 🌿' },
            { sceneNumber: 4, timeframe: '0:12 - 0:15', visual: 'Snapping 4-hinge lid tightly shut & shaking container', cameraAngle: 'Action hand movement shot', bRollIdea: 'Leakproof shake test', voiceoverText: 'Snap the airtight seal and you are ready for the week!', onScreenText: 'Hack #3: 100% Airtight Lock 🔒' }
          ]
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Generate a viral Instagram Reel script for a food container & kitchen organisation brand (${brandName}). Topic: ${topic}. Tone: ${tone}. Output JSON with: title, hook, musicSuggestion, endingCta, voiceoverScript, caption, hashtags (array), scenes (array of objects with sceneNumber, timeframe, visual, cameraAngle, bRollIdea, voiceoverText, onScreenText).`,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, source: 'gemini', data: JSON.parse(response.text || '{}') });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. AI DM Assistant Endpoint
app.post('/api/ai/dm-reply', async (req, res) => {
  try {
    const { query = 'How much is the 7-piece pantry set and do you ship to Canada?', category = 'Price Enquiries', brandName = 'FreshLuxe Kitchen', currency = '$' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          category,
          userQuery: query,
          friendlyVersion: `Hi there! 😊 Thanks so much for reaching out! Our 7-Piece Modular Airtight Pantry Set is ${currency}49.99. And yes, we absolutely ship to Canada! 🇨🇦 Courier delivery usually takes 3-5 business days. Would you like me to send you the direct order link with a 10% first-order code? ✨`,
          professionalVersion: `Hello. Thank you for contacting ${brandName}. The 7-Piece Airtight Modular Pantry Set is priced at ${currency}49.99. We offer tracked shipping across Canada with standard transit times of 3 to 5 business days. Please let us know if you need assistance placing your order.`,
          luxuryVersion: `Welcome to ${brandName}. Our signature 7-Piece Airtight Collection is available for ${currency}49.99, crafted with premium crystal acrylic and precision silicone seals. We provide complimentary expedited delivery across Canada on orders over ${currency}75. May I prepare a tailored cart link for you today? ✨`
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Generate 3 distinct Instagram DM customer service replies (Friendly, Professional, Luxury) for brand ${brandName}. Category: ${category}. User Query: "${query}". Output JSON with keys: category, userQuery, friendlyVersion, professionalVersion, luxuryVersion.`,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, source: 'gemini', data: JSON.parse(response.text || '{}') });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. AI Comment Generator Endpoint
app.post('/api/ai/comment-reply', async (req, res) => {
  try {
    const { comment = 'Is this dishwasher safe and BPA free?', productContext = 'Airtight Glass Bento Set' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          comment,
          suggestedReply: `Yes! 🌿 100% BPA-free and top-rack dishwasher safe! Check your DMs for a full specs guide and special discount code! ✨`,
          friendlyReply: `Absolutely! All our glass bento containers are 100% BPA-free, lead-free, and top-rack dishwasher safe for easy cleaning! 😊`,
          quickReply: `100% BPA-free & dishwasher safe! Sent you a DM with details! 📩✨`
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Generate 3 short, high-converting Instagram comment replies to: "${comment}" for product context: ${productContext}. Output JSON with keys: comment, suggestedReply, friendlyReply, quickReply.`,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, source: 'gemini', data: JSON.parse(response.text || '{}') });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Campaign Builder Endpoint
app.post('/api/ai/campaign', async (req, res) => {
  try {
    const { campaignType = '30-Day Growth', durationDays = 30, goal = 'Drive $10,000 in pantry set sales', brandName = 'FreshLuxe Kitchen' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          name: `${campaignType} Campaign: Pantry & Storage Blitz`,
          type: campaignType,
          durationDays,
          goal,
          dailyContentSchedule: [
            { day: 1, title: 'Campaign Kickoff Teaser', type: 'Reel', topic: 'Pantry before & after transformations', captionSnippet: 'Ready for the ultimate kitchen reset? Here is what is coming...' },
            { day: 3, title: 'Educational Spotlight: BPA Safety', type: 'Post', topic: 'Why glass vs plastic containers matter for food freshness', captionSnippet: 'Did you know standard plastic leaches chemicals? Switch to non-toxic glass.' },
            { day: 5, title: 'Problem/Solution Story Poll', type: 'Story', topic: 'Interactive strawberry freshness challenge poll', captionSnippet: 'How long do berries last in your fridge?' },
            { day: 7, title: 'Flash Bundle Announcement', type: 'Ad', topic: 'Buy 2 Get 1 Free Airtight Modular Set', captionSnippet: 'Limited 48-Hour Pantry Restock Promo!' },
            { day: 10, title: 'Customer Social Proof Showcase', type: 'Post', topic: 'UGC photo carousel from satisfied meal preppers', captionSnippet: 'Look how @sarah_home organised her entire baking cabinet!' }
          ],
          emailCopy: `Subject: Transform Your Pantry This Month ✨\n\nHi {{first_name}},\n\nIs your kitchen cabinets feeling cluttered? We are launching our 30-Day Freshness Challenge with exclusive bundle pricing.\n\nEnjoy 20% off all airtight sets with code FRESH20 at checkout.\n\nBest,\nFreshLuxe Kitchen Team`,
          whatsappMessages: [
            `👋 Hey! VIP Flash Sale: Get 20% off our best-selling 7-Piece Airtight Pantry Set today! Tap here to claim: https://freshluxekitchen.com`,
            `✨ Don't forget: Free custom labels on all container bundle orders ending tonight!`
          ],
          dmSequence: [
            `Hi {{name}}! Thanks for liking our pantry reset post! Would you like our free 10-page Pantry Organisation Checklist PDF? 📚`,
            `Hey {{name}}! Just checking in — did you manage to download the guide? Let us know if you need help choosing container sizes! 😊`
          ]
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Create a comprehensive ${campaignType} campaign for brand ${brandName}. Goal: ${goal}. Duration: ${durationDays} days. Output JSON with: name, type, durationDays, goal, dailyContentSchedule (array of 5 representative day items with day, title, type, topic, captionSnippet), emailCopy, whatsappMessages (array of 2 strings), dmSequence (array of 2 strings).`,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, source: 'gemini', data: JSON.parse(response.text || '{}') });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Ad Generator Endpoint
app.post('/api/ai/ad', async (req, res) => {
  try {
    const { productName = 'Airtight Glass Meal Prep Bento Box', brandName = 'FreshLuxe Kitchen', offer = 'Buy 2 Get 1 Free' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          productName,
          variations: [
            {
              headline: 'Stop Throwing Away Soggy Meals! 🥗',
              primaryText: 'Keep your Sunday prep 100% crisp until Friday. Our 3-compartment glass bento containers lock in natural flavors with zero leaks.',
              description: 'Oven safe, microwave safe, 100% BPA free. Buy 2 Get 1 FREE today!',
              ctaText: 'Shop Now',
              targetAngle: 'Pain-point angle: Preventing food waste & soggy lunches'
            },
            {
              headline: 'The Aesthetic Kitchen Upgrade You Need ✨',
              primaryText: 'Upgrade your fridge with crystal-clear borosilicate glass bento boxes. Eco-friendly, shatterproof, and built to last a lifetime.',
              description: 'Free shipping on orders over $50 + Free silicone sauce cup included.',
              ctaText: 'Get Offer',
              targetAngle: 'Aesthetic & Luxury lifestyle angle'
            }
          ]
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Generate 2 high-converting Meta / Instagram / Facebook Ad variations for product "${productName}" from brand "${brandName}". Offer: "${offer}". Output JSON object with keys: productName, variations (array of objects with headline, primaryText, description, ctaText, targetAngle).`,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, source: 'gemini', data: JSON.parse(response.text || '{}') });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Hashtag Generator Endpoint
app.post('/api/ai/hashtags', async (req, res) => {
  try {
    const { category = 'Pantry Organisation', region = 'USA' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          category,
          highCompetition: ['#PantryGoals', '#HomeOrganisation', '#KitchenInspo', '#KitchenDesign', '#PantryRestock', '#MealPrep', '#Tupperware', '#StorageSolutions', '#AestheticHome', '#OrganisedLife'],
          mediumCompetition: ['#AirtightContainers', '#PantryOrganiser', '#GlassBento', '#FoodStorageHacks', '#KitchenStorage', '#FridgeOrganisation', '#BPAFreeContainers', '#MealPrepContainers', '#FreshnessKeeper', '#KitchenOrder'],
          lowCompetition: ['#FreshLuxeKitchen', '#ModularPantrySet', '#ShatterproofAcrylicStorage', '#ZeroSoggySalads', '#PantryReset2026', '#CrispProduceKeeper', '#OrganisedPantryInspo', '#SiliconeSealedContainers', '#CleanKitchenHacks', '#PantryLabelsInspo']
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Generate 30 strategic Instagram hashtags for food container & kitchen organisation business. Category: ${category}, Region: ${region}. Split into 10 highCompetition, 10 mediumCompetition, 10 lowCompetition. Output JSON with category, highCompetition, mediumCompetition, lowCompetition arrays.`,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, source: 'gemini', data: JSON.parse(response.text || '{}') });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 8. Product Description Generator Endpoint
app.post('/api/ai/product-description', async (req, res) => {
  try {
    const { productName, price, material, capacity, colors, benefits } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          seoDescription: `Upgrade your kitchen with the ${productName}. Featuring ${material || 'BPA-free durable construction'}, ${capacity || 'spacious capacity'}, and airtight silicone seals for maximum freshness.`,
          features: [
            '100% Airtight & Leakproof Silicone Gasket Lock',
            `Premium ${material || 'BPA-Free Food-Grade Material'}`,
            'Stackable modular design saves up to 40% cabinet space',
            'Dishwasher, freezer, and microwave safe'
          ],
          specifications: {
            Material: material || 'BPA-Free Acrylic / Glass',
            Capacity: capacity || 'Standard Multi-Size Set',
            Colors: Array.isArray(colors) ? colors.join(', ') : 'Multiple colors available',
            Price: `$${price || '49.99'}`
          },
          faqs: [
            { question: 'Is this container microwave safe?', answer: 'Yes! Safe for reheating (remove lid before microwaving).' },
            { question: 'Does it stain with tomato sauce or spices?', answer: 'No, our food-grade material resists discoloration and odor absorption.' }
          ],
          instagramVersion: `✨ Say hello to the ultimate pantry upgrade: ${productName}! ✨\n\nKeep your dry goods fresh for months with our airtight silicone locking system. Crisp, clear, and 100% stackable.\n\nTap link in bio to order yours today! 🛍️`,
          websiteVersion: `The ${productName} combines sleek aesthetic design with heavy-duty airtight preservation. Perfect for dry pantry staples, snacks, and meal prep.`,
          facebookVersion: `Struggling with messy kitchen cabinets? The ${productName} is designed to make pantry organization effortless. Order today and get free delivery on orders over $50!`
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Generate complete SEO product descriptions and social copy for product "${productName}" priced at $${price}. Material: ${material}, Capacity: ${capacity}, Colors: ${colors}. Output JSON with keys: seoDescription, features (array of strings), specifications (object), faqs (array of objects with question & answer), instagramVersion, websiteVersion, facebookVersion.`,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, source: 'gemini', data: JSON.parse(response.text || '{}') });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 9. AI Marketing Coach Endpoint
app.post('/api/ai/coach', async (req, res) => {
  try {
    const { message = 'How often should I post reels to grow my pantry organization brand?', brandContext = {} } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          reply: `To grow a kitchen organisation & container brand fast on Instagram in 2026, here is your optimal growth blueprint:\n\n1. **Posting Frequency:** Aim for **3 to 4 Reels per week** focusing on satisfying ASMR pantry restocks, 3-second problem/solution hooks ("Stop storing berries like this"), and before & after cabinet resets.\n2. **Best Posting Times:** 11:30 AM - 1:00 PM (lunch break browsing) and 7:00 PM - 9:00 PM (evening home inspiration hours).\n3. **Content Mix:** 50% Reels (reach new audience), 30% Stories (daily engagement polls & DM triggers), 20% Carousels (saveable tips & product comparisons).\n4. **Conversion Hack:** Set up an automated DM keyword like "PANTRY" so every comment automatically receives a discount code link directly in their inbox!`
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `You are an expert Instagram Marketing Coach for food storage & container brands. User asked: "${message}". Brand Context: ${JSON.stringify(brandContext)}. Give actionable, step-by-step tactical advice. Output JSON object with key "reply".`,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, source: 'gemini', data: JSON.parse(response.text || '{}') });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 10. Image Prompt Generator Endpoint
app.post('/api/ai/image-prompt', async (req, res) => {
  try {
    const { promptTopic = 'Aesthetic Minimalist Kitchen Counter with Glass Container', category = 'Lifestyle Photography' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback',
        data: {
          category,
          promptText: `A luxurious, bright modern minimalist kitchen countertop with morning sunlight streaming through windows. Centerpiece is a crystal-clear airtight food storage container filled with colorful organic granola and fresh berries. Soft pastel rose accents, marble surface, 8k resolution, photorealistic, Hasselblad medium format camera angle, editorial food photography style.`,
          negativePrompt: `dark, grainy, distorted glass, messy background, low quality, unnatural lighting, oversaturated, plastic glare`,
          recommendedAspect: `4:5 (Instagram Post)`
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Generate a high-converting image generation prompt (Midjourney/Imagen/DALL-E) for kitchen container brand visual assets. Topic: "${promptTopic}", Category: "${category}". Output JSON with: category, promptText, negativePrompt, recommendedAspect.`,
      config: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, source: 'gemini', data: JSON.parse(response.text || '{}') });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// VITE / STATIC MIDDLEWARE & STARTUP
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tupperware Marketing AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
