
# Pulse Dancers — CMS Site (Starter)

This is a modernized, CMS-editable starter for Pulse Dancers. It preserves your layout intent (hero + services + prices + FAQ + join/book forms) but uses JSON + Decap (Netlify) CMS so every bit of content is editable.

## Deploy to Netlify (no CLI required)

1. Zip this folder (or use the provided `pulse-modern-cms.zip`) and drag-drop into https://app.netlify.com/drop
2. Click the new site → **Site settings → Identity → Enable Identity**
3. Under Identity → **Services → Enable Git Gateway**
4. Go to **Identity → Invite users** → invite your editing email(s)
5. Open `https://<your-netlify-site>.netlify.app/admin` and log in
6. Edit content → Publish. Netlify will rebuild and deploy automatically.

## Forms (Netlify Forms)
- Two native forms included: **booking** and **join**.
- After deploying, Netlify will detect them on first submission and show entries under **Forms**.
- Add email notifications under **Forms → Notifications**.
- Optional spam protection: enable reCAPTCHA in Netlify Forms settings, then add the widget to the forms.

## Payments (optional next step)
- Add a **Pay Now** (deposit) button after booking confirmation using a provider like **PayFast** or **Peach Payments** (SA-friendly).
- We can start with simple payment links per package; later upgrade to a custom checkout or serverless function.

## Socials
Links to Instagram and Facebook are in the footer. We can embed an IG grid later via a lightweight script or serverless function.

## Editing
All content is stored in `/data/*.json` and images in `/images/uploads`. The CMS writes to those files so you don’t need to touch code.

