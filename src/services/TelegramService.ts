import clientConfig from "@/config/client.config";

export async function gatherUserBoardMessages() {
  console.log("🧪 Ejecutando gatherUserBoardMessages...");
  try {
    const url = `${clientConfig.telegramServiceFullUrl}/messages`;
    console.log("🔗 Fetching:", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Error en gatherUserBoardMessages:", err);
    throw err;
  }
}
