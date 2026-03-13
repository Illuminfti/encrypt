# CLAUDE.md - Encrypt Protocol Website

This is the official Encrypt Protocol website. Claude Code should always use the skills in `.claude_skills/` for all design, copy, and frontend work.

## 🎯 BRAND IDENTITY

**Encrypt** - Confidential execution network for Solana
- **Primary Color**: #7A5CFF (ultraviolet/violet)
- **Accent Color**: #1CF2C7 (cipher-mint)
- **Background**: void (#050816), abyss (#0B1123)
- **Tagline**: Confidential execution network for Solana. FHE-powered encrypted compute.
- **Voice**: Professional, technical, privacy-focused. No anime affect.

## 📁 STRUCTURE

```
encrypt/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # React components
│   └── lib/          # Utilities
├── public/           # Static assets
└── .claude_skills/  # Claude Code skills
```

## 🔧 SKILLS (MUST USE)

### Design & UI
1. **anthropic-frontend-design** - Primary for building premium components
2. **frontend-patterns** - Component conventions
3. **design-system** - Tokens and patterns
4. **design-to-code** - Convert designs to code
5. **design-spec** - Write specs before building

### Copy & Content
6. **copy-suite** - All copywriting. Use for headlines, body text, CTAs.

### Thinking & Quality
7. **brainstorming** - Use for creative solutions
8. **dont-make-mistakes** - ⚠️ ALWAYS ACTIVE. This is production. Double-check everything.

## 📋 WORKFLOW

For ANY task:
1. Read relevant skill: `read .claude_skills/[skill]/SKILL.md`
2. Apply to task
3. Verify against skill guidelines
4. For copy: use copy-suite format

## 🎨 REFERENCE SITES

- **sui.io** - Animation density, letter-by-letter text reveals
- **solana.com** - Hero section quality, cinematic feel
- **layerzero.network** - Information architecture
- **walrus.xyz** - Button effects, spinning borders
- **arcium.io** - Spatial storytelling

## ✅ QUALITY MANDATES

1. **NEVER ship unverified code** - Test locally first
2. **NEVER use Ika branding** - This is Encrypt (violet/mint, not coral)
3. **NEVER skip the skill** - Load the skill before design/copy work
4. **NEVER assume** - Ask if requirements are unclear
5. **dont-make-mistakes is ALWAYS on** - This is a production website

## 🎬 ANIMATION REQUIREMENTS

Match the quality of sui.io:
- Letter-by-letter text reveal on scroll
- Smooth fade-ins for sections
- Button hover effects (spinning border like walrus.xyz)
- Marquee/scrolling elements where appropriate
- GPU-accelerated animations (transform, opacity)

## 📍 WORKING DIRECTORY

```
/home/ubuntu/encrypt/
```

GitHub: `Illuminfti/encrypt`
