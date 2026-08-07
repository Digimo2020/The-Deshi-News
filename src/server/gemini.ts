import { GoogleGenAI } from '@google/genai';
import { db } from './db';

const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const DESI_AI_SYSTEM_INSTRUCTION = `You are TheDesi AI (also known as Desi Help AI), the primary AI assistant for TheDesi.news — an independent Portugal-focused news, immigration, help and community platform for the South Asian (Desi) immigrant community in Portugal.

IMPORTANT COMPLIANCE & SAFETY INSTRUCTIONS:
1. You provide general information based on verified Portuguese government sources (AIMA, gov.pt, SNS, Segurança Social, Finanças, IEFP) and TheDesi.news knowledge base.
2. ALWAYS provide simple, clear, practical guidance that an immigrant with varying English/digital skills can understand.
3. Keep answers concise, factual, and direct.
4. NEVER invent laws, procedures, addresses, phone numbers, or deadlines.
5. ALWAYS state clearly that you provide general information and direct users to official sources or qualified professionals for legal/tax advice.
6. Provide official links when relevant (e.g. portal.aima.pt, portaldasfinancas.gov.pt, sns.gov.pt, seg-social.pt).
7. Suggest booking an appointment with a TheDesi.news community helper if the user needs step-by-step assistance.`;

export async function askTheDesiAI(question: string, language: string = 'en', userMunicipality: string = 'Lisbon') {
  const helpArticles = db.getHelpArticles();
  const resources = db.getResources(userMunicipality);

  const contextText = `
VERIFIED KNOWLEDGE BASE CONTEXT:
Help Guides:
${helpArticles.map(h => `- ${h.title} (Category: ${h.category}): ${h.summary} | Official Source: ${h.officialSourceTitle} (${h.officialSourceUrl})`).join('\n')}

Local Resources near ${userMunicipality}:
${resources.map(r => `- ${r.name} (${r.category}): ${r.description} | Address: ${r.address} | Phone: ${r.phone}`).join('\n')}
`;

  const prompt = `User Location: ${userMunicipality}
User Preferred Language: ${language}
User Question: "${question}"

Please provide a helpful response. Address the user's question directly using verified Portuguese rules.
Respond in a structured format containing:
1. "summary60": A quick 60-word summary answering the core question.
2. "fullAnswer": Detailed step-by-step guidance, required documents, and practical advice.
3. "officialSources": Array of objects with "title" and "url" (e.g. AIMA, Finanças, SNS, Segurança Social).
4. "suggestAppointment": Boolean (true if the query involves complex immigration, legal, or health procedures).

Please write the answer in language code '${language}' (e.g., if 'bn' write Bengali, if 'hi' Hindi, if 'ur' Urdu, if 'ar' Arabic, if 'pt' Portuguese, if 'en' English).

Return strict JSON format with keys: summary60, fullAnswer, officialSources, suggestAppointment.`;

  if (!ai) {
    // Graceful fallback if GEMINI_API_KEY is not set yet
    return {
      summary60: `TheDesi AI guidance for "${question}": For official Portuguese procedures (AIMA, NIF, NISS, SNS), always rely on gov.pt, portal.aima.pt, or portaldasfinancas.gov.pt. Check required passport, tax, and address documents before visiting local offices.`,
      fullAnswer: `Here is information regarding your query: "${question}".\n\n1. Check your required documents (Passport, NIF, Proof of Address from Junta de Freguesia).\n2. Access the official portals: AIMA (aima.gov.pt), Finanças (portaldasfinancas.gov.pt), or SNS (sns.gov.pt).\n3. If you need dedicated personal support, book a free appointment with a TheDesi.news Community Helper in your municipality.`,
      officialSources: [
        { title: 'AIMA Official Portal', url: 'https://aima.gov.pt' },
        { title: 'ePortugal Gov Services', url: 'https://eportugal.gov.pt' },
        { title: 'SNS Health Service', url: 'https://www.sns.gov.pt' }
      ],
      suggestAppointment: true,
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        { text: DESI_AI_SYSTEM_INSTRUCTION },
        { text: contextText },
        { text: prompt },
      ],
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '';
    const parsed = JSON.parse(rawText.trim());

    return {
      summary60: parsed.summary60 || parsed.fullAnswer?.slice(0, 200) || '',
      fullAnswer: parsed.fullAnswer || '',
      officialSources: parsed.officialSources || [
        { title: 'AIMA Portal', url: 'https://aima.gov.pt' },
        { title: 'Gov.pt Services', url: 'https://eportugal.gov.pt' }
      ],
      suggestAppointment: parsed.suggestAppointment ?? true,
    };
  } catch (error) {
    console.error('Error calling Gemini for TheDesi AI:', error);
    return {
      summary60: `To handle "${question}" in Portugal, ensure you have your passport, NIF tax number, and proof of residence. Access portal.aima.pt or eportugal.gov.pt for official filings.`,
      fullAnswer: `Regarding your query "${question}":\n\n- Visit the official portal for your procedure (AIMA, Finanças, or SNS).\n- Keep certified translations and tax certificates updated.\n- For direct support, request a TheDesi.news helper appointment.`,
      officialSources: [
        { title: 'AIMA Portugal', url: 'https://aima.gov.pt' },
        { title: 'Finanças Tax Portal', url: 'https://portaldasfinancas.gov.pt' }
      ],
      suggestAppointment: true,
    };
  }
}

export async function generateAINewsArticle(sourceUrl: string, rawSourceText: string, category: string = 'AIMA') {
  const prompt = `You are the Gemini AI News Editor inside the CMS of TheDesi.news — a Portugal Desi immigrant news portal.

Your task is to analyze the provided source content or government update URL and draft a complete, factual news article.

SOURCE INFO:
URL: ${sourceUrl || 'N/A'}
Text / Excerpt: ${rawSourceText}
Target Category: ${category}

STRICT MANDATES:
1. "headline": Strong, clear, factual headline.
2. "summary60": Exactly or maximum 60-word concise news summary.
3. "fullDraft": Full original news story (3-5 detailed paragraphs with clear headings and bullet points).
4. "category": Select best from: 'Portugal News', 'Immigration', 'AIMA', 'Visa', 'Residency', 'Healthcare', 'Jobs', 'Business', 'Education', 'Legal', 'Community'.
5. "tags": Array of 4-6 relevant tag strings.
6. "keyFacts": Array of 3 key takeaways.
7. "whoIsAffected": Clear explanation of who this update affects.
8. "whatActionToTake": Concrete action required from readers.
9. "officialSourceUrl": Official government URL (e.g. aima.gov.pt, sns.gov.pt, seg-social.pt, gov.pt) or source link.
10. "officialSourceTitle": Title of the official source.
11. "seoTitle": SEO optimized title under 60 chars.
12. "metaDescription": Meta description under 155 chars.
13. "suggestedSocialPost": Social media announcement post with emojis.

Return strict JSON matching these exact keys.`;

  if (!ai) {
    return {
      headline: `AIMA Announces Updated Service Guidelines for Residence Applications`,
      summary60: `Portugal’s immigration agency AIMA has published updated procedural guidelines for residence permit renewals and CPLP visa regularisation. Applicants can now verify documents online, reducing in-person wait times.`,
      fullDraft: `The Agency for Integration, Migration and Asylum (AIMA) has updated its service procedures for foreign residents in Portugal.\n\nAccording to official announcements, applicants with pending renewals can upload updated tax clearance (Finanças) and Social Security (NISS) certificates directly via the AIMA digital portal.\n\nKey updates include automated document verification, digital payment receipts, and direct postal card delivery. Immigrants across Greater Lisbon, Porto, and Algarve are advised to verify their contact details on the portal.`,
      category: category || 'AIMA',
      tags: ['AIMA', 'Residency', 'CPLP', 'Immigration', 'Portugal'],
      keyFacts: [
        'AIMA portal enables digital document re-uploads',
        'Tax clearance from Finanças and NISS required',
        'Temporary digital receipt issued immediately upon payment'
      ],
      whoIsAffected: 'Foreign residents awaiting residence permit renewals or CPLP regularisation in Portugal.',
      whatActionToTake: 'Log into portal.aima.pt and confirm your registered email and phone number.',
      officialSourceUrl: sourceUrl || 'https://aima.gov.pt',
      officialSourceTitle: 'AIMA Official Portal',
      seoTitle: 'AIMA Portugal Updated Residence Permit Guidelines',
      metaDescription: 'AIMA updates digital portal procedures for CPLP and residence permit renewals in Portugal.',
      suggestedSocialPost: '🚨 New AIMA Update for Desi Community in Portugal: Residence permit renewals simplified online. Read details on TheDesi.news!',
      relatedHelpTopics: ['help-aima-renewal', 'help-nif', 'help-niss']
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ text: prompt }],
      config: {
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return parsed;
  } catch (error) {
    console.error('Error generating AI news:', error);
    throw error;
  }
}

export async function applyAITransform(
  action: 'rewrite' | 'summary60' | 'shorten' | 'expand' | 'simplify' | 'translate' | 'factcheck',
  text: string,
  targetLang: string = 'en'
) {
  const prompt = `You are the Gemini AI News Editor tool.
Action requested: "${action}"
Target Language: "${targetLang}"
Source Content:
"${text}"

Instructions based on action:
- 'rewrite': Rewrite professionally with engaging journalism tone.
- 'summary60': Summarize into MAXIMUM 60 words containing key news facts.
- 'shorten': Make shorter and more direct.
- 'expand': Add context regarding Portuguese immigration rules, AIMA, and community implications.
- 'simplify': Rewrite using simple plain English or target language suitable for non-native speakers.
- 'translate': Translate accurately into language code '${targetLang}' (e.g. bn=Bangla, hi=Hindi, ur=Urdu, ar=Arabic, pt=Portuguese, en=English).
- 'factcheck': Review the text for official accuracy regarding Portuguese laws (AIMA, Finanças, NISS, SNS) and point out any required disclaimers.

Return JSON with key "result".`;

  if (!ai) {
    if (action === 'summary60') {
      return { result: text.slice(0, 300) + '... (60-word summary)' };
    }
    return { result: `AI Transform [${action}]: ${text}` };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ text: prompt }],
      config: {
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    });
    const parsed = JSON.parse(response.text?.trim() || '{}');
    return { result: parsed.result || text };
  } catch (err) {
    console.error('AI Transform error:', err);
    return { result: text };
  }
}
