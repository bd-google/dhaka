import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(), // keyword-first <title> tag; falls back to `title` if unset
    description: z.string(),
    type: z.enum(['buyer', 'supplier', 'factory']),
    problemStatement: z.string(),
    bullets: z.array(z.string()),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // No personal name/photo required — attribution is to the business, not an individual.
    author: z.object({
      name: z.string().default('ThreadBridge BD'),
      bio: z.string().optional(),
    }).optional(),
    publishDate: z.coerce.date(),
    cluster: z.string(),
    isPillar: z.boolean().default(false),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/caseStudies" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    outcome: z.string(),
  }),
});

const companies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/companies" }),
  schema: z.object({
    // --- Identity ---
    legalName: z.string(),
    displayName: z.string().optional(), // trade name, if different from legal name
    country: z.string(),
    role: z.enum(['buyer', 'supplier', 'factory']),
    category: z.string(), // e.g. "fabric", "machinery", "accessories", "garment-manufacturer"

    // --- Legal & registration ---
    registeredAddress: z.string().optional(),
    factoryAddress: z.string().optional(),
    tradeLicenseNumber: z.string().optional(),
    binNumber: z.string().optional(),          // NBR Business Identification Number
    rjscNumber: z.string().optional(),         // Registrar of Joint Stock Companies & Firms
    homeCountryRegNumber: z.string().optional(), // for foreign suppliers, their home registry number

    // --- Bangladesh industry associations / regulatory bodies (optional — only where applicable) ---
    bgmea: z.object({
      memberNumber: z.string().optional(),
      status: z.enum(['active', 'expired', 'not_a_member', 'unverified']).default('unverified'),
    }).optional(),
    bkmea: z.object({
      memberNumber: z.string().optional(),
      status: z.enum(['active', 'expired', 'not_a_member', 'unverified']).default('unverified'),
    }).optional(),
    bepza: z.object({ // Bangladesh Export Processing Zones Authority
      registrationNumber: z.string().optional(),
      zone: z.string().optional(), // e.g. "Chittagong EPZ (CEPZ)", "Dhaka EPZ"
      status: z.enum(['active', 'expired', 'not_applicable', 'unverified']).default('unverified'),
    }).optional(),
    dife: z.object({ // Department of Inspection for Factories and Establishments (fire/safety)
      registrationNumber: z.string().optional(),
      status: z.enum(['compliant', 'non_compliant', 'unverified']).default('unverified'),
    }).optional(),
    rsc: z.object({ // RMG Sustainability Council (Accord/Alliance successor)
      status: z.enum(['covered', 'not_covered', 'unverified']).default('unverified'),
    }).optional(),
    bida: z.object({ // Bangladesh Investment Development Authority
      registrationNumber: z.string().optional(),
      status: z.enum(['active', 'expired', 'not_applicable', 'unverified']).default('unverified'),
    }).optional(),

    // --- Compliance / social certifications ---
    complianceCerts: z.array(z.object({
      name: z.string(), // e.g. "BSCI", "WRAP", "SEDEX/SMETA", "OEKO-TEX", "GOTS", "Higg Index"
      validTill: z.string().optional(),
    })).optional(),

    // --- Verification contact (used to confirm authenticity — visibility controlled separately) ---
    authorizedPersonName: z.string().optional(),
    authorizedPersonTitle: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),

    // --- Verification status & findings ---
    status: z.enum(['verified', 'pending', 'flagged', 'could_not_verify']),
    lastCheckedDate: z.coerce.date(),
    summary: z.string(), // unique narrative, written per company — never templated
    findings: z.array(z.string()).optional(),

    // Sources used to verify — mix of primary (ThreadBridge BD) and third-party/government/association
    verificationSources: z.array(z.object({
      name: z.string(),
      type: z.enum(['primary', 'government', 'association', 'certification_body']),
      reference: z.string().optional(), // public record/reference number, if any
    })),

    // --- Field-level visibility control (what shows on the public page) ---
    visibility: z.object({
      showAuthorizedPerson: z.boolean().default(false),
      showEmail: z.boolean().default(false),
      showPhone: z.boolean().default(false),
      showWebsite: z.boolean().default(true),
      showFactoryAddress: z.boolean().default(true),
      showRegisteredAddress: z.boolean().default(false),
    }).default({}),

    // --- SEO control ---
    // Defaults to true unless explicitly set false once verification is complete.
    // Keeps incomplete/thin entries out of the index until they have real content.
    noindex: z.boolean().default(true),
  }),
});

export const collections = {
  'services': services,
  'blog': blog,
  'caseStudies': caseStudies,
  'companies': companies,
};
