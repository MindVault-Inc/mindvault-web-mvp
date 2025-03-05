import { jwtVerify } from "jose";
import type { JWTPayload } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface IdeologyScores {
  econ: number;
  dipl: number;
  govt: number;
  scty: number;
}

interface GeminiResponseCandidate {
  content: {
    parts: [
      {
        text: string;
      },
    ];
  };
}

interface GeminiResponse {
  candidates: GeminiResponseCandidate[];
}

interface ApiResponse {
  analysis?: string;
  error?: string;
}

interface TokenPayload extends JWTPayload {
  address?: string;
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function POST(request: NextRequest) {
  try {
    const token = cookies().get("session")?.value;

    if (!token) {
      const response: ApiResponse = { error: "Unauthorized" };
      return NextResponse.json(response, { status: 401 });
    }

    const { payload: tokenPayload } = await jwtVerify(token, secret);
    const typedPayload = tokenPayload as TokenPayload;

    if (!typedPayload.address) {
      const response: ApiResponse = { error: "Invalid session" };
      return NextResponse.json(response, { status: 401 });
    }

    // Parse and validate input
    const body = await request.json();
    const scores = body as IdeologyScores;
    const { econ, dipl, govt, scty } = scores;

    if (
      econ === undefined ||
      dipl === undefined ||
      govt === undefined ||
      scty === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate that each score is a number between 0 and 100
    for (const [key, value] of Object.entries(scores)) {
      const score = Number(value);
      if (Number.isNaN(score) || score < 0 || score > 100) {
        return NextResponse.json(
          { error: `Invalid ${key} score. Must be a number between 0 and 100` },
          { status: 400 },
        );
      }
    }

    // Construct the new prompt with your updated template
    const prompt = `[ROL]
Actúa como un politólogo sénior especializado en análisis ideológico. Escribe en un tono directo, dinámico y motivador, dirigiéndote al usuario como "tú" y "tu". Demuestra un conocimiento avanzado de las ideologías políticas y ofrece un contexto práctico y realista. Fomenta la introspección y el crecimiento al destacar tensiones clave, implicaciones políticas y posibles dilemas personales. **Escribe en español.**

[ENTRADA]
Económico: ${econ} | Diplomático: ${dipl} | Gobierno: ${govt} | Social: ${scty} (Todos entre 0-100)

[ESTRUCTURA]
Devuelve tu análisis en EXACTAMENTE 5 secciones con estos encabezados:
1. Tu análisis ideológico
2. Tus coincidencias ideológicas más cercanas
3. Tus preferencias políticas probables
4. Tus principales tensiones filosóficas
5. Tus oportunidades de crecimiento

[REQUISITOS]
Análisis
- Comienza cada análisis de eje con "Tu puntuación en [Eje] de [X] sugiere..."
- Proporciona un descriptor conciso (por ejemplo, "capitalismo regulado con enfoque en bienestar").
- Ofrece una analogía realista (como, "similar al enfoque de mercado mixto de Suecia").
- Explica brevemente cómo esta orientación podría influir en su visión del mundo.

Coincidencias
- Compara al usuario con 2-3 movimientos/partidos políticos reales.
- Usa porcentajes de alineación solo para marcos ideológicos amplios.
- Destaca al menos un punto de divergencia con cada movimiento/partido.

Preferencias
- Introduce políticas con "Probablemente apoyarías..."
- Proporciona un ejemplo concreto de política (por ejemplo, "sistemas de cuidado infantil universal como el Proyecto de Ley C-35 de Canadá en 2023").
- Explica brevemente la conexión entre las puntuaciones del usuario y la postura política.

Tensiones
- Presenta contradicciones como preguntas reflexivas, enmarcadas en desafíos del mundo real.
- Proporciona al menos un ejemplo histórico o contemporáneo que ilustre cómo se ha desarrollado una tensión similar.

Crecimiento
- Recomienda un recurso académico alineado con las puntuaciones del usuario.
- Sugiere un paso de acción práctico (por ejemplo, unirse a un grupo de defensa local).
- Ofrece un ejercicio reflexivo (por ejemplo, escribir un ensayo breve que equilibre la cooperación global con la autonomía local).

[RESTRICCIONES]
- Apunta a aproximadamente 600 palabras (±50).
- Usa el estilo AP.
- Evita la voz pasiva.
- Explica términos técnicos entre paréntesis, por ejemplo, "multilateralismo (cooperación global)".
- Concluye con exactamente 2 preguntas abiertas para la reflexión del usuario.
- Comienza la respuesta inmediatamente con el encabezado "1. Tu análisis ideológico"`;


    // Prepare Gemini API URL and payload
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not set in environment");
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Gemini expects the prompt in a "contents" array with "parts"
    const payload = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    // Make the POST request to the Gemini API
    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      throw new Error(`Gemini API error: ${errorText}`);
    }

    // Parse the response and extract the text from the first candidate
    const data = (await geminiResponse.json()) as GeminiResponse;
    const analysis =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No analysis available.";

    const response: ApiResponse = { analysis };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Gemini API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    const response: ApiResponse = { error: message };
    return NextResponse.json(response, { status: 500 });
  }
}
