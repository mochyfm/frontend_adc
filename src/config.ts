// config.ts

/**
 * Este valor tomará la variable de entorno NEXT_PUBLIC_SITE_URL si está definida;
 * en local, usará por defecto "http://localhost:3000".
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
